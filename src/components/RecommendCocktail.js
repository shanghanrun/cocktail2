import React, { useState } from "react";
import RecommendCard from "./card/RecommendCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Collapse, Button, Card, CardContent } from "@mui/material";

const RecommendCocktail = ({ searchByIngredientData, base }) => {
	const [open, setOpen] = useState(true);

	const handleToggle = () => {
		setOpen(!open);
	};

	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 2.6,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	};

	return (
		<div>
			<div className="d-flex flex-column">
				<Button
					color="warning"
					onClick={handleToggle}
					style={{ marginTop: "50px", marginBottom: "30px" }}
				>
					{open ? "접기" : "추천 칵테일 펼치기"}
				</Button>
				<Collapse in={open}>
					<Card>
						<CardContent>
							{searchByIngredientData && searchByIngredientData.length > 0 ? (
								<>
									
									<div id="container"><h1 class="style-1">Similar</h1></div>
									<Carousel
										responsive={responsive}
										infinite={true}
										containerClass="carousel-container"
										itemClass="carousel-item-padding-40-px"
										centerMode={true}
									>
										{searchByIngredientData.map((recommendData) => (
											<RecommendCard
												cockTailData={recommendData}
												key={recommendData.idDrink}
												base={base}
											/>
										))}
									</Carousel>
								</>
							) : (
								<div>No Similar data available</div>
							)}
						</CardContent>
					</Card>
				</Collapse>
			</div>
		</div>
	);
};

export default RecommendCocktail;
