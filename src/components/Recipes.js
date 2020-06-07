import React from "react"
import styled from "styled-components"
import { Link as RouterLink, useLocation } from "react-router-dom"
import ReactMasonry from "react-masonry-css"
import { Typography } from "@material-ui/core"

const gutter = "1rem"

const Link = styled(RouterLink)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
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

const Tile = ({ image, title, href }) => (
  <Link to={href}>
    <Figure>
      <Image src={image} />
      <Typography color="textSecondary" component="figcaption">
        {title}
      </Typography>
    </Figure>
  </Link>
)

const content = [
  {
    title: "Burrito bowls",
    slug: "burrito-bowls",
    image:
      "https://lh3.googleusercontent.com/o0Tmo51HLv39NHfKwujuiLSn_jCu4VzTFbsbmiXMTbDh7DPZAhGvtvEp9pFQZNx3aaSnO2wBScHoUIULdx71lbwv7O6HpPmGCWQLqYjJMSTHZOBFIR7NmQmCliAVAWh8-AJYPidJvz8=w600",
  },
  {
    title: "Pizza",
    slug: "pizza",
    image:
      "https://lh3.googleusercontent.com/zoQElwEE415b2B-9g4X05VYE-N7RE61pbUB4aLbT4UkpPSOezaHDojM5XtyQEj1j7iRRSlAhEjrciJGrZnn2zpfwYV9slh4b_SOVPkOeuDVlmJsBns3Ugs6zXjn5DTSTbRyuNvU6daA=w600",
  },
  {
    title: "Burgers",
    slug: "burgers",
    image:
      "https://lh3.googleusercontent.com/90OdJ8-CHdUjW0RNg1JlGicw_GUVYf6OfMF8d2SnT5_1SlaosL5rAywmer3729AXjnHX1Z-pVaw0hg6ShWhA9hUzsIZ_d-kRrh1kIF8z942M_2igMPFFxcZc5Ykm_3C6xBKUvLYpV8Q=w600",
  },
  {
    title: "rando",
    slug: "burgers",
    image: "https://loremflickr.com/330/220/recipe",
  },
]

const Recipes = () => {
  const { pathname } = useLocation()

  return (
    <Masonry columnClassName="masonry-column">
      {content.map(({ title, image, slug }) => (
        <Tile
          key={slug}
          image={image}
          title={title}
          href={`${pathname}/${slug}`}
        />
      ))}
    </Masonry>
  )
}

export default Recipes
