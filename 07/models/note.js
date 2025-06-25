module.exports = (sequelize, DataTypes) => {
  const note = sequelize.define(
    "Note",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
      },
      tag: {
        type: DataTypes.STRING,
      },
    },
    { tableName: "note" }
  );
  return note;
};
