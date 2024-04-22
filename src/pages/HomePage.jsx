import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../styles/homePage.style.css";

import PopularList from "../components/mainList/PopularList";
import LatestList from "../components/mainList/LatestList";
import MainSlider from "../components/Slider/MainSlider";

import midBanner from "../assets/image/jazzbanner.png";
import MainBanner from "../components/banner/MainBanner";
import MainGrid from "../components/grid/MainGrid";
import Footer from "../components/Footer/Footer";

function HomePage() {
	return (
		<div id="home-page">
			<MainSlider />
			<MainBanner />
			<PopularList />
			<div id="middle-banner">
				<img src={midBanner} alt="재즈페스티벌" />
			</div>
			<LatestList />
			<MainGrid />
			<Footer />
		</div>
	);
}

export default HomePage;
