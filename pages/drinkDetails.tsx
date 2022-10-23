import { useEffect, useState, useRef, LegacyRef } from "react"
import type { NextPage } from "next"
import { useRouter } from "next/router";
import CocktailModel from "./cocktaildb/coctailModel";
import CocktailDB from "./cocktaildb/cocktaildb";
import { Box, Container, createStyles, Divider, Grid, Group, Loader, SimpleGrid, Text, useMantineTheme } from "@mantine/core";
import { Footer } from "./footer/footer";

const api = new CocktailDB()

const cocktailMock: CocktailModel = {
    "idDrink": "11007",
    "strDrink": "Margarita",
    "strDrinkAlternate": null,
    "strTags": "IBA,ContemporaryClassic",
    "strVideo": null,
    "strCategory": "Ordinary Drink",
    "strIBA": "Contemporary Classics",
    "strAlcoholic": "Alcoholic",
    "strGlass": "Cocktail glass",
    "strInstructions": "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
    "strInstructionsES": null,
    "strInstructionsDE": "Reiben Sie den Rand des Glases mit der Limettenscheibe, damit das Salz daran haftet. Achten Sie darauf, dass nur der äußere Rand angefeuchtet wird und streuen Sie das Salz darauf. Das Salz sollte sich auf den Lippen des Genießers befinden und niemals in den Cocktail einmischen. Die anderen Zutaten mit Eis schütteln und vorsichtig in das Glas geben.",
    "strInstructionsFR": null,
    "strInstructionsIT": "Strofina il bordo del bicchiere con la fetta di lime per far aderire il sale.\r\nAvere cura di inumidire solo il bordo esterno e cospargere di sale.\r\nIl sale dovrebbe presentarsi alle labbra del bevitore e non mescolarsi mai al cocktail.\r\nShakerare gli altri ingredienti con ghiaccio, quindi versarli delicatamente nel bicchiere.",
    "strInstructionsZH-HANS": null,
    "strInstructionsZH-HANT": null,
    "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
    "strIngredient1": "Tequila",
    "strIngredient2": "Triple sec",
    "strIngredient3": "Lime juice",
    "strIngredient4": "Salt",
    "strIngredient5": null,
    "strIngredient6": null,
    "strIngredient7": null,
    "strIngredient8": null,
    "strIngredient9": null,
    "strIngredient10": null,
    "strIngredient11": null,
    "strIngredient12": null,
    "strIngredient13": null,
    "strIngredient14": null,
    "strIngredient15": null,
    "strMeasure1": "1 1/2 oz ",
    "strMeasure2": "1/2 oz ",
    "strMeasure3": "1 oz ",
    "strMeasure4": null,
    "strMeasure5": null,
    "strMeasure6": null,
    "strMeasure7": null,
    "strMeasure8": null,
    "strMeasure9": null,
    "strMeasure10": null,
    "strMeasure11": null,
    "strMeasure12": null,
    "strMeasure13": null,
    "strMeasure14": null,
    "strMeasure15": null,
    "strImageSource": "https://commons.wikimedia.org/wiki/File:Klassiche_Margarita.jpg",
    "strImageAttribution": "Cocktailmarler",
    "strCreativeCommonsConfirmed": "Yes",
    "dateModified": new Date("2015-08-18 14:42:59")
}

const useStyles = createStyles((theme) => ({
    cocktailImg: {
        height: 400
    },
    ingredientImg: {
        height: 180
    }
}))

function getCocktailByID(id: string): Promise<CocktailModel[]> {
    const cocktail = api.cocktailByID(id).then(cocktail => cocktail.drinks)
    return cocktail
}
function getCocktailByName(name: string): Promise<CocktailModel[]> {
    const cocktail = api.searchCocktailByName(name).then(cocktail => cocktail.drinks)
    return cocktail
}

const DrinkDetails: NextPage = () => {
    const router = useRouter()
    const { classes } = useStyles()
    const [error, setError] = useState(false)
    const [cocktail, setCocktail] = useState<CocktailModel>(cocktailMock)
    const measures = [
        cocktail.strMeasure1 as string,
        cocktail.strMeasure2 as string,
        cocktail.strMeasure3 as string,
        cocktail.strMeasure4 as string,
        cocktail.strMeasure5 as string,
        cocktail.strMeasure6 as string,
        cocktail.strMeasure7 as string,
        cocktail.strMeasure8 as string,
        cocktail.strMeasure9 as string,
        cocktail.strMeasure10 as string,
        cocktail.strMeasure11 as string,
        cocktail.strMeasure12 as string,
        cocktail.strMeasure13 as string,
        cocktail.strMeasure14 as string,
        cocktail.strMeasure15 as string,
    ]
    const ingredients = [
        cocktail.strIngredient1 as string,
        cocktail.strIngredient2 as string,
        cocktail.strIngredient3 as string,
        cocktail.strIngredient4 as string,
        cocktail.strIngredient5 as string,
        cocktail.strIngredient6 as string,
        cocktail.strIngredient7 as string,
        cocktail.strIngredient8 as string,
        cocktail.strIngredient9 as string,
        cocktail.strIngredient10 as string,
        cocktail.strIngredient11 as string,
        cocktail.strIngredient12 as string,
        cocktail.strIngredient13 as string,
        cocktail.strIngredient14 as string,
        cocktail.strIngredient15 as string,
    ]
    useEffect(() => {
        setError(false)
        if ("id" in router.query) {
            getCocktailByID(router.query.id as string).then(cocktail => setCocktail(cocktail[0])).catch(e => setError(true))
        }
        if ("name" in router.query) {
            getCocktailByName(router.query.name as string).then(cocktail => setCocktail(cocktail[0])).catch(e => setError(true))
        }
    }, [router.query])
    return (
        <div style={{ marginTop: 100 }}>
            {error ? (
                <Container>
                    <Text align="center" size={"xl"} >No details available</Text>
                </Container>
            ) : (<Container>
                <SimpleGrid cols={2} breakpoints={[{ maxWidth: 650, cols: 1 }]} >
                    <Box>
                        <Text my={10} size={"xl"} >{cocktail.strDrink}</Text>
                        <img className={classes.cocktailImg} src={cocktail.strDrinkThumb as string} alt="" />
                        <Divider my={10} />
                    </Box>
                    <Box>
                        <Text size={"xl"} my={10} >Instructions</Text>
                        <Text size={"xl"}>
                            {cocktail.strInstructions}
                        </Text>
                        <Divider my={10} />

                    </Box>

                </SimpleGrid>
                <Box my={20}>
                    <Text my={10} size={"xl"} >Ingredeints</Text>
                    <Group spacing={"xl"} >
                        {
                            ingredients.map((name, index) => name !== null && <ShowIngredient key={`${name}`} name={name} index={index} measures={measures} />)
                        }
                    </Group>
                </Box>
            </Container>)}
            <Footer></Footer>
        </div>)
}


const ShowIngredient = ({ name, index, measures }: { name: string, index: number, measures: string[] }) => {
    const { classes } = useStyles()

    return (<Box key={index} >
        <img src={`https://www.thecocktaildb.com/images/ingredients/${name}.png`} className={classes.ingredientImg} alt="" />
        <Text align="center" my={10}>{name} - {measures[index]}</Text>
    </Box>)
}


export default DrinkDetails;