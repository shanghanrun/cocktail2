import React, { useRef, useState } from "react";
import upload from "../assets/uploadIcon.png";
import coc1 from "../assets/cocktail1.png";
import coc2 from "../assets/cocktail2.png";
import coc3 from "../assets/cocktail3.png";
import coc4 from "../assets/cocktail4.png";
import recipe from "../assets/Recipe.png";
import "../styles/CustomRecipePage.style.css";
import { ingredient, category, glass } from "../constant/list";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const CustomRecipePage = () => {
	const navigate = useNavigate();
	const inputRef = useRef();

	//Select 옵션 셋팅
	const [glassOptions] = useState(
		glass.map((option, index) => ({
			value: option,
			label: option,
		})),
	);
	const [categoryOptions] = useState(
		category.map((option, index) => ({
			value: option,
			label: option,
		})),
	);
	const [ingredientOptions] = useState(
		ingredient.map((option, index) => ({
			value: option,
			label: option,
		})),
	);
	const [unitOptions] = useState([
		{ value: "oz", label: "oz" },
		{ value: "ml", label: "ml" },
		{ value: "tsp", label: "tsp" },
		{ value: "pcs", label: "pcs" },
	]);

	//state 설정
	const [selectedFile, setSelectedFile] = useState(null);
	const [alcohol, setAlcohol] = React.useState(null);
	const [selectedGlass, setSelectedGlass] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedIngredient, setSelectedIngredient] = useState(null);
	const [selectedAmount, setSelectedAmount] = useState("");
	const [selectedUnit, setSelectedUnit] = useState(null);
	const [ingredients, setIngredients] = useState([]);
	const [selectedImage, setSelectedImage] = useState("null");
	const [clickedImageIndex, setClickedImageIndex] = useState(null);
	const [cocktailName, setCocktailName] = useState("");
	const [englishName, setEnglishName] = useState("");
	const [description, setDescription] = useState("");
	const [recipeDescription, setRecipeDescription] = useState("");

	//파일 업로드 함수
	const handleOnChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			setSelectedImage(e.target.files[0]); // 선택된 이미지 파일 이름 보여주려고 셋팅
			setClickedImageIndex(null); // 파일 업로드시 클릭된 이미지 상태 해제
			const reader = new FileReader();
			reader.onload = function (e) {
				const imageData = e.target.result;
				// Blob 객체로 변환
				const blob = dataURItoBlob(imageData);
				// Blob 객체를 로컬 스토리지에 저장
				localStorage.setItem("selectedFile", blob);
				setSelectedFile(imageData); // 이미지를 상태에 저장
			};
			reader.readAsDataURL(file); // 이미지 파일을 Data URL로 읽어옴
		}
	};
	const onChooseFile = () => {
		inputRef.current.click();
	};
	const removeFile = () => {
		setSelectedFile(null);
		setSelectedImage(null);
	};

	// Data URI를 Blob 객체로 변환하는 함수
	function dataURItoBlob(dataURI) {
		const byteString = atob(dataURI.split(",")[1]);
		const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
		const ab = new ArrayBuffer(byteString.length);
		const ia = new Uint8Array(ab);
		for (let i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
		return new Blob([ab], { type: mimeString });
	}

	//알코올 선택 함수
	const handleAlcohol = (event, newAlcohol) => {
		setAlcohol(newAlcohol);
	};

	//재료 추가 함수
	const handleAddIngredient = () => {
		// 재료와 용량을 상태에 추가
		const newIngredient = {
			name: selectedIngredient,
			amount: selectedAmount,
			unit: selectedUnit,
		};
		setIngredients([...ingredients, newIngredient]);
		// 인풋 필드 초기화
		setSelectedAmount("");
	};

	const handleImageClick = (imageString, index) => {
		setClickedImageIndex(index);
		removeFile();
	};

	const handleUpload = () => {
		// 이전 데이터 가져오기
		const existingData = JSON.parse(localStorage.getItem("drinkData")) || { drinks: [] };

		// 새로운 객체 생성
		const newDrink = {
			idDrink: Math.floor(Math.random() * 1000000), // 임의의 아이디 생성
			strDrink: cocktailName,
			ingredients:[{'ddd':'1'}],
			strCategory: selectedCategory, // 카테고리 입력 필요
			strAlcoholic: alcohol, // 알코올 유무 입력 필요
			strGlass: selectedGlass, // 사용하는 글래스 입력 필요
			strInstructions: description,
			strIngredient1: ingredients[0]?.name || null,
			strIngredient2: ingredients[1]?.name || null,
			strIngredient3: ingredients[2]?.name || null,
			strIngredient4: ingredients[3]?.name || null,
			strIngredient5: ingredients[4]?.name || null,
			strIngredient6: ingredients[5]?.name || null,
			strMeasure1: `${ingredients[0]?.amount || null} ${ingredients[0]?.unit || null}`,
			strMeasure2: `${ingredients[1]?.amount || null} ${ingredients[1]?.unit || null}`,
			strMeasure3: `${ingredients[2]?.amount || null} ${ingredients[2]?.unit || null}`,
			strMeasure4: `${ingredients[3]?.amount || null} ${ingredients[3]?.unit || null}`,
			strMeasure5: `${ingredients[4]?.amount || null} ${ingredients[4]?.unit || null}`,
			strMeasure6: `${ingredients[5]?.amount || null} ${ingredients[5]?.unit || null}`,
			strImageSource: selectedFile !== null ? selectedFile : clickedImageIndex,
			strRecipe: recipeDescription,
			strVideo : null
		};
		// 새로운 객체를 기존 데이터에 추가
		const updatedData = {
			drinks: [...existingData.drinks, newDrink],
		};
		// JSON 형태로 변환하여 로컬 스토리지에 저장
		localStorage.setItem("drinkData", JSON.stringify(updatedData));
		navigate("/customlist");
	};

	const imagesToShow = [coc1, coc2, coc3, coc4];

	return (
		<div className="customSection">
			<div className="writeSection">
				<div className="photoContainer">
					<h3>칵테일 사진(기본 디자인 선택)</h3>
					<input type="file" ref={inputRef} style={{ display: "none" }} onChange={handleOnChange} />
					<div className="photoGrid">
						<div className="imgBox">
							<img src={upload} alt="Upload" onClick={onChooseFile} />
							{selectedImage && (
								<div>
									<p>{selectedImage.name}</p>
								</div>
							)}
						</div>
						{imagesToShow.map((image, index) => (
							<div
								className={`imgBox ${clickedImageIndex === index ? "clicked" : ""}`}
								key={index}
								onClick={() => handleImageClick(image, index)}
							>
								<img src={image} alt="이미지" />
							</div>
						))}
					</div>
				</div>
				<div className="nameContainer">
					<h3>칵테일 이름</h3>
					<div className="inputForm">
						<input
							className="inputField"
							placeholder="이름을 지어주세요"
							value={cocktailName}
							onChange={(e) => setCocktailName(e.target.value)}
						/>
						<div className="numChar">0/50</div>
					</div>
				</div>
				<div className="enNameContainer">
					<h3>칵테일 영문이름</h3>
					<div className="inputForm">
						<input
							className="inputField"
							placeholder="이름을 지어주세요"
							value={englishName}
							onChange={(e) => setEnglishName(e.target.value)}
						/>
						<div className="numChar">0/50</div>
					</div>
				</div>
				<div className="descriptionContainer">
					<h3>칵테일 설명</h3>
					<div className="inputForm">
						<textarea
							className="textField"
							placeholder="칵테일 소개를 해주세요"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<div className="numChar">0/200</div>
					</div>
				</div>
				<div className="ingredientsContainer">
					<h3>재료 정보</h3>
					<div className="itemForm">
						<div className="itemHeader">재료</div>
						<Select
							options={ingredientOptions}
							placeholder="- [필수] 재료를 선택해주세요"
							className="ingredientsSearch"
							onChange={(selectedOption) => setSelectedIngredient(selectedOption.value)}
						></Select>
						<div className="amount">
							<input
								type="number"
								className="inputField"
								value={selectedAmount}
								placeholder="용량"
								onChange={(e) => setSelectedAmount(e.target.value)}
							/>
							<Select
								options={unitOptions}
								placeholder="- [필수] 단위를 선택해주세요"
								className="amountUnit"
								onChange={(selectedOption) => setSelectedUnit(selectedOption.value)}
							></Select>
						</div>
					</div>
					<div className="addedIngredients">
						{ingredients.map((ingredient, index) => (
							<div key={index}>
								{ingredient.name} : {ingredient.amount} {ingredient.unit}
							</div>
						))}
					</div>
					<button className="buttonClass" onClick={handleAddIngredient}>
						재료 추가
					</button>
				</div>
				<div className="recipeContainer">
					<h3>레시피 정보</h3>
					<div className="inputForm">
						<textarea
							className="textField"
							placeholder="레시피 설명을 작성해주세요"
							value={recipeDescription}
							onChange={(e) => setRecipeDescription(e.target.value)}
						/>
						<div className="numChar">0/200</div>
					</div>
				</div>
			</div>
			<div className="settingSection">
				<div className="infoBox">
					<h1>나만의 레시피!!</h1>
					<img src={recipe} alt="이미지" />
				</div>
				<div className="settingBox">
					<Select
						options={categoryOptions}
						placeholder="- [필수] 카테고리를 선택해주세요"
						className="ingredientsSearch"
						onChange={(selectedOption) => setSelectedCategory(selectedOption.value)}
					></Select>
					<Select
						options={glassOptions}
						placeholder="- [필수] 잔을 선택해주세요"
						className="ingredientsSearch"
						onChange={(selectedOption) => setSelectedGlass(selectedOption.value)}
					></Select>
					<div className="alcoholic">
						<ToggleButtonGroup value={alcohol} exclusive onChange={handleAlcohol}>
							<ToggleButton value="Alcoholic">Alcoholic</ToggleButton>
							<ToggleButton value="Non alcoholic">Non-Alcoholic</ToggleButton>
							<ToggleButton value="Optional alcohol">Optional alcohol</ToggleButton>
						</ToggleButtonGroup>
					</div>
					<button
						onClick={handleUpload}
						disabled={
							alcohol === null ||
							selectedGlass === null ||
							selectedCategory === null ||
							selectedIngredient === null ||
							selectedUnit === null ||
							cocktailName === "" ||
							englishName === "" ||
							description === "" ||
							recipeDescription === ""
						}
					>
						UPLOAD
					</button>
				</div>
			</div>
		</div>
	);
};

export default CustomRecipePage;
