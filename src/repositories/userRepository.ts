import knex from '../utils/db';
import User from '../models/userModel';

const createUser = async (name: string, email: string, initialBalance: number): Promise<User> => {
  const [user] = await knex('users').insert({ name, email, balance: initialBalance }).returning('*');
  return user;
};

const findUserById = async (id: number): Promise<User | undefined> => {
  const user = await knex('users').where({ id }).first();
  return user;
};



export { createUser, findUserById };
