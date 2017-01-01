import React from "react";
import Paper from "material-ui/Paper";

export default () => {
  const style = {
    textAlign: "center",
    margin: "30px",
    padding: "30px",
    color: "#bbb"
  };

  return (
    <Paper style={style} zDepth={1}>
      No logs yet
    </Paper>
  );
};
