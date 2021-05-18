import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import "../App.css";
import Card from "./Card";
import DrawCard from "./main_game_components/DrawCard";
import { mongoUpdate } from "../api/Api";

const GameScreen = ({
  currentGame,
  backToHome,
  roomID,
  mainArray,
  updateNextCard,
}) => {
  const questions = currentGame.questions;

  const [toggle, setToggle] = useState(true);
  const [transitionStyle, setTransitionStyle] = useState("slide");

  const hasNextCardBeenClicked = useRef(false);

  let currentQuestion = questions[mainArray.cardIndex];

  // this is a function that takes a time and makes a delay between actions
  const sleep = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, timeout);
    });
  };

  // get an element from the DOM?
  // if that item exists, swap the style from slide to slide active
  // wait a bit
  //swap the style back
  //set hasNextCardBeenCLicked back to false
  const performAnimation = async () => {
    const cardItem = document.getElementById("card-item");
    if (cardItem) {
      cardItem.className = cardItem.className.replace("slide active", "slide");
      await sleep(250);
      cardItem.className = cardItem.className.replace("slide", "slide active");
    }
    hasNextCardBeenClicked.current = false;
  };

  //when currentQuestion changes
  // check if hasNextCardBeenClicked doesnt exist
  //run perform animation
  useEffect(() => {
    if (!hasNextCardBeenClicked.current) {
      performAnimation();
    }
  }, [currentQuestion]);

  //set hasNextCardBeenClicked to true
  // generate random number from the length of the questions
  // updatenextcard with a random index
  // run perform animation
  const onNextCard = async () => {
    hasNextCardBeenClicked.current = true;
    const result = Math.floor(Math.random() * questions.length);
    await updateNextCard(result);
    performAnimation();
  };

  console.log("mainArray", mainArray.cardIndex);

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
        questions={questions}
      />
      <DrawCard
        draw={() => {
          console.log("draw called");
          onNextCard(questions.length);
        }}
      />
    </div>
  );
};

export default GameScreen;
