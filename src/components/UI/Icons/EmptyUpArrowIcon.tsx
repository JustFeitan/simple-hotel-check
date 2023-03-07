import React, { FC } from "react";

import { SvgIconProps } from "./HeartIcon";

const EmptyUpArrowIcon: FC<SvgIconProps> = (props) => {
    return (
        <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M8.48529 4.24264L7.42463 5.3033L4.24265 2.12132L1.06067 5.3033L8.58307e-06 4.24264L4.24265 0L8.48529 4.24264Z"
                fill="#41522E"
            />
        </svg>
    );
};

export default EmptyUpArrowIcon;
