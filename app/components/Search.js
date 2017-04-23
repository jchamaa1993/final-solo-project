// Include React as a dependency
var React = require("react");

// Include the Query and Results components
var Query = require("./search/Query");
var Results = require("./search/Results");
var Saved = require("./Saved");
// Include the helpers for making API calls
var helpers = require("../utils/helpers");

// Create the Search component
var Search = React.createClass({

  // Here we set the initial state variables
  // (this allows us to propagate the variables for maniuplation by the children components
  // Also note the "resuls" state. This will be where we hold the data from our results
  getInitialState: function() {
    return {
      expenseName: "",
      expenseValue: 0,
      expenseType: "",
      inputExpenses: "",
    };
  },

  // This function will be passed down into child components so they can change the "parent"
  // i.e we will pass this method to the query component that way it can change the main component
  // to perform a new search
  setExpense: function(newExpenseName, newExpenseValue, newExpenseType) {
    this.setState({ expenseName: newExpenseName, expenseValue: newExpenseValue, expenseType: newExpenseType });
  },
  showExpenses: function(savedExpenses) {
    this.setState({ inputExpenses: savedExpenses });
  },
  // Render the component. Note how we deploy both the Query and the Results Components
  render: function() {
    console.log("Render Results", this.state.results);

    return (
      <div className="main-container">

        {/* Note how we pass the setQuery function to enable Query to perform searches */}
        <Query setExpense={this.setExpense}/>
        <Saved showExpenses= {this.showExpenses}/>
        {/* Note how we pass in the results into this component */}
      </div>
    );
  }
});

// Export the module back to the route
module.exports = Search;
