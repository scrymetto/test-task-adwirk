import React from 'react';
import {AppBar, Typography, Toolbar, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative'
    },
    title: {
        flexGrow: 1,
    }
}));

export function Header(props) {
    const classes = useStyles();
    const button = props.children;

    return (
        <>
            <AppBar className={classes.root} data-testid='AppBar'>
                <Toolbar>
                    <Typography variant='h6' className={classes.title}>Test app for Adwirk Group</Typography>
                    {button && button()}
                </Toolbar>
            </AppBar>
        </>
    )
}