const WebSocket = require('ws')
const mysql = require('mysql2')
const http = require('http')

const http_server = http.createServer()

const server = new WebSocket.Server({
    port: 3000
})

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "gong",
    password: "21xolbek2001"
}).promise()

const sendMessage = (ws, event_id, data) => {
    ws.send(JSON.stringify({
        event_id: event_id,
        data: data
    }))
}

server.on('connection', ws => {
    sendMessage(ws, 1, {
        message: 'Добро пожаловать!'
    })

    db.query("SELECT * FROM messages").then(([rows, fields]) => {
        for (let row in rows) {
            if (rows.hasOwnProperty(row)) {
                let message = rows[row]
                message.message = JSON.parse(message.message)
                sendMessage(ws, 2,{
                        user_id: message.user_id,
                        user_name: message.user_name,
                        user_full_name: message.user_full_name,
                        message: message.message
                    }
                )
            }
        }
    })

    ws.on('message', message => {
        let event = JSON.parse(message);
        if (event.event_id === 2) {
            db.query("INSERT INTO messages (id, user_id, user_name, user_full_name, message) VALUES (?, ?, ?, ?, ?)", [
                null,
                event.data.user_id,
                event.data.user_name,
                event.data.user_full_name,
                JSON.stringify({
                    text: event.data.message.text,
                })
            ]).then()
            server.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                        event_id: event.event_id,
                        data: {
                            user_id: event.data.user_id,
                            user_name: event.data.user_name,
                            user_full_name: event.data.user_full_name,
                            message: {
                                text: event.data.message.text,
                            }
                        }
                    }))
                }
            })
        }
    })

})