/** @jsxImportSource @emotion/react */
import Lottie from "lottie-react";
import React from "react";
import ConguratulationLottie from "../../assets/lottie-congratulation.json";
import { css, keyframes } from "@emotion/react";
function GameSuccess({ levelName, setLevel, setSelected }) {
	return (
		<div css={container}>
			<h1>{levelName}</h1>
			<Lottie animationData={ConguratulationLottie} loop={false} />
			<p
				onClick={() => {
					setLevel(0);
					setSelected([0, 0, 0, 0, 0, 0]);
				}}
			>
				Click to get started
			</p>
		</div>
	);
}

export default GameSuccess;

const boundEvent = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const container = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
	position: relative;

	& > div {
		position: absolute;
		top: 0;
		z-index: -1;
	}
	& > h1 {
		padding-top: 100px;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 80px;
	}
	& > p {
		animation: ${boundEvent} 1.5s ease-in-out infinite;
		cursor: pointer;
	}
`;
