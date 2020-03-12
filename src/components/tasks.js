import React from 'react';
import PropTypes from 'prop-types';

import {Grid} from "@material-ui/core";
import {PaperHeader} from "./paper_header";
import {NewTask} from "./new_task";
import {MAX_GRID, LISTS} from "../CONSTS";

export function Tasks(props) {
    const {name, tasks} = props;

    return (
        <Grid container direction={"column"}>
            <Grid item >
                <PaperHeader>{name}</PaperHeader>
                <NewTask/>
            </Grid>


            {/*{tasks.forEach(task => {*/}
            {/*    return (*/}
            {/*        <Grid item>*/}
            {/*        </Grid>*/}
            {/*    )*/}
            {/*})}*/}
        </Grid>
    )
}

Tasks.propTypes = {
    tasks: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.exact({
        task: PropTypes.string,
        description: PropTypes.string
    }))),

};
