import React, { FC } from "react";

import { SvgIconProps } from "./HeartIcon";

const EmptyDownArrowIcon: FC<SvgIconProps> = (props) => {
    return (
        <svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M8.5 1.83245L7.43934 0.77179L4.25736 3.95377L1.07538 0.77179L0.0147181 1.83245L4.25736 6.07509L8.5 1.83245Z"
                fill="#41522E"
            />
        </svg>
    );
};

export default EmptyDownArrowIcon;
