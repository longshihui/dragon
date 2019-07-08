import React from 'react';
import { Fab, Grid, TextField } from '@material-ui/core';
import { Folder } from '@material-ui/icons';
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';
import { ipcRenderer } from 'electron';
import { IPCEvents } from '@/modules/ipc/create-pr';
import { isString } from 'lodash';

const styles = createStyles({
  input: {
    marginRight: 20,
    flexGrow: 1,
    flexBasis: 'auto',
    flexShrink: 1
  },
  iconButton: {
    flexGrow: 0,
    flexBasis: 'auto',
    flexShrink: 0
  }
});

interface ParentDirectorySelectorProps extends WithStyles<typeof styles> {
  selectedDirectory: string;
  onChange: (newDirectory: string) => void;
}

class ParentDirectorySelector extends React.Component<
  ParentDirectorySelectorProps,
  {}
> {
  async selectDirectory() {
    ipcRenderer.once(IPCEvents.SELECT_DIRECTORY, (event, directoryPath) => {
      if (!isString(directoryPath)) {
        return;
      }
      this.props.onChange(directoryPath);
    });
    ipcRenderer.send(IPCEvents.SELECT_DIRECTORY);
  }
  render() {
    return (
      <Grid item container alignItems="center">
        <Grid item className={this.props.classes.input}>
          <TextField
            label="需求存放目录"
            placeholder="选择一个路径"
            fullWidth
            variant="outlined"
            value={this.props.selectedDirectory}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              readOnly: true
            }}
          />
        </Grid>
        <Grid item className={this.props.classes.iconButton}>
          <Fab href="" color="primary" onClick={() => this.selectDirectory()}>
            <Folder />
          </Fab>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ParentDirectorySelector);
