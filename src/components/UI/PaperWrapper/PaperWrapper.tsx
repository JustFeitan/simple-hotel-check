import React, { ComponentProps, FC } from "react";

import "./PaperWrapper.scss";

interface LoginFormWrapperProps extends ComponentProps<"div"> {
    width?: number;
}

const PaperWrapper: FC<LoginFormWrapperProps> = ({ children, className, width, ...props }) => {
    const optionalStyles = {
        // width: width ?? 409 + 'px',
    };
    return (
        <div className={className ? `paper-wrapper ${className}` : "paper-wrapper"} {...props} style={optionalStyles}>
            {children}
        </div>
    );
};

export default PaperWrapper;
