import { useState } from "react";
import { Card, Button } from "react-bootstrap";

import "./index.scss";

export default function HomeFilter() {
	const [minValue, setMinValue] = useState(0);
	const [maxValue, setMaxValue] = useState(9999999);

	const onMinSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMinValue(parseInt(e.target.value));
	};

	const onMaxSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMaxValue(parseInt(e.target.value));
	};

	return (
		<Card className="home-filter--container">
			<strong className="mb-4">FILTER YOUR SEARCH</strong>
			<div className="slidecontainer">
				<label htmlFor="min-price">Minimum Price : </label>
				<span id="min-price-info">{minValue}</span>
				<br />
				<input
					type="range"
					min={0}
					max={9999999}
					step={50000}
					value={minValue}
					className="slider w-100"
					onChange={onMinSliderChange}
				/>
			</div>
			<div className="slidecontainer">
				<label htmlFor="min-price">Maximum Price : </label>
				<span id="max-price-info">{maxValue}</span>
				<br />
				<input
					type="range"
					min={0}
					max={9999999}
					step={50000}
					value={maxValue}
					className="slider w-100"
					onChange={onMaxSliderChange}
				/>
			</div>
			<div className="home-filter--buttons">
				<Button>Submit</Button>
				<Button variant="secondary">Reset</Button>
			</div>
		</Card>
	);
}
