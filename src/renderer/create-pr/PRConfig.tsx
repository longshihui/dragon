import React, { Component, Fragment } from 'react';
import {
    TextField,
    Grid,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Paper,
    Fab,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import {
    Folder as FolderIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Settings as SettingsIcon,
    Undo as UndoIcon
} from '@material-ui/icons';
import { Confirm, Alert } from '@/renderer/ui';
import Validator from 'async-validator';
import fs from 'fs';
import path from 'path';

const styles = createStyles({
    filesSection: {
        height: 300
    },
    actionSection: {
        textAlign: 'center'
    },
    button: {
        marginRight: 10,
        '&:last-child': {
            marginRight: 0
        }
    },
    tooltip: {
        fontSize: 12
    },
    listWrapper: {
        height: '100%'
    },
    listPaper: {
        maxHeight: '100%',
        overflow: 'auto'
    }
});

interface Props extends WithStyles<typeof styles> {
    defaultFiles: string[];
    storeDirectory: string;
    onNext(data: { projectName: string; files: string[] }): void;
    onPrev(): void;
}

interface State {
    name: string;
    files: Set<string>;
    openAddDialog: boolean;
    addFileName: string;
}

export default withStyles(styles)(
    class PRConfig extends Component<Props, State> {
        constructor(props) {
            super(props);
            this.state = {
                name: '',
                files: new Set<string>(props.defaultFiles),
                openAddDialog: false,
                addFileName: ''
            };
        }
        async onNext() {
            const validator = new Validator({
                name: (rule, name, callback) => {
                    const errors = [];
                    if (name.trim() === '') {
                        errors.push(new Error('需求名不能为空'));
                        return callback(errors);
                    }
                    const projectPath = path.resolve(
                        this.props.storeDirectory,
                        './',
                        name
                    );
                    if (fs.existsSync(projectPath)) {
                        errors.push(new Error('项目: ' + name + ' 已存在'));
                    }
                    callback(errors);
                }
            });
            try {
                await validator.validate({
                    name: this.state.name
                });
                this.props.onNext({
                    projectName: this.state.name,
                    files: Array.from(this.state.files)
                });
            } catch (e) {
                Alert(e.message || e.errors[0].message);
            }
        }
        render() {
            const handleOpenAddDialog = () =>
                this.setState({
                    openAddDialog: true
                });
            const handleCloseAddDialog = () =>
                this.setState({
                    openAddDialog: false
                });
            const handleDeleteFile = file => {
                this.setState(state => {
                    state.files.delete(file);
                    return {
                        files: state.files
                    };
                });
            };
            const handleChangeAddFileName = e => {
                this.setState({
                    addFileName: e.target.value
                });
            };
            const handleAddFile = () => {
                this.setState(state => {
                    state.files.add(state.addFileName);
                    return {
                        files: state.files,
                        addFileName: '',
                        openAddDialog: false
                    };
                });
            };
            const handleResetFiles = async () => {
                if (await Confirm('是否重置？重置后修改将丢失！')) {
                    this.setState({
                        files: new Set(this.props.defaultFiles)
                    });
                }
            };
            const handleEditPreset = () => {
                // TODO
                Alert('该功能还未开放');
            };
            return (
                <Fragment>
                    <Grid
                        container
                        direction="column"
                        spacing={3}
                        alignItems="center"
                    >
                        <Grid
                            item
                            xs={8}
                            container
                            justify="center"
                            alignItems="center"
                        >
                            <TextField
                                label="需求名"
                                placeholder="输入需求名"
                                fullWidth
                                autoFocus
                                value={this.state.name}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                onChange={e => {
                                    this.setState({
                                        name: e.target.value
                                    });
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={8}
                            container
                            alignItems="center"
                            className={this.props.classes.filesSection}
                        >
                            <Grid
                                item
                                xs={6}
                                className={this.props.classes.listWrapper}
                            >
                                <Paper className={this.props.classes.listPaper}>
                                    <List dense>
                                        {Array.from(this.state.files).map(
                                            file => (
                                                <ListItem key={file}>
                                                    <ListItemIcon>
                                                        <FolderIcon />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={file}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <IconButton
                                                            edge="end"
                                                            aria-label="delete"
                                                            onClick={() => {
                                                                handleDeleteFile(
                                                                    file
                                                                );
                                                            }}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            )
                                        )}
                                    </List>
                                </Paper>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                container
                                justify="center"
                                alignItems="center"
                            >
                                <Tooltip
                                    title="新增文件夹"
                                    placement="top"
                                    classes={{
                                        tooltip: this.props.classes.tooltip
                                    }}
                                >
                                    <Fab
                                        color="primary"
                                        className={this.props.classes.button}
                                        onClick={handleOpenAddDialog}
                                    >
                                        <AddIcon />
                                    </Fab>
                                </Tooltip>
                                <Tooltip
                                    title="修改预设"
                                    placement="top"
                                    classes={{
                                        tooltip: this.props.classes.tooltip
                                    }}
                                >
                                    <Fab
                                        color="secondary"
                                        className={this.props.classes.button}
                                        onClick={handleEditPreset}
                                    >
                                        <SettingsIcon />
                                    </Fab>
                                </Tooltip>
                                <Tooltip
                                    title="重做"
                                    placement="top"
                                    classes={{
                                        tooltip: this.props.classes.tooltip
                                    }}
                                >
                                    <Fab
                                        color="secondary"
                                        className={this.props.classes.button}
                                        onClick={handleResetFiles}
                                    >
                                        <UndoIcon />
                                    </Fab>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <Grid item className={this.props.classes.actionSection}>
                            <Button
                                className={this.props.classes.button}
                                variant="contained"
                                color="secondary"
                                onClick={() => this.props.onPrev()}
                            >
                                上一步
                            </Button>
                            <Button
                                className={this.props.classes.button}
                                variant="contained"
                                color="primary"
                                onClick={() => this.onNext()}
                            >
                                下一步
                            </Button>
                        </Grid>
                    </Grid>
                    <Dialog
                        open={this.state.openAddDialog}
                        fullWidth
                        maxWidth="sm"
                    >
                        <DialogTitle>新建文件夹</DialogTitle>
                        <DialogContent>
                            <TextField
                                label="文件夹名字"
                                placeholder="输入名字"
                                autoFocus
                                fullWidth
                                value={this.state.addFileName}
                                onChange={handleChangeAddFileName}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="contained"
                                onClick={handleCloseAddDialog}
                            >
                                取消
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddFile}
                            >
                                确定
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Fragment>
            );
        }
    }
);
