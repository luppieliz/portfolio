export type Category =
  | "pro"
  | "personal"
  | "photo"
  | "interior"
  | "uxg";

export const FILTERS: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "all" },
  { key: "pro", label: "professional" },
  { key: "personal", label: "personal" },
  { key: "photo", label: "photography" },
  { key: "interior", label: "interior" },
  { key: "uxg", label: "ui·ux & graphic" },
];

export type Detail = {
  summary: string;
  gallery: { src: string; alt: string }[];
  linkLabel: string;
};

export type Card = {
  id: string;
  cat: Category;
  catLabel: string;
  name: string;
  sub: string;
  href: string; // external link (behance / instagram)
  image: string; // thumbnail under /public
  alt?: string;
  detail?: Detail; // clicking the card opens this overlay
};

const IG_SNAPS = "https://www.instagram.com/luppiesnaps/";
const IG_DOODLES = "https://www.instagram.com/itslupiedoodles/";

export const CARDS: Card[] = [
  {
    id: "grab-waftech",
    cat: "pro",
    catLabel: "professional · pipeline",
    name: "Grab HR OCR",
    sub: "document pipeline with Waftech",
    href: "https://www.behance.net/gallery/187927563/Grab-X-Waftech-Pipeline",
    image: "/work/grab-waftech.png",
    alt: "Grab HR OCR pipeline",
    detail: {
      summary:
        "An OCR pipeline built with Waftech for Grab — turning stacks of HR documents into structured, searchable data instead of paperwork.",
      gallery: [
        { src: "/work/gallery/grab-waftech-1.jpg", alt: "Grab × Waftech pipeline board" },
      ],
      linkLabel: "view on behance →",
    },
  },
  {
    id: "wildlife",
    cat: "photo",
    catLabel: "photography · wildlife",
    name: "Wildlife",
    sub: "buffy fish owl · @luppiesnaps",
    href: "https://www.instagram.com/p/Da-RIjxkkr4/",
    image: "/work/wildlife-owl.jpg",
    alt: "Buffy fish owl",
    detail: {
      summary:
        "Bird photography around Singapore — owls are a specialty. Patience required: three hours and counting per shot.",
      gallery: [
        { src: "/work/wildlife-owl.jpg", alt: "Buffy fish owl, Seletar" },
        { src: "/work/photo-scops.jpg", alt: "Collared scops owl" },
        { src: "/work/photo-bird.jpg", alt: "Bird portrait" },
      ],
      linkLabel: "view on instagram →",
    },
  },
  {
    id: "hotpots",
    cat: "pro",
    catLabel: "professional · iot",
    name: "HOTPOTS",
    sub: "pothole detection pipeline",
    href: "https://www.behance.net/gallery/187927857/HOTPOTS-Pothole-detection-IOT-pipeline",
    image: "/work/hotpots.png",
    alt: "HOTPOTS",
    detail: {
      summary:
        "Nearly a third of car-accident fatalities trace back to poor roads. HOTPOTS is an end-to-end IoT solution: a car-mounted device detects potholes as you drive, notifies the relevant authorities, and turns the collected data into actionable insights.",
      gallery: [
        { src: "/work/gallery/hotpots-1.jpg", alt: "HOTPOTS pipeline board" },
      ],
      linkLabel: "view on behance →",
    },
  },
  {
    id: "golden-mile",
    cat: "interior",
    catLabel: "interior architecture",
    name: "Golden Mile Reimagined",
    sub: "a brutalist icon, re-read",
    href: "https://www.behance.net/gallery/150114003/Golden-Mile-Reimagined",
    image: "/work/golden-mile.jpg",
    alt: "Golden Mile Reimagined",
    detail: {
      summary:
        "Interior architecture work from Temasek Polytechnic — re-reading Singapore's brutalist icon as a living, layered community rather than a relic.",
      gallery: [
        { src: "/work/gallery/golden-mile-1.jpg", alt: "Golden Mile concept board" },
        { src: "/work/gallery/golden-mile-2.jpg", alt: "Golden Mile view" },
        { src: "/work/gallery/golden-mile-3.jpg", alt: "Golden Mile view" },
        { src: "/work/gallery/golden-mile-4.jpg", alt: "Golden Mile view" },
      ],
      linkLabel: "view on behance →",
    },
  },
  {
    id: "lupiedoodles",
    cat: "personal",
    catLabel: "personal · illustration",
    name: "Lupie Doodles",
    sub: "@itslupiedoodles",
    href: IG_DOODLES,
    image: "/work/doodle-h.jpg",
    alt: "Lupie Doodles illustration",
    detail: {
      summary:
        "The doodle account. Characters, creatures, and whatever else wants to exist that week.",
      gallery: [
        { src: "/work/doodle-h.jpg", alt: "Hawk illustration" },
        { src: "/work/doodle-j.jpg", alt: "Goat-girl character" },
        { src: "/work/doodle-g.jpg", alt: "EDUKUEH kueh characters" },
      ],
      linkLabel: "view on instagram →",
    },
  },
  {
    id: "uw-macro",
    cat: "photo",
    catLabel: "photography · macro",
    name: "Underwater Macro",
    sub: "stiliger sp., lembeh strait",
    href: IG_SNAPS,
    image: "/work/uw-stiliger.jpg",
    alt: "Underwater macro",
    detail: {
      summary:
        "Nudibranchs and other neighbours smaller than a thumbnail, photographed on dives around Southeast Asia — Lembeh, Tioman, Bali, Gili.",
      gallery: [
        { src: "/work/uw-stiliger.jpg", alt: "Stiliger sp., Lembeh" },
        { src: "/work/uw-bornella.jpg", alt: "Bornella anguilla, Lembeh" },
        { src: "/work/photo-shrimp.jpg", alt: "Skeleton shrimp" },
        { src: "/work/photo-macro2.jpg", alt: "Macro subject" },
        { src: "/work/photo-macro3.jpg", alt: "Macro subject" },
      ],
      linkLabel: "view on instagram →",
    },
  },
  {
    id: "stopscam",
    cat: "uxg",
    catLabel: "graphic · campaign",
    name: "StopSCAM",
    sub: "anti-scam awareness, end-to-end",
    href: "https://www.behance.net/gallery/188480449/StopSCAM",
    image: "/work/stopscam.jpg",
    alt: "StopSCAM campaign",
    detail: {
      summary:
        "An end-to-end anti-scam awareness campaign — research, identity, and collateral designed to make scam literacy actually stick.",
      gallery: [
        { src: "/work/gallery/stopscam-1.jpg", alt: "StopSCAM board" },
        { src: "/work/gallery/stopscam-2.jpg", alt: "StopSCAM board" },
        { src: "/work/gallery/stopscam-3.jpg", alt: "StopSCAM board" },
        { src: "/work/gallery/stopscam-4.jpg", alt: "StopSCAM board" },
      ],
      linkLabel: "view on behance →",
    },
  },
  {
    id: "tera",
    cat: "interior",
    catLabel: "interior · industry project",
    name: "TERA",
    sub: "changi airport T4",
    href: "https://www.behance.net/gallery/103944837/TERA",
    image: "/work/gallery/tera-1.jpg",
    alt: "TERA Changi T4 concept",
    detail: {
      summary:
        "Industry project for Changi Airport Terminal 4 — a heritage-inspired gallery experience woven into the terminal's retail walkway.",
      gallery: [
        { src: "/work/gallery/tera-1.jpg", alt: "TERA walkway render" },
        { src: "/work/gallery/tera-2.jpg", alt: "TERA render" },
        { src: "/work/gallery/tera-3.jpg", alt: "TERA render" },
        { src: "/work/gallery/tera-4.jpg", alt: "TERA board" },
      ],
      linkLabel: "view on behance →",
    },
  },
  {
    id: "odaya",
    cat: "interior",
    catLabel: "interior · concept",
    name: "ODAYA",
    sub: "co-working & relaxation",
    href: "https://www.behance.net/gallery/96803627/ODAYA-AY1819",
    image: "/work/gallery/odaya-1.jpg",
    alt: "ODAYA co-working concept",
    detail: {
      summary:
        "A co-working and relaxation concept developed with Space Matrix — softening the line between focus and rest.",
      gallery: [
        { src: "/work/gallery/odaya-1.jpg", alt: "ODAYA render" },
        { src: "/work/gallery/odaya-2.jpg", alt: "ODAYA render" },
        { src: "/work/gallery/odaya-3.jpg", alt: "ODAYA render" },
        { src: "/work/gallery/odaya-4.jpg", alt: "ODAYA board" },
      ],
      linkLabel: "view on behance →",
    },
  },
  {
    id: "aotam",
    cat: "interior",
    catLabel: "interior · residential",
    name: "AOTAM",
    sub: "residential master suite",
    href: "https://www.behance.net/gallery/96804357/AOTAM-AY17",
    image: "/work/gallery/aotam-1.jpg",
    alt: "AOTAM residential suite",
    detail: {
      summary:
        "A warm residential master-suite — layered timber, soft gold textiles, and a spa-like ensuite framed by a wall of glass.",
      gallery: [
        { src: "/work/gallery/aotam-1.jpg", alt: "AOTAM bedroom render" },
        { src: "/work/gallery/aotam-2.jpg", alt: "AOTAM render" },
        { src: "/work/gallery/aotam-3.jpg", alt: "AOTAM render" },
        { src: "/work/gallery/aotam-4.jpg", alt: "AOTAM render" },
      ],
      linkLabel: "view on behance →",
    },
  },
  {
    id: "hirise",
    cat: "interior",
    catLabel: "interior · residential",
    name: "HIRISE",
    sub: "high-rise bedroom",
    href: "https://www.behance.net/gallery/96804099/HIRISE-AY17",
    image: "/work/gallery/hirise-1.jpg",
    alt: "HIRISE high-rise bedroom",
    detail: {
      summary:
        "A high-rise bedroom concept that frames the city skyline at night — moody timber, exposed brick, and a jolt of red.",
      gallery: [
        { src: "/work/gallery/hirise-1.jpg", alt: "HIRISE bedroom render" },
        { src: "/work/gallery/hirise-2.jpg", alt: "HIRISE render" },
        { src: "/work/gallery/hirise-3.jpg", alt: "HIRISE render" },
        { src: "/work/gallery/hirise-4.jpg", alt: "HIRISE render" },
      ],
      linkLabel: "view on behance →",
    },
  },
  {
    id: "lodge",
    cat: "interior",
    catLabel: "interior · hospitality",
    name: "LODGE",
    sub: "urban lodge & lounge",
    href: "https://www.behance.net/gallery/96803771/LODGE-AY18",
    image: "/work/gallery/lodge-1.jpg",
    alt: "LODGE urban lounge",
    detail: {
      summary:
        "A youthful urban lodge and social lounge — exposed brick, street art, and glass-walled spaces that invite people to linger.",
      gallery: [
        { src: "/work/gallery/lodge-1.jpg", alt: "LODGE lounge render" },
        { src: "/work/gallery/lodge-2.jpg", alt: "LODGE render" },
        { src: "/work/gallery/lodge-3.jpg", alt: "LODGE render" },
        { src: "/work/gallery/lodge-4.jpg", alt: "LODGE render" },
      ],
      linkLabel: "view on behance →",
    },
  },
  {
    id: "edukueh",
    cat: "uxg",
    catLabel: "ux·ui · app",
    name: "EDUKUEH",
    sub: "tuition & home-based learning",
    href: "https://www.behance.net/gallery/128941837/EDUKUEH-Tuition-HBL-App",
    image: "/work/edukueh.jpg",
    alt: "EDUKUEH",
    detail: {
      summary:
        "A tuition and home-based-learning app concept — EDUKUEH pairs local kueh characters with study tools to make revision less of a chore.",
      gallery: [
        { src: "/work/gallery/edukueh-1.jpg", alt: "EDUKUEH branding" },
        { src: "/work/gallery/edukueh-2.jpg", alt: "EDUKUEH screens" },
        { src: "/work/gallery/edukueh-3.jpg", alt: "EDUKUEH screens" },
      ],
      linkLabel: "view on behance →",
    },
  },
  {
    id: "pet-portraits",
    cat: "personal",
    catLabel: "personal · commissions",
    name: "Pet Portraits",
    sub: "luffy the pomeranian",
    href: IG_DOODLES,
    image: "/work/doodle-i.jpg",
    alt: "Pet portrait of Luffy",
    detail: {
      summary:
        "Commissioned digital portraits of very good pets. This is Luffy. He is perfect.",
      gallery: [{ src: "/work/doodle-i.jpg", alt: "Luffy the Pomeranian" }],
      linkLabel: "view on instagram →",
    },
  },
  {
    id: "osmose",
    cat: "uxg",
    catLabel: "ux·ui · fyp",
    name: "OSMOSE",
    sub: "final-year project",
    href: "https://www.behance.net/gallery/96803045/OSMOSE-FYP-AY1920",
    image: "/work/osmose.jpg",
    alt: "OSMOSE",
    detail: {
      summary:
        "Final-year project at Temasek Polytechnic — a full product concept taken from research through to interface.",
      gallery: [
        { src: "/work/gallery/osmose-1.jpg", alt: "OSMOSE board" },
        { src: "/work/gallery/osmose-2.jpg", alt: "OSMOSE board" },
        { src: "/work/gallery/osmose-3.jpg", alt: "OSMOSE board" },
        { src: "/work/gallery/osmose-4.jpg", alt: "OSMOSE board" },
      ],
      linkLabel: "view on behance →",
    },
  },
  {
    id: "parcelvy",
    cat: "uxg",
    catLabel: "graphic · identity",
    name: "ParcelVy",
    sub: "courier brand identity",
    href: "https://www.behance.net/gallery/129301467/ParcelVy-Courier-Delivery-Service-Brand-Identity",
    image: "/work/parcelvy.jpg",
    alt: "ParcelVy",
    detail: {
      summary:
        "Brand identity for a courier service — logotype, palette, and collateral for parcels that actually look fun to receive.",
      gallery: [
        { src: "/work/gallery/parcelvy-1.jpg", alt: "ParcelVy identity" },
        { src: "/work/gallery/parcelvy-2.jpg", alt: "ParcelVy identity" },
        { src: "/work/gallery/parcelvy-3.jpg", alt: "ParcelVy collateral" },
      ],
      linkLabel: "view on behance →",
    },
  },
  {
    id: "design-challenge",
    cat: "personal",
    catLabel: "personal · challenge",
    name: "10-Hour Design Challenge",
    sub: "one brief, one day",
    href: IG_DOODLES,
    image: "/work/doodle-challenge.jpg",
    alt: "10-hour design challenge piece",
    detail: {
      summary:
        "Given a brief and ten hours: spent around eight on the design and a good two hours fighting the details. Shipped anyway.",
      gallery: [
        { src: "/work/doodle-challenge.jpg", alt: "Design challenge outcome" },
      ],
      linkLabel: "view on instagram →",
    },
  },
  {
    id: "nothing",
    cat: "uxg",
    catLabel: "graphic · typography",
    name: "Just Wanted to Say Nothing",
    sub: "typography series",
    href: "https://www.behance.net/gallery/129285907/Just-wanted-to-say-Nothing",
    image: "/work/nothing.jpg",
    alt: "Just Wanted to Say Nothing",
    detail: {
      summary:
        "A typography series about having nothing to say — and saying it beautifully anyway.",
      gallery: [
        { src: "/work/gallery/nothing-1.jpg", alt: "Nothing series poster" },
        { src: "/work/gallery/nothing-2.jpg", alt: "Nothing series poster" },
        { src: "/work/gallery/nothing-3.jpg", alt: "Nothing series poster" },
        { src: "/work/gallery/nothing-4.jpg", alt: "Nothing series poster" },
      ],
      linkLabel: "view on behance →",
    },
  },
  {
    id: "woof-walks",
    cat: "uxg",
    catLabel: "ux·ui · concept",
    name: "Woof Walks",
    sub: "dog-walking app concept",
    href: "https://www.behance.net/gallery/129614555/Woof-Walks-Dog-walking-App-Concept-Design-Challenge",
    image: "/work/woof-walks.jpg",
    alt: "Woof Walks",
    detail: {
      summary:
        "A dog-walking app concept from a design challenge — matching walkers with dogs who need their steps.",
      gallery: [
        { src: "/work/gallery/woof-walks-1.jpg", alt: "Woof Walks concept" },
      ],
      linkLabel: "view on behance →",
    },
  },
  {
    id: "ramayana",
    cat: "uxg",
    catLabel: "graphic · infographic",
    name: "Ramayana",
    sub: "literature, illustrated",
    href: "https://www.behance.net/gallery/150112707/Ramayana-Literature-Infographic",
    image: "/work/ramayana.jpg",
    alt: "Ramayana infographic",
    detail: {
      summary: "The Ramayana, retold as an illustrated infographic.",
      gallery: [
        { src: "/work/gallery/ramayana-1.jpg", alt: "Ramayana infographic" },
      ],
      linkLabel: "view on behance →",
    },
  },
  {
    id: "buddy19",
    cat: "uxg",
    catLabel: "ux·ui · web app",
    name: "Buddy-19",
    sub: "pandemic companion dashboard",
    href: "https://www.behance.net/gallery/131050497/Buddy-19",
    image: "/work/buddy19.png",
    alt: "Buddy-19",
    detail: {
      summary:
        "A one-stop information hub and companion tool helping business owners understand and manage pandemic measures — built with friends during COVID-19.",
      gallery: [{ src: "/work/gallery/buddy19-1.jpg", alt: "Buddy-19 screens" }],
      linkLabel: "view on behance →",
    },
  },
  {
    id: "astralis",
    cat: "uxg",
    catLabel: "ux·ui · web design",
    name: "Astralis Analytica",
    sub: "web design concept",
    href: "https://www.behance.net/gallery/128932099/Astralis-Analytica-Web-Design-Concept",
    image: "/work/astralis.jpg",
    alt: "Astralis Analytica",
    detail: {
      summary:
        "Web design concept for an analytics platform — starry, data-dense, and a little dramatic.",
      gallery: [
        { src: "/work/gallery/astralis-1.jpg", alt: "Astralis Analytica design" },
      ],
      linkLabel: "view on behance →",
    },
  },
];

export const STATS: { label: string; value: number }[] = [
  { label: "build speed", value: 80 },
  { label: "failure stamina", value: 90 },
  { label: "perseverance", value: 80 },
  { label: "colour restraint", value: 10 },
  { label: "sitting still", value: 5 },
];

export const TRAITS = {
  strengths: "rapid prototyping · spotting tiny things · optimising everything",
  weaknesses: "yochi · cute bunnies · one more side quest",
};
