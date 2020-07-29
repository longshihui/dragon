import React, { Component, Fragment } from 'react';
import { Form, Button, Tree } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { FolderFilled, FolderOpenFilled } from '@ant-design/icons';

const { Item: FormItem } = Form;

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
    private readonly setFormRef: (formInstance: FormInstance) => void;
    private form: FormInstance;
    constructor(props) {
        super(props);
        this.state = {
            files: new Set<string>(props.defaultFiles),
            openAddDialog: false,
            addFileName: ''
        };
        this.form = null;
        this.setFormRef = formInstance => {
            this.form = formInstance;
        };
    }
    async onNext() {
        try {
            await this.form.validateFields();
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
        for (let fileName of this.state.files) {
            root.children.push({
                title: fileName,
                key: fileName,
                icon: <FolderFilled />,
                isLeaf: true
            });
        }
        tree.push(root);
        return tree;
    }
    render() {
        return (
            <Fragment>
                <Form
                    className="pr-template-content__main"
                    ref={this.setFormRef}
                >
                    <FormItem label="需求目录">
                        <Tree
                            defaultExpandAll
                            showIcon
                            treeData={this.dirTree}
                        />
                    </FormItem>
                </Form>
                <div className="pr-template-content__footer">
                    <Button type="default" onClick={this.props.onPrev}>
                        上一步
                    </Button>
                    <Button type="primary" onClick={this.onNext.bind(this)}>
                        下一步
                    </Button>
                </div>
            </Fragment>
        );
    }
}
