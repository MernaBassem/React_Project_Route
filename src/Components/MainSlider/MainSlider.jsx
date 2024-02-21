import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-3.jpeg";
import img4 from "../../assets/images/grocery-banner-2.jpeg";
import img5 from "../../assets/images/grocery-banner.png";

export default function MainSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="container my-5  overflow-hidden ">
        <div className="row gap-0">
          <div className="col-md-8">
            <Slider {...settings} className="w-100">
              <img src={img1} alt="image1" className="w-100" height={"400px"} />
              <img src={img2} alt="image2" className="w-100" height={"400px"} />
              <img src={img3} alt="image3" className="w-100" height={"400px"} />
            </Slider>
          </div>
          <div className="col-md-4">
            <img src={img4} alt="image4" className="w-100 d-block " height={"200px"} />
            <img src={img5} alt="image5" className="w-100" height={"200px"} />
          </div>
        </div>
      </div>
    </>
  );
}
