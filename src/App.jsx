import React, { useState, useEffect, useRef } from "react";
import { GamesData } from "./data/GamesData";
import GameScreen from "./components/GameScreen";
import RoomCreationPage from "./components/RoomCreationPage";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";

import {
  mongoCreate,
  mongoRead,
  mongoReadAll,
  mongoUpdate,
  mongoDeleteMatching,
  getPing,
  leaveRoom,
} from "./api/Api";
import GameSelectionScreen from "./components/GameSelectionScreen";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#F6F7FB",
  },

  home: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  start: {
    marginTop: "30px",
    fontWeight: "bold",
  },
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////

// Declarations ---------------------------------------------

function App() {
  const masterRoomDeletionTimer = 100;
  //( seconds )

  const classes = useStyles();

  const [enteredHostName, setEnteredHostName] = useState("");

  const [currentPing, setCurrentPing] = useState(0);

  const [copyRoomSnackbar, setCopyRoomSnackbar] = useState(false);
  const [roomErrorSnackbar, setRoomErrorSnackbar] = useState(false);
  const [roomErrorMessage, setRoomErrorMessage] = useState("");

  const [roomID, setRoomID] = useState("");
  const [enteredRoomID, setEnteredRoomID] = useState("");
  const [mainArray, setMainArray] = useState([]);

  // Ghost states are used for unmounting and setIntervals

  const ghostRoomId = useRef(false);
  const ghostEnteredRoomID = useRef(false);
  const ghostMainArray = useRef(false);
  const intervalRef = useRef(false);

  // --------------------------------------------------------

  // roomCleanup deletes rooms older than an 30mins
  // run on mount

  const roomCleanup = async () => {
    console.log("running room cleanup...");
    const fullArr = await mongoReadAll();

    if (fullArr) {
      console.log("current number of rooms", fullArr.length);

      for (let i = 0; i < fullArr.length; i++) {
        const currentTime = Date.now();
        const docTimestamp = fullArr[i].creationTime;

        const currentTimeSeconds = Math.floor(currentTime / 1000);
        const docTimestampSeconds = Math.floor(docTimestamp / 1000);

        const timeDifference = currentTimeSeconds - docTimestampSeconds;

        if (timeDifference > masterRoomDeletionTimer) {
          console.log(
            "deleting room",
            fullArr[i].room,
            " seconds created : ",
            timeDifference
          );
          mongoDeleteMatching(fullArr[i].room);
        } else {
          console.log(
            "this room is safe",
            fullArr[i].room,
            ", seconds created: ",
            timeDifference
          );
        }
      }
    }
  };

  useEffect(() => {
    roomCleanup();
  }, []);

  // run mongoupdate, which uses the room ID and then updates the value listed, and then calls a read function built into the call
  // we are then going to use the value returned in the update to set it to the new state, we need to stringify in order to modify it
  // we are going to do the same thing for the ghost state, this is to use for things that state dont play friendly with

  const updateNextCard = async (randomNumber) => {
    const newState = await mongoUpdate(roomID, { cardIndex: randomNumber });
    setMainArray(JSON.parse(JSON.stringify(newState)));
    ghostMainArray.current = JSON.parse(JSON.stringify(newState));
  };

  // --------------------------------------------------------

  // Every 2 seconds, set intervalRef to the current ping
  // (which is current time minus previous time)
  // use ghost states (ref) for interval (due to closure issues)

  useEffect(() => {
    intervalRef.current = setInterval(async () => {
      read();
      const ping = await getPing();

      setCurrentPing(ping);
    }, 2000);

    // A return in useEffect runs when compnent is unmounted :
    // this clears the intervalRef

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = false;
      }
    };
  }, []);

  // --------------------------------------------------------

  // this grabs information for the current room

  // You can't JUST set these to arr
  // JS has an issue with redeclaring arr/objs
  // make "deep clones" like this if you need to use it

  const read = async () => {
    const arr = await mongoRead(ghostRoomId.current);
    if (arr) {
      setMainArray(JSON.parse(JSON.stringify(arr)));
      ghostMainArray.current = JSON.parse(JSON.stringify(arr));
      console.log("ghostMainArray: ", ghostMainArray.current);
    }
  };

  // Every rerender item listed here will make the app seem more responsive
  // So we are not just waiting for ping delay to update

  useEffect(() => {
    read(roomID);
  }, [enteredRoomID, roomID]);

  // set the mongo info for game index into the gamedata to get the current active games

  const currentGame = GamesData[mainArray.currentGameIndex];

  // function for coping input to clipboard

  function copyToClipboard(copiedItem) {
    var input = document.body.appendChild(document.createElement("input"));
    input.value = copiedItem;
    input.focus();
    input.select();
    document.execCommand("copy");
    input.parentNode.removeChild(input);
  }

  // when joining or creating room

  // make sure the room entered exists
  // make sure the name entered doesnt clash with the other name
  // if roomID isnt entered (implying its player 1)
  // copy the room ID
  //update the mongo room file with the following info

  // if player 2, check if the room exists
  // if the name matched, throw error
  // if the name is different, successfully join
  // if the room doesnt exist, throw error

  const onRoomCreation = async () => {
    const timestamp = Date.now();
    const id = uuidv4();
    const result = id.substring(0, 4);
    const smallID = result.toUpperCase();
    const fullArr = await mongoReadAll();

    console.log("fullarray2:", fullArr);

    const roomExists = (roomBeingChecked) => {
      return fullArr.some((obj) => {
        return obj.room === roomBeingChecked;
      });
    };

    const namesAreSame = (nameBeingChecked) => {
      return fullArr.some((obj) => {
        return obj.player1 === nameBeingChecked;
      });
    };

    console.log("do names match?", namesAreSame(enteredHostName));

    if (!enteredRoomID) {
      copyToClipboard(smallID);
      setCopyRoomSnackbar(true);

      setRoomID(smallID);
      ghostRoomId.current = smallID;

      mongoCreate({
        creationTime: timestamp,
        room: smallID,
        currentGameState: "gameSetup",
        currentGameIndex: 0,
        cardIndex: "0",
        turnPlayer: "activePlayer[0] or activePlayer[1]",
        player1: enteredHostName,
      });
    } else {
      if (roomExists(enteredRoomID)) {
        if (namesAreSame(enteredHostName)) {
          setEnteredHostName("");
          setRoomErrorMessage("Please choose a different name");
          setRoomErrorSnackbar(true);
        } else {
          setRoomID(enteredRoomID);
          ghostRoomId.current = enteredRoomID;
          mongoUpdate(enteredRoomID, {
            player2: enteredHostName,
          });
        }
      } else {
        setEnteredRoomID("");
        setRoomErrorMessage("Room does not exist! Try Again");
        setRoomErrorSnackbar(true);
      }
    }
  };

  // Change to next game

  const idxUp = async () => {
    if (mainArray.currentGameIndex < GamesData.length - 1) {
      const newState = await mongoUpdate(roomID, {
        currentGameIndex: mainArray.currentGameIndex + 1,
      });
      updateMainState(newState);
    }
  };

  // Change to previous game

  const idxDown = async () => {
    if (mainArray.currentGameIndex > 0) {
      const newState = await mongoUpdate(roomID, {
        currentGameIndex: mainArray.currentGameIndex - 1,
      });
      updateMainState(newState);
    }
  };

  //this sets the main array state and the ghost state to the current status of the game
  // with using the deep cloning principles

  const updateMainState = (newState) => {
    setMainArray(JSON.parse(JSON.stringify(newState)));
    ghostMainArray.current = JSON.parse(JSON.stringify(newState));
  };

  // Takes you to home

  const backToHome = async () => {
    const newState = await mongoUpdate(roomID, {
      currentGameState: "gameSetup",
    });
    updateMainState(newState);
  };

  // When the start button is pressed

  const onGameSelect = async () => {
    const newState = await mongoUpdate(roomID, {
      currentGameState: "activeSession",
      currentGameIndex: mainArray.currentGameIndex,
    });

    updateMainState(newState);
  };

  const onUnload = async () => {
    console.log(
      "beforeunoed: ",
      mainArray,
      "roomId: ",
      ghostRoomId.current,

      "ghostMainArray plyaer 2: ",
      ghostMainArray.current.player2
    );
    leaveRoom(
      ghostRoomId.current,
      ghostEnteredRoomID.current ? "player2" : "player1",
      ghostMainArray.current.player2
    );
  };

  useEffect(() => {
    window.addEventListener("beforeunload", onUnload);

    return () => {
      window.removeEventListener("beforeunload", onUnload);
    };
  }, []);

  ///////////////////////////////////////////////////////////////////////////////////////////////

  let gameState = "roomCreation";

  if (mainArray.currentGameState) {
    gameState = mainArray.currentGameState;
  }

  console.log("GAME STATW: ", gameState);

  return (
    <div className={classes.main}>
      <h6 style={{ top: 20, left: 20, position: "absolute" }}>
        {currentPing} ms
      </h6>

      {gameState == "roomCreation" && (
        <RoomCreationPage
          onRoomCreation={onRoomCreation}
          enteredHostName={enteredHostName}
          setEnteredHostName={setEnteredHostName}
          enteredRoomID={enteredRoomID}
          setEnteredRoomID={setEnteredRoomID}
          ghostEnteredRoomID={ghostEnteredRoomID}
          open={roomErrorSnackbar}
          setOpen={setRoomErrorSnackbar}
          roomErrorMessage={roomErrorMessage}
        />
      )}

      {gameState === "gameSetup" && (
        <GameSelectionScreen
          roomID={roomID}
          mainArray={mainArray}
          enteredHostName={enteredHostName}
          currentGame={currentGame}
          idx={mainArray.currentGameIndex}
          onGameSelect={onGameSelect}
          idxDown={idxDown}
          idxUp={idxUp}
          open={copyRoomSnackbar}
          setOpen={setCopyRoomSnackbar}
        />
      )}

      {gameState === "activeSession" && (
        <div>
          <GameScreen
            backToHome={backToHome}
            updateNextCard={updateNextCard}
            currentGame={currentGame}
            roomID={roomID}
            mainArray={mainArray}
            read={read}
          />
        </div>
      )}
    </div>
  );
}

export default App;
