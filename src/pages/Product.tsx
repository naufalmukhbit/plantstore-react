import { Container, Row, Col, Button } from "react-bootstrap";
import { noImageSq } from "assets/images";
import Navbar from "components/navbar";
import "../styles/Product.styles.scss";

const ProductPage = () => {
	return (
		<div>
      <Navbar />
			<div className="bg-container">
				<Container className="window-box">
					<Row className="row justify-content-center">
						<Col xs={4}>
							<img className="product--image" src={noImageSq} />
						</Col>
						<Col xs={8} className="desc">
							<h2>Product Name</h2>
							<h5 id="price">Rp 249999</h5>
							<p>Product Description</p>
							<p className="size">
								Available sizes: XS | S | M | L | XL | XXL
							</p>
							<div className="d-grid g-2">
								<Button>Add to Cart</Button>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	);
};

export default ProductPage;
