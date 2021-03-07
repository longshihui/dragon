import React, { Component, Fragment } from 'react';
import { Button, Tree, Modal, Form, Input } from 'antd';
import {
    FolderFilled,
    FolderOpenFilled,
    DeleteOutlined,
    PlusOutlined
} from '@ant-design/icons';

interface Props {
    defaultFiles: string[]; // 默认生成的文件列表
    storeDirectory: string; // 需求存放路径
    name: string; // 需求名称
    onNext(data: { projectName: string; files: string[] }): void;
    onPrev(): void;
}

interface State {
    files: Set<string>;
    openAddDialog: boolean;
    addFileName: string;
}

export default class PRConfig extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            files: new Set<string>(props.defaultFiles),
            openAddDialog: false,
            addFileName: ''
        };
    }
    async onNext() {
        try {
            this.props.onNext({
                projectName: this.props.name,
                files: Array.from(this.state.files)
            });
        } catch (e) {
            // ignore
        }
    }
    get dirTree() {
        const tree = [];
        const root = {
            title: this.props.name,
            key: 'root',
            icon: <FolderOpenFilled />,
            children: []
        };
        const addNode = {
            title: '',
            key: '__add__',
            icon: <PlusOutlined onClick={() => this.addDir()} />,
            isLeaf: true
        };
        for (let fileName of this.state.files) {
            root.children.push({
                title: (
                    <Fragment>
                        {fileName}
                        <DeleteOutlined
                            className="delete-icon"
                            onClick={() => {
                                this.removeDir(fileName);
                            }}
                        />
                    </Fragment>
                ),
                key: fileName,
                icon: <FolderFilled />,
                isLeaf: true
            });
        }
        root.children.push(addNode);
        tree.push(root);
        return tree;
    }
    removeDir(name) {
        this.setState(({ files }) => {
            files.delete(name);
            return {
                files: files
            };
        });
    }
    addDir() {
        this.setState({
            openAddDialog: true
        });
    }
    // 确认新增
    onConfrimAddDir() {
        this.setState(({ files, addFileName }) => {
            files.add(addFileName);
            return {
                files,
                openAddDialog: false,
                addFileName: ''
            };
        });
    }
    // 取消新增
    onCancelAddDir() {
        this.setState({
            openAddDialog: false,
            addFileName: ''
        });
    }
    render() {
        return (
            <Fragment>
                <div className="pr-template-content__main">
                    <Tree defaultExpandAll showIcon treeData={this.dirTree} />
                </div>
                <div className="pr-template-content__footer">
                    <Button type="default" onClick={this.props.onPrev}>
                        上一步
                    </Button>
                    <Button type="primary" onClick={this.onNext.bind(this)}>
                        下一步
                    </Button>
                </div>
                <Modal
                    title="新增文件夹"
                    visible={this.state.openAddDialog}
                    onCancel={this.onCancelAddDir.bind(this)}
                    onOk={this.onConfrimAddDir.bind(this)}
                >
                    <Form>
                        <Form.Item label="名称">
                            <Input
                                value={this.state.addFileName}
                                onChange={event => {
                                    this.setState({
                                        addFileName: event.target.value
                                    });
                                }}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </Fragment>
        );
    }
}
