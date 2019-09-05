import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

const styles = createStyles({
    container: {
        borderRadius: '4px',
        width: '100%',
        minHeight: 50,
        display: 'flex',
        background: '#ffffff',
        padding: 5,
        boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, .2)',
        cursor: 'pointer'
    },
    iconWrapper: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 32
    },
    infoWrapper: {
        flex: 2
    },
    title: {
        marginBottom: 5
    },
    description: {
        marginBottom: 10
    }
});

interface Props {
    icon: any;
    title: string;
    description: string;
    onClick?: Function;
}

class Card extends React.Component<Props & WithStyles<typeof styles>> {
    render() {
        return (
            <Grid item xs={4} onClick={() => this.props.onClick()}>
                <div className={this.props.classes.container}>
                    <div className={this.props.classes.iconWrapper}>
                        {this.props.icon}
                    </div>
                    <div className={this.props.classes.infoWrapper}>
                        <Typography
                            variant="h6"
                            component="p"
                            className={this.props.classes.title}
                        >
                            {this.props.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            component="p"
                            className={this.props.classes.description}
                        >
                            {this.props.description}
                        </Typography>
                    </div>
                </div>
            </Grid>
        );
    }
}

export default withStyles(styles)(Card);
