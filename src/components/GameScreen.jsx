import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import "../App.css";
import Card from "./Card";
import DrawCard from "./main_game_components/DrawCard";

const GameScreen = ({ currentGame, backToHome }) => {
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
      <DrawCard draw={() => onNextCard(questions.length)} />
    </div>
  );
};

export default GameScreen;
