import React, { Component } from "react";
import Slider from "infinite-react-carousel";
import { Container, Text } from '../';
import truckHome from "./truckHome.png";


export default class Carousel extends Component {
  render() {
    const settings = {
      arrows: false,
      arrowsBlock: false,
      autoplay: true,
      autoplaySpeed: 4000,
      dots: true,
      duration: 300
    };

    const slideContent = [
      { content: <img src="https://image.freepik.com/free-vector/medicine-health-help-support-donation-concept_140689-945.jpg"/>},
      { content: <img src="https://media.istockphoto.com/videos/hands-forming-a-heart-luma-matte-loopable-f111f338-valentines-day-video-id465502031?s=640x640"/> },
      { content: <img src="https://www.bridgestogether.org/wp-content/uploads/2018/04/cropped-bridges-together-siteicon.png"/> },
      { content: <img src={truckHome}/> },
    ];

    const slides = slideContent.map((slide) => {
      return (
        <div key={slide.content}>
          <Text color="text" align="center">{slide.content}</Text>
        </div>
      );
    });

    return <Slider {...settings}>{slides}</Slider>;
  }
}
