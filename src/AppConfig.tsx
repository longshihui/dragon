import React, { createElement, PropsWithChildren } from 'react';
import { Edit, Alarm } from '@material-ui/icons';
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';
import { SvgIcon } from '@material-ui/core';
// 页面
import CreatePR from './pages/create-pr';

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
    description:
      '工作需要，创建一个次需求，自动生成需求的目录结构以及模板，减少重复性劳动',
    path: '/create-pr',
    exact: true,
    component: CreatePR
  },
  {
    id: 'timer',
    icon: createElement(styledIcon(Alarm)),
    title: '提醒器',
    description: '设置一个时间和频率，提醒你的事项',
    path: '/timer',
    exact: true,
    component: null
  }
];
