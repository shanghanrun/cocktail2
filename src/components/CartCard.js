
const CartCard = ({item}) => {
  return (
	<div className='card2' style={{display:'flex', justifyContent:'start', gap:'10px',
	border:'1px solid grey', borderRadius:'10px',
	padding:'10px', marginTop:'10px', width: '220px', height:"150px",
	boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
	}}>
		<div className='card-img' style={{paddingLeft: '10px', }} >
			<img width="120px"
				src={item.strDrinkThumb} alt=""/>
		</div>
		<div className='card-text' style={{marginRight:'10px', fontSize:'20px'}}>
			<div>{item.strDrink}</div>
		</div>
	</div>
  )
}

export default CartCard