# 🦷 Appointment Management System

## 🚀 Tech Stack

### Frontend

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Routing**: React Router v7
- **Styling**: Tailwind CSS 4 + Shadcn/ui components
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios with custom interceptors for error handling

### Backend

- **Node.js with Express.js**
- **Database**: PostgreSQL with Drizzle ORM
- **File Storage**: Vercel Blob storage

### Development Tools

- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier
- **Git Hooks**: Husky + lint-staged

## 📊 Database Schema

### Patients Table

- `id`: Primary key (serial)
- `fullName`: Patient's full name (text)
- `address`: Patient's address (text, optional)
- `photo`: Photo URL (text, optional)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### Appointments Table

- `id`: Primary key (serial)
- `patientId`: Foreign key to patients table
- `date`: Appointment date (text)
- `time`: Appointment time (text)
- `dentist`: Dentist name (text)
- `treatment`: Treatment description (text)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## 🚀 Deployment

The application is configured for deployment on Vercel:

1. **Frontend**: Automatically deployed from the main branch
2. **Backend**: Deployed as Vercel serverless functions
3. **Database**: PostgreSQL on Vercel
4. **File Storage**: Vercel Blob storage for patient photos
