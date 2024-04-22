import { useQuery } from "@tanstack/react-query";
import { DefaultApi } from "../api/api";

const fetchSearchByIngredient = (base) => {
	return DefaultApi.get(`/filter.php?i=${base}`)
    
};

const shuffleArray = (array) => {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const useSearchByIngredient = (base,id) => {
	return useQuery({
		queryKey: ["search-by-ingredient",{base,id}],
		queryFn: () => fetchSearchByIngredient(base,id),
        select: (result) => {
            // Shuffle the drinks
            const shuffledDrinks = shuffleArray(result.data.drinks);
            // Filter out drinks with idDrink matching the provided id
            const filteredDrinks = shuffledDrinks.filter(drink => drink.idDrink !== id);
            // Return a slice of the filtered drinks array
            return filteredDrinks.slice(0, 10);
        },
		// select: (result) => shuffleArray(result.data.drinks).slice(0,10),
	});
};
