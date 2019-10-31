module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    customer: DataTypes.STRING,
    burgersEaten: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  // Customer.associate = function(models) {
  //   Customer.hasMany(models.Burger, {
  //     onDelete: "cascade"
  //   });
  // };

  return Customer;
};
