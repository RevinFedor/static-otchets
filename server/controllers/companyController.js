const { default: mongoose } = require('mongoose');
const Company = require('../models/Company');
const User = require('../models/User');

const getCompanyUser = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res
            .status(400)
            .json({ message: 'Неверный идентификатор пользователя' });
    }
    const companys = await Company.find({
        user: req.params.id,
    }).lean();

    if (companys?.length < 1)
        return res.status(400).json({ message: 'Компаний нету' });

    res.json(companys);
};
const getCompanyThis = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res
            .status(400)
            .json({ message: 'Неверный идентификатор компании' });
    }
    const companys = await Company.findById(req.params.id).lean();

    if (companys?.length < 1)
        return res.status(400).json({ message: 'Компаний нету' });

    res.json(companys);
};

const createCompany = async (req, res) => {
    const { companyname, username, password, userId, tables } = req.body;

    // проверка на заполненные поля

    if (!companyname || !username || !password || !userId || !tables)
        return res.status(400).json({ message: 'Не все поля заполнены' });

    const user = await User.findById(userId).exec();
    console.log(user);
    if (!user)
        return res.status(400).json({ message: 'пользователь не найден' });

    // проверка на дубликаты
    const dublicateUser = await User.findOne({ username });

    const dublicateCompany = await Company.findOne({ username });

    if (dublicateUser || dublicateCompany) {
        return res
            .status(409)
            .json({ message: 'Такая компания уже существует' });
    }

    const company = await Company.create({
        user,
        username,
        companyname,
        password,
        tables,
    });

    if (company)
        return res
            .status(201)
            .json({ message: 'Пользователь успешно создан', company });
};

// ! функция обнолвения таблиц
const updateCompany = async (req, res) => {
    const { userId, tables } = req.body;
    console.log(userId);
    const company = await Company.findById(userId).exec();

    if (company && tables) company.tables = tables;

    await company?.save();
    res.json({ message: `Компания обновлена` });
};

const deleteCompany = async (req, res) => {
    const { companyId } = req.body;
    console.log(companyId);
    const company = await Company.findById(companyId);

    if (!companyId) {
        return res.status(400).json(`Нету пользователя`);
    }

    company?.delete();
    return res.status(200).json({ message: `Компания удалена` });
};

module.exports = {
    getCompanyUser,
    createCompany,
    updateCompany,
    deleteCompany,
    getCompanyThis,
};
