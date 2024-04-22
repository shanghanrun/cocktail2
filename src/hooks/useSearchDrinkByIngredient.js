import {useQuery} from '@tanstack/react-query'
import {searchApi} from '../api/api'

const searchDrinkByIngredient =(str)=>{
	return searchApi.get(`filter.php?i=${str}`)
}
export const useSearchDrinkByIngredient=(str)=>{
	return useQuery({
		queryKey:['search-drink-by-ingredient', str], 
		queryFn: ()=> searchDrinkByIngredient(str),
    	select: (result)=> result.data
});
}
