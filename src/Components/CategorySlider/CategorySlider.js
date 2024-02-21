import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

export default function CategorySlider() {
    const [categories, setCategories] = useState([]);
    
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
    };

    async function getCategory() {
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
            setCategories(response.data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <>
            <div className="container mb-5 pb-5">
                <h2 className="my-3">
                    Shop Popular Category
                </h2>
                <Slider {...settings} className="w-100">
                    {categories.map((category) => (
                        <div key={category._id}>
                            <img src={category.image} width={'100%'} height={'200px'} alt={category.name} />
                            <span className="text-center">{category.name}</span>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );
}
