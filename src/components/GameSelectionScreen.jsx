import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { GamesData } from "../data/GamesData";
import NextPage from "../components/home_components/NextPage";
import PrevPage from "../components/home_components/PrevPage";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "../App.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

const GameSelectionScreen = ({
  mainArray,
  enteredHostName,
  currentGame,
  idx,
  onGameSelect,
  idxDown,
  idxUp,
  roomID,
  open,
  setOpen,
}) => {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.home}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {enteredHostName === mainArray.player2 ? (
          <PrevPage idxDown={idxDown} disable={true} />
        ) : idx === 0 ? (
          <PrevPage idxDown={idxDown} disable={true} />
        ) : (
          <PrevPage idxDown={idxDown} disable={false} />
        )}

        <div style={{ color: "#303545", textAlign: "center" }}>
          <h1>
            {mainArray &&
            mainArray.currentGameIndex &&
            currentGame &&
            currentGame.name
              ? currentGame.name
              : GamesData[0].name}
          </h1>
        </div>

        {enteredHostName === mainArray.player2 ? (
          <NextPage idxUp={idxUp} disable={true} />
        ) : idx === GamesData.length - 1 ? (
          <NextPage idxUp={idxUp} disable={true} />
        ) : (
          <NextPage idxUp={idxUp} disable={false} />
        )}
      </div>

      <div
        style={{
          color: "#303545",
        }}
      >
        <h3>
          Player 1:{" "}
          {mainArray && mainArray.player1
            ? mainArray.player1
            : "Waiting for Player 1..."}
        </h3>
        <h3>
          Player 2:{" "}
          {mainArray && mainArray.player2
            ? mainArray.player2
            : "Waiting for Player 2..."}
        </h3>
        <h3>
          Room ID:{" "}
          {mainArray && mainArray.room ? mainArray.room : "Creating Room..."}
        </h3>
      </div>

      {enteredHostName === mainArray.player2 ? (
        <Button
          variant="contained"
          disabled
          color="primary"
          className={classes.start}
          onClick={onGameSelect}
        >
          Waiting for Player 1 to start
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          className={classes.start}
          onClick={onGameSelect}
        >
          START
        </Button>
      )}
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Room ID Copied to Clipboard!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default GameSelectionScreen;
