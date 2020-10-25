import React, { Fragment } from 'react';
import { ipcRenderer } from 'electron';
import { IPCEvents } from '@/main-process/PRTemplate/constants';
import { isString } from 'lodash';
import { Form, Input, Button } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';
import fs from 'fs';
import { promisify } from 'util';
import { FormInstance } from 'antd/lib/form';
import path from 'path';

const exists = promisify(fs.exists);

const { Item: FormItem } = Form;
interface Props {
    defaultStoreDirectory: string;
    onNext: (data: State) => void;
}

interface State {
    storeDirectory: string;
    projectName: string;
}

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
        this.state = {
            storeDirectory: this.props.defaultStoreDirectory,
            projectName: ''
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
            this.setState({
                storeDirectory: directoryPath
            });
        });
        ipcRenderer.send(IPCEvents.SELECT_DIRECTORY);
    }
    async onSubmit() {
        try {
            await this.form.validateFields();
            this.props.onNext(this.state);
        } catch (error) {
            // ignore
        }
    }
    render() {
        const addonButton = (
            <Button type="primary" onClick={this.selectDirectory.bind(this)}>
                <FolderOpenOutlined />
            </Button>
        );
        return (
            <Fragment>
                <Form
                    className="pr-template-content__main"
                    initialValues={{
                        dir: this.state.storeDirectory,
                        name: this.state.projectName
                    }}
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
                    <FormItem
                        name="name"
                        label="需求名"
                        rules={[
                            {
                                required: true,
                                message: '需求名不能为空'
                            },
                            {
                                validator: async (rule, name) => {
                                    if (typeof name !== 'string' || !name) {
                                        return;
                                    }
                                    const projectPath = path.resolve(
                                        this.state.storeDirectory,
                                        './',
                                        name
                                    );
                                    if (await exists(projectPath)) {
                                        throw new Error(`需求: ${name} 已存在`);
                                    }
                                }
                            }
                        ]}
                    >
                        <Input
                            onChange={event => {
                                this.setState({
                                    projectName: event.target.value
                                });
                            }}
                        />
                    </FormItem>
                </Form>
                <div className="pr-template-content__footer">
                    <Button
                        type="primary"
                        htmlType="button"
                        onClick={this.onSubmit.bind(this)}
                    >
                        下一步
                    </Button>
                </div>
            </Fragment>
        );
    }
}
