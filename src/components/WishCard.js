import React, {useState, useEffect} from 'react'
import { useFavorite } from '../store/favoriteStore'
import { useProduct} from '../store/productStore';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';

const priceList=[
	5000, 6000, 7000, 8000, 9000, 
	10000, 15000, 18000, 20000, 25000
]
const newOrNot=[
	'New', 'No'
]
const sale =[
	'Sale', 'No'
]

const WishCard = ({item, addToCart}) => {
	const {removeItem, setPrice, setIsNew, setIsSale} = useFavorite()
	const {deleteItemStatus} = useProduct();
	
	console.log('WishCard item.price :', item.price)

	function handleClick(){
		addToCart(item)
		removeItem(item.idDrink)
	}
	useEffect(()=>{
		const priceIndex =Math.floor(Math.random()*priceList.length)
		const newOrNotIndex = Math.floor(Math.random()*newOrNot.length)
		const saleIndex =Math.floor(Math.random()*sale.length)
		console.log('priceIndex :', priceIndex)
		setPrice(item.idDrink, priceList[priceIndex])
		setIsNew(item.idDrink, newOrNot[newOrNotIndex])
		setIsSale(item.idDrink, sale[saleIndex])
	},[])

	useEffect(() => {
		console.log('WishCard item:', item);
	}, [item]);

  return (
	<div className='card2' onClick={handleClick} 
		style={{
			border: '1px solid grey', borderRadius:'10px',
			marginTop:'10px', padding:'10px',
			boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
			width:"250px"
		}}
	>
		<div className='card-img' >
			<img width="250x"
				src={item.strDrinkThumb} alt=""/>
			<DeleteIcon className="trash" style={{zIndex:'2'}}
				onClick={(e)=>{
					e.stopPropagation();//이벤트 버블링 차단
					deleteItemStatus(item.idDrink);  //productList의 item변화시키기
					removeItem(item.idDrink); //favoriteList에서 item 제거
				}}
			/>
		</div>
		<div className='card-text'>
			<div>{item.strDrink}</div>
			<div>₩ {item.price}</div>
			<div style={{display:'flex', justifyContent:'start', gap:'5px'}}>
				<span>{item.isNew==='New'? 
					<Avatar sx={{ bgcolor: '#19f819', fontSize:'10px', height:'25px', width:'40px' }} variant="rounded"> New </Avatar>
					: ''
				}</span>
				<span>{item.isSale==='Sale'? 
					<Avatar sx={{ bgcolor: '#e64ff1', fontSize:'10px', height:'25px', width:'40px' }} variant="rounded"> Sale </Avatar>
					: ''
				}</span>
			</div>
		</div>

	</div>
  )
}

export default WishCard