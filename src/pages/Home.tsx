import { useState, useEffect, ReactNode } from "react";
import { Button, Col, Container, Nav, Row, Card, Modal } from "react-bootstrap";
import Navbar from "components/navbar";
import Banner from "components/banner";
import HomeFilter from "components/home-filter";

import bannerData from "assets/images/banner-playsthetic";

import { noImageSq } from "assets/images";
import { Link } from "react-router-dom";

import "../styles/Home.styles.scss";
import { formatPrice } from "services/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

interface HomeProductsType {
	id: string;
	name: string;
	seller: string;
	price: number;
	link: string;
	imageURL: string;
}

// const category = [
// 	{
// 		key: "featured",
// 		name: "Featured",
// 	},
// 	{
// 		key: "new",
// 		name: "New",
// 	},
// 	{
// 		key: "budget",
// 		name: "Budget",
// 	},
// ];

const tempCategory = [
	{
		key: "all",
		name: "All",
	}, 
	{
		key: "electronics",
		name: "Electronics",
	}, 
	{
		key: "jewelery",
		name: "Jewelery",
	}, 
	{
		key: "men's clothing",
		name: "Men's Clothing",
	}, 
	{
		key: "women's clothing",
		name: "Women's Clothing",
	}, 
]

const Home = () => {
	document.title = "Plantstore - Your Agriculture Companion";

	const [homeProducts, setHomeProducts] = useState<HomeProductsType[]>([]);
	const [loading, setLoading] = useState(true);
	const [loggedIn, setLoggedIn] = useState(false);
	const [category, setCategory] = useState("all");
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

	/** Use data from Fake Store API */
	useEffect(() => {
		let url = category === "all"
			? "https://fakestoreapi.com/products"
			: `https://fakestoreapi.com/products/category/${category}`
		fetch(url)
			.then(res => res.json())
			.then(json => {
				setHomeProducts(json.map((item: any) => ({
					id: item.id,
					name: item.title,
					seller: "Plantstore Indonesia",
					price: item.price * 14000,
					link: "#product",
					imageURL: item.image,
				})));
				setLoading(false);
			});
	}, [category]);

	const renderProduct = (data: HomeProductsType) => (
		<Card>
			<div className="home--product-image-container">
				<Card.Img
					variant="top"
					src={data.imageURL ?? noImageSq}
					alt="Product"
					className="home--product-image"
				/>
			</div>
			<Card.Body>
				<Card.Title className="home--product-name">
					<Link to={`/product/${data.id}`}>
						{data.name}
					</Link>
				</Card.Title>
				<Card.Subtitle className="home--product-seller">
					by {data.seller}
				</Card.Subtitle>
				<Card.Text className="home--product-price">
					<strong>Rp {formatPrice(data.price)}</strong>
				</Card.Text>
				<Link to={`/product/${data.id}`}>
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
	};

	const onChangeCategory = (cat: string | null) => {
		setLoading(true);
		setCategory(cat === null ? "all" : cat);
	};

	return (
		<div>
			<Navbar transparent />
			<Container className="home--content">
				<Banner imageData={bannerData} />
				<Row>
					<Col xs={12} lg={8}>
						<Nav
							variant="pills"
							defaultActiveKey="all"
							onSelect={(e) => onChangeCategory(e)}
							className="home--categories"
							navbarScroll
						>
							{tempCategory.map((item) => (
								<Nav.Item>
									<Nav.Link eventKey={item.key} className="home--category-btn">
										{item.name}
									</Nav.Link>
								</Nav.Item>
							))}
						</Nav>
						{viewportWidth < 992 && (
							<Button variant="link" className="home--filter-btn" onClick={onOpenFilter}>
								<FontAwesomeIcon icon={solid("sliders")} />
								{" "}
								Filters...
							</Button>
						)}
						{loading ? (
							<div>Loading...</div>
						) : (
							<Container className="home--product-container">
								<Row className="g-3">
									{homeProducts.map((item, index) => (
										<Col xs={6} md={4} key={index}>{renderProduct(item)}</Col>
									))}
								</Row>
							</Container>
						)}
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
						&copy; Plantstore 2022. All rights reserved.
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
