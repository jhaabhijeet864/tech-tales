const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const {
    createBlog,
    getAllApprovedBlogs,
    getTrendingBlogs,
    getBlogById,
    likeBlog,
    commentOnBlog,
    searchBlogs,
    getUserBlogs,
    deleteUserBlog,
    getPendingBlogs,
    approveBlog,
    rejectBlog,
    hideBlog,
    deleteAnyBlog
} = require('../controllers/blogController');

// Public routes
router.get('/', getAllApprovedBlogs);
router.get('/trending', getTrendingBlogs);
router.get('/:id', getBlogById);
router.get('/search', searchBlogs);

// Protected routes
router.use(protect);
router.post('/', createBlog);
router.put('/like/:id', likeBlog);
router.post('/comment/:id', commentOnBlog);

// User-specific routes
router.get('/user/my-blogs', getUserBlogs);
router.delete('/user/my-blogs/:id', deleteUserBlog);

// Admin routes
router.use(admin);
router.get('/admin/pending', getPendingBlogs);
router.put('/admin/approve/:id', approveBlog);
router.put('/admin/reject/:id', rejectBlog);
router.put('/admin/hide/:id', hideBlog);
router.delete('/admin/:id', deleteAnyBlog);

module.exports = router;
