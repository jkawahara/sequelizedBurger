// *** Include Modules: connection.js
var connection = require("../config/connection.js");

// Helper function to create an array of question marks (e.g. "?,?,?") for SQL syntax
function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

// Helper function to convert object key: value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];
  // Loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // Check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // E.g. {devoured: true} => ["devoured=true"]
      arr.push(key + "=" + value);
    }
  }
  // Translate array of strings to single comma-separated string
  return arr.toString();
}

// ORM object for SQL statements
var orm = {
  // Read operation for all table fields
  selectAll: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // Create operation for new tuple
  insertOne: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);
    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // Update operation for existing tuple
  updateOne: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

// *** Export orm object for model
module.exports = orm;
