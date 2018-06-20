const randomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const beginning = ['recalibrating',
'excavating',
'finalizing',
'acquiring',
'locking',
'fueling',
'extracting',
'binding',
]

const middle = ['flux',
'data',
'spline',
'storage',
'plasma',
'cache',
'laser',
]

const end = ['capacitor',
'conductor',
'assembler',
'disk',
'detector',
'post-processor',
'integrator',
]

const phrases = [
  'testing ozone',
  'embiggening prototypes',
  'deterministically simulating the future',
  'testing for perfection',
]

export default () => randomInt(5) > 3
  ? phrases[randomInt(phrases.length)]
  : `${beginning[randomInt(beginning.length)]} ${middle[randomInt(middle.length)]} ${end[randomInt(end.length)]}`;
