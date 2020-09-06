require('dotenv').config({
	path: '.env.test',
});

if (!process.env.NODE_ENV) throw new Error('ENV not set');
if (!process.env.PORT) throw new Error('PORT not set');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
};