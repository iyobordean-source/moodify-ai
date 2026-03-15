const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatContainer = document.getElementById("chatContainer");

chatForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = chatInput.value.trim();
  if (text === "") return;

  const messageDiv = document.createElement("div");
  messageDiv.className = "message me";

  const messageText = document.createElement("p");
  messageText.textContent = text;

  messageDiv.appendChild(messageText);
  chatContainer.appendChild(messageDiv);

  chatInput.value = "";
  chatContainer.scrollTop = chatContainer.scrollHeight;
});