import { useAnalyze } from "../store/analyzeStore";
import {useEffect} from 'react'

export function useAnalyzeHook(category){
    const {updateState, setFirstRatedCategory} = useAnalyze();

    useEffect(() => {
        updateState(category);
        setFirstRatedCategory();
    }, []); // key가 변경될 때마다 업데이트

    // 만약에 반환값이 필요하다면 반환할 값 설정
}

// 컴포넌트에서 사용 예시
// import { useAnalyzeHook } from "../hooks/useAnalyzeHook.js";
// useAnalyzeHook("ordinaryDrink"); // 예시: ordinaryDrink 업데이트