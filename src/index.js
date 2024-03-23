import React from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
import { unregister } from "./serviceWorker";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: Roboto, sans-serif;
    box-sizing: border-box;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  height: 100vh;

  p {
    text-align: center;
    font-size: 1.25rem;
    line-height: 1.5;
    a {
      color: #007bff;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  }
`;

const LinkButton = styled.a`
  padding: 1rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Root = () => {
  return (
    <Main>
      <GlobalStyle />
      <h1>Shopping Planner</h1>
      <img
        width={150}
        height={150}
        src="/android-chrome-192x192.png"
        alt="shoppingplanner logo"
      />
      <p>
        This app has moved to a new location.
        <br />
        <br />
        Please update your bookmark to use{" "}
        <a href="https://shoppingplanner.web.app">
          shoppingplanner.web.app
        </a>{" "}
        instead.
      </p>
      <LinkButton href="https://shoppingplanner.web.app">
        Goto new URL
      </LinkButton>
    </Main>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
unregister();
