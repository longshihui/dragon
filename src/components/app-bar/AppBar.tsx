import React from 'react';
import {
    AppBar as MaterialAppBar,
    Grid,
    Toolbar,
    Typography
} from '@material-ui/core';
import NavigateActions from './NavigateActions';
import { withStyles, createStyles, WithStyles } from '@material-ui/styles';
import logoImage from './logo.svg';
import SettingButton from './SettingButton';

const styles = createStyles({
    logo: {
        marginRight: 10,
        width: 48,
        height: 48,
        background: `url(${logoImage}) center no-repeat`,
        backgroundSize: '300%',
        color: '#ffffff'
    }
});

export default withStyles(styles)(
    class AppBar extends React.Component<WithStyles<typeof styles>, {}> {
        render() {
            return (
                <MaterialAppBar position="static" color="primary">
                    <Toolbar>
                        <div className={this.props.classes.logo}></div>
                        <Typography variant="h6">Dragon</Typography>
                        <Grid container justify="space-between">
                            <Grid item>
                                <NavigateActions />
                            </Grid>
                            <Grid item>
                                <SettingButton />
                            </Grid>
                        </Grid>
                    </Toolbar>
                </MaterialAppBar>
            );
        }
    }
);
