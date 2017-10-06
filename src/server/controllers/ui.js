import express from 'express';
import render from '../render';
const router = express.Router();

router.get('*', (req, res) => {
  render(req, res);
});

export default router;
