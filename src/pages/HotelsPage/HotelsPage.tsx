import React, { FC, useEffect } from "react";

import FindHotelsForm from "../../components/FindHotelsForm/FindHotelsForm";
import { HotelsImageSlider } from "../../components/UI/HotelsImageSlider/HotelsImageSlider";
import RightArrowIcon from "../../components/UI/Icons/RightArrowIcon";
import PaperWrapper from "../../components/UI/PaperWrapper/PaperWrapper";
import SortButton from "../../components/UI/buttons/SortButton/SortButton";
import FavoriteHotelsListItem from "../../components/UI/lists/HotelsList/FavoriteHotelListItem/FavoriteHotelListItem";
import HotelsListItem from "../../components/UI/lists/HotelsList/HotelListItem/HotelListItem";
import HotelsList from "../../components/UI/lists/HotelsList/HotelsList";

import { SliderImages } from "../../data/SliderImages";
import { formatDateWithFnsFormat } from "../../helpers/dateHelpers/formatDateWithFnsFormat";
import { useNounForNumber, useSortByField } from "../../hooks";
import { useActions, useAppSelector } from "../../hooks/redux";
import { IFavoriteHotelsRequest } from "../../models/hotels";
import { findHotelsStateSelector } from "../../store/reducers/hotelsSlice";
import {
    usersFavoriteHotelsActions,
    usersFavoriteHotelsStateSelector,
} from "../../store/reducers/usersAndFavoriteHotelsSlice";
import "./HotelsPage.scss";

const HotelsPage: FC = () => {
    const { usersFavoriteHotels, isLoading, error } = useAppSelector(usersFavoriteHotelsStateSelector);
    //Search hotels result
    const {
        hotels,
        isLoading: isResultHotelsLoading,
        error: resultHotelsError,
        requestedHotelsData,
    } = useAppSelector(findHotelsStateSelector);
    const { updateFavoriteHotelsMutation } = useActions(usersFavoriteHotelsActions);
    const favoriteCountNoun = useNounForNumber(usersFavoriteHotels.length, "отель", "отеля", "отелей");

    //Update favorite hotels on date request change
    useEffect(() => {
        if (!requestedHotelsData?.checkOutDate || !requestedHotelsData?.checkOutDate) return;
        const favoriteHotelsRequest: Omit<IFavoriteHotelsRequest, "hotelId"> = {
            checkOutDate: requestedHotelsData!.checkOutDate,
            checkInDate: requestedHotelsData!.checkInDate,
        };
        updateFavoriteHotelsMutation(favoriteHotelsRequest);
    }, [requestedHotelsData?.checkOutDate, requestedHotelsData?.checkOutDate]);

    //Sorting favorites hotels hook
    const {
        sortedItems: sortedFavoriteHotels,
        sortBy,
        sortType,
        sortDataBy,
    } = useSortByField(
        usersFavoriteHotels,
        {
            field: "stars",
            sortType: "ASC",
        },
        [requestedHotelsData?.checkOutDate, requestedHotelsData?.checkInDate]
    );

    const handleSortByRatingClick = () => {
        sortDataBy("stars");
    };

    const handleSortByPriceClick = () => {
        sortDataBy("priceAvg");
    };

    return (
        <div className="hotels-page">
            <div className="hotels-page__left-blocks">
                <PaperWrapper className="hotels-page__left-blocks__location">
                    <FindHotelsForm />
                </PaperWrapper>
                <PaperWrapper className="hotels-page__left-blocks__favorites">
                    <h3 className="hotels-page__left-blocks__favorites__title">Избранное</h3>
                    <div className="hotels-page__left-blocks__favorites__sort">
                        <SortButton
                            onClick={handleSortByRatingClick}
                            sortActive={sortBy === "stars"}
                            sortType={sortType}
                            width={89}
                        >
                            Рейтинг
                        </SortButton>

                        <SortButton
                            onClick={handleSortByPriceClick}
                            sortActive={sortBy === "priceAvg"}
                            sortType={sortType}
                            width={71}
                        >
                            Цена
                        </SortButton>
                    </div>
                    {!!sortedFavoriteHotels.length && (
                        <HotelsList
                            hotels={sortedFavoriteHotels}
                            error={error}
                            isLoading={isLoading}
                            renderItem={(hotel) => <FavoriteHotelsListItem key={hotel.hotelId} hotel={hotel} />}
                        />
                    )}
                </PaperWrapper>
            </div>

            <PaperWrapper className="hotels-page__results">
                {requestedHotelsData && (
                    <div className="hotels-page__results__header">
                        <h1 className="hotels-page__results__header__location">
                            Отели <RightArrowIcon /> {requestedHotelsData!.location}
                        </h1>
                        <h2 className="hotels-page__results__header__check-in-date">
                            {formatDateWithFnsFormat(requestedHotelsData!.checkInDate, "dd MMMM yyyy")}
                        </h2>
                    </div>
                )}
                <HotelsImageSlider items={SliderImages} />
                <span className="hotels-page__results__favorites-count">
                    Добавлено в Избранное:
                    <span>{sortedFavoriteHotels.length}</span> {favoriteCountNoun}
                </span>
                {!hotels && !isResultHotelsLoading ? (
                    <h3>Не было найдено таких отелей, прпробуйте выбрать другие параметры поиска</h3>
                ) : (
                    <HotelsList
                        isLoading={isResultHotelsLoading}
                        hotels={hotels}
                        error={resultHotelsError}
                        renderItem={(hotel) => <HotelsListItem key={hotel.hotelId} hotel={hotel} />}
                    />
                )}
            </PaperWrapper>
        </div>
    );
};

export default HotelsPage;
