var React = require("react");

var helpers = require("../utils/helpers");


// load google charts.


var Chart = React.createClass({

  // Initial state variables:
  getInitialState: function() {
    return {
      graphName: "pie"
    };
  },
  componentDidMount: function() {
    this.getData();
  },

  // componentDidUpdate: function() {
  //   console.log('in didupdate' + this.state.data);
  //     google.setOnLoadCallback(this.draw());
  // },
  // draw chart here. pick up the data and draw.
  draw: function(data) {
    var data = data;
    console.log('in here');
    var options = {
        width: 600,
        height: 400,
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '75%' },
        isStacked: true
      };
      var element = document.getElementById(this.state.graphName);
      var chart = new google.visualization.BarChart(element);
      chart.draw(data, options);
  },
  //get data from database and put in form that chart can read. 
  getData: function() {
    var expenseNames = [];
    var expenseValues = [];
    var expenseTypes = [];
    var totalIncome = 0;
    var totalRecurringCosts = 0;
    var totalExpenses = 0;
    var Savings = 0;
    helpers.getSaved().then(function(expenseData) {
       console.log("saved results", expenseData.data);
       for(var i=0; i< expenseData.data.length; i++) {
          expenseNames.push(expenseData.data[i].expenseName);
          expenseValues.push(expenseData.data[i].value);
          expenseTypes.push(expenseData.data[i].expenseType);
          if(expenseTypes[i] === "income") {
            totalIncome += expenseValues[i];
          } else if(expenseTypes[i] === "recurringCost") {
            totalRecurringCosts += expenseValues[i];
          } else {
            totalExpenses += expenseValues[i];
          }
        }
        Savings = totalIncome - totalExpenses - totalRecurringCosts;
        console.log(totalIncome);
        var data = google.visualization.arrayToDataTable([
          ['Expense Type', 'Total Recurring Costs', 'Total Expenses', 'Net Savings', {role: 'annotation'} ],
          ['Your Expenses', parseInt(totalExpenses), parseInt(totalRecurringCosts), parseInt(Savings), '']
        
        ]);
        this.draw(data);
    }.bind(this));
  },


  render: function() {
    return ( <div id={this.state.graphName}></div> );
  }

});

// function init() {
//   React.render(React.createElement)
// }

module.exports = Chart;