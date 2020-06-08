import React from "react"
import styled from "styled-components"
import { Link as RouterLink } from "react-router-dom"
import {
  Typography,
  Link as MuiLink,
  Paper as MuiPaper,
  IconButton,
} from "@material-ui/core"
import {
  Instagram as InstagramIcon,
  ArrowBack as BackIcon,
} from "@material-ui/icons"

import { Emoji } from "./Emoji"
import { useAppState } from "./Backend"
import AppBar from "./AppBar"
import { unslugify } from "../helpers"

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
`

const Img = styled.img`
  width: 100%;
  object-fit: cover;
  max-height: 40vh;
`

const BackButton = styled(IconButton).attrs({
  component: RouterLink,
  color: "inherit",
  edge: "start",
  "aria-label": "back",
})`
  && {
    position: absolute;
    top: 0.7rem;
    left: 1.5rem;
    background: ${({ theme }) => theme.palette.background.default};
    color: ${({ theme }) => theme.palette.text.primary};
  }
`

const Title = styled(Typography).attrs({ variant: "h4", color: "textPrimary" })`
  && {
    margin-left: 1rem;
  }
`

const TitleRow = styled.div`
  display: flex;
  margin-bottom: 2rem;
  margin-top: 0.5rem;
`

const Link = styled(MuiLink)`
  display: flex;
  align-items: center;
`

const Paper = styled(MuiPaper)`
  padding: 1rem;
`

const Description = styled.div`
  margin: 1rem 0;
`

export default ({ recipeId, listId }) => {
  const { recipes } = useAppState()
  const recipe = recipes?.[recipeId]
  if (!recipe) return null

  const back = `/list/${listId}/recipes`
  const { title, emoji, image, description, instagram, ingredients } = recipe
  return (
    <>
      {image ? (
        <>
          <BackButton to={back}>
            <BackIcon />
          </BackButton>
          <Img src={image} />
        </>
      ) : (
        <AppBar title="" back={back} />
      )}
      <Wrapper>
        <TitleRow>
          {emoji && <Emoji emoji={emoji} size={40} />}
          <Title>{title}</Title>
        </TitleRow>
        <Paper>
          {instagram && (
            <Link href={instagram} rel="noopener noreferrer" target="_blank">
              <InstagramIcon />
              &nbsp; Instagram
            </Link>
          )}
          {description && <Description> {description} </Description>}
          {ingredients && (
            <ul>
              {ingredients.map(ingredient => (
                <li key={ingredient}>{unslugify(ingredient)}</li>
              ))}
            </ul>
          )}
        </Paper>
      </Wrapper>
    </>
  )
}
