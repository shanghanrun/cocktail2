import {useQuery} from '@tanstack/react-query'
import {searchApi} from '../api/api'

const searchCocktailsByFirstLetter =(str)=>{
	return searchApi.get(`search.php?f=${str}`)
}
export const useSearchCocktailsByFirstLetter=(str)=>{
	return useQuery({
		queryKey:['search-cocktail-by-first-letter', str], 
		queryFn: ()=> searchCocktailsByFirstLetter(str),
    	select: (result)=> result.data
});
}
