import React, { useState } from "react";
import { GamesData } from "./data/GamesData";
import GameScreen from "./components/GameScreen";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import NextPage from "./components/home_components/NextPage";
import PrevPage from "./components/home_components/PrevPage";

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

function App() {
  const classes = useStyles();
  const [idx, setIdx] = useState(0);
  const [HomePage, setHomePage] = useState(true);

  const currentGame = GamesData[idx];

  const idxUp = () => {
    if (idx < GamesData.length - 1) {
      setIdx(idx + 1);
    }
  };

  const idxDown = () => {
    if (idx > 0) {
      setIdx(idx - 1);
    }
  };

  const backToHome = () => {
    setHomePage(true);
  };

  const onGameSelect = () => {
    setHomePage(false);
  };

  return (
    <div className={classes.main}>
      {HomePage ? (
        <div className={classes.home}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {idx === 0 ? (
              <PrevPage idxDown={idxDown} disable={true} />
            ) : (
              <PrevPage idxDown={idxDown} disable={false} />
            )}

            <div style={{ color: "#303545", textAlign: "center" }}>
              <h1>{currentGame.name}</h1>
            </div>

            {idx === GamesData.length - 1 ? (
              <NextPage idxUp={idxUp} disable={true} />
            ) : (
              <NextPage idxUp={idxUp} disable={false} />
            )}
          </div>

          <Button
            variant="contained"
            color="primary"
            className={classes.start}
            onClick={onGameSelect}
          >
            START
          </Button>
        </div>
      ) : (
        <div>
          <GameScreen backToHome={backToHome} currentGame={currentGame} />
        </div>
      )}
    </div>
  );
}

export default App;
