import React from 'react';
import { Fab, Grid, Tooltip } from '@material-ui/core';
import { Add, Remove, Redo, Undo } from '@material-ui/icons';

interface DirectorySelectorActionsProps {
    onSelectDirectory: Function;
    onCancelSelectDirectory: Function;
    onAddDirectory: Function;
    onDeleteDirectory: Function;
}

export default function DirectorySelectorActions(
    props: DirectorySelectorActionsProps
) {
    return (
        <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item>
                <Tooltip title="添加到创建列表" placement="top">
                    <Fab
                        color="primary"
                        size="small"
                        href=""
                        onClick={() => props.onSelectDirectory()}
                    >
                        <Redo />
                    </Fab>
                </Tooltip>
            </Grid>
            <Grid item>
                <Tooltip title="从创建列表中移除" placement="top">
                    <Fab
                        color="secondary"
                        size="small"
                        href=""
                        onClick={() => props.onCancelSelectDirectory()}
                    >
                        <Undo />
                    </Fab>
                </Tooltip>
            </Grid>
            <Grid item>
                <Tooltip title="新增文件夹" placement="top">
                    <Fab
                        color="primary"
                        size="small"
                        href=""
                        onClick={() => props.onAddDirectory()}
                    >
                        <Add />
                    </Fab>
                </Tooltip>
            </Grid>
            <Grid item>
                <Tooltip title="删除文件夹" placement="top">
                    <Fab
                        color="secondary"
                        size="small"
                        href=""
                        onClick={() => props.onDeleteDirectory()}
                    >
                        <Remove />
                    </Fab>
                </Tooltip>
            </Grid>
        </Grid>
    );
}
