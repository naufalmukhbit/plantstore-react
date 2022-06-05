import { useEffect, useState } from "react";
import {
	Button,
	Container,
	Badge,
	Nav,
	Navbar,
	NavDropdown,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import "./index.scss";
import { logo, defaultPP } from "assets/images";
import { Link } from "react-router-dom";

interface NavbarProps {
	transparent?: boolean;
	noAction?: boolean;
}

export default function AppNavbar({ transparent, noAction }: NavbarProps) {
	const [loggedIn, setLoggedIn] = useState(false);
	const [cartAmount, setCartAmount] = useState(0);
	const [shadowClass, setShadowClass] = useState("navbar");

	useEffect(() => {
		const changeShadow = () =>
			setShadowClass(window.scrollY >= 60 ? "navbar--shadow" : "navbar");
		window.addEventListener("scroll", changeShadow);
		return () => window.removeEventListener("scroll", changeShadow);
	}, []);

	const profileMenu = [
		{
			label: "Profile",
			faIcon: solid("user"),
		},
		{
			label: "Settings",
			faIcon: solid("cog"),
		},
		{
			label: "Log Out",
			faIcon: solid("right-from-bracket"),
		},
	];

	return (
		<Navbar
			fixed="top"
			bg={transparent ? undefined : "white"}
			className={shadowClass}
		>
			<Container fluid>
				<Navbar.Brand>
					<Link to="/">
						<img src={logo} alt="Plantstore Logo" height={30} />
					</Link>
				</Navbar.Brand>
				{!noAction && (
					<>
						<Navbar.Toggle />
						<Navbar.Collapse className="justify-content-end">
							{loggedIn ? (
								<Nav className="align-items-end">
									<Button
										variant="link"
										href="#wishlist"
										className="navbar--icons"
									>
										<FontAwesomeIcon icon={solid("star")} />
									</Button>
									<Button
										variant="link"
										href="#cart"
										className="navbar--icons"
									>
										<FontAwesomeIcon
											icon={solid("cart-shopping")}
										/>
										{cartAmount > 0 && (
											<Badge pill id="navbar--cart-badge">
												{cartAmount}
											</Badge>
										)}
									</Button>
									<NavDropdown
										title={
											<img
												src={defaultPP}
												className="navbar--avatar"
											/>
										}
									>
										{profileMenu.map((item) => (
											<NavDropdown.Item>
												<FontAwesomeIcon
													icon={item.faIcon}
												/>
												<span className="navbar--menu-label">
													{item.label}
												</span>
											</NavDropdown.Item>
										))}
									</NavDropdown>
								</Nav>
							) : (
								<Nav className="align-items-center">
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
								</Nav>
							)}
						</Navbar.Collapse>
					</>
				)}
			</Container>
			{transparent && noAction && (
				<div className="navbar--brand-bg" />
			)}
		</Navbar>
	);
}
