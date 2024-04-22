import React from 'react'
import { useRecentCocktail } from '../hooks/useRecentCocktail'
import Card from './card/Card'

const RecentCocktail = () => {
	// {drinks [{strDrink:'',strDrinkThumb:'' }, {},{}]}
	const{data, isLoading,isError,error}= useRecentCocktail()
	if(isLoading){
		return <h1>Loading...</h1>
	}
	if(isError){
		console.log(error.message)
	}
	
	return(
		<div>
			{data?.drinks.map((cockTailData, index) => (
				<Card cockTailData={cockTailData} key={index} />
			))}
		</div>
	)

}

export default RecentCocktail
