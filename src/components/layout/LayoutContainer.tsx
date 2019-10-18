import React, { PropsWithChildren } from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

type LayoutContainerProps = PropsWithChildren<{}> & WithStyles<typeof styles>;

const styles = createStyles({
    root: {
        height: '100vh'
    }
});

export default withStyles(styles)(function LayoutContainer(
    props: LayoutContainerProps
) {
    return (
        <Grid
            container
            direction="column"
            alignItems="stretch"
            wrap="nowrap"
            className={props.classes.root}
        >
            {props.children}
        </Grid>
    );
});
