import React from 'react';
import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from '@material-ui/core';
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';

const styles = createStyles({
  list: {
    width: 200,
    height: 300,
    overflow: 'auto'
  }
});

export interface DirectoryListProps extends WithStyles<typeof styles> {
  directoryList: string[];
  checkedDirectoryList: string[];
  onAddChecked: (value: string) => void;
  onRemoveChecked: (value: string) => void;
}

function isChecked(list: string[], value: string) {
  return list.includes(value);
}

class DirectoryList extends React.Component<DirectoryListProps, {}> {
  render() {
    const {
      directoryList,
      classes,
      onAddChecked,
      onRemoveChecked,
      checkedDirectoryList
    } = this.props;

    function handleChange(value: string) {
      let checked = !isChecked(checkedDirectoryList, value);
      console.log(checked);
      checked ? onAddChecked(value) : onRemoveChecked(value);
    }

    return (
      <Paper>
        <List dense component="ul" role="list" className={classes.list}>
          {directoryList.map(value => {
            const labelId = `transfer-list-item-${value}-label`;
            return (
              <ListItem
                key={value}
                role="listitem"
                button
                component="li"
                onClick={() => {
                  handleChange(value);
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={isChecked(checkedDirectoryList, value)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value} />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    );
  }
}

export default withStyles(styles)(DirectoryList);
