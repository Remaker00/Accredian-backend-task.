const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/users');

exports.insertusers = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashpass = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashpass });
        res.status(201).send('User SignedIn successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error Signing user.');
    }
};

exports.checkusers = async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    try {
        const user = await User.findOne({
            where: { email: email }
        });
        console.log(user);

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const token = jwt.sign({ userId: user.id }, 'your4secret4key');

                res.status(200).json({ message: `Login successful`, token });
            } else {
                res.status(401).send('Invalid credentials.');
            }
        } else {
            res.status(401).send('Invalid Email.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error while Logging");
    }
};