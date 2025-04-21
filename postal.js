document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.querySelector(".submit-btn");
    const notificationBtn = document.querySelector(".notification");
    const chatOverlay = document.querySelector(".chat-overlay");
    const chatMessages = document.querySelector(".chat-messages");
  
    const receiverInput = document.querySelector("input[name='receiver']");
    const addressInput = document.querySelector("input[name='address']");
    const packageSelect = document.querySelector("select[name='package-type']");
  
    let hasNewMessage = false;
  
    submitBtn.addEventListener("click", () => {
      const receiver = receiverInput.value;
      const address = addressInput.value;
      const packageType = packageSelect.value;
  
      if (!receiver || !address || !packageType) {
        alert("Please fill out all fields.");
        return;
      }
  
      const message = document.createElement("div");
      message.classList.add("chat-message");
      message.innerHTML = `
        <div><strong>Label sent to your user-email</strong></div>
        <div>${receiver}, ${address}, ${packageType}</div>
      `;
      chatMessages.appendChild(message);
  
      // Scroll to newest message
      chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: "smooth" });
  
      // Add red dot
      notificationBtn.classList.add("new-msg");
      hasNewMessage = true;
  
      // Clear input fields
      receiverInput.value = "";
      addressInput.value = "";
      packageSelect.selectedIndex = 0;
    });
  
    notificationBtn.addEventListener("click", () => {
      const isHidden = chatOverlay.classList.contains("hidden");
  
      if (isHidden) {
        chatOverlay.classList.remove("hidden");
  
        // Remove red dot when opening
        if (hasNewMessage) {
          notificationBtn.classList.remove("new-msg");
          hasNewMessage = false;
        }
  
        // Scroll to bottom when opening
        chatMessages.scrollTo({ top: chatMessages.scrollHeight });
      } else {
        chatOverlay.classList.add("hidden");
      }
    });
  
    // Simulate receiving a new message 15 seconds after the page loads
    setTimeout(() => {
      const newMessage = document.createElement("div");
      newMessage.classList.add("chat-message");
      newMessage.innerHTML = `
        <div><strong>Your package arrived</strong></div>
        <div>collect at Welthandelsplatz 2, Vienna</div>
      `;
      chatMessages.appendChild(newMessage);
  
      // Scroll to the newest message
      chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: "smooth" });
  
      // Show the notification (add the red dot)
      notificationBtn.classList.add("new-msg");
      hasNewMessage = true;
    }, 10000); // 15 seconds = 15000 milliseconds
  
    // Redirect to index.html when the back button is clicked
    document.querySelector('.back').addEventListener('click', function() {
      window.location.href = 'index.html';
    });
  });