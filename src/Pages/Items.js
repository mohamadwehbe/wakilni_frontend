import React, { useState, useEffect, useMemo } from 'react';
import * as services from '../Services/wakilni-services.proxy';
import { Button, Checkbox, Grid, TextField } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import useScanDetection from 'use-scan-detection';

const getItems = services.getItems;
const addItem = services.CreateItem;
const updateItem = services.UpdateItem;
const getItemById = services.getItemById;
const deleteItem = services.DeleteItem;
const setIsSold = services.setIsSold;
const setIsNotSold = services.setIsNotSold;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Items() {

  const useQuery = () => {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  };
  const query = useQuery();
  const productId = query.get("ProductId");

  useScanDetection({
    onComplete: (code) => {
      setSerialNumber(code.replace("Shift", "").replace("Enter", ""))
    },
    minLength: 3
  })

  const [serialNumber, setSerialNumber] = useState('')
  const [modify, setModify] = useState(false)
  const [id, setId] = useState(null);
  const [data, setData] = useState([]); // your data array
  const [searchText, setSearchText] = useState(''); // for search text input

  // simulate fetching data on component mount
  useEffect(() => {
    let apiTest = true;
    getItems(productId).then(x => {
      if (x && apiTest)
        setData(x);
    })
    return () => {
      apiTest = false;
    }
  }, [modify])

  // method to update search text in state
  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  }

  // filter the data based on search text
  const filteredData = data.filter(item => {

    // filter by search text
    const searchRegex = new RegExp(searchText, 'i');
    return item?.serial_number.match(searchRegex);
  });

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setId(null);
    setSerialNumber('');
    setOpen(false);
  };


  return (
    <Grid
      container
      direction='column' alignItems='center' justifyContent='flex-start'
      bgcolor='#eaf0f5'
      height='100vh'
      padding={10} gap={3}
    >
      <Grid item container direction='row-reverse'>
        <Grid item>
          <Button variant='contained' onClick={() => { navigate(-1) }}>Go Back</Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{id ? "Edit" : "Add"} Item</DialogTitle>
        <DialogContent>
          <Grid
            item
            container
            direction="column"
            alignItems='center'
            justifyContent='center'
            gap={1}
          >
            <Grid item>Type or Scan your Serial Number</Grid>
            <Grid item width="250px">
              <TextField
                fullWidth
                value={serialNumber}
                size="small"
                InputProps={{
                  style: {
                    backgroundColor: "#fff",
                  },
                }}
                onChange={(e) => {
                  setSerialNumber(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            if (id)
              updateItem({ id: id, serial_number: serialNumber }).then(() => {
                setModify(!modify);
                handleClose();
              })
            else
              addItem({ serial_number: serialNumber, product_type_id: productId }).then(() => {
                setModify(!modify);
                handleClose();
              })
          }}>{id ? "Edit" : "Add"}</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* Add ProductType */}
      <Grid item gap={1}>
        <Button
          variant="contained"
          sx={{ textTransform: 'none' }}
          onClick={() => { setId(null); setSerialNumber(''); handleClickOpen() }}>
          Add Item
        </Button>
      </Grid>

      {/* search text input */}
      <Grid item container justifyContent='center' alignItems='center' gap={1}>
        <Grid item>Search by Serial Number</Grid>
        <Grid item width="250px">
          <TextField
            fullWidth
            size="small"
            InputProps={{
              style: {
                backgroundColor: "#fff",
              },
            }}
            value={searchText} onChange={handleSearchTextChange}
          />
        </Grid>
      </Grid>

      {/* table */}
      <Grid item container
        direction='column' alignItems='center' justifyContent='center'
        padding={5}
        gap={1}
        sx={{
          boxShadow: '0 6px 12px 0 rgba(0, 0, 0, 0.16)',
          border: 'solid 1px #eaf0f5',
          borderRadius: 5,
          backgroundColor: '#fff',
          width: '500px'
        }}>
        <table style={{
          borderCollapse: 'collapse',
          width: '100%',
        }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>ID</th>
              <th style={{ textAlign: 'center' }}>Serial Number</th>
              <th style={{ textAlign: 'center' }}>Sold</th>
              <th style={{ textAlign: 'center' }}>Options</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map(item => (
              <tr key={item?.id}>
                <td style={{ textAlign: 'center', cursor: 'pointer' }}>{item?.id}</td>
                <td style={{ textAlign: 'center', cursor: 'pointer' }}>{item?.serial_number}</td>
                <td style={{ textAlign: 'center', cursor: 'pointer' }}>
                  <Checkbox checked={item?.is_sold} onClick={() => {
                    if (item?.is_sold === 0)
                      setIsSold({ id: item?.id }).then(() => setModify(!modify))
                    else
                      setIsNotSold({ id: item?.id }).then(() => setModify(!modify))
                  }} />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <Grid container alignItems='center' justifyContent='center' gap={1}>
                    <Grid item style={{ cursor: 'pointer' }} onClick={() => {
                      setId(item?.id);
                      getItemById(item?.id).then(x => {
                        if (x)
                          setSerialNumber(x[0].serial_number);
                      })
                      handleClickOpen();
                    }}><Edit sx={{ color: 'blueviolet' }} /></Grid>
                    <Grid item onClick={() => {
                      deleteItem(item?.id).then(() => setModify(!modify))

                    }}><Delete sx={{
                      color: "red",
                      cursor: 'pointer'
                    }} /></Grid>
                  </Grid>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Grid>
    </Grid >
  );
}
