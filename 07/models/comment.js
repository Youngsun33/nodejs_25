module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: DataTypes.TEXT,
    },
    { tableNAme: "comments" }
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.Post, {
      foreignKey: "postId",
      as: "posts",
    });
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
      as: "author",
    });
  };
  return Comment;
};
