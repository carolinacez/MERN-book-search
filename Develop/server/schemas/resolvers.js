//Define the query and mutation functionality to work with the Mongoose models.
//Use the functionality in the user-controller.js as a guide.

const { User } = require('../models')
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { Query } = require('mongoose');

const resolvers = {
Query: {
    me: async (parent, { username }) => {
        return User.findOne({ username })
    }
}, 
Mutation: {
    createUser: async(parent, args) => {
        const user = await User.create(args)
        return {user}
    }, 
    login: async(parent, {email, password}) => {
        const user = await User.findOne({email})

        if (!user) {
            throw new AuthenticationError('Incorrect credentials')
        }
        const correctPassword = await user.isCorrectPassword(password)
    }
}
}

