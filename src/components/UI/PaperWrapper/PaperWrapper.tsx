import React, { ComponentProps, FC } from "react";

import "./PapperWrapper.scss";

interface LoginFormWrapperProps extends ComponentProps<"div"> {
    width?: number;
}

const PapperWrapper: FC<LoginFormWrapperProps> = ({ children, className, width, ...props }) => {
    const optionalStyles = {
        // width: width ?? 409 + 'px',
    };
    return (
        <div className={className ? `form-wrapper ${className}` : "form-wrapper"} {...props} style={optionalStyles}>
            {children}
        </div>
    );
};

export default PapperWrapper;