import React from 'react';
import moment from 'moment';
import palettes from './palettes';

interface State {
    paletteTimer: number;
    palette: object | null;
}

function str2Date(str: string) {
    const date = new Date();
    const results = str.split(':');
    date.setHours(Number(results[0]));
    date.setMinutes(Number(results[1]));
    return date;
}

function searchPalette(now: number, sortedPalettes: typeof palettes) {
    return sortedPalettes.find(palette => {
        return moment(now).isAfter(str2Date(palette.time));
    }).palette;
}

// 色板排序
palettes.sort((p1, p2) => {
    const time1 = str2Date(p1.time);
    const time2 = str2Date(p2.time);

    return moment(time1).isBefore(time2) ? -1 : 1;
});

export default class DragonThemeProvider extends React.Component<{}, State> {
    constructor(props) {
        super(props);
        this.state = {
            paletteTimer: null,
            palette: null
        };
    }
    componentDidMount() {
        this.initPalette();
    }
    initPalette() {
        const now = Date.now();
        this.setState({
            palette: searchPalette(now, palettes)
        });
    }
    render() {
        return this.props.children;
    }
}
