import React, { AriaAttributes, DetailedHTMLProps, HTMLAttributes } from "react";

import "./List.scss";

interface ListProps<T> extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, AriaAttributes {
    items: T[];
    renderItem: (item: T) => JSX.Element;
}

function ListInner<T>(
    { items, renderItem, className, ...props }: ListProps<T>,
    ref?: React.ForwardedRef<HTMLDivElement>
) {
    return (
        <div className={className ? `list ${className}` : "list"} {...props}>
            {items.map(renderItem)}
        </div>
    );
}

export const List = React.forwardRef(ListInner) as <T>(
    props: ListProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof ListInner>;
