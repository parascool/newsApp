const socket = io();

const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const messages = document.getElementById('messages');

const userId = `user_${Math.random().toString(36).substring(7)}`;

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = messageInput.value;

  socket.emit('sendMessage', { userId, message });

  messageInput.value = '';
  messageInput.focus();
});

socket.on('message', ({ userId: senderId, message }) => {
  const side = senderId === userId ? 'right' : 'left';
  addMessage(message, side);
});

function addMessage(message, side) {
  const div = document.createElement('div');
  div.classList.add('message', side);
  div.innerText = message;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}
