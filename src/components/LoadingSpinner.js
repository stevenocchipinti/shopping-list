import React from "react";
import RefreshIndicator from "material-ui/RefreshIndicator";

const styles = {
  wrapper: {
    marginTop: "30px",
    textAlign: "center",
    position: "relative"
  },
  indicator: {
    display: "inline-block",
    position: "relative"
  }
};

export default () => {
  return (
    <div style={styles.wrapper}>
      <RefreshIndicator
        size={40}
        left={10}
        top={0}
        status="loading"
        style={styles.indicator}
      />
    </div>
  );
};
