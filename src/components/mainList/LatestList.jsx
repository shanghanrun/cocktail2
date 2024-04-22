import React from "react";
import { useLatestCocktail } from "../../hooks/useLatestCocktail";
import Card from "../card/Card";

const LatestList = () => {
	const { data, isLoading, isError, error } = useLatestCocktail();
	if (isLoading) {
		return <h1>Loading...</h1>;
	}
	if (isError) {
		console.log(error.message);
	}
	return (
		<div id="LatestList" className="main-page-list">
			<div>
				<h2>Most Latest Cocktail</h2>
				<ul>
					{data?.drinks.map((cockTailData, index) => (
						<Card cockTailData={cockTailData} labelText="New" key={index} />
					))}
				</ul>
			</div>
		</div>
	);
};

export default LatestList;
