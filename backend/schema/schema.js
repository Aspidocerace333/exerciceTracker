const graphql = require('graphql');
//const _= require('lodash');
const Exercise = require('../models/exercise');
const User = require('../models/user');
const date = require("graphql-iso-date");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLScalarType
} = graphql;
const {
  GraphQLDateTime
} = date;

const ExerciseType = new GraphQLObjectType({
  name: 'Exercise',
  fields: () => ({
    id: { type: GraphQLID },
    description: { type: GraphQLString },
    duration: { type: GraphQLInt },
    date: { type: GraphQLDateTime },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    exercises: {
      type: new GraphQLList(ExerciseType),
      resolve(parent, args) {
        return Exercise.find({ userId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    exercise: {
      type: ExerciseType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Exercise.findById(args.id);
      }
    },

    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      }
    },

    exercises: {
      type: new GraphQLList(ExerciseType),
      resolve(parent, args) {
        return Exercise.find({});
      }
    },

    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      }
    }
  }

});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {

    addUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let user = new User({
          username: args.username
        });
        return user.save();
      }
    },

    addExercise: {
      type: ExerciseType,
      args: {
        description: { type: new GraphQLNonNull(GraphQLString) },
        duration: { type: new GraphQLNonNull(GraphQLInt) },
        date: { type: GraphQLDateTime },
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let exercise = new Exercise({
          description: args.description,
          duration: args.duration,
          date: args.date,
          userId: args.userId,
        });
        return exercise.save();
      }
    },

    deleteUser: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findByIdAndDelete(args.id);
      }
    },

    deleteExercise: {
      type: ExerciseType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Exercise.findByIdAndDelete(args.id);
      }
    },

    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        username: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(args.id, { username: args.username });
      }
    },

    updateExercise: {
      type: ExerciseType,
      args: {
        id: { type: GraphQLID },
        description: { type: new GraphQLNonNull(GraphQLString) },
        duration: { type: new GraphQLNonNull(GraphQLInt) },
        date: { type: GraphQLDateTime },
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Exercise.findByIdAndUpdate(args.id, {
          description: args.description,
          duration: args.duration,
          date: args.date,
          userId: args.userId
        });
      }
    }


  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
