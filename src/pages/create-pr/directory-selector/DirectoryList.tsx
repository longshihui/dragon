import React from 'react';
import {
    Checkbox,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Card,
    CardHeader,
    Divider
} from '@material-ui/core';
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';

const styles = createStyles({
    list: {
        width: 200,
        height: 230,
        overflow: 'auto'
    },
    cardContent: {
        padding: 0
    }
});

export interface DirectoryListProps extends WithStyles<typeof styles> {
    title: string;
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
            title,
            directoryList,
            classes,
            onAddChecked,
            onRemoveChecked,
            checkedDirectoryList
        } = this.props;

        function handleChange(value: string) {
            let checked = !isChecked(checkedDirectoryList, value);
            checked ? onAddChecked(value) : onRemoveChecked(value);
        }

        return (
            <Card>
                <CardHeader title={title} />
                <Divider component="div" />
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
                                        checked={isChecked(
                                            checkedDirectoryList,
                                            value
                                        )}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{
                                            'aria-labelledby': labelId
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={value} />
                            </ListItem>
                        );
                    })}
                </List>
            </Card>
        );
    }
}

export default withStyles(styles)(DirectoryList);
