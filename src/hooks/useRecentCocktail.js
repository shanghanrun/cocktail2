import { useQuery } from "@tanstack/react-query";
import { recentCocktailApi } from "../api/api";

const fetchRecentCocktail = () => {
	return recentCocktailApi.get();
};
export const useRecentCocktail = () => {
	return useQuery({
		queryKey: ["cocktail-recent"],
		queryFn: () => fetchRecentCocktail(),
		select: (result) => result.data,
	});
};
