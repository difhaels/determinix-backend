const mongoose = require('mongoose');
const Project = require('./models/project'); // Asumsi Anda memiliki model Project
const Activities = require('./models/Activities'); // Asumsi Anda memiliki model Project

const projectData = [
  {
    date: "June 18, 2023",
    title: "Activities 01",
    img: "/assets/lepy.png",
  },
  {
    date: "June 18, 2023",
    title: "Activities 02",
    img: "/assets/lepy.png",
  },
  {
    date: "June 18, 2023",
    title: "Activities 03",
    img: "/assets/lepy.png",
  },
  {
    date: "June 18, 2023",
    title: "Activities 04",
    img: "/assets/lepy.png",
  },
  {
    date: "June 18, 2023",
    title: "Activities 05",
    img: "/assets/lepy.png",
  },
  {
    date: "June 18, 2023",
    title: "Activities 06",
    img: "/assets/lepy.png",
  },
  {
    date: "June 18, 2023",
    title: "Activities 07",
    img: "/assets/lepy.png",
  },
  {
    date: "June 18, 2023",
    title: "Activities 08",
    img: "/assets/lepy.png",
  },
];


const insertProjects = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/determinix', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const result = await Activities.insertMany(projectData);
    console.log('Projects inserted:', result);

    mongoose.disconnect(); // Tutup koneksi setelah selesai
  } catch (error) {
    console.error('Error inserting projects:', error.message);
  }
};

insertProjects();
