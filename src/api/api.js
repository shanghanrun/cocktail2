import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;

export const alcoholApi = axios.create({
	baseURL: "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic",
});
export const nonAlcoholApi = axios.create({
	baseURL: "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic",
});
export const originalDrinkApi = axios.create({
	baseURL: "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink",
});

export const cocktailApi= axios.create({
	baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail'
})
export const cocktailGlassApi= axios.create({
	baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass'
})
export const champagneFluteApi= axios.create({
	baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Champagne_flute'
})

//===================

export const popularCocktailApi = axios.create({
	baseURL: `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/popular.php`,
});

export const recentCocktailApi = axios.create({
	baseURL: `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/latest.php`,
});

export const randomSelectionCocktailApi = axios.create({
	baseURL: `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/randomselection.php`,
})

export const DefaultApi = axios.create({
	baseURL: `https://www.thecocktaildb.com/api/json/v2/${API_KEY}`,
});

export const SearchByIngredientApi= axios.create({
	baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php'
})

export const latestCocktailApi = axios.create({
	baseURL: `https://www.thecocktaildb.com/api/json/v2/${API_KEY}/latest.php`,
});

export const searchApi = axios.create({
	baseURL: "/api/json/v1/1",
	headers: {
		"Content-Type": "application/json",
	},
});
