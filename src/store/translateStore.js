import { create } from 'zustand';
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

const useTranslate = create((set) => ({
  translatedList: [],
  setList:(list) =>set((state)=>({translatedList: [...list]})), 
  translate: async () => {
    try {
      set(async (state) => {
        const list = state.translatedList; // 번역할 리스트를 상태에서 가져옴
        const translatedList = [];
        for (const drink of list) {
          const response = await axios.post(
            `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
            {
              q: [drink.strDrink, drink.strInstructions].join('; '), // 음료 이름과 지시사항을 문장으로 결합
              source: 'en', // 영어로 번역
              target: 'ko' // 한국어로 번역
            }
          );
          const translatedText = response.data.data.translations[0].translatedText;
          const [strDrink, strInstructions] = translatedText.split('; '); // 문장을 다시 음료 이름과 지시사항으로 분할
          translatedList.push({ ...drink, strDrink, strInstructions }); // 번역된 음료 정보 추가
        }
        console.log('번역된 데이터:', translatedList);
        return { translatedList }; // 번역된 리스트를 반환하여 상태를 업데이트할 수 있도록 함
      });
    } catch (error) {
      console.error('음료 번역 중 오류 발생:', error);
    }
  }
}));

export default useTranslate;
