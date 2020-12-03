document.title = "Чат";

const connection_status = $(".connection_status");
const messages_container = $(".messages_container");
const message_form = $(".message_form");

const ws = new WebSocket('ws://localhost:3000');

let setStatus = (value) => {
  connection_status.html(value);
}

let printMessage = (message) => {
    $(`
        <div class="media text-muted pt-3">
            <svg class="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
            <div class="media-body pb-3 mb-0 small lh-125 border-gray">
                <div class="d-flex justify-content-between align-items-center w-100">
                    <strong class="text-gray-dark">
                        ${message['user_full_name']}
                    </strong>
                </div>
                <span class="d-block">
                @${message['user_name']}
            </span>
                <div>
                    ${message['message']['text'].replace(/\n/g, '<br>')}
                </div>
            </div>
        </div>
    `).appendTo(messages_container);
}

ws.onopen = () => {
    setStatus('Подключен')
}

ws.onclose = () => {
    setStatus('Отключён')
}

ws.onerror = (error) => {
    console.log('Ошибка!');
}

ws.onmessage = (response) => {
    let event = JSON.parse(response.data);
    console.log(event);
    if (event.event_id === 1) {
        console.log(event.data.message);
    }else if (event.event_id === 2) {
        console.log(event.data);
        printMessage(event.data);
    }
}

message_form.on('submit', function (e) {
    e.preventDefault();
    let message = $(this).find('textarea');
    if (message.val().trim() === '') {
        alert('Текст сообщения не должен быть пустым!')
        return false;
    }
    ws.send(JSON.stringify({
        event_id: 2,
        data: {
            user_id: 1,
            user_name: "aishmurodov",
            user_full_name: "Абдурахмон Ишмуродов",
            message: {
                text: message.val()
            }
        }
    }));
    message.val("").trigger('change');
});