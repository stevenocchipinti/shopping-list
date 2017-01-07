import React from "react";

import "./Homepage.css";

export default props => (
  <div className="homepage">
    <h1>Fat Log</h1>
    <p>Log and graph your fat, weight and waist measurements</p>
    <button onClick={props.signIn} className="ghost">Get Started</button>
  </div>
);
