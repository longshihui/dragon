import React, { useState } from 'react';
import { Radio } from 'antd';
import { ipcRenderer } from 'electron';
import { IPCEvents } from '@/main-process/WorkTimeControl/contants';

enum STYLE {
    NOTIFICATION,
    ALERT,
    AUTO_LOCK_SCREEN
}

const BREAK_STYLES = [
    {
        label: '通知',
        value: STYLE.NOTIFICATION
    },
    {
        label: '警告框',
        value: STYLE.ALERT
    },
    {
        label: '自动锁屏',
        value: STYLE.AUTO_LOCK_SCREEN
    }
];

export function useBreakStyleState() {
    return useState<STYLE | null>(null);
}

function runExampleBreak(style: STYLE) {
    switch (style) {
        case STYLE.NOTIFICATION:
            ipcRenderer.send(IPCEvents.NOTIFICATION_EXAMPLE);
            break;
        case STYLE.ALERT:
            ipcRenderer.send(IPCEvents.ALERT_EXAMPLE);
            break;
        case STYLE.AUTO_LOCK_SCREEN:
            ipcRenderer.send(IPCEvents.AUTO_LOCK_SCREEN_EXAMPLE);
            break;
    }
}

export default function BreakStyle(props: {
    value: STYLE | null;
    onChange: (value: STYLE) => void;
}) {
    function onChange(style: STYLE) {
        runExampleBreak(style);
        props.onChange(style);
    }

    return (
        <Radio.Group
            buttonStyle="solid"
            value={props.value}
            onChange={event => {
                onChange(Number(event.target.value));
            }}
        >
            {BREAK_STYLES.map(style => (
                <Radio.Button value={style.value} key={style.value}>
                    {style.label}
                </Radio.Button>
            ))}
        </Radio.Group>
    );
}
