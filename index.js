const cors=require('cors')
const express=require('express')
const authRoutes=require('./routes/auth')
const scheduleRoutes=require('./routes/schedule')
const notificationRoutes=require('./routes/notification')
const userRoutes=require('./routes/user')
require('dotenv').config()
const connect=require('./connect')
const app=express();
app.use(cors())
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api",scheduleRoutes)
app.use('/api',notificationRoutes)
app.use('/api',userRoutes)
connect
if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Listening on PORT ${process.env.PORT || 5000}`);
    });
}


module.exports=app