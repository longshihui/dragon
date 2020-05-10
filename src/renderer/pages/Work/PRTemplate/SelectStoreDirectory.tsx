import React, { createRef, Ref } from 'react';
import { ipcRenderer } from 'electron';
import { IPCEvents } from '@/main/ipc/create-pr';
import { isString } from 'lodash';
import { Form, Input, Button } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';
import fs from 'fs';
import { promisify } from 'util';
import { FormInstance } from 'antd/lib/form';

const exists = promisify(fs.exists);

const { Item: FormItem } = Form;
interface Props {
    selectedDirectory: string;
    onChange: (newDirectory: string) => void;
    onNext: () => void;
}

interface State {}

export default class SelectStoreDirectory extends React.Component<
    Props,
    State
> {
    private readonly setFormRef: (formInstance: FormInstance) => void;
    private form: FormInstance;
    constructor(props) {
        super(props);
        this.form = null;
        this.setFormRef = formInstance => {
            this.form = formInstance;
        };
    }
    async selectDirectory() {
        ipcRenderer.once(IPCEvents.SELECT_DIRECTORY, (event, directoryPath) => {
            if (!isString(directoryPath)) {
                return;
            }
            this.form.setFieldsValue({
                dir: directoryPath
            });
            this.props.onChange(directoryPath);
        });
        ipcRenderer.send(IPCEvents.SELECT_DIRECTORY);
    }
    onSubmit() {
        this.props.onNext();
    }
    render() {
        const addonButton = (
            <Button type="primary" onClick={this.selectDirectory.bind(this)}>
                <FolderOpenOutlined />
            </Button>
        );
        return (
            <Form
                className="pr-template-select-dir"
                initialValues={{
                    dir: this.props.selectedDirectory
                }}
                onFinish={this.onSubmit.bind(this)}
                ref={this.setFormRef}
            >
                <FormItem
                    className="pr-template-select-dir__input"
                    name="dir"
                    label="需求存放目录"
                    rules={[
                        { required: true, message: '请选择目录！' },
                        {
                            async validator(rule, value) {
                                if (value && !(await exists(value))) {
                                    throw new Error('存放目录不存在');
                                }
                            }
                        }
                    ]}
                >
                    <Input
                        placeholder="选择一个路径"
                        addonAfter={addonButton}
                    />
                </FormItem>
                <FormItem className="pr-template-select-dir__footer">
                    <Button type="primary" htmlType="submit">
                        下一步
                    </Button>
                </FormItem>
            </Form>
        );
    }
}
