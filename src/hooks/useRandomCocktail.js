import { useQuery } from "@tanstack/react-query";
import { randomSelectionCocktailApi } from "../api/api";

const fetchRandomCocktail = () => {
	return randomSelectionCocktailApi.get();
};
export const useRandomCocktail = () => {
	return useQuery({
		queryKey: ["cocktail-random"],
		queryFn: fetchRandomCocktail,
		select: (result) => result.data,
	});
};
