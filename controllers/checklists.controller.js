const decode = require("jwt-decode");
const Checklist = require("../models/checklist.model");

const updateChecklist = async (req, res) => {
  var token = decode(req.headers.authorization);
  req.body.updatedBy = token.user.name;

  let checklist = await Checklist.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(checklist);
};

module.exports = {
  updateChecklist,
};
