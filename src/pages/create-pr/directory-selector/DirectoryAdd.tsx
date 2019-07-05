import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core';

interface DirectoryAddProps {
  open: boolean;
  directoryList: string[];
  onAdd: (directoryName: string) => void;
  onClose: () => void;
}

interface DirectoryAddState {
  directoryName: string;
  existDirectory: boolean;
}

export default class DirectoryAdd extends React.Component<
  DirectoryAddProps,
  DirectoryAddState
> {
  constructor(props) {
    super(props);
    this.state = {
      directoryName: '',
      existDirectory: false
    };
  }
  setValue(value) {
    this.setState(() => {
      return {
        directoryName: value,
        existDirectory: this.props.directoryList.includes(value)
      };
    });
  }
  handleAddDirectory() {
    if (this.state.existDirectory) {
      return;
    }
    this.props.onAdd(this.state.directoryName);
    this.close();
  }
  close() {
    this.setValue('');
    this.props.onClose();
  }
  render() {
    return (
      <Dialog open={this.props.open} fullWidth maxWidth="sm">
        <DialogTitle>添加一个文件夹</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="输入一个新的文件夹名"
            fullWidth
            value={this.state.directoryName}
            error={this.state.existDirectory}
            helperText={this.state.existDirectory ? '已存在该目录' : ''}
            onChange={event => this.setValue(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button href="" color="secondary" onClick={() => this.close()}>
            取消
          </Button>
          <Button
            href=""
            color="primary"
            onClick={() => this.handleAddDirectory()}
          >
            添加
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
