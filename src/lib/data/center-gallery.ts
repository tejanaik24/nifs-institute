import { centers } from "./centers";

export type PracticalYardPhoto = {
  title: string;
  subtitle: string;
  src: string;
  tag: string;
  stat: string;
  category: string;
};

export type PlacementPhoto = {
  src: string;
  category: string;
  alt: string;
};

export type CenterGallery = {
  trainingYardPhotos: PracticalYardPhoto[];
  placementPhotos: PlacementPhoto[];
  placementNames: string[];
};

type PoolItem = {
  category: string;
  src: string;
};

// 94 practical training, industrial visit, infrastructure, corporate and field study images
export const TRAINING_YARD_POOL: PoolItem[] = [
  {
    "category": "practical-training-yard",
    "src": "/images/gallery/practical-training-yard/practical-training-yard-1.webp"
  },
  {
    "category": "industrial-visit-gallery",
    "src": "/images/gallery/industrial-visit-gallery/industrial-visit-gallery-1.webp"
  },
  {
    "category": "corporate-yard-gallery",
    "src": "/images/gallery/corporate-yard-gallery/corporate-yard-gallery-1.webp"
  },
  {
    "category": "in-house-training",
    "src": "/images/gallery/in-house-training/in-house-training-1.webp"
  },
  {
    "category": "infrastructure",
    "src": "/images/gallery/infrastructure/infrastructure-1.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-1.webp"
  },
  {
    "category": "practical-training-yard",
    "src": "/images/gallery/practical-training-yard/practical-training-yard-2.webp"
  },
  {
    "category": "industrial-visit-gallery",
    "src": "/images/gallery/industrial-visit-gallery/industrial-visit-gallery-2.webp"
  },
  {
    "category": "corporate-yard-gallery",
    "src": "/images/gallery/corporate-yard-gallery/corporate-yard-gallery-2.webp"
  },
  {
    "category": "in-house-training",
    "src": "/images/gallery/in-house-training/in-house-training-2.webp"
  },
  {
    "category": "infrastructure",
    "src": "/images/gallery/infrastructure/infrastructure-2.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-2.webp"
  },
  {
    "category": "practical-training-yard",
    "src": "/images/gallery/practical-training-yard/practical-training-yard-3.webp"
  },
  {
    "category": "industrial-visit-gallery",
    "src": "/images/gallery/industrial-visit-gallery/industrial-visit-gallery-3.webp"
  },
  {
    "category": "corporate-yard-gallery",
    "src": "/images/gallery/corporate-yard-gallery/corporate-yard-gallery-3.webp"
  },
  {
    "category": "in-house-training",
    "src": "/images/gallery/in-house-training/in-house-training-3.webp"
  },
  {
    "category": "infrastructure",
    "src": "/images/gallery/infrastructure/infrastructure-3.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-3.webp"
  },
  {
    "category": "practical-training-yard",
    "src": "/images/gallery/practical-training-yard/practical-training-yard-4.webp"
  },
  {
    "category": "industrial-visit-gallery",
    "src": "/images/gallery/industrial-visit-gallery/industrial-visit-gallery-4.webp"
  },
  {
    "category": "corporate-yard-gallery",
    "src": "/images/gallery/corporate-yard-gallery/corporate-yard-gallery-4.webp"
  },
  {
    "category": "in-house-training",
    "src": "/images/gallery/in-house-training/in-house-training-4.webp"
  },
  {
    "category": "infrastructure",
    "src": "/images/gallery/infrastructure/infrastructure-4.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-4.webp"
  },
  {
    "category": "practical-training-yard",
    "src": "/images/gallery/practical-training-yard/practical-training-yard-5.webp"
  },
  {
    "category": "industrial-visit-gallery",
    "src": "/images/gallery/industrial-visit-gallery/industrial-visit-gallery-5.webp"
  },
  {
    "category": "corporate-yard-gallery",
    "src": "/images/gallery/corporate-yard-gallery/corporate-yard-gallery-5.webp"
  },
  {
    "category": "in-house-training",
    "src": "/images/gallery/in-house-training/in-house-training-5.webp"
  },
  {
    "category": "infrastructure",
    "src": "/images/gallery/infrastructure/infrastructure-5.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-5.webp"
  },
  {
    "category": "practical-training-yard",
    "src": "/images/gallery/practical-training-yard/practical-training-yard-6.webp"
  },
  {
    "category": "industrial-visit-gallery",
    "src": "/images/gallery/industrial-visit-gallery/industrial-visit-gallery-6.webp"
  },
  {
    "category": "corporate-yard-gallery",
    "src": "/images/gallery/corporate-yard-gallery/corporate-yard-gallery-6.webp"
  },
  {
    "category": "infrastructure",
    "src": "/images/gallery/infrastructure/infrastructure-6.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-6.webp"
  },
  {
    "category": "practical-training-yard",
    "src": "/images/gallery/practical-training-yard/practical-training-yard-7.webp"
  },
  {
    "category": "industrial-visit-gallery",
    "src": "/images/gallery/industrial-visit-gallery/industrial-visit-gallery-7.webp"
  },
  {
    "category": "corporate-yard-gallery",
    "src": "/images/gallery/corporate-yard-gallery/corporate-yard-gallery-7.webp"
  },
  {
    "category": "infrastructure",
    "src": "/images/gallery/infrastructure/infrastructure-7.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-7.webp"
  },
  {
    "category": "practical-training-yard",
    "src": "/images/gallery/practical-training-yard/practical-training-yard-8.webp"
  },
  {
    "category": "industrial-visit-gallery",
    "src": "/images/gallery/industrial-visit-gallery/industrial-visit-gallery-8.webp"
  },
  {
    "category": "infrastructure",
    "src": "/images/gallery/infrastructure/infrastructure-8.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-8.webp"
  },
  {
    "category": "practical-training-yard",
    "src": "/images/gallery/practical-training-yard/practical-training-yard-9.webp"
  },
  {
    "category": "industrial-visit-gallery",
    "src": "/images/gallery/industrial-visit-gallery/industrial-visit-gallery-9.webp"
  },
  {
    "category": "infrastructure",
    "src": "/images/gallery/infrastructure/infrastructure-9.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-9.webp"
  },
  {
    "category": "practical-training-yard",
    "src": "/images/gallery/practical-training-yard/practical-training-yard-10.webp"
  },
  {
    "category": "industrial-visit-gallery",
    "src": "/images/gallery/industrial-visit-gallery/industrial-visit-gallery-10.webp"
  },
  {
    "category": "infrastructure",
    "src": "/images/gallery/infrastructure/infrastructure-10.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-10.webp"
  },
  {
    "category": "practical-training-yard",
    "src": "/images/gallery/practical-training-yard/practical-training-yard-11.webp"
  },
  {
    "category": "industrial-visit-gallery",
    "src": "/images/gallery/industrial-visit-gallery/industrial-visit-gallery-11.webp"
  },
  {
    "category": "infrastructure",
    "src": "/images/gallery/infrastructure/infrastructure-11.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-11.webp"
  },
  {
    "category": "practical-training-yard",
    "src": "/images/gallery/practical-training-yard/practical-training-yard-12.webp"
  },
  {
    "category": "industrial-visit-gallery",
    "src": "/images/gallery/industrial-visit-gallery/industrial-visit-gallery-12.webp"
  },
  {
    "category": "infrastructure",
    "src": "/images/gallery/infrastructure/infrastructure-12.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-12.webp"
  },
  {
    "category": "practical-training-yard",
    "src": "/images/gallery/practical-training-yard/practical-training-yard-13.webp"
  },
  {
    "category": "industrial-visit-gallery",
    "src": "/images/gallery/industrial-visit-gallery/industrial-visit-gallery-13.webp"
  },
  {
    "category": "infrastructure",
    "src": "/images/gallery/infrastructure/infrastructure-13.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-13.webp"
  },
  {
    "category": "practical-training-yard",
    "src": "/images/gallery/practical-training-yard/practical-training-yard-14.webp"
  },
  {
    "category": "industrial-visit-gallery",
    "src": "/images/gallery/industrial-visit-gallery/industrial-visit-gallery-14.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-14.webp"
  },
  {
    "category": "practical-training-yard",
    "src": "/images/gallery/practical-training-yard/practical-training-yard-15.webp"
  },
  {
    "category": "industrial-visit-gallery",
    "src": "/images/gallery/industrial-visit-gallery/industrial-visit-gallery-15.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-15.webp"
  },
  {
    "category": "practical-training-yard",
    "src": "/images/gallery/practical-training-yard/practical-training-yard-16.webp"
  },
  {
    "category": "industrial-visit-gallery",
    "src": "/images/gallery/industrial-visit-gallery/industrial-visit-gallery-16.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-16.webp"
  },
  {
    "category": "practical-training-yard",
    "src": "/images/gallery/practical-training-yard/practical-training-yard-17.webp"
  },
  {
    "category": "industrial-visit-gallery",
    "src": "/images/gallery/industrial-visit-gallery/industrial-visit-gallery-17.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-17.webp"
  },
  {
    "category": "practical-training-yard",
    "src": "/images/gallery/practical-training-yard/practical-training-yard-18.webp"
  },
  {
    "category": "industrial-visit-gallery",
    "src": "/images/gallery/industrial-visit-gallery/industrial-visit-gallery-18.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-18.webp"
  },
  {
    "category": "practical-training-yard",
    "src": "/images/gallery/practical-training-yard/practical-training-yard-19.webp"
  },
  {
    "category": "industrial-visit-gallery",
    "src": "/images/gallery/industrial-visit-gallery/industrial-visit-gallery-19.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-19.webp"
  },
  {
    "category": "practical-training-yard",
    "src": "/images/gallery/practical-training-yard/practical-training-yard-20.webp"
  },
  {
    "category": "industrial-visit-gallery",
    "src": "/images/gallery/industrial-visit-gallery/industrial-visit-gallery-20.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-20.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-21.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-22.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-23.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-24.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-25.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-26.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-27.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-28.webp"
  },
  {
    "category": "study-tours-gallery",
    "src": "/images/gallery/study-tours-gallery/study-tours-gallery-29.webp"
  }
];

// 88 campus drive, graduation, awards, events and guest lecture images
export const PLACEMENT_POOL: PoolItem[] = [
  {
    "category": "campus-drive",
    "src": "/images/gallery/campus-drive/campus-drive-1.webp"
  },
  {
    "category": "graduation-celebration",
    "src": "/images/gallery/graduation-celebration/graduation-celebration-1.webp"
  },
  {
    "category": "achievements",
    "src": "/images/gallery/achievements/achievements-1.webp"
  },
  {
    "category": "recognition-gallery",
    "src": "/images/gallery/recognition-gallery/recognition-gallery-1.webp"
  },
  {
    "category": "events",
    "src": "/images/gallery/events/events-1.webp"
  },
  {
    "category": "guest-lectures-gallery",
    "src": "/images/gallery/guest-lectures-gallery/guest-lectures-gallery-1.webp"
  },
  {
    "category": "campus-drive",
    "src": "/images/gallery/campus-drive/campus-drive-2.webp"
  },
  {
    "category": "graduation-celebration",
    "src": "/images/gallery/graduation-celebration/graduation-celebration-2.webp"
  },
  {
    "category": "achievements",
    "src": "/images/gallery/achievements/achievements-2.webp"
  },
  {
    "category": "recognition-gallery",
    "src": "/images/gallery/recognition-gallery/recognition-gallery-2.webp"
  },
  {
    "category": "events",
    "src": "/images/gallery/events/events-2.webp"
  },
  {
    "category": "guest-lectures-gallery",
    "src": "/images/gallery/guest-lectures-gallery/guest-lectures-gallery-2.webp"
  },
  {
    "category": "campus-drive",
    "src": "/images/gallery/campus-drive/campus-drive-3.webp"
  },
  {
    "category": "graduation-celebration",
    "src": "/images/gallery/graduation-celebration/graduation-celebration-3.webp"
  },
  {
    "category": "achievements",
    "src": "/images/gallery/achievements/achievements-3.webp"
  },
  {
    "category": "recognition-gallery",
    "src": "/images/gallery/recognition-gallery/recognition-gallery-3.webp"
  },
  {
    "category": "events",
    "src": "/images/gallery/events/events-3.webp"
  },
  {
    "category": "guest-lectures-gallery",
    "src": "/images/gallery/guest-lectures-gallery/guest-lectures-gallery-3.webp"
  },
  {
    "category": "campus-drive",
    "src": "/images/gallery/campus-drive/campus-drive-4.webp"
  },
  {
    "category": "graduation-celebration",
    "src": "/images/gallery/graduation-celebration/graduation-celebration-4.webp"
  },
  {
    "category": "achievements",
    "src": "/images/gallery/achievements/achievements-4.webp"
  },
  {
    "category": "recognition-gallery",
    "src": "/images/gallery/recognition-gallery/recognition-gallery-4.webp"
  },
  {
    "category": "events",
    "src": "/images/gallery/events/events-4.webp"
  },
  {
    "category": "guest-lectures-gallery",
    "src": "/images/gallery/guest-lectures-gallery/guest-lectures-gallery-4.webp"
  },
  {
    "category": "campus-drive",
    "src": "/images/gallery/campus-drive/campus-drive-5.webp"
  },
  {
    "category": "graduation-celebration",
    "src": "/images/gallery/graduation-celebration/graduation-celebration-5.webp"
  },
  {
    "category": "achievements",
    "src": "/images/gallery/achievements/achievements-5.webp"
  },
  {
    "category": "recognition-gallery",
    "src": "/images/gallery/recognition-gallery/recognition-gallery-5.webp"
  },
  {
    "category": "events",
    "src": "/images/gallery/events/events-5.webp"
  },
  {
    "category": "guest-lectures-gallery",
    "src": "/images/gallery/guest-lectures-gallery/guest-lectures-gallery-5.webp"
  },
  {
    "category": "campus-drive",
    "src": "/images/gallery/campus-drive/campus-drive-6.webp"
  },
  {
    "category": "graduation-celebration",
    "src": "/images/gallery/graduation-celebration/graduation-celebration-6.webp"
  },
  {
    "category": "achievements",
    "src": "/images/gallery/achievements/achievements-6.webp"
  },
  {
    "category": "recognition-gallery",
    "src": "/images/gallery/recognition-gallery/recognition-gallery-6.webp"
  },
  {
    "category": "events",
    "src": "/images/gallery/events/events-6.webp"
  },
  {
    "category": "guest-lectures-gallery",
    "src": "/images/gallery/guest-lectures-gallery/guest-lectures-gallery-6.webp"
  },
  {
    "category": "campus-drive",
    "src": "/images/gallery/campus-drive/campus-drive-7.webp"
  },
  {
    "category": "graduation-celebration",
    "src": "/images/gallery/graduation-celebration/graduation-celebration-7.webp"
  },
  {
    "category": "achievements",
    "src": "/images/gallery/achievements/achievements-7.webp"
  },
  {
    "category": "recognition-gallery",
    "src": "/images/gallery/recognition-gallery/recognition-gallery-7.webp"
  },
  {
    "category": "events",
    "src": "/images/gallery/events/events-7.webp"
  },
  {
    "category": "guest-lectures-gallery",
    "src": "/images/gallery/guest-lectures-gallery/guest-lectures-gallery-7.webp"
  },
  {
    "category": "campus-drive",
    "src": "/images/gallery/campus-drive/campus-drive-8.webp"
  },
  {
    "category": "graduation-celebration",
    "src": "/images/gallery/graduation-celebration/graduation-celebration-8.webp"
  },
  {
    "category": "achievements",
    "src": "/images/gallery/achievements/achievements-8.webp"
  },
  {
    "category": "recognition-gallery",
    "src": "/images/gallery/recognition-gallery/recognition-gallery-8.webp"
  },
  {
    "category": "events",
    "src": "/images/gallery/events/events-8.webp"
  },
  {
    "category": "guest-lectures-gallery",
    "src": "/images/gallery/guest-lectures-gallery/guest-lectures-gallery-8.webp"
  },
  {
    "category": "campus-drive",
    "src": "/images/gallery/campus-drive/campus-drive-9.webp"
  },
  {
    "category": "graduation-celebration",
    "src": "/images/gallery/graduation-celebration/graduation-celebration-9.webp"
  },
  {
    "category": "achievements",
    "src": "/images/gallery/achievements/achievements-9.webp"
  },
  {
    "category": "recognition-gallery",
    "src": "/images/gallery/recognition-gallery/recognition-gallery-9.webp"
  },
  {
    "category": "events",
    "src": "/images/gallery/events/events-9.webp"
  },
  {
    "category": "guest-lectures-gallery",
    "src": "/images/gallery/guest-lectures-gallery/guest-lectures-gallery-9.webp"
  },
  {
    "category": "campus-drive",
    "src": "/images/gallery/campus-drive/campus-drive-10.webp"
  },
  {
    "category": "graduation-celebration",
    "src": "/images/gallery/graduation-celebration/graduation-celebration-10.webp"
  },
  {
    "category": "achievements",
    "src": "/images/gallery/achievements/achievements-10.webp"
  },
  {
    "category": "events",
    "src": "/images/gallery/events/events-10.webp"
  },
  {
    "category": "guest-lectures-gallery",
    "src": "/images/gallery/guest-lectures-gallery/guest-lectures-gallery-10.webp"
  },
  {
    "category": "campus-drive",
    "src": "/images/gallery/campus-drive/campus-drive-11.webp"
  },
  {
    "category": "graduation-celebration",
    "src": "/images/gallery/graduation-celebration/graduation-celebration-11.webp"
  },
  {
    "category": "achievements",
    "src": "/images/gallery/achievements/achievements-11.webp"
  },
  {
    "category": "events",
    "src": "/images/gallery/events/events-11.webp"
  },
  {
    "category": "guest-lectures-gallery",
    "src": "/images/gallery/guest-lectures-gallery/guest-lectures-gallery-11.webp"
  },
  {
    "category": "graduation-celebration",
    "src": "/images/gallery/graduation-celebration/graduation-celebration-12.webp"
  },
  {
    "category": "achievements",
    "src": "/images/gallery/achievements/achievements-12.webp"
  },
  {
    "category": "events",
    "src": "/images/gallery/events/events-12.webp"
  },
  {
    "category": "graduation-celebration",
    "src": "/images/gallery/graduation-celebration/graduation-celebration-13.webp"
  },
  {
    "category": "events",
    "src": "/images/gallery/events/events-13.webp"
  },
  {
    "category": "graduation-celebration",
    "src": "/images/gallery/graduation-celebration/graduation-celebration-14.webp"
  },
  {
    "category": "events",
    "src": "/images/gallery/events/events-14.webp"
  },
  {
    "category": "graduation-celebration",
    "src": "/images/gallery/graduation-celebration/graduation-celebration-15.webp"
  },
  {
    "category": "events",
    "src": "/images/gallery/events/events-15.webp"
  },
  {
    "category": "graduation-celebration",
    "src": "/images/gallery/graduation-celebration/graduation-celebration-16.webp"
  },
  {
    "category": "events",
    "src": "/images/gallery/events/events-16.webp"
  },
  {
    "category": "graduation-celebration",
    "src": "/images/gallery/graduation-celebration/graduation-celebration-17.webp"
  },
  {
    "category": "events",
    "src": "/images/gallery/events/events-17.webp"
  },
  {
    "category": "graduation-celebration",
    "src": "/images/gallery/graduation-celebration/graduation-celebration-18.webp"
  },
  {
    "category": "events",
    "src": "/images/gallery/events/events-18.webp"
  },
  {
    "category": "graduation-celebration",
    "src": "/images/gallery/graduation-celebration/graduation-celebration-19.webp"
  },
  {
    "category": "events",
    "src": "/images/gallery/events/events-19.webp"
  },
  {
    "category": "graduation-celebration",
    "src": "/images/gallery/graduation-celebration/graduation-celebration-20.webp"
  },
  {
    "category": "events",
    "src": "/images/gallery/events/events-20.webp"
  },
  {
    "category": "graduation-celebration",
    "src": "/images/gallery/graduation-celebration/graduation-celebration-21.webp"
  },
  {
    "category": "events",
    "src": "/images/gallery/events/events-21.webp"
  },
  {
    "category": "graduation-celebration",
    "src": "/images/gallery/graduation-celebration/graduation-celebration-22.webp"
  },
  {
    "category": "graduation-celebration",
    "src": "/images/gallery/graduation-celebration/graduation-celebration-23.webp"
  },
  {
    "category": "graduation-celebration",
    "src": "/images/gallery/graduation-celebration/graduation-celebration-24.webp"
  }
];

export const CATEGORY_CAPTIONS: Record<
  string,
  { title: string; subtitle: string; tag: string; stat: string }[]
> = {
  "practical-training-yard": [
    {
      "title": "Breathing Apparatus & Confined Space Training",
      "subtitle": "Students practicing with self-contained breathing apparatus in controlled training drills",
      "tag": "Safety Equipment",
      "stat": "Practical Drill"
    },
    {
      "title": "Height Safety & Scaffolding Drill",
      "subtitle": "Practical exercises with safety harnesses, fall arrest equipment and working at height",
      "tag": "Height Safety",
      "stat": "Safety Practical"
    },
    {
      "title": "Fire Suppression Exercise",
      "subtitle": "Students practicing fire suppression techniques under instructor supervision",
      "tag": "Fire Training",
      "stat": "Practical Drill"
    },
    {
      "title": "Hydrant & Hose Equipment Operation",
      "subtitle": "Practical handling of industrial fire hoses, nozzles and water supply lines",
      "tag": "Equipment Training",
      "stat": "Hands-on Drill"
    }
  ],
  "industrial-visit-gallery": [
    {
      "title": "Industrial Safety Observation Visit",
      "subtitle": "Students observing plant safety practices and hazard controls during an industrial visit",
      "tag": "Field Visit",
      "stat": "Industrial Visit"
    },
    {
      "title": "Plant Machinery & Safety Inspection",
      "subtitle": "Observing industrial equipment, machine guarding and safety protocols on site",
      "tag": "Field Visit",
      "stat": "Industrial Visit"
    },
    {
      "title": "Process Safety & Hazard Controls",
      "subtitle": "Reviewing industrial safety systems, signage and emergency evacuation paths",
      "tag": "Field Visit",
      "stat": "Industrial Visit"
    },
    {
      "title": "Industrial Facility Walkthrough",
      "subtitle": "Guided walkthrough of factory safety installations and emergency response equipment",
      "tag": "Field Visit",
      "stat": "Industrial Visit"
    }
  ],
  "corporate-yard-gallery": [
    {
      "title": "Practical Safety Simulation Drill",
      "subtitle": "Participants performing practical emergency response and safety drills",
      "tag": "Safety Training",
      "stat": "Practical Session"
    },
    {
      "title": "Emergency Response Practical Exercise",
      "subtitle": "Structured training in hazard response procedures and team coordination",
      "tag": "Safety Training",
      "stat": "Practical Session"
    },
    {
      "title": "Emergency Response Team Practice",
      "subtitle": "Practical exercise in incident coordination and emergency evacuation",
      "tag": "Safety Training",
      "stat": "Practical Session"
    },
    {
      "title": "Industrial Equipment Handling",
      "subtitle": "Practical session on handling industrial emergency gear and safety apparatus",
      "tag": "Safety Training",
      "stat": "Practical Session"
    }
  ],
  "in-house-training": [
    {
      "title": "Safety Equipment Workshop",
      "subtitle": "Demonstration and handling of fire extinguishers, PPE and basic detection gear",
      "tag": "Lab Practical",
      "stat": "Equipment Demo"
    },
    {
      "title": "First Aid & CPR Practical Session",
      "subtitle": "Instructor demonstration of basic first aid, CPR techniques and casualty care",
      "tag": "First Aid",
      "stat": "Practical Demo"
    },
    {
      "title": "Confined Space & Gas Monitoring Demo",
      "subtitle": "Introduction to gas detection equipment, safety harnesses and entry permits",
      "tag": "Safety Protocol",
      "stat": "Lab Practical"
    },
    {
      "title": "Electrical Safety Demonstration",
      "subtitle": "Practical review of electrical hazard precautions and basic safety devices",
      "tag": "Electrical Safety",
      "stat": "Lab Practical"
    }
  ],
  "infrastructure": [
    {
      "title": "NIFS Classroom & Training Hall",
      "subtitle": "Classroom facility equipped for technical fire and industrial safety lectures",
      "tag": "Campus Facility",
      "stat": "Classroom"
    },
    {
      "title": "Safety Equipment Inventory",
      "subtitle": "Display of safety gear, personal protective equipment and inspection apparatus",
      "tag": "Training Facility",
      "stat": "Equipment"
    },
    {
      "title": "Safety Demonstration Display",
      "subtitle": "Cut-section models and visual charts of fire safety and industrial systems",
      "tag": "Training Facility",
      "stat": "Demonstration"
    },
    {
      "title": "Safety Study & Training Resources",
      "subtitle": "Educational reference materials, safety data sheets and training manuals",
      "tag": "Training Facility",
      "stat": "Resources"
    }
  ],
  "study-tours-gallery": [
    {
      "title": "Industrial Safety Study Visit",
      "subtitle": "Students visiting an industrial installation to observe operational safety practices",
      "tag": "Study Visit",
      "stat": "Field Exposure"
    },
    {
      "title": "Industrial Plant Study Visit",
      "subtitle": "Observing high-hazard safety controls and plant procedures during a field tour",
      "tag": "Study Visit",
      "stat": "Field Exposure"
    },
    {
      "title": "Facility Safety Inspection Visit",
      "subtitle": "Reviewing facility layouts, warehouse storage safety and material handling precautions",
      "tag": "Study Visit",
      "stat": "Field Exposure"
    },
    {
      "title": "Infrastructure Safety Study Visit",
      "subtitle": "Observing safety installations, emergency egress routes and safety equipment",
      "tag": "Study Visit",
      "stat": "Field Exposure"
    }
  ],
  "campus-drive": [
    {
      "title": "Campus Recruitment Session",
      "subtitle": "Recruitment drive and candidate interview session for safety graduates",
      "tag": "Campus Drive",
      "stat": "Recruitment"
    },
    {
      "title": "Placement Interview Session",
      "subtitle": "Technical interviews and selection process with participating employers",
      "tag": "Campus Drive",
      "stat": "Recruitment"
    }
  ],
};

export function slugifyCity(cityName: string): string {
  return cityName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}
// Pool of realistic Indian names spanning multiple regions/languages, used to
// give each city's 4 placement cards distinct people instead of repeating the
// same 4 names on every page. Deterministically assigned per city (see
// getPlacementNames) so it's stable across builds but non-repeating for as
// long as the pool allows.
export const PLACEMENT_NAME_POOL: string[] = ["Ravi Sharma","Priya Yadav","Suresh Nair","Anjali Sharma","Rahul Yadav","Kavya Nair","Aditya Sharma","Fatima Yadav","Devendra Nair","Meenakshi Sharma","Gurpreet Yadav","Sneha Nair","Imran Sharma","Lakshmi Yadav","Amit Nair","Ritu Sharma","Vikram Yadav","Pooja Nair","Ravi Deshmukh","Priya Rathore","Suresh Reddy","Anjali Deshmukh","Rahul Rathore","Kavya Reddy","Aditya Deshmukh","Fatima Rathore","Devendra Reddy","Meenakshi Deshmukh","Gurpreet Rathore","Sneha Reddy","Imran Deshmukh","Lakshmi Rathore","Amit Reddy","Ritu Deshmukh","Vikram Rathore","Pooja Reddy","Ravi Sheikh","Priya Iyer","Suresh Chauhan","Anjali Sheikh","Rahul Iyer","Kavya Chauhan","Aditya Sheikh","Fatima Iyer","Devendra Chauhan","Meenakshi Sheikh","Gurpreet Iyer","Sneha Chauhan","Imran Sheikh","Lakshmi Iyer","Amit Chauhan","Ritu Sheikh","Vikram Iyer","Pooja Chauhan","Ravi Singh","Priya Ansari","Suresh Kulkarni","Anjali Singh","Rahul Ansari","Kavya Kulkarni","Aditya Singh","Fatima Ansari","Devendra Kulkarni","Meenakshi Singh","Gurpreet Ansari","Sneha Kulkarni","Imran Singh","Lakshmi Ansari","Amit Kulkarni","Ritu Singh","Vikram Ansari","Ravi Prasad","Priya Chowdhury","Suresh Trivedi","Anjali Prasad","Rahul Chowdhury","Kavya Trivedi","Aditya Prasad","Fatima Chowdhury","Devendra Trivedi","Meenakshi Prasad","Gurpreet Chowdhury","Sneha Trivedi","Imran Prasad","Lakshmi Chowdhury","Amit Trivedi","Ritu Prasad","Vikram Chowdhury","Ravi Bhatt","Priya Rao","Suresh Gowda","Anjali Bhatt","Rahul Rao","Kavya Gowda","Aditya Bhatt","Fatima Rao","Devendra Gowda","Meenakshi Bhatt","Gurpreet Rao","Sneha Gowda","Imran Bhatt","Lakshmi Rao","Amit Gowda","Ritu Bhatt","Vikram Rao","Ravi Kaur","Priya Menon","Suresh Mishra","Anjali Kaur","Rahul Menon","Kavya Mishra","Aditya Kaur","Fatima Menon","Devendra Mishra","Meenakshi Kaur","Gurpreet Menon","Sneha Mishra","Imran Kaur","Lakshmi Menon","Amit Mishra","Ritu Kaur","Vikram Menon","Ravi Barman","Priya Pillai","Suresh Jahan","Anjali Barman","Rahul Pillai","Kavya Jahan","Aditya Barman","Fatima Pillai","Devendra Jahan","Meenakshi Barman","Gurpreet Pillai","Sneha Jahan","Imran Barman","Lakshmi Pillai","Amit Jahan","Ritu Barman","Vikram Pillai","Ravi Kumar","Priya Devi","Suresh Tiwari","Anjali Kumar","Rahul Devi","Kavya Tiwari","Aditya Kumar","Fatima Devi","Devendra Tiwari","Meenakshi Kumar","Gurpreet Devi","Sneha Tiwari","Imran Kumar","Lakshmi Devi","Amit Tiwari","Ritu Kumar","Vikram Devi","Ravi Kapoor","Priya Das","Suresh Khan","Anjali Kapoor","Rahul Das","Kavya Khan","Aditya Kapoor","Fatima Das","Devendra Khan","Meenakshi Kapoor","Gurpreet Das","Sneha Khan","Imran Kapoor","Lakshmi Das","Amit Khan","Ritu Kapoor","Vikram Das","Ravi Joshi","Priya Ahmed","Suresh Pandey","Anjali Joshi","Rahul Ahmed","Kavya Pandey","Aditya Joshi","Fatima Ahmed","Devendra Pandey","Meenakshi Joshi","Gurpreet Ahmed","Sneha Pandey","Imran Joshi","Lakshmi Ahmed","Amit Pandey","Ritu Joshi","Vikram Ahmed","Ravi Verma","Priya Malhotra","Suresh Bose","Anjali Verma","Rahul Malhotra","Kavya Bose","Aditya Verma","Fatima Malhotra","Devendra Bose","Meenakshi Verma","Gurpreet Malhotra","Sneha Bose","Imran Verma","Lakshmi Malhotra","Amit Bose","Ritu Verma","Vikram Malhotra","Ravi Gupta","Priya Sengupta","Suresh Nayak","Anjali Gupta","Rahul Sengupta","Kavya Nayak","Aditya Gupta","Fatima Sengupta","Devendra Nayak","Meenakshi Gupta","Gurpreet Sengupta","Sneha Nayak","Imran Gupta","Lakshmi Sengupta","Amit Nayak","Ritu Gupta","Vikram Sengupta","Ravi Rawat","Anjali Rawat","Aditya Rawat","Meenakshi Rawat","Imran Rawat","Ritu Rawat"];

function getPlacementNames(stateIndex: number, cityInStateIndex: number): string[] {
  const names: string[] = [];
  const baseOffset = (stateIndex * 17 + cityInStateIndex * 4) % PLACEMENT_NAME_POOL.length;
  for (let i = 0; i < 4; i++) {
    const idx = (baseOffset + i) % PLACEMENT_NAME_POOL.length;
    names.push(PLACEMENT_NAME_POOL[idx]);
  }
  return names;
}

// TEMPORARY PLACEHOLDER — AI-generated photos for internal NIFS review only.
// NOT for production. NIFS will supply real student photos to replace these
// before deploy; NIFS does not want AI images in the live site. See
// public/images/placements/students/README.md for the asset's own usage
// guidance (which also says not to attach fabricated names/salaries/claims —
// noted here since the current placement cards do exactly that, by design,
// per Teja's explicit instruction for this internal draft phase).
export const STUDENT_PASSPORT_POOL: PoolItem[] = [
  { category: "student-placement", src: "/images/placements/students/student-01.webp" },
  { category: "student-placement", src: "/images/placements/students/student-02.webp" },
  { category: "student-placement", src: "/images/placements/students/student-03.webp" },
  { category: "student-placement", src: "/images/placements/students/student-04.webp" },
  { category: "student-placement", src: "/images/placements/students/student-05.webp" },
  { category: "student-placement", src: "/images/placements/students/student-06.webp" },
  { category: "student-placement", src: "/images/placements/students/student-07.webp" },
  { category: "student-placement", src: "/images/placements/students/student-08.webp" },
  { category: "student-placement", src: "/images/placements/students/student-09.webp" },
  { category: "student-placement", src: "/images/placements/students/student-10.webp" },
  { category: "student-placement", src: "/images/placements/students/student-11.webp" },
  { category: "student-placement", src: "/images/placements/students/student-12.webp" },
  { category: "student-placement", src: "/images/placements/students/student-13.webp" },
  { category: "student-placement", src: "/images/placements/students/student-14.webp" },
  { category: "student-placement", src: "/images/placements/students/student-15.webp" },
  { category: "student-placement", src: "/images/placements/students/student-16.webp" },
  { category: "student-placement", src: "/images/placements/students/student-17.webp" },
  { category: "student-placement", src: "/images/placements/students/student-18.webp" },
  { category: "student-placement", src: "/images/placements/students/student-19.webp" },
  { category: "student-placement", src: "/images/placements/students/student-20.webp" },
  { category: "student-placement", src: "/images/placements/students/student-21.webp" },
  { category: "student-placement", src: "/images/placements/students/student-22.webp" },
  { category: "student-placement", src: "/images/placements/students/student-23.webp" },
  { category: "student-placement", src: "/images/placements/students/student-24.webp" },
  { category: "student-placement", src: "/images/placements/students/student-25.webp" },
  { category: "student-placement", src: "/images/placements/students/student-26.webp" },
  { category: "student-placement", src: "/images/placements/students/student-27.webp" },
  { category: "student-placement", src: "/images/placements/students/student-28.webp" },
  { category: "student-placement", src: "/images/placements/students/student-29.webp" },
  { category: "student-placement", src: "/images/placements/students/student-30.webp" },
  { category: "student-placement", src: "/images/placements/students/student-31.webp" },
  { category: "student-placement", src: "/images/placements/students/student-32.webp" },
  { category: "student-placement", src: "/images/placements/students/student-33.webp" },
  { category: "student-placement", src: "/images/placements/students/student-34.webp" },
  { category: "student-placement", src: "/images/placements/students/student-35.webp" },
  { category: "student-placement", src: "/images/placements/students/student-36.webp" },
];

/**
 * Returns 4 strictly non-overlapping student passport portraits for the given center,
 * segregated by state and city so no visitor sees identical faces across centers in the same state.
 */
export function getStudentPassportPhotos(citySlug: string): PoolItem[] {
  const normalizedSlug = slugifyCity(citySlug);
  const activeCenters = centers.filter((c) => !c.isInformationCentre);
  const centerObj =
    activeCenters.find((c) => slugifyCity(c.city) === normalizedSlug) ||
    centers.find((c) => slugifyCity(c.city) === normalizedSlug);

  const stateName = centerObj?.state || "Andhra Pradesh";
  const stateList = Array.from(new Set(activeCenters.map((c) => c.state)));
  const stateIndex = Math.max(0, stateList.indexOf(stateName));
  const citiesInState = activeCenters.filter((c) => c.state === stateName);
  const cityInStateIndex = Math.max(
    0,
    citiesInState.findIndex((c) => slugifyCity(c.city) === normalizedSlug)
  );

  const photos: PoolItem[] = [];
  const base = (stateIndex * 11 + cityInStateIndex * 4) % STUDENT_PASSPORT_POOL.length;
  for (let i = 0; i < 4; i++) {
    const idx = (base + i) % STUDENT_PASSPORT_POOL.length;
    photos.push(STUDENT_PASSPORT_POOL[idx]);
  }
  return photos;
}

/**
 * Deterministically assigns 4 unique training yard photos and 4 unique placement photos
 * per city with strict state-level segregation to prevent cross-center photo collisions.
 */
export function getCenterGallery(citySlug: string): CenterGallery {
  const normalizedSlug = slugifyCity(citySlug);

  // First check among active centers (54 centers with physical addresses)
  const activeCenters = centers.filter((c) => !c.isInformationCentre);
  const centerObj =
    activeCenters.find((c) => slugifyCity(c.city) === normalizedSlug) ||
    centers.find((c) => slugifyCity(c.city) === normalizedSlug);

  const stateName = centerObj?.state || "Andhra Pradesh";
  const stateList = Array.from(new Set(activeCenters.map((c) => c.state)));
  const stateIndex = Math.max(0, stateList.indexOf(stateName));
  const citiesInState = activeCenters.filter((c) => c.state === stateName);
  const cityInStateIndex = Math.max(
    0,
    citiesInState.findIndex((c) => slugifyCity(c.city) === normalizedSlug)
  );

  let globalCityIndex = activeCenters.findIndex(
    (c) => slugifyCity(c.city) === normalizedSlug
  );
  if (globalCityIndex === -1) {
    globalCityIndex = centers.findIndex(
      (c) => slugifyCity(c.city) === normalizedSlug
    );
  }
  if (globalCityIndex === -1) {
    globalCityIndex = simpleHash(normalizedSlug) % activeCenters.length;
  }

  // 4 Training Yard Photos from the 94-photo training pool (state-spaced)
  const trainingYardPhotos: PracticalYardPhoto[] = [];
  const yardBase = (stateIndex * 7 + cityInStateIndex * 4) % TRAINING_YARD_POOL.length;
  for (let i = 0; i < 4; i++) {
    const poolIdx = (yardBase + i) % TRAINING_YARD_POOL.length;
    const item = TRAINING_YARD_POOL[poolIdx];
    const variants = CATEGORY_CAPTIONS[item.category] || [
      {
        title: "Practical Fire & Safety Training",
        subtitle: "Comprehensive industrial drills and live hands-on simulations",
        tag: "Safety Training",
        stat: "Live Drill",
      },
    ];
    const variantIdx = (globalCityIndex + i) % variants.length;
    const caption = variants[variantIdx];

    trainingYardPhotos.push({
      src: item.src,
      category: item.category,
      title: caption.title,
      subtitle: caption.subtitle,
      tag: caption.tag,
      stat: caption.stat,
    });
  }

  // 4 Placement Proof Photos — AI-generated placeholder portraits (STUDENT_PASSPORT_POOL).
  // Explicit, informed, repeated decision by the site owner (Teja) on 2026-09-10 to run
  // these live rather than NIFS's real group/event photos, after being told twice this
  // means AI-generated faces attached to fabricated names/salaries on production. See
  // STUDENT_PASSPORT_POOL's own comment above and STATUS.md for the full context —
  // NIFS itself does not want AI images long-term, so this should be revisited once
  // NIFS supplies real individual student photos.
  const placementPhotos: PlacementPhoto[] = [];
  const placementBase = (stateIndex * 11 + cityInStateIndex * 4) % STUDENT_PASSPORT_POOL.length;
  for (let i = 0; i < 4; i++) {
    const poolIdx = (placementBase + i) % STUDENT_PASSPORT_POOL.length;
    const item = STUDENT_PASSPORT_POOL[poolIdx];

    placementPhotos.push({
      src: item.src,
      category: item.category,
      alt: "NIFS Placed Graduate",
    });
  }

  return {
    trainingYardPhotos,
    placementPhotos,
    placementNames: getPlacementNames(stateIndex, cityInStateIndex),
  };
}
