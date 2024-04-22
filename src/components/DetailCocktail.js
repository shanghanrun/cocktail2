import React, { useState, useRef, useEffect } from "react";
import midBanner from "../assets/image/jazzbanner.png";
import { Container, Grid, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import FormGroup from "@mui/material/FormGroup";
import SendIcon from "@mui/icons-material/Send";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import ingredientCocktail from "../assets/image/ingredient-cocktail.jpg";
import receiptCocktail2 from "../assets/image/receipt-cocktail2.jpg";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import LocalBarRoundedIcon from "@mui/icons-material/LocalBarRounded";
import SubscriptionsRoundedIcon from "@mui/icons-material/SubscriptionsRounded";
import Video from "./Video/Video";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useBookmark } from "../store/bookmarkStore";

import axios from 'axios';

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "90%", // 너비를 화면 너비의 80%로 설정
	height: "80%", // 높이를 자동으로 조정하여 내용에 맞게 설정

	bgcolor: "background.paper",
	// border: "2px solid #000",
	boxShadow: 24,
	// p: 10,
};

const DetailCocktail = ({ detailData }) => {
	const [isKor, setIsKor] = useState(false)
	const [isActive, setIsActive] = useState(false)
	const [primaryData, setPrimaryData] = useState([])
	const apiKey = process.env.REACT_APP_API_KEY2; 
	console.log('apikey:', apiKey)
	const [eTextList, setETextList] = useState([]);
	const [kTextList, setKTextList] = useState([]);

	async function translate(){
		if(isKor){
			setIsKor(false)
		} else{
			console.log('번역시작')
			const translatedList=[]

			for(const text of eTextList){
				try{
					const resp = await axios.post(
						`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
						{
						q: text,
						source: 'en',
						target: 'ko' 
						}
					);
					translatedList.push(resp.data.data.translations[0].translatedText);
					//html태그가 번역되면서 '$#39;'문자열이 섞여 들어갈 경우가 있다. 지금은 또 괜찮음...
				} catch (error) {
					console.error('Error translating text:', error);
				}
			}
			setIsKor(true)
			setKTextList(translatedList);
			console.log('번역완료')
		}
	}

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	console.log("detailData", detailData);
	const inputForm1 = useRef();
	const inputForm2 = useRef();
	const onMoveToForm1 = () => {
		inputForm1.current.scrollIntoView({ behavior: "smooth", block: "start" });
	};
	const onMoveToForm2 = () => {
		inputForm2.current.scrollIntoView({ behavior: "smooth", block: "start" });
	};
	const { addBookmark } = useBookmark();


	useEffect(() => {
		if(detailData){
			setPrimaryData(detailData);
			setETextList([detailData.strDrink, detailData.strInstructions]);
		}
    }, []);

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Video strVideo={detailData.strVideo?detailData.strVideo:null} />
					{/* <Typography id="modal-modal-title" variant="h6" component="h2"></Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography> */}
				</Box>
			</Modal>
			<Grid container className="detail-information-container" spacing={2}>
				<Grid item xs={12} sm={6}>
					<div className="cocktail-image-wrap">
						<img src={detailData?.strDrinkThumb} alt="cocktail" className="cocktail-image" />
					</div>
				</Grid>
				<Grid item xs={12} sm={6}>
					<div className="detail-content">
						<div className="badgeWrap">
							<span>{detailData?.strAlcoholic === "Alcoholic" ? "#알콜" : "#무알콜"}</span>
							<span>#재료 {detailData?.ingredients.length}개</span>
						</div>

						<div>
							<span className="title">음료 : {!isKor? detailData?.strDrink: kTextList[0]}</span>
							{/* <span className="secondTitle">{!isKor? eTextList[0]: kTextList[0]}</span> */}
						</div>
						<div className="str-glass">Cup : {detailData?.strGlass}</div>
						<div className="str-category">Cup : {detailData?.strCategory}</div>
						<div className="buttonWrap">
							<div>
								<Button
									variant="contained"
									onClick={onMoveToForm1}
									endIcon={<LocalBarRoundedIcon />}
									className="ingredient-btn"
									color="warning"
								>
									ingredient
								</Button>
							</div>
							<div><Button
								variant="contained"
								onClick={onMoveToForm2}
								endIcon={<ChecklistRtlIcon />}
								color="warning"
								className="recipe-btn"
							>
								recipe
							</Button></div>
							
						</div>
						<div>
								{detailData.strVideo ? (
									
									<Button
										onClick={handleOpen}
										variant="contained"
										className="youtube-btn"
										endIcon={<SubscriptionsRoundedIcon />}
										color="error"
									>
										Youtube recipe
									</Button>
								) : (
									<Button variant="contained" disabled endIcon={<SubscriptionsRoundedIcon />}className="disabled-btn">
										No recipe
									</Button>
								)}
						</div>
						<div>
							{detailData?.strInstructions ? (
								<div style={{display:'flex', gap:'20px'}}>
									<Button variant="contained" onClick={translate} 
										style={{background:'red', margin:'20px 0'}}>
										{isKor? '영어원문' : '한글번역'}
									</Button>
									<div style={{ width: "200px", marginTop:'20px',fontSize:'20px' }}>
										<BookmarkIcon className={isActive ? "active" : ""}
											id="bookmarkIcon"
											sx={{ fontSize:'30px', "&:hover": { color: "#004cff", transform:'scale(1.2)' } }}
											onClick={()=>{
												setIsActive(!isActive)
												addBookmark(detailData)
											}}
										/> 북마크 추가
									</div>
								</div>
							)
							
							:(
								<div>번역할 원문이 없습니다.</div>
							)
							}
						</div>
						
						
						{/* <FormGroup>
							<FormControlLabel control={<Switch defaultChecked />} label="한글 번역" />
						</FormGroup> */}
						
					</div>
				</Grid>
			</Grid>
			<Paper elevation={12} className="ingredient-paper" ref={inputForm1}>
				<div className="explanation-paper-img-container">
					<img src={ingredientCocktail} alt="" className="ingredient-paper-img" />
					<div id="ingredient-container">
							<h1 class="style-1">Ingredient</h1>
						</div>
					<div className="ingredient-list">
				
						{detailData?.ingredients.map((item) => (
							<div className="ingredient-row" key={item.id}>
								<div className="item-ingredient">{item.ingredient}</div>
								<div className="item-measure">{item.measure}</div>
							</div>
						))}
					</div>
				</div>
			</Paper>

			{/* <div id="middle-banner">
				<img src={midBanner} alt="재즈페스티벌" />
			</div> */}
			<Paper elevation={12} className="explanation-paper" ref={inputForm2}>
				<div className="explanation-paper-img-container">
					<img src={receiptCocktail2} alt="" className="explanation-paper-img" />
					<div className="recipe-container"><h1 class="style-1">Recipe</h1></div>
					<div className="explanation-div">{!isKor? detailData?.strInstructions : kTextList[1]}</div>
				</div>
			</Paper>
		</div>
	);
};

export default DetailCocktail;
