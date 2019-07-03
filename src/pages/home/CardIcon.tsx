import React, { PropsWithChildren } from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const styles = createStyles({
  root: {
    textAlign: 'center'
  }
});

export default withStyles(styles)(function(
  props: PropsWithChildren<WithStyles<typeof styles>>
) {
  return (
    <Typography className={props.classes.root} component="div" variant="h1">
      {props.children}
    </Typography>
  );
});
