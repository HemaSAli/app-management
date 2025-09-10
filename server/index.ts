import express from 'express';
import './db/connection';
import router from './router';
const app = express();

app.use(express.json());
app.use('/api', router);

app.get('/hello', (_, res) => {
  res.send('Hello Vite + React + TypeScript!');
});

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
export default app;
