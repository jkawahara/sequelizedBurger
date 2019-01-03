// *** Include Modules: orm.js
// var orm = require("../config/orm.js");

// var burger = {
//   selectAll: function(cb) {
//     orm.selectAll("burgers", function(res) {
//       cb(res);
//     });
//   },
//   // The variables cols and vals are arrays.
//   insertOne: function(cols, vals, cb) {
//     orm.insertOne("burgers", cols, vals, function(res) {
//       cb(res);
//     });
//   },
//   updateOne: function(objColVals, condition, cb) {
//     orm.updateOne("burgers", objColVals, condition, function(res) {
//       cb(res);
//     });
//   }
// };

// *** Export burger object for controller
// module.exports = burger;

module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("Burger", {
    name : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    devoured : {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return Burger;
};
