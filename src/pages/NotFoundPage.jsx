/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

function NotFoundPage() {
	return (
		<div css={container}>
			<img
				src="https://cdn.dribbble.com/users/3754218/screenshots/17726653/media/9501a4512363ad012edb1675eb50fdf3.png?resize=1000x750&vertical=center"
				alt="not-found-img"
			/>
		</div>
	);
}

export default NotFoundPage;

const container = css`
	margin-top: 10px;
	width: 100%;
	display: flex;
	justify-content: center;
	& > img {
		width: 1000px;
		height: 750px;
	}
`;
