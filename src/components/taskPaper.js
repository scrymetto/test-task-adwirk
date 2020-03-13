import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Card, CardContent, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        cursor: 'pointer'
    },
    title: {
        marginLeft: theme.spacing(0.5),
        fontSize: 12,
    },
    text: {
        marginBottom: theme.spacing(1)
    }
}));

export function TaskPaper({task}) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography color="textSecondary" className={classes.title}>Your task</Typography>
                <Typography variant="h5" className={classes.text}>{task.name}</Typography>
                {task.description &&
                <>
                    <Typography color="textSecondary" className={classes.title}>Description</Typography>
                    <Typography>{task.description}</Typography>
                </>}
            </CardContent>
        </Card>
    )
}