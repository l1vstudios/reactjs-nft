import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderComponent = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const imageHeight = '65vh';

    return (
        <Slider {...settings}>
            <div>
                <img
                    src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/247628119/original/a350a00f62970cc5a675e6248accd8a3764e358f/do-doodle-nft-arts-collection-with-traits-and-accessories.png"
                    alt="Slide 1"
                    style={{ width: '100%', height: imageHeight, objectFit: 'cover' }}
                />
            </div>
            <div>
                <img
                    src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/247628119/original/7ddfc834aac8b69192dc57d7206ba231e8a5d36d/do-doodle-nft-arts-collection-with-traits-and-accessories.png"
                    alt="Slide 2"
                    style={{ width: '100%', height: imageHeight, objectFit: 'cover' }}
                />
            </div>
            <div>
                <img
                    src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/247628119/original/c15f6f8ab01dec0855d17cf039c781677862d3bc/do-doodle-nft-arts-collection-with-traits-and-accessories.png"
                    alt="Slide 3"
                    style={{ width: '100%', height: imageHeight, objectFit: 'cover' }}
                />
            </div>
        </Slider>
    );
};

export default SliderComponent;
