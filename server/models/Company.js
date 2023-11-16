const mongoose = require('mongoose');

//! у каждой ОО(организации) есть все 4 таблицы
//! в таблице первый элемент массива это всегда название главных полей. а дальше по ситуации.

//! у пользователя есть 2 роли.

const companySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        companyname: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        tables: {
            type: Object,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Company', companySchema);
