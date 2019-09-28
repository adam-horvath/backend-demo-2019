const express = require('express');
const auth = require('../app/auth/auth');
const email = require('../app/auth/email');
const blog = require('../app/blog/blog');

const router = express.Router();

/*
 * Routes that can be accessed by anyone
 */
router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/verify', email.verify);

/*
 * Routes that can be accessed only by authenticated users
 */
router.get('/v1/entry', blog.getBlogEntries);
router.post('/v1/entry', blog.addBlogEntry);
router.put('/v1/entry', blog.updateBlogEntry);
router.delete('/v1/entry/:id', blog.deleteBlogEntry);

module.exports = router;
