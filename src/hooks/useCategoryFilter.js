import {useQuery} from '@tanstack/react-query'
import {searchApi} from '../api/api'

const searchCategoryDrinks =(str)=>{
	return searchApi.get(`filter.php?c=${str}`)
}
export const useSearchCategoryDrinks=(str)=>{
	return useQuery({
		queryKey:['search-category-drinks', str], 
		queryFn: ()=> searchCategoryDrinks(str),
    	select: (result)=> result.data
});
}