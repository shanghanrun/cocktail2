import {useQuery} from '@tanstack/react-query'
import {nonAlcoholApi} from '../api/api'

const fetchNonAlcohol=()=>{
	return nonAlcoholApi.get()
}
export const useNonAlcohol=()=>{
	return useQuery({
		queryKey: ['nonAlcohol'],
		 queryFn: ()=>fetchNonAlcohol(),
		select:(result)=>result.data
	});
}

