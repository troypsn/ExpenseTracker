import bcrypt  from 'bcrypt';

const saltRounds = 12;

export async function hashPassword(password) {
    return bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
}