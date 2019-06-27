import React from 'react';
import { Card, Icon, Layout } from 'antd';
import styles from './Home.scss';
import config from './config.json';
import { RouteComponentProps } from 'react-router-dom';

const { Footer, Content } = Layout;

export default class Home extends React.Component<RouteComponentProps> {
  constructor(props: RouteComponentProps) {
    super(props);
  }
  private goTo(pathname: string) {
    this.props.history.push(pathname);
  }
  render() {
    return (
      <Layout className={styles.layout}>
        <Content className={styles.content}>
          {config.guide.map(card => {
            return (
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<Icon className={styles.icon} type={card.icon} />}
                key={card.id}
                onClick={() => this.goTo(card.pathname)}
              >
                <div className={styles.title}>{card.title}</div>
              </Card>
            );
          })}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Dragon ©2019 Created by{' '}
          <a
            href="https://github.com/longshihui"
            target="_blank"
            rel="noopener noreferrer"
          >
            Long ShiHui
          </a>
        </Footer>
      </Layout>
    );
  }
}
