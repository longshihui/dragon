import { createElement } from 'react';
import { styledIcon } from './CardIcon';
import { Edit, Alarm } from '@material-ui/icons';

export default [
  {
    id: 'tool',
    icon: createElement(styledIcon(Edit)),
    title: '开发工具',
    description: '工作相关的便捷工具，减少重复性劳动',
    pathname: '/develop-tools'
  },
  {
    id: 'timer',
    icon: createElement(styledIcon(Alarm)),
    title: '提醒器',
    description: '设置一个时间和频率，提醒你的事项',
    'pathname:': '/timer'
  }
];
