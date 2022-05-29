// 11.1.2 Here, we will define a sequelizer type domain object for the post table

// 11.1.2.1. We first import the Sequelize object from the sequelize package we installed to an;e to use data type definitions
const Sequelize = require('sequelize');

// 11.1.2.2 We also import the sequelize object we created, to be abl;e to add models to the db connection we created
const sequelize = require('../util/database');

// 11.1.2.3 we define the model name here (which will be the table name in the db) and the different fields in this model,
//      which will translate to the columns names and types og the post table)
//      see https://sequelize.org/docs/v7/other-topics/other-data-types/ for the different data types

const PostModel = sequelize.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl: Sequelize.STRING,
    creator: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
});

module.exports = PostModel;

