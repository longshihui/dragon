import React, { PropsWithChildren } from 'react';
import { Grid } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import AppBar from '@/renderer/ui/app-bar';

const styles = createStyles({
    root: {
        marginBottom: 20,
        flex: '0 0 auto'
    }
});

type LayoutHeaderProps = WithStyles<typeof styles> & PropsWithChildren<{}>;

export default withStyles(styles)(function LayoutHeader(
    props: LayoutHeaderProps
) {
    return (
        <Grid item className={props.classes.root}>
            <AppBar>{props.children}</AppBar>
        </Grid>
    );
});
