import React from "react";
import { useDetailCocktail } from "../hooks/useDetailCocktail";
import { useParams } from "react-router-dom";
import RecommendCocktail from "../components/RecommendCocktail";
import { useSearchByIngredient } from "../hooks/useSearchByIngredient";
import DetailCocktail from "../components/DetailCocktail";
import LoadingPage from "./loadingPage/LoadingPage";
import "../styles/detailPage.style.css";
import { useLocation } from "react-router-dom"; // 추가된 부분
import { useRef } from "react";

const DetailPage = () => {
	const location = useLocation();
    const detailsData = location.state;
	const { id } = useParams();
	let { data: detailData, isLoading: detailLoading } = useDetailCocktail(id);
	if(detailData==undefined){
		detailData=detailsData
	}
	console.log('detailData10',detailData)
	const {
		data: searchByIngredientData,
		isLoading,
		isError,
	} = useSearchByIngredient(detailData?.strIngredient1, id);
	const base = detailData?.strIngredient1;
	console.log("searchByIngredientData", searchByIngredientData);
	const inputForm = useRef();

	return (
		<div id="detail-page">
			{/* 로딩 페이지를 먼저 보여주고, detailLoading과 isLoading이 모두 false인 경우에만 컴포넌트를 보여줌 */}
			{detailLoading || isLoading ? (
				<LoadingPage />
			) : (
				<div>
					<DetailCocktail detailData={detailData} detailsData={detailsData} />
					<RecommendCocktail searchByIngredientData={searchByIngredientData} base={base} />
				</div>
			)}
		</div>
	);
};

export default DetailPage;
