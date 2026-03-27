const fs = require('fs');

// ========== SEGMENTS DEFINITION ==========
const segments = {
  "By Solution Type": {
    // Hierarchical - parent: children
    "Property Valuation and Investment Analytics": [
      "Valuation and Appraisal Software",
      "Cash Flow and Forecasting Tools",
      "Investment and Scenario Modelling",
      "Fund and Portfolio Analytics"
    ],
    "Market Data and Intelligence Platforms": [
      "Property Data and Ownership Records",
      "Transaction and Market Trend Analytics",
      "Benchmarking and Performance Dashboards",
      "Data Aggregation and Insight Platforms"
    ],
    "Development and Project Feasibility Solutions": [
      "Development Feasibility Modelling",
      "Project Budgeting and Cost Analysis",
      "Construction and Loan Monitoring",
      "Project Risk and Progress Analytics"
    ],
    "Debt and Financial Management Solutions": [
      "Debt and Loan Management Tools",
      "Financing Exposure and Covenant Monitoring",
      "Treasury and Financial Workflow Systems"
    ],
    "Advisory and Consulting Services": [
      "Property Valuation and Appraisal Services",
      "Development and Construction Advisory",
      "Cost Consulting and Due Diligence",
      "Valuation Management Services"
    ],
    "Others (Facility & Asset Management Platforms, Leasing & Occupier Management Platforms, etc.)": []
  },
  "By Deployment": [
    "Cloud Based",
    "On Premise"
  ],
  "By Enterprise Size": [
    "Small and Medium Enterprises",
    "Large Enterprises"
  ],
  "By Business Model": [
    "SaaS & Subscription Platforms",
    "Data & Analytics Subscription Services",
    "Project-Based Advisory & Professional Services",
    "Managed Services",
    "Hybrid Technology and Advisory Engagements"
  ],
  "By End User": [
    "Institutional Investors and Real Estate Funds",
    "REITs and Asset Management Firms",
    "Property Developers and Construction Companies",
    "Commercial Real Estate Owners and Operators",
    "Lenders and Financial Institutions",
    "Consulting, Brokerage and Advisory Firms",
    "Others (Government Housing & Urban Planning Agencies, etc.)"
  ]
};

// ========== GEOGRAPHIES ==========
const geographies = {
  "North America": ["U.S.", "Canada"],
  "Europe": ["U.K.", "Germany", "Italy", "France", "Spain", "Russia", "Rest of Europe"],
  "Asia Pacific": ["China", "India", "Japan", "South Korea", "ASEAN", "Australia", "Rest of Asia Pacific"],
  "Latin America": ["Brazil", "Argentina", "Mexico", "Rest of Latin America"],
  "Middle East & Africa": ["GCC", "South Africa", "Rest of Middle East & Africa"]
};

const years = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033];

// ========== GENERATION HELPERS ==========
// Seeded random for reproducibility
let seed = 42;
function seededRandom() {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
}

function generateTimeSeries(baseValue, cagr, years) {
  const data = {};
  let value = baseValue;
  for (const year of years) {
    data[String(year)] = Math.round(value * 10) / 10;
    value *= (1 + cagr + (seededRandom() - 0.5) * 0.03); // add slight noise
  }
  return data;
}

// Regional base value multipliers (relative market share)
const regionMultipliers = {
  "North America": 1.0,
  "Europe": 0.85,
  "Asia Pacific": 0.75,
  "Latin America": 0.25,
  "Middle East & Africa": 0.15
};

// Country share within region
const countryShares = {
  "U.S.": 0.78, "Canada": 0.22,
  "U.K.": 0.22, "Germany": 0.20, "Italy": 0.10, "France": 0.15, "Spain": 0.08, "Russia": 0.10, "Rest of Europe": 0.15,
  "China": 0.35, "India": 0.18, "Japan": 0.20, "South Korea": 0.08, "ASEAN": 0.08, "Australia": 0.06, "Rest of Asia Pacific": 0.05,
  "Brazil": 0.45, "Argentina": 0.15, "Mexico": 0.25, "Rest of Latin America": 0.15,
  "GCC": 0.50, "South Africa": 0.25, "Rest of Middle East & Africa": 0.25
};

// Segment base values (US$ Million) and growth rates
const segmentConfigs = {
  "By Solution Type": {
    "Valuation and Appraisal Software": { base: 320, cagr: 0.125 },
    "Cash Flow and Forecasting Tools": { base: 280, cagr: 0.135 },
    "Investment and Scenario Modelling": { base: 250, cagr: 0.14 },
    "Fund and Portfolio Analytics": { base: 210, cagr: 0.13 },
    "Property Data and Ownership Records": { base: 290, cagr: 0.11 },
    "Transaction and Market Trend Analytics": { base: 240, cagr: 0.145 },
    "Benchmarking and Performance Dashboards": { base: 180, cagr: 0.15 },
    "Data Aggregation and Insight Platforms": { base: 200, cagr: 0.155 },
    "Development Feasibility Modelling": { base: 190, cagr: 0.12 },
    "Project Budgeting and Cost Analysis": { base: 170, cagr: 0.13 },
    "Construction and Loan Monitoring": { base: 150, cagr: 0.14 },
    "Project Risk and Progress Analytics": { base: 130, cagr: 0.145 },
    "Debt and Loan Management Tools": { base: 220, cagr: 0.11 },
    "Financing Exposure and Covenant Monitoring": { base: 140, cagr: 0.125 },
    "Treasury and Financial Workflow Systems": { base: 160, cagr: 0.12 },
    "Property Valuation and Appraisal Services": { base: 270, cagr: 0.10 },
    "Development and Construction Advisory": { base: 200, cagr: 0.105 },
    "Cost Consulting and Due Diligence": { base: 180, cagr: 0.11 },
    "Valuation Management Services": { base: 150, cagr: 0.095 },
    "Others (Facility & Asset Management Platforms, Leasing & Occupier Management Platforms, etc.)": { base: 350, cagr: 0.16 }
  },
  "By Deployment": {
    "Cloud Based": { base: 2800, cagr: 0.155 },
    "On Premise": { base: 1280, cagr: 0.065 }
  },
  "By Enterprise Size": {
    "Small and Medium Enterprises": { base: 1650, cagr: 0.145 },
    "Large Enterprises": { base: 2430, cagr: 0.11 }
  },
  "By Business Model": {
    "SaaS & Subscription Platforms": { base: 1200, cagr: 0.16 },
    "Data & Analytics Subscription Services": { base: 850, cagr: 0.14 },
    "Project-Based Advisory & Professional Services": { base: 720, cagr: 0.10 },
    "Managed Services": { base: 580, cagr: 0.12 },
    "Hybrid Technology and Advisory Engagements": { base: 730, cagr: 0.135 }
  },
  "By End User": {
    "Institutional Investors and Real Estate Funds": { base: 780, cagr: 0.13 },
    "REITs and Asset Management Firms": { base: 650, cagr: 0.125 },
    "Property Developers and Construction Companies": { base: 580, cagr: 0.14 },
    "Commercial Real Estate Owners and Operators": { base: 520, cagr: 0.12 },
    "Lenders and Financial Institutions": { base: 600, cagr: 0.115 },
    "Consulting, Brokerage and Advisory Firms": { base: 470, cagr: 0.135 },
    "Others (Government Housing & Urban Planning Agencies, etc.)": { base: 480, cagr: 0.11 }
  }
};

// ========== HELPER: Build hierarchical "By Solution Type" data ==========
// Parent nodes get _aggregated: true, _level: 2 and sum of children's year data
// Children are nested under their parent key
function buildSolutionTypeData(regionMult, geoKey) {
  const solutionTypeHierarchy = segments["By Solution Type"];
  const solutionTypeConfigs = segmentConfigs["By Solution Type"];
  const result = {};

  for (const [parentName, children] of Object.entries(solutionTypeHierarchy)) {
    if (children.length === 0) {
      // Leaf parent with no children (e.g., "Others ...")
      seed = hashCode(geoKey + parentName) % 2147483647;
      if (seed < 0) seed += 2147483647;
      if (seed === 0) seed = 1;
      result[parentName] = generateTimeSeries(
        solutionTypeConfigs[parentName].base * regionMult,
        solutionTypeConfigs[parentName].cagr,
        years
      );
    } else {
      // Parent with children - generate children first, then aggregate
      const childData = {};
      const parentYearSums = {};
      years.forEach(y => parentYearSums[String(y)] = 0);

      for (const childName of children) {
        seed = hashCode(geoKey + childName) % 2147483647;
        if (seed < 0) seed += 2147483647;
        if (seed === 0) seed = 1;
        const ts = generateTimeSeries(
          solutionTypeConfigs[childName].base * regionMult,
          solutionTypeConfigs[childName].cagr,
          years
        );
        childData[childName] = ts;
        // Sum into parent
        for (const y of years) {
          parentYearSums[String(y)] += ts[String(y)];
        }
      }

      // Round parent sums
      for (const y of years) {
        parentYearSums[String(y)] = Math.round(parentYearSums[String(y)] * 10) / 10;
      }

      // Build parent node: year data + _aggregated + _level + children nested
      result[parentName] = {
        ...parentYearSums,
        "_aggregated": true,
        "_level": 2,
        ...childData
      };
    }
  }

  return result;
}

// ========== GENERATE VALUE.JSON ==========
function generateValueJson() {
  const result = {};

  for (const [region, countries] of Object.entries(geographies)) {
    const regionMult = regionMultipliers[region];

    // Generate region-level data
    result[region] = {};

    // By Solution Type - hierarchical
    result[region]["By Solution Type"] = buildSolutionTypeData(regionMult, region);

    // Flat segment types
    for (const segType of ["By Deployment", "By Enterprise Size", "By Business Model", "By End User"]) {
      const segs = segmentConfigs[segType];
      result[region][segType] = {};
      for (const [segName, config] of Object.entries(segs)) {
        seed = hashCode(region + segName) % 2147483647;
        if (seed < 0) seed += 2147483647;
        if (seed === 0) seed = 1;
        result[region][segType][segName] = generateTimeSeries(
          config.base * regionMult,
          config.cagr,
          years
        );
      }
    }

    // Add "By Country" for regions
    result[region]["By Country"] = {};
    for (const country of countries) {
      result[region]["By Country"][country] = {};
    }

    // Generate country-level data
    for (const country of countries) {
      result[country] = {};
      const countryShare = countryShares[country] || 0.1;

      // By Solution Type - hierarchical
      result[country]["By Solution Type"] = buildSolutionTypeData(regionMult * countryShare, country);

      // Flat segment types
      for (const segType of ["By Deployment", "By Enterprise Size", "By Business Model", "By End User"]) {
        const segs = segmentConfigs[segType];
        result[country][segType] = {};
        for (const [segName, config] of Object.entries(segs)) {
          seed = hashCode(country + segName) % 2147483647;
          if (seed < 0) seed += 2147483647;
          if (seed === 0) seed = 1;
          result[country][segType][segName] = generateTimeSeries(
            config.base * regionMult * countryShare,
            config.cagr + (seededRandom() - 0.5) * 0.02,
            years
          );
        }
      }
    }
  }

  return result;
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash) || 1;
}

// ========== HELPER: Build hierarchical "By Solution Type" volume data ==========
function buildSolutionTypeVolumeData(regionMult, geoKey) {
  const solutionTypeHierarchy = segments["By Solution Type"];
  const solutionTypeConfigs = segmentConfigs["By Solution Type"];
  const volumeMultiplier = 0.15;
  const result = {};

  for (const [parentName, children] of Object.entries(solutionTypeHierarchy)) {
    if (children.length === 0) {
      seed = hashCode(geoKey + parentName + "vol") % 2147483647;
      if (seed < 0) seed += 2147483647;
      if (seed === 0) seed = 1;
      result[parentName] = generateTimeSeries(
        solutionTypeConfigs[parentName].base * regionMult * volumeMultiplier,
        solutionTypeConfigs[parentName].cagr * 0.85,
        years
      );
    } else {
      const childData = {};
      const parentYearSums = {};
      years.forEach(y => parentYearSums[String(y)] = 0);

      for (const childName of children) {
        seed = hashCode(geoKey + childName + "vol") % 2147483647;
        if (seed < 0) seed += 2147483647;
        if (seed === 0) seed = 1;
        const ts = generateTimeSeries(
          solutionTypeConfigs[childName].base * regionMult * volumeMultiplier,
          solutionTypeConfigs[childName].cagr * 0.85,
          years
        );
        childData[childName] = ts;
        for (const y of years) {
          parentYearSums[String(y)] += ts[String(y)];
        }
      }

      for (const y of years) {
        parentYearSums[String(y)] = Math.round(parentYearSums[String(y)] * 10) / 10;
      }

      result[parentName] = {
        ...parentYearSums,
        "_aggregated": true,
        "_level": 2,
        ...childData
      };
    }
  }

  return result;
}

// ========== GENERATE VOLUME.JSON ==========
function generateVolumeJson() {
  const result = {};
  const volumeMultiplier = 0.15;

  for (const [region, countries] of Object.entries(geographies)) {
    const regionMult = regionMultipliers[region];

    result[region] = {};

    // By Solution Type - hierarchical
    result[region]["By Solution Type"] = buildSolutionTypeVolumeData(regionMult, region);

    // Flat segment types
    for (const segType of ["By Deployment", "By Enterprise Size", "By Business Model", "By End User"]) {
      const segs = segmentConfigs[segType];
      result[region][segType] = {};
      for (const [segName, config] of Object.entries(segs)) {
        seed = hashCode(region + segName + "vol") % 2147483647;
        if (seed < 0) seed += 2147483647;
        if (seed === 0) seed = 1;
        result[region][segType][segName] = generateTimeSeries(
          config.base * regionMult * volumeMultiplier,
          config.cagr * 0.85,
          years
        );
      }
    }

    result[region]["By Country"] = {};
    for (const country of countries) {
      result[region]["By Country"][country] = {};
    }

    for (const country of countries) {
      result[country] = {};
      const countryShare = countryShares[country] || 0.1;

      // By Solution Type - hierarchical
      result[country]["By Solution Type"] = buildSolutionTypeVolumeData(regionMult * countryShare, country);

      // Flat segment types
      for (const segType of ["By Deployment", "By Enterprise Size", "By Business Model", "By End User"]) {
        const segs = segmentConfigs[segType];
        result[country][segType] = {};
        for (const [segName, config] of Object.entries(segs)) {
          seed = hashCode(country + segName + "vol") % 2147483647;
          if (seed < 0) seed += 2147483647;
          if (seed === 0) seed = 1;
          result[country][segType][segName] = generateTimeSeries(
            config.base * regionMult * countryShare * volumeMultiplier,
            config.cagr * 0.85 + (seededRandom() - 0.5) * 0.02,
            years
          );
        }
      }
    }
  }

  return result;
}

// ========== GENERATE SEGMENTATION_ANALYSIS.JSON ==========
function generateSegmentationJson() {
  const result = {
    "Global": {}
  };

  // By Solution Type - hierarchical
  result["Global"]["By Solution Type"] = {};
  const solType = segments["By Solution Type"];
  for (const [parent, children] of Object.entries(solType)) {
    if (children.length === 0) {
      result["Global"]["By Solution Type"][parent] = {};
    } else {
      result["Global"]["By Solution Type"][parent] = {};
      for (const child of children) {
        result["Global"]["By Solution Type"][parent][child] = {};
      }
    }
  }

  // Flat segment types
  for (const segType of ["By Deployment", "By Enterprise Size", "By Business Model", "By End User"]) {
    result["Global"][segType] = {};
    for (const seg of segments[segType]) {
      result["Global"][segType][seg] = {};
    }
  }

  // By Region
  result["Global"]["By Region"] = {};
  for (const [region, countries] of Object.entries(geographies)) {
    result["Global"]["By Region"][region] = {};
    for (const country of countries) {
      result["Global"]["By Region"][region][country] = {};
    }
  }

  return result;
}

// ========== WRITE FILES ==========
const valueData = generateValueJson();
const volumeData = generateVolumeJson();
const segData = generateSegmentationJson();

fs.writeFileSync('public/data/value.json', JSON.stringify(valueData, null, 2));
fs.writeFileSync('public/data/volume.json', JSON.stringify(volumeData, null, 2));
fs.writeFileSync('public/data/segmentation_analysis.json', JSON.stringify(segData, null, 2));

console.log('Generated value.json with', Object.keys(valueData).length, 'geographies');
console.log('Generated volume.json with', Object.keys(volumeData).length, 'geographies');
console.log('Generated segmentation_analysis.json');
console.log('Segment types:', Object.keys(segData["Global"]).filter(k => k !== "By Region"));
