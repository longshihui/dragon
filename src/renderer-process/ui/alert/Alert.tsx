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
import DragonThemeProvider from '@/renderer-process/theme';

export interface AlertProps {
    open: boolean;
    onClose: Function | null;
    title?: string;
    hiddenTitle?: boolean;
    content?: string | ReactNode;
    closeButtonText?: string;
}

interface AlertState {}

export default class Alert extends React.Component<AlertProps, AlertState> {
    get title() {
        return this.props.title || '提示';
    }
    get content() {
        if (isString(this.props.content)) {
            return <DialogContentText>{this.props.content}</DialogContentText>;
        }
        return this.props.content || null;
    }
    get closeButtonText() {
        return this.props.closeButtonText || '确定';
    }
    render() {
        return (
            <DragonThemeProvider>
                <Dialog open={this.props.open} fullWidth maxWidth="sm">
                    <DialogTitle>{this.title}</DialogTitle>
                    <DialogContent>{this.content}</DialogContent>
                    <DialogActions>
                        <Button
                            href=""
                            variant="contained"
                            color="primary"
                            onClick={() =>
                                this.props.onClose && this.props.onClose()
                            }
                        >
                            {this.closeButtonText}
                        </Button>
                    </DialogActions>
                </Dialog>
            </DragonThemeProvider>
        );
    }
}
