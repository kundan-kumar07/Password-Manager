const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/Password_Manager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.log(" MongoDB connection error", err));

// Schema
const passwordSchema = new mongoose.Schema({
  url: String,
  username: String,
  password: String
});

// Model
const Password = mongoose.model('Password', passwordSchema);

// Test Route
app.get('/', (req, res) => {
  res.send('hello');
});

// ✅ Create
app.post('/add', async (req, res) => {
  const { url, username, password } = req.body;

  try {
    const newEntry = new Password({ url, username, password });
    await newEntry.save();
    res.status(201).json({ message: "Password entry saved", data: newEntry });
  } catch (err) {
    res.status(500).json({ error: "Failed to save entry" });
  }
});

//  Read
app.get('/passwords', async (req, res) => {
  try {
    const all = await Password.find();
    res.status(200).json(all);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch entries" });
  }
});

//  Update
app.put('/update/:id', async (req, res) => {
  try {
    const updated = await Password.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Updated successfully", data: updated });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

//  Delete
app.delete('/delete/:id', async (req, res) => {
  try {
    await Password.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

// Server Listen
app.listen(4000, () => {
  console.log(' Server is running on port 4000');
});
