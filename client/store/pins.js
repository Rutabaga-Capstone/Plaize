// Sample pins with plants until we fetch them from the db
let pins = [
  {
    id: 1,
    coordinate: {latitude: 41.895506, longitude: -87.639014},
    // title: 'Fullstack Academy',
    hasPoisonousPlants: true,
    // description: 'Best coding academy ever',
    createdBy: 'cc',
    plants: [
      {
        commonName: 'Poison Oak',
        scientificName: 'A scientific name....',
        isPoisonous: true,
        createdBy: 'cc',
        pin: {
          id: 1
        }
      }
    ]
  },
  {
    id: 2,
    coordinate: {latitude: 41.896461, longitude: -87.641228},
    title: 'Starbucks',
    hasPoisonousPlants: false,
    description: 'Fancy coffee shop',
    createdBy: 'cc',
    plants: [
      {
        commonName: 'Aloe Vera',
        scientificName: 'A scientific name....',
        isPoisonous: false,
        createdBy: 'cc',
        pin: {
          id: 2
        }
      }
    ]
  },
  {
    id: 3,
    coordinate: {latitude: 41.881737, longitude: -87.632751},
    title: 'Chiropractor',
    hasPoisonousPlants: false,
    description: 'Get your bones cracked here',
    createdBy: 'cc',
    plants: [
      {
        commonName: 'Aloe Vera',
        scientificName: 'A scientific name....',
        isPoisonous: false,
        createdBy: 'cc',
        pin: {
          id: 3
        }
      }
    ]
  }
]

export default pins
