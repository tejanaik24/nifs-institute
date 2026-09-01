export type Center = {
  city: string;
  state: string;
  isHQ?: boolean;
  /** Phone-only listing (no public street address) — "INFORMATION CENTRE"
   * rows in NIFS's centres sheet. */
  isInformationCentre?: boolean;
  /** Position as a percentage of the map's cropped content box (the actual
   * India land-mass bounding box within india-map-v2.png, NOT the full
   * canvas — the source PNG has ~23%/9%/20%/9% of transparent padding on
   * L/T/R/B baked in, so IndiaMap crops to this box via CSS transform to
   * fill the panel with less dead space). Calibrated by pixel-detecting
   * known landmarks (Kashmir tip, Kanyakumari, Kutch peninsula, Arunachal
   * tip), mapping each city's real lat/long onto that linear scale, then
   * remapping into the cropped-box coordinate space (see
   * IndiaMap.tsx's CROP_BOX constant for the crop math) — single source of
   * truth, used by both the map dots and any list/detail view. */
  x: number;
  y: number;
  address?: string;
  /** Display-format phone numbers straight from NIFS's centres sheet. */
  phones?: string[];
};

export const centers: Center[] = [
  // ===== ANDHRA PRADESH =====
  {
    city: "Visakhapatnam",
    state: "Andhra Pradesh",
    isHQ: true,
    x: 52.45,
    y: 60.73,
    address:
      "Door No. 47-10-15, 2nd Lane, Dwarakanagar, AG Avenue Building, 3rd Floor, Visakhapatnam, Andhra Pradesh – 530016",
    phones: ["8374340999", "9246624868", "0891-2712722", "0891-2551699"],
  },
  {
    city: "Guntur",
    state: "Andhra Pradesh",
    x: 47.36,
    y: 64.75,
    address:
      "Dept. of Fire and Industrial Safety, Acharya Nagarjuna University, Guntur – 522510, Andhra Pradesh",
    phones: ["7842911536", "8985912834", "9494512833"],
  },
  {
    city: "Vijayawada",
    state: "Andhra Pradesh",
    x: 47.75,
    y: 64.17,
    address:
      "Door No. 26-9-38, 2nd Floor, Yerneni Mansion, Gandhinagar, Vijayawada – 520003, Andhra Pradesh",
    phones: ["9550539202", "0891-9198150"],
  },

  // ===== TELANGANA =====
  {
    city: "Hyderabad",
    state: "Telangana",
    x: 43.85,
    y: 62.4,
    address:
      "H.No. 7-1-619/A, Flat No. 301, Santhi Nilayam, SAP Street, Gayathri Nagar, Ameerpet, Hyderabad, Telangana – 500016",
    phones: ["9246616282", "8374340999"],
  },

  // ===== ASSAM =====
  {
    city: "Guwahati",
    state: "Assam",
    x: 68.03,
    y: 36.1,
    address:
      "H.No. 184, 2nd Floor, Chandmari Colony, Guwahati – 781003, Assam (Near HDFC Bank / Alankar Hotel, opposite XYKA Restaurant)",
    phones: ["8486331244", "9085365653", "8133937344"],
  },

  // ===== BIHAR =====
  {
    city: "Patna",
    state: "Bihar",
    x: 55.96,
    y: 37.71,
    address:
      "C/o Wasisth Educational and Charitable Trust, 3rd Floor, Room No. 35, Ashiyana Galaxy, Exhibition Road, Near Gandhi Maidan, Patna – 01, Bihar",
    phones: ["9204615085", "7209310635", "9835494385"],
  },
  {
    city: "Muzaffarpur",
    state: "Bihar",
    isInformationCentre: true,
    x: 56.43,
    y: 36.18,
    phones: ["9204615085", "7209310635", "9835494385"],
  },
  {
    city: "Siban",
    state: "Bihar",
    x: 54.54,
    y: 35.89,
    address: "Ramrajya More, Santi Nagar, Near Railway Station, Siban, Bihar",
    phones: ["9889922888", "7562848697"],
  },

  // ===== CHHATTISGARH =====
  {
    city: "Raipur",
    state: "Chhattisgarh",
    x: 49.55,
    y: 50.35,
    address:
      "Shop No. 4 & 5, RIO Complex, Opposite Fruit Market, Lalpur, Raipur, Chhattisgarh – 492001",
    phones: ["7509333401", "8883332850"],
  },

  // ===== DELHI NCR =====
  {
    city: "Badarpur (Delhi South)",
    state: "Delhi NCR",
    x: 41.63,
    y: 29.23,
    address:
      "Office No. 31, 3rd Floor, Chaudhary Dharamveer Market, Opp. Badarpur Metro Station, Badarpur, New Delhi",
    phones: ["9958032663", "9555766661"],
  },
  {
    city: "Lakshminagar (Delhi East)",
    state: "Delhi NCR",
    x: 41.59,
    y: 28.87,
    address:
      "U-75, 1st Floor, Kalra Complex, Near Laxminagar Metro Station, Gate-2, Delhi – 110092",
    phones: ["9873864874", "9899288943", "9560568074"],
  },
  {
    city: "Gurgaon",
    state: "Delhi NCR",
    x: 41.13,
    y: 29.36,
    address:
      "Sector 5, Palm Vihar Road (Near HP Petrol Pump, Dataram Mandir), Phase II, Ashok Vihar, Gurgaon (Haryana) – 122001",
    phones: ["9910409821", "9310339821"],
  },
  {
    city: "Pataudi",
    state: "Delhi NCR",
    x: 40.68,
    y: 29.76,
    address:
      "C/o Kitty Garden Senior Secondary Public School, Palam–Gurgaon Road, Near Hanuman Mandir, Vill. Dundaheri, Dist. Gurgaon, Haryana – 122016",
    phones: ["9313234145", "9991169982"],
  },

  // ===== GOA =====
  {
    city: "Goa",
    state: "Goa",
    isInformationCentre: true,
    x: 35.82,
    y: 67.69,
    phones: ["8374340999", "9246624868"],
  },

  // ===== GUJARAT =====
  {
    city: "Surat",
    state: "Gujarat",
    x: 33.45,
    y: 50.59,
    address:
      "304, 3rd Floor, Rajhans Stadium Plaza, Near L.P. Savani School, Palanpur, Gauravpath, Surat – 395009, Gujarat",
    phones: ["9277708217", "9924669967"],
  },
  {
    city: "Ahmedabad",
    state: "Gujarat",
    x: 32.98,
    y: 45.2,
    address:
      "425, Kalasagar Shopping Hub, Near Satadhar Cross Road, Front of Saibaba Temple, Ghatlodia, Ahmedabad – 380061, Gujarat",
    phones: ["7940036356", "9825079730"],
  },

  // ===== HARYANA & PUNJAB =====
  {
    city: "Chandigarh",
    state: "Haryana & Punjab",
    x: 40.68,
    y: 22.74,
    address:
      "SCO-21, 2nd & 3rd Floor, Near Maharashtra Bank, AKS Colony, Patiala Road, Zirakpur, S.A.S. Nagar (Mohali), Punjab – 140603",
    phones: ["9023033687", "6230433687"],
  },
  {
    city: "Hoshiarpur",
    state: "Haryana & Punjab",
    x: 39.09,
    y: 20.47,
    address:
      "1st Floor, Puri Tower, Near Govt. College Chowk, Phagwara Road, Hoshiarpur – 146001",
    phones: ["9465916685", "01882-520100", "8427791818"],
  },
  {
    city: "Jalandhar",
    state: "Haryana & Punjab",
    x: 38.47,
    y: 21.02,
    address:
      "GK Tower, 3rd Floor, BSF Colony Market, Opp. HMV College, Jalandhar – 144004",
    phones: ["9023133687", "7087882925"],
  },
  {
    city: "Nangal",
    state: "Haryana & Punjab",
    x: 39.94,
    y: 20.89,
    address:
      "Khwaja Peer Road, Near Ashoka Gas Agency, Raj Nagar, Nangal Dam – 140124",
    phones: ["8427791818", "8427791518"],
  },
  {
    city: "Amritsar",
    state: "Haryana & Punjab",
    x: 37.19,
    y: 20.12,
    address:
      "SCO 55-F, Second Floor, Near Webberz, City Centre, Main Bus Stand, Amritsar (Punjab) – 143001",
    phones: ["7973874720", "9115955730", "9115955731"],
  },
  {
    city: "Chandigarh - 2",
    state: "Haryana & Punjab",
    x: 40.77,
    y: 22.89,
    address:
      "SCF-9, Kalgidhar Enclave, Furniture Market, Opp. Wedding Resort, Baltana, Zirakpur, Punjab",
    phones: ["7973874720", "9814200000"],
  },

  // ===== HIMACHAL PRADESH =====
  {
    city: "Hamirpur",
    state: "Himachal Pradesh",
    x: 40.2,
    y: 19.97,
    address:
      "3rd Floor, Roshan Complex, Gandhi Chowk, Hamirpur Main Bazar, Hamirpur, Himachal Pradesh – 177001",
    phones: ["6230433687", "9023033687"],
  },

  // ===== JHARKHAND =====
  {
    city: "Tata Jamshedpur",
    state: "Jharkhand",
    x: 57.91,
    y: 45.83,
    address:
      "H-42, First Floor, New Development Area, Near A.B.M. College, PO Golmuri, Jamshedpur – 831003",
    phones: ["9234500272", "8235556556", "9471768203"],
  },
  {
    city: "Ranchi",
    state: "Jharkhand",
    x: 56.28,
    y: 44.26,
    address:
      "C/o Wasisth Educational and Charitable Trust, 2nd Floor, Room No. 106, City Centre Building, Club Road, Near Gossner College, Sujata Chowk, Ranchi – 834001",
    phones: ["9263665699", "9835704885", "9204615085"],
  },
  {
    city: "Bokaro",
    state: "Jharkhand",
    x: 57.82,
    y: 43.31,
    address:
      "C/o Wasisth Educational and Charitable Trust, Flat No. 439 'A', Co-operative Colony, Near Police Line, Bokaro Steel City – 827001",
    phones: ["8102873885", "9234034435", "9204615085"],
  },

  // ===== KARNATAKA =====
  {
    city: "Mangalore",
    state: "Karnataka",
    x: 37.16,
    y: 74.63,
    address:
      "C/o Hindustan Institute of Safety and Multi Learning, Sarvamangala Building, 1st Floor, Valencia Circle, Kankanady Post, Mangalore – 575002",
    phones: ["9980256949", "9481759563"],
  },
  {
    city: "Bangalore",
    state: "Karnataka",
    x: 42.17,
    y: 74.46,
    address:
      "Brundavan Homes, House No. 1, 1st Floor, 103 E-Cross, Horamavu Agara, Hennur Gardens, Bangalore – 560043, Karnataka",
    phones: ["9986425655", "9632213633"],
  },

  // ===== KERALA =====
  {
    city: "Kollam",
    state: "Kerala",
    isInformationCentre: true,
    x: 40.37,
    y: 86.34,
    phones: ["9567362262", "0487-2381262", "9995431240"],
  },
  {
    city: "Kochi",
    state: "Kerala",
    isInformationCentre: true,
    x: 39.74,
    y: 83.32,
    phones: ["9567362262", "0487-2381262", "9995431240"],
  },
  {
    city: "Thrissur",
    state: "Kerala",
    x: 39.64,
    y: 81.58,
    address:
      "C/o Safety Careers Institute, Room No. 28, II Floor, Lakshmi Towers, Opp. Parayil Agencies, Poothole Road, Thrissur – 680004",
    phones: ["9567362262", "0487-2381262", "9995431240"],
  },
  {
    city: "Trivandrum",
    state: "Kerala",
    isInformationCentre: true,
    x: 40.96,
    y: 87.42,
    phones: ["9567362262", "0487-2381262", "9995431240"],
  },
  {
    city: "Calicut",
    state: "Kerala",
    x: 38.85,
    y: 79.45,
    address:
      "2nd Floor, Vandhana Building, Behind Kannankandy, Mavoor Road, Calicut – 673004",
    phones: ["9567362262", "9995431240"],
  },

  // ===== MAHARASHTRA =====
  {
    city: "Thane",
    state: "Maharashtra",
    x: 33.73,
    y: 56.38,
    address:
      "Krishna Plaza A, 4th Floor, Office No. 404, Beside Krishna Sweets, Opp. CKP Bank Ltd., Shivaji Path, Near Thane Railway Station (West), Thane – 400601",
    phones: ["9702978649", "7602777786"],
  },
  {
    city: "Nagpur",
    state: "Maharashtra",
    x: 44.9,
    y: 50.66,
    address: "#152, Pardi, Post: Walni, Kalmeshwar Road, Nagpur – 441501",
    phones: ["9545559908", "9545559909", "9923855999"],
  },
  {
    city: "Borivali-W (Mumbai)",
    state: "Maharashtra",
    x: 33.51,
    y: 56.22,
    address:
      "Star Plaza Tower, 17th Floor, Office No. 1704, Opp. Borivali Station East, Above Burger King, MM Mithaiwala, Borivali East – 400066",
    phones: ["9702978649", "7602777786"],
  },
  {
    city: "Vashi (Navi Mumbai)",
    state: "Maharashtra",
    x: 33.76,
    y: 56.69,
    address:
      "Office No. F29, 1st Floor, Neno Wing, Haware Fantasia Business Park, Near Inorbit Mall, Vashi (W), Navi Mumbai",
    phones: ["022-40136161", "9702978649", "7602777786"],
  },

  // ===== ODISHA =====
  {
    city: "Bhubaneswar",
    state: "Odisha",
    x: 57.22,
    y: 53.13,
    address:
      "Room No. 7, 3rd Floor, B.M.C. Panchadeep Market Complex, Unit 4, Bhubaneswar – 751001, Dist. Khurda",
    phones: ["9238150809", "9776601122"],
  },
  {
    city: "Rourkela",
    state: "Odisha",
    x: 55.44,
    y: 47.41,
    address:
      "Ex-Primary School, OSRTC, Sector-2, Rourkela – 769006, Dist. Sundargarh",
    phones: ["9238150809", "9776601122"],
  },
  {
    city: "Berhampur",
    state: "Odisha",
    x: 55.34,
    y: 55.99,
    address:
      "Gajapati Nagar, 2nd Lane, Near Safal Restaurant, Berhampur – 760010 (Ganjam)",
    phones: ["8763298879", "9938232868"],
  },

  // ===== PUDUCHERRY =====
  {
    city: "Pondicherry",
    state: "Puducherry",
    x: 46.22,
    y: 77.46,
    address:
      "109, Villianur Main Road, Reddiarpalayam (State Bank of India upstairs), Pondicherry – 605010",
    phones: ["9043445500", "8525017060"],
  },

  // ===== RAJASTHAN =====
  {
    city: "Kota",
    state: "Rajasthan",
    x: 39.0,
    y: 38.81,
    address:
      "777, Shastri Nagar Main Road, Dadabari Main Road, Near PNB Bank, Kota – 324009",
    phones: ["9610281023", "0744-6451645"],
  },
  {
    city: "Jaipur",
    state: "Rajasthan",
    isInformationCentre: true,
    x: 38.86,
    y: 33.87,
    phones: ["9958032663", "9555766661"],
  },
  {
    city: "Chittorgarh",
    state: "Rajasthan",
    x: 36.74,
    y: 39.76,
    address:
      "70 Kidwai Nagar, Behind Roadways Bus Stand, Chittorgarh, Rajasthan – 312001",
    phones: ["9460707101", "9782480888"],
  },
  {
    city: "Jhalawar",
    state: "Rajasthan",
    x: 39.54,
    y: 40.61,
    address:
      "C/o Siddharth Educational Group, Mega Highway, Khanpur Road, Munderi, Jhalawar – 326001, Rajasthan",
    phones: ["9166999936", "9166999937"],
  },

  // ===== TAMIL NADU =====
  {
    city: "Chennai",
    state: "Tamil Nadu",
    x: 47.06,
    y: 74.14,
    address:
      "New No. 483, Old No. 283, P.H. Road, Aminjikarai, Chennai – 600029",
    phones: ["9283762538", "8015097231"],
  },
  {
    city: "Coimbatore",
    state: "Tamil Nadu",
    x: 41.0,
    y: 80.16,
    address:
      "C/o Coimbatore Industrial FIRE HSE Safety Vocational Training College, 244, 4th Floor, Sow Ma Business Complex, Sathy Main Road, Gandhipuram (Near Signal), Coimbatore – 641012",
    phones: ["9842208221", "9043000940"],
  },
  {
    city: "Nagarcoil",
    state: "Tamil Nadu",
    isInformationCentre: true,
    x: 41.83,
    y: 88.41,
    phones: ["9842208221", "9043000940"],
  },
  {
    city: "Salem",
    state: "Tamil Nadu",
    isInformationCentre: true,
    x: 43.17,
    y: 78.27,
    phones: ["9842208221", "9043000940"],
  },
  {
    city: "Tambaram",
    state: "Tamil Nadu",
    isInformationCentre: true,
    x: 46.8,
    y: 74.6,
    phones: ["9283762538", "8015097231"],
  },
  {
    city: "Madurai",
    state: "Tamil Nadu",
    x: 43.13,
    y: 83.34,
    address:
      "No. 15, Chinna Chokkikulam, Vishal Mall Road, Opp. Malligai Sweets, Madurai – 625002",
    phones: ["9894018952", "0452-4368952", "9345987788"],
  },
  {
    city: "Cuddalore",
    state: "Tamil Nadu",
    x: 46.15,
    y: 78.03,
    address:
      "No. 8, Imperial Road, Opp. EB Colony, Near Diversion Road, Sellankuppam, Cuddalore – 607003",
    phones: ["9487617962", "9677746733"],
  },
  {
    city: "Virungabakkam",
    state: "Tamil Nadu",
    isInformationCentre: true,
    x: 46.91,
    y: 74.24,
    phones: ["8015097231", "9283762538"],
  },
  {
    city: "Hosur",
    state: "Tamil Nadu",
    isInformationCentre: true,
    x: 42.59,
    y: 75.14,
    phones: ["8015097231", "9283762538"],
  },
  {
    city: "Trichy",
    state: "Tamil Nadu",
    x: 44.2,
    y: 80.82,
    address:
      "C/o School of Safety, No. 6E, Rishivanam, Near Bishop Heber College, Vayalur Road, Puthur, Trichy – 620017",
    phones: ["9842208221", "9043000940"],
  },

  // ===== TELANGANA =====
  {
    city: "Hyderabad",
    state: "Telangana",
    x: 43.8,
    y: 61.61,
    address:
      "H.No. 7-1-619/A, Flat No. 301, Santhi Nilayam, SAP Street, Gayathri Nagar, Ameerpet, Hyderabad, Telangana – 500016",
    phones: ["9246616282", "040-23319353"],
  },

  // ===== UTTARAKHAND =====
  {
    city: "Dehradun",
    state: "Uttarakhand",
    x: 42.97,
    y: 23.95,
    address:
      "IInd Floor, Shimla Bye Pass, GMS Road, Near St. Jude's School, Dehradun – 248001",
    phones: ["0135-2645802", "9897990861", "9023033687"],
  },
  {
    city: "Haridwar",
    state: "Uttarakhand",
    isInformationCentre: true,
    x: 43.21,
    y: 25.03,
    phones: ["6230433687", "9023033687"],
  },

  // ===== UTTAR PRADESH =====
  {
    city: "Gorakhpur",
    state: "Uttar Pradesh",
    x: 52.74,
    y: 34.31,
    address:
      "70D, Kamleshpuram, Near MMM Engg. College, Post Khorabar, Gorakhpur, Uttar Pradesh – 273010",
    phones: ["9506371110", "9721708222", "9721709222"],
  },
  {
    city: "Lucknow",
    state: "Uttar Pradesh",
    x: 48.3,
    y: 34.06,
    address:
      "Basement II, Skylark Building, Newal Kishore Road, Hazratganj, Lucknow – 226001",
    phones: ["9956999767", "0522-4113359", "9956999766"],
  },
  {
    city: "Allahabad",
    state: "Uttar Pradesh",
    x: 49.94,
    y: 38.17,
    address:
      "B-741, G.T.B. Nagar, Kareli, Near Bank of Baroda (Above Stop & Shop Super Store), Prayagraj, Allahabad – 211016",
    phones: ["7007524634", "9169103413", "7081422668"],
  },
  {
    city: "Kanpur",
    state: "Uttar Pradesh",
    x: 47.17,
    y: 35.21,
    address:
      "17/NM/114, 1st Floor, Dr. Jha Lane, Avon Market, Kakadev, Kanpur – 208025",
    phones: ["8881099904", "8881099924", "7234999405"],
  },
  {
    city: "Varanasi",
    state: "Uttar Pradesh",
    isInformationCentre: true,
    x: 52.01,
    y: 38.51,
    phones: ["8881099904", "8881099924", "7234999405"],
  },
  {
    city: "Agra",
    state: "Uttar Pradesh",
    isInformationCentre: true,
    x: 42.92,
    y: 33.1,
    phones: ["9958032663"],
  },
  {
    city: "Noida",
    state: "Uttar Pradesh",
    isInformationCentre: true,
    x: 41.79,
    y: 29.14,
    phones: ["9958032663", "9555766661"],
  },
  {
    city: "Ballia",
    state: "Uttar Pradesh",
    x: 54.16,
    y: 37.22,
    address:
      "C/o R N International School, Village: Nagra, District: Ballia, Uttar Pradesh – 221711",
    phones: ["9839082883", "8858907406", "9415178756"],
  },

  // ===== WEST BENGAL =====
  {
    city: "Kolkata",
    state: "West Bengal",
    x: 61.87,
    y: 46.51,
    address: "Plot No. 164, CIT Scheme 7M, 3rd Floor, Kolkata – 700054",
    phones: ["7686869982", "033-23559967", "9831476164"],
  },
  {
    city: "Hazra (Kolkata)",
    state: "West Bengal",
    x: 61.84,
    y: 46.65,
    address:
      "C/o Srimati Techno Institute, 114/2B, Hazra Road, Near Kalighat Fire Brigade, Kolkata – 700026",
    phones: ["9230062661", "6291917269", "9230086086"],
  },
  {
    city: "Barrackpur (Kolkata)",
    state: "West Bengal",
    x: 61.87,
    y: 45.96,
    address: "D.No. 220/B, East Station Road, New Barrackpore, Kolkata",
    phones: ["8420650604"],
  },
  {
    city: "Haldia",
    state: "West Bengal",
    x: 61.33,
    y: 48.11,
    address:
      "NIFS Haldia, Plot No. 17, Block F, 2nd Floor, Durgachak Colony, PO/PS Durgachak, Dist. Purba Medinipur, Haldia – 721602, West Bengal",
    phones: ["9609132349"],
  },
];

/** Only centers with a verified street address drive the detail-card's
 * address + directions branch — information centres and phone-only rows
 * never render fabricated contact details. */
export function hasVerifiedAddress(c: Center): boolean {
  return !!c.address;
}

/** "0891-2712722" / "8374340999" → "tel:+918912712722" for tel: links. */
export function phoneHref(p: string): string {
  return `tel:+91${p.replace(/\D/g, "").replace(/^0/, "")}`;
}

export const recruiters = [
  "Adani",
  "L&T",
  "MEIL",
  "GMR",
  "ITC",
  "Amazon",
  "Asian Paints",
  "Coca-Cola",
  "Power Mech",
  "Nilkamal",
  "NSL",
  "Sarda",
  "Rotek",
  "Rotopack",
  "KCP",
  "Interarch",
  "Petron",
  "Bothra",
  "Indwell",
  "Lansum",
  "Skillease",
];

export type Recruiter = { name: string; logo: string | null };

export const recruiterLogos: Recruiter[] = [
  { name: "Adani", logo: "/images/logos/recruiters/adani_logo.png" },
  { name: "Amazon", logo: "/images/logos/recruiters/amazon.png" },
  { name: "Asian Paints", logo: "/images/logos/recruiters/asianpaints.png" },
  { name: "Coca-Cola", logo: "/images/logos/recruiters/coca-cola.png" },
  { name: "GMR", logo: "/images/logos/recruiters/gmr.png" },
  { name: "ITC", logo: "/images/logos/recruiters/itc.png" },
  { name: "L&T", logo: "/images/logos/recruiters/lt.png" },
  { name: "MEIL", logo: "/images/logos/recruiters/meil.png" },
  { name: "Nilkamal", logo: "/images/logos/recruiters/nilkamal.png" },
  { name: "NSL", logo: "/images/logos/recruiters/nsl.png" },
  { name: "Power Mech", logo: "/images/logos/recruiters/power-mech.png" },
  { name: "KCP", logo: "/images/logos/recruiters/kcp.png" },
  { name: "Interarch", logo: "/images/logos/recruiters/interarch.png" },
  { name: "Petron", logo: "/images/logos/recruiters/petron.png" },
  { name: "Bothra", logo: "/images/logos/recruiters/bothra.png" },
  { name: "Indwell", logo: "/images/logos/recruiters/indwell.png" },
  { name: "Lansum", logo: "/images/logos/recruiters/lansum.png" },
  { name: "Skillease", logo: "/images/logos/recruiters/skillease.png" },
];

export const accreditations = [
  { name: "NSDC", desc: "National Skill Development Corporation" },
  {
    name: "Skill India",
    desc: "Ministry of Skill Development & Entrepreneurship",
  },
  { name: "Acharya Nagarjuna University", desc: "Academic Collaboration" },
  { name: "Annamalai University", desc: "Academic Collaboration" },
  { name: "National Safety Council", desc: "Affiliated Body" },
  { name: "SBTET", desc: "State Board of Technical Education, AP" },
  { name: "DNV IAF Management", desc: "ISO 9001:2015 Certified" },
  { name: "Lincon", desc: "Academic Collaboration" },
  { name: "QCFI", desc: "Quality Circle Forum of India" },
];

export const accreditationLogos: Recruiter[] = [
  { name: "NSDC", logo: "/images/logos/accreditations/nsdc.png" },
  { name: "Skill India", logo: "/images/logos/accreditations/skill-india.png" },
  {
    name: "Acharya Nagarjuna University",
    logo: "/images/logos/accreditations/acharya_nagaarjuna_university.jpg",
  },
  {
    name: "Annamalai University",
    logo: "/images/logos/accreditations/annamalai_university.png",
  },
  {
    name: "National Safety Council",
    logo: "/images/logos/accreditations/national-safety-council.png",
  },
  { name: "SBTET", logo: "/images/logos/accreditations/sbtet.png" },
  {
    name: "DNV IAF Management",
    logo: "/images/logos/accreditations/dnv-iaf-mgmt.png",
  },
  { name: "Lincon", logo: "/images/logos/accreditations/lincon.png" },
  { name: "QCFI", logo: "/images/logos/accreditations/qcfi.png" },
];
