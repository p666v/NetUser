const
    usersTable = require('./winAPI/win'),
    path = require('path'),
    express = require('express')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'pug')

app.use(express.urlencoded({ extended: true }))

app.route('/').get((req, res) => {
    res.render('index', {
        'title': 'Веб-приложение'
    })
})

app.route('/users').post((req, res) => {
    let name = req.body.name

    usersTable((userName) => {
        res.render('users', {
            'title': `Пользователь ${name}`,
            'value': userName.indexOf(name),
            'name': name
        })
    })
})

const PORT = 3000

const server = app.listen(PORT, () => {
    console.log('Server started: http://localhost:${PORT}')
})