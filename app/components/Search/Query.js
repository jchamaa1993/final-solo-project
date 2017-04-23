// Include React as a dependency
var React = require("react");

// I will include helper for us to save.
var helpers = require("../../utils/helpers");

// Query Component Declaration
var Query = React.createClass({

  // Here we set initial variables for the component to be blanks
  getInitialState: function() {
    return {
      expenseName: "",
      value: 0,
      expenseType: "income"
    };
  },

  // Whenever we detect ANY change in the textbox, we register it.
  handleChange: function(event) {
    console.log("TEXT CHANGED");

    // Here we create syntax to capture any change in text to the query terms (pre-search).
    // See this Stack Overflow answer for more details:
    // http://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },

  // This code handles the sending of the search terms to the parent Search component and posts to database.
  handleSubmit: function(event) {
    event.preventDefault();
    console.log("CLICKED");
    this.props.setExpense(this.state.expenseName, this.state.value, this.state.expenseType);
    
    var expenseName = this.state.expenseName;
    var value = this.state.value;
    var expenseType = this.state.expenseType;
    console.log(expenseType);
    helpers.postExpense(expenseName, value, expenseType).then(function() {
      console.log(expenseName);
    });
  },

  // Here we render the Query component
  render: function() {

    return (
      <div className="main-container">

        <div className="row">
          <div className="col-lg-12">

            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">
                  <strong>
                    <i className="fa fa-newspaper-o" aria-hidden="true"></i> Input an Expense!
                  </strong>
                </h1>
              </div>
              <div className="panel-body">

                {/* Note how we associate the text-box inputs with the state values */}
                <form onSubmit={this.handleSubmit} id="expenseForm">
                  <div className="form-group">
                    <h4 className=""><strong>Input your expense name.</strong></h4>
                    <input
                      type="text"
                      value={this.state.expenseName}
                      className="form-control"
                      id="expenseName"
                      onChange={this.handleChange}
                      required
                    />

                    <h4><strong>Input the value of this expense.</strong></h4>
                    <input
                      type="number"
                      value={this.state.value}
                      className="form-control"
                      id="value"
                      onChange={this.handleChange}
                      required
                    />

                    <h4><strong>Input the type of expense.</strong></h4>

                    {/* Here we create the onClick event that triggers the HandleSubmit */}
                    <select name="expenseList" 
                    id="expenseType" 
                    value={this.state.expenseType} 
                    onChange={this.handleChange}
                    >
                      <option value="income">Income</option>
                      <option value="recurringCost">Recurring Cost</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>
                  <div className="pull-right">
                     <button
                       type="submit"
                       className="btn btn-danger"
                     >
                       <h4>Submit</h4>
                     </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

// Export the module back to the route
module.exports = Query;
