/** @jsxImportSource @emotion/react */
import React from "react";
import Lottie from "lottie-react";
import loading from "../../assets/lottie-loading.json";
import { css } from "@emotion/react";

function LoadingPage() {
	return (
		<div css={container}>
			<Lottie animationData={loading} loop={true} />
		</div>
	);
}

export default LoadingPage;

const container = css`
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	background-color: rgba(255, 255, 255, 0.5);
	& > div {
		width: 200px;
		height: 200px;
	}
`;
