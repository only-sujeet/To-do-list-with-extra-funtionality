import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Chip, Grid, TextField, Typography, IconButton, Fab } from '@mui/material';
import { elements } from 'chart.js';
import axios from 'axios';
import { csvUpload } from '../../api/Admin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { getTask } from '../../Redux/Action/Admin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowUp, faFileCsv, faFolderMinus } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core';
import { FileUploadOutlined, FileUploadSharp } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const UploadExcel = () => {

    const [open, setOpen] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState(null)
    const [hover, setHover] = React.useState(false)
    const dispatch = useDispatch()
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        dispatch(getTask())
    };

    const readUploadFile = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const removeFile = () => {
        setSelectedFile(null)
        // window.location.reload();
    }

    const uploadData = async () => {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const res = await csvUpload(formData)
        if (res.success === true) {
            toast.success(res.message)
            dispatch(getTask())
            setSelectedFile(null)
        }
        if (res.success === false) {
            toast.error(res.message)
        }
    };

    return (
        <div>
           
            <Button variant="contained" color="secondary" onClick={handleClickOpen} size='small' sx={{ mr: 1, borderRadius: "20px" }} onMouseOver={() => setHover(true)}  onMouseOut={() => { setHover(false) }}
              startIcon={<FontAwesomeIcon icon={faFileCsv} style={{marginLeft:"2px"}} />} 
             >
            {hover ? ("Bulk Task also Upload Here"): (` Upload Task File`)}
            </Button>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth="md"
                PaperProps={{ sx: { width: { lg: "40%", sm: "90%", md: "80%", xs: "80%" }, m: 0, top: 40, position: "fixed" } }}
            >
                <DialogTitle><Typography variant="h4" color="initial">Upload CSV File </Typography> </DialogTitle>
                <DialogContent>
                    <form action="" encType="multipart/form-data">
                        <Grid container spacing={2} >
                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    color='secondary'
                                    label="Upload Excel file"
                                    name='file'
                                    type="file"
                                    InputLabelProps={{ shrink: true, }}
                                    onChange={readUploadFile}
                                    inputProps={{ accept: ".csv" }}

                                />
                            </Grid>
                            <Grid item lg={12} sm={12} xs={12} md={12}>
                                <Typography variant="h5" color="crimson" >{`Note : The headers in the Excel file should be as follows ! =>Name, Rate, Unit, Department, TaskDependency, Instruction, StartDate, EndDate,\n TimeDuration, CheckList`}</Typography>
                            </Grid>
                            <Grid item lg={12} sm={12} xs={12} md={12}>

                                <Button variant="contained" color="info" onClick={uploadData} sx={{ mr: 1, borderRadius: "20px" }} startIcon={<FontAwesomeIcon icon={faFileArrowUp} style={{}} size='2xs' />} >
                                    Upload File
                                </Button>


                                <Button variant="contained" color="error" onClick={removeFile} sx={{ mr: 1, borderRadius: "20px" }} startIcon={<FontAwesomeIcon icon={faFolderMinus} />} >
                                    Remove File
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    {/* <Button onClick={handleClose}>Agree</Button> */}
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

export default UploadExcel
