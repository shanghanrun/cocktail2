import { css } from "@emotion/react";

export const globalStyles = css`
	* {
		margin: 0; /* margin 초기화 */
		padding: 0; /* padding 초기화 */
		font: inherit; /* font 상속을 못하는 요소(button, input)에게 폰트 적용을 위해 작성 */
		color: inherit; /* a, input, textarea에도 동일한 글자색 적용을 위해 작성 */
	}

	*,
	:after,
	:before {
		box-sizing: border-box;
	}

	:root {
		font-family: "Noto Sans", sans-serif;
		font-optical-sizing: auto;
		font-weight: 500;
		font-style: normal;
		overflow-wrap: break-word;
	}

	html,
	body {
		height: 100%;
	}

	img,
	svg,
	canvas {
		display: block; /* 하단의 여백 제거를 위해 작성 */
		max-width: 100%; /* 이미지 삐져나가는것 방지하기 위해 작성 */
	}

	li {
		list-style: none;
	}

	button {
		background: none;
		border: 0;
		cursor: pointer;
	}

	a {
		text-decoration: none;
	}
`;
