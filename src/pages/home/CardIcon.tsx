import React, { PropsWithChildren } from 'react';
import { SvgIcon } from '@material-ui/core';
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const styles = createStyles({
  root: {
    textAlign: 'center'
  }
});

const iconStyles = createStyles({
  root: {
    fontSize: '1em'
  }
});

function styledIcon(Icon: typeof SvgIcon) {
  return withStyles(iconStyles)(function(
    props: PropsWithChildren<WithStyles<typeof iconStyles>>
  ) {
    return <Icon className={props.classes.root} />;
  });
}

export { styledIcon };

export default withStyles(styles)(function(
  props: PropsWithChildren<WithStyles<typeof styles>>
) {
  console.log(props.children);
  return (
    <Typography className={props.classes.root} component="div" variant="h1">
      {props.children}
    </Typography>
  );
});
