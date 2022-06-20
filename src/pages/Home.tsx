import { useState, useEffect, ReactNode } from "react";
import { Button, Col, Container, Nav, Row, Card, Modal } from "react-bootstrap";
import Navbar from "components/navbar";
import Banner from "components/banner";
import HomeFilter from "components/home-filter";

import bannerData from "assets/images/banner-playsthetic";

import { noImageSq } from "assets/images";
import { Link } from "react-router-dom";

import "../styles/Home.styles.scss";

interface HomeProductsType {
	name: string;
	seller: string;
	price: number;
	link: string;
	imageURL: string;
}

const Home = () => {
	const [homeProducts, setHomeProducts] = useState<HomeProductsType[]>([]);
	const [loggedIn, setLoggedIn] = useState(false);
	const [sheetOpen, setSheetOpen] = useState(false);
	const [sheetTitle, setSheetTitle] = useState("Menu");
	const [sheetContent, setSheetContent] = useState<ReactNode>();
	const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

	useEffect(() => {
		const changeWidth = () =>
			setViewportWidth(window.innerWidth);
		window.addEventListener("resize", changeWidth);
		return () => window.removeEventListener("resize", changeWidth);
	}, []);

	/** Temporarily set data */	
	useEffect(() => {
		let temp: HomeProductsType[] = [];
		for (let i = 0; i < 12; i++) {
			temp.push({
				name: "Product Name",
				seller: "Plantstore Indonesia",
				price: 249999,
				link: "#product",
				imageURL: "",
			});
		}

		setHomeProducts(temp);
	}, []);

	const renderProduct = (data: HomeProductsType) => (
		<Card>
			<Card.Img variant="top" src={noImageSq} alt="Product" />
			<Card.Body>
				<Card.Title className="home--product-name">
					<a href="#">{data.name}</a>
				</Card.Title>
				<Card.Subtitle className="home--product-seller">
					by {data.seller}
				</Card.Subtitle>
				<Card.Text className="home--product-price">
					<strong>Rp {data.price}</strong>
				</Card.Text>
				<Link to="/product">
					<Button variant="secondary" className="home--product-view">
						VIEW PRODUCT
					</Button>
				</Link>
			</Card.Body>
		</Card>
	);

	const onOpenFilter = () => {
		setSheetContent(<HomeFilter noCard />);
		setSheetTitle("Filter Your Search");
		setSheetOpen(true);
	};

	const onOpenProfileMenu = () => {
		if (loggedIn) {
			setSheetContent(<div>Hello</div>);
		} else {
			setSheetContent(
				<div>
					<Link to="/login">
						<Button
							className="navbar--btn-login"
							variant="link"
						>
							Login
						</Button>
					</Link>
					<Link to="/register">
						<Button>Sign Up</Button>
					</Link>
				</div>
			)
		}
		setSheetTitle("Menu");
		setSheetOpen(true);
	}

	return (
		<div>
			<Navbar transparent />
			<Container className="home--content">
				<Banner imageData={bannerData} />
				<Row>
					<Col xs={12} lg={8}>
						<Nav
							variant="pills"
							defaultActiveKey="featured"
							onSelect={(e) => console.log(e)}
							className="home--categories"
						>
							<Nav.Item>
								<Nav.Link eventKey="featured">Featured</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="new">New</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="budget">Budget</Nav.Link>
							</Nav.Item>
							{viewportWidth < 992 && (
								<Button variant="link" className="home--filter-btn" onClick={onOpenFilter}>
									Filter
								</Button>
							)}
						</Nav>
						<Container className="home--product-container">
							<Row className="g-3">
								{homeProducts.map((item, index) => (
									<Col xs={6} md={4} key={index}>{renderProduct(item)}</Col>
								))}
							</Row>
						</Container>
					</Col>
					{viewportWidth > 991 && (
						<Col lg={4}>
							<HomeFilter />
						</Col>
					)}
				</Row>
			</Container>
			<Container fluid className="home--footer">
				<Row className="mx-5 py-3">
					<Col xs={4} className="w-50 text-end pr-3">
						<a href="#">About us</a>
					</Col>
					<Col xs={6} className="w-50">
						&copy; Plantstore 2019. All rights reserved.
					</Col>
				</Row>
			</Container>
			<Modal fullscreen show={sheetOpen} onHide={() => setSheetOpen(false)}>
				<Modal.Header closeButton>
					{sheetTitle}
				</Modal.Header>
				<Modal.Body>
					{sheetContent}
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default Home;
