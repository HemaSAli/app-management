import { generateClientTokenFromReadWriteToken, put } from '@vercel/blob/client';
import { eq } from 'drizzle-orm';
import express from 'express';
import multer from 'multer';
import { db } from '../db/connection';
import { appointments, patients, type NewPatient } from '../db/schema';

const patientsRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

patientsRouter.post('/photo', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { buffer, originalname, mimetype } = req.file;
    const pathname = `${Date.now()}-${originalname}`;

    const clientToken = await generateClientTokenFromReadWriteToken({
      pathname
    });

    const newBlob = await put(pathname, buffer, {
      access: 'public',
      token: clientToken,
      contentType: mimetype
    });

    res.status(200).json({ data: newBlob });
  } catch {
    res.status(500).json({ message: 'Failed to upload photo' });
  }
});

patientsRouter.get('/', async (_, res) => {
  try {
    const allPatients = await db.select().from(patients);
    res.json({ data: allPatients });
  } catch (error) {
    console.log(error);
    console.log('Failed to fetch patients');
    res.status(500).json({ message: 'Failed to fetch patients' });
  }
});

patientsRouter.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid patient ID' });
    }

    const patient = await db.select().from(patients).where(eq(patients.id, id));

    if (patient.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Fetch appointments for this patient
    const patientAppointments = await db.select().from(appointments).where(eq(appointments.patientId, id));

    res.json({
      data: {
        ...patient[0],
        appointments: patientAppointments
      }
    });
  } catch {
    res.status(500).json({ message: 'Failed to fetch patient' });
  }
});

/// In case we have more fields, we can use Yup/Zod to validate the data
//  which help return a better error message to the user
patientsRouter.post('/', async (req, res) => {
  try {
    const { fullName, address, photo } = req.body;

    if (!fullName) {
      return res.status(400).json({ message: 'Full name is required' });
    }

    if (!address) {
      return res.status(400).json({ message: 'Address is required' });
    }

    const newPatient: NewPatient = {
      fullName,
      address: address || null,
      photo: photo || null
    };

    const [patient] = await db.insert(patients).values(newPatient).returning();
    res.status(201).json(patient);
  } catch {
    res.status(500).json({ message: 'Failed to create patient' });
  }
});

patientsRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const patientId = parseInt(id);

    if (isNaN(patientId)) {
      return res.status(400).json({ message: 'Invalid patient ID' });
    }

    // Delete the patient - appointments will be automatically deleted due to CASCADE
    await db.delete(patients).where(eq(patients.id, patientId));

    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete patient' });
  }
});
export default patientsRouter;
