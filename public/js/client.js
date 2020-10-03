let socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => console.log('[WS] Connected');
socket.onclose = () => console.log('[WS] Closed');
socket.onmessage = (message) => {
    let data = JSON.parse(message.data);
    if(data.action == 'users') {
        $('#users').children('.user').remove();
        
        data.users.forEach(ip => {
            let userClass = $(`
            <div class="user">
                <img class="userIcon" src="https://i.pinimg.com/originals/04/7d/fc/047dfc2552d91ae45f5c5362e71f4e43.gif">
                <span class="title">${ip || 'Unknown'}</span>
            </div>
            `);

            $('#users').append(userClass);
        });
    }

    if(data.action == 'messages') {
        data.messages.forEach(msg => {
            let msgClass = $(`
            <div class="message">
                <img class="messageIcon" src="https://i.pinimg.com/originals/04/7d/fc/047dfc2552d91ae45f5c5362e71f4e43.gif">
                <div class="messageContentWrapper">
                    <div class="messageAuthor">${msg.author || 'Unknown'}</div>
                    <div class="messageContent">${msg.content}</div>
                </div>
            </div>
            `);
            $('#messages').append(msgClass);
        });
    }

    if(data.action == 'message') {
        let msgClass = $(`
        <div class="message">
            <img class="messageIcon" src="https://i.pinimg.com/originals/04/7d/fc/047dfc2552d91ae45f5c5362e71f4e43.gif">
            <div class="messageContentWrapper">
                <div class="messageAuthor">${data.message.author || 'Unknown'}</div>
                <div class="messageContent">${data.message.content}</div>
            </div>
        </div>
        `);

        $('#messages').append(msgClass);
    }
}

$(document).on('keydown', async (event) => {
    if(event.key == 'Enter') send();
});

$('#send').on('click', event => {
    send();
});

function send() {
    let input = $('#text');
    let text = input.val();
    if(!text || text.length < 1) return;

    socket.send(JSON.stringify({
        action: 'message',
        content: text
    }));

    input.val('');
}