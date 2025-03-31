import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import propertyRoutes from './routes/propertyRoutes.js';

// Load environment variables
dotenv.config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Logging in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ status: 'ok', message: 'API is working!' });
});

// Routes
app.use('/api/properties', propertyRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// **CHANGE: Port Handling for Railway**
const PORT = process.env.PORT || 5000;  // Railway assigns a dynamic port
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

export default app;
