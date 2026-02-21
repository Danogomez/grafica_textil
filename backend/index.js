const express = require('express')
const cors = require('cors')
require('dotenv').config()
const pool = require('./db')
const productosRouter = require('./routes/productos')
const contactoRouter = require('./routes/contacto')


const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.use('/api/productos', productosRouter)
app.use('/api/contacto', contactoRouter)

app.get('/', (req, res) => {
  res.json({ mensaje: 'Servidor Gráfica Textil funcionando!' })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})