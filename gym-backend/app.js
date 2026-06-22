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

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/members', memberRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/payments', paymentRoutes);

module.exports = app;