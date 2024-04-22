import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../api/api";

const searchCocktailsByName = (keyword) => {
	return searchApi.get(`/search.php?s=${encodeURIComponent(keyword)}`).then((response) => {
		// API 응답에서 drinks 배열을 안전하게 처리
		const drinks = response.data && response.data.drinks ? response.data.drinks : [];
		if (!keyword) {
			// 키워드가 없으면 전체 리스트 반환
			return { drinks };
		}
		// 키워드가 있으면 strDrink 기반으로 필터링하여 반환
		const filteredData = drinks.filter((drink) =>
			drink.strDrink.toLowerCase().includes(keyword.toLowerCase()),
		);
		return { drinks: filteredData };
	});
};

export const useSearchCocktailsByName = (keyword) => {
	return useQuery({
		queryKey: ["search-cocktail-by-name", keyword],
		queryFn: () => searchCocktailsByName(keyword),
		select: (result) => result.drinks || [], // result가 항상 drinks 속성을 가지는 객체를 반환하도록 보장
	});
};
