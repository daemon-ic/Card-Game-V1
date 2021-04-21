import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";

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

const NextPage = ({ idxUp, disable }) => {
  const classes = useStyles();
  return (
    <div className={classes.button}>
      <Button onClick={idxUp} color="primary" disabled={disable}>
        <ChevronRightRoundedIcon style={{ height: "50px", width: "50px" }} />
      </Button>
    </div>
  );
};

export default NextPage;
