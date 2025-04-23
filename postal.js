document.addEventListener('DOMContentLoaded', function () {
  const notification = document.querySelector('.notification');
  const chatOverlay = document.querySelector('.chat-overlay');
  const chatMessages = document.querySelector('.chat-messages');
  const backButton = document.querySelector('.back');
  const sendButton = document.querySelector('.send-button');
  const chatInput = document.querySelector('.chat-input');
  const submitButton = document.querySelector('.submit-btn');
  const receiverInput = document.querySelector('input[name="receiver"]');
  const addressInput = document.querySelector('input[name="address"]');
  const packageTypeSelect = document.querySelector('select[name="package-type"]');

  let hasNewMessage = false;

  // Submit form and add a new message container
  submitButton.addEventListener('click', function () {
    const receiver = receiverInput.value.trim();
    const address = addressInput.value.trim();
    const packageType = packageTypeSelect.value;

    if (!receiver || !address || !packageType) {
      alert('Please fill out all fields before submitting.');
      return;
    }

    const message = document.createElement('div');
    message.classList.add('chat-message', 'sender');
    message.innerHTML = `
      <div><strong>Label sent to your user-email</strong></div>
      <div>${receiver}, ${address}, ${packageType}</div>
    `;
    chatMessages.appendChild(message);

    chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });

    notification.classList.add('new-msg');
    hasNewMessage = true;

    receiverInput.value = '';
    addressInput.value = '';
    packageTypeSelect.selectedIndex = 0;
  });

  // Send manual chat message
  sendButton.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
  });

  function sendMessage() {
    const messageText = chatInput.value.trim();
    if (messageText === '') return;

    const message = document.createElement('div');
    message.classList.add('chat-message', 'sender');
    message.innerHTML = `<div>${messageText}</div>`;
    chatMessages.appendChild(message);
    chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });

    notification.classList.add('new-msg');
    hasNewMessage = true;

    chatInput.value = '';

    setTimeout(() => {
      const reply = document.createElement('div');
      reply.classList.add('chat-message', 'receiver');
      reply.innerHTML = `<div><strong>Thanks for your message!</strong></div><div>Our team will respond shortly.</div>`;
      chatMessages.appendChild(reply);
      chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });

      notification.classList.add('new-msg');
      hasNewMessage = true;
    }, 1000);
  }

  // Toggle chat overlay & handle red dot
  notification.addEventListener('click', function () {
    const isHidden = chatOverlay.classList.contains('hidden');

    if (isHidden) {
      chatOverlay.classList.remove('hidden');
      if (hasNewMessage) {
        notification.classList.remove('new-msg');
        hasNewMessage = false;
      }
      chatMessages.scrollTo({ top: chatMessages.scrollHeight });
    } else {
      chatOverlay.classList.add('hidden');
    }
  });

  // Go back button
  backButton.addEventListener('click', function () {
    chatOverlay.classList.add('hidden');
  });

  // Load example messages
  const exampleMessages = [
    { text: "Welcome to REWE-Postal! How can we help you today?", sender: "receiver" },
    { text: "I need to send a package to Vienna", sender: "sender" },
    { text: "Great! Please fill out the form with the recipient's details", sender: "receiver" },
    { text: "What are the shipping rates?", sender: "sender" },
    { text: "For a small package to Vienna, it would cost €2.99", sender: "receiver" },
    { text: "Can I track my package?", sender: "sender" },
    { text: "Yes, you'll receive a tracking number via email after submission", sender: "receiver" }
  ];

  exampleMessages.forEach(msg => {
    const message = document.createElement('div');
    message.classList.add('chat-message', msg.sender);
    message.innerHTML = `<div>${msg.text}</div>`;
    chatMessages.appendChild(message);
  });

  // Simulate receiving a new message after 10 seconds
  setTimeout(() => {
    const newMessage = document.createElement("div");
    newMessage.classList.add("chat-message", "receiver");
    newMessage.innerHTML = `
      <div><strong>Your package arrived</strong></div>
      <div>Collect it at Weltplatz 2, Vienna</div>
    `;
    chatMessages.appendChild(newMessage);

    chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: "smooth" });

    notification.classList.add("new-msg");
    hasNewMessage = true;
  }, 10000); // 10 seconds = 10000 ms
});
