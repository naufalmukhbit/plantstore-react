import { Carousel, Container } from "react-bootstrap";
import {carouselLeft, carouselRight} from "assets/images"

import "./index.scss";

interface BannerProps {
  imageData:  string[];
}

export default function Banner({imageData}: BannerProps) {
  return (
    <Container className="banner--container">
      <Carousel
        className="banner--box"
        prevIcon={
          <img src={carouselLeft} alt="Left arrow" />
        }
        nextIcon={
          <img src={carouselRight} alt="Right arrow" />
        }
      >
        {imageData.map((item, index) => (
          <Carousel.Item key={`home_banner_${index}`}>
            <img
              src={item}
              alt={`Banner ${index + 1}`}
              className="banner--image"
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  )
}