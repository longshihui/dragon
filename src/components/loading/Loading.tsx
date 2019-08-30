import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { CircularProgressProps } from '@material-ui/core/CircularProgress';
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';

const styles = createStyles({
    layer: {
        position: 'relative',
        pointerEvents: 'none'
    },
    progressWrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
});

interface LoadingProps extends WithStyles<typeof styles> {
    isLoading: boolean;
    progressProps?: CircularProgressProps;
}

class Loading extends React.Component<LoadingProps, {}> {
    render() {
        if (this.props.isLoading) {
            return (
                <div className={this.props.classes.layer}>
                    <div className={this.props.classes.progressWrapper}>
                        <CircularProgress
                            {...(this.props.progressProps || {})}
                        />
                    </div>
                    {this.props.children}
                </div>
            );
        }
        return this.props.children;
    }
}

export default withStyles(styles)(Loading);
