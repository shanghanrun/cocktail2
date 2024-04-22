import Card from "../card/Card";
import { usePopularCocktail } from "../../hooks/usePopularCocktail";
import { create } from "zustand";
import { useRef } from "react";

const useStore = create((set) => ({
	autoHeight: false,
	isOpen: false,
	setAutoHeight: (value) => set({ autoHeight: value }),
	setIsOpen: (value) => set({ isOpen: value }),
}));

const PopularList = () => {
	const { autoHeight, isOpen, setAutoHeight, setIsOpen } = useStore();

	//닫기버튼 클릭시 h2태그 위치로 이동
	const ListRef = useRef(null);

	const { data, isLoading, isError, error } = usePopularCocktail();
	if (isLoading) {
		return <h1>Loading...</h1>;
	}
	if (isError) {
		console.log(error.message);
	}

	const handleButtonClick = () => {
		setAutoHeight(!autoHeight);
		setIsOpen(!isOpen);

		if (isOpen) {
			ListRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<div id="popular-list" className="main-page-list">
			<div>
				<h2 ref={ListRef}>Best Cocktail</h2>
				<ul className={autoHeight ? "auto-height" : "init-height"}>
					{data?.drinks.map((cockTailData, index) => (
						<Card cockTailData={cockTailData} labelText="Best" key={index} />
					))}
				</ul>
			</div>
			<div className="popular-button">
				<button onClick={handleButtonClick}>{isOpen ? "닫기" : "더보기"}</button>
			</div>
		</div>
	);
};

export default PopularList;
