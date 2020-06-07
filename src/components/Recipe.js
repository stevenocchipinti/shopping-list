import React from "react"

export default props => {
  console.log(props)
  return <h1>Recipe for {props.recipeId}</h1>
}
