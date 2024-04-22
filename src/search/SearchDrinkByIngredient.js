import {useSearchDrinkByIngredient} from '../hooks/useSearchDrinkByIngredient';

const SearchDrinkByIngredient= ({str})=>{
	// {drinks [{strDrink:'',strDrinkThumb:'' }, {},{}]}
	const{data, isLoading,isError,error}= useSearchDrinkByIngredient(str)
	if(isLoading){
		return <h1>Loading...</h1>
	}
	if(isError){
		console.log(error.message)
	}
	console.log('data :', data)
	// {drinks: [ {strDrink:'...'},{strDrink:''},. 100개] 
	return(
		<div>
			<div>
				{data?.drinks.map((item, i)=>(
					<div key={i} style={{margin: '10px'}}>
						<h2>{item.strDrink}</h2>
						<img src={item.strDrinkThumb} alt=""  style={{width:'300px'}}/>
					</div>
				))}
			</div>
		</div>
	)

}


export default SearchDrinkByIngredient