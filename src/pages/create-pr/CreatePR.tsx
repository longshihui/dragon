import React from 'react';
import Layout from '@/components/layout';
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';
import ParentDirectorySelector from './ParentDirectorySelector';
import ProjectNameInput from './ProjectNameInput';
import DirectorySelector from './directory-selector';
import { Button, Grid } from '@material-ui/core';
import Validator from 'async-validator';
import fs from 'fs';
import path from 'path';
import { Alert, Loading } from '@/components';
import { promisify } from 'util';

const mkdir = promisify(fs.mkdir);

const styles = createStyles({
  row: {
    marginTop: 20,
    marginBottom: 20
  },
  input: {
    marginRight: 20,
    flexGrow: 1,
    flexBasis: 'auto',
    flexShrink: 1
  },
  iconButton: {
    flexGrow: 0,
    flexBasis: 'auto',
    flexShrink: 0
  }
});

interface CreatePRProps extends WithStyles<typeof styles> {}

interface CreatePRState {
  selectedDirectory: string;
  projectName: string;
  createDirectoryList: string[];
  isCreating: boolean;
}

// TODO 从配置用户配置文件里读取
const DEFAULT_CREATE_DIR_LIST = [
  '需求文档',
  'UI资源',
  '后端技术文档',
  '前端技术文档',
  '测试用例',
  '其他'
];

class CreatePR extends React.Component<CreatePRProps, CreatePRState> {
  constructor(props) {
    super(props);
    this.state = {
      selectedDirectory: '',
      projectName: '',
      createDirectoryList: DEFAULT_CREATE_DIR_LIST,
      isCreating: false
    };
  }
  changeSelectedDirectory(newDirectory) {
    this.setState(() => {
      return {
        selectedDirectory: newDirectory
      };
    });
  }
  changeCreateDirectoryList(newList) {
    this.setState(() => {
      return {
        createDirectoryList: newList
      };
    });
  }
  async validate() {
    const validator = new Validator({
      selectedDirectory(rule, value, callback) {
        const error = [];
        if (!fs.existsSync(value)) {
          error.push(new Error('存放目录不存在，需要重新选择'));
        }
        callback(error);
      },
      projectName(rule, projectName, callback, source) {
        const error = [];
        if (fs.existsSync(source.selectedDirectory)) {
          const projectPath = path.resolve(
            source.selectedDirectory,
            './',
            projectName
          );
          if (fs.existsSync(projectPath)) {
            error.push(new Error('项目: ' + projectName + ' 已存在'));
          }
        }
        callback(error);
      },
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
      console.log(validateResult);
      Alert(validateResult[0].message);
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
          return mkdir(path.resolve(projectPath, './', directoryName));
        })
      );
      Alert('创建成功');
    } catch (e) {
      Alert(e.message);
    } finally {
      this.setState({
        isCreating: false
      });
    }
  }
  render() {
    return (
      <Layout>
        <Grid container direction="column" spacing={2}>
          <ParentDirectorySelector
            selectedDirectory={this.state.selectedDirectory}
            onChange={newDirectory =>
              this.changeSelectedDirectory(newDirectory)
            }
          />
          <ProjectNameInput
            projectName={this.state.projectName}
            onChange={value => {
              this.setState({
                projectName: value
              });
            }}
          />
          <DirectorySelector
            directoryList={DEFAULT_CREATE_DIR_LIST}
            createDirectoryList={this.state.createDirectoryList}
            onChange={newList => this.changeCreateDirectoryList(newList)}
          />
          <Grid item container justify="center">
            <Grid item>
              <Loading
                isLoading={this.state.isCreating}
                progressProps={{ size: 20 }}
              >
                <Button
                  variant="contained"
                  href=""
                  color="primary"
                  size="large"
                  disabled={this.state.isCreating}
                  onClick={() => this.handleSubmit()}
                >
                  创建项目
                </Button>
              </Loading>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export default withStyles(styles)(CreatePR);
