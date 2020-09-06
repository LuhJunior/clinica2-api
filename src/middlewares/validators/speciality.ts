import { body, param } from 'express-validator';

export default {
  post: [
    body('name')
      .notEmpty()
      .isString()
      .isLength({ min: 3, max: 30 }),
  ],
  get: {
    id: [
      param('id')
        .notEmpty()
        .isInt(),
    ],
    name: [
      param('name')
        .notEmpty()
        .isString()
        .not().isInt(),
    ],
  },
  delete: [
    param('id')
      .notEmpty()
      .isInt(),
  ],
};