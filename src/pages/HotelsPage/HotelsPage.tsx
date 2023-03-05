import React, {FC, useState} from 'react';
import './HotelsPage.scss';
import FormWrapper from "../../components/UI/FormWrapper/FormWrapper";
import FindHotelsForm from "../../components/FindHotelsForm/FindHotelsForm";
import {findHotelsActions} from "../../store/reducers/hotelsSlice";
import HotelsList from "../../components/UI/HotelsList/HotelsList";
import {useActions} from "../../hooks/redux/useActions";
import {FindHotelsRequest} from "../../models/hotels/FindHotelsRequest";
import RightArrowIcon from "../../components/UI/Icons/RightArrowIcon";
import {HotelsImageSlider} from "../../components/UI/HotelsImageSlider/HotelsImageSlider";
import HotelSlideImg1 from './../../assets/hotel-slide-img1.jpg';
import HotelSlideImg2 from './../../assets/hotel-slide-img2.jpg';
import HotelSlideImg3 from './../../assets/hotel-slide-img3.jpg';
import HotelSlideImg4 from './../../assets/hotel-slide-img4.jpg';
import {formatDateWithFnsFormat} from "../../helpers/dateHelpers/formatDateWithFnsFormat";


const hotelsImgArray = [
    HotelSlideImg3,
    HotelSlideImg2,
    HotelSlideImg1,
    HotelSlideImg4,
]
const HotelsPage: FC = () => {
    const [hotelsRequest, setHotelsRequest] = useState<FindHotelsRequest | null>(null);
    const {getHotelsByLocationAndDates} = useActions(findHotelsActions);
    const handleSubmitFindHotelForm = (findHotelRequest: FindHotelsRequest) => {
        setHotelsRequest(findHotelRequest);
        getHotelsByLocationAndDates(findHotelRequest)
    }
    return (
        <div className='hotels-page'>
            <div className="hotels-page__left-blocks">
                <FormWrapper className="hotels-page__left-blocks__location">
                    <FindHotelsForm onSubmitForm={handleSubmitFindHotelForm}/>
                </FormWrapper>
                <FormWrapper className="hotels-page__left-blocks__favorites">
                </FormWrapper>
            </div>

            <FormWrapper className="hotels-page__results">
                {
                    hotelsRequest && (
                        <div className="hotels-page__results__header">
                            <h1 className="hotels-page__results__header__location">
                                Отели <RightArrowIcon/> {hotelsRequest!.location}
                            </h1>
                            <h2 className="hotels-page__results__header__check-in-date">{
                                formatDateWithFnsFormat(hotelsRequest!.checkInDate, 'dd MMMM yyyy')}
                            </h2>
                        </div>
                    )
                }
                <HotelsImageSlider items={hotelsImgArray}/>
                <span className='hotels-page__results__favorites-count'>
                    Добавлено в избранное: 3 отеля
                </span>
                <HotelsList/>
            </FormWrapper>
        </div>
    );
};

export default HotelsPage;
