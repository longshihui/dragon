import React, { ReactNode } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { isString } from 'lodash';

export interface ConfirmProps {
  open: boolean;
  onClose: (result: boolean) => void | null;
  title?: string;
  hiddenTitle?: boolean;
  content?: string | ReactNode;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

interface ConfirmState {}

export default class Confirm extends React.Component<
  ConfirmProps,
  ConfirmState
> {
  get title() {
    return this.props.title || '提示';
  }
  get content() {
    if (isString(this.props.content)) {
      return <DialogContentText>{this.props.content}</DialogContentText>;
    }
    return this.props.content || null;
  }
  get confirmButtonText() {
    return this.props.confirmButtonText || '确定';
  }
  get cancelButtonText() {
    return this.props.cancelButtonText || '取消';
  }
  render() {
    return (
      <Dialog open={this.props.open} fullWidth maxWidth="sm">
        <DialogTitle>{this.title}</DialogTitle>
        <DialogContent>{this.content}</DialogContent>
        <DialogActions>
          <Button
            href=""
            variant="contained"
            color="secondary"
            onClick={() => this.props.onClose && this.props.onClose(false)}
          >
            {this.cancelButtonText}
          </Button>
          <Button
            href=""
            variant="contained"
            color="primary"
            onClick={() => this.props.onClose && this.props.onClose(true)}
          >
            {this.confirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
