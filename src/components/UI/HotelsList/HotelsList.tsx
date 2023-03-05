import React, {FC} from 'react';
import {List} from "../List/List";
import {useAppSelector} from "../../../hooks/redux/useAppSelector";
import {findHotelsSelector} from "../../../store/reducers/hotelsSlice";
import HotelsListItem from "./HotelsListItem/HotelsListItem";
import './HotelsList.scss';
import Loader from "../Loader/Loader";

const HotelsList: FC = () => {

    const {hotels, isLoading, error} = useAppSelector(findHotelsSelector)
    if (isLoading) {
        return <Loader/>
    }
    if (error) {
        return <h3>{error}</h3>
    }
    return (
        <List
            items={hotels}
            className='hotel-list'
            renderItem={(hotel) => <HotelsListItem key={hotel.hotelId} hotel={hotel}/>}
        />
    );
};

export default HotelsList;
