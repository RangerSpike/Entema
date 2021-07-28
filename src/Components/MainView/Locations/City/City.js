import React from "react";
import * as s from "./City.styles";

const City = (props) => {
  const city = props.match.params.city;
  const cities = {
    california: {
      img: "/images/cities/california.png",
      description: "California is chilly",
    },
    washington: {
      img: "/images/cities/washington.png",
      description: "Washington is sunny",
    },
    florida: {
      img: "/images/cities/florida.png",
      description: "Florida is boring",
    },
    texas: {
      img: "/images/cities/texas.png",
      description: "Texas is awesome",
    }
  };

  return (
    <s.CityContainer>
      <s.CityImage img={cities[city]["img"]} />
      <s.CityDescription>
        {cities[city]["description"]}
      </s.CityDescription>
    </s.CityContainer>
  );
};

export default City;
