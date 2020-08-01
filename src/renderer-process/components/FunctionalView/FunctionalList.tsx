import React, { PropsWithChildren } from 'react';

export default function FunctionalList(props: PropsWithChildren<{}>) {
    return <div className="functional-list">{props.children}</div>;
}
