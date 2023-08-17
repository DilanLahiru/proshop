import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true,
    },
    {
        name: 'Dilan Lahiru',
        email: 'dilan@gmail.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: false,
    },
    {
        name: 'Lahiru Gamage',
        email: 'lahiru@gmail.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: false,
    }
]

export default users;