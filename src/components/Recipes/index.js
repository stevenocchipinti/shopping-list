import React from "react"
import styled from "styled-components"
import { Link as RouterLink, useLocation } from "react-router-dom"
import ReactMasonry from "react-masonry-css"
import { Typography, Paper } from "@material-ui/core"
import { useAppState } from "../Backend"
import { Emoji } from "../Emoji"
import { ReactComponent as PlaceholderImg } from "./fork_knife.svg"

const gutter = "1rem"

const Link = styled(RouterLink)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const Placeholder = styled(Paper).attrs({ elevation: 0, variant: "outlined" })`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  padding: 3rem;
  && {
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`

const Masonry = styled(ReactMasonry)`
  display: flex;
  margin-left: -${gutter};
  padding: ${gutter};
  width: auto;

  .masonry-column {
    padding-left: ${gutter};
    background-clip: padding-box;
  }
`

const Image = styled.img`
  border-radius: 10px;
  width: 100%;
`

const Figure = styled.figure`
  width: 100%;
  margin: 0 0 ${gutter};
`

const PlaceholderTile = styled(Paper)`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PlaceholderImage = styled(PlaceholderImg)`
  height: 60px;
  fill: #bbb;
`

const PlaceholderRecipe = ({ emoji }) => (
  <PlaceholderTile>
    {emoji ? <Emoji size={50} emoji={emoji} /> : <PlaceholderImage />}
  </PlaceholderTile>
)

const Tile = ({ image, title, href, emoji }) => (
  <Link to={href}>
    <Figure>
      {image ? <Image src={image} /> : <PlaceholderRecipe emoji={emoji} />}
      <Typography color="textSecondary" component="figcaption">
        {title}
      </Typography>
    </Figure>
  </Link>
)

const Recipes = () => {
  const { pathname } = useLocation()
  const { recipes } = useAppState()

  if (Object.keys(recipes).length === 0)
    return (
      <Placeholder>
        <Typography paragraph>No recipes yet</Typography>
        <Typography align="center">
          Add items with ingredients to the planner to create recipes
        </Typography>
      </Placeholder>
    )

  return (
    <Masonry columnClassName="masonry-column">
      {Object.keys(recipes).map(slug => {
        const { title, image, emoji } = recipes[slug]
        return (
          <Tile
            key={slug}
            href={`${pathname}/${slug}`}
            title={title}
            image={image}
            emoji={emoji}
          />
        )
      })}
    </Masonry>
  )
}

export default Recipes
