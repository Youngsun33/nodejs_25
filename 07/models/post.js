module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      fileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      attachments: {
        // 여러개 포스트 가능하게.
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
      },
    },
    { tableName: "posts" }
  );
  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: "authorId",
      as: "author",
    });
    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      as: "comments",
    });
  };
  return Post;
};
