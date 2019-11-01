module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define(
    "Burger",
    {
      burger: DataTypes.STRING,
      devoured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      toGo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      eatenBy: DataTypes.STRING
    }
    // {
    //   classMethods: {
    //     associate: function(models) {
    //       Burger.hasOne(models.Customer);
    //     }
    //   }
    // }
  );

  // Burger.associate = function(models) {
  //   Burger.belongsTo(models.Customer, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return Burger;
};
