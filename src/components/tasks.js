import React from 'react';
import PropTypes from 'prop-types';
import {v1 as uuid} from 'uuid';

import {Grid, makeStyles} from "@material-ui/core";
import {PaperHeader} from "./paper_header";
import {NewTask} from "./new_task";
import {TaskPaper} from "./taskPaper";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../CONSTS";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%'
    },
}));

export function Tasks(props) {
    const classes = useStyles();
    const {list, tasks, changeTasks} = props;

    const [, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: () => ({key: list.key}),
    });

    const addNewTask = task => {
        if (task.name) {
            task.id = uuid();
            changeTasks(list.key, task)
        }
    };

    const onMoveTask = (source, taskId, target) => {
        const task = tasks.filter(task => task.id === taskId)[0];
        changeTasks(source, task, target);
    };

    return (
        <Grid container direction={"column"} ref={drop} className={classes.root}>
            <Grid item>
                <PaperHeader>
                    {list.name}
                </PaperHeader>
                <NewTask addNewTask={addNewTask}/>
            </Grid>

            {tasks && tasks.map(task => {
                return (
                    <Grid key={task.id} item>
                        <TaskPaper task={task} onMove={(id, target) => onMoveTask(list.key, id, target)}/>
                    </Grid>
                )
            })}
        </Grid>
    )
}

Tasks.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.exact({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string
    })),
};
