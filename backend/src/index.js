const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory "database" for now
let feedbacks = [];

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "API is running" });
});

// Create feedback
app.post("/api/feedback", (req, res) => {
  const { name, email, message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const newFeedback = {
    id: feedbacks.length + 1,
    name: name || "Anonymous",
    email: email || null,
    message,
    createdAt: new Date().toISOString(),
  };

  feedbacks.push(newFeedback);
  res.status(201).json(newFeedback);
});

// List feedback
app.get("/api/feedback", (req, res) => {
  res.json(feedbacks);
});

// Get single feedback by id
app.get("/api/feedback/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const fb = feedbacks.find((f) => f.id === id);
  if (!fb) {
    return res.status(404).json({ error: "Not found" });
  }
  res.json(fb);
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
