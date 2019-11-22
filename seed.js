const poisonIvy = {
  id: 1,
  commonName: 'Poison Ivy',
  scientificName: 'Something',
  imageURL:
    'https://www.thespruce.com/thmb/KX-sXc0Gjbq6UlNgcNuMw-59Hyo=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/poison-ivy-leaves-big-592c5b3b5f9b5859504a89c9.jpg',
  description: 'Causes rashes',
  poisonous: true,
  notes: []
}

const note1 = {id: 1, user: 'Randy', plant: poisonIvy}

const note2 = {id: 2, user: 'Jerry', plant: poisonIvy}

poisonIvy.notes.push(note1, note2)
console.log(poisonIvy)
