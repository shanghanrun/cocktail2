import React, { useEffect, useState } from "react";
import { useRandomCocktail } from "../hooks/useRandomCocktail";
import { Box, Container } from "@mui/material";
import SelectList from "../components/GamePage/SelectList";
import GameTitle from "../components/GamePage/GameTitle";
import LevelComponent from "../components/GamePage/LevelComponent";
import GameSuccess from "../components/GamePage/GameSuccess";
import LoadingPage from "../pages/loadingPage/LoadingPage";
import NotFoundPage from "../pages/NotFoundPage";

function GamePage() {
	const { data, isLoading, isError } = useRandomCocktail();
	const [selected, setSelected] = useState([0, 0, 0, 0, 0, 0]);
	const [level, setLevel] = useState(0);
	const [correctNumber, setCorrectNumber] = useState(null);
	const [levelName, setLevelName] = useState();

	useEffect(() => {
		switch (level) {
			case 4:
				setLevelName("칵테일 마스터");
				break;
			case 3:
				setLevelName("칵테일 바 단골");
				break;
			case 2:
				setLevelName("소맥파");
				break;
			case 1:
				setLevelName("응애");
				break;
			default:
				setLevelName("칵테일의 신");
				break;
		}
	}, [level]);

	useEffect(() => {
		setCorrectNumber(Math.floor(Math.random() * 5));
	}, []);

	if (isLoading) {
		return <LoadingPage />;
	} else if (isError) {
		console.error(isError);
		return <NotFoundPage />;
	}

	return (
		<Container maxWidth="sm" sx={{ mt: "30px" }}>
			<Box sx={{ width: "100%", height: "250px", mb: "30px" }}>
				{level === 0 && (
					<GameTitle
						onNext={() => {
							setLevel(5);
						}}
					/>
				)}
				{level === 5 && selected[correctNumber] !== 1 && (
					<LevelComponent
						level={level}
						levelName={levelName}
						title="이 칵테일에 들어가는 2가지 재료"
						data={data?.drinks[correctNumber]}
					/>
				)}
				{level === 4 && selected[correctNumber] !== 1 && (
					<LevelComponent
						level={level}
						levelName={levelName}
						title="이 칵테일에 들어가는 모든 재료"
						data={data?.drinks[correctNumber]}
					/>
				)}
				{level === 3 && selected[correctNumber] !== 1 && (
					<LevelComponent
						level={level}
						levelName={levelName}
						title="칵테일 알콜유무와 칵테일에 사용되는 글라스"
						data={data?.drinks[correctNumber]}
					/>
				)}
				{level === 2 && selected[correctNumber] !== 1 && (
					<LevelComponent
						level={level}
						levelName={levelName}
						title="칵테일 만드는 방법"
						data={data?.drinks[correctNumber]}
					/>
				)}
				{level === 1 && selected[correctNumber] !== 1 && (
					<LevelComponent
						level={level}
						levelName={levelName}
						title="칵테일 사진"
						data={data?.drinks[correctNumber]}
					/>
				)}
				{selected[correctNumber] === 1 && (
					<GameSuccess levelName={levelName} setLevel={setLevel} setSelected={setSelected} />
				)}
			</Box>
			{level !== 0 && selected[correctNumber] !== 1 && (
				<SelectList
					data={data}
					selected={selected}
					setSelected={setSelected}
					setLevel={setLevel}
					correctNumber={correctNumber}
				/>
			)}
		</Container>
	);
}

export default GamePage;
