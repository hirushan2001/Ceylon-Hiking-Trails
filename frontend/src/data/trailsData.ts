import { Trail } from '../types';

export const TRAILS_DATA: Trail[] = [
  {
    id: '1',
    slug: 'ella-rock',
    name: 'Ella Rock Trek',
    shortDescription: 'Spectacular mountain cliff offering panoramic views of Ella Gap, Ravana Falls, and lush tea estates.',
    description: `Ella Rock is one of Sri Lanka's iconic cliffside summits located high above the town of Ella in Badulla District. 
    The hike takes you through active tea plantations, along historical British-era railway lines, across bamboo groves, and up steep pine forest switchbacks. 
    At the summit, hikers are rewarded with breath-taking 360-degree vistas over the Ella Gap and surrounding misty valley mountains. 
    It is recommended to start early in the morning around 6:00 AM to catch the morning sunrise and avoid mid-day heat.`,
    district: 'Badulla',
    province: 'Uva Province',
    destination: 'Ella',
    difficulty: 'Moderate',
    distanceKm: 8.5,
    estimatedDuration: '3.5 - 4.5 hours',
    elevationGainMeters: 450,
    highestElevationMeters: 1350,
    trailType: 'Mountain',
    bestSeason: 'December to April',
    latitude: 6.8572,
    longitude: 81.0486,
    heroImage: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 142,
    features: ['Viewpoint', 'Sunrise', 'Tea Plantations', 'Photography'],
    safetyInformation: [
      'Carry at least 2 liters of water per person as there are no shops along the upper forest section.',
      'Watch out for train traffic along the railway line stretch near Kithaella Station.',
      'Leeches can be present during or right after rain; bring salt or leech socks.',
      'Start early to avoid fog and heavy clouds rolling in by noon.'
    ],
    whatToBring: [
      'Sturdy hiking shoes or trail runners',
      '2L Water bottle',
      'Sun hat and sunscreen',
      'Rain jacket or poncho',
      'Snacks / Energy bars',
      'Camera or Smartphone with full charge'
    ],
    currentStatus: 'Open',
    statusLastUpdated: '2 hours ago',
    isFeatured: true,
    route: {
      coordinates: [
        [6.8667, 81.0465], // Ella Station
        [6.8580, 81.0440], // Kithaella Station
        [6.8520, 81.0455], // Footbridge crossing
        [6.8540, 81.0475], // Tea Estate Trailhead
        [6.8560, 81.0480], // Pine Forest incline
        [6.8572, 81.0486]  // Ella Rock Summit
      ],
      waypoints: [
        { id: 'w1', name: 'Ella Railway Station', type: 'start', latitude: 6.8667, longitude: 81.0465, elevation: 990, description: 'Starting point along the rail track.' },
        { id: 'w2', name: 'Kithaella Station', type: 'landmark', latitude: 6.8580, longitude: 81.0440, elevation: 1020, description: 'Small train station; turn left after bridge.' },
        { id: 'w3', name: 'Rawana Falls Viewpoint', type: 'viewpoint', latitude: 6.8540, longitude: 81.0475, elevation: 1150, description: 'Clear view of Ravana waterfall in the distance.' },
        { id: 'w4', name: 'Ella Rock Summit Viewpoint', type: 'end', latitude: 6.8572, longitude: 81.0486, elevation: 1350, description: 'Main summit cliff with sheer drops and 360-degree valley views.' }
      ],
      elevationProfile: [
        { distanceKm: 0, elevationMeters: 990 },
        { distanceKm: 2.5, elevationMeters: 1020 },
        { distanceKm: 4.0, elevationMeters: 1100 },
        { distanceKm: 6.5, elevationMeters: 1250 },
        { distanceKm: 8.5, elevationMeters: 1350 }
      ]
    },
    nearbyPlaces: [
      { id: 'np1', name: 'Cafe Chill Ella', category: 'Food & Cafe', distanceKm: 2.1, rating: 4.7, address: 'Main Street, Ella' },
      { id: 'np2', name: '9 Arch View Resort', category: 'Accommodation', distanceKm: 3.0, rating: 4.9, address: 'Passara Road, Ella' },
      { id: 'np3', name: 'Ella Tuk-Tuk Stand', category: 'Transport', distanceKm: 1.5, rating: 4.6, address: 'Station Road, Ella' }
    ]
  },
  {
    id: '2',
    slug: 'little-adams-peak',
    name: 'Little Adam’s Peak (Punchi Sri Pada)',
    shortDescription: 'Gentle, picturesque trek through verdant tea hills ending at a dramatic ridge viewpoint.',
    description: `Little Adam’s Peak is named after the sacred mountain Adam's Peak due to its matching pyramid shape. 
    It is one of the most accessible and popular hikes in Sri Lanka, perfect for families, beginners, and photography enthusiasts. 
    The path wanders smoothly through emerald green tea plantations before climbing up well-maintained stone steps to multiple rocky summits. 
    From the top, you can gaze directly across the gorge at Ella Rock and the vast Southern plains.`,
    district: 'Badulla',
    province: 'Uva Province',
    destination: 'Ella',
    difficulty: 'Easy',
    distanceKm: 4.2,
    estimatedDuration: '1.5 - 2 hours',
    elevationGainMeters: 180,
    highestElevationMeters: 1141,
    trailType: 'Mountain',
    bestSeason: 'Year-round',
    latitude: 6.8605,
    longitude: 81.0620,
    heroImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 320,
    features: ['Sunrise', 'Sunset', 'Tea Plantations', 'Family Friendly', 'Photography'],
    safetyInformation: [
      'The stone steps can become slippery when wet; watch your footwork near the edges.',
      'Sunset gets crowded; bring a small flashlight or headlamp for the descent.'
    ],
    whatToBring: [
      'Comfortable walking shoes or sneakers',
      '1L Water',
      'Sunglasses and hat',
      'Camera'
    ],
    currentStatus: 'Open',
    statusLastUpdated: '1 hour ago',
    isFeatured: true,
    route: {
      coordinates: [
        [6.8710, 81.0545], // Passara Road Trailhead
        [6.8660, 81.0580], // 98 Acres Resort junction
        [6.8620, 81.0600], // Stone Staircase
        [6.8605, 81.0620]  // Summit Ridge
      ],
      waypoints: [
        { id: 'w1', name: 'Passara Road Junction', type: 'start', latitude: 6.8710, longitude: 81.0545, elevation: 960, description: 'Trailhead entry point near 98 Acres.' },
        { id: 'w2', name: 'Summit Ridge Viewpoint', type: 'end', latitude: 6.8605, longitude: 81.0620, elevation: 1141, description: 'Main summit ridge overlooking Ella Gap.' }
      ],
      elevationProfile: [
        { distanceKm: 0, elevationMeters: 960 },
        { distanceKm: 2.0, elevationMeters: 1040 },
        { distanceKm: 4.2, elevationMeters: 1141 }
      ]
    },
    nearbyPlaces: [
      { id: 'np4', name: '98 Acres Resort & Spa', category: 'Accommodation', distanceKm: 0.5, rating: 4.9, address: 'Greenland Estate, Ella' }
    ]
  },
  {
    id: '3',
    slug: 'horton-plains-worlds-end',
    name: 'Horton Plains & World’s End Loop',
    shortDescription: 'High-altitude cloud forest and grassland plateau featuring the breathtaking 880m sheer drop at World’s End.',
    description: `Horton Plains National Park is a UNESCO World Heritage site situated on a cold, high plateau over 2,100 meters above sea level. 
    The 9.5 km circular trail traverses open montane grasslands (patanas), dense cloud forests, Baker's Falls waterfall, and the dramatic precipice known as World’s End. 
    Here, the cliff drops vertically by 870 meters down to the tea estates of Balangoda below. 
    Wildlife sightings including endemic Sambar deer, purple-faced langurs, and rare bird species are frequent along the route.`,
    district: 'Nuwara Eliya',
    province: 'Central Province',
    destination: 'Horton Plains',
    difficulty: 'Moderate',
    distanceKm: 9.5,
    estimatedDuration: '3.0 - 4.0 hours',
    elevationGainMeters: 150,
    highestElevationMeters: 2300,
    trailType: 'Forest',
    bestSeason: 'January to March',
    latitude: 6.8028,
    longitude: 80.8091,
    heroImage: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 280,
    features: ['Waterfall', 'Viewpoint', 'Wildlife', 'Photography', 'Historical Site'],
    safetyInformation: [
      'Strict No-Plastic policy enforced at entrance gate; single-use plastic bottles will be checked.',
      'Arrive before 9:00 AM at World’s End; thick mist rolls in quickly after 10:00 AM obliterating the view.',
      'High altitude temperatures can be chilly (10°C) early morning, layer up!'
    ],
    whatToBring: [
      'Warm jacket or fleece sweater',
      'Reusable water bottle',
      'Rain jacket',
      'Park ticket fee (LKR/USD cash)',
      'Good walking shoes'
    ],
    currentStatus: 'Open',
    statusLastUpdated: '3 hours ago',
    isFeatured: true,
    route: {
      coordinates: [
        [6.8028, 80.8091], // Visitor Center
        [6.7900, 80.7980], // Mini World's End
        [6.7840, 80.7950], // Greater World's End
        [6.7890, 80.8030], // Baker's Falls
        [6.8028, 80.8091]  // Visitor Center Return
      ],
      waypoints: [
        { id: 'w1', name: 'Horton Plains Visitor Center', type: 'start', latitude: 6.8028, longitude: 80.8091, elevation: 2150, description: 'Ticket office, museum, and loop start.' },
        { id: 'w2', name: 'Mini World’s End', type: 'viewpoint', latitude: 6.7900, longitude: 80.7980, elevation: 2130, description: '300-meter drop cliff view.' },
        { id: 'w3', name: 'Greater World’s End Cliff', type: 'viewpoint', latitude: 6.7840, longitude: 80.7950, elevation: 2100, description: 'Famous 870-meter sheer drop to Southern plains.' },
        { id: 'w4', name: 'Baker’s Falls', type: 'waterfall', latitude: 6.7890, longitude: 80.8030, elevation: 2050, description: 'Thundering 20m high waterfall amidst cloud forest.' }
      ],
      elevationProfile: [
        { distanceKm: 0, elevationMeters: 2150 },
        { distanceKm: 3.2, elevationMeters: 2100 },
        { distanceKm: 6.0, elevationMeters: 2050 },
        { distanceKm: 9.5, elevationMeters: 2150 }
      ]
    },
    nearbyPlaces: [
      { id: 'np5', name: 'Pattipola Railway Station', category: 'Transport', distanceKm: 12.0, rating: 4.8, address: 'Pattipola' }
    ]
  },
  {
    id: '4',
    slug: 'kirigalpotta-peak',
    name: 'Kirigalpotta Peak Trail',
    shortDescription: 'Challenging wilderness trek to Sri Lanka’s 2nd highest mountain peak inside Horton Plains.',
    description: `Rising to 2,395 meters above sea level, Kirigalpotta is Sri Lanka's second highest mountain peak and the highest mountain accessible to the public. 
    Starting near the Horton Plains entrance, this rugged 14 km round-trip trek leads through boggy marshlands, dense dwarf cloud forests, and rocky granite ridges. 
    Unlike World’s End, Kirigalpotta is a quiet, wild, and demanding trail that requires strong physical stamina and proper navigation awareness.`,
    district: 'Nuwara Eliya',
    province: 'Central Province',
    destination: 'Horton Plains',
    difficulty: 'Difficult',
    distanceKm: 14.0,
    estimatedDuration: '6.0 - 7.5 hours',
    elevationGainMeters: 480,
    highestElevationMeters: 2395,
    trailType: 'Mountain',
    bestSeason: 'January to March',
    latitude: 6.7972,
    longitude: 80.7686,
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.7,
    reviewCount: 68,
    features: ['Viewpoint', 'Wildlife', 'Photography'],
    safetyInformation: [
      'Boggy sections can swallow boots after heavy rain; waterproof footwear advised.',
      'Sambar deer and occasional leopards inhabit this wilderness; keep together and do not wander off-trail.',
      'No water sources past the 4km mark; carry at least 3 liters of water.'
    ],
    whatToBring: [
      'Waterproof trekking boots',
      '3L Water & Electrolyte packets',
      'High-energy trail snacks',
      'First Aid kit & Leech guard',
      'Warm waterproof jacket'
    ],
    currentStatus: 'Caution',
    statusLastUpdated: '5 hours ago',
    isFeatured: false,
    route: {
      coordinates: [
        [6.8028, 80.8091],
        [6.7980, 80.7900],
        [6.7972, 80.7686]
      ],
      waypoints: [
        { id: 'w1', name: 'Horton Visitor Gate', type: 'start', latitude: 6.8028, longitude: 80.8091, elevation: 2150, description: 'Trail register point.' },
        { id: 'w2', name: 'Kirigalpotta Summit', type: 'end', latitude: 6.7972, longitude: 80.7686, elevation: 2395, description: 'Rocky summit boulder with survey marker.' }
      ],
      elevationProfile: [
        { distanceKm: 0, elevationMeters: 2150 },
        { distanceKm: 4.0, elevationMeters: 2210 },
        { distanceKm: 7.0, elevationMeters: 2395 }
      ]
    },
    nearbyPlaces: []
  },
  {
    id: '5',
    slug: 'knuckles-five-peaks',
    name: 'Knuckles Five Peaks Expedition',
    shortDescription: 'Epic multi-terrain trek across the misty ridges of the UNESCO Knuckles Mountain Range.',
    description: `The Knuckles Mountain Range gets its name from a series of recumbent folds and peaks resembling a clenched fist when viewed from Kandy. 
    This mountain massif is a biodiversity hotspot containing 34% of Sri Lanka's endemic flora and fauna. 
    The Five Peaks trek traverses pygmy cloud forests, grassy patanas, crystal-clear mountain streams, and sheer cliff walls. 
    Experiencing all five crests in a single day is a thrilling badge of honor for seasoned hikers.`,
    district: 'Matale',
    province: 'Central Province',
    destination: 'Knuckles',
    difficulty: 'Extreme',
    distanceKm: 18.2,
    estimatedDuration: '8.0 - 10.0 hours',
    elevationGainMeters: 920,
    highestElevationMeters: 1863,
    trailType: 'Mountain',
    bestSeason: 'June to September & January to March',
    latitude: 7.4667,
    longitude: 80.7833,
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 95,
    features: ['Viewpoint', 'Camping', 'Wildlife', 'Photography'],
    safetyInformation: [
      'Local registered guide mandatory by forest department regulations.',
      'Weather can shift rapidly from bright sunshine to dense rainstorms and gale-force wind gusts.',
      'Heavy leech presence in moist jungle layers.'
    ],
    whatToBring: [
      'Leech socks & anti-leech spray',
      '3L Water & Filter bottle',
      'Trekking poles',
      'Headlamp with spare batteries',
      'Emergency whistle & compass/GPS map'
    ],
    currentStatus: 'Open',
    statusLastUpdated: '4 hours ago',
    isFeatured: true,
    route: {
      coordinates: [
        [7.4500, 80.7700], // Bambarella Trailhead
        [7.4600, 80.7750], // Peak 1
        [7.4640, 80.7800], // Peak 2 & 3
        [7.4667, 80.7833]  // Main Summit Peak 5
      ],
      waypoints: [
        { id: 'w1', name: 'Bambarella Trailhead', type: 'start', latitude: 7.4500, longitude: 80.7700, elevation: 1100, description: 'Jungle edge village trailhead.' },
        { id: 'w2', name: 'Knuckles Main Crest', type: 'end', latitude: 7.4667, longitude: 80.7833, elevation: 1863, description: 'Highest crest with sweeping Matale views.' }
      ],
      elevationProfile: [
        { distanceKm: 0, elevationMeters: 1100 },
        { distanceKm: 4.5, elevationMeters: 1520 },
        { distanceKm: 9.1, elevationMeters: 1863 }
      ]
    },
    nearbyPlaces: []
  },
  {
    id: '6',
    slug: 'riverston-peak-mini-worlds-end',
    name: 'Riverston Peak & Pitawala Pathana',
    shortDescription: 'Windy gap lookout, sheer cliff precipice, and unique flat stone plateau in Matale.',
    description: `Located in the Matale district part of the Knuckles conservation area, Riverston Peak is famous for its powerful wind gaps, misty radio tower ridge, and the stunning Pitawala Pathana stone grasslands. 
    A short 3 km hike takes you to Mini World's End Pitawala, where the rock shelf drops precipitously into the Thelgamu Oya valley. 
    It is ideal for day trips combined with dip swimming at Sera Ella waterfall.`,
    district: 'Matale',
    province: 'Central Province',
    destination: 'Matale',
    difficulty: 'Easy',
    distanceKm: 5.5,
    estimatedDuration: '2.0 - 3.0 hours',
    elevationGainMeters: 220,
    highestElevationMeters: 1424,
    trailType: 'Viewpoint',
    bestSeason: 'June to September',
    latitude: 7.5250,
    longitude: 80.7400,
    heroImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 110,
    features: ['Viewpoint', 'Waterfall', 'Photography', 'Family Friendly'],
    safetyInformation: [
      'Wind speeds at Riverston gap can reach up to 60 km/h; hold onto hats and stay away from cliff edges during gusts.'
    ],
    whatToBring: [
      'Windbreaker jacket',
      'Sun hat & sunglasses',
      'Water bottle',
      'Camera'
    ],
    currentStatus: 'Open',
    statusLastUpdated: '6 hours ago',
    isFeatured: true,
    route: {
      coordinates: [
        [7.5200, 80.7350],
        [7.5250, 80.7400]
      ],
      waypoints: [
        { id: 'w1', name: 'Riverston Gap Road', type: 'start', latitude: 7.5200, longitude: 80.7350, elevation: 1204, description: 'Windy Pass parking spot.' },
        { id: 'w2', name: 'Riverston Telecommunication Tower', type: 'end', latitude: 7.5250, longitude: 80.7400, elevation: 1424, description: 'Panoramic summit vantage point.' }
      ],
      elevationProfile: [
        { distanceKm: 0, elevationMeters: 1204 },
        { distanceKm: 2.7, elevationMeters: 1424 }
      ]
    },
    nearbyPlaces: []
  },
  {
    id: '7',
    slug: 'sri-pada-adams-peak',
    name: 'Sri Pada (Adam’s Peak) Pilgrimage Trail',
    shortDescription: 'Sacred nocturnal stair climb to the 2,243m holy mountain peak for the miraculous sunrise shadow.',
    description: `Sri Pada (Adam's Peak) is one of Sri Lanka's most venerated mountain summits, held sacred by Buddhists, Hindus, Muslims, and Christians alike. 
    The classic Hatton-Nallathanniya route consists of roughly 5,500 carved concrete and stone steps climbing illuminated night pathways to the summit shrine. 
    Climbing through the cool night allows hikers to arrive at the peak at dawn to witness "Ira Sevaya" (the sacred sunrise) and the famous triangular shadow cast by the mountain onto the clouds.`,
    district: 'Ratnapura',
    province: 'Sabaragamuwa Province',
    destination: 'Ratnapura',
    difficulty: 'Difficult',
    distanceKm: 11.0,
    estimatedDuration: '4.5 - 6.5 hours',
    elevationGainMeters: 1000,
    highestElevationMeters: 2243,
    trailType: 'Cultural',
    bestSeason: 'December to May (Pilgrimage Season)',
    latitude: 6.8096,
    longitude: 80.4994,
    heroImage: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 512,
    features: ['Sunrise', 'Historical Site', 'Cultural', 'Photography'],
    safetyInformation: [
      'Continuous stair climbing puts heavy strain on knees; bring trekking poles or knee guards.',
      'Peak temperatures at 5:00 AM near the summit drop below 8°C with biting wind chill; wear thermal layers.',
      'During weekends in full moon (Poya) days, lines near the top can stall for hours.'
    ],
    whatToBring: [
      'Warm wool beanie, gloves & thermal jacket',
      'Refillable water bottle & hot tea thermos',
      'Knee support sleeves',
      'Headlamp for off-season unlit nights',
      'Cash for roadside tea stalls'
    ],
    currentStatus: 'Open',
    statusLastUpdated: '30 mins ago',
    isFeatured: true,
    route: {
      coordinates: [
        [6.8333, 80.5167], // Nallathanniya (Dalhousie)
        [6.8200, 80.5100], // Peace Pagoda
        [6.8150, 80.5050], // Indikatupa (Needle Rock)
        [6.8096, 80.4994]  // Sri Pada Summit
      ],
      waypoints: [
        { id: 'w1', name: 'Nallathanniya Bus Stand', type: 'start', latitude: 6.8333, longitude: 80.5167, elevation: 1240, description: 'Trailhead archway.' },
        { id: 'w2', name: 'Japanese Peace Pagoda', type: 'landmark', latitude: 6.8200, longitude: 80.5100, elevation: 1450, description: 'White Buddhist stupa.' },
        { id: 'w3', name: 'Sri Pada Peak Shrine', type: 'end', latitude: 6.8096, longitude: 80.4994, elevation: 2243, description: 'Sacred Footprint shrine at mountain summit.' }
      ],
      elevationProfile: [
        { distanceKm: 0, elevationMeters: 1240 },
        { distanceKm: 3.0, elevationMeters: 1600 },
        { distanceKm: 5.5, elevationMeters: 2243 }
      ]
    },
    nearbyPlaces: []
  },
  {
    id: '8',
    slug: 'sinharaja-rainforest-trail',
    name: 'Sinharaja Rainforest Conservation Trek',
    shortDescription: 'Lush tropical lowland rainforest trail teeming with endemic birds, giant trees, and hidden waterfalls.',
    description: `Sinharaja Forest Reserve is Sri Lanka's last viable area of primary tropical rainforest. 
    Recognized as a UNESCO Biosphere Reserve and World Heritage Site, over 60% of trees here are endemic, and it houses rare birds such as the Blue Magpie and Red-faced Malkoha. 
    Guided trails wander past gigantic purpleheart Dipterocarpus trees, crystal forest streams, and pristine jungle cascades like Moulawella and Kekuna Falls.`,
    district: 'Ratnapura',
    province: 'Sabaragamuwa Province',
    destination: 'Sinharaja',
    difficulty: 'Easy',
    distanceKm: 7.0,
    estimatedDuration: '3.0 - 4.0 hours',
    elevationGainMeters: 120,
    highestElevationMeters: 550,
    trailType: 'Forest',
    bestSeason: 'December to April & August to September',
    latitude: 6.4167,
    longitude: 80.4667,
    heroImage: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 165,
    features: ['Waterfall', 'Wildlife', 'Forest', 'Photography'],
    safetyInformation: [
      'Leeches are exceptionally high in density throughout the rainforest; leech socks and repellent cream mandatory.',
      'Certified wildlife tracker guide required for entry.'
    ],
    whatToBring: [
      'High-top leech socks',
      'Insect repellent',
      'Waterproof backpack cover & dry bag for electronics',
      'Binoculars for bird watching'
    ],
    currentStatus: 'Open',
    statusLastUpdated: '1 day ago',
    isFeatured: false,
    route: {
      coordinates: [
        [6.4200, 80.4600], // Kudawa Gate
        [6.4167, 80.4667]  // Moulawella Peak / Waterfall
      ],
      waypoints: [
        { id: 'w1', name: 'Kudawa Research Center', type: 'start', latitude: 6.4200, longitude: 80.4600, elevation: 430, description: 'Park gate and guide station.' },
        { id: 'w2', name: 'Moulawella Peak Viewpoint', type: 'end', latitude: 6.4167, longitude: 80.4667, elevation: 550, description: 'Canopy viewpoint.' }
      ],
      elevationProfile: [
        { distanceKm: 0, elevationMeters: 430 },
        { distanceKm: 3.5, elevationMeters: 550 }
      ]
    },
    nearbyPlaces: []
  },
  {
    id: '9',
    slug: 'pekoe-trail-stage-1',
    name: 'The Pekoe Trail - Stage 1 (Hanthana to Galaha)',
    shortDescription: 'Inaugural leg of Sri Lanka’s award-winning 300km walking network through historic Ceylon tea country.',
    description: `The Pekoe Trail is a world-renowned 300km curated walking trail through the Central Highlands of Sri Lanka. 
    Stage 1 begins near the Ceylon Tea Museum in Hanthana, Kandy, ascending through historical tea estates established in the 1870s. 
    Hikers enjoy undulating paths flanked by tea pickers, forest reserves, and panoramic views of Kandy valley before descending gracefully toward Galaha village.`,
    district: 'Kandy',
    province: 'Central Province',
    destination: 'Kandy',
    difficulty: 'Moderate',
    distanceKm: 12.8,
    estimatedDuration: '4.0 - 5.0 hours',
    elevationGainMeters: 380,
    highestElevationMeters: 1100,
    trailType: 'Tea Plantations',
    bestSeason: 'Year-round',
    latitude: 7.2580,
    longitude: 80.6250,
    heroImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 88,
    features: ['Tea Plantations', 'Historical Site', 'Viewpoint', 'Photography'],
    safetyInformation: [
      'Follow official GPX track markers along estate road forks.',
      'Respect tea pickers and estate workers on private field paths.'
    ],
    whatToBring: [
      '2L Water',
      'Sun hat & sunscreen',
      'Light rain jacket',
      'Camera'
    ],
    currentStatus: 'Open',
    statusLastUpdated: '2 hours ago',
    isFeatured: true,
    route: {
      coordinates: [
        [7.2700, 80.6300], // Ceylon Tea Museum
        [7.2580, 80.6250], // Hanthana Ridge
        [7.2000, 80.6200]  // Galaha Town
      ],
      waypoints: [
        { id: 'w1', name: 'Ceylon Tea Museum, Hanthana', type: 'start', latitude: 7.2700, longitude: 80.6300, elevation: 720, description: 'Trailhead start.' },
        { id: 'w2', name: 'Galaha Post Office', type: 'end', latitude: 7.2000, longitude: 80.6200, elevation: 840, description: 'Stage 1 finish point.' }
      ],
      elevationProfile: [
        { distanceKm: 0, elevationMeters: 720 },
        { distanceKm: 6.4, elevationMeters: 1100 },
        { distanceKm: 12.8, elevationMeters: 840 }
      ]
    },
    nearbyPlaces: []
  },
  {
    id: '10',
    slug: 'narangala-hill',
    name: 'Narangala Peak & Golden Plateau',
    shortDescription: 'Pyramidal golden grassland peak offering 360° vistas of Badulla, Keppetipola, and Namunukula.',
    description: `Narangala is the second highest peak in Badulla district (1,500m), famous for its distinctive rectangular summit block and golden patana grasslands. 
    The trail climbs through Thangamale estate rubber/tea hills onto open sharp ridge edges where strong mountain winds blow across the plateau. 
    Sunrise over the surrounding valleys is spectacular.`,
    district: 'Badulla',
    province: 'Uva Province',
    destination: 'Badulla',
    difficulty: 'Moderate',
    distanceKm: 7.5,
    estimatedDuration: '3.0 - 4.0 hours',
    elevationGainMeters: 420,
    highestElevationMeters: 1524,
    trailType: 'Mountain',
    bestSeason: 'June to September & December to March',
    latitude: 6.9500,
    longitude: 80.9167,
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.7,
    reviewCount: 74,
    features: ['Camping', 'Sunrise', 'Viewpoint', 'Photography'],
    safetyInformation: [
      'Narrow cliff edges along the upper ridge; stay back from steep drops in misty weather.'
    ],
    whatToBring: [
      '2L Water',
      'Windbreaker coat',
      'Hiking shoes'
    ],
    currentStatus: 'Open',
    statusLastUpdated: '4 hours ago',
    isFeatured: false,
    route: {
      coordinates: [
        [6.9400, 80.9100],
        [6.9500, 80.9167]
      ],
      waypoints: [
        { id: 'w1', name: 'Thangamale Estate Gate', type: 'start', latitude: 6.9400, longitude: 80.9100, elevation: 1100, description: 'Trailhead start.' },
        { id: 'w2', name: 'Narangala Summit Edge', type: 'end', latitude: 6.9500, longitude: 80.9167, elevation: 1524, description: 'Summit cliff point.' }
      ],
      elevationProfile: [
        { distanceKm: 0, elevationMeters: 1100 },
        { distanceKm: 3.7, elevationMeters: 1524 }
      ]
    },
    nearbyPlaces: []
  },
  {
    id: '11',
    slug: 'pidurangala-rock',
    name: 'Pidurangala Rock Sunrise Climb',
    shortDescription: 'Ancient monastery rock facing Sigiriya Rock Citadel with unbeatable sunrise panoramic views.',
    description: `Pidurangala Rock is a massive volcanic outcrop situated directly opposite Sigiriya Rock Fortress. 
    The climb starts through an ancient Buddhist cave temple housing a reclining Buddha statue, before continuing up stone stairs and scrambling over boulder fields at the top. 
    Standing on the flat summit bedrock at sunrise provides the absolute best view of Sigiriya rising majestically above the emerald jungle canopy.`,
    district: 'Matale',
    province: 'Central Province',
    destination: 'Matale',
    difficulty: 'Easy',
    distanceKm: 2.5,
    estimatedDuration: '1.0 - 1.5 hours',
    elevationGainMeters: 160,
    highestElevationMeters: 360,
    trailType: 'Viewpoint',
    bestSeason: 'Year-round',
    latitude: 7.9667,
    longitude: 80.7667,
    heroImage: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 410,
    features: ['Sunrise', 'Viewpoint', 'Historical Site', 'Photography'],
    safetyInformation: [
      'Modest dress (covering shoulders and knees) required for passing through the temple base.',
      'Final 50 meters require boulder climbing; take care with grip.'
    ],
    whatToBring: [
      'Headlamp for pre-dawn climbs',
      'Temple-appropriate sarong or scarf',
      '1L Water'
    ],
    currentStatus: 'Open',
    statusLastUpdated: '1 hour ago',
    isFeatured: true,
    route: {
      coordinates: [
        [7.9650, 80.7650],
        [7.9667, 80.7667]
      ],
      waypoints: [
        { id: 'w1', name: 'Pidurangala Royal Cave Temple', type: 'start', latitude: 7.9650, longitude: 80.7650, elevation: 200, description: 'Temple entrance office.' },
        { id: 'w2', name: 'Pidurangala Summit Plateau', type: 'end', latitude: 7.9667, longitude: 80.7667, elevation: 360, description: 'Flat summit overlooking Sigiriya.' }
      ],
      elevationProfile: [
        { distanceKm: 0, elevationMeters: 200 },
        { distanceKm: 1.25, elevationMeters: 360 }
      ]
    },
    nearbyPlaces: []
  },
  {
    id: '12',
    slug: 'devils-staircase-ohiya-kalupahana',
    name: 'Devil’s Staircase Trek (Ohiya to Kalupahana)',
    shortDescription: 'Famous steep zigzag mountain trail passing Bambarakanda Falls & V-cut cliff passes.',
    description: `The Devil’s Staircase is one of Sri Lanka’s legendary mountain hikes, linking Ohiya station in Horton Plains region down to Kalupahana on the Colombo-Badulla highway. 
    Named after its hair-raising zig-zag dirt tracks carved into cliff walls, the 14 km trail leads past pine forests, tea estates, the famous "V-Cut" rock pass, and Bambarakanda Falls—Sri Lanka's tallest waterfall (263 meters).`,
    district: 'Badulla',
    province: 'Uva Province',
    destination: 'Horton Plains',
    difficulty: 'Difficult',
    distanceKm: 14.5,
    estimatedDuration: '5.0 - 6.5 hours',
    elevationGainMeters: 250,
    highestElevationMeters: 1900,
    trailType: 'Waterfall',
    bestSeason: 'December to April',
    latitude: 6.7750,
    longitude: 80.8400,
    heroImage: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 92,
    features: ['Waterfall', 'Viewpoint', 'Tea Plantations', 'Photography'],
    safetyInformation: [
      'Steep loose gravel slopes along downhill stretches; sturdy footwear essential.'
    ],
    whatToBring: [
      '2.5L Water',
      'Snacks & packed lunch',
      'Good trekking shoes'
    ],
    currentStatus: 'Open',
    statusLastUpdated: '3 hours ago',
    isFeatured: true,
    route: {
      coordinates: [
        [6.8100, 80.8450], // Ohiya Station
        [6.7800, 80.8420], // V-Cut
        [6.7750, 80.8400]  // Kalupahana
      ],
      waypoints: [
        { id: 'w1', name: 'Ohiya Railway Station', type: 'start', latitude: 6.8100, longitude: 80.8450, elevation: 1780, description: 'Trailhead start.' },
        { id: 'w2', name: 'Bambarakanda Waterfall Viewpoint', type: 'waterfall', latitude: 6.7750, longitude: 80.8400, elevation: 1100, description: 'Tallest waterfall view in Sri Lanka.' }
      ],
      elevationProfile: [
        { distanceKm: 0, elevationMeters: 1780 },
        { distanceKm: 14.5, elevationMeters: 900 }
      ]
    },
    nearbyPlaces: []
  }
];
