import React, { CSSProperties, PropsWithChildren } from 'react';
import { AppBar, Toolbar, Typography, Grid } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';

const styles = createStyles({
  root: {
    marginBottom: 20
  }
});

interface ElectronCSSProperties extends CSSProperties {
  WebkitAppRegion: 'drag' | 'no-drag';
}

const appBarStyles: ElectronCSSProperties = {
  WebkitAppRegion: 'drag'
};

type LayoutHeaderProps = WithStyles<typeof styles> & PropsWithChildren<{}>;

export default withStyles(styles)(function LayoutHeader(
  props: LayoutHeaderProps
) {
  return (
    <Grid item className={props.classes.root}>
      <AppBar position="static" color="primary" style={appBarStyles}>
        <Toolbar>{props.children}</Toolbar>
      </AppBar>
    </Grid>
  );
});
