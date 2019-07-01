import React, { PropsWithChildren } from 'react';
import { Container, Grid } from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';

const styles = createStyles({
  root: {
    boxSizing: 'border-box',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    marginBottom: 20
  }
});

type LayoutContentProps = PropsWithChildren<{}> & WithStyles<typeof styles>;

export default withStyles(styles)(function LayoutContent(
  props: LayoutContentProps
) {
  return (
    <Grid item className={props.classes.root}>
      <Container>{props.children}</Container>
    </Grid>
  );
});
