export default /* GraphQL */ `
  mutation {
    1: CreateUser(id: "1", name: "Randy") {
      id
      name
    }
    2: CreateUser(id: "2", name: "Fernando") {
      id
      name
    }
    3: CreateUser(id: "3", name: "Sean") {
      id
      name
    }
    4: CreateUser(id: "4", name: "Pawel") {
      id
      name
    }
  }
`
