import React from 'react';
import { Grid } from '@material-ui/core';
import DirectoryList from './DirectoryList';
import DirectorySelectorActions from './DirectorySelectorActions';

export interface DirectorySelectorProps {
  directoryList: string[];
}

export interface DirectorySelectorState {
  selectedList: string[];
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
      selectedList: props.directoryList,
      unselectedList: [],
      checkedSelectedList: [],
      checkedUnselectedList: []
    };
  }
  addCheckedSelectedList(value: string) {
    this.setState(state => {
      return {
        checkedSelectedList: state.checkedSelectedList.concat(value)
      };
    });
  }
  removeValueFromCheckedSelectedList(value: string) {
    this.setState(state => {
      return {
        checkedSelectedList: remove(state.checkedSelectedList, value)
      };
    });
  }
  addCheckedUnselectedList(value: string) {
    this.setState(state => {
      return {
        checkedUnselectedList: state.checkedUnselectedList.concat(value)
      };
    });
  }
  removeValueFromCheckedUnselectedList(value: string) {
    this.setState(state => {
      return {
        checkedUnselectedList: remove(state.checkedUnselectedList, value)
      };
    });
  }
  render() {
    return (
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item>
          <DirectoryList
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
          <DirectorySelectorActions />
        </Grid>
        <Grid item>
          <DirectoryList
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
      </Grid>
    );
  }
}
