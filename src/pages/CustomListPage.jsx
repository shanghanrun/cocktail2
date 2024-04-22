import React, { useState } from 'react'
import '../styles/CustomListPage.style.css';
import coc1 from '../assets/cocktail1.png';
import coc2 from '../assets/cocktail2.png';
import coc3 from '../assets/cocktail3.png';
import coc4 from '../assets/cocktail4.png';
import coc5 from '../assets/cocktail5.png';
import coc6 from '../assets/cocktail6.png';
import { useNavigate } from 'react-router-dom';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomListPage = () => {

    // 로컬저장소 데이터 가져오기
    const drinkData = JSON.parse(localStorage.getItem('drinkData')) || { drinks: [] };
    console.log(drinkData);

    const navigate = useNavigate();
    const goToDetails = (index)=>{
      navigate(`/${index.idDrink}`, {state: {...index}})
    }
    const goToCustomPage = ()=>{
        navigate('/custom');
    }
    
    //state 리스트
    const [isLiked, setIsLiked] = useState(new Array(drinkData.drinks.length).fill(false));

    // 함수
    const handleLikeClick = (idx) => {
        setIsLiked(prevState => {
            const newState = [...prevState];
            newState[idx] = !newState[idx];
            return newState;
        });
    }
    
    const imagesToShow = [coc1, coc2, coc3, coc4, coc5, coc6, coc4, coc5, coc6, coc1, coc3, coc5, coc2];
   

  return (
    <div>
      <div className='bannerSection'>
        <button onClick={goToCustomPage}>
          <span class="buttonText">나만의 레시피 만들기</span>
          <span class="clickText">Click!!</span>
        </button>
      </div>
      <div className='customTitle'>함께! 섞어마셔 리스트</div>

      <div className='customItemSection'>
        {/* 업로드된 데이터 */}
        {drinkData.drinks.reverse().map((index, idx) => (
            <div key={index} onClick={()=>goToDetails(index)} className='sample'>
            <div className='imageBox'>
            <img 
                src={
                    index.strImageSource === 0 ? coc1 :
                    index.strImageSource === 1 ? coc2 :
                    index.strImageSource === 2 ? coc3 :
                    index.strImageSource === 3 ? coc4 :
                    index.strImageSource === null ? coc1 :
                    index.strImageSource
                } 
                alt='이미지'
            />
            </div>
            <div className='customTextBox'>
              <div className='customsTitle'>{index.strDrink}</div>
              <div className='customsScript'>
                <div>{index.strInstructions}</div>
                <button className='faHeart' onClick={()=>handleLikeClick(idx+13)}>
                  <FontAwesomeIcon icon={isLiked[idx+13]? faSolidHeart : faHeart} color={isLiked[idx+13] ? 'red' : 'white'}/>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* 하드코딩된 임의 데이터 */}
        {imagesToShow.map((image, index) => (
            <div key={index} className='sample'>
            <div className='imageBox'>
              <img src={image} alt='이미지'/>
            </div>
            <div className='textBox'>
              <div className='customsTitle'>cocktailName</div>
              <div className='customsScript'>
                <div className='scriptDiv'>cocktailScript</div>
                <button className='faHeart' onClick={()=>handleLikeClick(index)}>
                  <FontAwesomeIcon icon={isLiked[index]? faSolidHeart : faHeart} color={isLiked[index] ? 'red' : 'white'}/>
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default CustomListPage
