import React, { Fragment } from 'react';
import {
  Container,
  CssBaseline,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography
} from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import classes from './Home.scss';
import CardIcon from './CardIcon';
import config from './config';

const COPYRIGHT_YEARS = new Date().getFullYear();

export default class Home extends React.Component<RouteComponentProps> {
  constructor(props: RouteComponentProps) {
    super(props);
  }
  private goTo(pathname: string) {
    this.props.history.push(pathname);
  }
  render() {
    return (
      <Fragment>
        <CssBaseline />
        <Container>
          <Grid
            className={classes.container}
            container
            direction="column"
            alignItems="stretch"
            spacing={0}
          >
            <Grid className={classes.content} item container spacing={3}>
              {config.map(c => {
                return (
                  <Grid item xs={4} key={c.id}>
                    <Card onClick={() => this.goTo(c.pathname)}>
                      <CardActionArea href="javascript:;">
                        <CardContent>
                          <CardIcon>{c.icon}</CardIcon>
                          <Typography component="h2" variant="h5">
                            {c.title}
                          </Typography>
                          <Typography
                            component="p"
                            variant="body2"
                            color="textSecondary"
                          >
                            {c.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
            <Grid className={classes.footer} item>
              Dragon ©{COPYRIGHT_YEARS} Created by{' '}
              <a
                href="https://github.com/longshihui"
                target="_blank"
                rel="noopener noreferrer"
              >
                Long ShiHui
              </a>
            </Grid>
          </Grid>
        </Container>
      </Fragment>
    );
  }
}
