import React, { useRef } from 'react'
import {useNavigate, NavLink, Outlet} from 'react-router-dom'
import {Button, Container, Form, Nav, Navbar} from 'react-bootstrap';
// import './AppLayout.style.css'
// import { useMovieStore } from '../store/movieStore';


const AppLayout = () => {
	// const {title} = useDrinkStore()
	const formRef = useRef()
	const navigate = useNavigate()
	const searchByKeyword=(e)=>{
		e.preventDefault()
		// keyword로 url 바꿔주기
		const formData = new FormData(formRef.current)
		const keyword = formData.get('keyword')
		console.log('gotten keyword : ', keyword)
		// navigate(`/movies?q=${keyword}`)
		// 폼 초기화
		formRef.current.reset();
	}

  return (
	<div style={{}}>
		<Navbar  expand="lg" >
			<Container fluid>
				<Navbar.Brand href="/">
					
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll"/>
				<Navbar.Collapse  id="navbarScroll" >
					<Nav
					className="me-auto my-2 my-lg-0"
					style={{ maxHeight: '100px' }}
					navbarScroll
					>
						<Nav.Link as={NavLink} to='/' 
							className="home" style={{marginRight:'10px'}}>
								Home</Nav.Link> 

						<Nav.Link as={NavLink} to='/detail'className="movies" style={{marginRight:'10px'}}>Detail</Nav.Link>
						
						<Nav.Link as={NavLink} to='/mypage' className="mypage" >MyPage</Nav.Link>
					</Nav>
					<Form ref={formRef} className="d-flex" 
						onSubmit={searchByKeyword}>
						<Form.Control
							type="search"
							placeholder="Search"
							className="me-2"
							aria-label="Search"
							name="keyword"
						/>
						<Button variant="danger" type="submit">Search</Button>
					</Form>
				</Navbar.Collapse>
			</Container>
		</Navbar>
		<Outlet/>
	</div>
  )
}

export default AppLayout