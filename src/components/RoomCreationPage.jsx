import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  input: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const RoomCreationPage = ({
  onRoomCreation,
  setEnteredHostName,
  enteredHostName,
  setEnteredRoomID,
  enteredRoomID,
  ghostEnteredRoomID,
  open,
  setOpen,
  roomErrorMessage,
}) => {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.main}>
      <h1 style={{ color: "#303545" }}>Welcome</h1>
      <TextField
        style={{ paddingTop: "30px" }}
        placeholder="Enter your name"
        variant="outlined"
        value={enteredHostName}
        onChange={(e) => setEnteredHostName(e.currentTarget.value)}
      />
      <TextField
        style={{ paddingTop: "10px" }}
        placeholder="Room ID (For guests) "
        variant="outlined"
        value={enteredRoomID}
        onChange={(e) => {
          setEnteredRoomID(e.currentTarget.value);
          ghostEnteredRoomID.current = e.currentTarget.value;
        }}
      />
      <div style={{ paddingTop: "10px" }}>
        {enteredRoomID ? (
          <Button color="primary" onClick={onRoomCreation}>
            Join Room
          </Button>
        ) : (
          <Button color="primary" onClick={onRoomCreation}>
            Create room
          </Button>
        )}
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {roomErrorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RoomCreationPage;
