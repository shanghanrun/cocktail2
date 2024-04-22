import {useQuery} from '@tanstack/react-query'
import {champagneFluteApi} from '../api/api'

const fetchChampagneFlute=()=>{
	return champagneFluteApi.get()
}
export const useChampagneFlute=()=>{
	return useQuery({
		queryKey: ['champagne-flute'],
		 queryFn: ()=>fetchChampagneFlute(),
		select:(result)=>result.data
	});
}