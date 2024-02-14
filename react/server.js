import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World with Express and ES Modules!');
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
