import { useQuery } from "@tanstack/react-query";
import { latestCocktailApi } from "../api/api";

const fetchLatestCocktail = () => {
	return latestCocktailApi.get();
};
export const useLatestCocktail = () => {
	return useQuery({
		queryKey: ["cocktail-latest"],
		queryFn: () => fetchLatestCocktail(),
		select: (result) => result.data,
	});
};
