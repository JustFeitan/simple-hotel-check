import Slider from "react-slick";
import './HotelsImageSlider.scss';

interface HotelsImageSliderProps<T> {
    items: T[];
}

export function HotelsImageSlider<T>({items}: HotelsImageSliderProps<T>) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
    }
    return (
        <div className='slider'>
            <Slider {...settings}>
                {
                    items && items.map((slideItem, index) => (
                        <div>
                            <img key={index} className='slick-image' src={slideItem as string} alt=""/>
                        </div>

                    ))
                }
            </Slider>
        </div>
    );
};

//
// {
//
//     items && items.map((slideItem, index) => (
//         <img key={index} className='slick-image' src={slideItem as string} alt=""/>
//     ))
// }
