const express = require("express");
const db = require("../data/db");
const router = express.Router();

//Get all posts
router.get("/", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({
        errorMessage:
          "There was an error retrieving records from the database..."
      });
    });
});

//Find posts by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(posts => {
      if (posts && posts.length > 0) {
        res.status(200).json(posts);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});

//Find post comments by id
router.get("/:id/comments", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(data => {
      if (data.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        db.findPostComments(id).then(data => {
          res.status(200).json(data);
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
});

//Add post comment by id
router.post("/:id/comments", (req, res) => {
  let { id } = req.params;
  const { text } = req.body;

  const commentToBeAdded = {
    text,
    post_id: id
  };

  if (!commentToBeAdded.text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  }

  db.findById(id).then(data => {
    if (data.length === 0) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else {
      db.insertComment(commentToBeAdded)
        .then(data => {
          res.status(201).json(data);
        })
        .catch(err => {
          res.status(500).json({
            error: "There was an error while saving the comment to the database"
          });
        });
    }
  });
});

//Add a new post
router.post("/", (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    const newBlogPost = {
      title,
      contents
    };
    db.insert(newBlogPost)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(() => {
        res.status(500).json({
          errorMessage:
            "There was an error inserting this post to the database..."
        });
      });
  }
});

//Update a post
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    const postToBeUpdated = {
      title,
      contents
    };
    db.update(id, postToBeUpdated)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(() => {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      });
  }
});

//Delete a post
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(count => {
      if (count && count > 0) {
        res.status(200).json({
          message: "the user was successfully deleted."
        });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

module.exports = router;
