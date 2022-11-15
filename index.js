const Contenedor = require('./Contenedor');
const fs = require('fs');
let express = require('express');
const PORT = 8080;
let app = express();
const archivo = new Contenedor('productos.json')



app.get('/', (req, res) => {
    res.send(`<h1 style="color:rgb(255, 110, 146);text-align:center">Bienvenido a Frater Solis - Cosmética Natural<h1>
    <button><a href="http://localhost:8080/products">Productos</a></button>
    <button><a href="http://localhost:8080/productosRandom">Productos al Azar</a></button>
    `)
})

app.get('/products', async (req, res) => {
    let getAllProds = await archivo.getAll()
    res.send(`<h1 style="color:rgb(255, 110, 146);text-align:center">Lista de Productos<h1>
    <p style="display:flex;justify-content:center;color:green;text-align:center">${JSON.stringify(getAllProds)}<p>
    <button><a href="http://localhost:8080/">Inicio</a></button>
    <button><a href="http://localhost:8080/productosRandom">Productos al Azar</a></button>`)
})
app.get('/productosRandom', async (req, res, next) => {
    let getAllProds = await archivo.getAll()
    res.send(`<h1 style="color:rgb(255, 110, 146);text-align:center;justify-content:center">Productos al azar<h1>
    <p style="display:flex;justify-content:center; text-align:center;color:green">${JSON.stringify(getAllProds[Math.floor(Math.random()*getAllProds.length)])}<p>
    <button><a href="http://localhost:8080/productosRandom">Presionar para ver otro producto al azar</a></button>
    <button><a href="http://localhost:8080/products">Productos</a></button>
    <button><a href="http://localhost:8080/">Inicio</a></button>`)
})

let connected_server = app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`))
connected_server.on('error', error => console.log(error))
