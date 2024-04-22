import React, { useState } from "react";
import {
	MenuItem,
	Tooltip,
	Button,
	alpha,
	styled,
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	Container,
	Avatar,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Logo from "../assets/image/Logo.png";
import loginStore from "../store/loginStore";

const pages = ["search", "community", "game"];
const settings = ["My Page", "Logout"];

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.black, 0.05),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.black, 0.1),
	},
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	width: "100%",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

//TODO: NavLink로 링크 다시 연결하기

function AppLayout() {
	const navigate = useNavigate();
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [keyword, setKeyword] = useState("");

	const { isLogin, setIsLogin, setIsLogout } = loginStore((state) => state);

	const handleLogout = () => {
		setAnchorElUser(null);
		setIsLogout();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate(`/search?s=${keyword}`);
		setKeyword("");
	};

	// 프로필 메뉴 클로즈 핸들러
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<>
			<AppBar
				position="static"
				color="inherit"
				sx={{
					color: "black",
				}}
			>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Typography
							as={NavLink}
							to="/"
							variant="h6"
							noWrap
							component="h1"
							href="#app-bar-with-responsive-menu"
							sx={{
								mr: 2,
								textAlign: "center",
								fontSize: "2.2rem",
								display: { xs: "none", md: "flex" },
								letterSpacing: ".1rem",
								color: "#FD4926",
								borderBottom: "2px solid transparent",
								fontWeight: 900,
								WebkitTextStroke: "1px #FD4926",
							}}
						>
							Shake & Drink
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={(e) => {
									setAnchorElNav(e.currentTarget);
								}}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								open={Boolean(anchorElNav)}
								onClose={() => {
									setAnchorElNav(null);
								}}
								sx={{
									display: { xs: "block", md: "none" },
								}}
							>
								{pages.map((page) => (
									<MenuItem
										key={page}
										onClick={() => {
											setAnchorElNav(null);
										}}
									>
										<Typography
											textAlign="center"
											onClick={() => {
												let url;
												if (page === "community") {
													url = "customlist";
												} else {
													url = page;
												}
												navigate(`/${url}`);
												setAnchorElNav(null);
											}}
										>
											{page}
										</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
						<Typography
							as={NavLink}
							to="/"
							variant="h5"
							noWrap
							component="a"
							href="#app-bar-with-responsive-menu"
							sx={{
								fontFamily: "Noto Sans, sans-serif",
								mr: 2,
								display: { xs: "flex", md: "none" },
								textAlign: "center",
								fontSize: "2.2rem",
								flexGrow: 1,
								letterSpacing: ".1rem",
								color: "#FD4926",
								textDecoration: "none",
								fontWeight: 900,
								WebkitTextStroke: "1px #FD4926",
							}}
						>
							Shake & Drink
						</Typography>
						<Box
							sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "flex-end" }}
						>
							{pages.map((page) => (
								<Button
									key={page}
									onClick={() => {
										let url;
										if (page === "community") {
											url = "customlist";
										} else {
											url = page;
										}
										navigate(`/${url}`);
										setAnchorElNav(null);
									}}
									sx={{ my: 2, color: "inherit", display: "block" }}
								>
									{page}
								</Button>
							))}
						</Box>

						<form onSubmit={handleSubmit}>
							<Search sx={{ mr: "45px", display: { xs: "none", md: "flex" } }}>
								<SearchIconWrapper type="submit" aria-label="search">
									<SearchIcon />
								</SearchIconWrapper>
								<StyledInputBase
									placeholder="Search…"
									inputProps={{ "aria-label": "search" }}
									value={keyword}
									onChange={(e) => setKeyword(e.target.value)}
								/>
							</Search>
						</form>

						{isLogin ? (
							<Box sx={{ flexGrow: 0 }}>
								<Tooltip title="Open settings">
									<IconButton
										onClick={(e) => {
											setAnchorElUser(e.currentTarget);
										}}
									>
										<Avatar src="/broken-image.jpg" sx={{ width: 30, height: 30 }} />
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: "45px" }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorElUser)}
									onClose={() => {
										setAnchorElUser(null);
									}}
								>
									{settings.map((setting) => (
										<MenuItem
											key={setting}
											onClick={() => {
												if (setting === "My Page") navigate("/user");
												if (setting === "Logout") handleLogout();
												handleCloseUserMenu();
											}}
										>
											<Typography textAlign="center">{setting}</Typography>
										</MenuItem>
									))}
								</Menu>
							</Box>
						) : (
							<Button color="inherit" as={NavLink} to="/login">
								Login
							</Button>
						)}
					</Toolbar>
				</Container>
			</AppBar>
			<Outlet />
		</>
	);
}
export default AppLayout;
