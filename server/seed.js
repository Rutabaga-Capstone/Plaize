module.exports = `
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
      id: 1
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
      id: 2
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
      id: 3
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
    CreatePlant(
      id: 4
      commonName: "Fly Agaric",
      scientificName: "Amanita Muscaria",
    	imageURL: "https://cdn.britannica.com/50/198250-050-2D0D4360/Poison-sumac-Massachusetts.jpg"
      description: "Commonly known to be the mushroom which Mario Mario's Growth mushroom is based off of, fly agaric is a basidiomycete of the genus Amanita. It is also a muscimol mushroom. It can cause liver toxicity, hallucinations, and death when eaten"
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
      id: 5
      commonName: "Locoweed",
      scientificName: "Oxytropis",
    	imageURL: "https://www.aspca.org/sites/default/files/styles/medium_image_300x200/public/field/image/plants/loco-weed-r.jpg?itok=vq-D8CBK"
      description: "Locoweed (also crazyweed and loco) is a common name in North America for any plant that produces swainsonine, a phytotoxin harmful to livestock."
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
      id: 6
      commonName: "Morning Glory",
      scientificName: "Oxytropis",
    	imageURL: "https://smhttp-ssl-17653.nexcesscdn.net/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/m/o/morn-glory-mailbox.jpg"
      description: "Morning glory (also written as morning-glory) is the common name for over 1,000 species of flowering plants in the family Convolvulaceae, whose current taxonomy and systematics are in flux."
      poisonous: false
    ) {
      id
      commonName
      scientificName
      imageURL
      description
      poisonous
    }
    CreatePin( id: 1 lat: 41.895506 lng: -87.639014 ) { id lat lng }
    CreatePin( id: 2 lat: 41.896461 lng: -87.641228 ) { id lat lng }
    CreatePin( id: 3 lat: 41.895506 lng: -87.639014 ) { id lat lng }
    CreatePin( id: 4 lat: 41.895060 lng: -87.639914 ) { id lat lng }
    CreatePin( id: 5 lat: 41.897461 lng: -87.641328 ) { id lat lng }
    CreatePin( id: 6 lat: 41.896506 lng: -87.632014 ) { id lat lng }
  }

  AddUserPlants(from: {id: 1}, to: {id: 1})
  { from { name } to { commonName description } }
  AddPinPlants(from: {id: 1}, to: {id: 1})
  { from { lat lng } to { commonName description } }
  AddUserPins(from: {id: 1}, to: {id: 1})
  { from { name } to { lat lng }}

  AddUserPlants(from: {id: 1}, to: {id: 2})
  { from { name } to { commonName description } }
  AddUserPins(from: {id: 1}, to: {id: 2})
  { from { name } to { lat lng }}
  AddPinPlants(from: {id: 2}, to: {id: 2})
  { from { lat lng } to { commonName description } }

  AddUserPlants(from: {id: 1}, to: {id: 3})
  { from { name } to { commonName description } }
  AddUserPins(from: {id: 1}, to: {id: 3})
  { from { name } to { lat lng }}
  AddPinPlants(from: {id: 3}, to: {id: 3})
  { from { lat lng } to { commonName description } }

  AddUserPlants(from: {id: 2}, to: {id: 4})
  { from { name } to { commonName description } }
  AddUserPins(from: {id: 2}, to: {id: 4})
  { from { name } to { lat lng }}
  AddPinPlants(from: {id: 4}, to: {id: 4})

  AddUserPlants(from: {id: 3}, to: {id: 5})
  { from { name } to { commonName description } }
  AddUserPins(from: {id: 3}, to: {id: 5})
  { from { name } to { lat lng }}
  AddPinPlants(from: {id: 5}, to: {id: 5})
  { from { lat lng } to { commonName description } }
  AddUserPlants(from: {id: 4}, to: {id: 6})
  { from { name } to { commonName description } }
  AddUserPins(from: {id: 4}, to: {id: 6})
  { from { name } to { lat lng }}
  AddPinPlants(from: {id: 6}, to: {id: 6})
  { from { lat lng } to { commonName description } }




`

const COORDINATES = `
 Fullstack: coordinate: {latitude: 41.895506, longitude: -87.639014},
 Starbucks: coordinate: {latitude: 41.896461, longitude: -87.641228},
 Chiropractor: coordinate: {latitude: 41.881737, longitude: -87.632751}
`

const DELETEALLPINS = `
MATCH (n)
OPTIONAL MATCH (n)-[r]-()
WITH n,r LIMIT 50000
DELETE n,r
RETURN count(n) as deletedNodesCount
`

const EXAMPLES = `
query {
  Plant {
    id
    commonName
    description
  }
  User(id: "9dc274ed-1837-4771-9a24-5d4e11b04e4b") {
    id
    name
    plants {
      id
      commonName
      scientificName
      user {
        name
        email
      }
    }
    pins {
      user{
        name
      }
      plant {
        commonName
      }
    }
  }
}

mutation AddUserPlants {
  AddUserPlants(from: {id: "9dc274ed-1837-4771-9a24-5d4e11b04e4b"}, to: {id: "e67254ba-1420-48e5-89ac-e2460bce778d"}) {
    from {
      name
    }
    to {
      commonName
      description
    }
  }
}



mutation CreateUser {
  CreateUser(name: "Jerry", email: "rick@morty.com", password: "1234") {
    name
    email
    password
  }
}

mutation CreatePlant {

  CreatePin(lat: 42.1293892, long: 83.1231287)
  { id lat long }

  CreatePlant(
    commonName: "Poison Ivy",
    scientificName: "Toxicodendron radicans",
  	imageURL: "https://www.petguide.com/wp-content/uploads/2019/03/poison-ivy-dogs-668x444.jpg"
    description: "a poisonous Asian and Eastern North American flowering plant in the genus Toxicodendron"
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
