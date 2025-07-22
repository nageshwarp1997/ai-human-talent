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
  // {
  //   name: "Cell Biology",
  //   value: "cell biology",
  // },
  // {
  //   name: "Microbiology",
  //   value: "microbiology",
  // },
];

export const regions = [
  {
    name: "United States",
    value: "US",
  },
  {
    name: "United Kingdom",
    value: "GB",
  },
];

export const jobRoles = ["Professor", "Scientist", "Director"];

export const initialState = {
  Domain: "biotechnology",
  subdomain: "",
  top_k: 10,
  job: "",
  exp: 0,
  country_code: "US",
  min_fit_score: 10.0,
  selected_kpis: {
    scientific_technical_foundation: {
      enabled: true,
      selected_options: ["phd", "ms", "bachelor"],
      weight: 20,
    },
    top_academic_institution: {
      enabled: true,
      selected_options: [
        "mit",
        "oxford",
        "stanford",
        "cambridge",
        "tsinghus",
        "eth zurich",
      ],
      weight: 5,
    },
    research_credentials: {
      enabled: true,
      selected_options: [
        "nature biotechnology",
        "cell",
        "science",
        "world journal of microbiology and biotechnology",
        "plos biology",
        "genome research",
        "the lancet biotechnology",
      ],
      weight: 15,
    },
    digital_computing_skills: {
      enabled: true,
      selected_options: [
        "crispr",
        "genome editing",
        "rna",
        "protein",
        "molecular",
        "bioinformatics",
        "python",
        "r",
        "biopython",
        "ai/ml",
        "drug discovery",
        "omics data analysis",
        "pcr",
        "dna sequencing",
        "bioconductor",
        "geneious",
      ],
      weight: 10,
    },
    industrial_collaboration: {
      enabled: true,
      selected_options: [
        "novartis",
        "pfizer",
        "bayer",
        "genetech",
        "nova nordisk",
        "nih",
        "horizon europe",
        "welcome trust",
      ],
      weight: 10,
    },
    global_firms: {
      enabled: true,
      selected_options: [
        "genentech",
        "amgen",
        "moderna",
        "biogen",
        "regeneron",
      ],
      weight: 5,
    },
    founder_flag: {
      enabled: true,
      selected_options: ["founder", "co-founder"],
      weight: 5,
    },
    recent_pubs: {
      enabled: true,
      weight: 10,
    },
    patent_count: {
      enabled: true,
      weight: 5,
    },
    emerging_trend_alignment: {
      enabled: true,
      weight: 10,
    },
    career_progression: {
      enabled: true,
      weight: 5,
    },
  },
};
