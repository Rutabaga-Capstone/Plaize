export default /* GraphQL */ `
  mutation {
    1: CreateUser(id: 1, name: "Randy", email: "randydxp@gmail.com", password: "1234") {
      id
      name
      email
    }
    2: CreateUser(id: 2, name: "Fernando", email: "fer@innovaresip.com", password: "1234") {
      id
      name
      email
    }
    3: CreateUser(id: 3, name: "Sean", email: "gatewaywebdesign18@gmail.com", password: "1234") {
      id
      name
      email
    }
    4: CreateUser(id: 4, name: "Pawel", email: "pawel3ala@gmail.com", password: "1234") {
      id
      name
      email
    }
    CreatePlant(
      commonName: "Poison Ivy",
      scientificName: "Toxicodendron radicans",
    	imageURL: "https://www.petguide.com/wp-content/uploads/2019/03/poison-ivy-dogs-668x444.jpg"
      description: "A poisonous Asian and Eastern North American flowering plant in the genus Toxicodendron. Causes rashes when touched"
      poisonous: true
    ) {
      id
      commonName
      scientificName
      imageURL
      description
      poisonous
    }
    CreatePlant(
      commonName: "Poison Oak",
      scientificName: "Toxicodendron diversilobum",
    	imageURL: "http://nativeplantspnw.com/wp-content/uploads/2017/01/Poison-Oak-624x470.png"
      description: "A woody vine or shrub in the sumac family, Anacardiaceae. Causes rashes when touched"
      poisonous: true
    ) {
      id
      commonName
      scientificName
      imageURL
      description
      poisonous
    }
    CreatePlant(
      commonName: "Poison Sumac",
      scientificName: "Toxicodendron diversilobum",
    	imageURL: "https://cdn.britannica.com/50/198250-050-2D0D4360/Poison-sumac-Massachusetts.jpg"
      description: "A woody shrub or small tree growing to 9 m (30 ft) tall. Causes a rash when touch"
      poisonous: true
    ) {
      id
      commonName
      scientificName
      imageURL
      description
      poisonous
    }
  }

`
