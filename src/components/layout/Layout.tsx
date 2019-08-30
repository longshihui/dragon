import React, { Fragment, PropsWithChildren } from 'react';
import { CssBaseline } from '@material-ui/core';
import LayoutContainer from './LayoutContainer';
import LayoutHeader from './LayoutHeader';
import LayoutContent from './LayoutContent';
import LayoutFooter from './LayoutFooter';

type LayoutProps = PropsWithChildren<{
    header?: React.ReactNode;
}>;

export default function Layout(props: LayoutProps) {
    return (
        <Fragment>
            <CssBaseline />
            <LayoutContainer>
                <LayoutHeader>{props.header}</LayoutHeader>
                <LayoutContent>{props.children}</LayoutContent>
                <LayoutFooter />
            </LayoutContainer>
        </Fragment>
    );
}
