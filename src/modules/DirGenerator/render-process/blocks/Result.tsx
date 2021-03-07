import React from 'react';
import { Result, Button } from 'antd';
import { platform } from 'os';
import { useHistory } from 'react-router';
import { shell } from 'electron';

interface Props {
    templateFullPath: string;
}

export default function CreatePRResult(props: Props) {
    let fileManagerName = '';
    let disabledOpenFileManager = false;
    let openFileManagerButton = null;
    const history = useHistory();

    switch (platform()) {
        case 'darwin':
            fileManagerName = '打开访达';
            break;
        case 'win32':
            fileManagerName = '打开文件管理器';
            break;
        default:
            fileManagerName = '';
            disabledOpenFileManager = true;
    }
    if (!disabledOpenFileManager) {
        openFileManagerButton = (
            <Button
                type="primary"
                key="openFileManager"
                onClick={() => {
                    shell.showItemInFolder(props.templateFullPath);
                }}
            >
                {fileManagerName}
            </Button>
        );
    }
    return (
        <Result
            status="success"
            title="模板创建成功"
            subTitle="可以用生成的模板存放需求相关的文档文件哦~"
            extra={[
                openFileManagerButton,
                <Button
                    key="back"
                    onClick={() => {
                        history.replace('/');
                    }}
                >
                    返回首页
                </Button>
            ]}
        />
    );
}
