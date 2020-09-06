import { body, param, oneOf } from 'express-validator';

export default {
  post: [
    body('name')
      .notEmpty()
      .isString()
      .isLength({ min: 2, max: 70 }),
    body('specie')
      .notEmpty()
      .isString(),
    body('breed')
      .notEmpty()
      .isString(),
    body('immediate')
      .notEmpty()
      .isBoolean(),
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
    doctor: [
      param('doctor_id')
        .notEmpty()
        .isString(),
    ],
  },
  put: [
    param('id')
      .notEmpty()
      .isInt(),
  ],
  delete: [
    param('id')
      .notEmpty()
      .isInt(),
  ],
};