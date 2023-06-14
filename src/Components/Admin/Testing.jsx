import Button from '@mui/material/Button'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import { BlockTwoTone } from '@mui/icons-material'
import { Typography } from '@mui/material'




const Testing = () => {
  const [val, setVal] = useState([])

  const handleAdd = () => {
    const abc = [...val, []]
    setVal(abc)
  }

  const handleChanges = (onChangeValue, i) => {
    const inputdata = [...val]
    inputdata[i] = onChangeValue.target.value
    setVal(inputdata)
  }
  console.log(val,"data-")

  const handleDelete = (i) => { 
    const delval = [...val]
    delval.splice(i,1)
    setVal(delval)
   }
  return (
    <Grid container spacing={1}>
      <Grid item lg={10} sm={8} xs={8} md={10}>
        <Typography variant="h4" color="initial">Add Check List</Typography>
      </Grid>
      <Grid item lg={2} sm={4} xs={4} md={2}>
        <Button variant="contained" color="info" onClick={() => handleAdd()}>
          Add Column
        </Button>
      </Grid>
      {
        val.map((data, i) => {
          return (
            <Grid container spacing={1}>
              <Grid item lg={10} sm={10} xs={10} md={10} >
                <TextField
                  fullWidth
                  name='chk'
                  label="Enter Check List Data"
                  value={data}
                  onChange={e => handleChanges(e, i)}

                />
              </Grid>
              <Grid item lg={2} sm={2} xs={2} md={2}  >

                <IconButton aria-label="icon" onClick={() => handleDelete(i)}>
                  <BlockTwoTone color='error' />
                </IconButton>

              </Grid>
            </Grid>



          )
        })
      }
    </Grid>
  )
}

export default Testing