const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    catName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);
categorySchema.pre(/^find/, function(next) {
  this.select("-__v");
  next();
});
module.exports = mongoose.model("Category", categorySchema);
