import React, { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from 'antd';

const { Paragraph, Title } = Typography;

interface Props {
    path: string;
    title: string;
    desc: string;
    icon: ReactNode;
}

export default function FunctionalItem(props: Props) {
    const history = useHistory();

    function toFunctional() {
        history.push(props.path);
    }

    return (
        <div className="functional-item" onClick={toFunctional}>
            <div className="functional-item__icon">{props.icon}</div>
            <div className="functional-item__info">
                <Title level={4} className="functional-item__title">
                    {props.title}
                </Title>
                <Paragraph className="functional-item__desc" ellipsis>
                    {props.desc}
                </Paragraph>
            </div>
        </div>
    );
}
