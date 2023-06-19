
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Tooltip, Typography } from '@mui/material'
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import { async } from 'q';
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import { submitDoc } from '../../api/Employye';

const Submit = ({ id, checklist }) => {

    const tid = id
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };



    const validationSchema = Yup.object().shape({
        files: Yup.mixed().required('File is required'),
        checkboxes: Yup.array().min(1, 'Please select at least one checkbox'),

    });


    const initialValues = {
        files: null,
        checkboxes: [],
    };

    const handleSubmit = (valuse) => async () => {
        console.log(valuse)
        const res = await submitDoc(valuse);

        if (res.success === true) {
            toast.success(res.message)
            setOpen(false)
        }
        if (res.success === false) {
            toast.error(res.message)
        }
    };


    return (
        <div>
            <Tooltip title="Add People">
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    Submit
                </Button>

            </Tooltip>
            <Dialog open={open} onClose={handleClose} maxWidth="md"
                PaperProps={{ sx: { width: { lg: "40%", sm: "90%", md: "80%", xs: "80%" }, position: "fixed", m: 0, top: 40, } }} >
                <DialogTitle> <Typography variant="h6" color="initial">Add People</Typography></DialogTitle>
                <DialogContent>

                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                {/* File Upload */}
                                <Field type="file" name="files" />
                                <ErrorMessage name="files" component="div" />
                                {/* Checkbox Array */}
                                <FieldArray name="checkboxes">

                                    <div>
                                        {checklist.map((option, index) => (
                                            <div key={index}>
                                                <FormControlLabel
                                                    control={
                                                        <Field
                                                            as={Checkbox}
                                                            type="checkbox"
                                                            name={`checkboxes[${index}]`}
                                                            value={option}
                                                        />
                                                    }
                                                    label={option}
                                                />
                                            </div>
                                        ))}

                                    </div>

                                </FieldArray>
                                <ErrorMessage name="checkboxes" component="div" />
                                {/* Form Submission */}
                                <Button type="submit" disabled={isSubmitting}>
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeButton={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored" />
        </div>
    )
}

export default Submit
