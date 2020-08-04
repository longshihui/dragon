import React, { useState, Fragment } from 'react';
import CycleSelector, {
    ConfigData as CycleConfigData
} from '../../components/CycleSelector/index';
import { CYCLE_TYPE } from '../../components/CycleSelector/constants';
import { Form, Button, TimePicker, Slider, Radio, Row, Col, Alert } from 'antd';

const { RangePicker } = TimePicker;

// 时间格式化
const TIME_FORMAT = 'HH:mm';
const MIN_FRAGMENT_TIME = 30; //最小工作时间30分钟
const MAX_FRAGMENT_TIME = 30 * 4; // 最长工作时长2小时

const BREAK_STYLES = [
    {
        label: '通知',
        value: 'notification'
    },
    {
        label: '警告框',
        value: 'alert'
    },
    {
        label: '自动锁屏',
        value: 'auto-lock-screen'
    }
];
const LABEL_SPAN = 4;

function shouldShowAlert(fragmentTime: number) {
    if (fragmentTime >= 60) {
        if (fragmentTime >= 60 && fragmentTime < 60 + 30) {
            return (
                <Alert
                    type="warning"
                    banner
                    message="每段工作时长长达1小时以上，有点长了哦~"
                ></Alert>
            );
        }
        if (fragmentTime >= 60 + 30) {
            return (
                <Alert
                    type="warning"
                    banner
                    message="每段工作时长长达1.5小时以上，可能对身体造成伤害！"
                ></Alert>
            );
        }
        if (fragmentTime === 60 * 2) {
            return (
                <Alert
                    type="error"
                    banner
                    message="每段工作时长长达2小时，过长的工作时间会导致严重的职业病！请警惕！"
                ></Alert>
            );
        }
    }
    return null;
}

export default function WorkTimeControl() {
    const [, setBeginTime] = useState('');
    const [, setEndTime] = useState('');
    const [fragmentTime, setFragmentTime] = useState(45);
    const [restTime, setRestTime] = useState(15);
    const [cycleType, setCycleType] = useState<CYCLE_TYPE | null>(null);
    const [cycleData, setCycleData] = useState<CycleConfigData>(null);

    return (
        <Fragment>
            <div style={{ marginBottom: '20px' }}>
                {shouldShowAlert(fragmentTime)}
            </div>
            <Form
                labelCol={{ span: LABEL_SPAN }}
                wrapperCol={{ span: 24 - LABEL_SPAN }}
            >
                <Form.Item label="工作时间区间">
                    <RangePicker
                        format={TIME_FORMAT}
                        picker="time"
                        onChange={(values, [beginTime, endTime]) => {
                            setBeginTime(beginTime);
                            setEndTime(endTime);
                        }}
                    />
                </Form.Item>
                <Form.Item label="每段工作时长">
                    <Row align="middle">
                        <Col span={20}>
                            <Slider
                                defaultValue={fragmentTime}
                                min={MIN_FRAGMENT_TIME}
                                max={MAX_FRAGMENT_TIME}
                                onChange={value => {
                                    if (!Array.isArray(value)) {
                                        setFragmentTime(value);
                                    }
                                }}
                            />
                        </Col>
                        <Col offset={1} span={3}>
                            {fragmentTime}分钟
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item label="中途休息时间">
                    <Row align="middle">
                        <Col span={20}>
                            <Slider
                                defaultValue={restTime}
                                min={10}
                                max={40}
                                onChange={value => {
                                    if (!Array.isArray(value)) {
                                        setRestTime(value);
                                    }
                                }}
                            />
                        </Col>
                        <Col offset={1} span={3}>
                            {restTime}分钟
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item label="生效周期">
                    <CycleSelector
                        type={cycleType}
                        configData={cycleData}
                        onChangeType={setCycleType}
                        onChangeData={setCycleData}
                    />
                </Form.Item>
                <Form.Item label="中断方式">
                    <Radio.Group buttonStyle="solid">
                        {BREAK_STYLES.map(style => (
                            <Radio.Button value={style.value} key={style.value}>
                                {style.label}
                            </Radio.Button>
                        ))}
                    </Radio.Group>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: LABEL_SPAN }}>
                    <Button type="primary">设定好了</Button>
                </Form.Item>
            </Form>
        </Fragment>
    );
}
