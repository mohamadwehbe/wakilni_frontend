import React, { useState, useEffect } from 'react';
import * as services from '../Services/wakilni-services.proxy';
import { Button, Grid, TextField } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import img1 from '../Assets/LEGO.jpg';
import img2 from '../Assets/helicopter.png';
import img3 from '../Assets/truck.jpg';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


const getProductTypes = services.getProducts;
const addProduct = services.CreateProduct;
const updateProduct = services.UpdateProduct;
const getProductById = services.getProductById;
const deleteProduct = services.DeleteProduct;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductTypes() {

  const [name, setName] = useState('')
  const [modify, setModify] = useState(false)
  const [id, setId] = useState(null);

  const [data, setData] = useState([]); // your data array
  const [searchText, setSearchText] = useState(''); // for search text input

  // simulate fetching data on component mount
  useEffect(() => {
    let apiTest = true;
    getProductTypes().then(x => {
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
    return item?.name.match(searchRegex);
  });

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setId(null);
    setName('');
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
          <Button variant='contained' onClick={() => { localStorage.clear(); navigate('/login') }}>Log Out</Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{id ? "Edit" : "Add"} ProductType</DialogTitle>
        <DialogContent>
          <Grid
            item
            container
            direction="column"
            alignItems='center'
            justifyContent='center'
            gap={1}
          >
            <Grid item>Name</Grid>
            <Grid item width="250px">
              <TextField
                fullWidth
                value={name}
                size="small"
                InputProps={{
                  style: {
                    backgroundColor: "#fff",
                  },
                }}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            if (id)
              updateProduct({ id: id, name: name, image: 'image.png' }).then(() => {
                setModify(!modify);
                handleClose();
              })
            else
              addProduct({ name: name, image: 'image.png' }).then(() => {
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
          onClick={() => { setId(null); setName(''); handleClickOpen() }}>
          Add ProductType
        </Button>
      </Grid>

      {/* search text input */}
      <Grid item container justifyContent='center' alignItems='center' gap={1}>
        <Grid item>Search by Name</Grid>
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
              <th style={{ textAlign: 'center' }}>Name</th>
              <th style={{ textAlign: 'center' }}>Image</th>
              <th style={{ textAlign: 'center' }}>Items Count</th>
              <th style={{ textAlign: 'center' }}>Options</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map(item => (
              <tr key={item?.id}>
                <td style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => {
                  navigate(`/items?ProductId=${item?.id}`)
                }}>{item?.id}</td>
                <td style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => {
                  navigate(`/items?ProductId=${item?.id}`)
                }}>{item?.name}</td>
                <td style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => {
                  navigate(`/items?ProductId=${item?.id}`)
                }}><img width='100px' src={item?.image && item?.id % 2 === 0 ? img1 : item?.image && item?.id % 5 === 0 ? img2 : img3} alt='img' /></td>
                <td style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => {
                  navigate(`/items?ProductId=${item?.id}`)
                }}>{item?.items.filter(i => i.is_sold === 0).length}</td>
                <td style={{ textAlign: 'center' }}>
                  <Grid container alignItems='center' justifyContent='center' gap={1}>
                    <Grid item style={{ cursor: 'pointer' }} onClick={() => {
                      setId(item?.id);
                      getProductById(item?.id).then(x => {
                        if (x)
                          setName(x[0].name);
                      })
                      handleClickOpen();
                    }}><Edit sx={{ color: 'blueviolet' }} /></Grid>
                    <Grid item onClick={() => {
                      if (item?.items.filter(i => i.is_sold === 0).length === 0) {
                        deleteProduct(item?.id).then(() => setModify(!modify))
                      }
                    }}><Delete sx={{
                      color: item?.items.filter(i => i.is_sold === 0).length === 0 ? "red" : "gray",
                      cursor: item?.items.filter(i => i.is_sold === 0).length === 0 ? 'pointer' : 'unset'
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
