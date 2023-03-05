import React, {AriaAttributes, DetailedHTMLProps, HTMLAttributes} from 'react';
import './List.scss';

interface ListProps<T> extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, AriaAttributes{
    items: T[];
    renderItem: (item: T) => JSX.Element;
}

export function List<T>({items, renderItem, className, ...props}: ListProps<T>){
    return (
        <div className={className? `list ${className}` : 'list'} {...props}>
            {items.map(renderItem)}
        </div>
    );
};
