import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import classes from './Home.scss';
import Card from './Card';

export default class Home extends React.Component<RouteComponentProps> {
    constructor(props: RouteComponentProps) {
        super(props);
    }
    private goTo(pathname: string) {
        this.props.history.push(pathname);
    }
    render() {
        return <div className={classes.content}></div>;
    }
}
