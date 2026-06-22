const express = require('express');
const cors = require('cors');

const app = express();
const memberRoutes = require('./routes/member.routes');
const instructorRoutes = require('./routes/instructor.routes');
const planRoutes = require('./routes/plan.routes');
const schemeRoutes = require('./routes/scheme.routes');
const paymentRoutes = require('./routes/payment.routes');


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🏋️ Gym Management System API is running!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      members: '/api/members',
      instructors: '/api/instructors',
      plans: '/api/plans',
      schemes: '/api/schemes',
      payments: '/api/payments',
      reports: '/api/reports'
    }
  });
});

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/members', memberRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/payments', paymentRoutes);

module.exports = app;