import React, { useState } from "react";
import { GamesData } from "./data/GamesData";
import GameScreen from "./components/GameScreen";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#F6F7FB",
      }}
    >
      {HomePage ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            {idx === 0 && (
              <div className={classes.button}>
                <Button onClick={idxDown} disabled>
                  <ChevronLeftRoundedIcon
                    style={{ height: "50px", width: "50px" }}
                  />
                </Button>
              </div>
            )}
            {idx !== 0 && (
              <div className={classes.button}>
                <Button onClick={idxDown} color="primary">
                  <ChevronLeftRoundedIcon
                    style={{ height: "50px", width: "50px" }}
                  />
                </Button>
              </div>
            )}

            <div style={{ color: "#303545", textAlign: "center" }}>
              <h1>{currentGame.name}</h1>
            </div>

            {idx === GamesData.length - 1 && (
              <div className={classes.button}>
                <Button onClick={idxUp} disabled>
                  <ChevronRightRoundedIcon
                    style={{ height: "50px", width: "50px" }}
                  />
                </Button>
              </div>
            )}

            {idx !== GamesData.length - 1 && (
              <div className={classes.button}>
                <Button onClick={idxUp} color="primary">
                  <ChevronRightRoundedIcon
                    style={{ height: "50px", width: "50px" }}
                  />
                </Button>
              </div>
            )}
          </div>

          <Button
            style={{ marginTop: "30px", fontWeight: "bold" }}
            onClick={onGameSelect}
            variant="contained"
            color="primary"
          >
            START
          </Button>
        </div>
      ) : (
        <div>
          {/* <button onClick={backToHome}>back</button> */}
          <GameScreen backToHome={backToHome} currentGame={currentGame} />
        </div>
      )}
    </div>
  );
}

export default App;

{
  /* {page === "" && (
        <div>
          {currentGame.name}
          <button onClick={idxDown}>left</button>
          <button onClick={idxUp}>right</button>
          <button onClick={backToHome}>back</button>
        </div>
      )}
      {page === 0 && <div>hi</div>} */
}
