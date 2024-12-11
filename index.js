const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Student {
    id: ID!
    name: String
    age: Int
    courses: [String]
  }

  type Query {
    hello: String
    student(id: ID!): Student
    students: [Student]
  }

  type Mutation {
    addStudent(name: String!, age: Int!, courses: [String]!): Student
    updateStudent(id: ID!, name: String, age: Int, courses: [String]): Student
  }
`);

// Mock database
const studentsDB = [
  { id: '1', name: 'John Doe', age: 20, courses: ['Math', 'Science'] },
  { id: '2', name: 'Jane Smith', age: 22, courses: ['History', 'Art'] },
];

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello, GraphQL World!';
  },
  student: ({ id }) => {
    return studentsDB.find(student => student.id === id);
  },
  students: () => {
    return studentsDB;
  },
  addStudent: ({ name, age, courses }) => {
    const newStudent = {
      id: String(studentsDB.length + 1),
      name,
      age,
      courses,
    };
    studentsDB.push(newStudent);
    return newStudent;
  },
  updateStudent: ({ id, name, age, courses }) => {
    const student = studentsDB.find(student => student.id === id);
    if (!student) throw new Error('Student not found');
    if (name !== undefined) student.name = name;
    if (age !== undefined) student.age = age;
    if (courses !== undefined) student.courses = courses;
    return student;
  },
};

const app = express();

app.use(
  '/',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: {
      defaultQuery: `{
  students {
    id
    name
    age
    courses
  }
}`,
    },
  })
);

app.listen(4000, () =>
  console.log('Running a GraphQL API server at http://localhost:4000/')
);
