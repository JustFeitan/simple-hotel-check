import React, {FC} from 'react';
import FilledStarIcon from "../Icons/FilledStarIcon";
import EmptyStarIcon from "../Icons/EmptyStarIcon";

interface StarRatingProps {
    starsCount: number;
    rating: number;
}

const StarRating: FC<StarRatingProps> = ({starsCount, rating}) => {
    return (
        <div>
            {Array.from(Array(starsCount).keys()).map(starIndex => (
                starIndex + 1 <= rating
                    ? <FilledStarIcon/>
                    : <EmptyStarIcon/>
            ))}
        </div>
    );
};

export default StarRating;
