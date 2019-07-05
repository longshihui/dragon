import React from 'react';
import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText
} from '@material-ui/core';
import DirectoryList from './DirectoryList';
import DirectorySelectorActions from './DirectorySelectorActions';
import DirectoryAdd from './DirectoryAdd';

export interface DirectorySelectorProps {
  directoryList: string[];
}

export interface DirectorySelectorState {
  openAddDirectoryDialog: boolean;
  selectedList: string[];
  unselectedList: string[];
  checkedSelectedList: string[];
  checkedUnselectedList: string[];
  openConfirmDeleteDialog: boolean;
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
      selectedList: props.directoryList,
      unselectedList: [],
      checkedSelectedList: [],
      checkedUnselectedList: [],
      openAddDirectoryDialog: false,
      openConfirmDeleteDialog: false
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
    this.setState(state => {
      return {
        unselectedList: state.unselectedList.filter(
          dir => !state.checkedUnselectedList.includes(dir)
        ),
        selectedList: state.selectedList.concat(state.checkedUnselectedList),
        checkedUnselectedList: []
      };
    });
  }
  onCancelSelectDirectory() {
    console.log('call');
    this.setState(state => {
      return {
        unselectedList: state.unselectedList.concat(state.checkedSelectedList),
        selectedList: state.selectedList.filter(
          dir => !state.checkedSelectedList.includes(dir)
        ),
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
  onDeleteDirectory() {
    const deleteList = this.state.checkedSelectedList.concat(
      this.state.checkedUnselectedList
    );
    this.setState(state => {
      return {
        selectedList: state.selectedList.filter(
          val => !deleteList.includes(val)
        ),
        unselectedList: state.unselectedList.filter(
          val => !deleteList.includes(val)
        ),
        checkedSelectedList: [],
        checkedUnselectedList: [],
        openConfirmDeleteDialog: false
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
            onDeleteDirectory={() =>
              this.setState(() => {
                return {
                  openConfirmDeleteDialog: true
                };
              })
            }
          />
        </Grid>
        <Grid item>
          <DirectoryList
            title="将要创建"
            directoryList={this.state.selectedList}
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
        <Dialog
          open={this.state.openConfirmDeleteDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>提示</DialogTitle>
          <DialogContent>
            <DialogContentText>确认删除吗？</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              href=""
              variant="contained"
              color="secondary"
              onClick={() => {
                this.setState(() => {
                  return {
                    openConfirmDeleteDialog: false
                  };
                });
              }}
            >
              再想想
            </Button>
            <Button
              href=""
              variant="contained"
              color="primary"
              onClick={() => this.onDeleteDirectory()}
            >
              确认
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
}
