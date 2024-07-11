// Model Querying
const Sequelize = require('sequelize')
const {DataTypes} = Sequelize;

const sequelize = new Sequelize('sequelize-tut', 'root', 'Lucky@1201', {
    dialect: 'mysql',
    define: {
        freezeTableName: true    //It prevents the auto plural form of all table-name
    }
});

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
        validate: {
            len: [4,10]              //It will check if len(username) is not in [4, 10] it will return error   it works only in single object creation in bulkCreate we have to pass the condition
        }
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

User.sync({alter: true})     //force : true-> drps the previous if exists and create new table,    alter: true -> Perform changes in the table to match the model
    .then(()=>{
        // Insert values to table 
        // const user = User.build({username: 'Ram', password: '123', age: 25, WittCodeRocks: true});
        // return user.save();

        // or 

        // return User.create({
        //     username: 'Shyam',
        //     password: '1234',
        //     age: 26,
        //     WittCodeRocks: false
        // })

        // To create multiple users 
        return User.bulkCreate([
            {
                username: 'Gopal',
                age: 29,
                password: '4321'
            },
            {
                username: 'Radhe',
                age: 31,
                password: '123456'
            },
        ], { validate: true});
    })
    // .then((data)=>{
        // console.log("User added to database")
        // data.username = 'Hari';
        // data.age = 54;
        // return data.save();    // To update the data
        // return data.save({fields: ['age']});    // To update a particular field of the data
        // return data.destroy();    // To delete the data 
        // return data.reload();      // To retrieve the previous data 
        // data.decrement({ age: 2 })   // To increment/decrement value of a field 
    // })
    .then((data)=>{
        console.log("User updated")
        // console.log(data.toJSON());     // For one user
        // For multiple User 
        data.forEach((element)=>{
            console.log(element.toJSON())
        })
    })
    .catch((err)=>{
        console.log("Error syncing the table and model!", err)
    })