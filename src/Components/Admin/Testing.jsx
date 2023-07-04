import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { read, utils } from "xlsx"
import { Grid, TextField, Typography } from '@mui/material';
import { elements } from 'chart.js';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const requiredFields = ["Name", "Rate", "Unit", "Department", "TaskDependency", "Instruction", "StartDate", "EndDate", "CheckList", "Status", "Company", "TimeDuration"]

const Testing = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const readUploadFile = (e) => {

    setSelectedFile(e.target.files[0]);

  }

  const removeFile = () => {
    setSelectedFile(null)
    window.location.reload();
  }

  const uploadData = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    console.log(formData)
    console.log(selectedFile)
    try {
      await axios.post('http://localhost:5000/api/admin/BulkUpload', formData ,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('File uploaded and data stored successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file.');
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
        PaperProps={{ sx: { width: { lg: "40%", sm: "90%", md: "80%", xs: "80%" }, } }}
      >
        <DialogTitle> Bulk Upload Through Excel</DialogTitle>
        <DialogContent>
          <form action="">
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
                  // accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/"
                  // inputProps={{ accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" }}

                />
              </Grid>
              <Grid item lg={12} sm={12} xs={12} md={12}>
                <Typography variant="h5" color="info">{`Note : The headers in the Excel file should be as follows ! =>name, rate, unit, department, taskDependency, instruction, startDate, endDate,\n timeDuration, checkList, company, status="Created"`}</Typography>
              </Grid>
              <Grid item lg={12} sm={12} xs={12} md={12}>

                <Button variant="outlined" color="info" onClick={uploadData}>
                  Upload data
                </Button>
                <Button variant="outlined" color="info" onClick={removeFile}>
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
    </div>
  )
}

export default Testing
