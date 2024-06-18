import knex from '../utils/db';
import blacklistService from '../utils/blacklistService';

const createUser = async (name: string, email: string, initialBalance: number) => {
  // Check if the user is on the blacklist
  const isBlacklisted = await blacklistService.checkBlacklist(email);
  if (isBlacklisted) {
    throw new Error('User is blacklisted');
  }

  const [userId] = await knex('users').insert({
    name,
    email,
    balance: initialBalance,
  });

  return getUser(userId);
};

const getUser = async (userId: number) => {
    const user = await knex('users').where({ id: userId }).first();
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  };
  
export default { createUser, getUser };
