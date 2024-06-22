const Sequelize = require("sequelize");
const dotenv = require('dotenv')
dotenv.config()

const sequelize = new Sequelize(process.env.db, process.env.user, process.env.password, {
    host: process.env.host,
    dialect: process.env.dialect,
    operatorsAliases: 0,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        collate: 'utf8_general_ci'
    },
    logging: false,
    freezeTableName: true
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.', process.env.db);
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database sync successfully', process.env.db);
    })
    .catch(err => {
        console.error('Unable to sync the database:', err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userSchema')(sequelize, Sequelize)
db.patients = require('./patientsSchema')(sequelize, Sequelize)
db.medicalData = require('./medicalDataSchema')(sequelize, Sequelize)

/**
 * users - to do 
 */
db.users.hasMany(db.patients, {
    as: 'patients',
    foreignKey: 'createdBy',
    sourceKey: 'id',
});

db.patients.belongsTo(db.users, {
    as: 'users',
    foreignKey: 'createdBy',
    sourceKey: 'id',
});

module.exports = db