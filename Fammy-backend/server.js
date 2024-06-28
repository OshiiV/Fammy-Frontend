const express = require('express');
const app = express();
require('dotenv').config(); // env configuration
const dbConfig = require('./config/dbConfig');
app.use(express.json());
const cors = require('cors');

// CORS configuration
app.use(cors());

// User router
const userRoute = require('./routes/userRoute');
app.use('/api/user', userRoute);

const CutOrderRoute = require('./routes/CutOrderRoute');
app.use('/api/cutorderroute', CutOrderRoute);

// Employee router
// const  employeeRoute = require("./routes/ employeeRoute");
// app.use('/api/employee', employeeRoute);
const EmployeeRoute = require('./routes/employeeRoute');
app.use('/api/employee', EmployeeRoute);

// Middleware
app.use(express.json());

// LedFinancial router
const ledFinacialRoutes = require('./routes/LedFinacialRoutes');
app.use('/api/LedFinacialRoutes', ledFinacialRoutes);

// Employee leave and attendance router
const EmpLeaveRoute = require('./routes/EmpLeaveRoute');
const attendanceRoutes = require('./routes/attendanceRoutes');
app.use('/api/leave', EmpLeaveRoute);
app.use('/api/attendance', attendanceRoutes);

// Inventory and allocation router
const InventoryRoute = require('./routes/InventoryRoutes.js');
const AllocateRoute = require('./routes/AllocateRoute.js');
const InformRoute = require('./routes/InformRoutes.js');
app.use('/inventory', InventoryRoute);
app.use('/allocate', AllocateRoute);
app.use('/inform', InformRoute);

// Orders and feedback router
const orderRouter = require('./routes/orderRoutes');
const feedbackRouter = require('./routes/feedbackRoutes');
app.use('/orders', orderRouter);
app.use('/feedback', feedbackRouter);

// New order router
const newOrderRouter = require('./routes/newOrderRoutes.js');
app.use('/new-orders', newOrderRouter);
app.use('/api/new-orders', newOrderRouter);

// Cards and payments router
const cardRoute = require('./routes/cardRoutes');
const paymentRoute = require('./routes/paymentRoutes');
app.use('/api/card', cardRoute);
app.use('/api/payment', paymentRoute);

// Reservation router
const ResRoute = require('./routes/ResRoute');
app.use('/api/ResRoute', ResRoute);

// Port configuration
const port = process.env.PORT || 5001;

const ApproveRoutes = require("./routes/ApproveRoutes"); //
app.use("/api/ApproveRoutes", ApproveRoutes);

const SupRoute = require('./routes/SupRoute')
app.use('/api/SupRoute', SupRoute)


// Server startup announcement
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.listen(port, () => console.log(`Nodemon Server started at port ${port}`));
