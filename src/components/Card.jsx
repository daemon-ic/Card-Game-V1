import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "../App.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  cardText: {
    color: "#303545",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: "25px",
    width: "75%",
    [theme.breakpoints.down("xs")]: {
      fontSize: "17px",
    },
  },
  bottomSection: {
    marginTop: "20px",
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
      marginBottom: "40px",
    },
  },
}));

const Card = ({
  copyToClipboard,
  currentGame,
  currentQuestion,
  transitionStyle,
  onNextCard,
  questions,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function copyToClipboard() {
    var input = document.body.appendChild(document.createElement("input"));
    input.value = currentQuestion;
    input.focus();
    input.select();
    document.execCommand("copy");
    input.parentNode.removeChild(input);

    setOpen(true);
  }

  return (
    <>
      <Paper
        className={transitionStyle}
        elevation={3}
        style={{
          borderRadius: "15px",
          maxWidth: "520px",
          width: "50vw",
          height: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 className={classes.cardText}>{currentQuestion}</h1>
        </div>
        <div className={classes.bottomSection}>
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              textAlign: "center",
              fontWeight: "bold",
              color: "lightgray",
              fontSize: "0.5rem",
            }}
          >
            {currentGame.name}
          </div>
          <Button style={{ fontWeight: "bold" }} onClick={copyToClipboard}>
            Copy
          </Button>
        </div>
      </Paper>

      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Question Copied!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Card;
