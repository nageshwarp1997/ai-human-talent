export const filterOptions = [
  {
    name: "Scientific Technical Foundation",
    value: "scientific_technical_foundation",
    subMenu: [
      {
        name: "PhD",
        value: "phd",
      },
      {
        name: "MS",
        value: "ms",
      },
      {
        name: "Bachelor",
        value: "bachelor",
      },
    ],
  },
  {
    name: "Top Academic Institution",
    value: "top_academic_institution",
    subMenu: [
      {
        name: "MIT",
        value: "mit",
      },
      {
        name: "Oxford",
        value: "oxford",
      },
      {
        name: "Stanford",
        value: "stanford",
      },
      {
        name: "Cambridge",
        value: "cambridge",
      },
      {
        name: "Tsinghus",
        value: "tsinghus",
      },
      {
        name: "ETH Zurich",
        value: "eth zurich",
      },
    ],
  },
  {
    name: "Research Credentials",
    value: "research_credentials",
    subMenu: [
      {
        name: "Nature Biotechnology",
        value: "nature biotechnology",
      },
      {
        name: "Cell",
        value: "cell",
      },
      {
        name: "Science",
        value: "science",
      },
      {
        name: "World Journal of Microbiology and Biotechnology",
        value: "world journal of microbiology and biotechnology",
      },
      {
        name: "Plos Biology",
        value: "plos biology",
      },
      {
        name: "Genome Research",
        value: "genome research",
      },
      {
        name: "The Lancet Biotechnology",
        value: "the lancet biotechnology",
      },
    ],
  },
  {
    name: "Digital Computing Skills",
    value: "digital_computing_skills",
    subMenu: [
      {
        name: "Crispr",
        value: "crispr",
      },
      {
        name: "Genome Editing",
        value: "genome editing",
      },
      {
        name: "RNA",
        value: "rna",
      },
      {
        name: "Protein",
        value: "protein",
      },
      {
        name: "Molecular",
        value: "molecular",
      },
      {
        name: "Bioinformatics",
        value: "bioinformatics",
      },
      {
        name: "Python",
        value: "python",
      },
      {
        name: "R",
        value: "r",
      },
      {
        name: "Biopython",
        value: "biopython",
      },
      {
        name: "AI/ML",
        value: "ai/ml",
      },
      {
        name: "Drug Discovery",
        value: "drug discovery",
      },
      {
        name: "Omics Data Analysis",
        value: "omics data analysis",
      },
      {
        name: "PCR",
        value: "pcr",
      },
      {
        name: "DNA sequencing",
        value: "dna sequencing",
      },
      {
        name: "Bioconductor",
        value: "bioconductor",
      },
      {
        name: "Geneious",
        value: "geneious",
      },
    ],
  },
  {
    name: "Industrial Collaboration",
    value: "industrial_collaboration",
    subMenu: [
      {
        name: "Novartis",
        value: "novartis",
      },
      {
        name: "Pfizer",
        value: "pfizer",
      },
      {
        name: "Bayer",
        value: "bayer",
      },
      {
        name: "Genetech",
        value: "genetech",
      },
      {
        name: "Nova Nordisk",
        value: "nova nordisk",
      },
      {
        name: "Nih",
        value: "nih",
      },
      {
        name: "Horizon Europe",
        value: "horizon europe",
      },
      {
        name: "Welcome Trust",
        value: "welcome trust",
      },
    ],
  },
  {
    name: "Global Firms",
    value: "global_firms",
    subMenu: [
      {
        name: "Genentech",
        value: "genentech",
      },
      {
        name: "Amgen",
        value: "amgen",
      },
      {
        name: "Moderna",
        value: "moderna",
      },
      {
        name: "Biogen",
        value: "biogen",
      },
      {
        name: "Regeneron",
        value: "regeneron",
      },
    ],
  },
  {
    name: "Founder Flag",
    value: "founder_flag",
    subMenu: [
      {
        name: "Founder",
        value: "founder",
      },
      {
        name: "Co-founder",
        value: "co-founder",
      },
    ],
  },
  {
    name: "Recent Pubs",
    value: "recent_pubs",
  },
  {
    name: "Patent count",
    value: "patent_count",
  },
  {
    name: "Emerging Trend Alignment",
    value: "emerging_trend_alignment",
  },
  {
    name: "Career Progression",
    value: "career_progression",
  },
];

export const subDomains = [
  {
    name: "Bioinformatics",
    value: "bioinformatics",
  },
  {
    name: "Genomics",
    value: "genomics",
  },
  {
    name: "Computational Biology",
    value: "computational biology",
  },
  {
    name: "Crispr",
    value: "crispr",
  },
  {
    name: "Molecular Biology",
    value: "molecular biology",
  },
  {
    name: "Cell Biology",
    value: "cell biology",
  },
  {
    name: "Microbiology",
    value: "microbiology",
  },
];

export const regions = [
  {
    name: "United States",
    value: "US",
  },
  {
    name: "United Kingdom",
    value: "UK",
  },
];

export const jobRoles = ["Professor", "Scientist", "Director"];

export const initialState = {
  Domain: "biotechnology",
  subdomain: "",
  top_k: 10,
  job: "Professor",
  exp: 5,
  country_code: "US",
  min_fit_score: 10.0,
  selected_kpis: {
    scientific_technical_foundation: {
      enabled: false,
      selected_options: [],
      weight: 0.0,
    },
    top_academic_institution: {
      enabled: false,
      selected_options: [],
      weight: 0.0,
    },
    research_credentials: {
      enabled: false,
      selected_options: [],
      weight: 0,
    },
    digital_computing_skills: {
      enabled: false,
      selected_options: [],
      weight: 0,
    },
    industrial_collaboration: {
      enabled: false,
      selected_options: [],
      weight: 0,
    },
    global_firms: {
      enabled: false,
      selected_options: [],
      weight: 0,
    },
    founder_flag: {
      enabled: false,
      selected_options: [],
      weight: 0,
    },
    recent_pubs: {
      enabled: false,
      weight: 0,
    },
    patent_count: {
      enabled: false,
      weight: 0,
    },
    emerging_trend_alignment: {
      enabled: false,
      weight: 0,
    },
    career_progression: {
      enabled: false,
      weight: 0,
    },
  },
};
