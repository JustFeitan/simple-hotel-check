import React, { ComponentProps, FC } from "react";

import "./FullScreenImageContainer.scss";

interface FullScreenImageContainerProps extends ComponentProps<"div"> {
    backgroundImg: string;
}

const FullScreenImageContainer: FC<FullScreenImageContainerProps> = ({
    backgroundImg,
    children,
    className,
    ...props
}) => {
    return (
        <div
            className={className ? `fullscreen-bg-img ${className}` : "fullscreen-bg-img"}
            style={{ backgroundImage: `url(${backgroundImg})` }}
            {...props}
        ></div>
    );
};

export default FullScreenImageContainer;
