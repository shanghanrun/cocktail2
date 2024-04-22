/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

function LevelComponent({ title, level, data, levelName }) {
	function getNonNullIngredients(data) {
		const ingredients = [];

		for (let i = 1; i <= 15; i++) {
			const ingredientKey = `strIngredient${i}`;
			if (data[ingredientKey] !== null) {
				ingredients.push(`${data[ingredientKey]}  `);
			}
		}
		return ingredients;
	}

	const getHint = (data) => {
		switch (level) {
			case 5:
				return (
					<ul>
						<li>{data?.strIngredient1}</li>
						<li>{data?.strIngredient2}</li>
					</ul>
				);
			case 4:
				return (
					<ul>
						{getNonNullIngredients(data).map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				);
			case 3:
				return (
					<ul>
						<li>{data.strAlcoholic}</li>
						<li>{data.strGlass}</li>
					</ul>
				);
			case 2:
				return <div>{data.strInstructions}</div>;
			case 1:
				return <img css={cocktailImg} src={data.strDrinkThumb} alt="cocktail" />;
			default:
				return undefined;
		}
	};

	return (
		<div css={container}>
			<div css={levelWrap}>
				<Rating
					name="text-feedback"
					value={level}
					readOnly
					precision={0.5}
					emptyIcon={<StarIcon style={{ opacity: 0.5 }} fontSize="inherit" />}
					sx={{ width: "100%" }}
					size="large"
				/>
				<div>{levelName}</div>
			</div>
			<div css={contentWrap}>
				<h1>{title}</h1>
				{getHint(data)}
			</div>
		</div>
	);
}

export default LevelComponent;

const container = css`
	width: 100%;
	height: 100%;
	position: relative;
	padding: 20px;
`;

const levelWrap = css`
	display: flex;
	flex-direction: column;
	& > div {
		margin-left: 5px;
	}
`;

const contentWrap = css`
	padding-top: 20px;
	height: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	h1 {
		font-size: 26px;
		font-weight: 700;
		letter-spacing: 1px;
		text-align: center;
		white-space: nowrap;
		padding-bottom: 20px;
	}
`;

const cocktailImg = css`
	width: 150px;
`;
