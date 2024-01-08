const { Server } = require("socket.io");

// Create a new instance of the Socket.IO server
const io = new Server({
    cors: {
        origin: "*",
    },
});

// Define constants for events
const CONNECTION = "connection";
const MESSAGE_EVENT = "message";

// Event handler for when a new user connects
io.on(CONNECTION, (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Event handler for when a user joins the chat
  socket.on(CONNECTION, (data) => {
    // Handle user joining chat (you may implement more complex logic here)
    console.log(`User ${socket.id} joined the chat as ${data.userType}`);
  });

  // Event handler for incoming messages
  socket.on(MESSAGE_EVENT, (data) => {
    const { targetSocketId, message } = data;
    // Send the private message to the target user
    io.to(targetSocketId).emit(MESSAGE_EVENT, { senderSocketId: socket.id, message })
  });

  // Event handler for when a user disconnects
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Export the Socket.IO instance for external use
module.exports = {
    io,
};
