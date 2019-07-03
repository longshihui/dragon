import React, { PropsWithChildren } from 'react';
import { Grid } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import AppBar from '@/components/app-bar';

const styles = createStyles({
  root: {
    marginBottom: 20,
    WebkitAppRegion: 'drag'
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
