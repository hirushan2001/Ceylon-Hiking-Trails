import { TrailConditionReport, HikingGroupEvent } from '../types';

export const INITIAL_CONDITION_REPORTS: TrailConditionReport[] = [
  {
    id: 'cr1',
    trailId: '1',
    trailName: 'Ella Rock Trek',
    status: 'Open',
    reportedBy: 'Kasun Wickramasinghe',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    timestamp: '2 hours ago',
    weather: 'Clear',
    notes: 'Trail is in great condition today! Rail track section clear. Morning sun was gorgeous. Bring plenty of water.',
    waterAvailable: true,
    photoUrl: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
    upvotes: 24
  },
  {
    id: 'cr2',
    trailId: '5',
    trailName: 'Knuckles Five Peaks Expedition',
    status: 'Caution',
    reportedBy: 'Ruwan Fernando',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    timestamp: '5 hours ago',
    weather: 'Mist / Fog',
    notes: 'Heavy mist rolled in around Peak 3. High winds along the ridge. Bring leech socks and extra rain gear.',
    waterAvailable: true,
    upvotes: 18
  },
  {
    id: 'cr3',
    trailId: '3',
    trailName: 'Horton Plains & World’s End Loop',
    status: 'Open',
    reportedBy: 'Elena Rostova',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    timestamp: '6 hours ago',
    weather: 'Sunny',
    notes: 'World’s End was crystal clear at 8:30 AM! Sambar deer spotted near Baker’s Falls. Ranger checkpoint checking plastic bottles.',
    waterAvailable: false,
    upvotes: 42
  }
];

export const UPCOMING_GROUP_EVENTS: HikingGroupEvent[] = [
  {
    id: 'e1',
    title: 'Knuckles Ridge Weekend Expedition',
    trailId: '5',
    trailName: 'Knuckles Five Peaks Expedition',
    location: 'Bambarella, Matale',
    date: 'Saturday, Sep 19',
    time: '05:30 AM',
    difficulty: 'Extreme',
    organizerName: 'Dinesh Perera',
    organizerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    currentParticipants: 7,
    maxParticipants: 10,
    description: 'Join certified mountain guide Dinesh for a 1-day summit assault on the famous Knuckles Five Peaks. Transport from Kandy available.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    joinedUserIds: ['user1', 'user2']
  },
  {
    id: 'e2',
    title: 'Ella Rock Sunrise Photography Walk',
    trailId: '1',
    trailName: 'Ella Rock Trek',
    location: 'Ella Railway Station',
    date: 'Sunday, Sep 13',
    time: '05:00 AM',
    difficulty: 'Moderate',
    organizerName: 'Sanath Jayasinghe',
    organizerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    currentParticipants: 11,
    maxParticipants: 15,
    description: 'Early morning sunrise hike to capture the golden light across Ella Gap. Hot Ceylon tea included at the peak!',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
    joinedUserIds: ['user3']
  }
];
