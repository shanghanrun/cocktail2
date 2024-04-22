import {useQuery} from '@tanstack/react-query'
import {cocktailGlassApi} from '../api/api'

const fetchCocktailGlass=()=>{
	return cocktailGlassApi.get()
}
export const useCocktailGlass=()=>{
	return useQuery({
		queryKey: ['cocktail-glass'],
		 queryFn: ()=>fetchCocktailGlass(),
		select:(result)=>result.data
	});
}