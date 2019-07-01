import React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

const COPYRIGHT_YEARS = new Date().getFullYear();
const styles = createStyles({
  root: {
    marginBottom: 20,
    textAlign: 'center',
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto'
  }
});

type LayoutFooterProps = WithStyles<typeof styles>;

export default withStyles(styles)(function LayoutFooter(
  props: LayoutFooterProps
) {
  return (
    <Grid item className={props.classes.root}>
      Dragon ©{COPYRIGHT_YEARS} Created by{' '}
      <a
        href="https://github.com/longshihui"
        target="_blank"
        rel="noopener noreferrer"
      >
        Long ShiHui
      </a>
    </Grid>
  );
});
