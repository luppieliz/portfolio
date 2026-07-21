export type Category =
  | "security"
  | "uxui"
  | "interior"
  | "graphic"
  | "photo"
  | "doodles";

export const CATEGORIES: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "All work" },
  { key: "security", label: "Security" },
  { key: "uxui", label: "UX·UI" },
  { key: "interior", label: "Interior" },
  { key: "graphic", label: "Graphic" },
  { key: "photo", label: "Photo" },
  { key: "doodles", label: "Doodles" },
];

export type Project = {
  id: string;
  title: string;
  note?: string; // one-liner shown under the title
  categories: Category[];
  href?: string; // where the tile links to (Behance, Instagram, write-up…)
  image?: string; // file in /public — falls back to generated art when unset
  tall?: boolean; // taller tile for masonry rhythm
};

const IG_SNAPS = "https://www.instagram.com/luppiesnaps/";
const IG_DOODLES = "https://www.instagram.com/itslupiedoodles/";

export const PROJECTS: Project[] = [
  {
    id: "detection",
    title: "Detection Engineering",
    note: "rules, triage & tuning @ NCS",
    categories: ["security"],
    tall: true,
  },
  {
    id: "stopscam",
    title: "StopSCAM",
    note: "anti-scam awareness, designed end-to-end",
    categories: ["security", "uxui"],
    href: "https://www.behance.net/gallery/188480449/StopSCAM",
    image: "/work/stopscam.jpg",
  },
  {
    id: "wildlife",
    title: "Wildlife",
    note: "buffy fish owl · @luppiesnaps",
    categories: ["photo"],
    href: "https://www.instagram.com/p/Da-RIjxkkr4/",
    image: "/work/wildlife-owl.jpg",
    tall: true,
  },
  {
    id: "hotpots",
    title: "HOTPOTS",
    note: "pothole detection IoT pipeline",
    categories: ["uxui"],
    href: "https://www.behance.net/gallery/187927857/HOTPOTS-Pothole-detection-IOT-pipeline",
    image: "/work/hotpots.png",
  },
  {
    id: "golden-mile",
    title: "Golden Mile Reimagined",
    note: "interior architecture, Temasek Poly",
    categories: ["interior"],
    href: "https://www.behance.net/gallery/150114003/Golden-Mile-Reimagined",
    image: "/work/golden-mile.jpg",
    tall: true,
  },
  {
    id: "cve-graph",
    title: "CVE Impact Graph",
    note: "blast-radius analysis in Neo4j",
    categories: ["security"],
  },
  {
    id: "uw-macro",
    title: "Underwater Macro",
    note: "Stiliger sp., Lembeh · @luppiesnaps",
    categories: ["photo"],
    href: IG_SNAPS,
    image: "/work/uw-stiliger.jpg",
    tall: true,
  },
  {
    id: "grab-waftech",
    title: "Grab × Waftech Pipeline",
    categories: ["uxui"],
    href: "https://www.behance.net/gallery/187927563/Grab-X-Waftech-Pipeline",
    image: "/work/grab-waftech.png",
  },
  {
    id: "ramayana",
    title: "Ramayana Infographic",
    note: "literature, illustrated",
    categories: ["graphic"],
    href: "https://www.behance.net/gallery/150112707/Ramayana-Literature-Infographic",
    image: "/work/ramayana.jpg",
  },
  {
    id: "osmose",
    title: "OSMOSE",
    note: "final-year project",
    categories: ["uxui"],
    href: "https://www.behance.net/gallery/96803045/OSMOSE-FYP-AY1920",
    image: "/work/osmose.jpg",
    tall: true,
  },
  {
    id: "soar",
    title: "Security Automation",
    note: "SOAR playbooks, Palo Alto certified",
    categories: ["security"],
  },
  {
    id: "woof-walks",
    title: "Woof Walks",
    note: "dog-walking app concept",
    categories: ["uxui"],
    href: "https://www.behance.net/gallery/129614555/Woof-Walks-Dog-walking-App-Concept-Design-Challenge",
    image: "/work/woof-walks.jpg",
  },
  {
    id: "parcelvy",
    title: "ParcelVy",
    note: "courier brand identity",
    categories: ["graphic"],
    href: "https://www.behance.net/gallery/129301467/ParcelVy-Courier-Delivery-Service-Brand-Identity",
    image: "/work/parcelvy.jpg",
  },
  {
    id: "nothing",
    title: "Just Wanted to Say Nothing",
    note: "typography series",
    categories: ["graphic"],
    href: "https://www.behance.net/gallery/129285907/Just-wanted-to-say-Nothing",
    image: "/work/nothing.jpg",
    tall: true,
  },
  {
    id: "edukueh",
    title: "EDUKUEH",
    note: "tuition & HBL app",
    categories: ["uxui"],
    href: "https://www.behance.net/gallery/128941837/EDUKUEH-Tuition-HBL-App",
    image: "/work/edukueh.jpg",
  },
  {
    id: "buddy19",
    title: "Buddy-19",
    note: "COVID-19 companion dashboard",
    categories: ["uxui"],
    href: "https://www.behance.net/gallery/131050497/Buddy-19",
    image: "/work/buddy19.png",
  },
  {
    id: "astralis",
    title: "Astralis Analytica",
    note: "web design concept",
    categories: ["uxui"],
    href: "https://www.behance.net/gallery/128932099/Astralis-Analytica-Web-Design-Concept",
    image: "/work/astralis.jpg",
  },
  {
    id: "lupiedoodles",
    title: "Lupie Doodles",
    note: "@itslupiedoodles",
    categories: ["doodles"],
    href: IG_DOODLES,
    image: "/work/doodle-a.jpg",
    tall: true,
  },
];
