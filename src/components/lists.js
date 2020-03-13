import React, {useState} from 'react';
import {Grid} from "@material-ui/core";
import {Tasks} from "./tasks";
import {LISTS, MAX_GRID} from "../CONSTS";
import {createTasksObj} from "../helpers/createTasksObj";

export function Lists() {

    const [tasks, setTasks] = useState(createTasksObj(LISTS));

    const changeTasks = (task) => {
        setTasks({...tasks, ...task})
    };


    return (
        <div style={{'margin': '10px'}}>
            <Grid container justify="center" alignItems='center'>
                <Grid container direction='row' spacing={2}>
                    {LISTS.map(list => {
                        return (
                            <Grid key={list.key} item md={MAX_GRID / LISTS.length} sm={MAX_GRID / LISTS.length * 2}
                                  xs={MAX_GRID}>
                                <Tasks list={list} tasks={tasks[list.key]}
                                       setTask={(task) => changeTasks(task, list.key)}/>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </div>
    )
}