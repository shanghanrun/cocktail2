import {useQuery} from '@tanstack/react-query'
import {cocktailApi} from '../api/api'

const fetchCocktail=()=>{
	return cocktailApi.get()
}
export const useCocktail=()=>{
	return useQuery({
		queryKey: ['cocktail'],
		 queryFn: ()=>fetchCocktail(),
		select:(result)=>result.data
	});
}