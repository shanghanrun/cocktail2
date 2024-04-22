import {create} from 'zustand'

export const useCart = create((set)=>({
	cartList: [],
	addToCart: (item) => set((state) => {
		// 중복 아이템인지 확인
		const isDuplicate = state.cartList.some((existingItem) => existingItem.idDrink === item.idDrink);

		// 중복 아이템이 아닌 경우에만 아이템을 추가
		if (!isDuplicate) {
			const updatedList = [...state.cartList, {...item}];
			return { cartList: updatedList };
		}

		// 중복 아이템인 경우 현재 상태 그대로 반환
		return state;
	}),
	addListToCart: (list) => set((state) => {
		// 현재 카트 리스트에서 중복된 아이템을 필터링
		const filteredList = list.filter((item) => !state.cartList.some((existingItem) => existingItem.idDrink === item.idDrink));

		// 혹은 다음과 같이 할 수 있다.
		// const filteredList = list.filter(item => !state.cartList.map(existingItem => existingItem.id).includes(item.id));
		// item은 객체라서 비교를 할 수 없다. id값으로 비교를 해야 된다.

		// 필터링된 리스트를 cartList에 할당
		return { cartList: [...state.cartList, ...filteredList] };
	}),

	removeFromCart: (id) => set((state) => {
        const updatedList = state.cartList?.filter(item => item.idDrink !== id);
        return { cartList: updatedList };
    }),
	addCount:(id) => set((state)=>{
		const updatedList = state.cartList?.map(item => {
			if (item.idDrink === id) {
				return {
					...item,
					count: item.count + 1
				};
			}
			return item;
		});
		return { cartList: updatedList };
	}),
	minusCount:(id) => set((state)=>{
		const updatedList = state.cartList?.map(item => {
			if (item.idDrink === id) {
				return {
					...item,
					count: item.count - 1
				};
			}
			return item;
		});
		return { cartList: updatedList };
	}),

	emptyCartList:()=>set((state)=>({cartList:[]}))

}))