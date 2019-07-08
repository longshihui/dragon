import React from 'react';
import { Grid } from '@material-ui/core';
import DirectoryList from './DirectoryList';
import DirectorySelectorActions from './DirectorySelectorActions';
import DirectoryAdd from './DirectoryAdd';
import { Confirm } from '@/components';

export interface DirectorySelectorProps {
  directoryList: string[];
  createDirectoryList: string[];
  onChange: (changedList: string[]) => void;
}

export interface DirectorySelectorState {
  openAddDirectoryDialog: boolean;
  unselectedList: string[];
  checkedSelectedList: string[];
  checkedUnselectedList: string[];
}

function remove(list: string[], value: string) {
  return list.filter(val => val !== value);
}

export default class DirectorySelector extends React.Component<
  DirectorySelectorProps,
  DirectorySelectorState
> {
  constructor(props: DirectorySelectorProps) {
    super(props);
    this.state = {
      unselectedList: [],
      checkedSelectedList: [],
      checkedUnselectedList: [],
      openAddDirectoryDialog: false
    };
  }
  // 添加已选择列表的勾选项
  addCheckedSelectedList(value: string) {
    this.setState(state => {
      return {
        checkedSelectedList: state.checkedSelectedList.concat(value)
      };
    });
  }
  // 从已选择列表里移除一项勾选
  removeValueFromCheckedSelectedList(value: string) {
    this.setState(state => {
      return {
        checkedSelectedList: remove(state.checkedSelectedList, value)
      };
    });
  }
  // 添加未选择列表中的勾选项
  addCheckedUnselectedList(value: string) {
    this.setState(state => {
      return {
        checkedUnselectedList: state.checkedUnselectedList.concat(value)
      };
    });
  }
  // 从未选择列表中移除勾选状态
  removeValueFromCheckedUnselectedList(value: string) {
    this.setState(state => {
      return {
        checkedUnselectedList: remove(state.checkedUnselectedList, value)
      };
    });
  }
  onSelectDirectory() {
    this.props.onChange(
      this.props.createDirectoryList.concat(this.state.checkedUnselectedList)
    );
    this.setState(state => {
      return {
        unselectedList: state.unselectedList.filter(
          dir => !state.checkedUnselectedList.includes(dir)
        ),
        checkedUnselectedList: []
      };
    });
  }
  onCancelSelectDirectory() {
    this.props.onChange(
      this.props.createDirectoryList.filter(
        dir => !this.state.checkedSelectedList.includes(dir)
      )
    );
    this.setState(state => {
      return {
        unselectedList: state.unselectedList.concat(state.checkedSelectedList),
        checkedSelectedList: []
      };
    });
  }
  onAddDirectory() {
    this.setState(() => {
      return {
        openAddDirectoryDialog: true
      };
    });
  }
  async onDeleteDirectory() {
    if (!(await Confirm('确认删除？'))) {
      return;
    }
    const deleteList = this.state.checkedSelectedList.concat(
      this.state.checkedUnselectedList
    );
    this.props.onChange(
      this.props.createDirectoryList.filter(val => !deleteList.includes(val))
    );
    this.setState(state => {
      return {
        unselectedList: state.unselectedList.filter(
          val => !deleteList.includes(val)
        ),
        checkedSelectedList: [],
        checkedUnselectedList: []
      };
    });
  }
  render() {
    return (
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item>
          <DirectoryList
            title="未选择"
            directoryList={this.state.unselectedList}
            checkedDirectoryList={this.state.checkedUnselectedList}
            onAddChecked={value => {
              this.addCheckedUnselectedList(value);
            }}
            onRemoveChecked={value => {
              this.removeValueFromCheckedUnselectedList(value);
            }}
          />
        </Grid>
        <Grid item>
          <DirectorySelectorActions
            onSelectDirectory={() => this.onSelectDirectory()}
            onCancelSelectDirectory={() => this.onCancelSelectDirectory()}
            onAddDirectory={() => this.onAddDirectory()}
            onDeleteDirectory={() => this.onDeleteDirectory()}
          />
        </Grid>
        <Grid item>
          <DirectoryList
            title="将要创建"
            directoryList={this.props.createDirectoryList}
            checkedDirectoryList={this.state.checkedSelectedList}
            onAddChecked={value => {
              this.addCheckedSelectedList(value);
            }}
            onRemoveChecked={value => {
              this.removeValueFromCheckedSelectedList(value);
            }}
          />
        </Grid>
        <DirectoryAdd
          open={this.state.openAddDirectoryDialog}
          directoryList={this.props.directoryList}
          onAdd={newDirectory => {
            this.setState(state => {
              return {
                unselectedList: state.unselectedList.concat(newDirectory)
              };
            });
          }}
          onClose={() => {
            this.setState(() => {
              return {
                openAddDirectoryDialog: false
              };
            });
          }}
        />
      </Grid>
    );
  }
}
