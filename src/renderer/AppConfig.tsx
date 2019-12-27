import React, { createElement, PropsWithChildren } from 'react';
import { Edit } from '@material-ui/icons';
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';
import { SvgIcon } from '@material-ui/core';
// 页面
import CreatePR from './create-pr';

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
        id: 'create-pr',
        icon: createElement(styledIcon(Edit)),
        title: '创建需求',
        description: '生成一次需求所需的目录模板',
        path: '/create-pr',
        exact: true,
        component: CreatePR
    }
];
