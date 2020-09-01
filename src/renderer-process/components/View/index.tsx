import React, { PropsWithChildren, ReactNode } from 'react';
import './view.scss';

export default function View(
    props: PropsWithChildren<{
        title: string;
        footer?: ReactNode;
    }>
) {
    return (
        <div className="view">
            <div className="view-title">{props.title}</div>
            <div className="view-content">{props.children}</div>
            <div className="view-footer">{props.footer}</div>
        </div>
    );
}
