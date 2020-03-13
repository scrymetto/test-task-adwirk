import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Card, CardContent, Typography} from "@material-ui/core";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../CONSTS";

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

export function TaskPaper({task, onMove}) {
    const classes = useStyles();
    const [collectedProps, drag] = useDrag({
        item: {
            id: task.id,
            type: ItemTypes.TASK
        },
        collect: monitor => {
            return {
                isDragging: !!monitor.isDragging()
            }
        },
        end({id}, monitor) {
            const result = monitor.getDropResult();
            if (result) {
                onMove(id, result.key)
            }
        }
    });

    return (
        <Card className={classes.root} ref={drag} style={{opacity: collectedProps.isDragging ? 0.5 : 1}}>
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