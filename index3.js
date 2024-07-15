// Model Querying
const Sequelize = require('sequelize')
const {DataTypes, Op} = Sequelize;

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

User.sync({alter: true})
    .then(()=>{
        // return User.findAll();    //To find all attributes 
        // return User.findAll({ attributes: ['username', 'password']});    //To find selected attributes 
        // return User.findAll({ attributes: { exclude: ['password']}});    //To find all attributes excluding selected attributes 
        // return User.findAll({ attributes: [['username', 'myName'], ['password', 'pwd']]});    //To find selected attributes username as myName and password as pwd 
        // return User.findAll({ attributes: [[sequelize.fn('SUM', sequelize.col('age')), 'totalage']]});    //To use aggregate functions 
        // return User.findAll({ attributes: ['username', 'password'], where: {age: 25, username: 'Ram'}});    //Using where clause
        // return User.findAll({ limit:2 });    //Using limit
        // return User.findAll({ order: [['age', 'DESC']] });    //Using order by
        // return User.findAll({ attributes: ['username', [sequelize.fn('SUM', sequelize.col('age')), 'totalage']], group: 'username' });    //Using group by
        // return User.findAll({ where: {[Op.or]: {username: 'Ram', age: 26}} });    //Using operator
        // return User.findAll({ where: { age: {[Op.gt]: 25}} });    //Using comparisons
        // return User.findAll({ where: sequelize.where(sequelize.fn('char_length', sequelize.col('username')), 4) });    //finding len(username)==6

        // return User.update({ username: 'pizzas'}, {where:{age: 25}})  //Update

        // return User.destroy({where: { username: 'pizzas'}})  //Delete

        // Some methods 
        return User.max('age') 
        return User.sum('age') 
    })
    .then((data)=>{
        // data.forEach((element)=>{
        //     console.log(element.toJSON())
        // })
        console.log(data)
    })
    .catch((err)=>{
        console.log("Error syncing the table and model!", err)
    })