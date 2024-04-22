import {useSearchCategoryDrinks} from '../hooks/useCategoryFilter'
import {useParams, useNavigate} from 'react-router-dom'
import {Container } from '@mui/material';
import SimpleCard from '../components/SimpleCard';


const FavorCategoryDrinks= ()=>{
	// {drinks [{strDrink:'',strDrinkThumb:'' }, {},{}]}
	const navigate = useNavigate()
	const {id} = useParams() // id값으로 제대로 된 문자열이 들어온다.
	function showDetail(item){
		console.log('clicked')
		navigate(`/detail2/${item.idDrink}`)
	}

	const{data, isLoading,isError,error}= useSearchCategoryDrinks(id)
	if(isLoading){
		return <h1>Loading...</h1>
	}
	if(isError){
		console.log(error.message)
	}
	console.log('Favor category data :', data)
	return(
		<div style={{width:'100vw'}}>
			<Container >
				<div style={{fontSize: '35px', margin:'20px 0'}}>
					당신의 최애 drink : 
					<span style={{color:'red'}}> {id}</span>
				</div>
				<div style={{display:'flex', justifyContent:'flex-start', flexWrap: 'wrap', gap:'15px', width:'95vw'}}>
					{data?.drinks.map((item, i)=>(
						<SimpleCard showDetail={showDetail} key={i} item={item} />
					))}
				</div>
					
			</Container>
		</div>
	)

}


export default FavorCategoryDrinks