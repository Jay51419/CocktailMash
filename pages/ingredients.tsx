import { Container, createStyles, Group,  useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import type { NextPage } from 'next'
import { useEffect, useState } from "react"
import CocktailDB from './cocktaildb/cocktaildb'
import { Footer } from './footer/footer'
import { IngredientCard } from './ingredientCard/ingredientCard'

const alphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"] as const

const useStyles = createStyles((theme) => ({
    alphabet: {
        cursor: "pointer",
        ":hover": {
            color: theme.colors.orange[6]
        }
    },
    alphabets: {
        position: "fixed",
        backgroundColor: theme.colors.gray,
        zIndex: 2,
        transition: "opacity 0.3s"

    },
    drinks: {
        marginTop: 120,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}))

const api = new CocktailDB()

function getIngredients(): Promise<{
    strIngredient1: string | null;
}[]> {
    const ingredients = api.listOfIngredients().then(val => {
        return val.drinks
    })
    return ingredients
}
type Alphabets = typeof alphabets[number]
const Ingredients: NextPage = () => {
    const theme = useMantineTheme()
    const largerThanSM = useMediaQuery("(min-width:"+theme.breakpoints.sm+"px)")
    const { classes } = useStyles()
    const [ingredients, setIngredients] = useState<{
        strIngredient1: string | null;
    }[]>([])

    useEffect(() => {
        getIngredients().then(ingredients => setIngredients(ingredients))
    }, [])
    return <div style={{ marginTop: 100 }} >
        <Container>
            <Group className={classes.drinks} >
                {
                    ingredients.map(drink => {
                        return <IngredientCard height={largerThanSM?180:300} key={drink.strIngredient1} name={drink.strIngredient1 as string} />
                    })
                }
            </Group>
        </Container>
        <Footer />

    </div>
}


export default Ingredients