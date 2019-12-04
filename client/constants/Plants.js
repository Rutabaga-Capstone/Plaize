// for time I put this as our basic plant info, in production we need to query by plant
// name and then return the info as an object
export const getPlantInfo = commonName => {
  switch (commonName) {
    case 'Poison Ivy':
      return {
        commonName: 'Poison Ivy',
        scientificName: 'Toxicodendron radicans',
        imageURL:
          'https://www.petguide.com/wp-content/uploads/2019/03/poison-ivy-dogs-668x444.jpg',
        description:
          'A poisonous Asian and Eastern North American flowering plant in the genus Toxicodendron. Causes rashes when touched',
        isPoisonous: true
      }
    case 'Poison Oak':
      return {
        commonName: 'Poison Oak',
        scientificName: 'Toxicodendron diversilobum',
        imageURL:
          'http://nativeplantspnw.com/wp-content/uploads/2017/01/Poison-Oak-624x470.png',
        description:
          'A woody vine or shrub in the sumac family, Anacardiaceae. Causes rashes when touched',
        isPoisonous: true
      }
    case 'Poison Sumac':
      return {
        commonName: 'Poison Sumac',
        scientificName: 'Toxicodendron diversilobum',
        imageURL:
          'https://cdn.britannica.com/50/198250-050-2D0D4360/Poison-sumac-Massachusetts.jpg',
        description:
          'A woody shrub or small tree growing to 9 m (30 ft) tall. Causes a rash when touch',
        isPoisonous: true
      }
    case 'Fly Agaric':
      return {
        commonName: 'Fly Agaric',
        scientificName: 'Amanita Muscaria',
        imageURL:
          'https://cdn.britannica.com/50/198250-050-2D0D4360/Poison-sumac-Massachusetts.jpg',
        description:
          "Commonly known to be the mushroom which Mario Mario's Growth mushroom is based off of, fly agaric is a basidiomycete of the genus Amanita. It is also a muscimol mushroom. It can cause liver toxicity, hallucinations, and death when eaten",
        isPoisonous: true
      }
    case 'Locoweed':
      return {
        commonName: 'Locoweed',
        scientificName: 'Oxytropis',
        imageURL:
          'https://www.aspca.org/sites/default/files/styles/medium_image_300x200/public/field/image/plants/loco-weed-r.jpg?itok=vq-D8CBK',
        description:
          'Locoweed (also crazyweed and loco) is a common name in North America for any plant that produces swainsonine, a phytotoxin harmful to livestock.',
        isPoisonous: true
      }
    case 'Morning Glory':
      return {
        commonName: 'Morning Glory',
        scientificName: 'Oxytropis',
        imageURL:
          'https://smhttp-ssl-17653.nexcesscdn.net/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/m/o/morn-glory-mailbox.jpg',
        description:
          'Morning glory is the common name for over 1,000 species of flowering plants in the family Convolvulaceae, whose current taxonomy and systematics are in flux.',
        isPoisonous: false
      }
    default:
      return null
  }
}
