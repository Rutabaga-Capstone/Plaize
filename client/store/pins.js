// Sample pins with plants until we fetch them from the db
let pins = [
  {
    id: 1,
    coordinate: {latitude: 41.895506, longitude: -87.639014},
    title: 'Poison Oak',
    description: '',
    plants: [
      {
        commonName: 'Poison Oak',
        scientificName: 'Toxicodendron diversilobum',
        imageURL:
          'http://nativeplantspnw.com/wp-content/uploads/2017/01/Poison-Oak-624x470.png',
        description:
          'A woody vine or shrub in the sumac family, Anacardiaceae. Causes rashes when touched',
        isPoisonous: true
      }
    ]
  },
  {
    id: 2,
    coordinate: {latitude: 41.896461, longitude: -87.641228},
    title: 'Morning Glory',
    description: '',
    plants: [
      {
        commonName: 'Morning Glory',
        scientificName: 'Oxytropis',
        imageURL:
          'https://smhttp-ssl-17653.nexcesscdn.net/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/m/o/morn-glory-mailbox.jpg',
        description:
          'Morning glory is the common name for over 1,000 species of flowering plants in the family Convolvulaceae, whose current taxonomy and systematics are in flux.'
      }
    ]
  },
  {
    id: 3,
    coordinate: {latitude: 41.8949, longitude: -87.639398},
    title: 'Poison Ivy',
    description: '',
    plants: [
      {
        commonName: 'Poison Ivy',
        scientificName: 'Toxicodendron radicans',
        imageURL:
          'https://www.petguide.com/wp-content/uploads/2019/03/poison-ivy-dogs-668x444.jpg',
        description:
          'A poisonous Asian and Eastern North American flowering plant in the genus Toxicodendron. Causes rashes when touched',
        isPoisonous: true
      }
    ]
  },
  {
    id: 4,
    coordinate: {latitude: 41.895, longitude: -87.639},
    title: 'Locoweed',
    description: '',
    plants: [
      {
        commonName: 'Locoweed',
        scientificName: 'Oxytropis',
        imageURL:
          'https://www.aspca.org/sites/default/files/styles/medium_image_300x200/public/field/image/plants/loco-weed-r.jpg?itok=vq-D8CBK',
        description:
          'Locoweed (also crazyweed and loco) is a common name in North America for any plant that produces swainsonine, a phytotoxin harmful to livestock.',
        isPoisonous: true
      }
    ]
  },
  {
    id: 5,
    coordinate: {latitude: 41.8961, longitude: -87.641},
    title: 'Fly Agaric',
    description: '',
    plants: [
      {
        commonName: 'Fly Agaric',
        scientificName: 'Amanita Muscaria',
        imageURL:
          'https://cdn.britannica.com/50/198250-050-2D0D4360/Poison-sumac-Massachusetts.jpg',
        description:
          "Commonly known to be the mushroom which Mario Mario's Growth mushroom is based off of, fly agaric is a basidiomycete of the genus Amanita. It is also a muscimol mushroom. It can cause liver toxicity, hallucinations, and death when eaten",
        isPoisonous: true
      }
    ]
  },
  {
    id: 6,
    coordinate: {latitude: 41.8817, longitude: -87.6327},
    title: 'Poison Sumac',
    description: '',
    plants: [
      {
        commonName: 'Poison Sumac',
        scientificName: 'Toxicodendron diversilobum',
        imageURL:
          'https://cdn.britannica.com/50/198250-050-2D0D4360/Poison-sumac-Massachusetts.jpg',
        description:
          'A woody shrub or small tree growing to 9 m (30 ft) tall. Causes a rash when touch',
        isPoisonous: true
      }
    ]
  },
  {
    id: 7,
    coordinate: {latitude: 41.893506, longitude: -87.637014},
    title: 'Poison Oak',
    description: '',
    plants: [
      {
        commonName: 'Poison Oak',
        scientificName: 'Toxicodendron diversilobum',
        imageURL:
          'http://nativeplantspnw.com/wp-content/uploads/2017/01/Poison-Oak-624x470.png',
        description:
          'A woody vine or shrub in the sumac family, Anacardiaceae. Causes rashes when touched',
        isPoisonous: true
      }
    ]
  },
  {
    id: 8,
    coordinate: {latitude: 41.897461, longitude: -87.642228},
    title: 'Morning Glory',
    description: '',
    plants: [
      {
        commonName: 'Morning Glory',
        scientificName: 'Oxytropis',
        imageURL:
          'https://smhttp-ssl-17653.nexcesscdn.net/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/m/o/morn-glory-mailbox.jpg',
        description:
          'Morning glory is the common name for over 1,000 species of flowering plants in the family Convolvulaceae, whose current taxonomy and systematics are in flux.'
      }
    ]
  },
  {
    id: 9,
    coordinate: {latitude: 41.89471, longitude: -87.639498},
    title: 'Poison Ivy',
    description: '',
    plants: [
      {
        commonName: 'Poison Ivy',
        scientificName: 'Toxicodendron radicans',
        imageURL:
          'https://www.petguide.com/wp-content/uploads/2019/03/poison-ivy-dogs-668x444.jpg',
        description:
          'A poisonous Asian and Eastern North American flowering plant in the genus Toxicodendron. Causes rashes when touched',
        isPoisonous: true
      }
    ]
  },
  {
    id: 10,
    coordinate: {latitude: 41.8962, longitude: -87.63817},
    title: 'Locoweed',
    description: '',
    plants: [
      {
        commonName: 'Locoweed',
        scientificName: 'Oxytropis',
        imageURL:
          'https://www.aspca.org/sites/default/files/styles/medium_image_300x200/public/field/image/plants/loco-weed-r.jpg?itok=vq-D8CBK',
        description:
          'Locoweed (also crazyweed and loco) is a common name in North America for any plant that produces swainsonine, a phytotoxin harmful to livestock.',
        isPoisonous: true
      }
    ]
  },
  {
    id: 11,
    coordinate: {latitude: 41.8971, longitude: -87.6417},
    title: 'Fly Agaric',
    description: '',
    plants: [
      {
        commonName: 'Fly Agaric',
        scientificName: 'Amanita Muscaria',
        imageURL:
          'https://cdn.britannica.com/50/198250-050-2D0D4360/Poison-sumac-Massachusetts.jpg',
        description:
          "Commonly known to be the mushroom which Mario Mario's Growth mushroom is based off of, fly agaric is a basidiomycete of the genus Amanita. It is also a muscimol mushroom. It can cause liver toxicity, hallucinations, and death when eaten",
        isPoisonous: true
      }
    ]
  },
  {
    id: 12,
    coordinate: {latitude: 41.8837, longitude: -87.6347},
    title: 'Poison Sumac',
    description: '',
    plants: [
      {
        commonName: 'Poison Sumac',
        scientificName: 'Toxicodendron diversilobum',
        imageURL:
          'https://cdn.britannica.com/50/198250-050-2D0D4360/Poison-sumac-Massachusetts.jpg',
        description:
          'A woody shrub or small tree growing to 9 m (30 ft) tall. Causes a rash when touch',
        isPoisonous: true
      }
    ]
  },
  {
    id: 13,
    coordinate: {latitude: 41.907461, longitude: -87.643228},
    title: 'Morning Glory',
    description: '',
    plants: [
      {
        commonName: 'Morning Glory',
        scientificName: 'Oxytropis',
        imageURL:
          'https://smhttp-ssl-17653.nexcesscdn.net/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/m/o/morn-glory-mailbox.jpg',
        description:
          'Morning glory is the common name for over 1,000 species of flowering plants in the family Convolvulaceae, whose current taxonomy and systematics are in flux.'
      }
    ]
  },
  {
    id: 14,
    coordinate: {latitude: 41.91471, longitude: -87.640498},
    title: 'Poison Ivy',
    description: '',
    plants: [
      {
        commonName: 'Poison Ivy',
        scientificName: 'Toxicodendron radicans',
        imageURL:
          'https://www.petguide.com/wp-content/uploads/2019/03/poison-ivy-dogs-668x444.jpg',
        description:
          'A poisonous Asian and Eastern North American flowering plant in the genus Toxicodendron. Causes rashes when touched',
        isPoisonous: true
      }
    ]
  },
  {
    id: 15,
    coordinate: {latitude: 41.8992, longitude: -87.63517},
    title: 'Locoweed',
    description: '',
    plants: [
      {
        commonName: 'Locoweed',
        scientificName: 'Oxytropis',
        imageURL:
          'https://www.aspca.org/sites/default/files/styles/medium_image_300x200/public/field/image/plants/loco-weed-r.jpg?itok=vq-D8CBK',
        description:
          'Locoweed (also crazyweed and loco) is a common name in North America for any plant that produces swainsonine, a phytotoxin harmful to livestock.',
        isPoisonous: true
      }
    ]
  },
  {
    id: 16,
    coordinate: {latitude: 41.9171, longitude: -87.6717},
    title: 'Fly Agaric',
    description: '',
    plants: [
      {
        commonName: 'Fly Agaric',
        scientificName: 'Amanita Muscaria',
        imageURL:
          'https://cdn.britannica.com/50/198250-050-2D0D4360/Poison-sumac-Massachusetts.jpg',
        description:
          "Commonly known to be the mushroom which Mario Mario's Growth mushroom is based off of, fly agaric is a basidiomycete of the genus Amanita. It is also a muscimol mushroom. It can cause liver toxicity, hallucinations, and death when eaten",
        isPoisonous: true
      }
    ]
  },
  {
    id: 17,
    coordinate: {latitude: 41.8637, longitude: -87.6147},
    title: 'Poison Sumac',
    description: '',
    plants: [
      {
        commonName: 'Poison Sumac',
        scientificName: 'Toxicodendron diversilobum',
        imageURL:
          'https://cdn.britannica.com/50/198250-050-2D0D4360/Poison-sumac-Massachusetts.jpg',
        description:
          'A woody shrub or small tree growing to 9 m (30 ft) tall. Causes a rash when touch',
        isPoisonous: true
      }
    ]
  }
]

export default pins
