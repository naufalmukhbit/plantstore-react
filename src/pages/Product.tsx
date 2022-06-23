import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import Navbar from "components/navbar";
import { formatPrice } from "services/common";
import { noImageSq } from "assets/images";
import "../styles/Product.styles.scss";

interface ProductDataType {
	id: string;
	name: string;
	description: string;
	price: number;
	imageURL: string;
	rating: {
		count: number;
		rate: number;
	}
}

const ProductPage = () => {
	const { productId } = useParams();
	const [productData, setProductData] = useState<ProductDataType>();

	useEffect(() => {
		fetch(`https://fakestoreapi.com/products/${productId}`)
			.then(res => res.json())
			.then(json => {
				console.log(json)
				document.title = json.title + " - Plantstore";
				setProductData({
					id: json.id,
					name: json.title,
					description: json.description,
					price: json.price * 14000,
					imageURL: json.image,
					rating: json.rating,
				});
			})
	}, [productId]);

	const renderRating = (rate: number) => {
		let fullStar = Math.floor(rate);
		let emptyStar = 5 - Math.ceil(rate);

		let halfStar = false;
		let remainder = parseFloat((rate - fullStar).toFixed(1));

		if (remainder > 0.8) {
			fullStar += 1
		} else if (remainder < 0.3) {
			emptyStar += 1;
		} else {
			halfStar = true;
		}

		return (
			<div className="product--stars">
				{Array.from(Array(fullStar), x => (
					<FontAwesomeIcon icon={solid("star")} />
				))}
				{halfStar && (
					<FontAwesomeIcon icon={solid("star-half-stroke")} />
				)}
				{Array.from(Array(emptyStar), x => (
					<FontAwesomeIcon icon={regular("star")} />
				))}
			</div>
		)
	}

	return (
		<div>
      <Navbar />
			<div className="bg-container">
				<Container className="window-box">
					{productData && (
						<Row className="row justify-content-center">
							<Col xs={12} lg={4}>
								<div className="product--image-container">
									<img
										className="product--image"
										src={productData.imageURL ?? noImageSq}
									/>
								</div>
							</Col>
							<Col xs={12} lg={8} className="desc">
								<h2>{productData.name}</h2>
								<div className="product--rating">
									{renderRating(productData.rating.rate)}
									<span>{(productData.rating.rate).toFixed(1)}</span>
									<span>{`(${productData.rating.count} Ratings)`}</span>
								</div>
								<h5 id="price">Rp {formatPrice(productData.price)}</h5>
								<strong>Description</strong>
								<p>
									{productData.description}
								</p>
								<div className="d-grid g-2">
									<Button>Add to Cart</Button>
								</div>
							</Col>
						</Row>
					)}
				</Container>
			</div>
		</div>
	);
};

export default ProductPage;
