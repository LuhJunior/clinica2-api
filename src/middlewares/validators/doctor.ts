import { body, param, oneOf } from 'express-validator';

export default {
  post: [
    body('name')
      .notEmpty()
      .isString()
      .isLength({ min: 3, max: 70 }),
    body('speciality_id')
      .notEmpty()
      .isInt(),
  ],
  get: {
    id: [
      param('id')
        .notEmpty()
        .isInt(),
    ],
    speciality: [
      param('speciality')
        .notEmpty()
        .isString(),
    ],
  },
  put: [
    param('id')
      .notEmpty()
      .isInt(),
    oneOf([
      body('name', 'Enter a correct name')
        .notEmpty()
        .isString()
        .isLength({ min: 3, max: 70 }),
      body('speciality_id', 'Invalid id')
        .notEmpty()
        .isInt()
    ]),
  ],
  delete: [
    param('id')
      .notEmpty()
      .isInt(),
  ],
};