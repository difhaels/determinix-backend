const cors = require('cors');
const express = require('express');
const connectDB = require('./database/db');
const Member = require('./models/member');
const Project = require('./models/project');
const Activities = require('./models/activities');
const Articles = require('./models/articles');

const app = express();
const PORT = 5000;

app.use(cors());

// Koneksi ke database
connectDB();

// Middleware untuk parsing JSON
app.use(express.json());

// Endpoint untuk mendapatkan data anggota
app.get('/members', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint untuk mendapatkan project beserta anggota yang terhubung
app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().populate('members'); // Populate untuk menampilkan data member
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint untuk mendapatkan Activities
app.get('/activities', async (req, res) => {
  try {
    const projects = await Activities.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint untuk mendapatkan articles
app.get('/articles', async (req, res) => {
  try {
    const projects = await Articles.find().populate('writer');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint untuk mendapatkan member berdasarkan ID
app.get('/member/:id', async (req, res) => {
  const { id } = req.params; // Mendapatkan ID dari parameter URL
  try {
    // Menemukan proyek berdasarkan ID dan meng-populate data anggota
    const project = await Member.findById(id);
    
    if (!project) {
      return res.status(404).json({ message: 'Member not found' });
    }
    
    res.json(project); // Mengirimkan data proyek sebagai respons
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint untuk mendapatkan project berdasarkan ID
app.get('/projects/:id', async (req, res) => {
  const { id } = req.params; // Mendapatkan ID dari parameter URL
  try {
    // Menemukan proyek berdasarkan ID dan meng-populate data anggota
    const project = await Project.findById(id).populate('members');
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project); // Mengirimkan data proyek sebagai respons
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint untuk mendapatkan activity berdasarkan ID
app.get('/activities/:id', async (req, res) => {
  const { id } = req.params; // Mendapatkan ID dari parameter URL
  try {
    // Menemukan proyek berdasarkan ID
    const activity = await Activities.findById(id)
    
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    
    res.json(activity); // Mengirimkan data proyek sebagai respons
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint untuk mendapatkan articles berdasarkan ID
app.get('/articles/:id', async (req, res) => {
  const { id } = req.params; // Mendapatkan ID dari parameter URL
  try {
    // Menemukan proyek berdasarkan ID
    const activity = await Articles.findById(id).populate('writer');
    
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    
    res.json(activity); // Mengirimkan data proyek sebagai respons
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// endpoint untuk mendapatkan member projects berdasarkan ID member (MP = Member Project)
app.get('/mp/:id', async (req, res) => {
  const { id } = req.params; // minta id dari url frontend
  try {
    const projects = await Project.find({ members: id }).populate("members");
    if (!projects) {
      return res.status(404).json({ message: 'Projects by this member is not found' });
    }
    res.json(projects);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
});

// endpoint untuk mendapatkan member articles berdasarkan ID member (MA = Member Article)
app.get('/ap/:id', async (req, res) => {
  const { id } = req.params; // minta id dari url frontend
  try {
    const articles = await Articles.find({ writer: id }).populate("writer");
    if (!articles) {
      return res.status(404).json({ message: 'Articles by this member is not found' });
    }
    res.json(articles);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
