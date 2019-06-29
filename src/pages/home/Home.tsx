import React, { Fragment } from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';

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
          <footer>
            Dragon ©2019 Created by{' '}
            <a
              href="https://github.com/longshihui"
              target="_blank"
              rel="noopener noreferrer"
            >
              Long ShiHui
            </a>
          </footer>
        </Container>
      </Fragment>
    );
  }
}
