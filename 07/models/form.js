module.exports = (sequelize, DataTypes) => {
  const Form = sequelize.define(
    "Form",
    {
      title: DataTypes.STRING,
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "forms",
    }
  );

  const Question = sequelize.define(
    "Question",
    {
      content: DataTypes.STRING,
    },
    {
      tableName: "questions",
    }
  );

  const Option = sequelize.define(
    "Option",
    {
      content: DataTypes.STRING,
    },
    { tableName: "options" }
  );

  const Response = sequelize.define(
    "Response",
    {
      description: DataTypes.STRING,
    },
    { tableName: "responses" }
  );

  const Answer = sequelize.define(
    "Answer",
    {
      description: DataTypes.STRING,
    },
    { tableName: "answers" }
  );

  // Associations
  Form.associate = function (models) {
    Form.hasMany(models.Question, {
      foreignKey: "formId",
      as: "questions",
    });
    Form.hasMany(models.Response, {
      foreignKey: "formId",
      as: "responses",
    });
  };

  Question.associate = function (models) {
    Question.belongsTo(models.Form, {
      foreignKey: "formId",
      as: "form",
    });
    Question.hasMany(models.Option, {
      foreignKey: "questionId",
      as: "options",
    });
    Question.hasMany(models.Answer, {
      foreignKey: "questionId",
      as: "answers",
    });
  };

  Option.associate = function (models) {
    Option.belongsTo(models.Question, {
      foreignKey: "questionId",
      as: "question",
    });
    // Option과 Answer의 관계는 보통 Answer가 Option을 참조합니다.
    Option.hasMany(models.Answer, {
      foreignKey: "optionId",
      as: "answers",
    });
  };

  Response.associate = function (models) {
    Response.belongsTo(models.Form, {
      foreignKey: "formId",
      as: "form",
    });
    Response.hasMany(models.Answer, {
      foreignKey: "responseId",
      as: "answers",
    });
  };

  Answer.associate = function (models) {
    Answer.belongsTo(models.Response, {
      foreignKey: "responseId",
      as: "response",
    });
    Answer.belongsTo(models.Question, {
      foreignKey: "questionId",
      as: "question",
    });
    Answer.belongsTo(models.Option, {
      foreignKey: "optionId",
      as: "option",
    });
  };

  return {
    Form,
    Question,
    Option,
    Response,
    Answer,
  };
};
