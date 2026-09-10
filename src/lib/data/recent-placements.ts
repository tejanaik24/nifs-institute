export type RecentPlacement = {
  name: string;
  course: string;
  company: string;
  designation: string;
  location: string;
  ctc: string;
  photo: string;
};

// Sourced from the placement cell's records (Students Placement details.docx,
// shared 2026-09-10). Real names, real CTC, real photos — do not fabricate
// entries here. Photos extracted from the same doc, in the same order.
export const recentPlacements: RecentPlacement[] = [
  { name: "Sreraaj M", course: "ADQHSE / 2023", company: "K Kumar Raja Projects (P) Ltd.", designation: "Safety Engineer", location: "Palakkad, Kerala", ctc: "3.12 LPA", photo: "/images/placements/recent/sreraaj-m.jpeg" },
  { name: "Praveen Kumar A", course: "DFS / 2024", company: "Leo Security and Allied Services", designation: "Fire Guard – Emergency Response Team", location: "Chennai, Tamil Nadu", ctc: "2.82 LPA", photo: "/images/placements/recent/praveen-kumar-a.jpeg" },
  { name: "Rajarajan R", course: "DFS / 2024", company: "Leo Security and Allied Services", designation: "Fire Guard – Emergency Response Team", location: "Chennai, Tamil Nadu", ctc: "2.82 LPA", photo: "/images/placements/recent/rajarajan-r.jpeg" },
  { name: "Karthik M", course: "DFS / 2024", company: "Leo Security and Allied Services", designation: "Fire Guard – Emergency Response Team", location: "Chennai, Tamil Nadu", ctc: "2.82 LPA", photo: "/images/placements/recent/karthik-m.jpeg" },
  { name: "Udaykiran K", course: "ADIS / 2023", company: "Detect Technologies", designation: "DE 1 Annotator – Workplace Safety Consultant", location: "Work from Home", ctc: "2.16 LPA", photo: "/images/placements/recent/udaykiran-k.jpeg" },
  { name: "Donepudi Jyothi Swaroop", course: "SBTET-CCIS / 2024", company: "Detect Technologies", designation: "DE 1 Annotator – Workplace Safety Consultant", location: "Work from Home", ctc: "2.64 LPA", photo: "/images/placements/recent/donepudi-jyothi-swaroop.jpeg" },
  { name: "Vishal Yadav", course: "SBTET-CCIS / 2024", company: "Syngene Scientific Solutions", designation: "Junior Executive", location: "Hyderabad, Telangana", ctc: "3.17 LPA", photo: "/images/placements/recent/vishal-yadav.jpeg" },
  { name: "Anudeep", course: "SBTET-CCIS / 2024", company: "Hindustan Coca-Cola Beverages", designation: "Safety Executive", location: "Srikalahasti, Andhra Pradesh", ctc: "3.88 LPA", photo: "/images/placements/recent/anudeep.jpeg" },
  { name: "Rithik E", course: "MBA-SM / 2023", company: "Amazon", designation: "Safety Supervisor", location: "Chennai, Tamil Nadu", ctc: "3.49 LPA", photo: "/images/placements/recent/rithik-e.jpeg" },
  { name: "N. Maneesh", course: "SBTET-CCIS / 2024", company: "Bion Analytx", designation: "Safety Officer", location: "Hyderabad, Telangana", ctc: "2.40 LPA", photo: "/images/placements/recent/n-maneesh.jpeg" },
  { name: "Aamir Khan", course: "DFS / 2023", company: "Amazon", designation: "Safety Supervisor", location: "Delhi", ctc: "3.25 LPA", photo: "/images/placements/recent/aamir-khan.jpeg" },
  { name: "Nitesh Prasad", course: "SBTET-CCIS / 2021", company: "NCC Limited", designation: "Assistant Manager – Safety", location: "Nagpur, Maharashtra", ctc: "7.29 LPA", photo: "/images/placements/recent/nitesh-prasad.jpeg" },
  { name: "Shashi Bhushan Rai", course: "PGDFS / 2022", company: "Amazon", designation: "Safety Supervisor", location: "New Delhi", ctc: "3.49 LPA", photo: "/images/placements/recent/shashi-bhushan-rai.jpeg" },
  { name: "Mallepogu Jagannath", course: "ADIS / 2023", company: "Transline Technologies", designation: "Safety Engineer", location: "Kadapa, Andhra Pradesh", ctc: "3.36 LPA", photo: "/images/placements/recent/mallepogu-jagannath.jpeg" },
  { name: "Samyak Swarup Pradhan", course: "SBTET-CCIS / 2023", company: "NCC Limited", designation: "Sr. Assistant – Safety", location: "Mumbai, Maharashtra", ctc: "4 LPA", photo: "/images/placements/recent/samyak-swarup-pradhan.jpeg" },
  { name: "Babul Lenka", course: "ADIS / 2023", company: "NCC Limited", designation: "Asst. Safety", location: "Lucknow, Uttar Pradesh", ctc: "2.35 LPA", photo: "/images/placements/recent/babul-lenka.jpeg" },
  { name: "Anaparthi Manikanta Harish Kumar", course: "SBTET-CCIS / 2024", company: "NCC Limited", designation: "Sr. Asst. Safety", location: "Karwar, Karnataka", ctc: "2.32 LPA", photo: "/images/placements/recent/anaparthi-manikanta-harish-kumar.jpeg" },
  { name: "T. Upendra", course: "ADIS / 2024", company: "NCC Limited", designation: "Asst. Safety", location: "Mumbai, Maharashtra", ctc: "2.18 LPA", photo: "/images/placements/recent/t-upendra.jpeg" },
  { name: "Vurukiti Teja", course: "SBTET-CCIS / 2024", company: "Detect Technologies", designation: "DE 1 Annotator – Workplace Safety Consultant", location: "Work from Home", ctc: "2.16 LPA", photo: "/images/placements/recent/vurukiti-teja.jpeg" },
  { name: "Besi Kiran", course: "DHSE / 2019", company: "Amazon", designation: "Safety Supervisor", location: "Visakhapatnam, Andhra Pradesh", ctc: "3.49 LPA", photo: "/images/placements/recent/besi-kiran.jpeg" },
  { name: "Naveen Kumar Vanapalli", course: "SBTET-CCIS / 2024", company: "Detect Technologies", designation: "DE 1 Annotator – Workplace Safety Consultant", location: "Work from Home", ctc: "2.16 LPA", photo: "/images/placements/recent/naveen-kumar-vanapalli.jpeg" },
  { name: "Bangaru Naidu Guntreddi", course: "SBTET-CCIS / 2024", company: "Detect Technologies", designation: "DE 1 Annotator – Workplace Safety Consultant", location: "Work from Home", ctc: "2.16 LPA", photo: "/images/placements/recent/bangaru-naidu-guntreddi.jpeg" },
  { name: "Ravi Chandra S", course: "SBTET-CCIS / 2024", company: "NCC Limited", designation: "Supervisor – Safety", location: "Mumbai, Maharashtra", ctc: "2.32 LPA", photo: "/images/placements/recent/ravi-chandra-s.jpeg" },
  { name: "Ankit Kumar", course: "SBTET / 2026", company: "Pennar Industries", designation: "GET", location: "Mumbai, Maharashtra", ctc: "3 LPA", photo: "/images/placements/recent/ankit-kumar.jpeg" },
  { name: "Ansuri Durgaprasad", course: "ADIS", company: "Pennar Industries", designation: "Safety Executive", location: "Trichy, Tamil Nadu", ctc: "3 LPA", photo: "/images/placements/recent/ansuri-durgaprasad.jpeg" },
  { name: "Saradhi Ravichandra", course: "SBTET / 2026", company: "Pennar Industries", designation: "Safety Executive", location: "Trichy, Tamil Nadu", ctc: "4.46 LPA", photo: "/images/placements/recent/saradhi-ravichandra.jpeg" },
  { name: "K. Tarun", course: "SBTET / 2026", company: "Pennar Industries", designation: "Safety Executive", location: "Trichy, Tamil Nadu", ctc: "6.6 LPA", photo: "/images/placements/recent/k-tarun.png" },
];
