import express from 'express';
import cors from 'cors';
import { authorRouter } from './author/author.router';


const PORT: number = parseInt(process.env.PORT || '8000', 10);

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use('/api/authors', authorRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
