const db = require("../data/db-config");

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where("id", id)
    .first();
}

function findSteps(id) {
  return db("steps")
    .join("schemes", "schemes.id", "steps.scheme_id")
    .select("steps.id", "schemes.scheme_name", "steps.instructions")
    .where("scheme_id", id);
}

function add(newScheme) {
  return db("schemes")
    .insert(newScheme)
    .then(response => {
      return findById(response[0]);
    });
}

function update(changes, id) {
  return db("schemes")
    .where("id", id)
    .update(changes)
    .then(response => {
      response > 0 ? findById(id) : null;
    });
}

function remove(id) {
  return db("schemes")
    .where("id", id)
    .del();
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};