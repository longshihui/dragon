import React from 'react';
import fs from 'fs';
import path from 'path';
import { Alert } from '@/renderer-process/ui';
import { promisify } from 'util';
import DataBase from '@/main-process/DataBase';
import { remote } from 'electron';
import SelectStoreDirectory from './SelectStoreDirectory';
import PRConfig from './PRConfig';
import Result from './Result';
import { RouteComponentProps } from 'react-router-dom';
import { Steps } from 'antd';
import './PRTemplate.scss';

const { Step } = Steps;

const mkdir = promisify(fs.mkdir);
const DATABASE_KEY = 'create-pr';

interface Props extends RouteComponentProps {}

interface State {
    // 选择的存放目录
    storeDirectory: string;
    // 项目名
    projectName: string;
    // 目录列表
    directoryList: string[];
    // 最终要创建的目录列表
    createDirectoryList: string[];
    // 是否正在创建
    isCreating: boolean;
    steps: string[];
    activeStep: number;
}

class CreatePR extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            storeDirectory: '',
            projectName: '',
            directoryList: [],
            createDirectoryList: [],
            isCreating: false,
            steps: ['基础配置', '模板目录', '完成'],
            activeStep: 0
        };
    }
    async componentWillMount() {
        await this.init();
    }

    async init() {
        await DataBase.defaults(DATABASE_KEY, {
            storageDir: remote.app.getPath('documents'),
            createDirList: [
                '需求文档',
                'UI资源',
                '后端技术文档',
                '前端技术文档',
                '测试用例',
                '其他'
            ]
        });
        // 链接到数据库
        const db = await DataBase.connect();

        const { storageDir, createDirList } = db.get(DATABASE_KEY).value();
        this.setState({
            storeDirectory: storageDir,
            directoryList: createDirList,
            createDirectoryList: createDirList
        });
    }
    async changestoreDirectory(newDirectory) {
        const db = await DataBase.connect();
        this.setState(() => {
            return {
                storeDirectory: newDirectory
            };
        });
        db.set(`${DATABASE_KEY}.storageDir`, newDirectory).write();
    }
    async createPR() {
        this.setState({
            isCreating: true
        });
        try {
            const projectPath = path.resolve(
                this.state.storeDirectory,
                './',
                this.state.projectName
            );
            fs.mkdirSync(projectPath);
            await Promise.all(
                this.state.createDirectoryList.map(directoryName => {
                    return mkdir(
                        path.resolve(projectPath, './', directoryName)
                    );
                })
            );
            this.setState({
                isCreating: false
            });
            this.nextStep();
        } catch (e) {
            this.setState({
                isCreating: false
            });
            await Alert(e.message);
        }
    }
    nextStep() {
        this.setState(state => ({
            activeStep: Math.min(state.activeStep + 1, state.steps.length - 1)
        }));
    }
    prevStep() {
        this.setState(state => ({
            activeStep: Math.max(state.activeStep - 1, 0)
        }));
    }
    render() {
        let step;
        switch (this.state.activeStep) {
            case 0:
                step = (
                    <SelectStoreDirectory
                        defaultStoreDirectory={this.state.storeDirectory}
                        onNext={({ storeDirectory, projectName }) => {
                            this.setState({
                                storeDirectory,
                                projectName
                            });
                            this.nextStep();
                        }}
                    />
                );
                break;
            case 1:
                step = (
                    <PRConfig
                        defaultFiles={this.state.createDirectoryList}
                        storeDirectory={this.state.storeDirectory}
                        name={this.state.projectName}
                        onPrev={this.prevStep.bind(this)}
                        onNext={data => {
                            this.setState({
                                projectName: data.projectName,
                                createDirectoryList: data.files
                            });
                            this.createPR();
                        }}
                    />
                );
                break;
            case 2:
                step = (
                    <Result
                        templateFullPath={path.join(
                            this.state.storeDirectory,
                            this.state.projectName,
                            '/'
                        )}
                    />
                );
                break;
            default:
                step = null;
        }
        return (
            <div className="pr-template">
                <Steps
                    className="pr-template__steps"
                    current={this.state.activeStep}
                    progressDot
                >
                    {this.state.steps.map(label => (
                        <Step key={label} title={label}></Step>
                    ))}
                </Steps>
                <div className="pr-template-content">{step}</div>
            </div>
        );
    }
}

export default CreatePR;
