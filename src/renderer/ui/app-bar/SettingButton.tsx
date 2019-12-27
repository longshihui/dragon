import React from 'react';
import { IconButton } from '@material-ui/core';
import { Settings } from '@material-ui/icons';

export default class SettingsButton extends React.Component {
    render() {
        return (
            <IconButton color="inherit">
                <Settings />
            </IconButton>
        );
    }
}
