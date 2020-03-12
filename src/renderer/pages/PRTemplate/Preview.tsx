import React, { Component } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { TreeView, TreeItem } from '@material-ui/lab';
import {
    Folder as FolderIcon,
    ArrowRight as ArrowRightIcon,
    ArrowDropDown as ArrowDropDownIcon
} from '@material-ui/icons';
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

const treeItemStyles = createStyles({
    label: {
        fontWeight: 'inherit',
        color: 'inherit'
    },
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: 5
    },
    labelIcon: {
        marginRight: 5
    },
    labelText: {
        fontWeight: 'inherit',
        flexGrow: 1
    }
});

const styles = createStyles({
    header: {
        textAlign: 'center'
    }
});

const StyledTreeItem = withStyles(treeItemStyles)(
    class StyledTreeItem extends Component<
        WithStyles<typeof treeItemStyles> & {
            id: string;
            labelText: string;
            labelIcon: React.ElementType<SvgIconProps>;
        },
        {}
    > {
        render() {
            const {
                id,
                labelText,
                labelIcon: LabelIcon,
                classes,
                children
            } = this.props;
            return (
                <TreeItem
                    nodeId={id}
                    label={
                        <div className={classes.labelRoot}>
                            <LabelIcon
                                color="inherit"
                                className={classes.labelIcon}
                            />
                            <Typography
                                variant="body2"
                                className={classes.labelText}
                            >
                                {labelText}
                            </Typography>
                        </div>
                    }
                    classes={{
                        label: classes.label
                    }}
                >
                    {children}
                </TreeItem>
            );
        }
    }
);

export default withStyles(styles)(
    class Preview extends Component<
        WithStyles<typeof styles> & {
            storeDirectory: string;
            subDirectoryList: string[];
            projectName: string;
            onPrev: Function;
            onConfirm: Function;
        },
        {}
    > {
        render() {
            return (
                <Grid container direction="column" spacing={2}>
                    <Grid item className={this.props.classes.header}>
                        <Typography component="h6" variant="h6">
                            将要创建的目录结构如下：
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TreeView
                            defaultCollapseIcon={<ArrowDropDownIcon />}
                            defaultExpandIcon={<ArrowRightIcon />}
                            defaultExpanded={['root', 'project']}
                        >
                            <StyledTreeItem
                                id="root"
                                labelText={this.props.storeDirectory}
                                labelIcon={FolderIcon}
                            >
                                <StyledTreeItem
                                    id="project"
                                    labelText={this.props.projectName}
                                    labelIcon={FolderIcon}
                                >
                                    {this.props.subDirectoryList.map(dir => (
                                        <StyledTreeItem
                                            key={dir}
                                            id={dir}
                                            labelText={dir}
                                            labelIcon={FolderIcon}
                                        />
                                    ))}
                                </StyledTreeItem>
                            </StyledTreeItem>
                        </TreeView>
                    </Grid>
                    <Grid
                        item
                        container
                        spacing={2}
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    this.props.onPrev();
                                }}
                            >
                                上一步
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    this.props.onConfirm();
                                }}
                            >
                                确定
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }
    }
);
