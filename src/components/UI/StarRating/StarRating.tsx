import React, { FC } from "react";

import EmptyStarIcon from "../Icons/EmptyStarIcon";
import FilledStarIcon from "../Icons/FilledStarIcon";

interface StarRatingProps {
    starsCount: number;
    rating: number;
}

const StarRating: FC<StarRatingProps> = ({ starsCount, rating }) => {
    return (
        <>
            {Array.from(Array(starsCount).keys()).map((starIndex) =>
                starIndex + 1 <= rating ? <FilledStarIcon key={starIndex} /> : <EmptyStarIcon key={starIndex} />
            )}
        </>
    );
};

export default StarRating;
