const mongoose = require('mongoose');
const Project = require('./models/project'); // Asumsi Anda memiliki model Project

const projectData = [
  {
    title: "Project 1",
    date: "22-08-2023",
    members: [
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0ba"), // ID Agung
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0bb"), // ID Member 2
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0bc"), // ID Member 3
    ],
    img: "/assets/lepy.png",
  },
  {
    title: "Project 2",
    date: "22-08-2023",
    members: [
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0ba"), // ID Agung
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0c1"), // ID Member 8
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0bd"), // ID Member 4
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0be"), // ID Member 5
    ],
    img: "/assets/lepy.png",
  },
  {
    title: "Project 3",
    date: "22-08-2023",
    members: [
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0ba"), // ID Agung
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0c0"), // ID Member 7
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0bd"), // ID Member 4
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0bf"), // ID Member 6
    ],
    img: "/assets/lepy.png",
  },
  {
    title: "Project 4",
    date: "22-08-2023",
    members: [
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0bb"), // ID Member 2
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0c0"), // ID Member 7
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0bd"), // ID Member 4
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0c1"), // ID Member 8
    ],
    img: "/assets/lepy.png",
  },
  {
    title: "Project 5",
    date: "22-08-2023",
    members: [
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0ba"), // ID Agung
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0bc"), // ID Member 3
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0bd"), // ID Member 4
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0bf"), // ID Member 6
    ],
    img: "/assets/lepy.png",
  },
  {
    title: "Project 6",
    date: "22-08-2023",
    members: [
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0be"), // ID Member 5
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0c0"), // ID Member 7
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0bf"), // ID Member 6
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0ba"), // ID Agung
    ],
    img: "/assets/lepy.png",
  },
];


const insertProjects = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/determinix', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const result = await Project.insertMany(projectData);
    console.log('Projects inserted:', result);

    mongoose.disconnect(); // Tutup koneksi setelah selesai
  } catch (error) {
    console.error('Error inserting projects:', error.message);
  }
};

insertProjects();
