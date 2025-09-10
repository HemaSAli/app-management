import express from 'express';
import appointmentsRouter from './appointments';
import patientsRouter from './patients';

const router = express.Router();
router.get('/', (_, res) => {
  res.status(400).end();
});

router.use('/patients', patientsRouter);
router.use('/appointments', appointmentsRouter);

router.use('*', (_, res) => {
  res.status(400).end();
});

export default router;
