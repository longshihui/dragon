import React, { Component } from 'react';
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
    Tooltip
} from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import {
    Folder as FolderIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Settings as SettingsIcon,
    Undo as UndoIcon
} from '@material-ui/icons';

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
        fontSize: 14
    }
});

interface Props extends WithStyles<typeof styles> {
    files: string[];
    onNext(): void;
    onPrev(): void;
}

interface State {
    name: string;
}

export default withStyles(styles)(
    class PRConfig extends Component<Props, State> {
        constructor(props) {
            super(props);
            this.state = {
                name: ''
            };
        }
        render() {
            return (
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
                        <Grid item xs={6}>
                            <Paper>
                                <List dense>
                                    {this.props.files.map(file => (
                                        <ListItem key={file}>
                                            <ListItemIcon>
                                                <FolderIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={file} />
                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
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
