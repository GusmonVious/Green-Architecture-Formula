/**
 * Green Architecture Formula
 * Plant data and calculations
*/

// Plant data for reference
const plantsData = [
  {
    name: 'paulownia',
    fullName: 'Paulownia Tree',
    absorption: 0.095,
    costEfficiency: 'Medium',
    spaceNeeded: 'Large',
    description: 'Extremely fast-growing tree with very high CO₂ sequestration rate.'
  },
  {
    name: 'mango',
    fullName: 'Mango Tree',
    absorption: 0.068,
    costEfficiency: 'High',
    spaceNeeded: 'Large',
    description: 'Fruit-bearing tree known for both its produce and CO₂ absorption.'
  },
  {
    name: 'jackfruit',
    fullName: 'Jackfruit Tree',
    absorption: 0.055,
    costEfficiency: 'High',
    spaceNeeded: 'Large',
    description: 'Tropical tree that yields fruit and provides strong CO₂ capture.'
  },
  {
    name: 'bamboo',
    fullName: 'Bamboo (Clumping)',
    absorption: 0.045,
    costEfficiency: 'Very High',
    spaceNeeded: 'Moderate',
    description: 'Rapid-growing grass that efficiently sequesters carbon when planted densely.'
  },
  {
    name: 'guava',
    fullName: 'Guava Tree',
    absorption: 0.034,
    costEfficiency: 'High',
    spaceNeeded: 'Moderate',
    description: 'Compact fruit tree with solid CO₂ absorption and high yield.'
  },
  {
    name: 'pomegranate',
    fullName: 'Pomegranate Tree',
    absorption: 0.033,
    costEfficiency: 'Medium',
    spaceNeeded: 'Moderate',
    description: 'Hardy plant that thrives in dry climates and sequesters moderate CO₂.'
  },
  {
    name: 'custardapple',
    fullName: 'Custard Apple Tree',
    absorption: 0.027,
    costEfficiency: 'Medium',
    spaceNeeded: 'Moderate',
    description: 'Fruit tree suited for tropical climates, with stable carbon uptake.'
  },
  {
    name: 'dragonfruit',
    fullName: 'Dragon Fruit Cactus',
    absorption: 0.027,
    costEfficiency: 'High',
    spaceNeeded: 'Minimal',
    description: 'Climbing cactus valued for fruit and CO₂ absorption in dry zones.'
  },
  {
    name: 'neem',
    fullName: 'Neem Tree',
    absorption: 0.03,
    costEfficiency: 'High',
    spaceNeeded: 'Large',
    description: 'Medicinal tree with long-term air purification and CO₂ benefits.'
  },
  {
    name: 'areca',
    fullName: 'Areca Palm',
    absorption: 0.003,
    costEfficiency: 'Medium',
    spaceNeeded: 'Moderate',
    description: 'Popular indoor palm with modest CO₂ intake but easy care.'
  },
  {
    name: 'sanchezia',
    fullName: 'Sanchezia speciosa',
    absorption: 0.0162,
    costEfficiency: 'High',
    spaceNeeded: 'Small',
    description: 'Compact shrub and top non-timber plant for CO₂ absorption in gardens.'
  },
  {
    name: 'hibiscus',
    fullName: 'Hibiscus rosa-sinensis',
    absorption: 0.0119,
    costEfficiency: 'High',
    spaceNeeded: 'Small',
    description: 'Flowering shrub widely used in ornamental landscaping in Myanmar.'
  },
  {
    name: 'ixora',
    fullName: 'Ixora coccinea',
    absorption: 0.0104,
    costEfficiency: 'High',
    spaceNeeded: 'Small',
    description: 'Popular ornamental shrub and hedge plant with strong CO₂ uptake.'
  },
  {
    name: 'cordyline',
    fullName: 'Cordyline fruticosa',
    absorption: 0.0125,
    costEfficiency: 'Medium',
    spaceNeeded: 'Small',
    description: 'Tropical foliage plant with colorful leaves and moderate CO₂ sequestration.'
  },
  {
    name: 'camwood',
    fullName: 'Baphia nitida (Camwood)',
    absorption: 0.0107,
    costEfficiency: 'Medium',
    spaceNeeded: 'Small',
    description: 'Hardwood shrub with high carbon sequestration rate from biomass.'
  }
];


// Additional plant-related functions could be added here as the application grows