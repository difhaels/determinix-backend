const express = require("express");
const app = express();
const PORT = 5000;

app.get("/test", (req, res) => {
  res.json({"users": ["one", "twoo", "tri"]})
})

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
