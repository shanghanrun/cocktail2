import {create} from 'zustand'

export const useBookmark = create((set)=>({
	bookmarkList:[
		{ 
			title:'Margarita',
			url:'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007',
			path:'/11007'
		},
		{ 
			title:'Manhattan',
			url:'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11008',
			path:'/11008'
		},
	],
	addBookmark:(item)=> set((state)=>{
		const newItem ={
			title: item.strDrink,
			url: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${item.idDrink}`,
			path: `/${item.idDrink}`
		}
		return {
			bookmarkList: [
				...state.bookmarkList, newItem]
			};
	})
}))