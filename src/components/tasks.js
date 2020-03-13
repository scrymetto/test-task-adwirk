import React from 'react';
import PropTypes from 'prop-types';

import {Grid} from "@material-ui/core";
import {PaperHeader} from "./paper_header";
import {NewTask} from "./new_task";
import {TaskPaper} from "./taskPaper";

export function Tasks(props) {
    const {name, tasks} = props;

    return (
        <Grid container direction={"column"}>
            <Grid item>
                <PaperHeader>{name}</PaperHeader>
                <NewTask/>
            </Grid>

            {tasks && tasks.map(task => {
                return (
                    <Grid key={task.id} item>
                        <TaskPaper task={task}/>
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
