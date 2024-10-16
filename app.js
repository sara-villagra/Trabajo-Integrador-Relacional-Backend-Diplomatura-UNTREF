//const contenidoRoutes = require('./routes/contenidoRoutes')
const { Contenido } = require('./models/contenido.js')
const { Actor } = require('./models/actor.js')
const { Contenido_Actores } = require('./models/contenido_actores.js')
const { sequelize } = require('./conexion/database')
const express = require('express')
const contenidoRouters = require('./routes/contenidoRoutes.js')
const actorRouter = require('./routes/actorRouter.js')
const contenidoActorRouters = require('./routes/contenidoActorRouters.js')
const { Contenido_Genero } = require('./models/contenido_genero.js')
const contenidoGeneroRouter = require('./routes/contenidoGeneroRouter.js')
const contenidoBusquedaRouter = require('./routes/contenidoBusquedaRouter.js')
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
  await Actor.sync()
  await Contenido_Actores.sync()
  await Contenido_Genero.sync()
  next()
 } catch (error) {
  console.error('No se pudo conectar con la base de datos:', error)
 }
})

app.get('/', (req, res) => {
 res.send('Bienvenido a TrailerFlix!')
})
app.use(
 '/contenido',
 contenidoRouters,
 actorRouter,
 contenidoActorRouters,
 contenidoGeneroRouter,
 contenidoBusquedaRouter
)

//Middleware para rutas no encontradas 404
app.use((req, res) => {
 res.status(404).send('<h1>404 página no encontrada upps! =(</h1>')
})

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`)
})
