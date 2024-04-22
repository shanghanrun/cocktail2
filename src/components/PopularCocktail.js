import React from 'react'
import { usePopularCocktail } from '../hooks/usePopularCocktail'
import Card from './card/Card'

const PopularCocktail = () => {
	// {drinks [{strDrink:'',strDrinkThumb:'' }, {},{}]}
	const{data, isLoading,isError,error}= usePopularCocktail()
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

export default PopularCocktail
