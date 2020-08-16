// Servidor
const express = require('express')
const server = express()

const {pageLanding,pageStudy,pageGiveClasses,saveClasses,pageSuccessProffy} = require('./pages')

//configurar nunjucks (templates engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

// Inicio e configuração do servidor
server
//receber os dados do req.body
.use(express.urlencoded({extended: true}))

// configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public"))
// rotas da aplicacao
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.get("/success-proffy", pageSuccessProffy)

.post("/save-classes", saveClasses)
// Start do servidor
.listen(5501)