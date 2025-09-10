import { eq } from 'drizzle-orm';
import express from 'express';
import { db } from '../db/connection';
import { appointments, patients, type NewAppointment } from '../db/schema';

const appointmentsRouter = express.Router();

appointmentsRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await db
      .select()
      .from(appointments)
      .where(eq(appointments.id, parseInt(id)));

    if (appointment.length === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    await db.delete(appointments).where(eq(appointments.id, parseInt(id)));
    res.status(200).end();
  } catch {
    res.status(500).json({ message: 'Failed to delete appointment' });
  }
});

appointmentsRouter.post('/', async (req, res) => {
  try {
    const { patientId, date, time, dentist, treatment } = req.body;
    // Zod validation here
    if (!patientId || !date || !time || !dentist || !treatment) {
      return res.status(400).json({
        message: 'All fields are required: patientId, date, time, dentist, treatment'
      });
    }

    // Validate patientId is a number
    const patientIdNum = parseInt(patientId);
    if (isNaN(patientIdNum)) {
      return res.status(400).json({ message: 'Invalid patient ID' });
    }

    // Check if patient exists
    const patient = await db.select().from(patients).where(eq(patients.id, patientIdNum));

    if (patient.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const newAppointment: NewAppointment = {
      patientId: patientIdNum,
      date,
      time,
      dentist,
      treatment
    };

    const [appointment] = await db.insert(appointments).values(newAppointment).returning();
    res.status(201).json({ data: appointment });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: 'Failed to create appointment' });
  }
});

export default appointmentsRouter;
