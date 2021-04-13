import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import RefreshRoundedIcon from "@material-ui/icons/RefreshRounded";
import Tooltip from "@material-ui/core/Tooltip";
import "../App.css";

import Card from "./Card";

const useStyles = makeStyles((theme) => ({
  refreshButton: {
    height: "50px",
    width: "50px",
    cursor: "pointer",
    "&:hover": {
      height: "60px",
      width: "60px",
    },
  },
}));

const GameScreen = ({ currentGame, backToHome }) => {
  const classes = useStyles();
  const questions = currentGame.questions;
  const [randomIdx, setRandomIdx] = useState(0);

  const [toggle, setToggle] = useState(true);
  const [transitionStyle, setTransitionStyle] = useState("slide");

  useEffect(() => {
    if (toggle === true) {
      setTransitionStyle("slide active");
      setToggle(false);
    }
  }, [toggle]);

  let currentQuestion = "";
  const onNextCard = (max) => {
    const result = Math.floor(Math.random() * max);
    setRandomIdx(result);
    setTransitionStyle("slide");
    setToggle(true);
    console.log(toggle);
  };

  currentQuestion = questions[randomIdx];

  // HANDLING SNACKBAR ALERT ------------------------------------

  // HANDLING ANIMATIONS ------------------------------------

  // HANDLING COPYING OF TEXT ------------------------------------

  // RENDER ------------------------------------

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Button
          style={{ fontWeight: "bold", margin: "10px" }}
          color="primary"
          onClick={backToHome}
        >
          Home
        </Button>
      </div>

      <Card
        transitionStyle={transitionStyle}
        currentGame={currentGame}
        currentQuestion={currentQuestion}
        onNextCard={onNextCard}
        questions={questions}
      />

      <div
        style={{
          minHeight: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Tooltip title="Next Card" placement="bottom">
          <RefreshRoundedIcon
            className={classes.refreshButton}
            color="primary"
            onClick={() => onNextCard(questions.length)}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default GameScreen;
