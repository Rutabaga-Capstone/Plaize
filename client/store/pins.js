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
        scientificName: 'A scientific name....',
        description:
          'A long description of this plant....A long description of this plant....A long description of this plant....A long description of this plant....A long description of this plant....',
        isPoisonous: true,
        imageURL:
          'http://nativeplantspnw.com/wp-content/uploads/2017/01/Poison-Oak-624x470.png'
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
        scientificName: 'A scientific name....',
        description:
          'A long description of this plant....A long description of this plant....A long description of this plant....A long description of this plant....A long description of this plant....',
        isPoisonous: false,
        imageURL: 'http://www.tsflowers.com/morning_glory_combo.jpg'
      }
    ]
  },
  {
    id: 3,
    coordinate: {latitude: 41.881737, longitude: -87.632751},
    title: 'Poison Ivy',
    description: '',
    plants: [
      {
        commonName: 'Poison Ivy',
        scientificName: 'A scientific name....',
        description:
          'A long description of this plant....A long description of this plant....A long description of this plant....A long description of this plant....A long description of this plant....',
        isPoisonous: true,
        imageURL:
          'https://www.petguide.com/wp-content/uploads/2019/03/poison-ivy-dogs-668x444.jpg'
      }
    ]
  }
]

export default pins
