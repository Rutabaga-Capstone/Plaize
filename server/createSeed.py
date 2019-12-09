from random import randint

filename = "seedtest1.js"

def create_and_return_id():
    return "id: " + str(randint(1,25))

def create_and_return_from_to():
    return "(from: {" + create_and_return_id() + "}, to: {" + create_and_return_id() + "}) {"

def create_seed_files(filename):
    with open(filename, "w+") as f:
        f.write("""const ApolloClient = require('apollo-boost').default
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
                  """ +  create_and_return_id() + """
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
                  """ +  create_and_return_id() + """
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
                  """ +  create_and_return_id() + """
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
                  """ +  create_and_return_id() + """
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
                  """ +  create_and_return_id() + """
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
                  """ + create_and_return_id() + """
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
                  """ + create_and_return_id() + """
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
                  """ + create_and_return_id() + """
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
                  """ + create_and_return_id() + """
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
                  """ + create_and_return_id() + """
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
                  """ + create_and_return_id() + """
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
                pin1: CreatePin(""" + create_and_return_id() + """, lat: 41.895506, lng: -87.639014) {
                  id
                  lat
                  lng
                }
                pin2: CreatePin(""" + create_and_return_id() + """, lat: 41.896461, lng: -87.641228) {
                  id
                  lat
                  lng
                }
                pin3: CreatePin(""" + create_and_return_id() + """, lat: 41.895506, lng: -87.639014) {
                  id
                  lat
                  lng
                }
                pin4: CreatePin(""" + create_and_return_id() + """, lat: 41.895060, lng: -87.639914) {
                  id
                  lat
                  lng
                }
                pin5: CreatePin(""" + create_and_return_id() + """, lat: 41.897461, lng: -87.641328) {
                  id
                  lat
                  lng
                }
                pin6: CreatePin(""" + create_and_return_id() + """, lat: 41.896506, lng: -87.632014) {
                  id
                  lat
                  lng
                }
                up1: AddUserPlants""" + create_and_return_from_to() + """
                  from {
                    name
                  }
                  to {
                    commonName
                    description
                  }
                }
                upin1: AddUserPins""" + create_and_return_from_to() + """
                  from {
                    name
                  }
                  to {
                    lat
                    lng
                  }
                }
                pp1: AddPinPlants""" + create_and_return_from_to() + """
                  from {
                    lat
                    lng
                  }
                  to {
                    commonName
                    description
                  }
                }
                up2: AddUserPlants""" + create_and_return_from_to() + """
                  from {
                    name
                  }
                  to {
                    commonName
                    description
                  }
                }
                upin2: AddUserPins""" + create_and_return_from_to() + """
                  from {
                    name
                  }
                  to {
                    lat
                    lng
                  }
                }
                pp2: AddPinPlants""" + create_and_return_from_to() + """
                  from {
                    lat
                    lng
                  }
                  to {
                    commonName
                    description
                  }
                }
                up3: AddUserPlants""" + create_and_return_from_to() + """
                  from {
                    name
                  }
                  to {
                    commonName
                    description
                  }
                }
                upin3: AddUserPins""" + create_and_return_from_to() + """
                  from {
                    name
                  }
                  to {
                    lat
                    lng
                  }
                }
                pp3: AddPinPlants""" + create_and_return_from_to() + """
                  from {
                    lat
                    lng
                  }
                  to {
                    commonName
                    description
                  }
                }
                up4: AddUserPlants""" + create_and_return_from_to() + """
                  from {
                    name
                  }
                  to {
                    commonName
                    description
                  }
                }
                upin4: AddUserPins""" + create_and_return_from_to() + """
                  from {
                    name
                  }
                  to {
                    lat
                    lng
                  }
                }
                pp4: AddPinPlants""" + create_and_return_from_to() + """
                  from {
                    lat
                    lng
                  }
                  to {
                    commonName
                    description
                  }
                }
                up5: AddUserPlants""" + create_and_return_from_to() + """
                  from {
                    name
                  }
                  to {
                    commonName
                    description
                  }
                }
                upin5: AddUserPins""" + create_and_return_from_to() + """
                  from {
                    name
                  }
                  to {
                    lat
                    lng
                  }
                }
                pp5: AddPinPlants""" + create_and_return_from_to() + """
                  from {
                    lat
                    lng
                  }
                  to {
                    commonName
                    description
                  }
                }
                up6: AddUserPlants""" + create_and_return_from_to() + """
                  from {
                    name
                  }
                  to {
                    commonName
                    description
                  }
                }
                upin6: AddUserPins""" + create_and_return_from_to() + """
                  from {
                    name
                  }
                  to {
                    lat
                    lng
                  }
                }
                pp6: AddPinPlants""" + create_and_return_from_to() + """
                  from {
                    lat
                    lng
                  }
                  to {
                    commonName
                    description
                  }
                }
              }
            `
          })
          .then(() => console.log('Done seeding the DB!!!'))
          .catch(error => console.error(error))""")
    f.close()

create_seed_files("seed5.js")
create_seed_files("seed6.js")
create_seed_files("seed7.js")
create_seed_files("seed8.js")
create_seed_files("seed9.js")
