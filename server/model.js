var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ExpenseSchema = new Schema({
  expenseName: {
    type: String
  },
  value: {
    type: Number
  },
  expenseType: {
    type: String
  }
});

var Expense = mongoose.model("Expense", ExpenseSchema);
module.exports = Expense;
