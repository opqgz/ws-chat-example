let socket = new WebSocket('ws://localhost:8080/gateway');

socket.onopen = () => console.log('[WS] Connected');
socket.onclose = () => console.log('[WS] Closed');
socket.onmessage = (message) => {
    console.log(message);
}