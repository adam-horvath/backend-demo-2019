const BlogEntry = require('../models/entry');
const auth = require('../auth/auth');

// get blog entries
const getBlogEntries = (req, res) => {
  const token = auth.getToken(req.headers);
  if (token) {
    BlogEntry.find({}, (err, entries) => {
      if (err) {
        console.log('Something went wrong.');
        return res.status(500).send({ msg: 'Something went wrong.'});
      }
      return res.status(200).send({ entries });
    });
  } else {
    console.log('No token provided');
    return res.status(403).send({ msg: 'No token provided.'});
  }
};

const addBlogEntry = (req, res) => {
  if (!req.body || !req.body.text || !req.body.title) {
    console.log(50111, 'No title or text provided.');
    return res.status(400).send({msg: 'No title or text provided.'});
  }
  let token = auth.getToken(req.headers);
  if (token) {
    auth.getUser(token)
    .then((user) => {
      const entry = new BlogEntry({
        title: req.body.title,
        text: req.body.text,
        author: user.id,
        date: new Date(),
      });
      entry.save((err) => {
        if (err) {
          console.log(34567, 'Something went wrong when saving new blog entry.');
          return res.status(500).send({msg: 'Something went wrong when saving new blog entry.'});
        }
        console.log(200111, 'Blog entry was saved successfully.');
        return res.status(200).send({msg: 'Blog entry was saved successfully.'});
      });
    });
  }
  else {
    console.log(1008, 'No token provided');
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};

// can be done by the author only
const updateBlogEntry = (req, res) => {
  if (!req.body || !req.body.text || !req.body.title || !req.body.id) {
    console.log(50112, 'No title, text or blog entry ID provided.');
    return res.status(400).send({msg: 'No title, text or blog entry ID provided.'});
  }
  let token = auth.getToken(req.headers);
  if (token) {
    auth.getUser(token)
    .then((user) => {
      BlogEntry.findById(req.body.id, (err, entry) => {
        if (err) {
          console.log(10083, 'Something went wrong.');
          return res.status(500).send({msg: 'Something went wrong.'});
        }
        if (!entry) {
          console.log(1008404, 'Blog entry was not found.');
          return res.status(404).send({msg: 'Blog entry was not found.'});
        }
        if (entry.author.toString() !== user.id.toString()) {
          console.log(1008403, 'You do not have right to update this blog entry.');
          return res.status(403).send({msg: 'You do not have right to update this blog entry.'});
        }
        entry.title = req.body.title;
        entry.text = req.body.text;
        entry.date = new Date();
        entry.save((err) => {
          if (err) {
            console.log(345678, 'Something went wrong when updating the blog entry.');
            return res.status(500).send({msg: 'Something went wrong when updating the blog entry.'});
          }
          console.log(200200, 'Blog entry was updated successfully.');
          return res.status(200).send({msg: 'Blog entry was updated successfully.'});
        });
      });
    });
  }
  else {
    console.log(1009, 'No token provided');
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};

// can be done by the author only
const deleteBlogEntry = (req, res) => {
  let entryId = req.params.id;
  if (!entryId) {
    console.log(10109, 'No blog entry ID provided.');
    return res.status(400).send({msg: 'No blog entry ID provided.'});
  }
  let token = auth.getToken(req.headers);
  if (token) {
    auth.getUser(token)
    .then((user) => {
      BlogEntry.findById(entryId, (err, entry) => {
        if (err) {
          console.log(100832, 'Something went wrong.');
          return res.status(500).send({msg: 'Something went wrong.'});
        }
        if (!entry) {
          console.log(10084042, 'Blog entry was not found.');
          return res.status(404).send({msg: 'Blog entry was not found.'});
        }
        if (entry.author.toString() !== user.id.toString()) {
          console.log(10084032, 'You do not have right to delete this blog entry.');
          return res.status(403).send({msg: 'You do not have right to delete this blog entry.'});
        }
        entry.remove((err) => {
          if (err) {
            console.log(3456782, 'Something went wrong when deleting the blog entry.');
            return res.status(500).send({msg: 'Something went wrong when deleting the blog entry.'});
          }
          console.log(2002002, 'Blog entry was deleted successfully.');
          return res.status(200).send({msg: 'Blog entry was deleted successfully.'});
        });
      });
    });
  }
  else {
    console.log(1009, 'No token provided');
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};

module.exports = {
  getBlogEntries,
  addBlogEntry,
  updateBlogEntry,
  deleteBlogEntry,
};