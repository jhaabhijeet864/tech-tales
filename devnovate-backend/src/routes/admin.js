const express = require('express');
const Blog = require('../models/Blog');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

// list pending
router.get('/pending', protect, adminOnly, async (req, res) => {
  const pending = await Blog.find({ status: 'pending' }).populate('author', 'name email');
  res.json(pending);
});

// approve
router.post('/approve/:id', protect, adminOnly, async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { status: 'published' },
    { new: true }
  );
  res.json(blog);
});

// reject
router.post('/reject/:id', protect, adminOnly, async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { status: 'rejected' },
    { new: true }
  );
  res.json(blog);
});

// hide / delete
router.post('/hide/:id', protect, adminOnly, async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { status: 'hidden' },
    { new: true }
  );
  res.json(blog);
});

router.delete('/delete/:id', protect, adminOnly, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
