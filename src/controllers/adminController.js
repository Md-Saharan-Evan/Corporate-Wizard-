const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('./models/admin.model'); // Import your Admin model
const { route, router } = require('../server/src/app.js');


// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ msg: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
        res.json({ token, user: { id: admin._id, email: admin.email } });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = {router};