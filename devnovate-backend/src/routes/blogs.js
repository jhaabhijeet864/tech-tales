const express = require('express');
const Blog = require('../models/Blog');
const { protect } = require('../middleware/auth');
const slugify = require('slugify');
const router = express.Router();

// create blog (status: pending)
router.post('/', protect, async (req, res) => {
  const { title, content } = req.body;
  const slug = slugify(title, { lower: true }) + '-' + Date.now().toString().slice(-4);
  const blog = await Blog.create({ title, slug, content, author: req.user._id, status: 'pending' });
  res.json(blog);
});

// public: list published with search, sort, filter
router.get('/', async (req, res) => {
  const { q, page = 1, limit = 10, trending } = req.query;
  const filter = { status: 'published' };
  if (q) filter.$text = { $search: q };
  let query = Blog.find(filter).populate('author', 'name');
  if (trending === '1') query = query.sort({ likes: -1, commentsCount: -1, views: -1 });
  else query = query.sort({ createdAt: -1 });
  const skip = (page - 1) * limit;
  const results = await query.skip(skip).limit(Number(limit));
  res.json(results);
});

// get single and increment views
router.get('/:slug', async (req, res) => {
  const blog = await Blog.findOneAndUpdate(
    { slug: req.params.slug, status: 'published' },
    { $inc: { views: 1 } },
    { new: true }
  ).populate('author', 'name');
  if (!blog) return res.status(404).json({ message: 'Not found' });
  res.json(blog);
});

// like / unlike
router.post('/:id/like', protect, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).end();
  const idx = blog.likes.indexOf(req.user._id);
  if (idx === -1) blog.likes.push(req.user._id);
  else blog.likes.splice(idx, 1);
  await blog.save();
  res.json({ likes: blog.likes.length });
});

module.exports = router;
