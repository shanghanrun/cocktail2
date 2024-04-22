/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import naver from "../assets/image/naver.png";
import kakao from "../assets/image/kakao.png";
import eventBanner from "../assets/image/summer-sale-poster.jpg";
import useLogin from "../store/loginStore";

const LoginPage = () => {
	const navigate = useNavigate();

	const [id, setId] = useState();
	const [password, setPassword] = useState();
	const { isLogin, setIsLogin } = useLogin();

	//login 폼 새로고침 막기
	const userLogin = (event) => {
		event.preventDefault();
		console.log("login");
		setIsLogin(true);
		navigate("/");
	};

	return (
		<div css={loginContainer}>
			<h1>로그인</h1>
			<div id="login-page">
				<div className="login-box" css={leftBox}>
					<form onSubmit={(event) => userLogin(event)}>
						<input type="text" placeholder="아이디" />
						<input type="password" placeholder="비밀번호" />
						<button type="submit">로그인</button>
						<div>
							<div>
								<img src={naver} alt="네이버로고" />
								<span>네이버 로그인</span>
							</div>
							<div>
								<img src={kakao} alt="카카오로고" />
								<span>카카오톡 로그인</span>
							</div>
						</div>
					</form>
					<ul>
						<li>
							<span>• 아직 Shake&Drink 회원이 아니신가요?</span> <div>회원가입</div>
						</li>
						<li>
							<span>•아이디/비밀번호를 잊어버리셨나요?</span> <div>아이디/비밀번호 찾기</div>
						</li>
					</ul>
				</div>
				<div css={rightBox}>
					<img src={eventBanner} alt="" />
				</div>
			</div>
		</div>
	);
};

export default LoginPage;

const loginContainer = css`
	max-width: 800px;
	margin: 0 auto;
	margin-top: 40px;
	& > h1 {
		text-align: center;
		font-size: 30px;
		margin-top: 20px;
	}
	& > div {
		display: flex;
		padding-top: 40px;
	}
	@media (max-width: 746px) {
		& > div {
			width: 450px;
			margin: 0 auto;
		}
	}
	@media (max-width: 474px) {
		& > div {
			width: 300px;
			margin: 0 auto;
		}
	}
`;
const leftBox = css`
	width: 62%;
	& > div {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 50%;
	}
	& > form > input {
		border: 1px solid #ebebeb;
		border-radius: 5px;
		padding: 15px 20px;
		width: 450px;
		box-sizing: border-box;
		margin-bottom: 10px;
	}
	& > form > button:nth-of-type(1) {
		background: #fd4926;
		width: 450px;
		padding: 15px 20px;
		border-radius: 5px;
		color: #fff;
		margin-bottom: 10px;
		cursor: pointer;
	}
	& > form > div {
		display: flex;
		width: 450px;
	}
	& > form > div > div {
		display: flex;
		align-items: center;
		width: calc(50% - 5px);
		padding: 5px 20px;
		box-sizing: border-box;
		border-radius: 5px;
		font-size: 14px;
		cursor: pointer;
	}
	& > form > div > div:nth-of-type(1) {
		background: #2db400;
		color: #fff;
		margin-right: 10px;
	}
	& > form > div > div:nth-of-type(2) {
		background: #fbed01;
	}
	& > ul {
		margin-top: 40px;
		width: 450px;
	}
	& > ul > li {
		display: flex;
		justify-content: space-between;
		padding: 20px 20px;
		background: #f7f7f7;
		font-size: 12px;
	}
	& > ul > li > span {
		padding: 5px 0;
	}
	& > ul > li > div {
		background: #fff;
		padding: 5px 0;
		width: 140px;
		text-align: center;
		border: 1px solid #ebebeb;
		cursor: pointer;
	}
	@media (max-width: 746px) {
		width: 100%;
	}
	@media (max-width: 474px) {
		& > form > input {
			width: 300px;
		}
		& > form > button:nth-of-type(1) {
			width: 300px;
		}
		& > form > div {
			width: 300px;
		}
		& > form > div > div {
			padding: 12px 10px;
		}
		& > form > div > div > img {
			width: 25px;
		}
		& > form > div > div > span {
			font-size: 12px;
		}
		& > ul {
			margin-top: 40px;
			width: 300px;
		}
		& > ul > li {
			font-size: 10px;
			padding: 10px 10px;
		}
		& > ul > li > div {
			width: 100px;
		}
	}
`;
const rightBox = css`
	width: 38%;
	& > img {
	}
	@media (max-width: 746px) {
		display: none;
	}
`;
