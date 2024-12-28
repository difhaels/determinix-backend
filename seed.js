const mongoose = require('mongoose');
const Articles = require('./models/articles'); // Asumsi Anda memiliki model Project

const articlesData = [
  {
    title: "Articles 01",
    writer: [
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0ba"),
    ],
    date: "May 18, 2023",
    type: "GENERAL",
    short:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem a voluptas, dicta ex reprehenderit ullam?",
    img: "/assets/lepy.png",
  },
  {
    title: "Articles 02",
    writer: [
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0bc"),
    ],
    date: "May 18, 2023",
    type: "GENERAL",
    short:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem a voluptas, dicta ex reprehenderit ullam?",
    img: "/assets/lepy.png",
  },
  {
    title: "Articles 03",
    writer: [
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0ba"),
      new mongoose.Types.ObjectId("676e43065c3d5e7d283dc0bb"), // ID Member 2
    ],
    date: "May 18, 2023",
    type: "GENERAL",
    short:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem a voluptas, dicta ex reprehenderit ullam?",
    img: "/assets/lepy.png",
  },
];


const insertProjects = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/determinix', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const result = await Articles.insertMany(articlesData);
    console.log('Projects inserted:', result);

    mongoose.disconnect(); // Tutup koneksi setelah selesai
  } catch (error) {
    console.error('Error inserting projects:', error.message);
  }
};

insertProjects();
