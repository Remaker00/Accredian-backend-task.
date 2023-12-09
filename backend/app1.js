const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

const sequelize = require('./util/dataB');

const userRoutes = require('./routes/user');

app.use('/user', userRoutes);

sequelize.sync().then(() => {
    app.listen(4000, () => {
        console.log(`App started`);
    });
}).catch(err => {
    console.error('Error syncing database:', err);
});