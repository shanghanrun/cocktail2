import {useSearchIngredient} from '../hooks/useSearchIngredient';
import {useState, useEffect} from 'react'
import axios from 'axios';
import { Container, Button } from "@mui/material";

const SearchIngredient= ()=>{
	const [isKor, setIsKor] = useState(false)
	const [primaryData, setPrimaryData] = useState([])
	const [usingData, setUsingData] = useState([])
	const apiKey = process.env.REACT_APP_API_KEY2; 
	console.log('apikey:', apiKey)
	const [eTextList, setETextList] = useState([]);
	const [kTextList, setKTextList] = useState([]);

	// { ingredients: [ {strIngredient:"Vodka", strDescription:"", strType:"Vodka", strAlcohol:"Yes", strABV:"40"} ]}
	// ingredients 에 어레이1개, 어레이 안에 객체 1개
	async function translate(){
		if(isKor){
			setIsKor(false)
			setUsingData(primaryData)
		} else{
			console.log('번역시작')
			const translatedList=[]

			for(const text of eTextList){
				try{
					const resp = await axios.post(
						`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
						{
						q: text,
						source: 'en',
						target: 'ko' 
						}
					);
					translatedList.push(resp.data.data.translations[0].translatedText);
				} catch (error) {
					console.error('Error translating text:', error);
				}
			}
			setIsKor(true)
			setKTextList(translatedList);
			console.log('번역완료')
		}
	}

	const{data, isLoading,isError,error}= useSearchIngredient('vodka')

	useEffect(() => {
		if(data){
			const primaryIngredient = data.ingredients[0];
			setPrimaryData(primaryIngredient);
			setUsingData(primaryIngredient);
			setETextList([primaryIngredient.strAlcohol, primaryIngredient.strDescription]);
		}
    }, [data]);

	if(isLoading){
		return <h1>Loading...</h1>
	}
	if(isError){
		console.log(error.message)
		return;
	}
	console.log('data :', data);

	return(
		<div>
			<Container>
				<div style={{fontSize:'40px'}}>한글 번역 API 예</div>
				<Button variant="contained" onClick={translate} 
				style={{background:'red', margin:'20px 0'}}>
				{isKor? '영어원문' : '한글번역'}
				</Button>
				<Container
					maxWidth="lg" sx={{ border: "2px solid grey", padding: "20px" }}
				>
					<div>재료 : {usingData?.strIngredient}</div>
					<div>타입: {usingData?.strType}</div>
					<div>알콜유무 : {!isKor? usingData?.strAlcohol: kTextList[0]}</div>
					<div>도수 : {usingData?.strABV}</div>
					<div style={{marginTop:'10px'}}>상세정보 : {!isKor? usingData?.strDescription: kTextList[1]}</div>
				</Container>
			</Container>
		</div>
	)

}


export default SearchIngredient