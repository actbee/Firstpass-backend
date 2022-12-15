const db = require("../models");
const Todo = db.todos;
const Op = db.Sequelize.Op;

// create and save a list
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "should not be empty"
    });
    return;
  }

  // create a list
  const todo = {
    title: req.body.title,
    description: req.body.description,
    stauts: req.body.stauts ? req.body.stauts : false
  };

  // save list to database
  Todo.create(todo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error when create new list。"
      });
    });
};

// search from database
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Todo.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error when searching"
      });
    });
};

// search by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Todo.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `have not found list with ID ${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:  `error when finding list with ID ${id}`
      });
    });
};

// 更新指定 ID 清单
exports.update = (req, res) => {
  const id = req.params.id;

  Todo.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Update success"
        });
      } else {
        res.send({
          message: `Failed when updating list with ID: ${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Failed when updating list with ID: ${id}`
      });
    });
};

// Delete a Todo with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Todo.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Delete success"
        });
      } else {
        res.send({
          message: `Fail when delete list with ID: ${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Can not delete list" + id
      });
    });
};

// delete all lists in database
exports.deleteAll = (req, res) => {
  Todo.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `Delete list with ID: ${nums}` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error when deleting all lists"
      });
    });
};

// check status of all lists
exports.findAllstauts = (req, res) => {
  Todo.findAll({ where: { stauts: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error when searching list"
      });
    });
};