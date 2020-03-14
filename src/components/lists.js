import React, {useState} from 'react';

import {Grid} from "@material-ui/core";
import {DndProvider} from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import {Tasks} from "./tasks";

import {LISTS, LOCAL_STORAGE_KEY, MAX_GRID} from "../CONSTS";

import {createTasksObj} from "../helpers/createTasksObj";
import {useLocalStorage} from "../helpers/useLocalStorage";

export function Lists() {

    const [storageData, setStorageData] = useLocalStorage(LOCAL_STORAGE_KEY);

    const [tasks, setTasks] = useState(storageData ? JSON.parse(storageData) : createTasksObj(LISTS));

    const changeTasks = (source, task, target) => {
        if (source === target) return;
        const changes = {};
        if (target) {
            changes[source] = tasks[source].filter(oldTask => oldTask.id !== task.id);
            changes[target] = [...tasks[target], task]
        } else {
            changes[source] = [...tasks[source], task]
        }
        const newTasks = {...tasks, ...changes};
        setTasks(newTasks);
        setStorageData(JSON.stringify(newTasks));
    };

    return (
        <DndProvider backend={Backend}>
            <div style={{'margin': '10px'}}>
                <Grid container justify="center" alignItems='center'>
                    <Grid container direction='row' spacing={2}>
                        {LISTS.map(list => {
                            return (
                                <Grid key={list.key} item md={MAX_GRID / LISTS.length} sm={MAX_GRID / LISTS.length * 2}
                                      xs={MAX_GRID}>
                                    <Tasks list={list} tasks={tasks[list.key]}
                                           changeTasks={changeTasks}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </div>
        </DndProvider>
    )
}