import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { NavigateBefore } from '@material-ui/icons';
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import { withRouter, RouteComponentProps, match } from 'react-router';

const styles = createStyles({
  root: {
    marginLeft: process.platform === 'darwin' ? 40 : 0
  }
});

interface NavigateActionsProps
  extends RouteComponentProps,
    WithStyles<typeof styles> {}

function isHome(matchRooter: match) {
  return matchRooter.path === '/';
}

function NavigatorActions(props: NavigateActionsProps) {
  const { classes, history, match } = props;
  let backButton = null;

  if (!isHome(match)) {
    backButton = (
      <IconButton color="inherit" href="" onClick={() => history.goBack()}>
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
