const mongoose = require('mongoose');

// Defined the schema for a user and stored it in userSchema. The schema tells Mongoose how the user objects are to be stored in the database.
const userSchema = new mongoose.Schema({
  // We can add validation rules here. We can also use Mongoose custom validator to create new validations.
  username: {
    type: String,
    minLength: 3,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Please enter Email address'],
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: '',
  },
  profilePicture: {
    type: String,
    default:
      'https://images.unsplash.com/photo-1551373884-8a0750074df7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  bio: {
    type: String,
    default: '',
  },
  // Notice this is an array of user IDs referring to users
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// By default when we retrieve the user objects from Mongo, the _v property is also retrieved which is unwanted. All instances of a model will have the toJSON method. We use the set method and the transform funcction to change how the toJSON method works.
// Additionally we have also trasnsformed the 'id' object to a string.
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// mongoose.model('User', userSchema) : This defines a matching model for the user schema. The first parameter is the singular name of the model. Collection name will be automatically set to "users" by Mongoose.
module.exports = mongoose.model('User', userSchema);
