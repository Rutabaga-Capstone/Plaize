// Sample pins with plants until we fetch them from the db
let pins = [
  {
    id: 1,
    coordinate: {latitude: 41.895506, longitude: -87.639014},
    title: 'Fullstack Academy',
    hasPoisonousPlants: true,
    description: 'Best coding academy ever',
    plants: [
      {
        commonName: 'Poison Oak',
        scientificName: 'A scientific name....',
        isPoisonous: true,
        pin: {
          id: 1
        }
      },
      {
        commonName: 'Poison Ivy',
        scientificName: 'A scientific name....',
        isPoisonous: true,
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
    plants: [
      {
        commonName: 'Aloe Vera',
        scientificName: 'A scientific name....',
        isPoisonous: false,
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
    plants: [
      {
        commonName: 'Aloe Vera',
        scientificName: 'A scientific name....',
        isPoisonous: false,
        pin: {
          id: 3
        }
      }
    ]
  }
]

export default pins
