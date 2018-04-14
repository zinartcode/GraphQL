const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

//Hardcoded Data
const customers = [
  {id:'1', name:'Bill Smith', email:'smith@gmail.com', age:45},
  {id:'2', name:'Sasha Grey', email:'grey@gmail.com', age:33},
  {id:'3', name:'Leonardo Di Captio', email:'leo@gmail.com', age:27},
  {id:'4', name:'Elon Mask', email:'mask@gmail.com', age:39},
]

// Customer type
const CustomerType = new GraphQLObjectType({
  name: 'Customer' ,
  fields:() => ({
    id: {type:GraphQLString},
    name: {type:GraphQLString},
    email: {type:GraphQLString},
    age: {type:GraphQLInt},
  })
});
// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    customer:{
      type: CustomerType,
      args:{
        id:{type:GraphQLString}
      },
      resolve(parentValue, args){
        for(let i = 0; i < customers.length; i++){
          if(customers[i].id == args.id){
            return customers[i];
          }
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
