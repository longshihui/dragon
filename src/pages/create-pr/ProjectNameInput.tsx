import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';

const styles = createStyles({
  input: {
    marginRight: 20,
    flexGrow: 1,
    flexBasis: 'auto',
    flexShrink: 1
  }
});

interface ProjectNameInputProps extends WithStyles<typeof styles> {
  projectName: string;
  onChange: (newProjectName: string) => void;
}

class ProjectNameInput extends React.Component<ProjectNameInputProps, {}> {
  render() {
    return (
      <Grid container alignItems="center">
        <Grid item className={this.props.classes.input}>
          <TextField
            label="新需求名字"
            placeholder="请输入需求名字"
            fullWidth
            margin="normal"
            variant="outlined"
            value={this.props.projectName}
            InputLabelProps={{
              shrink: true
            }}
            onChange={event => this.props.onChange(event.target.value)}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ProjectNameInput);
