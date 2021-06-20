import React from 'react';
import { Radio, Switch, Typography, Space, Row, Col } from 'antd';
import {
    CYCLE,
    SemanticCycleDictionary
} from '../../components/CycleSelector/constants';

interface Props {
    isSingleRest: boolean;
    restDays: CYCLE[];
    onChange: (data: Data) => void;
}

export interface Data {
    isSingleRest: boolean;
    restDays: CYCLE[];
}

export function getDefaultsData(): Data {
    return {
        isSingleRest: false,
        restDays: []
    };
}

export default function Workday(props: Props) {
    const { isSingleRest, restDays } = props;
    let restDaysSetting = null;

    function changeIsSingleRest(checked: boolean) {
        let restDays = null;
        if (checked) {
            restDays = [CYCLE.SUNDAY];
        } else {
            restDays = [CYCLE.SATURDAY, CYCLE.SUNDAY];
        }
        props.onChange({
            isSingleRest: checked,
            restDays
        });
    }

    if (isSingleRest) {
        restDaysSetting = (
            <Row>
                <Space>
                    <Col>
                        <Typography.Text>休息日：</Typography.Text>
                    </Col>
                    <Col>
                        <Radio.Group
                            value={restDays[0]}
                            options={[
                                {
                                    label: SemanticCycleDictionary.get(
                                        CYCLE.SATURDAY
                                    ),
                                    value: CYCLE.SATURDAY
                                },
                                {
                                    label: SemanticCycleDictionary.get(
                                        CYCLE.SUNDAY
                                    ),
                                    value: CYCLE.SUNDAY
                                }
                            ]}
                            onChange={event => {
                                props.onChange({
                                    isSingleRest,
                                    restDays: [Number(event.target.value)]
                                });
                            }}
                        ></Radio.Group>
                    </Col>
                </Space>
            </Row>
        );
    }

    return (
        <Space direction="vertical">
            <Space>
                <Typography.Text>是单休:</Typography.Text>
                <Switch
                    checked={isSingleRest}
                    onChange={changeIsSingleRest}
                ></Switch>
            </Space>
            {restDaysSetting}
        </Space>
    );
}
