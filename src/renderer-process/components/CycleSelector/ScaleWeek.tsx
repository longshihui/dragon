import React from 'react';
import { Radio, Typography, Space } from 'antd';

type Week = 'odd' | 'even';

interface Props {
    bigWeek?: Week;
    onChange: (data: Data) => void;
}

export interface Data {
    bigWeek: 'odd' | 'even';
}

export function getDefaultsData(): Data {
    return {
        bigWeek: 'odd'
    };
}

export default function ScaleWeek(props: Props) {
    const { bigWeek } = props;

    return (
        <Space>
            <Typography.Text>是否单周大：</Typography.Text>
            <Radio.Group
                value={bigWeek}
                options={[
                    {
                        label: '单周大',
                        value: 'odd'
                    },
                    {
                        label: '双周大',
                        value: 'even'
                    }
                ]}
                onChange={e => {
                    props.onChange({
                        bigWeek: e.target.value
                    });
                }}
            />
        </Space>
    );
}
