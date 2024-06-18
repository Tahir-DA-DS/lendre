import userService from '../src/services/userService';
import knex from '../src/utils/db';

beforeAll(async () => {
  await knex.migrate.latest();
});

afterAll(async () => {
  await knex.migrate.rollback();
  await knex.destroy();
});

test('createUser should create a new user', async () => {
  const user = await userService.createUser('John Doe', 'john@example.com', 1000);
  expect(user).toHaveProperty('id');
  expect(user.name).toBe('John Doe');
  expect(user.email).toBe('john@example.com');
  expect(user.balance).toBe('1000.00');
});
