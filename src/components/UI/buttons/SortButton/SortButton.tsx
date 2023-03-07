import React, { FC } from "react";

import EmptyDownArrowIcon from "../../Icons/EmptyDownArrowIcon";
import EmptyUpArrowIcon from "../../Icons/EmptyUpArrowIcon";
import Button, { CustomButtonProps } from "../Button/Button";
import "./SortButton.scss";

interface SortButtonProps extends CustomButtonProps {
    sortActive: boolean;
    sortType: "ASC" | "DESC";
}

const SortButton: FC<SortButtonProps> = ({ children, sortType, sortActive, className, ...props }) => {
    return (
        <Button
            height={28}
            className={sortActive ? "sort-button sort-button--active" : "sort-button"}
            rightIcon={
                <span className="sort-button__arrows">
                    <EmptyUpArrowIcon
                        className={
                            sortActive && sortType === "ASC"
                                ? "sort-button__arrows__up--active"
                                : "sort-button__arrows__up"
                        }
                    />
                    <EmptyDownArrowIcon
                        className={
                            sortActive && sortType === "DESC"
                                ? "sort-button__arrows__down--active"
                                : "sort-button__arrows__down"
                        }
                    />
                </span>
            }
            {...props}
        >
            {children}
        </Button>
    );
};

export default SortButton;
