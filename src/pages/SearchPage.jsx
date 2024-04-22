import React, { useState, useEffect, useMemo } from "react";
import { Box, Container, Typography, Button, Stack, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../components/SearchForm"; // 검색창
import SearchButtons from "../components/SearchButtons"; // 카테고리 버튼
import Card from "../components/card/Card"; // 카드 컴포넌트
// hook
import { useSearchCocktailsByName } from "../hooks/useSearchCocktailsByName";
import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import LoadingPage from "./loadingPage/LoadingPage";
import Footer from "../components/Footer/Footer";

const ContainerSx = styled(Container)(({ theme, paddingTop = 8, paddingBottom = 2 }) => ({
	// pt: 8,
	// pb: 6,
	// paddingTop: theme.spacing(8),
	// paddingBottom: theme.spacing(6),
	paddingTop: theme.spacing(paddingTop), // 기본값은 8
	paddingBottom: theme.spacing(paddingBottom), // 기본값은 6
}));
const StackSX = {
	display: "flex",
	flexDirection: "row",
	justifyContent: "center",
};

const SearchPage = () => {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [sortOrder, setSortOrder] = useState("asc");

	console.log("## selectedCategory", selectedCategory);
	const [searchParams, setSearchParams] = useSearchParams();
	const keyword = searchParams.get("s") || "";
	const { data: cocktailCardData, isLoading, isError, error } = useSearchCocktailsByName(keyword);
	console.log("##cocktailCardData", cocktailCardData);
	const handleSearch = (keyword) => {
		// e.preventDefault();
		setSearchParams({ s: keyword });
	};

	const handleCategoryChange = (category) => {
		console.log("Changing to category:", category);
		setSelectedCategory(category);
		console.log("Current selected category:", selectedCategory);
	};

	const toggleSortDirection = () => {
		setSortOrder(sortOrder === "asc" ? "desc" : "asc");
	};

	const filteredAndSortedCocktails = useMemo(() => {
		if (!cocktailCardData) return [];

		const filtered =
			cocktailCardData &&
			(selectedCategory === "All"
				? cocktailCardData
				: cocktailCardData.filter(
						(cocktail) => cocktail.strCategory.toLowerCase() === selectedCategory.toLowerCase(),
				  ));

		return filtered.sort((a, b) => {
			if (sortOrder === "asc") {
				return a.strDrink.localeCompare(b.strDrink);
			} else {
				return b.strDrink.localeCompare(a.strDrink);
			}
		});
	}, [cocktailCardData, selectedCategory, sortOrder]);

	if (isLoading)
		return (
			<div>
				<LoadingPage />
			</div>
		);
	if (isError) {
		console.error("Error fetching data:", error);
		return <div>An error occurred: {error?.message || "Network or server issue"}</div>;
	}
	if (!cocktailCardData || cocktailCardData.length === 0) {
		return <div>No cocktails found.</div>;
	}
	console.log("Filtered cocktails:", filteredAndSortedCocktails);

	return (
		<>
			<Box>
				{/* <Typography component="h2" variant="h1">
					검색페이지
				</Typography> */}
				<Box sx={{ mt: 13 }}>
					<Container maxWidth="lg">
						<Typography
							component="h2"
							variant="h3"
							sx={{
								display: "flex",
								// margin: "32px 0",
								textAlign: "center",
								justifyContent: "center",
								alignItems: "flex-end",
								// alignItems: "center",
							}}
						>
							Drink
							<Typography
								component="span"
								variant="h2"
								sx={{
									fontWeight: "500",
									color: "#FD4926",
								}}
							>
								Searching
							</Typography>
						</Typography>
					</Container>
				</Box>
				{/* Title Area E */}
				<Box>
					<ContainerSx maxWidth="lg">
						<SearchForm onSearch={handleSearch} />
					</ContainerSx>
				</Box>
				{/* SearchForm Area E */}
				{keyword && (
					<Box sx={{ mt: 2 }}>
						<Container maxWidth="lg">
							<Stack sx={StackSX} gap={2}>
								<Typography
									variant="h6"
									sx={{
										// textAlign: "center",
										// mb: 2,
										display: "flex",
										alignItems: "center",
										fontWeight: "bold",
										// color: theme.palette.primary.main
									}}
								>
									{`Search results for "${keyword}": ${
										filteredAndSortedCocktails ? filteredAndSortedCocktails.length : 0
									} item(s)`}
								</Typography>
								<Button
									variant="outlined"
									// color="secondary"
									sx={{
										color: "#a1a1a1",
										fontWeight: "600",
										border: "2px solid #ccc",
										"&:hover": {
											backgroundColor: "#a1a1a1",
											color: "#fff",
											border: "2px solid #FD4926",
										},
									}}
									startIcon={<YoutubeSearchedForIcon fontSize="large" />}
									onClick={() => {
										setSearchParams({});
									}}
								>
									Reset Search
								</Button>
							</Stack>
						</Container>
					</Box>
				)}
				{/* Result Count E */}
				<Box sx={{ mt: 5 }}>
					<Container maxWidth="lg">
						<SearchButtons onCategoryChange={handleCategoryChange} />
					</Container>
				</Box>
				{/* SearchButtons Area */}
				<Box sx={{ mb: 4, mt: 7, pb: 8 }}>
					<Container maxWidth="lg">
						<Box sx={{ display: "flex", justifyContent: "end" }}>
							<IconButton onClick={toggleSortDirection} sx={{ color: "#000" }}>
								<Stack gap={1}>
									<Typography variant="h6"> Sort by</Typography>
								</Stack>
								<Stack>
									{sortOrder === "asc" ? (
										<ArrowDownwardIcon fontSize="large" />
									) : (
										<ArrowUpwardIcon fontSize="large" />
									)}
								</Stack>
							</IconButton>
						</Box>
						<Box
							sx={{
								display: "flex",
								flexWrap: "wrap",
								gap: 3,
								justifyContent: "space-between",
							}}
						>
							{filteredAndSortedCocktails.map((cockTailData, index) => (
								<Card key={index} cockTailData={cockTailData} />
							))}
						</Box>
					</Container>
				</Box>
				{/* Card data list Area E */}
			</Box>
			<Footer />
		</>
	);
};

export default SearchPage;
