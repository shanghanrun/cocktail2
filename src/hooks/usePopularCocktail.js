import { useQuery } from "@tanstack/react-query";
import { popularCocktailApi } from "../api/api";

const fetchPopularCocktail = () => {
	return popularCocktailApi.get();
};
export const usePopularCocktail = () => {
	return useQuery({
		queryKey: ["cocktail-popular"],
		queryFn: () => fetchPopularCocktail(),
		select: (result) => result.data,
	});
};
