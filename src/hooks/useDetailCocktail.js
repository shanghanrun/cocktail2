import { useQuery } from "@tanstack/react-query";
import { DefaultApi } from "../api/api";

const fetchDetailCocktail = (id) => {
  return DefaultApi.get(`/lookup.php?i=${id}`);
};

export const useDetailCocktail = (id) => {
  return useQuery({
    queryKey: ["cocktail-detail",id],
    queryFn: () => fetchDetailCocktail(id),
    select: (result) => {
        const drink = result.data.drinks[0];
  
        // 재료와 양을 담을 배열
        const ingredients = [];
  
        // strIngredient1부터 strIngredient15까지 반복하여 데이터를 추출
        for (let i = 1; i <= 15; i++) {
          const ingredient = drink[`strIngredient${i}`];
          const measure = drink[`strMeasure${i}`];
  
          // 재료와 양이 존재하고, null이 아닌 경우에만 배열에 추가
          if (ingredient) {
            ingredients.push({ ingredient, measure });
          } else {
            // strIngredient가 null인 경우, 이후의 strMeasure도 null이므로 반복문 종료
            break;
          }
        }
  
        return {
          ...drink,
          ingredients,
        };
      },
    });
  };
