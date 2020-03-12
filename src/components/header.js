import React from 'react';
import {AppBar, Typography, Toolbar, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative'
    },
}));

export function Header() {
    const classes = useStyles();
    return (
        <>
                <AppBar className={classes.root}>
                    <Toolbar>
                        <Typography variant='h6'>Test app for Adwirk Group</Typography>
                    </Toolbar>
                </AppBar>
        </>
    )
}