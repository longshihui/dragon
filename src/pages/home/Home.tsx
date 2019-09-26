import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import classes from './Home.scss';
import config from '@/AppConfig';
import Card from './Card';

export default class Home extends React.Component<RouteComponentProps> {
    constructor(props: RouteComponentProps) {
        super(props);
    }
    private goTo(pathname: string) {
        this.props.history.push(pathname);
    }
    render() {
        return (
            <div className={classes.content}>
                {config.map(c => {
                    return (
                        <Card
                            key={c.id}
                            icon={c.icon}
                            title={c.title}
                            description={c.description}
                            onClick={() => this.goTo(c.path)}
                        />
                    );
                })}
            </div>
        );
    }
}
