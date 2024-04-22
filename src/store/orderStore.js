import {create} from 'zustand'

export const useOrder = create((set)=>({
	orderList: [],
	totalMoney: 0,
	addTotalMoney:(val)=>set((state)=>({totalMoney: state.totalMoney + val})),
	minusTotalMoney:(val)=>set((state)=>({totalMoney: state.totalMoney -val})),

	addToOrder: (item)=> set((state)=>({orderList: [...state.orderList, {...item}]})),
	addListToOrder:(list)=> set((state)=>({orderList: [...state.orderList, ...list]})),
	// 주문은 계속해서 중복 주문해도 된다.
	// addToOrder: (item) => set((state) => {
	// 	// 중복 아이템인지 확인
	// 	const isDuplicate = state.orderList.some((existingItem) => existingItem.id === item.id);

	// 	// 중복 아이템이 아닌 경우에만 아이템을 추가
	// 	if (!isDuplicate) {
	// 		const updatedList = [...state.orderList, item];
	// 		return { orderList: updatedList };
	// 	}

	// 	// 중복 아이템인 경우 현재 상태 그대로 반환
	// 	return state;
	// }),
	// addListToOrder: (list) => set((state) => {
	// 	// 현재 카트 리스트에서 중복된 아이템을 필터링
	// 	const filteredList = list.filter((item) => !state.orderList.some((existingItem) => existingItem.id === item.id));

	// 	// 필터링된 리스트를 cartList에 할당
	// 	return { orderList: [...state.orderList, ...filteredList] };
	// }),
	removeListFromOrder:(list) => set((state) => {
		const updatedList = state.orderList.filter(item => !list.some(listItem => listItem.idDrink === item.idDrink));
		return { orderList: updatedList };
	}),
	
	emptyOrderList:()=>set((state)=>({orderList:[]}))

}))