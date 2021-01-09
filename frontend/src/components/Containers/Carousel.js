import React, { Component } from "react";
import Slider from "infinite-react-carousel";
import { Container, Text } from '../';

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
      { content: "Content 1 (pauses on hover)" },
      { content: "Content 2 (pauses on hover)" },
      { content: "Content 3 (pauses on hover)" },
      { content: "Content 4 (pauses on hover)" },
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
