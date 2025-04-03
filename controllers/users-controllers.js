const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Akshaj Pal',
        email: 'test@test.com',
        password: '1234',
    }
];

const getUsers = ((req, res, next) => {
    res.json({ users: DUMMY_USERS });
});


const signup = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs.', 422);
    }

    const { name, email, password } = req.body;

    const hasUser = DUMMY_USERS.find(u => u.email === email);

    if (hasUser) {
        throw new HttpError("email already exists.", 422);
    }

    const createdUser = {
        id: 'u2',
        name,
        email,
        password,
    };

    DUMMY_USERS.push(createdUser);

    res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {

    const { email, password } = req.body;

    const identifiedUser = DUMMY_USERS.find(u => u.email === email);

    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError("Invalid Credentials.", 401);
    }

    res.json({ message: "Logged In" });

};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
