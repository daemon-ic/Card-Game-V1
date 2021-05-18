import React from "react";
import RefreshRoundedIcon from "@material-ui/icons/RefreshRounded";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

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

const DrawCard = ({ draw }) => {
  const classes = useStyles();
  return (
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
          onClick={draw}
        />
      </Tooltip>
    </div>
  );
};

export default DrawCard;
