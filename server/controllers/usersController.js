const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Company = require('../models/Company');

const getAllUsers = async (req, res) => {
    const users = await User.find();

    if (users.length < 1)
        return res.status(400).json({ message: 'Пользователей нету' });

    res.json(users);
};

const createUser = async (req, res) => {
    const { username, password } = req.body;

    // проверка на заполненные поля
    if (!username || !password)
        return res.status(400).json({ message: 'Не все поля заполнены' });

    // проверка на дубликаты
    const dublicateUser = await User.findOne({ username });
    const dublicateCompany = await Company.findOne({ username });

    if (dublicateUser || dublicateCompany) {
        return res
            .status(409)
            .json({ message: 'Такой пользователь уже существует в БД' });
    }

    const user = await User.create({ username, password });
    if (user) {
        const accessToken = jwt.sign({ username, password }, 'token');

        return res
            .status(201)
            .json({ message: 'Пользователь успешно создан', accessToken });
    } else {
        return res
            .status(400)
            .json({ message: 'Ошибка при создание пользователя' });
    }
};

const updateUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findById(req.user.id).exec();

    if (username) user.username = username;
    if (password) user.password = password;

    await user.save();
    res.json({ message: `Пользователь обновлен` });
};

const deleteUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user && password !== user?.password) {
        return res.status(200).json(`Неверный логин или пароль`);
    }

    const companys = await Company.find({ user: user._id }).exec();

    companys.map((board) => board.delete());
    user.delete();
    return res.status(400).json(notes);
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
};
