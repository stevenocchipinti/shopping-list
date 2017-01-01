import React from "react";
import Paper from "material-ui/Paper";

const style = {
  textAlign: "center",
  margin: "30px",
  padding: "30px",
  color: "#bbb"
};

export default props => {
  return (
    <Paper style={style} zDepth={1}>
      { props.children }
    </Paper>
  );
};
