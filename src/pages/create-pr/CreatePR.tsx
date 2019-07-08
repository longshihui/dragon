import React from 'react';
import Layout from '@/components/layout';
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';
import ParentDirectorySelector from './ParentDirectorySelector';
import ProjectNameInput from './ProjectNameInput';
import DirectorySelector from './directory-selector';

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
      createDirectoryList: DEFAULT_CREATE_DIR_LIST
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
  render() {
    return (
      <Layout>
        <ParentDirectorySelector
          selectedDirectory={this.state.selectedDirectory}
          onChange={newDirectory => this.changeSelectedDirectory(newDirectory)}
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
      </Layout>
    );
  }
}

export default withStyles(styles)(CreatePR);
