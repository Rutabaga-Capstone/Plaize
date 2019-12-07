const ApolloClient = require('apollo-boost').default
const gql = require('graphql-tag')
const fetch = require('node-fetch')
const client = new ApolloClient({
  uri: 'http://localhost:1234/graphql',
  fetch
})
client
  .mutate({
    mutation: gql`
      mutation {
        u1: CreateUser(
          id: 79

          name: "Randy"
          email: "randydxp@gmail.com"
          password: "1234"
          leaves: 0
          regDate: {formatted: "2019-09-20"}
        ) {
          id
          name
          email
          leaves
        }
        u2: CreateUser(
          id: 55
          name: "Fernando"
          email: "fer@innovaresip.com"
          password: "1234"
          leaves: 0
          regDate: {formatted: "2019-09-21"}
        ) {
          id
          name
          email
          leaves
        }
        u3: CreateUser(
          id: 41
          name: "Sean"
          email: "gatewaywebdesign18@gmail.com"
          password: "1234"
          leaves: 0
          regDate: {formatted: "2019-09-22"}
        ) {
          id
          name
          email
          leaves
        }
        u4: CreateUser(
          id: 28
          name: "Pawel"
          email: "pawel3ala@gmail.com"
          password: "1234"
          leaves: 0
          regDate: {formatted: "2019-09-23"}
        ) {
          id
          name
          email
          leaves
        }
        u5: CreateUser(
          id: 62
          name: "cc"
          email: "cc"
          password: "cc"
          leaves: 0
          regDate: {formatted: "2019-09-24"}
        ) {
          id
          name
          email
          leaves
        }
        p1: CreatePlant(
          id: 38
          commonName: "Poison Ivy"
          scientificName: "Toxicodendron radicans"
          imageURL: "https://www.petguide.com/wp-content/uploads/2019/03/poison-ivy-dogs-668x444.jpg"
          description: "A poisonous Asian and Eastern North American flowering plant in the genus Toxicodendron. Causes rashes when touched"
          isPoisonous: true
        ) {
          id
          commonName
          scientificName
          imageURL
          description
          isPoisonous
        }
        p2: CreatePlant(
          id: 57
          commonName: "Poison Oak"
          scientificName: "Toxicodendron diversilobum"
          imageURL: "http://nativeplantspnw.com/wp-content/uploads/2017/01/Poison-Oak-624x470.png"
          description: "A woody vine or shrub in the sumac family, Anacardiaceae. Causes rashes when touched"
          isPoisonous: true
        ) {
          id
          commonName
          scientificName
          imageURL
          description
          isPoisonous
        }
        p3: CreatePlant(
          id: 99
          commonName: "Poison Sumac"
          scientificName: "Toxicodendron diversilobum"
          imageURL: "https://cdn.britannica.com/50/198250-050-2D0D4360/Poison-sumac-Massachusetts.jpg"
          description: "A woody shrub or small tree growing to 9 m (30 ft) tall. Causes a rash when touch"
          isPoisonous: true
        ) {
          id
          commonName
          scientificName
          imageURL
          description
          isPoisonous
        }
        p4: CreatePlant(
          id: 100
          commonName: "Fly Agaric"
          scientificName: "Amanita Muscaria"
          imageURL: "https://cdn.britannica.com/50/198250-050-2D0D4360/Poison-sumac-Massachusetts.jpg"
          description: "Commonly known to be the mushroom which Mario Mario's Growth mushroom is based off of, fly agaric is a basidiomycete of the genus Amanita. It is also a muscimol mushroom. It can cause liver toxicity, hallucinations, and death when eaten"
          isPoisonous: true
        ) {
          id
          commonName
          scientificName
          imageURL
          description
          isPoisonous
        }
        p5: CreatePlant(
          id: 45
          commonName: "Locoweed"
          scientificName: "Oxytropis"
          imageURL: "https://www.aspca.org/sites/default/files/styles/medium_image_300x200/public/field/image/plants/loco-weed-r.jpg?itok=vq-D8CBK"
          description: "Locoweed (also crazyweed and loco) is a common name in North America for any plant that produces swainsonine, a phytotoxin harmful to livestock."
          isPoisonous: true
        ) {
          id
          commonName
          scientificName
          imageURL
          description
          isPoisonous
        }
        p6: CreatePlant(
          id: 96
          commonName: "Morning Glory"
          scientificName: "Oxytropis"
          imageURL: "https://smhttp-ssl-17653.nexcesscdn.net/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/m/o/morn-glory-mailbox.jpg"
          description: "Morning glory (also written as morning-glory) is the common name for over 1,000 species of flowering plants in the family Convolvulaceae, whose current taxonomy and systematics are in flux."
          isPoisonous: false
        ) {
          id
          commonName
          scientificName
          imageURL
          description
          isPoisonous
        }
      }
    `
  })
  .then(() => console.log('Done seeding the DB!!!'))
