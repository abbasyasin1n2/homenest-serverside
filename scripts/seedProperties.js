const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

if (!process.env.DB_USER || !process.env.DB_PASSWORD) {
  console.error('Missing DB_USER or DB_PASSWORD in environment variables.');
  process.exit(1);
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cnkbmnh.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const residentialPlotFeatures = [
  'Eid congregation place',
  'Play ground',
  'Parks',
  'Universities',
  'Water supply',
  'Police box',
  'Mosque',
  'Security',
  'School',
  'Hospital',
  'Fire services',
  'Post office',
  'Graveyard',
  'Lakes',
  'College',
  'Bazaar',
  'Civil defense',
  'Banks',
];

const commercialSharedFeatures = [
  'Generator facility',
  'Water connection ready',
  'Dedicated parking',
  'Heavy duty main gate',
  'Office accommodation available',
  'Negotiable rent and advance',
];

const commercialWarehouseFeatures = [
  'Office complex',
  'Guard room',
  'Toilet and washroom facilities',
  '3 phase electricity',
  'Loading and unloading zone',
  'Drainage system',
  'Security staff',
];

const officeSpaceFeatures = [
  'Lift access',
  'Generator backup',
  'Security & CCTV',
  'Emergency fire exit',
  'Satellite / cable TV',
  'Wi-Fi connectivity',
  'Garden & guest parking',
];

const apartmentFeatures = [
  'Security & CCTV',
  'Generator backup',
  'Intercom',
  'Fire exit',
  'WASA connection',
  'Cylinder gas',
  'Hot water',
  'Solar panels',
  'Garden / rooftop',
];

const today = new Date();
const daysAgo = (days) => {
  const date = new Date(today);
  date.setDate(date.getDate() - days);
  return date;
};

const seedProperties = [
  {
    propertyName: 'Modhu City Phase 3 Residential Plot',
    category: 'Land/Plot',
    propertyType: 'Residential Plot',
    propertyFor: 'Sale',
    propertySize: '6 Katha',
    price: 14500000,
    location: 'Mohammadpur, Dhaka',
    constructionStatus: 'Under Development',
    transactionType: 'New',
    imageUrl: 'https://i.ibb.co.com/G3GbRmS1/6-katha-Under-Development-Residential-Plot-for-Sale-at-Mohammadpur.jpg',
    description:
      'Ready plots near Dhanmondi–Mohammadpur surrounded by natural beauty with all civic amenities. Only 6 KM from Dhanmondi Mohamamdpur and adjacent to Shaheed Buddhijibi Basila Bridge with easy bus access.',
    features: residentialPlotFeatures,
    listedBy: {
      name: 'HomeNest Development',
      email: 'developer@homenest.com',
      phone: '+8801710001100',
    },
    createdAt: daysAgo(4),
    updatedAt: daysAgo(4),
  },
  {
    propertyName: 'Purbachal Marine City Residential Plot',
    category: 'Land/Plot',
    propertyType: 'Residential Plot',
    propertyFor: 'Sale',
    propertySize: '5 Katha',
    price: 12500000,
    location: 'Purbachal, Dhaka',
    constructionStatus: 'Ready',
    transactionType: 'New',
    imageUrl: 'https://i.ibb.co.com/k2G4Ykc0/5-katha-Ready-Residential-Plot-for-Sale-at-Purbachal.jpg',
    description:
      'Model satellite housing project appreciated for affordable plots in convenient locations. Planned by professionals to meet housing needs of marine officers and professionals with full civic amenities.',
    features: residentialPlotFeatures,
    listedBy: {
      name: 'Purbachal Estates',
      email: 'sales@purbachalestates.com',
      phone: '+8801755002200',
    },
    createdAt: daysAgo(9),
    updatedAt: daysAgo(9),
  },
  {
    propertyName: 'Shahid Nagar Ready Residential Plot',
    category: 'Land/Plot',
    propertyType: 'Residential Plot',
    propertyFor: 'Sale',
    propertySize: '3 Katha',
    price: 9800000,
    location: 'Uttar Khan, Dhaka',
    constructionStatus: 'Ready',
    transactionType: 'New',
    imageUrl: 'https://i.ibb.co.com/bjhcpJsf/3-katha-Ready-Residential-Plot-for-Sale-at-Uttar-Khan.jpg',
    description:
      'Fully ready plot for sale in Shahid Nagar Residential Project next to Abdullahpur–Purbachal Link Road. Located between Uttara Model Town and Purbachal New Town with immediate land registration.',
    features: ['Mosque', 'Play ground', 'School', 'Universities', 'Hospital'],
    listedBy: {
      name: 'Shahid Nagar Consortium',
      email: 'info@shahidnagar.com',
      phone: '+8801301112233',
    },
    createdAt: daysAgo(16),
    updatedAt: daysAgo(16),
  },
  {
    propertyName: 'Modhu City Extension Commercial Plot',
    category: 'Land/Plot',
    propertyType: 'Commercial Plot',
    propertyFor: 'Sale',
    propertySize: '119 Katha',
    price: 890000000,
    location: 'Mohammadpur, Dhaka',
    constructionStatus: 'Ready',
    transactionType: 'New',
    imageUrl: 'https://i.ibb.co.com/ycsMjbBS/119-katha-Ready-Commercial-Plot-for-Sale-at-Mohammadpur.jpg',
    description:
      'Ready commercial land on Basila main road ideal for large business campuses. All documents verified and suitable exclusively for commercial establishments.',
    features: residentialPlotFeatures,
    listedBy: {
      name: 'Modhu City Holdings',
      email: 'commercial@modhucity.com',
      phone: '+8801711223344',
    },
    createdAt: daysAgo(22),
    updatedAt: daysAgo(22),
  },
  {
    propertyName: 'Modhucity Keraniganj Commercial Plot',
    category: 'Land/Plot',
    propertyType: 'Commercial Plot',
    propertyFor: 'Sale',
    propertySize: '100 Katha',
    price: 720000000,
    location: 'Keraniganj, Dhaka',
    constructionStatus: 'Ready',
    transactionType: 'New',
    imageUrl: 'https://i.ibb.co.com/BKst6RZj/100-katha-Ready-Commercial-Plot-for-Sale-at-Keraniganj.jpg',
    description:
      'Prime 100 katha commercial land located after Basila Bridge with full documentation. Ideal for logistics hub, industrial park, or commercial complex.',
    features: residentialPlotFeatures,
    listedBy: {
      name: 'Keraniganj Properties Ltd',
      email: 'sales@kpl.com.bd',
      phone: '+8801722334455',
    },
    createdAt: daysAgo(28),
    updatedAt: daysAgo(28),
  },
  {
    propertyName: 'Birulia Savar Commercial Shade',
    category: 'Commercial',
    propertyType: 'Commercial Plot',
    propertyFor: 'Rent',
    propertySize: '30,000 sft / 22 Katha',
    price: 600000,
    priceUnit: 'monthly',
    location: 'Birulia, Savar, Dhaka',
    constructionStatus: 'Under Construction',
    transactionType: 'New',
    depositAmount: 1200000,
    availableFrom: '2025-10-13',
    imageUrl: 'https://i.ibb.co.com/Wpg7d89C/30000-SFT-COMMERCIAL-SHADE-at-Birulia-Savar-Dhaka-Under-Construction.jpg',
    description:
      '30,000 sft steel shed under rapid construction compliant with Accord Alliance. Located 5 KM from Birulia Bridge Auto Stand with generator facility, parking, and negotiable rent.',
    features: commercialSharedFeatures,
    listedBy: {
      name: 'Savar Industrial Leasing',
      email: 'leasing@savarindustrial.com',
      phone: '+8801714556677',
    },
    createdAt: daysAgo(12),
    updatedAt: daysAgo(12),
  },
  {
    propertyName: 'Hemayetpur Industrial Warehouse',
    category: 'Commercial',
    propertyType: 'Commercial Plot',
    propertyFor: 'Rent',
    propertySize: '15,200 sqft',
    price: 300000,
    priceUnit: 'monthly',
    location: 'Hemayetpur, Savar, Dhaka',
    constructionStatus: 'Ready',
    depositAmount: 1200000,
    availableFrom: '2025-09-01',
    imageUrl: 'https://i.ibb.co.com/Wpg7d89C/30000-SFT-COMMERCIAL-SHADE-at-Birulia-Savar-Dhaka-Under-Construction.jpg',
    description:
      'Industrial shed with modern facilities including office complex, guard room, and washroom. Heavy duty main gate, RCC floor, drainage, and negotiable terms.',
    features: commercialWarehouseFeatures,
    listedBy: {
      name: 'Hemayetpur Logistics Hub',
      email: 'contact@hemayetpurlogistics.com',
      phone: '+8801788990011',
    },
    createdAt: daysAgo(33),
    updatedAt: daysAgo(33),
  },
  {
    propertyName: 'K&A Logistics Gazipur Warehouse',
    category: 'Commercial',
    propertyType: 'Commercial Plot',
    propertyFor: 'Rent',
    propertySize: '42 Katha',
    price: 350000,
    priceUnit: 'monthly',
    location: 'Jajhor Bazar, Gazipur Sadar, Gazipur',
    constructionStatus: 'Ready',
    depositAmount: 2000000,
    availableFrom: '2025-07-22',
    imageUrl: 'https://i.ibb.co.com/4nLh47xv/42-katha-Commercial-Plot-for-Rent-at-Gazipur-Sadar.jpg',
    description:
      'Commercial warehouse space ideal for inventory management. Strategically located near National University with good road access and logistics support.',
    features: ['Inventory management support', 'Wide access road', 'Truck parking'],
    listedBy: {
      name: 'K&A Logistics Ltd.',
      email: 'warehouse@kalogistics.com',
      phone: '+8801700221133',
    },
    createdAt: daysAgo(40),
    updatedAt: daysAgo(40),
  },
  {
    propertyName: 'ABCL Citizen Tower Office Space',
    category: 'Commercial',
    propertyType: 'Office Space',
    propertyFor: 'Sale',
    propertySize: '10,500 sqft',
    price: 250000000,
    location: 'Tejgaon Link Road, Dhaka',
    constructionStatus: 'Ready',
    floorAvailableOn: '14th floor',
    totalFloor: 17,
    garages: 'Parking for 120',
    imageUrl: 'https://i.ibb.co.com/vvfY5mQ6/10500-sqft-Ready-Office-Space-for-Sale-at-Tejgaon.jpg',
    description:
      'Premium commercial tower with 4 high-speed lifts, LEED certified design, tempered glass facade, and 100% power backup. Strategically positioned on 60 feet wide road.',
    features: officeSpaceFeatures,
    listedBy: {
      name: 'AB Constructions Ltd',
      email: 'corporate@abcl.com',
      phone: '+8801810035305',
    },
    createdAt: daysAgo(6),
    updatedAt: daysAgo(6),
  },
  {
    propertyName: 'Kabbokash Super Market Office Suite',
    category: 'Commercial',
    propertyType: 'Office Space',
    propertyFor: 'Rent',
    propertySize: '710 sqft',
    price: 100000,
    priceUnit: 'monthly',
    location: 'Kawran Bazar, Dhaka',
    floorAvailableOn: '5th-10th floors',
    totalFloor: 12,
    depositAmount: 100000,
    availableFrom: '2023-02-01',
    imageUrl: 'https://i.ibb.co.com/jv5mRt7d/710-sqft-Office-Space-for-Rent-at-Kawran-Bazar.jpg',
    description:
      'Semi-furnished office suite with private washroom, lift access, AC provisions, and generator backup. Located opposite the Dept. of Family Planning in Kawran Bazar.',
    features: officeSpaceFeatures,
    listedBy: {
      name: 'Kabbokash Super Market Authority',
      email: 'leasing@kabbokash.com',
      phone: '+8801711223366',
    },
    createdAt: daysAgo(14),
    updatedAt: daysAgo(14),
  },
  {
    propertyName: 'Anwar Landmark Radiance Apartment',
    category: 'Apartment',
    propertyType: 'Apartment/Flats',
    propertyFor: 'Sale',
    propertySize: '1395 sqft',
    price: 8000000,
    location: 'Sayedabad, Dhaka',
    constructionStatus: 'Under Construction',
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    totalFloor: 10,
    facing: 'South',
    garages: '1 Parking',
    imageUrl: 'https://i.ibb.co.com/nqf6vFvT/1395-sqft-3-Beds-Under-Construction-Flats-for-Sale-at-Sayedabad.jpg',
    description:
      'Under construction residential building offering spacious units with lift, security, WASA connection, and modern amenities for comfortable living.',
    features: apartmentFeatures,
    listedBy: {
      name: 'Landmark Developments',
      email: 'sales@landmarkbd.com',
      phone: '+8801744556677',
    },
    createdAt: daysAgo(18),
    updatedAt: daysAgo(18),
  },
  {
    propertyName: 'Pinaki North Ridge Heights Apartment',
    category: 'Apartment',
    propertyType: 'Apartment/Flats',
    propertyFor: 'Sale',
    propertySize: '1100 sqft',
    price: 9000000,
    location: 'Uttara, Dhaka',
    constructionStatus: 'Almost Ready',
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    totalFloor: 11,
    facing: 'North',
    imageUrl: 'https://i.ibb.co.com/kVfJP1dQ/1100-sqft-3-Beds-Almost-Ready-Apartment-Flats-for-Sale-at-Uttara.jpg',
    description:
      'Modern residential towers on 25 kathas with spacious open areas, multipurpose hall, children’s play zone, and 24/7 CCTV security.',
    features: [
      ...apartmentFeatures,
      'Multipurpose hall',
      'Children’s play area',
      'Rooftop garden',
      'Deep tube well water extraction',
    ],
    listedBy: {
      name: 'Pinaki Holdings Limited',
      email: 'info@pinakiholdings.com',
      phone: '+8801822667788',
    },
    createdAt: daysAgo(25),
    updatedAt: daysAgo(25),
  },
  {
    propertyName: 'Uttara Premier Furnished Apartment',
    category: 'Apartment',
    propertyType: 'Apartment/Flats',
    propertyFor: 'Rent',
    propertySize: '2400 sqft',
    price: 80000,
    priceUnit: 'monthly',
    location: 'Sector 5, Uttara, Dhaka',
    bedrooms: 4,
    bathrooms: 5,
    balconies: 3,
    garages: '2 Car Parking',
    depositAmount: 80000,
    availableFrom: '2025-11-11',
    imageUrl: 'https://i.ibb.co.com/35ycwn0D/2400-sqft-4-Beds-Apartment-Flats-for-Rent-at-Uttara.jpg',
    description:
      'Fully furnished four-bedroom apartment within walking distance to Uttara Club. Includes hot water, CCTV, security alarm, servant room, and guest parking.',
    features: [
      ...apartmentFeatures,
      'Satellite / cable TV',
      'Security alarm system',
      'Servant toilet & room',
      'Guest parking',
    ],
    listedBy: {
      name: 'Uttara Luxury Rentals',
      email: 'rentals@uttaraluxury.com',
      phone: '+8801999776655',
    },
    createdAt: daysAgo(8),
    updatedAt: daysAgo(8),
  },
  {
    propertyName: 'Prime Dhanmondi Modern Home',
    category: 'Apartment',
    propertyType: 'Apartment/Flats',
    propertyFor: 'Rent',
    propertySize: '1900 sqft',
    price: 85000,
    priceUnit: 'monthly',
    location: 'Road 6, Dhanmondi, Dhaka',
    bedrooms: 3,
    bathrooms: 4,
    balconies: 3,
    garages: '1 Car Parking',
    depositAmount: 200000,
    availableFrom: '2023-12-27',
    imageUrl: 'https://i.ibb.co.com/pvqXn8sq/1900-sqft-3-Beds-Apartment-Flats-for-Rent-at-Dhanmondi.jpg',
    description:
      'Semi-furnished day-care friendly apartment on Mirpur Road near Dhanmondi police station. Includes Burmatic wood fixtures, private security, hot water, lift, and easy access to premier schools.',
    features: [
      ...apartmentFeatures,
      'Private security service',
      '24-hour hot water',
      'Garden view living area',
      'Nearby premium schools & supermarkets',
    ],
    listedBy: {
      name: 'Dhanmondi Urban Rentals',
      email: 'leasing@dhanmondirentals.com',
      phone: '+8801888223344',
    },
    createdAt: daysAgo(11),
    updatedAt: daysAgo(11),
  },
];

async function seed() {
  try {
    await client.connect();
    const database = client.db('homenestDB');
    const propertiesCollection = database.collection('properties');

    const propertyNames = seedProperties.map((item) => item.propertyName);
    await propertiesCollection.deleteMany({ propertyName: { $in: propertyNames } });
    await propertiesCollection.insertMany(seedProperties);

    console.log(`✅ Successfully seeded ${seedProperties.length} properties.`);
  } catch (error) {
    console.error('❌ Failed to seed properties:', error);
  } finally {
    await client.close();
  }
}

seed();

