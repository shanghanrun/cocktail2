import {useQuery} from '@tanstack/react-query'
import {originalDrinkApi} from '../api/api'

const fetchOriginalDrink=()=>{
	return originalDrinkApi.get()
}
export const useOriginalDrink=()=>{
	return useQuery({
		queryKey: ['original-drink'],
		 queryFn: ()=>fetchOriginalDrink(),
		select:(result)=>result.data
	});
}