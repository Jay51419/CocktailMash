import { Autocomplete, Group, MediaQuery, Select, useMantineTheme } from '@mantine/core';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from "react-icons/ai"
import CocktailDB from '../cocktaildb/cocktaildb';

type SearchType = "Cocktail" | "Ingredient"

export function Searchbar() {
    const theme = useMantineTheme()
    const router = useRouter()
    const popularDrinks = ["Mojito", "Old Fashioned", "Long Island Tea", "Negroni", "Whiskey Sour", "Dry Martini", "Daiquiri", "Margarita",]
    const popularIngredients = ["Vodka", "Gin", "Rum", "Tequila"]
    const [suggestion, setSuggestion] = useState<(string[])>(popularDrinks)
    const [suggestionValue, setSuggestionValue] = useState<(string)>("")
    const [searchType, setSearchType] = useState<SearchType>("Cocktail")


    const api = new CocktailDB()
    useEffect(() => {
        onChange(suggestionValue)
    }, [searchType])
    const onChange = (value: string) => {
        setSuggestionValue(value)
        if (searchType == "Cocktail") {
            if (value == "") {
                setSuggestion(popularDrinks)
            } else {
                api.searchCocktailByName(value).then(cocktail => {
                    if (cocktail.drinks !== null) {
                        const newSuggestion: string[] = cocktail.drinks.map((e, i) => {
                            return e["strDrink"] == null ? "" : e["strDrink"].toString()
                        })
                        setSuggestion(newSuggestion)
                    }
                })
            }
        } else if (searchType == "Ingredient") {
            if (value == "") {
                setSuggestion(popularIngredients)
            } else {
                api.searchIngredientByName(value).then(cocktail => {
                    if (cocktail.ingredients !== null) {
                        const newSuggestion: string[] = cocktail.ingredients.map((e, i) => {
                            return e["strIngredient"] == null ? "" : e["strIngredient"].toString()
                        })
                        setSuggestion(newSuggestion)
                    }
                })
            }
        }
    }

    return (
        <Group spacing={0}  >
            <MediaQuery largerThan={theme.breakpoints.sm} styles={{width:"70%"}} >
            <Autocomplete
                size={"lg"}
                value={suggestionValue}
                variant='default'
                styles={(theme) => ({
                    root:{
                        width:"100%",
                    },
                    input: {
                        background: "rgba(0,0,0,0.4)",
                        ":focus": {
                            borderColor: theme.colors.orange[6]
                        }
                    }
                })}
                onChange={onChange}
                onClick={(e)=>{
                    if (e.detail === 0){
                        console.log(e);
                    }
                }}
                onItemSubmit={(e)=>{
                    if(searchType == "Ingredient"){
                        router.push({
                            pathname:"drinks",
                            query:{
                                "ingredient":e.value
                            }
                        })
                    }else if (searchType == "Cocktail"){
                        router.push({
                            pathname:"drinkDetails",
                            query:{
                                "name":e.value
                            }
                        })
                    }
                   
                }}
                placeholder="Search"
                icon={<AiOutlineSearch size={16} />}
                limit={4}
                data={suggestion}
                dropdownPosition="bottom"
                rightSectionWidth={150}
            />
            </MediaQuery>
            <MediaQuery largerThan={theme.breakpoints.sm} styles={{width:150}} >
            <Select
                size={"lg"}
                styles={(theme) => ({
                    root:{
                        width:"100%"
                    },
                    item: {
                        "&[data-selected]": {
                            background: theme.colors.orange[6],
                            '&, &:hover': {
                                background: theme.colors.orange[6],
                            }
                        }
                    },
                    input: {
                        fontSize: 16,
                        background: "rgba(0,0,0,0.4)",
                        ":focus": {
                            borderColor: theme.colors.orange[6]
                        }
                    }
                })}
                value={searchType}
                onChange={val => {
                    setSearchType(val as SearchType)

                }}
                
                data={[
                    { value: 'Cocktail', label: 'Cocktail' },
                    { value: 'Ingredient', label: 'Ingredient' },
                ]}
            />
            </MediaQuery>
        </Group>
    );
}