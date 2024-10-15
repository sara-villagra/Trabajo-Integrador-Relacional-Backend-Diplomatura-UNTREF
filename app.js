//const contenidoRoutes = require('./routes/contenidoRoutes')
const { Contenido } = require('./models/contenido.js')
const { sequelize } = require('./conexion/database')
const express = require('express')
const contenidoRouters = require('./routes/contenidoRoutes.js')
const app = express()
const PORT = process.env.PORT || 3000
app.disable('x-powered-by')
// Middlewares json
app.use(express.json())

//crea middleware de conexion y verificacion:

app.use(async (req, res, next) => {
 try {
  await sequelize.authenticate()
  console.log('Conexión establecida con éxito!')
  await sequelize.sync()
  await Contenido.sync()
  next()
 } catch (error) {
  console.error('No se pudo conectar con la base de datos:', error)
 }
})

app.get('/', (req, res) => {
 res.send('Bienvenido a TrailerFlix!')
})
app.use('/contenido', contenidoRouters)
//Middleware para rutas no encontradas 404
app.use((req, res) => {
 res.status(404).send('<h1>404 página no encontrada la puta madre, =(</h1>')
})

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`)
})
