import React from 'react';
import { AppBar as MaterialAppBar, Grid, Toolbar } from '@material-ui/core';
import NavigateActions from './NavigateActions';

export default class AppBar extends React.Component {
    render() {
        return (
            <MaterialAppBar position="static" color="primary">
                <Toolbar>
                    <Grid container justify="space-between">
                        <NavigateActions />
                        <Grid item>{this.props.children}</Grid>
                    </Grid>
                </Toolbar>
            </MaterialAppBar>
        );
    }
}
