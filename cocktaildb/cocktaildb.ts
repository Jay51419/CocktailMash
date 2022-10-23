import {CocktailModel} from "./coctailModel"
import {IngredientModel} from "./ingredientModel"
import {SearchByIngredientModel} from "./searchByIngredientModel"

export  class CocktailDB {

    
    private api = "https://www.thecocktaildb.com/api/json/v1/1/"
    private search = this.api + "search.php?"
    private lookup = this.api + "lookup.php?"
    private filter = this.api + "filter.php?"
    private list = this.api + "list.php?"


    async searchCocktailByName(name: string): Promise<{ drinks: CocktailModel[] }> {
        const res = await fetch(this.search + "s=" + name)
        return res.json()
    }


    async listAllCocktailByFirstLetter(letter: string): Promise<{ drinks: CocktailModel[] }> {
        const res = await fetch(this.search + "f=" + letter)
        return res.json()
    }


    async cocktailByID(id: string): Promise<{ drinks: CocktailModel[] }> {
        const res = await fetch(this.lookup + "i=" + id)
        return res.json()
    }

    async searchIngredientByName(name: string): Promise<{ ingredients: IngredientModel[] }> {
        const res = await fetch(this.search + "i=" + name)
        return res.json()
    }


    async ingredientByID(name: string): Promise<{ ingredients: IngredientModel[] }> {
        const res = await fetch(this.lookup + "iid=" + name)
        return res.json()
    }


    async searchByIngredient(name: string): Promise<{ drinks: SearchByIngredientModel[] }> {
        const res = await fetch(this.filter + "i=" + name)
        return res.json()
    }


    async filterByAlcoholic(name: string): Promise<{ drinks: SearchByIngredientModel[] }> {
        const res = await fetch(this.filter + "a=" + name)
        return res.json()
    }


    async filterByCategory(name: string): Promise<{ drinks: SearchByIngredientModel[] }> {
        const res = await fetch(this.filter + "c=" + name)
        return res.json()
    }


    async filterByGlass(name: string): Promise<{ drinks: SearchByIngredientModel[] }> {
        const res = await fetch(this.filter + "g=" + name)
        return res.json()
    }


    async listOfCategories(): Promise<{ drinks: { strCategory: string | null }[] }> {
        const res = await fetch(this.list + "c=list")
        return res.json()
    }


    async listOfGlasses(): Promise<{ drinks: { strGlass: string | null }[] }> {
        const res = await fetch(this.list + "g=list")
        return res.json()
    }


    async listOfIngredients(): Promise<{ drinks: { strIngredient1: string | null }[] }> {
        const res = await fetch(this.list + "i=list")
        return res.json()
    }


    async listOfAlcoholic(): Promise<{ drinks: { strAlcoholic: string | null }[] }> {
        const res = await fetch(this.list + "a=list")
        return res.json()
    }
}