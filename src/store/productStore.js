import {create} from 'zustand'

export const useProduct = create((set)=>({
	productList: [],
	makeList:(data) => set({productList:[...data]}),
	setItemStatus: (id) => {
		set((state) => ({
			productList: state.productList.map((item) =>
				item.idDrink === id ? { ...item, status: 'favorite' } : item
			)
		}))
	},
	deleteItemStatus:(id)=>{
		set((state) => ({
			productList: state.productList.map((item) =>
				item.idDrink === id ? { ...item, status: '' } : item
			)
		}))
	},
	setItemCount:(id, count)=>{
		set((state) => ({
			productList: state.productList.map((item) =>
				item.idDrink === id ? { ...item, "count": count } : item
			)
		}))
	}
}))