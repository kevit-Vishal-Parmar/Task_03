const mongoose = require("mongoose");
require("../../database/db");

const analyticsSchema = new mongoose.Schema({});
const batches = mongoose.model('batches', analyticsSchema);

module.exports = batches;