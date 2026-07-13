// Recovered from nifsindia.net's "Recently Placed Students" / "Our Students
// Placed In" homepage carousel via the Wayback Machine (live on the site
// Feb 2019 – mid 2023, removed in a 2023 redesign). Each card below is a
// real, individually-designed image (photo + name + role + company + CTC
// baked in) — the text fields here exist only for alt text/captions, not to
// re-render the data as HTML. Source images:
// web.archive.org/web/20230609000000im_/http://www.nifsindia.net/
// wp-content/uploads/2018/08/<id>.png

export type PlacedStudent = {
  id: number;
  image: string;
  name: string;
  role: string;
  company: string;
  ctc: string;
};

export const placedStudents: PlacedStudent[] = [
  { id: 1, image: "/images/placements/1.png", name: "CH Sridhar", role: "Safety Supervisor", company: "Kotac Automotives", ctc: "1,80,000" },
  { id: 2, image: "/images/placements/2.png", name: "G Lokesh", role: "Safety Supervisor", company: "Kotac Automotives", ctc: "1,80,000" },
  { id: 3, image: "/images/placements/3.png", name: "V Prudhiv Raj", role: "Safety Inspector", company: "L&T", ctc: "1,60,000" },
  { id: 4, image: "/images/placements/4.png", name: "Bhanu Kumar", role: "Safety Inspector", company: "L&T", ctc: "1,60,000" },
  { id: 5, image: "/images/placements/5.png", name: "Yadagiri Babu", role: "Safety Inspector", company: "L&T", ctc: "1,60,000" },
  { id: 6, image: "/images/placements/6.png", name: "Sai Teja", role: "Fire Safety Steward", company: "Lansum Group", ctc: "1,68,000" },
  { id: 7, image: "/images/placements/7.png", name: "S Pavan Sai", role: "Fire Safety Steward", company: "Lansum Group", ctc: "1,44,000" },
  { id: 8, image: "/images/placements/8.png", name: "N Vamsi", role: "Fire Safety Steward", company: "Lansum Group", ctc: "1,44,000" },
  { id: 9, image: "/images/placements/9.png", name: "Satish", role: "Fire Safety Steward", company: "Lansum Group", ctc: "1,44,000" },
  { id: 10, image: "/images/placements/10.png", name: "B Sarat Reddy", role: "Fire Safety Steward", company: "Lansum Group", ctc: "1,44,000" },
  { id: 11, image: "/images/placements/11.png", name: "N Vineeth", role: "Fire Safety Steward", company: "Lansum Group", ctc: "1,44,000" },
  { id: 12, image: "/images/placements/12.png", name: "MD Razak", role: "Safety Officer", company: "Lucky Group", ctc: "2,64,000" },
  { id: 13, image: "/images/placements/13.png", name: "Srinivasllu Reddy", role: "Safety Officer", company: "NSL Textiles Limited", ctc: "2,16,000" },
  { id: 14, image: "/images/placements/14.png", name: "Keshav", role: "Safety & QC Officer", company: "Power Mech Projects", ctc: "5,40,000" },
  { id: 15, image: "/images/placements/15.png", name: "Bikash Kumar Mahato", role: "Safety Supervisor", company: "Western Carriers India", ctc: "1,58,000" },
  { id: 16, image: "/images/placements/16.png", name: "B Tirupati Rao", role: "Safety Officer", company: "Yalavarthi Projects", ctc: "1,68,000" },
  { id: 17, image: "/images/placements/17.png", name: "Jogendra Roy", role: "Ty Safety Exe", company: "SLPL India", ctc: "1,40,000" },
  { id: 18, image: "/images/placements/18.png", name: "M Vasu Deva Rao", role: "Ty Safety Exe", company: "SLPL India", ctc: "1,40,000" },
  { id: 19, image: "/images/placements/19.png", name: "T Ram Babu", role: "Fire Marshall", company: "ITC Limited", ctc: "1,56,000" },
  { id: 20, image: "/images/placements/20.png", name: "Prasanth Mahato", role: "Fire Marshall", company: "ITC Limited", ctc: "1,56,000" },
  { id: 21, image: "/images/placements/21.png", name: "Pradip Kumar", role: "Fire Marshall", company: "ITC Limited", ctc: "1,56,000" },
  { id: 22, image: "/images/placements/22.png", name: "MD Javed", role: "Fire Marshall", company: "ITC Limited", ctc: "1,56,000" },
  { id: 23, image: "/images/placements/23.png", name: "M Janardhan", role: "Fire Marshall", company: "ITC Limited", ctc: "1,56,000" },
  { id: 24, image: "/images/placements/24.png", name: "Kishore Kumar", role: "Fire Marshall", company: "ITC Limited", ctc: "1,56,000" },
  { id: 25, image: "/images/placements/25.png", name: "Hrushikesh Goudo", role: "Fire Marshall", company: "ITC Limited", ctc: "1,56,000" },
  { id: 26, image: "/images/placements/26.png", name: "G Siva", role: "Fire Marshall", company: "ITC Limited", ctc: "1,56,000" },
  { id: 27, image: "/images/placements/27.png", name: "Dharmendra Dubey", role: "Fire Marshall", company: "ITC Limited", ctc: "1,56,000" },
  { id: 28, image: "/images/placements/28.png", name: "K Bhanu Prakash", role: "Fire Marshall", company: "ITC Limited", ctc: "1,56,000" },
  { id: 29, image: "/images/placements/29.png", name: "Swarup Mohanty", role: "GET – EHS", company: "L&T (On Rolls)", ctc: "3,98,000" },
  { id: 30, image: "/images/placements/30.png", name: "Subham Soni", role: "GET – EHS", company: "L&T (On Rolls)", ctc: "3,98,000" },
  { id: 31, image: "/images/placements/31.png", name: "Shashikanth Mahanty", role: "GET – EHS", company: "L&T (On Rolls)", ctc: "3,98,000" },
  { id: 32, image: "/images/placements/32.png", name: "MD Aijaz", role: "DET – EHS", company: "L&T (On Rolls)", ctc: "2,04,000" },
  { id: 33, image: "/images/placements/33.png", name: "G Pranay Krishna", role: "GET – EHS", company: "L&T (On Rolls)", ctc: "3,98,000" },
  { id: 34, image: "/images/placements/34.png", name: "Y Bharat Kumar", role: "DET – EHS", company: "L&T (On Rolls)", ctc: "2,04,000" },
  { id: 35, image: "/images/placements/35.png", name: "P Ramesh", role: "Safety Trainee", company: "Cyber City", ctc: "1,80,000" },
  { id: 36, image: "/images/placements/36.png", name: "G Bala Krishna", role: "Safety Trainee", company: "Cyber City", ctc: "1,80,000" },
  { id: 37, image: "/images/placements/37.png", name: "A Pradeep", role: "Safety Supervisor", company: "Diamond Energies India", ctc: "2,40,000" },
  { id: 38, image: "/images/placements/38.png", name: "G Eswar Rao", role: "Fire Safety Supervisor", company: "Gems Hospital", ctc: "1,56,000" },
  { id: 39, image: "/images/placements/39.png", name: "Y S Prasad Reddy", role: "Safety Officer", company: "GJS Infra Tech", ctc: "2,56,000" },
  { id: 40, image: "/images/placements/40.png", name: "Dhanjay Kumar Yadav", role: "Safety Supervisor", company: "Indwell Constructions", ctc: "1,44,000" },
  { id: 41, image: "/images/placements/41.png", name: "K Phanindra", role: "Apprentice EHS", company: "KCP Cements", ctc: "1,92,000" },
  { id: 42, image: "/images/placements/42.png", name: "Shabuddin H", role: "Apprentice EHS", company: "KCP Cements", ctc: "1,92,000" },
  { id: 43, image: "/images/placements/43.png", name: "L Ashok", role: "Safety Supervisor", company: "Kotec Automotives India", ctc: "1,80,000" },
  { id: 44, image: "/images/placements/44.png", name: "Satish Kumar Sahoo", role: "Safety Supervisor", company: "Kotec Automotives India", ctc: "1,56,000" },
  { id: 45, image: "/images/placements/45.png", name: "D Vijay Kumar", role: "Safety Supervisor", company: "Kotec Automotives India", ctc: "1,56,000" },
  { id: 46, image: "/images/placements/46.png", name: "Aditya Bhuyan", role: "Safety Supervisor", company: "Kotec Automotives India", ctc: "1,56,000" },
  { id: 47, image: "/images/placements/47.png", name: "N Manoj Kumar", role: "Safety Supervisor", company: "L&T", ctc: "1,60,000" },
  { id: 48, image: "/images/placements/48.png", name: "Jagadish Prasad Mishra", role: "Safety Supervisor", company: "Western Carriers India", ctc: "1,80,000" },
  { id: 49, image: "/images/placements/49.png", name: "Rupendra Singh", role: "Safety Officer", company: "Rotek Infra Projects", ctc: "3,45,000" },
  { id: 50, image: "/images/placements/50.png", name: "Manabendra Das", role: "Safety Supervisor", company: "MK Roy & Sons", ctc: "1,68,000" },
  { id: 51, image: "/images/placements/51.png", name: "SK Bara Shahid", role: "Trainee Safety", company: "PMF Hyd LLP", ctc: "1,44,000" },
  { id: 52, image: "/images/placements/52.png", name: "S Dattatraih", role: "Trainee Safety", company: "PMF Hyd LLP", ctc: "1,44,000" },
  { id: 53, image: "/images/placements/53.png", name: "P Ravi Teja", role: "Trainee Safety", company: "PMF Hyd LLP", ctc: "1,44,000" },
  { id: 54, image: "/images/placements/54.png", name: "N Ganesh", role: "Trainee Safety", company: "PMF Hyd LLP", ctc: "1,44,000" },
  { id: 55, image: "/images/placements/55.png", name: "Ravi Raj", role: "Safety Supervisor", company: "Saket Infra Projects", ctc: "2,16,000" },
  { id: 56, image: "/images/placements/56.png", name: "P Chandra Sekhar Rao", role: "Safety Manager", company: "CPF Aqua Culture India Pvt Ltd", ctc: "8,21,000" },
  { id: 57, image: "/images/placements/57.png", name: "Alla Sarat Babu", role: "Safety Manager", company: "Saket Infra Projects", ctc: "6,00,000" },
  { id: 58, image: "/images/placements/58.png", name: "K Bhanu Prakash", role: "Safety Supervisor", company: "GJS Infra Tech", ctc: "3,00,000" },
  { id: 59, image: "/images/placements/59.png", name: "P Dheeraj", role: "Safety Supervisor", company: "Rotek Infra Pvt Ltd", ctc: "2,64,000" },
  { id: 60, image: "/images/placements/60.png", name: "D Nagendra Reddy", role: "Safety Supervisor", company: "Rotek Infra Pvt Ltd", ctc: "2,64,000" },
  { id: 61, image: "/images/placements/61.png", name: "S Vinay Kumar", role: "Ty Safety Exe", company: "SLPL India", ctc: "1,26,000" },
  { id: 62, image: "/images/placements/62.png", name: "K Vasanth Kumar", role: "Ty Safety Exe", company: "SLPL India", ctc: "1,20,000" },
  { id: 63, image: "/images/placements/63.png", name: "M Pavan Sai", role: "Safety Supervisor", company: "HYC Engineers", ctc: "1,92,000" },
];
