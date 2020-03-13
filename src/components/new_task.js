import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Formik, Form, Field} from 'formik';
import {TextField} from 'formik-material-ui';
import {Paper, Button} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: '95%',
    },
    field: {
        margin: theme.spacing(1),
        fontSize: '0.5em',
    },
    button: {
        margin: theme.spacing(1),
    }
}));

export function NewTask() {
    const classes = useStyles();
    return (
        <Paper>
            <Formik initialValues={{name: '', description: ''}}
                    onSubmit={((values, {resetForm, setSubmitting}) => {
                        setSubmitting(false);
                        resetForm();
                        setTimeout(() => console.log(values), 500)
                    })}>
                {({submitForm, isSubmitting}) => (
                    <Form className={classes.root}>
                        <Field component={TextField}
                               name='name'
                               label="New Task"
                               fullWidth
                               className={classes.field}
                               size='small'
                        />
                        <Field component={TextField}
                               name='description'
                               label="Description"
                               variant="outlined"
                               fullWidth
                               multiline
                               rows={3}
                               className={classes.field}
                               size='small'
                        />
                        <Button
                                color="primary"
                                type='submit'
                                onClick={submitForm}
                                disabled={isSubmitting}
                                className={classes.button}>
                            Add new task
                        </Button>
                    </Form>
                )}
            </Formik>
        </Paper>
    )

}