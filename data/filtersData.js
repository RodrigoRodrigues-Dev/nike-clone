export const categories = [
  { name: 'Shoes' },
  { name: 'Hoodies & Pullovers' },
  { name: 'Jackets & Vests' },
  { name: 'Pants & Tights' },
  { name: 'Tops & T-Shirts' },
  { name: 'Shorts' },
  { name: 'Tights & Leggings' },
  { name: 'Tracksuits' },
  { name: 'Accessories & Equipment' }
];

export const filterGroup = [
  {
    title: 'Sale & Offers',
    group: ['Black Friday - Up to 60% Off', 'See Price in Bag', 'Sale']
  },
  {
    title: 'Shop by Price',
    group: ['$25 - $50', '$50 - $100', '$100 - $150', '$Over $150']
  },
  { title: 'Gender', group: ['Men', 'Women', 'Unisex'] },
  { title: 'Kids', group: ['Boys', 'Girls'] },
  {
    title: 'Kids Age',
    group: [
      'Babies & Toddlers (0-3 yrs)',
      'Little Kids (3-7 yrs)',
      'Big Kids (7-15 yrs)'
    ]
  },
  {
    title: 'Color',
    group: [
      { name: 'Black', colorCode: '#000000' },
      { name: 'Blue', colorCode: '#1790C8' },
      { name: 'Brown', colorCode: '#825D41' },
      { name: 'Green', colorCode: '#7BBA3C' },
      { name: 'Grey', colorCode: '#808080' },
      { name: 'Orange', colorCode: '#F36B26' },
      { name: 'Pink', colorCode: '#F0728F' },
      { name: 'Purple', colorCode: '#8D429F' },
      { name: 'Red', colorCode: '#E7352B' },
      { name: 'White', colorCode: '#FFFFFF' },
      { name: 'Yellow', colorCode: '#FED533' }
    ]
  },
  { title: 'Brand', group: ['Nike Sportswear'] },
  {
    title: 'Sports & Activities',
    group: ['Lifestyle', 'Training & Gym', 'Tennis']
  },
  { title: 'Best for', group: ['Cold Weather'] }
];

export const filterMappings = {
  Gender: 'genderFilters',
  Color: 'colorFilters',
  'Shop by Price': 'priceFilters',
  'Sale & Offers': 'saleFilters',
  'Kids Age': 'kidAgeFilters',
  Kids: 'kidGenderFilters',
  Brand: 'brandFilters',
  'Sports & Activities': 'activityTypeFilters',
  'Best for': 'climateFilters'
};
