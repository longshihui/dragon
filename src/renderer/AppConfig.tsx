import React, { createElement, PropsWithChildren } from 'react';
import { Edit } from '@material-ui/icons';
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';
import { SvgIcon } from '@material-ui/core';
// 页面
import CreatePR from './pages/PRTemplate';

const iconStyles = createStyles({
    root: {
        fontSize: '1em'
    }
});

function styledIcon(Icon: typeof SvgIcon) {
    return withStyles(iconStyles)(function(
        props: PropsWithChildren<WithStyles<typeof iconStyles>>
    ) {
        return <Icon className={props.classes.root} />;
    });
}

export default [
    {
        id: 'pr-template',
        icon: createElement(styledIcon(Edit)),
        title: '需求模板',
        description: '生成产品需求目录模板',
        path: '/pr-template',
        exact: true,
        component: CreatePR
    }
];
