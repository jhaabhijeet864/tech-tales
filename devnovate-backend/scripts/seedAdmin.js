const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../src/models/User');
require('dotenv').config();

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const hash = await bcrypt.hash('AdminPass123!', 10);
  await User.create({ 
    name: 'Admin', 
    email: 'admin@devnovate.app', 
    password: hash, 
    role: 'admin' 
  });
  console.log('Admin created');
  process.exit(0);
})();
