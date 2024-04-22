import {create} from 'zustand'

const initialState={
		"Ordinary Drink":2, //A
		"Cocktail":1, //B
		"Shake":0, //C
		"Other / Unknown":0, //D
		"Cocoa":0, //E
		"Shot":0,  //F
		"Coffee / Tea":0, //G
		"Homemade Liqueur":0, //H
		"Punch / Party Drink":0, //I
		"Beer":0,  //J
		"Soft Drink":0, //K
		"firstRatedCategory": 'Cocktail'
}

export const useAnalyze = create((set)=>({
	...initialState,
	updateState: (key) => set((state) => ({ [key]: state[key] + 1 })),
	setFirstRatedCategory: () => set((state) => {
    // 각 값이 유효한 숫자인지 확인하고 숫자로 변환하기
    const numericValues = Object.values(state).map(value => {
      const numericValue = parseInt(value, 10);
      return isNaN(numericValue) ? 0 : numericValue; // 숫자로 변환할 수 없는 경우 0으로 처리
    });
    // 숫자로 변환된 값들 중 최대값 찾기
    const maxCount = Math.max(...numericValues);//! value로 반환되는 값은 문자열이다. 그리고 firstRatedCategory value는 문자열이다. 이건 제외해야 된다.!!
		console.log('최대치:', maxCount )

        const firstRatedCategory2 = Object.keys(state).find(key => state[key] === maxCount); 
		console.log('최애 카테고리 :', firstRatedCategory2)
        return { ...state, firstRatedCategory: firstRatedCategory2 }; // 일등 카테고리 반환
    })
	// import {useAnalyze} from '../store/analyzeStore'
	// const {firstRatedCategory} = useAnalyze()
	// const targetCategory = firstRatedCategory;
	// 카테고리별 검색 api이용.



	// updateA:() => set((state)=> ({ordinaryDrink: state.ordinaryDrink +1 })),
	// updateB:() => set((state)=> ({cocktail: state.cocktail +1 })),
	// updateC:() => set((state)=> ({shake: state.shake +1 })),
	// updateD:() => set((state)=> ({otherUnknown: state.otherUnknown +1 })),
	// updateE:() => set((state)=> ({cocoa: state.cocoa +1 })),
	// updateF:() => set((state)=> ({shot: state.shot +1 })),
	// updateG:() => set((state)=> ({coffeeTea: state.coffeeTea +1 })),
	// updateH:() => set((state)=> ({homemadeLiqueur: state.homemadeLiqueur +1 })),
	// updateI:() => set((state)=> ({punch: state.punch +1 })),
	// updateJ:() => set((state)=> ({beer: state.beer +1 })),
	// updateK:() => set((state)=> ({softDrink: state.softDrink +1 })),
}))


// 아이템에 이벤트 리스너를 달아서 해당 아이템이 클릭되었을 때,
// analyze 함수를 발동시키게 한다.
// function analyze(category){   //<--category에 item.strCategory 값 들어간다.
// 	if (category ==='Ordinary Drink'){
// 		updateA()
// 	} else if(category === 'cocktail'){
// 		updateB()
// 	}
// }