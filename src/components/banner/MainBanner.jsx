import React from "react";
import banner1 from "../../assets/image/cocktail-banner1.png";
import banner2 from "../../assets/image/cocktail-banner2.png";
import banner3 from "../../assets/image/cocktail-banner3.png";
import banner4 from "../../assets/image/cocktail-banner4.png";
import banner5 from "../../assets/image/cocktail-banner5.png";

const MainBanner = () => {
	return (
		<div id="main-banner">
			{/* <h3>Ready for your special day!</h3> */}
			<div className="main-banner-wrap">
				<ul id="home-banner">
					<li>
						<img src={banner1} alt="배너1" />
					</li>
					<li>
						<img src={banner2} alt="배너2" />
					</li>
					<li>
						<img src={banner3} alt="배너3" />
					</li>
					<li>
						<img src={banner4} alt="배너4" />
					</li>
					<li>
						<img src={banner5} alt="배너5" />
					</li>
				</ul>
			</div>
		</div>
	);
};

export default MainBanner;
