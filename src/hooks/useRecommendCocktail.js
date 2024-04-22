import { useQuery } from "@tanstack/react-query";
import { randomSelectionCocktailApi } from "../api/api";
import { useEffect } from "react";

const fetchRecommendCocktail = async (base) => {
    const filteredCocktails = [];
    const addedIds = new Set(); // 이미 추가된 칵테일의 ID를 추적하기 위한 Set

    // 필터링된 칵테일이 3개 미만인 경우에만 추가 데이터를 가져오도록 수정
    while (filteredCocktails.length < 3) {
        // API로부터 랜덤 칵테일 목록 가져오기
        const response = await randomSelectionCocktailApi.get();
        const cocktails = response.data.drinks;

        // 추가 데이터를 반복하며 필터링
        for (const cocktail of cocktails) {
            // 이미 추가된 칵테일인지 확인
            if (!addedIds.has(cocktail.idDrink) && cocktail.strIngredient1 === base) {
                filteredCocktails.push(cocktail);
                addedIds.add(cocktail.idDrink); // 추가된 칵테일의 ID를 추가
            }
            // 만약 3개 이상의 칵테일을 찾았다면 종료
            if (filteredCocktails.length >= 3) {
                break;
            }
        }
    }

    return filteredCocktails;
};

export const useRecommendCocktail = (base) => {
    return useQuery({
        queryKey: ["cocktail-recommend" ,base],
        queryFn: () => fetchRecommendCocktail(base),
    });
};