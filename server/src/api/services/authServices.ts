import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/user';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

interface RegisterParams {
    email: string;
    password: string;
    name: string;
}

interface LoginParams {
    email: string;
    password: string;
}

const generateToken = (userId: string) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

export const register = async ({email, password, name}: RegisterParams): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, name });
    if (user) {
        console.log('User registered successfully');
        return generateToken(user.id);
    } else {
        throw new Error('Failed to register user');
    }
};

export const login = async ({email, password}: LoginParams): Promise<string> => {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) {
        throw new Error('Invalid login');
    }
    return generateToken(user.id);
};