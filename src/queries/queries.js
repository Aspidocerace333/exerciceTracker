import {gql} from 'apollo-boost';

const addUserMutation = gql`

  mutation($username: String!){
    addUser(username: $username){
      username
      id
    }
  }
`

const getUserQuery = gql`

  query($id: ID){
    user(id: $id){
      id
      username
    }
  }
`

const getUsersQuery = gql`

  query{
    users{
      id
      username
    }
  }
`

const addExerciseMutation = gql`

  mutation($description: String!, $duration: Int!,$date: DateTime!, $userId: ID!){
    addExercise(description: $description, duration: $duration, date: $date, userId: $userId){
      description
      duration
      date
      id
      user{
        username
      }
    }
  }
`

const getExerciseQuery = gql`

  query($id: ID){
    exercise(id: String){
      description
      duration
      date
      id
      user{
        username
      }
    }
  }


`

const getExercisesQuery = gql`
{
  exercises{
    description
    duration
    date
    id
    user{
      username
    }
  }
}

`

const deleteExerciseQuery = gql`
  mutation($id: ID){
   deleteExercise(id: $id){
     description
     duration
     date
     id
     user{
       username
     }
   }
  }
`

const updateExerciseQuery = gql`
  mutation($id: ID, $description: String!, $duration: Int!, $date: DateTime, $userId: ID!){
   updateExercise(id: $id, description: $description, duration: $duration, date: $date, userId: $userId){
     description
     duration
     date
     id
     user{
       username
     }
   }
  }
`
/*
const getAuthorsQuery = gql`
{
  authors{
    name
    id
  }
}
`

const addBookMutation = gql`

  mutation($name: String!, $genre: String!, $authorId: ID!){
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      id
    }
  }
`

const getBookQuery = gql`
  query($id: ID){
    book(id: $id){
      id
      name
      genre
      author{
        id
        name
        age
        books{
          name
          id
        }
      }
    }
  }
`
*/
//export {getExercisesQuery, getAuthorsQuery, addBookMutation, getBookQuery}
export { addUserMutation, getUserQuery, getUsersQuery,
   addExerciseMutation, getExerciseQuery, getExercisesQuery,
   deleteExerciseQuery, updateExerciseQuery
 };
