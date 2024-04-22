import React, { useState } from "react";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ReplayIcon from "@mui/icons-material/Replay";
import { useNavigate } from "react-router-dom";

const SearchForm = ({ onSearch }) => {
	const navigate = useNavigate();
	const [keyword, setKeyword] = useState("");

	const searchByKeyword = (e) => {
		e.preventDefault();
		onSearch(keyword);
		console.log("@@@ 검색 키워드:", keyword);
		navigate(`?s=${encodeURIComponent(keyword)}`, { replace: true }); //
		// setKeyword("");
	};

	const handleClearInput = () => {
		setKeyword(""); // 입력 필드 초기화
		navigate("/search", { replace: true });
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "center",
				p: 1,
				pl: 0,
				pr: 0,
			}}
		>
			<form
				// onClick={searchByKeyword}
				onSubmit={searchByKeyword}
				style={{ width: "100%" }}
			>
				<TextField
					value={keyword}
					name="search"
					onChange={(e) => setKeyword(e.target.value)}
					fullWidth
					id="search"
					type="search"
					// label="Search"
					variant="outlined"
					placeholder="Search Cocktails Name"
					color="warning"
					sx={{
						// borderColor: "#FD4926",
						border: "1px solid #FD4926",
						minWidth: 280,
						borderRadius: "15px",
						"& .MuiOutlinedInput-root": {
							borderRadius: "15px",
							borderColor: "#FD4926",
							WebkitBoxShadow:
								"0 .47rem .19rem rgba(255,0,0,.03),0 .94rem 1.41rem rgba(255,0,0,.03),0 .25rem .53rem rgba(117,47,47,.01),0 .13rem .19rem rgba(37,8,8,.03)!important;",
							height: 70,
							"& .MuiInputBase-input": {
								borderColor: "#FD4926",
								pl: 2,
								"&:hover": {
									borderColor: "#FD4926",
								},
							},
						},
						"&:-webkit-autofill": {
							borderRadius: "15px",
							borderColor: "#FD4926",
							WebkitBoxShadow: "0 0 0 1000px #FD4926 inset;",
							WebkitTextFillColor: "#FD4926",
						},
						'& input[type="search"]::-webkit-search-cancel-button': {
							WebkitAappearance: "none",
							appearance: "none",
						},
						"&:hover": {
							borderColor: "#FD4926",
						},
						"&.Mui-focused": {
							borderColor: "#FD4926",
						},
						// "&.Mui-disabled": {
						// 	borderColor: "#FD4926",
						// },
					}}
					// InputLabelProps={{
					//   shrink: false,
					// }}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<IconButton
									type="submit"
									aria-label="search"
									sx={{
										backgroundColor: "#FD4926",
										borderRadius: "8px",
										"&:hover": {
											backgroundColor: "#FD4926",
											color: "#fff",
										},
									}}
								>
									<SearchIcon sx={{ color: "#fff" }} fontSize="large" />
								</IconButton>
							</InputAdornment>
						),
						endAdornment: keyword && ( // 입력 값이 있을 때만 클리어 아이콘 표시
							<InputAdornment position="end">
								<IconButton onClick={handleClearInput} aria-label="clear input">
									<ReplayIcon sx={{ color: "#aaa" }} fontSize="large" />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</form>
		</Box>
	);
};

export default SearchForm;
