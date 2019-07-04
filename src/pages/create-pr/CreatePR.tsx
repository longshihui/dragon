import React from 'react';
import Layout from '@/components/layout';
import { TextField, Fab, Grid } from '@material-ui/core';
import { Folder } from '@material-ui/icons';
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';
import { ipcRenderer } from 'electron';
import { isString } from 'lodash';
import { IPCEvents } from '@/modules/ipc/create-pr';

const styles = createStyles({
  row: {
    marginTop: 20,
    marginBottom: 20
  },
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

interface CreatePRProps extends WithStyles<typeof styles> {}

interface CreatePRState {
  selectedDirectory: string;
}

class CreatePR extends React.Component<CreatePRProps, CreatePRState> {
  constructor(props) {
    super(props);
    this.state = {
      selectedDirectory: ''
    };
  }
  async selectDirectory() {
    ipcRenderer.once(IPCEvents.SELECT_DIRECTORY, (event, directoryPath) => {
      if (!isString(directoryPath)) {
        return;
      }
      this.setState(() => {
        return {
          selectedDirectory: directoryPath
        };
      });
    });
    ipcRenderer.send(IPCEvents.SELECT_DIRECTORY);
  }
  render() {
    const { selectedDirectory } = this.state;
    const props = this.props;
    return (
      <Layout>
        <Grid container alignItems="center" className={props.classes.row}>
          <Grid item className={props.classes.input}>
            <TextField
              label="需求存放目录"
              placeholder="选择一个路径"
              fullWidth
              variant="outlined"
              value={selectedDirectory}
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item className={props.classes.iconButton}>
            <Fab href="" color="primary" onClick={() => this.selectDirectory()}>
              <Folder />
            </Fab>
          </Grid>
        </Grid>
        <Grid container alignItems="center" className={props.classes.row}>
          <Grid item className={props.classes.input}>
            <TextField
              label="新需求名字"
              placeholder="请输入需求名字"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export default withStyles(styles)(CreatePR);
