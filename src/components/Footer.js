import React from "react";

const styles = {
  wrapper: { position: "relative", height: "100px", textAlign: "center" },
  content: { position: "absolute", bottom: 10, color: "#aaa", width: "100%" },
  link: { textDecoration: "none", color: "inherit" }
};

export default () => (
  <footer style={styles.wrapper}>
    <p style={styles.content}>
      Crafted by <a style={styles.link} href="//stevenocchipinti.com">Steve Occhipinti</a>
    </p>
  </footer>
);
