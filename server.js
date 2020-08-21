const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require('./data')



server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure('views', {
    express: server,
    noCache: true
})

server.get("/", function (req, res) {
    const about = {
        avatar_url: "https://avatars0.githubusercontent.com/u/58923275?s=460&u=e60a6a2e08854dce1a3cf06c61da8bf4832170b9&v=4",
        name: "Vinícius Dos Santos Paixao",
        role: "Desenvolvedor Web",
        description: "Programador web, com foco no full-stack",
        links: [
            { name: "Github", url: "https://github.com/vinicius3g" },
            { name: "Linkedin", url: "https://github.com/vinicius3g" },
            { name: "Facebook", url: "https://github.com/vinicius3g" }
        ]
    }
    return res.render("about", { about })
})
server.get("/portifolio", function (req, res) {
    return res.render("portifolio", { items: videos })
})

server.get("/video", function (req, res) {
    const id = req.query.id

    const video = videos.find(function (video) {
        video.id === id
    })

    if (!video) {
        return res.send('video not found')
    }

    return res.render("video", {item: video})
})

server.listen(5000, function () {
    console.log('server is running')
})