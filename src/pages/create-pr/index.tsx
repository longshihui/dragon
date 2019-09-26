import React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';
import { Container, Stepper, Step, StepLabel, Grid } from '@material-ui/core';
import Validator from 'async-validator';
import fs from 'fs';
import path from 'path';
import { Alert } from '@/components';
import { promisify } from 'util';
import DataBase from '@/modules/user-data';
import { remote } from 'electron';
import SelectStoreDirectory from './SelectStoreDirectory';
import PRConfig from './PRConfig';

const mkdir = promisify(fs.mkdir);
const DATABASE_KEY = 'create-pr';

const styles = createStyles({
    container: {
        width: '100%',
        height: '100%'
    },
    stepper: {
        background: 'transparent'
    }
});

interface Props extends WithStyles<typeof styles> {}

interface State {
    // 选择的存放目录
    selectedDirectory: string;
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
            selectedDirectory: '',
            projectName: '',
            directoryList: [],
            createDirectoryList: [],
            isCreating: false,
            steps: ['选择需求存放目录', '需求配置', '预览'],
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
            selectedDirectory: storageDir,
            directoryList: createDirList,
            createDirectoryList: createDirList
        });
    }
    async changeSelectedDirectory(newDirectory) {
        const db = await DataBase.connect();
        this.setState(() => {
            return {
                selectedDirectory: newDirectory
            };
        });
        db.set(`${DATABASE_KEY}.storageDir`, newDirectory).write();
    }
    changeCreateDirectoryList(newList) {
        this.setState(() => {
            return {
                createDirectoryList: newList
            };
        });
    }
    // 校验提交内容
    async validate() {
        const validator = new Validator({
            // 校验存放目录是否为存在
            selectedDirectory(rule, value, callback) {
                const error = [];
                if (!fs.existsSync(value)) {
                    error.push(new Error('存放目录不存在，需要重新选择'));
                }
                callback(error);
            },
            // 校验项目名字是否已存在
            projectName: {
                required: true,
                validator(rule, projectName, callback, source) {
                    const error = [];
                    if (projectName.trim() === '') {
                        error.push(new Error('项目名称不能为空'));
                    }
                    if (fs.existsSync(source.selectedDirectory)) {
                        const projectPath = path.resolve(
                            source.selectedDirectory,
                            './',
                            projectName
                        );
                        if (fs.existsSync(projectPath)) {
                            error.push(
                                new Error('项目: ' + projectName + ' 已存在')
                            );
                        }
                    }
                    callback(error);
                }
            },
            // 校验创建的目录列表是否为空
            createDirectoryList(rule, list, callback) {
                const error = [];
                if (list.length === 0) {
                    error.push(new Error('创建的目录不能为空!'));
                }
                callback(error);
            }
        });
        const validateResult = await new Promise(resolve => {
            validator.validate(this.state, errors => {
                resolve(errors);
            });
        });
        if (validateResult) {
            await Alert(validateResult[0].message);
            return false;
        }
        return true;
    }
    async handleSubmit() {
        if (!(await this.validate())) {
            return;
        }
        this.setState({
            isCreating: true
        });
        try {
            const projectPath = path.resolve(
                this.state.selectedDirectory,
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
            await Alert('创建成功');
        } catch (e) {
            await Alert(e.message);
        } finally {
            this.setState({
                isCreating: false
            });
        }
    }
    handleNext() {
        this.setState(state => ({
            activeStep: Math.min(state.activeStep + 1, state.steps.length - 1)
        }));
    }
    handlePrev() {
        this.setState(state => ({
            activeStep: Math.max(state.activeStep - 1, 0)
        }));
    }
    render() {
        let step;
        let handleNext = () => this.handleNext();
        let handlePrev = () => this.handlePrev();
        switch (this.state.activeStep) {
            case 0:
                step = (
                    <SelectStoreDirectory
                        selectedDirectory={this.state.selectedDirectory}
                        onChange={newDirectory =>
                            this.changeSelectedDirectory(newDirectory)
                        }
                        onNext={handleNext}
                    />
                );
                break;
            case 1:
                step = (
                    <PRConfig
                        defaultFiles={this.state.createDirectoryList}
                        storeDirectory={this.state.selectedDirectory}
                        onPrev={handlePrev}
                        onNext={handleNext}
                    />
                );
                break;
            default:
                step = null;
        }
        return (
            <Grid container direction="column">
                <Grid item>
                    <Stepper
                        className={this.props.classes.stepper}
                        activeStep={this.state.activeStep}
                        alternativeLabel
                    >
                        {this.state.steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Grid>
                <Grid item>
                    <Container>{step}</Container>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(CreatePR);
