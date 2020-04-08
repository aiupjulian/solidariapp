// listado de usuarios mas solidarios (top 10)
import React from "react";
import { Heading, Hero, Icon } from "react-bulma-components";
import { Link } from "react-router-dom";

import "./Home.css";
import { categories, createFilter } from "../../utils/filters";
import pages from "../../pages";

const Home = () => (
  <>
    <div className="HeroContainer">
      <div className="BackgroundImage"></div>
      <Hero>
        <Hero.Body>
          <Heading>Bienvenido a Solidariapp</Heading>
          <Heading subtitle>
            Conectamos a quienes necesitan ayuda con aquellos dispuestos a
            darla.
          </Heading>
        </Hero.Body>
      </Hero>
    </div>
    <div className="CategoriesContainer">
      <Heading subtitle className="CategoriesTitle">
        Categorias
      </Heading>
      <div className="CategoriesList">
        {Object.values(categories).map((category) => (
          <Link
            key={category.name}
            to={{
              pathname: pages.RequestList.path,
              search: createFilter({ category: category.path }),
            }}
            className={`CategoryLink ${category.name}`}
            style={category.style}
          >
            <Icon size="medium">
              <span className={`fas fa-${category.icon} fa-2x`} />
            </Icon>
            <span className="CategoryName">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  </>
);

export default Home;
