import React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';
import { Container, Stepper, Step, StepLabel, Grid } from '@material-ui/core';
import fs from 'fs';
import path from 'path';
import { Alert } from '@/components';
import { promisify } from 'util';
import DataBase from '@/modules/user-data';
import { remote } from 'electron';
import SelectStoreDirectory from './SelectStoreDirectory';
import PRConfig from './PRConfig';
import Preview from './Preview';
import { RouteComponentProps } from 'react-router-dom';

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

interface Props extends RouteComponentProps, WithStyles<typeof styles> {}

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
    async handleSubmit() {
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
            this.setState({
                isCreating: false
            });
            this.props.history.replace('/');
        } catch (e) {
            this.setState({
                isCreating: false
            });
            await Alert(e.message);
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
                        onNext={data => {
                            this.setState({
                                projectName: data.projectName,
                                createDirectoryList: data.files
                            });
                            handleNext();
                        }}
                    />
                );
                break;
            case 2:
                step = (
                    <Preview
                        storeDirectory={this.state.selectedDirectory}
                        subDirectoryList={this.state.createDirectoryList}
                        projectName={this.state.projectName}
                        onPrev={handlePrev}
                        onConfirm={this.handleSubmit.bind(this)}
                    />
                );
                break;
            default:
                step = null;
        }
        return (
            <Grid container direction="column" wrap="nowrap">
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
