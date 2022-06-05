import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "components/navbar";

import "../styles/Login.styles.scss";

const Register = () => {
	const [termsOpen, setTermsOpen] = useState(false);
	const [termsAgreed, setTermsAgreed] = useState(false);

	const toggleTerms = () => setTermsAgreed(!termsAgreed);

	return (
		<div>
			<Navbar noAction transparent />
			<div className="bg-container">
				<Container fluid>
					<Row>
						<Col className="window-box" sm={10} md={4}>
							<h3 className="login--title">
								Register to Plantstore
							</h3>
							<Form>
								<Form.Group className="login--form-group">
									<Form.Control
										type="text"
										placeholder="Name"
										className="login--input"
									/>
								</Form.Group>
								<Form.Group className="login--form-group">
									<Form.Control
										type="text"
										placeholder="Username"
										className="login--input"
									/>
								</Form.Group>
								<Form.Group className="login--form-group">
									<Form.Control
										type="email"
										placeholder="E-mail"
										className="login--input"
									/>
								</Form.Group>
								<Form.Group className="login--form-group">
									<Form.Control
										type="password"
										placeholder="Password"
										className="login--input"
									/>
								</Form.Group>
								<Form.Group className="login--form-group">
									<Form.Control
										type="password"
										placeholder="Confirm password"
										className="login--input"
									/>
								</Form.Group>
								<Form.Check
									type="checkbox"
									onChange={toggleTerms}
									checked={termsAgreed}
									label={
										<p>
											I agree to the{" "}
											<a
												href="#"
												className="login--register-link"
												onClick={() => setTermsOpen(true)}
											>
												terms and conditions
											</a>
										</p>
									}
								/>
								<div className="d-grid g-2">
									<Button type="submit" disabled={!termsAgreed}>Register</Button>
								</div>
							</Form>
							<footer className="mt-3 text-center">
								Already have an account?{" "}
								<Link
									to="/login"
									className="login--register-link"
								>
									Click here to login
								</Link>
							</footer>
						</Col>
					</Row>
				</Container>
			</div>
			<Modal show={termsOpen} onHide={() => setTermsOpen(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Terms and Conditions </Modal.Title>
				</Modal.Header>
				<Modal.Body className="px-4">
					<p>
						This website is a college project. We don't have any
						real terms and condition yet, because obviously we
						created this website for task purpose only. But we don't
						limit our expectations to just a college task, and we
						are open to possibilities of this site going big. Hope
						doesn't kill you, right?
					</p>
					<br />
					<p>
						However, please don't use passwords that you usually use
						on your other accounts, because we can see your password
						that you registered in this site so easily.
					</p>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default Register;
