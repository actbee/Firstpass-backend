const db = require("../models");
const Users = db.users;
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
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  // save list to database
  Users.create(user)
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
  const title = req.query.id;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Users.findAll({ where: condition })
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

  Users.findByPk(id)
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

// update given email
exports.update = (req, res) => {
  const id = req.params.id;

  Users.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Update success"
        });
      } else {
        res.send({
          message: `Failed when updating list with email: ${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Failed when updating list with email: ${id}`
      });
    });
};

// Delete the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Users.destroy({
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
  Users.destroy({
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
   Users.findAll({ where: { stauts: true } })
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