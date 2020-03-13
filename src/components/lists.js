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

    const removeTask = (id, taskKey) => {
        const newObj = {};
        newObj[taskKey] = tasks[taskKey].filter(task => task.id !== id);
        console.log(newObj)
        const newTasks = {...tasks, ...newObj};
        console.log(newTasks)
        setTasks(newTasks);
        setStorageData(JSON.stringify(newTasks));
    };

    const addTask = (newTask, target) => {
        console.log(newTask)
        const newObj = {};
        newObj[target] = tasks[target].concat([newTask]);
        const newTasks = {...tasks, ...newObj};
        console.log(newTasks)
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
                                           removeTask={removeTask}
                                           addTask={addTask}/>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </div>
        </DndProvider>
    )
}