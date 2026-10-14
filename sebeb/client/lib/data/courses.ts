export type CurriculumModule = {
  title: string;
  lessons: number;
};

export type Course = {
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  instructor: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  lessons: number;
  duration: string;
  price: number;
  featured?: boolean;
  image: string;
  learningPoints: string[];
  curriculum: CurriculumModule[];
};

export function formatPrice(price: number): string {
  return price.toLocaleString("en-US");
}

export const courses: Course[] = [
  {
    slug: "foundations-of-fine-craftsmanship",
    title: "The Foundations of Fine Craftsmanship",
    category: "Craft & Making",
    description:
      "Understand the materials, tools, patience, and principles behind thoughtful making.",
    longDescription:
      "A practical introduction to craftsmanship for learners who want to understand the process behind beautiful and useful objects. Explore materials, tools, preparation, technique, and the importance of attention to detail.",
    instructor: "SEBEB Workshop",
    level: "Beginner",
    lessons: 12,
    duration: "4h 30m",
    price: 850,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1400&q=90",
    learningPoints: [
      "Understand fundamental materials and tools",
      "Learn the principles of careful preparation",
      "Develop a practical making process",
      "Understand quality and attention to detail",
      "Complete a practical final project",
    ],
    curriculum: [
      { title: "Materials, Tools & Preparation", lessons: 4 },
      { title: "Core Techniques & Practice", lessons: 5 },
      { title: "Finishing & Final Project", lessons: 3 },
    ],
  },

  {
    slug: "creative-making-with-intention",
    title: "Creative Making With Intention",
    category: "Creative Skills",
    description:
      "Learn how to turn ideas into thoughtful creative work through a structured process.",
    longDescription:
      "Explore a practical creative process that moves from observation and ideas to experimentation and finished work.",
    instructor: "SEBEB Creative Studio",
    level: "Beginner",
    lessons: 10,
    duration: "3h 45m",
    price: 650,
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1400&q=90",
    learningPoints: [
      "Develop and organize creative ideas",
      "Explore materials and visual references",
      "Experiment without losing direction",
      "Create a simple creative workflow",
      "Develop a finished personal project",
    ],
    curriculum: [
      { title: "Observation & Ideas", lessons: 3 },
      { title: "Experimentation & Direction", lessons: 4 },
      { title: "Finishing Your Project", lessons: 3 },
    ],
  },

  {
    slug: "objects-materials-and-form",
    title: "Objects, Materials & Form",
    category: "Design",
    description:
      "Understand how materials, shape, proportion, and purpose influence the objects around us.",
    longDescription:
      "A design-focused course exploring how objects communicate through their material, form, function, and details.",
    instructor: "SEBEB Design Studio",
    level: "Intermediate",
    lessons: 9,
    duration: "3h 20m",
    price: 700,
    image:
      "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1400&q=90",
    learningPoints: [
      "Understand basic principles of form",
      "Study material and surface",
      "Explore proportion and balance",
      "Connect aesthetics with function",
      "Analyze everyday objects through design",
    ],
    curriculum: [
      { title: "Principles of Form", lessons: 3 },
      { title: "Material & Surface", lessons: 3 },
      { title: "Proportion, Balance & Function", lessons: 3 },
    ],
  },

  {
    slug: "digital-skills-foundation",
    title: "Digital Skills Foundation",
    category: "Digital Skills",
    description:
      "Build practical digital skills for modern study, work, and everyday life.",
    longDescription:
      "A foundation course for learners who want to become more confident using essential digital tools and workflows.",
    instructor: "SEBEB Learning",
    level: "Beginner",
    lessons: 14,
    duration: "5h 10m",
    price: 900,
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=90",
    learningPoints: [
      "Understand essential digital workflows",
      "Organize files and information",
      "Work confidently with common tools",
      "Improve digital productivity",
      "Develop good digital habits",
    ],
    curriculum: [
      { title: "Digital Foundations", lessons: 4 },
      { title: "Files, Tools & Workflows", lessons: 5 },
      { title: "Productivity & Good Habits", lessons: 5 },
    ],
  },

  {
    slug: "professional-growth",
    title: "Professional Growth",
    category: "Professional Skills",
    description:
      "Develop practical habits for communicating, working, and growing professionally.",
    longDescription:
      "Build a stronger professional foundation through communication, organization, collaboration, and continuous learning.",
    instructor: "SEBEB Learning",
    level: "Intermediate",
    lessons: 11,
    duration: "4h",
    price: 750,
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=90",
    learningPoints: [
      "Improve professional communication",
      "Organize your work effectively",
      "Build better collaboration habits",
      "Manage priorities",
      "Create a personal growth plan",
    ],
    curriculum: [
      { title: "Professional Communication", lessons: 4 },
      { title: "Organization & Collaboration", lessons: 4 },
      { title: "Your Personal Growth Plan", lessons: 3 },
    ],
  },

  {
    slug: "business-foundations",
    title: "Business Foundations",
    category: "Business",
    description:
      "Understand the essential ideas behind building and managing a small business.",
    longDescription:
      "A practical introduction to business thinking, customers, value creation, planning, and sustainable growth.",
    instructor: "SEBEB Business",
    level: "Beginner",
    lessons: 13,
    duration: "4h 40m",
    price: 800,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=90",
    learningPoints: [
      "Understand customers and value",
      "Explore basic business models",
      "Create a simple business plan",
      "Understand basic financial thinking",
      "Develop a practical growth strategy",
    ],
    curriculum: [
      { title: "Customers & Value", lessons: 4 },
      { title: "Business Models & Planning", lessons: 5 },
      { title: "Finance & Growth", lessons: 4 },
    ],
  },
];

export const categories = [
  "All",
  "Craft & Making",
  "Creative Skills",
  "Design",
  "Digital Skills",
  "Professional Skills",
  "Business",
];