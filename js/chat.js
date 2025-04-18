document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // Показываем сообщение пользователя
        const userDiv = document.createElement('div');
        userDiv.textContent = `Вы: ${message}`;
        chatMessages.appendChild(userDiv);

        userInput.value = '';

        try {
            // Отправляем запрос к прокси (ЗАМЕНИТЕ URL НА СВОЙ!)
            const response = await fetch('https://my-chat-proxy.dbolrad.workers.dev', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }

            const data = await response.json();
            const botDiv = document.createElement('div');
            botDiv.textContent = `Бот: ${data.reply}`;
            chatMessages.appendChild(botDiv);

            // Автоскролл
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } catch (error) {
            const errorDiv = document.createElement('div');
            errorDiv.style.color = 'red';
            errorDiv.textContent = `Ошибка: ${error.message}`;
            chatMessages.appendChild(errorDiv);
        }
    }

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});
