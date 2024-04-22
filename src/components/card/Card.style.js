import { css } from "@emotion/react";

export const container = css`
	position: relative;
	background-color: #fff;
	box-sizing: border-box;
	width: 22rem;
	text-align: center;

	cursor: pointer;
	@media (max-width: 1080px) {
		width: 15rem;
	}
	@media (max-width: 800px) {
		width: 12rem;
	}
	@media (max-width: 610px) {
		width: 9rem;
	}
	@media (max-width: 490px) {
		width: 11em;
	}
	@media (max-width: 400px) {
		width: 7em;
	}
`;

export const imgWrap = css`
	width: 100%;
	& > img:nth-of-type(1) {
		filter: brightness(150%);
		filter: contrast(80%);
		filter: saturate(120%);
	}
	& > div {
		background-color: rgb(255, 255, 255, 0.8);
		width: 100%;
		height: 100%;
		color: black;
		position: absolute;
		padding: 20px;
		box-sizing: border-box;
		top: 0;
		& > div {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
	}
`;

export const contentWrap = css`
	width: 100%;
	padding: 4px 8px;
	& > span {
		padding: 2px 2px;
		background: #ccc;
		color: #fff;
		font-size: 12px;
	}
	& > h1 {
		font-weight: 700;
	}
	& > p {
		font-size: 10px;
		font-weight: 300;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;

export const labelWrap = (labelText) => css`
	display: flex;
	justify-content: space-between;
	width: 100%;
	& > div {
		visibility: ${!labelText && "hidden"};
	}
	& > img {
		z-index: 10;
	}
`;
