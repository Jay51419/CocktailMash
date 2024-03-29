import {
  Box,
  Button,
  Center,
  Container,
  createStyles,
  MediaQuery,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { CSSProperties, useEffect, useState } from "react";
import { CocktailDB } from "../cocktaildb/cocktaildb";
import { SearchByIngredientModel } from "../cocktaildb/searchByIngredientModel";
import DrinkCard from "../components/drinkCard/drinkCard";
import Footer from "../components/footer/footer";
import Searchbar from "../components/searchbar/searchbar";

const api = new CocktailDB();
const topDrinks: SearchByIngredientModel[] = [
  {
    strDrink: "155 Belmont",
    strDrinkThumb:
      "https://www.thecocktaildb.com/images/media/drink/yqvvqs1475667388.jpg",
    idDrink: "15346",
  },
  {
    strDrink: "69 Special",
    strDrinkThumb:
      "https://www.thecocktaildb.com/images/media/drink/vqyxqx1472669095.jpg",
    idDrink: "13940",
  },
  {
    strDrink: "Aztec Punch",
    strDrinkThumb:
      "https://www.thecocktaildb.com/images/media/drink/uqwuyp1454514591.jpg",
    idDrink: "14364",
  },
];
const popularIngredients = ["Vodka", "Gin", "Rum", "Tequila"];
const randomIngredients = ["Dark rum", "Scotch", "Bitters"];
const ingredientImageSize = 350;
const useStyles = createStyles(() => ({
  hero: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100%",
    zIndex: -2,
  },
  overlay: {
    position: "relative",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    background: " linear-gradient(180deg, rgba(0,0,0,0) 70%, #1A1B1E 100%)",
  },
  quote: { fontSize: 48, color: "white", textAlign: "center" },
  heroCenter: { height: "100vh" },
  ingredients: {
    display: "flex",
    width: "100%",
  },
  popularIngredientsContainer: {
    position: "relative",
    height: ingredientImageSize,
    width: "100%",
  },
  popularIngredientsButtonWrapper: {
    marginTop: 60,
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    zIndex: 2,
  },
  drinksContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  randomIngredientsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
}));

const Home: NextPage = () => {
  const theme = useMantineTheme();
  const [activeIngredient, setAcitveIngredient] = useState(0);
  const [drinks, setDrinks] = useState<SearchByIngredientModel[]>(topDrinks);
  const router = useRouter();
  const { classes } = useStyles();

  function drinksBasedOnActiveIngredient(
    ingredient: string
  ): Promise<SearchByIngredientModel[]> {
    return api.searchByIngredient(ingredient).then((cocktail) => {
      return cocktail.drinks.slice(0, 3);
    });
  }

  return (
    <Box>
      <Box className={classes.hero}>
        <Image
          src="/hero-2.jpg"
          alt="background"
          layout="fill"
          objectFit={"cover"}
        />
        <Box className={classes.overlay} />
      </Box>

      <Container>
        <Box style={{ height: "100vh" }}>
          <Center className={classes.heroCenter}>
            <Box>
              <MediaQuery
                smallerThan={theme.breakpoints.sm}
                styles={{ fontSize: 32 }}
              >
                <h1 className={classes.quote}>
                  Let nobody thirst for good drink.
                </h1>
              </MediaQuery>
              <Box mx={40}>
                <Searchbar />
              </Box>
            </Box>
          </Center>
        </Box>
        <Center>
          <Box>
            <h1>Popular Ingredients</h1>
          </Box>
        </Center>
        <Box className={classes.popularIngredientsContainer}>
          {popularIngredients.map((name, index) => {
            const src = `https://www.thecocktaildb.com/images/ingredients/${name}-Medium.png`;
            const isIngredientActive = activeIngredient == index;
            const scale = isIngredientActive ? "scale(1)" : "scale(0.8)";
            const ingredientImageWrapperStyle: CSSProperties = {
              position: "absolute",
              width: ingredientImageSize,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              left: `calc(50% + ${
                ingredientImageSize * (index - activeIngredient)
              }px)`,
              transform: "translateX(-50%)" + scale,
              transition: "all 0.5s",
            };
            return (
              <UnstyledButton
                key={index}
                onClick={() =>
                  router.push({
                    pathname: "/drinks",
                    query: {
                      ingredient: name,
                    },
                  })
                }
              >
                <Box style={ingredientImageWrapperStyle}>
                  <img src={src} alt={name} />
                  <h3>{name}</h3>
                </Box>
              </UnstyledButton>
            );
          })}
        </Box>
        <Box className={classes.popularIngredientsButtonWrapper}>
          <Button
            color={"gray"}
            style={{
              opacity: activeIngredient == 0 ? 0 : 1,
            }}
            onClick={() => {
              const first = 0;
              setAcitveIngredient((i) => Math.max(first, i - 1));
            }}
          >
            {" "}
            {"<"}
          </Button>
          <Button
            color={"orange"}
            style={{
              opacity:
                activeIngredient == popularIngredients.length - 1 ? 0 : 1,
            }}
            onClick={() => {
              const last = popularIngredients.length - 1;
              setAcitveIngredient((i) => Math.min(i + 1, last));
            }}
          >
            {">"}
          </Button>
        </Box>
        <Center my={10}>
          <Box>
            <h1 style={{ textAlign: "center" }}>Top drinks</h1>
          </Box>
        </Center>
        <Box my={10} className={classes.drinksContainer}>
          {drinks.length !== 0 &&
            drinks.map((drink, _) => {
              return (
                <Box key={drink.idDrink} my={5}>
                  <DrinkCard
                    height={300}
                    id={drink.idDrink as string}
                    key={drink.idDrink}
                    image={drink.strDrinkThumb as string}
                    name={drink.strDrink as string}
                  ></DrinkCard>
                </Box>
              );
            })}
        </Box>
        <Center>
          <Box>
            <h1>Random Ingredients</h1>
          </Box>
        </Center>
        <Box className={classes.randomIngredientsContainer}>
          {randomIngredients.map((name, index) => {
            const src = `https://www.thecocktaildb.com/images/ingredients/${name}.png`;
            const ingredientImageWrapperStyle: CSSProperties = {
              height: 300,
              width: ingredientImageSize - 50,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            };
            return (
              <UnstyledButton
                key={name}
                onClick={() =>
                  router.push({
                    pathname: "/drinks",
                    query: {
                      ingredient: name,
                    },
                  })
                }
              >
                <Box my={20} key={index} style={ingredientImageWrapperStyle}>
                  <img style={{ height: 300 }} src={src} alt={name} />
                  <Text size={"lg"}>{name}</Text>
                </Box>
              </UnstyledButton>
            );
          })}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Home;
