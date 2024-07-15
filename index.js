// Connecting to database and models
const Sequelize = require('sequelize')
const {DataTypes} = Sequelize;

const sequelize = new Sequelize('sequelize-tut', 'root', 'Lucky@1201', {
    dialect: 'mysql',
    define: {
        freezeTableName: true    //It prevents the auto plural form of all table-name
    }
});

// To sync all tables at a time 
// sequelize.sync({alter: true});

// To delete all tables 
// sequelize.drop();
// sequelizedrop({ match: /_test$/ });   //It will drop all tables in the form ...._test

// To create a table 
const User = sequelize.define('user', {
    user_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
    },
    age:{
        type: DataTypes.INTEGER,
        defaultValue: 21
    },
    WittCodeRocks:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    freezeTableName: true,   //It prevents the auto plural form of table-name
    timestamps: false  // It prevent the auto creation of created At & updated At
})

// To delete User table 
// User.drop();

User.sync({alter: true})     //force : true-> drops the previous if exists and create new table,    alter: true -> Perform changes in the table to match the model  
    .then((data)=>{
        console.log("User added to database")
    })
    .catch((err)=>{
        console.log("Error syncing the table and model!", err)
    })

// Check to confirm database is connected
// async function connect(){
//     await sequelize.authenticate();
//     console.log("Connection Sucessful")
// }
// connect()

// sequelize.authenticate()
//     .then(()=>{
//         console.log("Connection Sucessful")
//     })
//     .catch((err)=>{
//         console.log("Error connecting to database", err)
//     })

// console.log("Another task")