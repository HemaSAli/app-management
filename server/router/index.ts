import express from 'express';
import appointmentsRouter from './appointments';
import patientsRouter from './patients';

const router = express.Router();
router.get('/', (_, res) => {
  res.send('Hello World - API');
});

router.use('/patients', patientsRouter);
router.use('/appointments', appointmentsRouter);

export default router;
