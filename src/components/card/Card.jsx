/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import HeartIcon from "../../assets/ic-heart.svg";
import EmptyHeartIcon from "../../assets/ic-emptyHeart.svg";
import { useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";
import { container, contentWrap, imgWrap, labelWrap } from "./Card.style";
import { useFavorite } from "../../store/favoriteStore";
import { useAnalyze } from '../../store/analyzeStore';
import OriginalDrink from '../../filter/category/OriginalDrink';

// 재료가져오는 함수
function getNonNullIngredients(data) {
	const ingredients = [];
	for (let i = 1; i <= 15; i++) {
		const ingredientKey = `strIngredient${i}`;
		if (data[ingredientKey] !== null && data[ingredientKey] !== "") {
			ingredients.push(`#${data[ingredientKey]}  `);
		}
	}
	return ingredients;
}

function Card({ cockTailData, labelText }) {
	const {addItem, favoriteList} = useFavorite()
	const {updateState, "Ordinary Drink":ordinaryDrink, "Cocktail":cocktail} = useAnalyze()
	const navigate = useNavigate();
	const { idDrink, strDrink, strAlcoholic, strInstructions, strDrinkThumb, strCategory } = cockTailData;

	// localStorage에서 'likes' 데이터 가져오기 및 초기 like 상태 설정
	const likesData = JSON.parse(localStorage.getItem("likes") || "[]");
	const isLiked = likesData.includes(idDrink);

	const [like, setLike] = useState(isLiked);
	const [hover, setHover] = useState(false);

	useEffect(() => {
		const uniqueLikes = new Set(likesData);

		if (like) {
			uniqueLikes.add(idDrink);
		} else {
			uniqueLikes.delete(idDrink);
		}

		const updatedLikes = [...uniqueLikes];
		localStorage.setItem("likes", JSON.stringify(updatedLikes));
	}, [like, idDrink, likesData]);

	return (
		<li
			css={container}
			onClick={() => {
				updateState(strCategory)
				navigate(`/${idDrink}`);
			}}
		>
			<div css={imgWrap} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
				<img src={strDrinkThumb} alt="cocktail" />
				{hover && (
					<div>
						<div>{strAlcoholic === "Alcoholic" ? "#알콜" : "#무알콜"}</div>
						<div>{getNonNullIngredients(cockTailData)}</div>
					</div>
				)}
			</div>

			<div css={contentWrap}>
				<div css={labelWrap(labelText)}>
					<Chip label={labelText} size="small" color="error" variant="outlined" />
					<img
						className="like"
						src={like ? HeartIcon : EmptyHeartIcon}
						alt={like ? "like" : "unlike"}
						onClick={(e) => {
							e.stopPropagation();
							setLike((prev) => !prev);
							addItem(cockTailData)
						}}
					/>
				</div>
				<h1>{strDrink}</h1>
				<p>{strInstructions}</p>
			</div>
		</li>
	);
}

export default Card;
