import React from 'react';
import { Fab, Grid, Tooltip } from '@material-ui/core';
import { Add, Remove, Redo, Undo } from '@material-ui/icons';

export default function DirectorySelectorActions() {
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Tooltip title="添加到创建列表" placement="top">
          <Fab color="primary" size="small" href="">
            <Redo />
          </Fab>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title="从创建列表中移除" placement="top">
          <Fab color="secondary" size="small" href="">
            <Undo />
          </Fab>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title="新增文件夹" placement="top">
          <Fab color="primary" size="small" href="">
            <Add />
          </Fab>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title="删除文件夹" placement="top">
          <Fab color="secondary" size="small" href="">
            <Remove />
          </Fab>
        </Tooltip>
      </Grid>
    </Grid>
  );
}
