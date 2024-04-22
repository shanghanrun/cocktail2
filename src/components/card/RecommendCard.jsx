/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import HeartIcon from "../../assets/ic-heart.svg";
import EmptyHeartIcon from "../../assets/ic-emptyHeart.svg";
import { useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";
import { container, contentWrap, imgWrap, labelWrap } from "./Card.style";

// 재료가져오는 함수

function RecommendCard({ cockTailData, base }) {
	const navigate = useNavigate();
	const { idDrink, strDrink, strDrinkThumb } = cockTailData;
	const [like, setLike] = useState(false);
	const [hover, setHover] = useState(false);

	return (
		<li
			css={container}
			onClick={() => {
				navigate(`/${idDrink}`);
			}}
		>
			<div css={imgWrap} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
				<img src={strDrinkThumb} alt="cocktail" />
				{hover && (
					<div>
						<div>
							<div>{`#${strDrink}`}</div>
							<div>{`#${base} base cocktail`}</div>
						</div>
					</div>
				)}
			</div>
			<div css={contentWrap}>
				<div css={labelWrap()}>
					<Chip label="Recommendation" size="small" color="error" variant="outlined" />
					<img
						className="like"
						src={like ? HeartIcon : EmptyHeartIcon}
						alt={like ? "like" : "unlike"}
						onClick={(e) => {
							e.stopPropagation();
							setLike((prev) => !prev);
						}}
					/>
				</div>
				<h1>{strDrink}</h1>
				<p>　</p>
			</div>
		</li>
	);
}

export default RecommendCard;
