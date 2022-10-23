import { Anchor, Box, Center, Container, createStyles, Group, Pagination, Text, ThemeIcon, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import {CocktailDB} from '../cocktaildb/cocktaildb'
import {CocktailModel} from '../cocktaildb/coctailModel'
import  DrinkCard  from '../components/drinkCard/drinkCard'
import Footer from '../components/footer/footer'

const alphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"] as const

const useStyles = createStyles((theme) => ({
    alphabet: {
        cursor: "pointer",
        ":hover": {
            color: theme.colors.orange[6]
        }
    },
    alphabets: {
        backgroundColor: theme.colors.gray,
        zIndex: 2,
        transition: "opacity 0.3s"

    },
    drinks: {
        marginTop: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}))

const api = new CocktailDB()

function getDrinks(char: string): Promise<CocktailModel[]> {
    const drinks = api.listAllCocktailByFirstLetter(char).then(cocktail => {
        return cocktail.drinks
    })
    return drinks
}
function getDrinksBasedOnIngredient(ingredient: string): Promise<CocktailModel[]> {
    const drinks = api.searchByIngredient(ingredient).then(cocktail => {
        return cocktail.drinks
    })
    return drinks
}
function getDrinksBasedOnGlass(glass: string): Promise<CocktailModel[]> {
    const drinks = api.filterByGlass(glass).then(cocktail => {
        return cocktail.drinks
    })
    return drinks
}
function getDrinksBasedOnCategory(category: string): Promise<CocktailModel[]> {
    const drinks = api.filterByCategory(category).then(cocktail => {
        return cocktail.drinks
    })
    return drinks
}
type Alphabets = typeof alphabets[number]

interface DrinksProps {
    ingredient?: string
    glass?: string
    category?: string
}

type FilterType = "ingredient" | "glass" | "category" | "char"

const Drinks: NextPage = ({ }: DrinksProps) => {
    const { classes } = useStyles()
    const theme = useMantineTheme()
    const largerThanSM = useMediaQuery("(min-width:"+theme.breakpoints.sm+"px)")
    const router = useRouter()
    const [error,setError] = useState(false)
    const [activeChar,setActiveChar] = useState<Alphabets>("a")
    const [filterType,setFilterType] = useState<FilterType>("char")
    const [drinks, setDrinks] = useState<CocktailModel[]>([])
    useEffect(() => {
        setError(false)
        switch (true) {
            case "ingredient" in router.query:
                setFilterType("ingredient")
                getDrinksBasedOnIngredient(router.query.ingredient as string).then(drinks => setDrinks(drinks)).catch(e=>setError(true))
                break;
            case "glass" in router.query:
                setFilterType("glass")
                getDrinksBasedOnGlass(router.query.glass as string).then(drinks => setDrinks(drinks)).catch(e=>setError(true))
                break;
            case "category" in router.query:
                setFilterType("category")
                getDrinksBasedOnCategory(router.query.category as string).then(drinks => setDrinks(drinks)).catch(e=>setError(true))
                break;
            default:
                setFilterType("char")
                getDrinks(activeChar).then(drinks => setDrinks(drinks)).catch(e=>setError(true))
                break;
        }
    }, [router.query,activeChar])
    const charTab = () => {
        return <Center>
            <Group p={10} className={classes.alphabets}  >
                {
                    alphabets.map(char => {
                        const color = activeChar == char ? theme.colors.orange[6] : "dimmed"
                        return <Text key={char} onClick={() => setActiveChar(char)} color={color} className={classes.alphabet} >{char.toUpperCase()}</Text>
                    })
                }
            </Group>
        </Center>
    }

    const headerTab = (header: string) => {
        return <Group position="apart" px="md">
            <Text size={"xl"} weight={500}>Drinks based on {header}</Text>
            <Anchor onClick={() => {
                router.replace("/drinks")
                // getDrinks(activeChar).then(drinks=>setDrinks(drinks))
                }} size="xs">
                Clear
            </Anchor>
        </Group>
    }

    const getHeader = (): string => {
        switch (filterType) {
            case "ingredient":
                return router.query.ingredient as string
            case "category":
                return router.query.category as string
            case "glass":
                return router.query.glass as string
            default:
                return ""
        }
    }
    return <Box mt={100}>
        <Container>
            {
                filterType !== "char"? headerTab(getHeader()) : charTab() 
            }

            <Group className={classes.drinks} >

                {
                    error&&<Text size={"xl"} >No drinks available</Text>
                }
                {
                    drinks.map(drink => {
                        return <DrinkCard id={drink.idDrink as string} height={largerThanSM ?180:300} key={drink.idDrink} image={drink.strDrinkThumb as string} name={drink.strDrink as string} />
                    })
                }
            </Group>
        </Container>
        <Footer />

    </Box>
}


export default Drinks