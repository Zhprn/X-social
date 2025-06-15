const express = require('express')
const cors = require('cors')
require('dotenv').config();
const cookieParser = require("cookie-parser");
const path = require("path");

const userRoutes = require ('./routes/UserRoutes.js')
const postRoutes = require ('./routes/PostRoutes.js')
const followRoutes = require ('./routes/FollowRoutes.js')

const app = express()
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true 
}));
app.use(express.json({ extended : true }))
app.use(cookieParser());

app.use("/public", express.static(path.join(__dirname, "public")));
app.use('/api/v1', userRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/users', followRoutes);

// const db = require('./models')
// db.sequelize.sync({alter : true}).then(() =>{
//     console.log('Database Sync')
// }); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Running using port on ${PORT}`);
});