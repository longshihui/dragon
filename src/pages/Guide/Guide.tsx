import React from 'react';
import { Card, Icon, Layout } from 'antd';
import styles from './Guide.scss';
import config from './config.json';

const { Footer, Content } = Layout;

export default function Guide() {
  return (
    <Layout className={styles.layout}>
      <Content style={styles.content}>
        {config.guide.map(card => {
          return (
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<Icon className={styles.icon} type={card.icon} />}
              key={card.id}
            >
              <div className={styles.title}>{card.title}</div>
            </Card>
          );
        })}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Dragon ©2019 Created by
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
