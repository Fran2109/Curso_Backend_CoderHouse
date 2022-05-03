import './App.css';
import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Table, Button } from 'reactstrap';

const App = () => {
  const [data, setData] = useState([]);
  const [producto, setProducto] = useState({
      title: '',
      price: '',
      thumbnail: ''
  })
  const [id, setId] = useState();

  const getData = () => {
    axios.get('http://localhost:8080/api/productos/')
    .then(res => {
      setData(res.data);
    })
    .catch((error) => {
        console.log(error);
    })
  }

  useEffect(() => {
    getData();
  }, []);

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:8080/api/productos/${id}`)
    .then(res => {
      getData();
    })
    .catch((error) => {
        console.log(error);
    })
  }

  const handleInputChange = (event) => {
    setProducto({
        ...producto,
        [event.target.name] : event.target.value
    })
  }

  const enviarDatos = (event) => {
    event.preventDefault()
    !id ?
      axios.post('http://localhost:8080/api/productos/', producto)
      .then(res => {
        getData();
        setProducto({
          title: '',
          price: '',
          thumbnail: ''
        })
      })
      .catch((error) => {
        console.log(error);
      })
      :
      axios.put(`http://localhost:8080/api/productos/${id}`, producto)
      .then(res => {
        getData();
        setProducto({
          title: '',
          price: '',
          thumbnail: ''
        })
        setId();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const editProduct = (id) => {
    axios.get(`http://localhost:8080/api/productos/${id}`)
    .then(res => {
      setProducto({
        title: res.data.title,
        price: res.data.price,
        thumbnail: res.data.thumbnail
      })
      setId(id);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className="App">
      <Fragment>
        <h1 style={{width: "500px"}}>Formulario</h1>
        <form className="column" onSubmit={enviarDatos} style={{width: "500px"}}>
            <div className="col-md">
              <label>Titulo</label>
              <input type="text" placeholder='Titulo' value={producto.title} className="form-control" onChange={handleInputChange} name="title"></input>
            </div>
            <div className="col-md">
              <label>Precio</label>
              <input type="text" placeholder='Precio' value={producto.price} className="form-control" onChange={handleInputChange} name="price"></input>
            </div>
            <div className="col-md">
              <label>Thumbnail</label>
              <input type="text" placeholder='Thumbnail' value={producto.thumbnail} className="form-control" onChange={handleInputChange} name="thumbnail"></input>
            </div>
            {
              producto.title.length > 0 && producto.price.length > 0 && producto.thumbnail.length > 0?
              <button type="submit" className="btn btn-primary" style={{marginTop:"10px"}}>
                {!id? "Enviar" : "Editar"}
              </button>
              :
              <button type="submit" className="btn btn-primary" style={{marginTop:"10px"}} disabled>
                {!id? "Enviar" : "Editar"}
              </button>
            }
            
        </form>
      </Fragment>
      <div className="table-wrapper">
        <Table striped bordered hover style={{width: "auto"}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Thumbnail</th>
              <th style={{width:"150px"}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.thumbnail}</td>
                <td className="celdaAcciones" >
                  <Button color="primary" onClick={() => editProduct(item.id)}>Edit</Button>
                  <Button color="danger" onClick={() => deleteProduct(item.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;
