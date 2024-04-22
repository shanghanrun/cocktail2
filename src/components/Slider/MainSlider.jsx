import React from "react";
import Slider from "react-slick";
import Slide1 from "../../assets/image/cocktail-slide-1.jpg";
import Slide2 from "../../assets/image/cocktail-slide-2.jpg";
import Slide3 from "../../assets/image/cocktail-slide-3.jpg";
import Poster1 from "../../assets/image/cocktail-poster.png";

const MainSlider = () => {
	let settings = {
		dots: true,
		infinite: true,
		speed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		lazyLoad: "anticipated", //페이지 미리로딩
		pauseOnHover: false,
	};
	return (
		<div>
			<Slider {...settings} className="home-slide">
				<div>
					<img src={Slide1} alt="메인베너이미지1" />
					<div className="event">
						<p>
							<p>
								<img src={Poster1} alt="" />
							</p>
						</p>
						<p>
							<h3>2024 Summer Cocktail Festival</h3>
							<button>신청하기</button>
						</p>
					</div>
				</div>
				<div>
					<img src={Slide2} alt="메인배너이미지2" />
				</div>
				<div>
					<img src={Slide3} alt="메인배너이미지3" />
				</div>
			</Slider>
		</div>
	);
};

export default MainSlider;
