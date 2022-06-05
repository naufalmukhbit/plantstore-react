import { useState, useEffect } from "react";
import { Button, Col, Container, Nav, Row, Card } from "react-bootstrap";
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

	return (
		<div>
			<Navbar transparent />
			<Container className="home--content">
				<Banner imageData={bannerData} />
				<Row>
					<Col lg={8}>
						<Nav
							variant="pills"
							defaultActiveKey="featured"
							onSelect={(e) => console.log(e)}
							className="home--categories"
						>
							<Nav.Item>
								<Nav.Link eventKey="featured">
									FEATURED
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="new">WHAT'S NEW</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="budget">
									LOW BUDGET
								</Nav.Link>
							</Nav.Item>
						</Nav>
						<Container>
							<Row className="g-3">
								{homeProducts.map((item) => (
									<Col md={4}>{renderProduct(item)}</Col>
								))}
							</Row>
						</Container>
					</Col>
					<Col lg={4}>
						<HomeFilter />
					</Col>
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
		</div>
	);
};

export default Home;
