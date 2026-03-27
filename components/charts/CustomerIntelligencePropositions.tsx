'use client'

import { useState } from 'react'

// ========== DEMO DATA ==========

interface Proposition1Row {
  sNo: number
  customerName: string
  businessOverview: string
  industryVertical: string
  totalAnnualRevenue: string
  customerSize: string
  keyContactPerson: string
  designation: string
  emailAddress: string
  phone: string
  linkedIn: string
  websiteUrl: string
}

interface Proposition2Row extends Proposition1Row {
  keyBuyingCriteria: string
  keyPainPoints: string
  upcomingTriggers: string
  budgetOwnership: string
  procurementModel: string
  preferredEngagement: string
}

interface Proposition3Row extends Proposition2Row {
  preferredSolutionType: string
  preferredDeployment: string
  performanceExpectations: string
  benchmarkingSummary: string
  additionalNotes: string
}

const industrialVerticals = [
  'Real estate investment managers',
  'REITs',
  'Private equity real estate funds',
  'Asset managers',
  'Institutional property owners',
  'Valuation / appraisal firms'
]

const customerSizes = ['Enterprise (500+)', 'Mid-Market (100-499)', 'SMB (10-99)', 'Large Enterprise (1000+)']
const buyingCriteria = [
  'Data accuracy & coverage',
  'Integration capabilities',
  'Cost-effectiveness',
  'Scalability',
  'Real-time analytics',
  'Regulatory compliance'
]
const painPoints = [
  'Fragmented data sources',
  'Manual valuation processes',
  'Lack of real-time market insights',
  'Poor integration with existing systems',
  'High cost of legacy platforms',
  'Difficulty in portfolio risk assessment'
]
const triggers = [
  'Digital transformation initiative',
  'Regulatory compliance deadline',
  'Portfolio expansion plans',
  'Cost reduction mandate',
  'Legacy system end-of-life',
  'M&A activity'
]
const budgetOwners = ['CTO', 'CFO', 'VP of Technology', 'Head of Real Estate Operations', 'Chief Investment Officer', 'Managing Director']
const procurementModels = ['Direct procurement', 'RFP process', 'Vendor panel', 'Strategic partnership', 'Consultant-led']
const engagementTypes = ['SaaS subscription', 'Enterprise license', 'Managed service', 'Consulting + platform', 'Hybrid engagement']
const solutionTypes = ['Cloud-based SaaS', 'On-premise enterprise', 'Hybrid deployment', 'API-first platform', 'Managed analytics']
const deploymentModels = ['Cloud (AWS/Azure)', 'On Premise', 'Hybrid Cloud', 'Multi-cloud', 'Private Cloud']
const performanceExpects = [
  '99.9% uptime SLA',
  'Sub-second query response',
  'Daily data refresh',
  'Real-time streaming',
  'Weekly model updates'
]

const companyNames = [
  'Brookfield Asset Management', 'CBRE Group', 'JLL (Jones Lang LaSalle)', 'Cushman & Wakefield',
  'Prologis Inc.', 'Simon Property Group', 'Digital Realty Trust', 'Equity Residential',
  'Boston Properties', 'Vornado Realty Trust', 'Welltower Inc.', 'Realty Income Corp',
  'Alexandria Real Estate', 'Ventas Inc.', 'Kimco Realty'
]

const contactNames = [
  'James Richardson', 'Sarah Mitchell', 'Michael Chen', 'Emily Thompson',
  'David Kowalski', 'Jessica Patel', 'Robert Williams', 'Amanda Garcia',
  'Christopher Lee', 'Michelle Zhang', 'Andrew Nakamura', 'Laura Fernandez',
  'Thomas Baker', 'Sophia Kim', 'Daniel Martinez'
]

const designations = [
  'VP, Technology & Innovation', 'Director of Data Strategy', 'Head of Real Estate Analytics',
  'Chief Technology Officer', 'SVP, Portfolio Management', 'Director of Investments',
  'Head of Digital Transformation', 'Managing Director, Technology', 'VP, Asset Management',
  'Director of Operations', 'Chief Investment Officer', 'Head of Valuation',
  'VP, Strategic Initiatives', 'Director of PropTech', 'Head of Research & Analytics'
]

function generateProp1Data(): Proposition1Row[] {
  return companyNames.map((name, i) => ({
    sNo: i + 1,
    customerName: name,
    businessOverview: `Leading ${industrialVerticals[i % industrialVerticals.length].toLowerCase()} with diversified portfolio across commercial, residential, and industrial real estate sectors`,
    industryVertical: industrialVerticals[i % industrialVerticals.length],
    totalAnnualRevenue: `$${(Math.floor(Math.random() * 45000) + 5000)}M`,
    customerSize: customerSizes[i % customerSizes.length],
    keyContactPerson: contactNames[i],
    designation: designations[i],
    emailAddress: `${contactNames[i].split(' ')[0].toLowerCase()}.${contactNames[i].split(' ')[1].toLowerCase()}@${name.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '')}.com`,
    phone: `+1-${String(Math.floor(Math.random() * 900 + 100))}-${String(Math.floor(Math.random() * 900 + 100))}-${String(Math.floor(Math.random() * 9000 + 1000))}`,
    linkedIn: `linkedin.com/in/${contactNames[i].toLowerCase().replace(/ /g, '-')}`,
    websiteUrl: `www.${name.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '')}.com`
  }))
}

function generateProp2Data(): Proposition2Row[] {
  return generateProp1Data().map((row, i) => ({
    ...row,
    keyBuyingCriteria: buyingCriteria[i % buyingCriteria.length],
    keyPainPoints: painPoints[i % painPoints.length],
    upcomingTriggers: triggers[i % triggers.length],
    budgetOwnership: budgetOwners[i % budgetOwners.length],
    procurementModel: procurementModels[i % procurementModels.length],
    preferredEngagement: engagementTypes[i % engagementTypes.length]
  }))
}

function generateProp3Data(): Proposition3Row[] {
  return generateProp2Data().map((row, i) => ({
    ...row,
    preferredSolutionType: solutionTypes[i % solutionTypes.length],
    preferredDeployment: deploymentModels[i % deploymentModels.length],
    performanceExpectations: performanceExpects[i % performanceExpects.length],
    benchmarkingSummary: `${['High', 'Medium-High', 'Medium', 'Strong'][i % 4]} potential — ${['early-stage digital adopter', 'mature tech stack with integration needs', 'legacy systems requiring modernization', 'cloud-first strategy with API focus'][i % 4]}`,
    additionalNotes: `${['Priority target for Q2 outreach', 'Follow-up scheduled post-conference', 'RFP expected in next quarter', 'Currently evaluating 3 vendors', 'Strong fit for premium tier'][i % 5]}`
  }))
}

// ========== COMPONENT ==========

interface Props {
  title?: string
  height?: number
}

export default function CustomerIntelligencePropositions({ title, height }: Props) {
  const [activeProposition, setActiveProposition] = useState<1 | 2 | 3>(1)
  const [searchTerm, setSearchTerm] = useState('')

  const prop1Data = generateProp1Data()
  const prop2Data = generateProp2Data()
  const prop3Data = generateProp3Data()

  const filterBySearch = <T extends { customerName: string; industryVertical: string }>(data: T[]) => {
    if (!searchTerm) return data
    const term = searchTerm.toLowerCase()
    return data.filter(row =>
      row.customerName.toLowerCase().includes(term) ||
      row.industryVertical.toLowerCase().includes(term)
    )
  }

  const thClass = "px-3 py-2 text-left text-xs font-semibold text-white uppercase tracking-wider whitespace-nowrap bg-[#4472C4] border border-[#3461a8] sticky top-0 z-10"
  const tdClass = "px-3 py-2 text-xs text-gray-800 border border-gray-200 whitespace-nowrap"
  const tdWrapClass = "px-3 py-2 text-xs text-gray-800 border border-gray-200 min-w-[200px] max-w-[300px] whitespace-normal"

  const groupHeaderClass = "px-3 py-2 text-left text-xs font-bold text-white uppercase tracking-wider bg-[#4472C4] border border-[#3461a8] sticky top-0 z-10 text-center"

  return (
    <div>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <p className="text-sm font-semibold text-blue-900">
          Global PropTech Market - Customer Database
        </p>
        <p className="text-xs text-blue-700 mt-1">
          Verified directory and insight on customers
        </p>
      </div>

      {/* Proposition Tabs */}
      <div className="flex gap-2 mb-4">
        {([1, 2, 3] as const).map(num => (
          <button
            key={num}
            onClick={() => setActiveProposition(num)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeProposition === num
                ? 'bg-[#4472C4] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Proposition {num} - {num === 1 ? 'Basic' : num === 2 ? 'Advance' : 'Premium'}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by customer name or industry..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
        />
      </div>

      {/* Proposition 1 - Basic */}
      {activeProposition === 1 && (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: height ? height - 120 : 500 }}>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th rowSpan={2} className={thClass}>S.No.</th>
                  <th colSpan={5} className={groupHeaderClass}>Customer Information</th>
                  <th colSpan={6} className={groupHeaderClass}>Contact Details</th>
                </tr>
                <tr>
                  <th className={thClass}>Customer Name / Company Name</th>
                  <th className={thClass}>Business Overview</th>
                  <th className={thClass}>Industry Vertical</th>
                  <th className={thClass}>Total Annual Revenue (US$ Million)</th>
                  <th className={thClass}>Customer Size / Scale</th>
                  <th className={thClass}>Key Contact Person</th>
                  <th className={thClass}>Designation / Role</th>
                  <th className={thClass}>Email Address</th>
                  <th className={thClass}>Phone / WhatsApp Number</th>
                  <th className={thClass}>LinkedIn Profile</th>
                  <th className={thClass}>Website URL</th>
                </tr>
              </thead>
              <tbody>
                {filterBySearch(prop1Data).map((row, i) => (
                  <tr key={row.sNo} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className={tdClass}>{row.sNo}</td>
                    <td className={`${tdClass} font-medium`}>{row.customerName}</td>
                    <td className={tdWrapClass}>{row.businessOverview}</td>
                    <td className={tdClass}>{row.industryVertical}</td>
                    <td className={tdClass}>{row.totalAnnualRevenue}</td>
                    <td className={tdClass}>{row.customerSize}</td>
                    <td className={tdClass}>{row.keyContactPerson}</td>
                    <td className={tdClass}>{row.designation}</td>
                    <td className={tdClass}>{row.emailAddress}</td>
                    <td className={tdClass}>{row.phone}</td>
                    <td className={tdClass}>{row.linkedIn}</td>
                    <td className={tdClass}>{row.websiteUrl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Proposition 2 - Advance */}
      {activeProposition === 2 && (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: height ? height - 120 : 500 }}>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th rowSpan={2} className={thClass}>S.No.</th>
                  <th colSpan={5} className={groupHeaderClass}>Customer Information</th>
                  <th colSpan={6} className={groupHeaderClass}>Contact Details</th>
                  <th colSpan={3} className={groupHeaderClass}>Professional Drivers</th>
                  <th colSpan={3} className={groupHeaderClass}>Purchasing Behaviour Metrics</th>
                </tr>
                <tr>
                  <th className={thClass}>Customer Name / Company Name</th>
                  <th className={thClass}>Business Overview</th>
                  <th className={thClass}>Industry Vertical</th>
                  <th className={thClass}>Total Annual Revenue (US$ Million)</th>
                  <th className={thClass}>Customer Size / Scale</th>
                  <th className={thClass}>Key Contact Person</th>
                  <th className={thClass}>Designation / Role</th>
                  <th className={thClass}>Email Address</th>
                  <th className={thClass}>Phone / WhatsApp Number</th>
                  <th className={thClass}>LinkedIn Profile</th>
                  <th className={thClass}>Website URL</th>
                  <th className={thClass}>Key Buying Criteria</th>
                  <th className={thClass}>Key Pain Points</th>
                  <th className={thClass}>Upcoming Triggers and Initiatives</th>
                  <th className={thClass}>Budget Ownership</th>
                  <th className={thClass}>Procurement Model</th>
                  <th className={thClass}>Preferred Engagement Type</th>
                </tr>
              </thead>
              <tbody>
                {filterBySearch(prop2Data).map((row, i) => (
                  <tr key={row.sNo} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className={tdClass}>{row.sNo}</td>
                    <td className={`${tdClass} font-medium`}>{row.customerName}</td>
                    <td className={tdWrapClass}>{row.businessOverview}</td>
                    <td className={tdClass}>{row.industryVertical}</td>
                    <td className={tdClass}>{row.totalAnnualRevenue}</td>
                    <td className={tdClass}>{row.customerSize}</td>
                    <td className={tdClass}>{row.keyContactPerson}</td>
                    <td className={tdClass}>{row.designation}</td>
                    <td className={tdClass}>{row.emailAddress}</td>
                    <td className={tdClass}>{row.phone}</td>
                    <td className={tdClass}>{row.linkedIn}</td>
                    <td className={tdClass}>{row.websiteUrl}</td>
                    <td className={tdWrapClass}>{row.keyBuyingCriteria}</td>
                    <td className={tdWrapClass}>{row.keyPainPoints}</td>
                    <td className={tdWrapClass}>{row.upcomingTriggers}</td>
                    <td className={tdClass}>{row.budgetOwnership}</td>
                    <td className={tdClass}>{row.procurementModel}</td>
                    <td className={tdClass}>{row.preferredEngagement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Proposition 3 - Premium */}
      {activeProposition === 3 && (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: height ? height - 120 : 500 }}>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th rowSpan={2} className={thClass}>S.No.</th>
                  <th colSpan={5} className={groupHeaderClass}>Customer Information</th>
                  <th colSpan={6} className={groupHeaderClass}>Contact Details</th>
                  <th colSpan={3} className={groupHeaderClass}>Professional Drivers</th>
                  <th colSpan={3} className={groupHeaderClass}>Purchasing Behaviour Metrics</th>
                  <th colSpan={3} className={groupHeaderClass}>Solution Requirements</th>
                  <th colSpan={2} className={groupHeaderClass}>CMI Insights</th>
                </tr>
                <tr>
                  <th className={thClass}>Customer Name / Company Name</th>
                  <th className={thClass}>Business Overview</th>
                  <th className={thClass}>Industry Vertical</th>
                  <th className={thClass}>Total Annual Revenue (US$ Million)</th>
                  <th className={thClass}>Customer Size / Scale</th>
                  <th className={thClass}>Key Contact Person</th>
                  <th className={thClass}>Designation / Role</th>
                  <th className={thClass}>Email Address</th>
                  <th className={thClass}>Phone / WhatsApp Number</th>
                  <th className={thClass}>LinkedIn Profile</th>
                  <th className={thClass}>Website URL</th>
                  <th className={thClass}>Key Buying Criteria</th>
                  <th className={thClass}>Key Pain Points</th>
                  <th className={thClass}>Upcoming Triggers and Initiatives</th>
                  <th className={thClass}>Budget Ownership</th>
                  <th className={thClass}>Procurement Model</th>
                  <th className={thClass}>Preferred Engagement Type</th>
                  <th className={thClass}>Preferred Solution Type</th>
                  <th className={thClass}>Preferred Deployment Model</th>
                  <th className={thClass}>Performance Expectations</th>
                  <th className={thClass}>Customer Benchmarking Summary</th>
                  <th className={thClass}>Additional Comments / Notes By CMI Team</th>
                </tr>
              </thead>
              <tbody>
                {filterBySearch(prop3Data).map((row, i) => (
                  <tr key={row.sNo} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className={tdClass}>{row.sNo}</td>
                    <td className={`${tdClass} font-medium`}>{row.customerName}</td>
                    <td className={tdWrapClass}>{row.businessOverview}</td>
                    <td className={tdClass}>{row.industryVertical}</td>
                    <td className={tdClass}>{row.totalAnnualRevenue}</td>
                    <td className={tdClass}>{row.customerSize}</td>
                    <td className={tdClass}>{row.keyContactPerson}</td>
                    <td className={tdClass}>{row.designation}</td>
                    <td className={tdClass}>{row.emailAddress}</td>
                    <td className={tdClass}>{row.phone}</td>
                    <td className={tdClass}>{row.linkedIn}</td>
                    <td className={tdClass}>{row.websiteUrl}</td>
                    <td className={tdWrapClass}>{row.keyBuyingCriteria}</td>
                    <td className={tdWrapClass}>{row.keyPainPoints}</td>
                    <td className={tdWrapClass}>{row.upcomingTriggers}</td>
                    <td className={tdClass}>{row.budgetOwnership}</td>
                    <td className={tdClass}>{row.procurementModel}</td>
                    <td className={tdClass}>{row.preferredEngagement}</td>
                    <td className={tdClass}>{row.preferredSolutionType}</td>
                    <td className={tdClass}>{row.preferredDeployment}</td>
                    <td className={tdWrapClass}>{row.performanceExpectations}</td>
                    <td className={tdWrapClass}>{row.benchmarkingSummary}</td>
                    <td className={tdWrapClass}>{row.additionalNotes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex gap-4 text-xs text-gray-500">
        <span>Showing {activeProposition === 1 ? filterBySearch(prop1Data).length : activeProposition === 2 ? filterBySearch(prop2Data).length : filterBySearch(prop3Data).length} of 15 customers</span>
        <span>|</span>
        <span>Proposition {activeProposition}: {activeProposition === 1 ? '12 columns' : activeProposition === 2 ? '18 columns' : '23 columns'}</span>
      </div>
    </div>
  )
}
