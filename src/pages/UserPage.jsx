import React, { useState, useEffect } from "react";
import { Container, Grid, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaidIcon from "@mui/icons-material/Paid";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";
import { useFavorite } from "../store/favoriteStore";
import { useUser } from "../store/userStore";
import { useCart } from "../store/cartStore";
import { useOrder } from "../store/orderStore";
import { useAnalyze } from "../store/analyzeStore";
import { usePoint } from "../store/pointStore";
import { useBookmark } from "../store/bookmarkStore";
import WishCard from "../components/WishCard";
import { useNavigate } from "react-router-dom";
import loginStore from "../store/loginStore";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Checkbox from "@mui/material/Checkbox";
import CartCard from "../components/CartCard";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function UserPage() {
	const navigate = useNavigate();
	const { favoriteList, emptyFavoriteList } = useFavorite();
	const { cartList, addToCart, addListToCart, removeFromCart, addCount, minusCount } = useCart();
	const { orderList, addListToOrder, removeListFromOrder, totalMoney, addTotalMoney } = useOrder();
	const { id, email, password, nickName, editUser } = useUser();
	const {
		"firstRatedCategory": firstRatedCategory,
		"Ordinary Drink": ordinaryDrink,
		"Cocktail": cocktail,
		"Shake": shake,
		"Other / Unknown": otherUnknown,
		"Cocoa": cocoa,
		"Shot": shot,
		"Coffee / Tea": coffeeTea,
		"Homemade Liqueur": homemadeLiqueur,
		"Punch / Party Drink": punch,
		"Beer": beer,
		"Soft Drink": softDrink,
		updateState,
		setFirstRatedCategory,
	} = useAnalyze();

	const { point, coupon, addPoint, addCoupon } = usePoint();
	const { bookmarkList } = useBookmark();

	const [totalPrice, setTotalPrice] = useState(0);
	const [open, setOpen] = useState(false); // 결제 확인창
	const [show, setShow] = useState(false); // 주문내역 창
	const [showUserDialog, setShowUserDialog] = useState(false); // user Dialog
	const [showFavorC, setShowFavorC] = useState(false); //FavorCategory Dialog
	const [book, setBook] = useState(false); // Bookmark dialog

	const [checked, setChecked] = useState(false);
	const [countChange, setCountChange] = useState(false);
	const [orderedList, setOrderedList] = useState([]);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		nickname: "",
	});

	const { isLogin } = loginStore((state) => state);

	useEffect(() => {
		if (!isLogin) {
			navigate("/login");
		}
	}, [isLogin, navigate]);

	const handleChange = (event) => {
		setChecked(event.target.checked);
	};

	console.log("favoriteList :", favoriteList);

	function calculateTotalPrice() {
		let result = 0;
		for (let i = 0; i < cartList.length; i++) {
			result += cartList[i].price * cartList[i].count;
		}
		setTotalPrice(result);
	}
	function add(id) {
		addCount(id);
		setCountChange(!countChange);
	}
	function minus(id) {
		minusCount(id);
		setCountChange(!countChange);
	}

	function addFavsToCart() {
		if (checked) {
			addListToCart(favoriteList);
			emptyFavoriteList();
			setChecked(false);
			calculateTotalPrice();
		}
	}
	function payment(list) {
		setOpen(true);
		setOrderedList(list);
		addListToOrder(list);
	}
	function showOrder() {
		setShow(true);
	}
	function showFavorCategory() {
		setShowFavorC(true);
	}
	function showRecommendations() {
		setShowFavorC(false);
		navigate(`/favor-category/${firstRatedCategory}`);
	}
	function showBookmark() {
		setBook(true);
	}
	function handleClose() {
		// 취소버튼
		setOpen(false);

		removeListFromOrder(orderedList);
	}
	function handleClose2(list) {
		//확인버튼
		setOpen(false);
		addTotalMoney(totalPrice);
		addPoint(totalPrice / 100);
		addCoupon(Math.ceil(totalPrice / 10000));
		console.log("전달 리스트:", list);
		list.forEach((item) => {
			updateState(item.strCategory);
		});
	}
	function handleBookClose() {
		setBook(false);
	}
	function getFirstItem() {
		setFirstRatedCategory();
	}
	function handleShowClose() {
		setShow(false);
	}
	function changeUserInfo() {
		setShowUserDialog(true);
	}
	function closeUserDialog() {
		setShowUserDialog(false);
	}
	function closeFavorCategory() {
		setShowFavorC(false);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		// setAuth(true)
		editUser(formData); // <---임시저장formData <--- form으로부터 입력값.
		console.log("수정된 user정보:", formData);
		// setShowUserDialog(false)
	};
	const handleUserChange = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: value, //변수의 값으로 프로퍼티를 만들 경우
		}));
	};
	function showIngredient(){
		navigate('/ingredient')
	}

	useEffect(() => {
		//수량이 바뀔 때마다 총액계산 다시 하게 한다.
		calculateTotalPrice();
	}, [countChange, cartList.length, showUserDialog]);
	//showUserDialog 가 바뀔 때, 화면이 다시 갱신되어 user정보가 바뀌게 함.

	return (
		<div>
			<Container>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6} lg={6}>
						<Container
							maxWidth="lg"
							sx={{
								border: "2px solid grey",
								py: "10px",
								display: "flex",
								justifyContent: "center",
								gap: "20px",
							}}
						>
							<AccountCircleIcon style={{ fontSize: "150px", color: "grey" }} />
							<div style={{ marginTop: "20px" }}>
								<div>id: {id}</div>
								<div>@이메일: {email}</div>
								<div>password: {password}</div>
								<div>닉네임: {nickName}</div>
							</div>
						</Container>
					</Grid>
					<Grid item xs={12} md={6} lg={6}>
						<Container Container maxWidth="lg" sx={{ border: "2px solid grey", padding: "20px" }}>
							<div>
								<div
									style={{
										display: "flex",
										justifyContent: "start",
										gap: "20px",
									}}
								>
									<div>
										<div>
											<div style={{ width: "80px", textAlign: "center" }}>
												<PaidIcon sx={{ "&:hover": { color: "#004cff" } }} />
											</div>

											<div>
												포인트
												<span style={{ color: "#004cff" }}>{point}P</span>
											</div>
										</div>
									</div>
									<div>
										<div style={{ width: "60px", textAlign: "center" }}>
											<CalendarViewWeekIcon sx={{ "&:hover": { color: "#004cff" } }} />
										</div>

										<div>
											쿠폰
											<span style={{ color: "#004cff" }}>{coupon}장</span>
										</div>
									</div>
									<div>
										<div style={{ width: "60px", textAlign: "center" }}>
											<BookmarkIcon
												sx={{ "&:hover": { color: "#004cff", transform:'scale(1.2)' } }}
												onClick={showBookmark}
											/>
										</div>
										<div>
											북마크
											<span style={{ color: "#004cff" }}>{bookmarkList.length}개</span>
										</div>
									</div>
								</div>
								<div>
									<Button variant="contained"
									sx={{ marginTop: "20px" }}
									onClick={changeUserInfo}>
										정보변경
									</Button>
									<Button variant="contained"
									onClick={showFavorCategory} sx={{ ml: "10px", marginTop: "20px" }}>
										Favor Category
									</Button>
									<Button variant="contained" onClick={showOrder} sx={{ mx: "10px", marginTop: "20px" }}>
										주문내역
									</Button>
									<Button variant="contained" onClick={showIngredient} sx={{ marginTop: "20px" }}>
										번역API
									</Button>
								</div>
							</div>
						</Container>
					</Grid>
					<Grid item xs={12} md={6} lg={6}>
						<Container maxWidth="lg" sx={{ border: "2px solid grey", py: "10px" }}>
							<div style={{display:'flex', justfiyContent:'start', flexWrap:'wrap', gap:'10px'}}>
								<h3>Wish List : </h3>
								<h3>{favoriteList.length} 개</h3>
							</div>
							<Checkbox
								checked={checked}
								onChange={handleChange}
								inputProps={{ "aria-label": "controlled" }}
							/>{" "}
							전체선택
							<Button onClick={addFavsToCart} variant="contained" color="error" sx={{ ml: "10px" }}>
								Cart에 담기
							</Button>
							<div style={{ display: "flex", gap: "10px", flexWrap:'wrap' }}>
								{favoriteList.map((item) => (
									<WishCard key={item.idDrink} item={item} addToCart={addToCart} />
								))}
							</div>
						</Container>
					</Grid>
					<Grid item xs={12} md={6} lg={6}>
						<Container maxWidth="lg" sx={{ border: "2px solid grey", py: "10px" }}>
							<h3>Cart</h3>
							<div>
								<div style={{ fontSize: "25px" }}>
									<ShoppingCartIcon /> total: {cartList.length}
								</div>
								<div style={{ display: "flex", justifyContent: "start", gap: "10px", flexWrap:'wrap' }}>
									{cartList?.map((item, i) => (
										<div key={i}>
											<div style={{display:'flex', justifyContent:'start', gap:'5px'}}>
												<CartCard item={item} />
												<ClearIcon
													onClick={() => {
														removeFromCart(item.idDrink);
														calculateTotalPrice();
													}}
												/>
											</div>
											<div style={{ marginTop: "10px" }}>
												수량: <AddCircleOutlineIcon onClick={() => add(item.idDrink)} />{" "}
												{item.count} <RemoveCircleOutlineIcon onClick={() => minus(item.idDrink)} />
											</div>
										</div>
									))}
								</div>
							</div>
						</Container>
						<Container maxWidth="lg" sx={{ border: "2px solid grey", mt: "10px", py: "10px" }}>
							<div>
								<h3>Payment</h3>
								{/* <Button onClick={calculateTotalPrice}
									sx={{backgroundColor:'green', color:'black'}}>총액계산</Button> */}
								<div
									style={{
										border: "1px solid grey",
										padding: "10px",
										margin: "10px 0",
									}}
								>
									<div>
										{cartList.map((item, i) => (
											<div key={i}>
												<span>{item.strDrink}: </span>
												<span>{item.price}</span>
												<span> * {item.count}</span>
											</div>
										))}
									</div>
									<div style={{color:'red',fontWeight:'bold'}}>총결제금액: {totalPrice} 원</div>
								</div>
								<Button onClick={() => payment(cartList)} variant="contained" color="success">
									결제하기
								</Button>
							</div>
						</Container>
					</Grid>
				</Grid>
				<div>
					{open ? ( // 결제정보 다이알로그
						<Dialog
							open={open}
							onClose={handleClose}
							aria-labelledby="alert-dialog-title"
							aria-describedby="alert-dialog-description"
						>
							<DialogTitle id="alert-dialog-title">{"결제정보"}</DialogTitle>
							<DialogContent>
								<DialogContentText id="alert-dialog-description">
									총액: {totalPrice} 입니다. 확정합니까?
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleClose}>취소</Button>
								<Button onClick={() => handleClose2(cartList)} autoFocus>
									확인
								</Button>
							</DialogActions>
						</Dialog>
					) : (
						""
					)}
				</div>
				<div>
					{show ? ( // 주문내역 다이알로그
						<Dialog
							open={show}
							onClose={handleShowClose}
							aria-labelledby="alert-dialog-title"
							aria-describedby="alert-dialog-description"
						>
							<DialogTitle id="alert-dialog-title">{"주문내역"}</DialogTitle>
							<DialogContent>
								<DialogContentText id="alert-dialog-description">
									<div>
										{orderList.map((item, i) => (
											<div key={i}>
												<div>
													{item.strDrink}: {item.price}*{item.count}원
												</div>
											</div>
										))}
									</div>
									<div>Total: {totalMoney} 원</div>
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleShowClose} autoFocus>
									확인
								</Button>
							</DialogActions>
						</Dialog>
					) : (
						""
					)}
				</div>
				<div>
					{showFavorC ? ( // Favor Category 다이알로그
						<Dialog
							open={showFavorC}
							onClose={closeFavorCategory}
							aria-labelledby="alert-dialog-title"
							aria-describedby="alert-dialog-description"
						>
							<DialogTitle id="alert-dialog-title">{"자주 찾은 Category 정보"}</DialogTitle>
							<DialogContent>
								<DialogContentText id="alert-dialog-description">
									<div>
										<p>최애 카테고리: {firstRatedCategory}</p>
										<div>
											<div>ordinary drink : {ordinaryDrink}</div>
											<div>cocktail : {cocktail}</div>
											<div>shake : {shake}</div>
											<div>other /unknown : {otherUnknown}</div>
											<div>cocoa : {cocoa}</div>
											<div>shot : {shot}</div>
											<div>coffee tea : {coffeeTea}</div>
											<div>homemade liqueur : {homemadeLiqueur}</div>
											<div>punch : {punch}</div>
											<div>beer : {beer}</div>
											<div>soft drink : {softDrink}</div>
										</div>
										<Button
											variant="contained"
											style={{ marginTop: "10px" }}
											onClick={getFirstItem}
										>
											최애 category 산출
										</Button>

										<Button
											variant="contained"
											color="success"
											style={{ marginLeft: "10px", marginTop: "10px" }}
											onClick={showRecommendations}
										>
											추천 주류/음료
										</Button>
									</div>
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={closeFavorCategory} autoFocus>
									확인
								</Button>
							</DialogActions>
						</Dialog>
					) : (
						""
					)}
				</div>
				<div>
					{showUserDialog ? ( // 유저정보변경 다이알로그
						<Dialog
							open={showUserDialog}
							onClose={closeUserDialog}
							aria-labelledby="alert-dialog-title"
							aria-describedby="alert-dialog-description"
						>
							<DialogTitle id="alert-dialog-title">{"주문내역"}</DialogTitle>
							<DialogContent>
								<DialogContentText id="alert-dialog-description">
									<Form onSubmit={(event) => handleSubmit(event)}>
										<Form.Group className="mb-3" controlId="formBasicEmail">
											<Form.Label>Email address</Form.Label>
											<Form.Control
												type="email"
												placeholder="Email"
												name="email"
												value={formData.email}
												onChange={handleUserChange}
											/>
											<Form.Text className="text-muted">
												아이디가 아닌 이메일을 입력해주세요.
											</Form.Text>
										</Form.Group>

										<Form.Group className="mb-3" controlId="formBasicPassword">
											<Form.Label>Password</Form.Label>
											<Form.Control
												type="password"
												placeholder="Password"
												name="password"
												value={formData.password}
												onChange={handleUserChange}
											/>
										</Form.Group>
										<Form.Group className="mb-3" controlId="formBasicText">
											<Form.Label>Nickname</Form.Label>
											<Form.Control
												type="text"
												placeholder="Nickname"
												name="nickname"
												value={formData.nickname}
												onChange={handleUserChange}
											/>
										</Form.Group>
										<Form.Group className="mb-3" controlId="formBasicCheckbox">
											<Form.Check type="checkbox" label="Check me out" />
										</Form.Group>
										<Button variant="contained" type="submit">
											수정
										</Button>
									</Form>
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button variant="contained" onClick={closeUserDialog} autoFocus>
									확인
								</Button>
							</DialogActions>
						</Dialog>
					) : (
						""
					)}
				</div>
				<div>
					{book ? ( // 북마크 다이알로그
						<Dialog
							open={book}
							onClose={handleBookClose}
							aria-labelledby="alert-dialog-title"
							aria-describedby="alert-dialog-description"
						>
							<DialogTitle id="alert-dialog-title">{"북마크"}</DialogTitle>
							<DialogContent>
								<DialogContentText id="alert-dialog-description">
									<div>
										{bookmarkList.map((item, i) => (
											<div key={i}>
												<div>음료 : {item.title}</div>
												<span>링크 :</span>
												<Link
													to={item.path}
													style={{ color: "red", borderBottom: "1px solid red" }}
												>
													{item.path}
												</Link>
											</div>
										))}
									</div>
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleBookClose} autoFocus>
									확인
								</Button>
							</DialogActions>
						</Dialog>
					) : (
						""
					)}
				</div>
			</Container>
		</div>
	);
}

export default UserPage;
