const Company = require('../models/Company');
const User = require('../models/User');

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Не все поля заполнены' });
    }

    // ! ищем пользователя или компанию
    const findUser = await User.findOne({ username });
    const findCompany = await Company.findOne({ username });
    if (!findUser && !findCompany)
        return res
            .status(404)
            .json({ message: 'Такого пользователя и компании не существует' });

    // ! отдлеьная логика для пользователя и компани

    if (findUser) {
        if (password !== findUser.password)
            return res.status(404).json({ message: 'Неверный пароль' });

        res.json(findUser);
    }
    if (findCompany) {
        if (password !== findCompany.password)
            return res.status(404).json({ message: 'Неверный пароль' });

        res.json(findCompany);
    }
};

module.exports = { login };
