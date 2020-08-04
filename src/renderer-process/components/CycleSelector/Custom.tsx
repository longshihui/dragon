import React from 'react';
import { Checkbox } from 'antd';
import { SemanticCycles, CYCLE } from './constants';

interface Props {
    cycles?: CYCLE[];
    onChange: (data: Data) => void;
}

export interface Data {
    cycles: CYCLE[];
}

export function getDefaultsData(): Data {
    return {
        cycles: [
            CYCLE.MONDAY,
            CYCLE.TUESDAY,
            CYCLE.WEDNESDAY,
            CYCLE.THURSDAY,
            CYCLE.FRIDAY
        ]
    };
}

export default function ScaleWeek(props: Props) {
    const { cycles } = props;

    return (
        <Checkbox.Group
            value={cycles}
            options={SemanticCycles}
            onChange={values => {
                props.onChange({
                    cycles: values.map(Number)
                });
            }}
        />
    );
}
