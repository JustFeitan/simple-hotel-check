import React from "react";

import { IHotel } from "../../../../models/hotels/IHotel";
import Loader from "../../Loader/Loader";
import { List } from "../List/List";
import "./HotelsList.scss";

interface HotelsListProps {
    hotels: IHotel[];
    isLoading?: boolean;
    error: string;
    renderItem: (hotel: IHotel) => JSX.Element;
}

const HotelsList = React.forwardRef<HTMLDivElement, HotelsListProps>(
    ({ hotels, isLoading, error, renderItem }, ref) => {
        if (isLoading) {
            return <Loader />;
        }
        if (error) {
            return <h3>{error}</h3>;
        }
        return <List ref={ref} items={hotels} className="hotel-list" renderItem={renderItem} />;
    }
);

export default HotelsList;
