import React, { Fragment, useState } from 'react';
import { Radio, Space } from 'antd';
import { SemanticCycleTypes, CYCLE_TYPE } from './constants';
import * as Workday from './Workday';
import * as ScaleWeek from './ScaleWeek';
import * as Custom from './Custom';

interface Props {
    type: CYCLE_TYPE | null;
    onChangeType: (type: CYCLE_TYPE) => void;
    configData: ConfigData;
    onChangeData: (data: ConfigData) => void;
}

export type ConfigData = Workday.Data | ScaleWeek.Data | Custom.Data | null;

export function useCycleConfig() {
    const [cycleType, setCycleType] = useState<CYCLE_TYPE | null>(null);
    const [cycleData, setCycleData] = useState<ConfigData>(null);
    return {
        cycleType,
        setCycleType,
        cycleData,
        setCycleData
    };
}

export default function CycleSelector(props: Props) {
    let configView = null;
    let data = null;

    switch (props.type) {
        case CYCLE_TYPE.WORKDAY: {
            data = props.configData as Workday.Data;
            configView = (
                <Workday.default
                    isSingleRest={data.isSingleRest}
                    restDays={data.restDays}
                    onChange={data => props.onChangeData(data)}
                />
            );
            break;
        }
        case CYCLE_TYPE.SCALE_WEEK: {
            data = props.configData as ScaleWeek.Data;
            configView = (
                <ScaleWeek.default
                    bigWeek={data.bigWeek}
                    onChange={data => props.onChangeData(data)}
                />
            );
            break;
        }
        case CYCLE_TYPE.CUSTOM: {
            data = props.configData as Custom.Data;
            configView = (
                <Custom.default
                    cycles={data.cycles}
                    onChange={data => props.onChangeData(data)}
                />
            );
            break;
        }
        default:
            data = null;
            configView = null;
    }

    function onChangeType(type: CYCLE_TYPE) {
        switch (type) {
            case CYCLE_TYPE.WORKDAY: {
                props.onChangeData(Workday.getDefaultsData());
                break;
            }
            case CYCLE_TYPE.SCALE_WEEK: {
                props.onChangeData(ScaleWeek.getDefaultsData());
                break;
            }
            case CYCLE_TYPE.CUSTOM: {
                props.onChangeData(Custom.getDefaultsData());
                break;
            }
        }
        props.onChangeType(type);
    }

    return (
        <Fragment>
            <Space direction="vertical">
                <Radio.Group
                    style={{ width: '100%' }}
                    value={props.type}
                    buttonStyle="solid"
                    onChange={event => {
                        onChangeType(event.target.value);
                    }}
                >
                    {SemanticCycleTypes.map(({ label, value }) => (
                        <Radio.Button value={value} key={value}>
                            {label}
                        </Radio.Button>
                    ))}
                </Radio.Group>
                {configView}
            </Space>
        </Fragment>
    );
}
