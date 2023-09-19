const socket = new WebSocket("ws://localhost:8888");

socket.addEventListener("open", () => {
  console.log("open connection");
  socket.send("Hello Server!");
});

socket.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);
});
