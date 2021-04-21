import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";

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

const PrevPage = ({ idxDown, disable }) => {
  const classes = useStyles();
  return (
    <div className={classes.button}>
      <Button onClick={idxDown} color="primary" disabled={disable}>
        <ChevronLeftRoundedIcon style={{ height: "50px", width: "50px" }} />
      </Button>
    </div>
  );
};

export default PrevPage;
