import React, { AriaAttributes, ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

import "./Button.scss";

export interface CustomButtonProps
    extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
        AriaAttributes {
    fullWidth?: boolean;
    width?: number;
    height?: number;
    fontSize?: string;
    isLoading?: boolean;
    rightIcon?: JSX.Element;
}

const MyPrimaryButton: FC<CustomButtonProps> = ({
    fullWidth,
    width = 145,
    fontSize,
    height = 35,
    children,
    isLoading,
    className,
    rightIcon,
    ...props
}) => {
    const optionalStyles = {
        width: fullWidth ? "100%" : width + "px",
        height: height + "px",
        fontSize: fontSize,
    };

    return (
        <button
            className={className ? `fulfilledBtn ${className}` : "fulfilledBtn"}
            type="submit"
            {...props}
            style={optionalStyles}
            disabled={isLoading}
        >
            {isLoading ? children + "..." : children}
            {rightIcon && <span className="btn-right-icon">{rightIcon}</span>}
        </button>
    );
};

export default MyPrimaryButton;
