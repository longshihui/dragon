import React from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';
import { ipcRenderer } from 'electron';
import { IPCEvents } from '@/main/ipc/create-pr';
import { isString } from 'lodash';

const styles = createStyles({
    inputSection: {
        minHeight: 300
    },
    input: {
        maxWidth: '75%'
    },
    actionSection: {
        textAlign: 'center'
    },
    button: {
        marginRight: 10,
        '&:last-child': {
            marginRight: 0
        }
    }
});

interface Props extends WithStyles<typeof styles> {
    selectedDirectory: string;
    onChange: (newDirectory: string) => void;
    onNext: () => void;
}

export default withStyles(styles)(
    class SelectStoreDirectory extends React.Component<Props, {}> {
        async selectDirectory() {
            ipcRenderer.once(
                IPCEvents.SELECT_DIRECTORY,
                (event, directoryPath) => {
                    if (!isString(directoryPath)) {
                        return;
                    }
                    this.props.onChange(directoryPath);
                }
            );
            ipcRenderer.send(IPCEvents.SELECT_DIRECTORY);
        }
        render() {
            return (
                <Grid container direction="column">
                    <Grid
                        item
                        container
                        justify="center"
                        alignItems="center"
                        className={this.props.classes.inputSection}
                    >
                        <TextField
                            className={this.props.classes.input}
                            label="需求存放目录"
                            placeholder="选择一个路径"
                            fullWidth
                            value={this.props.selectedDirectory}
                            InputLabelProps={{
                                shrink: true
                            }}
                            InputProps={{
                                readOnly: true
                            }}
                        />
                    </Grid>
                    <Grid item className={this.props.classes.actionSection}>
                        <Button
                            className={this.props.classes.button}
                            variant="contained"
                            color="secondary"
                            onClick={() => this.selectDirectory()}
                        >
                            重新选择
                        </Button>
                        <Button
                            className={this.props.classes.button}
                            variant="contained"
                            color="primary"
                            onClick={() => this.props.onNext()}
                        >
                            下一步
                        </Button>
                    </Grid>
                </Grid>
            );
        }
    }
);
