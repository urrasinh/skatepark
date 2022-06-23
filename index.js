const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const expressFileUpload = require('express-fileUpload')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const secretKey = 'shhhh'

const { nuevoUsuario, getUsuarios } = require('./consultas') // import


// Middlewares
//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false})) // recibe carga img por formulario html
app.use(bodyParser.json()) // Recibe Payload de las consultas PUT POST 
app.use(express.static(__dirname + '/public')) // Contenido estatico en la carpeta public
app.use( // carga de archivo
    expressFileUpload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: "El peso del archivo que intentas subir supera el limite permitido",
})
)
//app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')) 
// configuracion de Handlebars
app.engine(
    'handlebars',
    exphbs.engine({
        defaultLayout: 'main',
        layoutsDir: `${__dirname}/views/mainLayout`,
    })
)
app.set('view engine', 'handlebars')

app.get('/', function (req, res) {
    res.render('Home')
})

// ruta login
app.get('/login', async (req, res) => {
    res.render('login')
})

app.get('/registro', function (req, res) {
    res.render('registro')
})

app.get('/datos', function (req, res) {
    res.render('datos')
})
/*
app.get('/admin', async (req, res) => {
    try {
        const usuarios = await getUsuarios()
        res.render('admin', { usuarios })
    } catch (error) {
        res.status(500).send({
            error: `Algo salio mal ${error}`,
            code: 500
        })

    }
})
*/

app.post("/", async (req, res)=> {
    const { email, nombre, pass1, experiencia, especialidad, foto } = req.body
    try {
        const usuario = await nuevoUsuario(email, nombre, pass1, experiencia, especialidad, foto)
        res.status(201).send(usuario)
    }catch (e){
        res.status(500).send({
            error:`¡Error! ${e}`,
            code: 500
        })
    }
})


app.listen(3000, () => console.log("El servidor está inicializado en el puerto 3000"))
