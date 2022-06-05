import Navbar from "components/navbar";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../styles/Login.styles.scss";

const Login = () => {
	return (
		<div>
			<Navbar noAction transparent />
			<div className="bg-container">
				<Container fluid>
					<Row>
						<Col className="window-box" sm={10} md={4}>
							<h3 className="login--title">
								Login to Plantstore
							</h3>
							<Form>
								<Form.Group className="login--form-group">
									<Form.Control
										type="text"
										placeholder="Enter username"
										className="login--input"
										// id="username-user"
										// name="username"
									/>
								</Form.Group>
								<Form.Group className="login--form-group">
									<Form.Control
										type="password"
										placeholder="Password"
										className="login--input"
										// id="password-user"
										// name="password"
									/>
								</Form.Group>
								<div className="d-grid g-2">
									<Button type="submit">Log In</Button>
								</div>
							</Form>
							<footer className="mt-3 text-center">
								Don't have an account?{" "}
								<Link
									to="/register"
									className="login--register-link"
								>
									Click here to register
								</Link>
							</footer>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	);
};

export default Login;
