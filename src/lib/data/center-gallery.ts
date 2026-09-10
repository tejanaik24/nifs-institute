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
      "title": "SCBA Smoke Chamber & Rescue Drill",
      "subtitle": "Zero-visibility breathing apparatus search, rescue & casualty extraction",
      "tag": "Toxic Gas Entry",
      "stat": "Confined Space"
    },
    {
      "title": "High-Rise Scaffolding & Rope Access",
      "subtitle": "Industrial height safety, fall arrest harness & casualty lowering drills",
      "tag": "Height Safety",
      "stat": "15m Scaffolding"
    },
    {
      "title": "Chemical Foam Fire Attack Simulation",
      "subtitle": "Class B solvent & volatile liquid fuel blaze suppression operations",
      "tag": "Hazmat Fire",
      "stat": "Multi-Fuel Pits"
    },
    {
      "title": "Industrial Fire Hydrant & Pump Relay",
      "subtitle": "Multi-line industrial hose deployment and water cannon operations",
      "tag": "Hydraulics",
      "stat": "10-Bar Pressure"
    }
  ],
  "industrial-visit-gallery": [
    {
      "title": "Industrial Plant Safety Walkthrough",
      "subtitle": "Comprehensive hazard identification and EHS audit at live manufacturing plants",
      "tag": "Industrial Visit",
      "stat": "Live Plant"
    },
    {
      "title": "Heavy Engineering Site Inspection",
      "subtitle": "On-site safety machinery assessment, lockout-tagout (LOTO) protocols",
      "tag": "Industrial Visit",
      "stat": "EHS Inspection"
    },
    {
      "title": "Process Safety & Refineries Tour",
      "subtitle": "Hazardous area zoning, gas detection review and chemical safety systems",
      "tag": "Industrial Visit",
      "stat": "Process Safety"
    },
    {
      "title": "Manufacturing Emergency Systems Review",
      "subtitle": "Assembly line safety systems, egress mapping and automated deluge systems",
      "tag": "Industrial Visit",
      "stat": "Field Study"
    }
  ],
  "corporate-yard-gallery": [
    {
      "title": "Corporate HSE Simulation Drill",
      "subtitle": "Enterprise-grade industrial safety drills and live chemical containment",
      "tag": "Corporate Yard",
      "stat": "Industry Standard"
    },
    {
      "title": "Advanced Tactical Fire Ground Drills",
      "subtitle": "Multi-tier tactical firefighting and emergency incident command simulations",
      "tag": "Corporate Yard",
      "stat": "Tactical Drill"
    },
    {
      "title": "Emergency Response Team (ERT) Exercises",
      "subtitle": "Rapid disaster response, victim triage and hazardous leak containment",
      "tag": "Corporate Yard",
      "stat": "ERT Simulation"
    },
    {
      "title": "Heavy Industrial Fire Control Operations",
      "subtitle": "Industrial plant apparatus, booster pump operations and foam monitor handling",
      "tag": "Corporate Yard",
      "stat": "Heavy Rig"
    }
  ],
  "in-house-training": [
    {
      "title": "Hands-On Safety Equipment Workshop",
      "subtitle": "Practical operation of fire extinguishers, gas detectors and personal PPE",
      "tag": "In-House Training",
      "stat": "Practical Lab"
    },
    {
      "title": "Industrial First Aid & CPR Life Support",
      "subtitle": "Emergency trauma management, AED defibrillator usage and casualty stabilization",
      "tag": "In-House Training",
      "stat": "Life Support"
    },
    {
      "title": "Confined Space Entry & Gas Monitoring",
      "subtitle": "Multi-gas detector calibration, harness rigging and permit-to-work protocols",
      "tag": "In-House Training",
      "stat": "Safety Protocol"
    },
    {
      "title": "Electrical Safety & Fire Prevention Lab",
      "subtitle": "Arc flash precautions, circuit hazard detection and preventive maintenance",
      "tag": "In-House Training",
      "stat": "Lab Practical"
    }
  ],
  "infrastructure": [
    {
      "title": "Modern Fire & Safety Training Center",
      "subtitle": "State-of-the-art multimedia lecture halls and digital risk modeling simulators",
      "tag": "Infrastructure",
      "stat": "Smart Campus"
    },
    {
      "title": "Advanced Safety Equipment Repository",
      "subtitle": "Extensive inventory of SCBA sets, gas analyzers, and certified rescue gear",
      "tag": "Infrastructure",
      "stat": "Full Inventory"
    },
    {
      "title": "Industrial Safety Demonstration Hall",
      "subtitle": "Cut-section working models of valves, hydrants, sprinklers and alarm panels",
      "tag": "Infrastructure",
      "stat": "Demo Lab"
    },
    {
      "title": "Hazardous Materials Simulation Lab",
      "subtitle": "Chemical reaction safety simulators, SDS library and neutralization kits",
      "tag": "Infrastructure",
      "stat": "Hazmat Lab"
    }
  ],
  "study-tours-gallery": [
    {
      "title": "National Safety Infrastructure Tour",
      "subtitle": "Field exposure to port safety, maritime fire protection and heavy cargo terminals",
      "tag": "Study Tour",
      "stat": "Field Exposure"
    },
    {
      "title": "Major Power & Energy Complex Tour",
      "subtitle": "Study of high-hazard safety controls at major power plants and grid substations",
      "tag": "Study Tour",
      "stat": "Power & Energy"
    },
    {
      "title": "Logistics Hub & Warehouse Safety Audit",
      "subtitle": "Automated racking fire protection, loading dock safety and forklift risk assessment",
      "tag": "Study Tour",
      "stat": "Logistics Hub"
    },
    {
      "title": "Infrastructure & Tunnel Safety Exposure",
      "subtitle": "Emergency ventilation systems, egress tunnels and passive fire containment",
      "tag": "Study Tour",
      "stat": "Infrastructure"
    }
  ],
  "campus-drive": [
    {
      "title": "Annual Campus Recruitment Drive",
      "subtitle": "Top multinational infrastructure & manufacturing firms hiring NIFS graduates",
      "tag": "Campus Drive",
      "stat": "100% Placement"
    },
    {
      "title": "Core EHS Corporate Placement Session",
      "subtitle": "Direct technical interviews and on-the-spot offer letter distributions",
      "tag": "Campus Drive",
      "stat": "Direct Hiring"
    },
    {
      "title": "Industrial Safety Talent Acquisition",
      "subtitle": "Fortune 500 safety recruiters conducting multi-round selection",
      "tag": "Campus Drive",
      "stat": "Top Recruiters"
    },
    {
      "title": "International HSE Placement Drive",
      "subtitle": "Overseas EPC contractors and Gulf facilities recruiting certified officers",
      "tag": "Campus Drive",
      "stat": "Gulf Hiring"
    }
  ],
  "graduation-celebration": [
    {
      "title": "NIFS Convocation & Certification Day",
      "subtitle": "Awarding government-recognized safety diplomas and academic honors",
      "tag": "Graduation",
      "stat": "Alumni Network"
    },
    {
      "title": "Safety Officer Pinning Ceremony",
      "subtitle": "Induction of certified safety professionals into the industrial workforce",
      "tag": "Graduation",
      "stat": "Certified Batch"
    },
    {
      "title": "Annual Graduation & Achievement Meet",
      "subtitle": "Celebrating successful course completions and top batch rankers",
      "tag": "Graduation",
      "stat": "Convocation"
    },
    {
      "title": "EHS Professional Batch Felicitation",
      "subtitle": "Honoring graduates transitioning into prestigious industrial roles",
      "tag": "Graduation",
      "stat": "Batch Honors"
    }
  ],
  "achievements": [
    {
      "title": "National Fire & Safety Excellence Award",
      "subtitle": "Recognition for outstanding industrial training standards and placement record",
      "tag": "Achievement",
      "stat": "National Award"
    },
    {
      "title": "Institutional Quality & Training Accolade",
      "subtitle": "Ranked among premier occupational safety training institutions",
      "tag": "Achievement",
      "stat": "Premier Rank"
    },
    {
      "title": "Safety Excellence & Innovation Trophy",
      "subtitle": "Recognized for high-impact practical safety curriculum and lab facilities",
      "tag": "Achievement",
      "stat": "Excellence"
    },
    {
      "title": "Government Recognition & Industry Milestone",
      "subtitle": "Celebration of landmark safety education milestones across India",
      "tag": "Achievement",
      "stat": "Milestone"
    }
  ],
  "recognition-gallery": [
    {
      "title": "Industry Association Accreditations",
      "subtitle": "Formal recognition by apex industrial safety councils and associations",
      "tag": "Recognition",
      "stat": "Accredited"
    },
    {
      "title": "Statutory & Academic Affiliations",
      "subtitle": "Government board approvals and NSDC skill mission partnerships",
      "tag": "Recognition",
      "stat": "Govt Approved"
    },
    {
      "title": "Corporate Safety Partner Memento",
      "subtitle": "Presented by industry leaders for excellence in safety manpower training",
      "tag": "Recognition",
      "stat": "Partner Award"
    },
    {
      "title": "National Skill Development Commendation",
      "subtitle": "Commended for delivering high-employability vocational safety training",
      "tag": "Recognition",
      "stat": "Skill India"
    }
  ],
  "events": [
    {
      "title": "National Safety Day Seminar & Expo",
      "subtitle": "Industry experts and students participating in live safety demonstrations",
      "tag": "Events",
      "stat": "Safety Day"
    },
    {
      "title": "Annual Fire Service Week Exhibition",
      "subtitle": "Community fire awareness campaigns and modern equipment showcases",
      "tag": "Events",
      "stat": "Fire Week"
    },
    {
      "title": "Occupational Health & Safety Symposium",
      "subtitle": "Workshops on emerging industrial hazards and ISO 45001 standards",
      "tag": "Events",
      "stat": "Symposium"
    },
    {
      "title": "Inter-Institute Safety Competition",
      "subtitle": "Students competing in emergency drills, hazard hunts and rescue speed tests",
      "tag": "Events",
      "stat": "Safety Contest"
    }
  ],
  "guest-lectures-gallery": [
    {
      "title": "Chief Safety Officer Masterclass",
      "subtitle": "Interactive knowledge session by senior director from Fortune 500 plant",
      "tag": "Guest Lecture",
      "stat": "Expert Session"
    },
    {
      "title": "Industrial Hazmat Management Lecture",
      "subtitle": "Specialized insights into chemical process hazards and refinery safety",
      "tag": "Guest Lecture",
      "stat": "Industry Expert"
    },
    {
      "title": "International HSE Standards Workshop",
      "subtitle": "Global safety regulations, OSHA compliance and Gulf job readiness",
      "tag": "Guest Lecture",
      "stat": "Global Safety"
    },
    {
      "title": "Disaster Management & Fire Tech Talk",
      "subtitle": "Session on modern drone safety monitoring and automated deluge systems",
      "tag": "Guest Lecture",
      "stat": "Fire Tech"
    }
  ]
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
