// Include React as a dependency
var React = require("react");

// Include the Helper (for the saved recall)
var helpers = require("../utils/helpers");

// Create the Main component
var Main = React.createClass({

  getInitialState: function() {
    return { savedExpenses: "" };
  },

  // When this component mounts, get all saved expenses from our db
  componentDidMount: function() {
    helpers.getSaved().then(function(expenseData) {
      this.setState({ savedExpenses: expenseData.data });
      console.log("saved results", expenseData.data);
    }.bind(this));
  },

  // This code handles the deleting saved articles from our database
  handleClick: function(item) {
    console.log("CLICKED");
    console.log(item);

    // Delete the list!
    helpers.deleteSaved(item.expenseName, item.value, item.expenseType).then(function() {

      // Get the revised list!
      helpers.getSaved().then(function(expenseData) {
        this.setState({ savedExpenses: expenseData.data });
        console.log("saved results", expenseData.data);
      }.bind(this));

    }.bind(this));
  },
  // A helper method for rendering the HTML when we have no saved articles
  renderEmpty: function() {
    return (
      <li className="list-group-item">
        <h3>
          <span>
            <em>Please input your first expense.</em>
          </span>
        </h3>
      </li>
    );
  },

  // A helper method for mapping through our expense and outputting some HTML
  renderExpenses: function() {
    return this.state.savedExpenses.map(function(expense, index) {

      return (
        <div key={index}>
          <li className="list-group-item">
            <h3>
              <span>
                <em>Expense Name: {expense.expenseName}</em>
              </span>
              <span className="btn-group pull-right">
                <button className="btn btn-primary" onClick={() => this.handleClick(expense)}>Delete</button>
              </span>
            </h3>
            <p>Type of Expense: {expense.expenseType}</p>
            <p>Value: ${expense.value}</p>
          </li>
        </div>
      );
    }.bind(this));
  },

  // A helper method for rendering a container and all of our artiles inside
  renderContainer: function() {
    return (
      <div className="main-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">
                  <strong>
                    <i className="fa fa-download" aria-hidden="true"></i> Saved Expenses</strong>
                </h1>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {this.renderExpenses()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  // Our render method. Utilizing a few helper methods to keep this logic clean
  render: function() {
    // If we have no articles, we will return this.renderEmpty() which in turn returns some HTML
    if (!this.state.savedExpenses) {
      return this.renderEmpty();
    }
    // If we have articles, return this.renderContainer() which in turn returns all saves articles
    return this.renderContainer();
  }
});

// Export the module back to the route
module.exports = Main;
