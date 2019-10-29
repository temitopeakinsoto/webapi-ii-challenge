const express = require("express");
const db = require("../data/db");
const router = express.Router();

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

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  if (!title || !contents) {
    res
      .status(400)
      .json({
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
