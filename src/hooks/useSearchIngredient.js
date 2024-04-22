import {useQuery} from '@tanstack/react-query'
import {searchApi} from '../api/api'

const searchIngredient =(str)=>{
	return searchApi.get(`search.php?i=${str}`)
}
export const useSearchIngredient=(str)=>{
	return useQuery({
		queryKey:['search-ingredient', str], 
		queryFn: ()=> searchIngredient(str),
    	select: (result)=> result.data
});
}
