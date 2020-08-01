import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { NavigateBefore } from '@material-ui/icons';
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import { withRouter, RouteComponentProps } from 'react-router';

const styles = createStyles({
    root: {
        marginLeft: 0
    }
});

interface NavigateActionsProps
    extends RouteComponentProps,
        WithStyles<typeof styles> {}

function isHome(location: any) {
    return location.pathname === '/';
}

function NavigatorActions(props: NavigateActionsProps) {
    const { classes, history, location } = props;
    let backButton = null;
    if (!isHome(location)) {
        backButton = (
            <IconButton
                color="inherit"
                href=""
                onClick={() => history.goBack()}
            >
                <NavigateBefore />
            </IconButton>
        );
    }

    return (
        <Grid item className={classes.root}>
            {backButton}
        </Grid>
    );
}

export default withStyles(styles)(withRouter(NavigatorActions));
