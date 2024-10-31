const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true
    }
},{timestamps: true});

const Users = mongoose.model('users', usersSchema);

module.exports = Users;