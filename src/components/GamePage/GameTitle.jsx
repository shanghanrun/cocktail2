/** @jsxImportSource @emotion/react */
import Lottie from "lottie-react";
import React from "react";
import GameTitleLottie from "../../assets/lottie-game.json";
import { css, keyframes } from "@emotion/react";

function GameTitle({ onNext }) {
	return (
		<div css={container}>
			<div css={titleWrap}>
				<h1 css={title}>Cocktail Selecte Game</h1>
				<div>힌트를 보고 하단의 칵테일 중 하나를 선택하세요</div>
				<p
					onClick={() => {
						onNext();
					}}
				>
					Click to get started
				</p>
			</div>
			<Lottie css={lottieWrap} animationData={GameTitleLottie} loop={true} />
		</div>
	);
}

export default GameTitle;

const container = css`
	width: 100%;
	height: 100%;
	position: relative;
`;

const boundEvent = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const titleWrap = css`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 20px;
	padding-bottom: 100px;

	& > p {
		color: red;
		animation: ${boundEvent} 1.5s ease-in-out infinite;
		cursor: pointer;
	}
`;

const title = css`
	width: 350px;
	font-size: 26px;
	font-weight: 700;
	letter-spacing: 1px;
	text-transform: uppercase;
	text-align: center;
	white-space: nowrap;
	padding-bottom: 13px;
	position: relative;
	&::before {
		background-color: #fd4926;
		content: "";
		display: block;
		height: 3px;
		width: 75px;
		margin-bottom: 5px;
	}
	&::after {
		background-color: #fd4926;
		content: "";
		display: block;
		position: absolute;
		right: 0;
		bottom: 0;
		height: 3px;
		width: 75px;
		margin-bottom: 0.25em;
	}
`;

const lottieWrap = css`
	position: absolute;
	width: 200px;
	left: 0;
	top: 160px;
	z-index: 10;
`;
