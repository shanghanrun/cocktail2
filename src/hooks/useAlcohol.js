import {useQuery} from '@tanstack/react-query'
import {alcoholApi} from '../api/api'

const fetchAlcohol =()=>{
	return alcoholApi.get()
}
export const useAlcohol=()=>{
	return useQuery({
		queryKey:['alcohol'], 
		queryFn: ()=> fetchAlcohol(),
    	select: (result)=> result.data
});
}
