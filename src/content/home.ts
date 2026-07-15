// @/content/home.ts

export type SiteLanguage = "en" | "am";

type ServiceItem = {
  title: string;
  description: string;
  tags: string[];
};

type ProjectItem = {
  type: string;
  title: string;
  summary: string;
  tags: string[];
  imageLabel: string;
};

type OutcomeItem = {
  value: string;
  title: string;
  description: string;
};

type ProcessItem = {
  title: string;
  description: string;
};

type FactItem = {
  value: string;
  label: string;
};

export type HomeDictionary = {
  navigation: {
    about: string;
    services: string;
    work: string;
    approach: string;
    contact: string;
    startProject: string;
    openMenu: string;
    closeMenu: string;
  };

  loader: {
    brandName: string;
    brandGroup: string;
    tagline: string;
    location: string;
  };

  hero: {
    studio: string;
    location: string;
    category: string;
    line1: string;
    line2: string;
    line3: string;
    description: string;
    cta: string;
    scroll: string;
  };

  statement: {
    label: string;
    text: string;
    from: string;
    to: string;
  };

  marquee: string[];

  about: {
    label: string;
    heading1: string;
    heading2: string;
    statement: string;
    detail: string;
    facts: FactItem[];
    technologyLabel: string;
    technologyNote: string;
    technologies: string[];
  };

  services: {
    label: string;
    heading1: string;
    heading2: string;
    description: string;
    cta: string;
    items: ServiceItem[];
  };

  work: {
    label: string;
    heading1: string;
    heading2: string;
    viewSystem: string;
    recommended: string;
    projects: ProjectItem[];
  };

  outcomes: {
    label: string;
    introduction: string;
    items: OutcomeItem[];
  };

  approach: {
    label: string;
    heading1: string;
    heading2: string;
    description: string;
    steps: ProcessItem[];
  };

  contact: {
    label: string;
    availability: string;
    heading1: string;
    heading2: string;
    heading3: string;
    description: string;
    cta: string;
  };

  footer: {
    tagline: string;
    general: string;
    sales: string;
    support: string;
    location: string;
    backToTop: string;
  };
};

export const homeDictionaries: Record<SiteLanguage, HomeDictionary> = {
  en: {
    navigation: {
      about: "About",
      services: "Services",
      work: "Work",
      approach: "Approach",
      contact: "Contact",
      startProject: "Start a project",
      openMenu: "Open navigation",
      closeMenu: "Close navigation",
    },

    loader: {
      brandName: "JIREH",
      brandGroup: "GRP",
      tagline: "Systems that move business",
      location: "Addis Ababa / Africa & Beyond",
    },

    hero: {
      studio: "Enterprise software studio",
      location: "Addis Ababa",
      category: "ERP / Platforms / Software",
      line1: "WE BUILD THE",
      line2: "SYSTEMS",
      line3: "BUSINESS RUNS ON.",
      description:
        "Jireh Group designs ERP solutions, internal business platforms, and custom software that help companies operate with clarity, move faster, and grow with confidence.",
      cta: "Build with us",
      scroll: "Scroll to explore",
    },

    statement: {
      label: "Our point of view",
      text: "The best software does not add another layer of complexity. It removes friction, connects the operation, and gives every decision a clearer foundation.",
      from: "From fragmented workflows",
      to: "to one connected system",
    },

    marquee: [
      "ERP SYSTEMS",
      "CUSTOM SOFTWARE",
      "INTERNAL PLATFORMS",
      "AUTOMATION",
      "DATA & ANALYTICS",
    ],

    about: {
      label: "Who we are",
      heading1: "ENGINEERING WITH",
      heading2: "BUSINESS CONTEXT.",
      statement:
        "Jireh Group builds digital systems that replace disconnected work with clear, dependable operations.",
      detail:
        "We bring business understanding, product thinking, and engineering into one team—mapping the operation, designing the system behind it, and staying close as it becomes part of how the company runs.",
      facts: [
        {
          value: "Addis Ababa",
          label:
            "Headquartered in Ethiopia and building dependable digital systems for organisations across Africa and beyond.",
        },
        {
          value: "End-to-end",
          label:
            "Discovery, product strategy, experience design, architecture, engineering, deployment, and support in one connected team.",
        },
        {
          value: "Built to last",
          label:
            "Maintainable software designed around real people, changing operations, growing teams, and long-term business ownership.",
        },
      ],
      technologyLabel: "Technology layer",
      technologyNote: "Chosen for the system—not for the trend",
      technologies: [
        "NEXT.JS",
        "REACT",
        "NODE.JS",
        "POSTGRESQL",
        "DOCKER",
        "CLOUD INFRASTRUCTURE",
        "API INTEGRATIONS",
      ],
    },

    services: {
      label: "What we build",
      heading1: "ONE PARTNER.",
      heading2: "THE WHOLE SYSTEM.",
      description:
        "Strategy, product thinking, engineering, and long-term evolution—connected from the first operational question to the final release.",
      cta: "Discuss your system",
      items: [
        {
          title: "ERP & Operations",
          description:
            "Connected systems for finance, inventory, sales, procurement, branches, people, and reporting—designed around the way your organisation actually operates.",
          tags: ["ERP architecture", "Workflow design", "Role-based access"],
        },
        {
          title: "Internal Platforms",
          description:
            "Purpose-built portals, dashboards, approval systems, and operational tools that replace scattered spreadsheets, chats, and manual handoffs.",
          tags: ["Admin platforms", "Dashboards", "Process automation"],
        },
        {
          title: "Custom Software",
          description:
            "Web and mobile products engineered from first principles, from customer-facing platforms to software that becomes core business infrastructure.",
          tags: ["Web applications", "Mobile products", "API systems"],
        },
        {
          title: "Data & Intelligence",
          description:
            "Reliable data foundations that turn daily activity into visibility, accountability, and decisions your team can act on.",
          tags: ["Analytics", "Data modelling", "Executive reporting"],
        },
      ],
    },

    work: {
      label: "Selected systems",
      heading1: "BUILT FOR THE",
      heading2: "REAL OPERATION.",
      viewSystem: "View system",
      recommended: "16:10 recommended",
      projects: [
        {
          type: "Enterprise platform",
          title:
            "A unified operating system for a growing multi-branch business.",
          summary:
            "Sales, inventory, expenses, users, reporting, and branch operations brought into one secure system.",
          tags: ["ERP", "Operations", "Analytics"],
          imageLabel: "Enterprise dashboard / product interface",
        },
        {
          type: "Digital product",
          title:
            "A social platform designed for scale, safety, and daily engagement.",
          summary:
            "Mobile-first product engineering across authentication, feeds, notifications, moderation, and growth systems.",
          tags: ["Mobile", "Platform", "Infrastructure"],
          imageLabel: "Mobile app screens / campaign photography",
        },
        {
          type: "Operational software",
          title:
            "A faster point-of-sale and management workflow for hospitality teams.",
          summary:
            "A focused transaction experience connected to menus, staff, payments, reconciliation, and management reporting.",
          tags: ["POS", "Hospitality", "Reporting"],
          imageLabel: "POS interface / restaurant operations",
        },
      ],
    },

    outcomes: {
      label: "What changes",
      introduction:
        "Not software for the sake of software. A stronger way to run the business.",
      items: [
        {
          value: "ONE",
          title: "Source of truth",
          description:
            "Everyone works from the same reliable operational picture.",
        },
        {
          value: "FEWER",
          title: "Manual handoffs",
          description:
            "Routine work moves through the system instead of through memory.",
        },
        {
          value: "FASTER",
          title: "Decisions",
          description:
            "Leaders see what matters without waiting for another report.",
        },
        {
          value: "READY",
          title: "For growth",
          description:
            "The operational foundation scales with teams, branches, and complexity.",
        },
      ],
    },

    approach: {
      label: "How we work",
      heading1: "CLARITY BEFORE",
      heading2: "COMPLEXITY.",
      description:
        "We do not begin with a feature list. We begin with the business: what is happening, what is slowing it down, and what the right system must make possible.",
      steps: [
        {
          title: "Understand the operation",
          description:
            "We map the real workflow, constraints, responsibilities, and decisions before discussing screens or features.",
        },
        {
          title: "Design the system",
          description:
            "We define the architecture, user journeys, data model, and delivery priorities around measurable business value.",
        },
        {
          title: "Build in clear stages",
          description:
            "Working software is delivered in focused releases and improved through real operational feedback.",
        },
        {
          title: "Launch and evolve",
          description:
            "We support rollout, adoption, monitoring, and the next layer of improvements as the business grows.",
        },
      ],
    },

    contact: {
      label: "Start a conversation",
      availability: "Open to ambitious projects",
      heading1: "YOUR BUSINESS HAS",
      heading2: "A NEXT SYSTEM.",
      heading3: "LET'S BUILD IT.",
      description:
        "Tell us what is difficult, disconnected, or ready to scale. We will help identify the right next step.",
      cta: "Start a project",
    },

    footer: {
      tagline: "Systems that move business.",
      general: "General",
      sales: "Sales",
      support: "Support",
      location: "Addis Ababa · Africa & Beyond",
      backToTop: "Back to top ↑",
    },
  },

  am: {
    navigation: {
      about: "ስለ እኛ",
      services: "አገልግሎቶች",
      work: "ስራዎቻችን",
      approach: "የስራ ሂደታችን",
      contact: "ያግኙን",
      startProject: "ፕሮጀክት ይጀምሩ",
      openMenu: "የመዳረሻ ምናሌን ክፈት",
      closeMenu: "የመዳረሻ ምናሌን ዝጋ",
    },

    loader: {
      brandName: "ጃይረ",
      brandGroup: "ግሩፕ",
      tagline: "ንግድን የሚያንቀሳቅሱ ስርዓቶች",
      location: "አዲስ አበባ / አፍሪካ እና ከዚያ በላይ",
    },

    hero: {
      studio: "የድርጅት ሶፍትዌር ስቱዲዮ",
      location: "አዲስ አበባ",
      category: "ERP / ፕላትፎርሞች / ሶፍትዌር",
      line1: "ንግድዎ",
      line2: "የሚሰራበትን",
      line3: "ሲስተም እንገነባለን።",
      description:
        "ጃይረ ግሩፕ ድርጅቶች ስራቸውን በግልጽነት እንዲመሩ፣ ፈጣን ውሳኔ እንዲሰጡ እና በዘላቂነት እንዲያድጉ ERP ስርዓቶችን፣ የውስጥ ፕላትፎርሞችን እና በትእዛዝ የተሰራ ሶፍትዌርን ይገነባል።",
      cta: "ከእኛ ጋር ይገንቡ",
      scroll: "ለመመልከት ወደ ታች ይውረዱ",
    },

    statement: {
      label: "አመለካከታችን",
      text: "ጥሩ ሶፍትዌር በተጨማሪም ውስብስብነት አይፈጥርም። እንቅፋቶችን ያስወግዳል፣ የስራ ሂደቶችን ያገናኛል እና እያንዳንዱ ውሳኔ በትክክለኛ መረጃ ላይ እንዲመሰረት ያደርጋል።",
      from: "ከተበታተኑ የስራ ሂደቶች",
      to: "ወደ አንድ የተገናኘ ሲስተም",
    },

    marquee: ["ERP ስርዓቶች", "በትእዛዝ የተሰራ ሶፍትዌር", "የውስጥ ፕላትፎርሞች", "አውቶሜሽን", "ዳታ እና ትንተና"],

    about: {
      label: "ስለ እኛ",
      heading1: "የንግድ እውቀትን",
      heading2: "ከሶፍትዌር ምህንድስና ጋር።",
      statement:
        "ጃይረ ግሩፕ የተበታተነ ስራን በግልጽ፣ በተገናኘ እና በአስተማማኝ የንግድ ሂደት የሚተኩ ዲጂታል ስርዓቶችን ይገነባል።",
      detail:
        "የንግድ ግንዛቤን፣ የምርት እቅድን እና ሶፍትዌር ምህንድስናን በአንድ ቡድን ውስጥ እናጣምራለን፤ የስራ ሂደቱን እንረዳለን፣ ትክክለኛውን ሲስተም እንነድፋለን እና የድርጅቱ ዋና የስራ አካል ሲሆን ቀርበን እንደግፋለን።",
      facts: [
        {
          value: "አዲስ አበባ",
          label:
            "መሠረታችን በኢትዮጵያ ሲሆን ለአፍሪካ እና ለሌሎች ገበያዎች አስተማማኝ ዲጂታል ስርዓቶችን እንገነባለን።",
        },
        {
          value: "ከጅምር እስከ ፍጻሜ",
          label:
            "የፍላጎት ጥናት፣ ስትራቴጂ፣ ዲዛይን፣ አርክቴክቸር፣ ልማት፣ ዲፕሎይመንት እና ድጋፍን በአንድ የተገናኘ ቡድን እናቀርባለን።",
        },
        {
          value: "ለረጅም ጊዜ",
          label:
            "ለእውነተኛ ተጠቃሚዎች፣ ለሚለወጡ የስራ ሂደቶች እና ለሚያድጉ ድርጅቶች የተዘጋጀ ሊጠገን እና ሊሰፋ የሚችል ሶፍትዌር።",
        },
      ],
      technologyLabel: "የቴክኖሎጂ መሠረት",
      technologyNote: "ለስርዓቱ የሚመጥነውን እንመርጣለን—ፋሽን የሆነውን አይደለም",
      technologies: [
        "NEXT.JS",
        "REACT",
        "NODE.JS",
        "POSTGRESQL",
        "DOCKER",
        "CLOUD INFRASTRUCTURE",
        "API INTEGRATIONS",
      ],
    },

    services: {
      label: "የምንገነባው",
      heading1: "አንድ አጋር።",
      heading2: "ሙሉ ሲስተም።",
      description:
        "ስትራቴጂ፣ የምርት እቅድ፣ ምህንድስና እና የረጅም ጊዜ እድገት—ከመጀመሪያው የንግድ ጥያቄ እስከ መጨረሻው ሪሊዝ ድረስ።",
      cta: "ስለ ሲስተምዎ እንነጋገር",
      items: [
        {
          title: "ERP እና የስራ አስተዳደር",
          description:
            "ፋይናንስ፣ ክምችት፣ ሽያጭ፣ ግዥ፣ ቅርንጫፎች፣ ሰራተኞች እና ሪፖርቶችን በአንድ የተገናኘ ሲስተም ውስጥ እናቀናጃለን።",
          tags: ["ERP አርክቴክቸር", "የስራ ሂደት ዲዛይን", "በሚና የተመሰረተ ፈቃድ"],
        },
        {
          title: "የውስጥ ድርጅት ፕላትፎርሞች",
          description:
            "የተበታተኑ ኤክሴል ፋይሎችን፣ ቻቶችን እና በእጅ የሚከናወኑ ሂደቶችን በዳሽቦርዶች፣ ፖርታሎች እና አውቶሜሽን እንተካለን።",
          tags: ["አድሚን ፕላትፎርሞች", "ዳሽቦርዶች", "የሂደት አውቶሜሽን"],
        },
        {
          title: "በትእዛዝ የተሰራ ሶፍትዌር",
          description:
            "ከደንበኛ ፕላትፎርሞች እስከ ዋና የንግድ መሠረተ ልማት የሚሆኑ የዌብ እና የሞባይል ምርቶችን እንገነባለን።",
          tags: ["የዌብ መተግበሪያዎች", "የሞባይል ምርቶች", "API ስርዓቶች"],
        },
        {
          title: "ዳታ እና ትንተና",
          description:
            "የዕለት ተዕለት የስራ መረጃን ወደ ግልጽነት፣ ተጠያቂነት እና በመረጃ የተደገፈ ውሳኔ እንቀይራለን።",
          tags: ["ትንተና", "ዳታ ሞዴሊንግ", "የአመራር ሪፖርት"],
        },
      ],
    },

    work: {
      label: "የተመረጡ ስርዓቶች",
      heading1: "ለእውነተኛ",
      heading2: "የስራ ሂደት የተገነቡ።",
      viewSystem: "ስርዓቱን ይመልከቱ",
      recommended: "16:10 ይመከራል",
      projects: [
        {
          type: "የድርጅት ፕላትፎርም",
          title: "ለሚያድግ ባለብዙ ቅርንጫፍ ንግድ አንድ የተገናኘ የስራ ሲስተም።",
          summary:
            "ሽያጭ፣ ክምችት፣ ወጪ፣ ተጠቃሚዎች፣ ሪፖርት እና የቅርንጫፍ ስራዎች በአንድ ደህንነቱ የተጠበቀ ሲስተም ውስጥ።",
          tags: ["ERP", "ኦፕሬሽን", "ትንተና"],
          imageLabel: "የድርጅት ዳሽቦርድ / የምርት በይነገጽ",
        },
        {
          type: "ዲጂታል ምርት",
          title: "ለመስፋፋት፣ ለደህንነት እና ለዕለታዊ ተሳትፎ የተዘጋጀ ማህበራዊ ፕላትፎርም።",
          summary:
            "ማረጋገጫ፣ ፊድ፣ ማሳወቂያ፣ ይዘት ቁጥጥር እና የእድገት ስርዓቶችን የሚያካትት ሞባይል-ቀዳሚ ልማት።",
          tags: ["ሞባይል", "ፕላትፎርም", "መሠረተ ልማት"],
          imageLabel: "የሞባይል መተግበሪያ ስክሪኖች",
        },
        {
          type: "የስራ አስኬጅ ሶፍትዌር",
          title: "ለሆቴልና ምግብ አገልግሎት ቡድኖች ፈጣን POS እና የማኔጅመንት ሂደት።",
          summary: "ሜኑ፣ ሰራተኞች፣ ክፍያ፣ ማመሳሰል እና የአመራር ሪፖርትን የሚያገናኝ ቀላል የግብይት ልምድ።",
          tags: ["POS", "እንግዳ ተቀባይነት", "ሪፖርት"],
          imageLabel: "POS በይነገጽ / የምግብ ቤት ኦፕሬሽን",
        },
      ],
    },

    outcomes: {
      label: "የሚለወጠው",
      introduction: "ሶፍትዌር ለመኖሩ ብቻ አይደለም። ንግድዎን በተሻለ መንገድ ለማስኬድ ነው።",
      items: [
        {
          value: "አንድ",
          title: "የእውነት ምንጭ",
          description: "ሁሉም ሰው በአንድ አስተማማኝ የስራ መረጃ ላይ ይሰራል።",
        },
        {
          value: "ያነሰ",
          title: "በእጅ የሚደረግ ስራ",
          description: "መደበኛ ስራዎች በሰው ትውስታ ሳይሆን በስርዓቱ ውስጥ ይንቀሳቀሳሉ።",
        },
        {
          value: "ፈጣን",
          title: "ውሳኔ",
          description: "አመራሮች ሌላ ሪፖርት ሳይጠብቁ አስፈላጊውን መረጃ ያያሉ።",
        },
        {
          value: "ዝግጁ",
          title: "ለእድገት",
          description: "ስርዓቱ ከሰራተኞች፣ ቅርንጫፎች እና የስራ ውስብስብነት ጋር ያድጋል።",
        },
      ],
    },

    approach: {
      label: "የስራ ሂደታችን",
      heading1: "ከውስብስብነት በፊት",
      heading2: "ግልጽነት።",
      description:
        "ስራችንን በፊቸር ዝርዝር አንጀምርም። ድርጅቱ አሁን እንዴት እየሰራ እንዳለ፣ ምን እያዘገየው እንደሆነ እና ትክክለኛው ሲስተም ምን ማስቻል እንዳለበት እንረዳለን።",
      steps: [
        {
          title: "የስራ ሂደቱን መረዳት",
          description: "እውነተኛውን የስራ ሂደት፣ ገደቦች፣ ኃላፊነቶች እና ውሳኔዎች እንመረምራለን።",
        },
        {
          title: "ስርዓቱን መንደፍ",
          description: "አርክቴክቸር፣ የተጠቃሚ ጉዞ፣ የዳታ ሞዴል እና የልማት ቅድሚያዎችን እንወስናለን።",
        },
        {
          title: "በግልጽ ደረጃዎች መገንባት",
          description:
            "የሚሰራ ሶፍትዌርን በተወሰኑ ሪሊዞች እናቀርባለን እና በእውነተኛ ግብረመልስ እናሻሽለዋለን።",
        },
        {
          title: "ማስጀመር እና ማሳደግ",
          description: "ማስጀመር፣ የተጠቃሚ ስልጠና፣ ክትትል እና ቀጣይ ማሻሻያዎችን እንደግፋለን።",
        },
      ],
    },

    contact: {
      label: "ውይይት ይጀምሩ",
      availability: "አዲስ እና ትልቅ ፕሮጀክቶችን ለመቀበል ዝግጁ ነን",
      heading1: "ንግድዎ ቀጣይ",
      heading2: "የሚፈልገው ሲስተም አለው።",
      heading3: "አብረን እንገንባው።",
      description:
        "የተቋረጠውን፣ የተበታተነውን ወይም ለመስፋፋት ዝግጁ የሆነውን የስራ ክፍል ይንገሩን። ትክክለኛውን ቀጣይ እርምጃ ለመለየት እንረዳዎታለን።",
      cta: "ፕሮጀክት ይጀምሩ",
    },

    footer: {
      tagline: "ንግድን የሚያንቀሳቅሱ ስርዓቶች።",
      general: "አጠቃላይ",
      sales: "ሽያጭ",
      support: "ድጋፍ",
      location: "አዲስ አበባ · አፍሪካ እና ከዚያ በላይ",
      backToTop: "ወደ ላይ ተመለስ ↑",
    },
  },
};
