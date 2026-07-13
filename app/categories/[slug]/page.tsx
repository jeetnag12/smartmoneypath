import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  ArrowRight,
  Clock,
  Zap,
  Info,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Mail,
  ShieldCheck,
  TrendingDown,
  BookOpen
} from 'lucide-react'
import { getAllPosts, getPostsByCategory } from '@/lib/posts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SITE_URL } from '@/lib/site'
import { BreadcrumbSchema, FAQSchema } from '@/components/seo/JsonLdSchemas'
import ArticleCard from '@/components/ArticleCard'

interface CategoryDetails {
  title: string
  description: string
  icon: string
  color: string
  textColor: string
  borderColor: string
  overview: string
  whoItHelps: string[]
  roadmap: { step: string; title: string; desc: string }[]
  mistakes: { title: string; desc: string }[]
  faqs: { question: string; answer: string }[]
  related: string[]
}

const categoryDatabase: Record<string, CategoryDetails> = {
  budgeting: {
    title: 'Budgeting',
    description: 'Track expenses and plan spending with proven budgeting frameworks tested against real numbers.',
    icon: '📊',
    color: 'bg-blue-50/80 text-blue-700',
    textColor: 'text-blue-900',
    borderColor: 'border-blue-100',
    overview: 'Effective budgeting is not about cash deprivation; it is about allocating your capital intentionally. By dividing your cash flow into clear categories, you buy the freedom to spend guilt-free on what you value while protecting your future legacy.',
    whoItHelps: [
      'Individuals struggling to save at the end of the month.',
      'Families facing high-cost-of-living housing squeezes.',
      'Beginners seeking a simple, low-maintenance tracking method.'
    ],
    roadmap: [
      { step: '1', title: 'Audit Spending', desc: 'Track your last 90 days of transactions to find hidden expense leaks.' },
      { step: '2', title: 'Choose a Ratio', desc: 'Pick the 50/30/20 budget or customize it for high housing cost areas.' },
      { step: '3', title: 'Automate Transfers', desc: 'Set up automatic savings deposits to hit the day your paycheck deposits.' }
    ],
    mistakes: [
      { title: 'The Latte Focus', desc: 'Obsessing over small daily purchases while ignoring high mortgage, rent, or car payments.' },
      { title: 'Ghost Subscriptions', desc: 'Leaving unused recurring app memberships active, leaking $100+ monthly.' }
    ],
    faqs: [
      { question: 'Is 50/30/20 appropriate for high-rent areas?', answer: 'Yes, but you may need to adjust the ratios. We recommend allocating 60% to needs and pulling the difference from wants, preserving the 20% savings shield.' },
      { question: 'How often should I audit my budget?', answer: 'We recommend a brief 20-minute review once a month to check automated transfers and adjust for irregular bills.' }
    ],
    related: ['saving', 'debt', 'banking']
  },
  saving: {
    title: 'Saving Money',
    description: 'Build your cash cushion and secure your foundation with data-backed saving strategies.',
    icon: '💵',
    color: 'bg-green-50/80 text-green-700',
    textColor: 'text-green-900',
    borderColor: 'border-green-100',
    overview: 'Savings represent liquid opportunity. Without a liquid cash shield, the next unexpected event—be it medical or automotive—becomes a high-interest credit card emergency that delays your wealth-building goals.',
    whoItHelps: [
      'Savers starting from zero buffer looking for their first $1,000.',
      'High-earners seeking to optimize cash APYs via online HYSAs.',
      'Investors trying to decide between liquid accounts and fixed CDs.'
    ],
    roadmap: [
      { step: '1', title: 'Save $1,000 First', desc: 'Establish an initial momentum shield as fast as possible.' },
      { step: '2', title: 'Evaluate Deductibles', desc: 'Audit insurance policies to ensure your fund covers the largest deductible.' },
      { step: '3', title: 'Build 3-6 Months', desc: 'Maximize your cash shield to cover all essential monthly fixed bills.' }
    ],
    mistakes: [
      { title: 'Traditional Checking Holds', desc: 'Leaving large cash buffers in standard accounts earning 0.01% instead of 4%+ APYs.' },
      { title: 'Investing Your Cushion', desc: 'Keeping emergency funds in volatile index funds where they can drop 20% right when needed.' }
    ],
    faqs: [
      { question: 'What is the best account type for emergency cash?', answer: 'A High-Yield Savings Account (HYSA) at an FDIC-insured online bank. It keeps cash fully liquid while yielding up to 50x traditional brick-and-mortar bank rates.' },
      { question: 'Should I save cash while carrying high-interest debt?', answer: 'Save a starter buffer of $1,000 to $2,000 first, then prioritize paying down high-interest debt aggressively.' }
    ],
    related: ['budgeting', 'banking', 'loans']
  },
  investing: {
    title: 'Investing',
    description: 'Grow your wealth through smart asset allocation, index mutual funds, and low-cost ETFs.',
    icon: '📈',
    color: 'bg-indigo-50/80 text-indigo-700',
    textColor: 'text-indigo-900',
    borderColor: 'border-indigo-100',
    overview: 'Investing is the engine of compound growth. By buying broad-market assets at low fee structures, you align your wealth with global economic growth, ensuring inflation does not erode your savings.',
    whoItHelps: [
      'Beginners starting with their first $100 allocation.',
      'Passive investors seeking low-cost total stock market ETF options.',
      'Retirement planners optimizing asset allocation ratios.'
    ],
    roadmap: [
      { step: '1', title: 'Open Brokerage Account', desc: 'Select a low-cost, reputable custodian with fractional share access.' },
      { step: '2', title: 'Select Total Market ETFs', desc: 'Focus on low-cost broad index ETFs with expense ratios below 0.10%.' },
      { step: '3', title: 'Dollar-Cost Average', desc: 'Set up automated monthly buy orders to build compounding wealth.' }
    ],
    mistakes: [
      { title: 'Active Trading Traps', desc: 'Trying to pick single stocks or day-trade, which statistically underperforms passive index funds.' },
      { title: 'Paying High Fees', desc: 'Investing in high-expense mutual funds that eat up 20% of your potential long-term returns.' }
    ],
    faqs: [
      { question: 'How much money do I need to start investing?', answer: 'You can start with as little as $1 to $100 using fractional shares on modern brokerage portals.' },
      { question: 'What is the difference between mutual funds and ETFs?', answer: 'ETFs trade throughout the day like single stocks and typically have no minimum purchase requirements, making them ideal for beginners.' }
    ],
    related: ['retirement', 'taxes', 'saving']
  },
  debt: {
    title: 'Debt Management',
    description: 'Break free from debt using snowball or avalanche methods. Step-by-step guides to speed up payoff.',
    icon: '💳',
    color: 'bg-orange-50/80 text-orange-700',
    textColor: 'text-orange-900',
    borderColor: 'border-orange-100',
    overview: 'High-interest debt is a wealth tax that locks up your monthly cash flow. Paying down high-APR debt provides a guaranteed return matching your loan interest rate.',
    whoItHelps: [
      'Individuals carrying credit card balances above 15% APR.',
      'Student loan borrowers trying to optimize monthly payments.',
      'Anyone feeling overwhelmed by multiple monthly debt lines.'
    ],
    roadmap: [
      { step: '1', title: 'Pick a Payoff Order', desc: 'List debts from smallest balance (Snowball) or highest interest rate (Avalanche).' },
      { step: '2', title: 'Pay Minimums Everywhere', desc: 'Keep all accounts current to avoid score damage while attacking one target.' },
      { step: '3', title: 'Roll Over Payments', desc: 'Once the first target is eliminated, redirect the full monthly payment to the next debt.' }
    ],
    mistakes: [
      { title: 'The Balance Transfer Trap', desc: 'Moving debt to a 0% APR card but continuing to spend on credit lines, ending up with double the debt.' },
      { title: 'Paying Without a Shield', desc: 'Draining all emergency cash to pay down cards, forcing you to borrow again when a surprise occurs.' }
    ],
    faqs: [
      { question: 'Should I use Snowball or Avalanche?', answer: 'Choose Avalanche to minimize total interest paid. Choose Snowball if you need quick psychological wins to keep your motivation high.' },
      { question: 'How do late payments impact my credit score?', answer: 'A single payment late by 30+ days can drop your FICO score by 100+ points.' }
    ],
    related: ['credit', 'loans', 'saving']
  },
  retirement: {
    title: 'Retirement Planning',
    description: 'Optimize your 401(k), Roth IRA, and Traditional IRA vehicles under current tax codes.',
    icon: '🎯',
    color: 'bg-teal-50/80 text-teal-700',
    textColor: 'text-teal-900',
    borderColor: 'border-teal-100',
    overview: 'Strategic retirement planning balances your tax liabilities today with your future withdrawal requirements. Capitalizing on employer matches and tax-advantaged accounts maximizes compound returns.',
    whoItHelps: [
      'Employees trying to decide how to split 401(k) allocations.',
      'High earners needing backdoor Roth IRA structures.',
      'Young professionals wanting to understand tax advantages.'
    ],
    roadmap: [
      { step: '1', title: 'Capture Employer Match', desc: 'Contribute to your workplace 401(k) up to the exact match limit first.' },
      { step: '2', title: 'Max Out Your Roth IRA', desc: 'Fund a Roth IRA next to secure tax-free growth and flexible withdrawal options.' },
      { step: '3', title: 'Return to 401(k)', desc: 'Redirect remaining retirement funds to increase pre-tax 401(k) contributions.' }
    ],
    mistakes: [
      { title: 'Leaving Match Cash', desc: 'Failing to contribute enough to capture 100% of employer 401(k) match matches, leaving free money.' },
      { title: 'Borrowing Against 401(k)', desc: 'Taking loans from retirement accounts, which halts growth and risks tax penalties if you leave the job.' }
    ],
    faqs: [
      { question: 'Should I choose Roth or Traditional IRA?', answer: 'Choose Roth if you are currently in a lower tax bracket than you expect to be in retirement. Choose Traditional if you are in peak earning years and want immediate deductions.' },
      { question: 'What is the IRA contribution limit in 2026?', answer: 'For 2026, the combined annual limit is $7,000 for savers under 50, and $8,000 for those 50 and older.' }
    ],
    related: ['investing', 'taxes', 'planning']
  },
  education: {
    title: 'Education Financing',
    description: 'Navigate student loan changes, forgiveness rules, and smart college funding solutions.',
    icon: '🎓',
    color: 'bg-pink-50/80 text-pink-700',
    textColor: 'text-pink-900',
    borderColor: 'border-pink-100',
    overview: 'Higher education is a major investment. Understanding the shifting student loan regulatory landscape and forgiveness criteria helps borrowers avoid lifetime debt traps.',
    whoItHelps: [
      'Students looking to minimize college debt.',
      'Borrowers needing PSLF or IDR plan guidance.',
      'Parents building college savings funds.'
    ],
    roadmap: [
      { step: '1', title: 'Submit FAFSA Early', desc: 'Verify eligibility for federal grants, work-study, and subsidized loans first.' },
      { step: '2', title: 'Choose Subsidized Loans', desc: 'Prioritize federal subsidized loans before taking on private student debt.' },
      { step: '3', title: 'Audit Forgiveness Rules', desc: 'Track PSLF requirements or income-driven repayment discharge qualifications.' }
    ],
    mistakes: [
      { title: 'Private Loan Over-reliance', desc: 'Taking high-interest private student loans before exhausting federal aid pathways.' },
      { title: 'Missing Recertifications', desc: 'Failing to recertify income annually on IDR plans, which causes payment spikes.' }
    ],
    faqs: [
      { question: 'Is forgiven student loan debt taxable?', answer: 'Federal tax exemption on forgiven debt is subject to legislative extensions. Some states may still treat it as taxable income.' },
      { question: 'What is the PSLF payment count requirement?', answer: 'You must make 120 qualifying monthly payments while working full-time for an eligible non-profit or government employer.' }
    ],
    related: ['loans', 'planning', 'debt']
  },
  credit: {
    title: 'Credit Score Optimization',
    description: 'Audit credit reports, dispute errors, optimize utilization, and establish excellent credit scores.',
    icon: '💳',
    color: 'bg-cyan-50/80 text-cyan-700',
    textColor: 'text-cyan-900',
    borderColor: 'border-cyan-100',
    overview: 'Your credit score is a leverage metric. An elite score unlocks the lowest interest rates on mortgages and auto loans, saving you tens of thousands of dollars over your life.',
    whoItHelps: [
      'Borrowers preparing to apply for mortgages.',
      'Savers wanting to dispute report errors.',
      'Students building credit history from scratch.'
    ],
    roadmap: [
      { step: '1', title: 'Get Credit Reports', desc: 'Retrieve official bureau files from AnnualCreditReport.com.' },
      { step: '2', title: 'Audit Utilization', desc: 'Target credit card statement balances under 10% of limit.' },
      { step: '3', title: 'Automate Autopay', desc: 'Guarantee zero missed payments by automating minimum contributions.' }
    ],
    mistakes: [
      { title: 'Closing Old Cards', desc: 'Closing credit cards with no balance, which shortens your history and raises your utilization.' },
      { title: 'Co-Signing Loans', desc: 'Co-signing for others, making you 100% legally responsible for the debt.' }
    ],
    faqs: [
      { question: 'Does carrying a balance build credit?', answer: 'No. Paying your credit cards in full monthly is the optimal way to build credit without paying interest.' },
      { question: 'How long do late payments stay on report?', answer: 'Late payments remain on your credit history for 7 years before falling off.' }
    ],
    related: ['debt', 'loans', 'banking']
  },
  'home-buying': {
    title: 'Home Buying',
    description: 'Complete guidelines on mortgage rates, down payments, and home audits for first-time buyers.',
    icon: '🏠',
    color: 'bg-yellow-50/80 text-yellow-700',
    textColor: 'text-yellow-900',
    borderColor: 'border-yellow-100',
    overview: 'Real estate transactions represent the largest financial decisions most families make. Approaching the mortgage market requires careful cash reserve planning and down payment evaluation.',
    whoItHelps: [
      'First-time buyers preparing to save down payments.',
      'Buyers trying to compare conventional and FHA programs.',
      'Savers auditing total closing costs.'
    ],
    roadmap: [
      { step: '1', title: 'Build Cash Buffer', desc: 'Save for down payments and closing costs, keeping a post-closing emergency fund.' },
      { step: '2', title: 'Get Pre-Approved', desc: 'Secure a lender pre-approval letter by verifying tax files.' },
      { step: '3', title: 'Order Home Inspection', desc: 'Inspect structural elements, roofing, and HVAC before signing final papers.' }
    ],
    mistakes: [
      { title: 'Skipping Inspections', desc: 'Waiving structural home inspections to win bidding wars, risking major foundation repairs.' },
      { title: 'Spending All Cash', desc: 'Using every dollar for down payments, leaving zero cash for immediate repair emergencies.' }
    ],
    faqs: [
      { question: 'Do I need 20% down to buy a house?', answer: 'No. While 20% removes PMI, FHA loans allow down payments as low as 3.5%, and VA/USDA loans allow 0% down.' },
      { question: 'What is Debt-to-Income (DTI) ratio?', answer: 'Your total monthly debt payments divided by gross income. Lenders prefer this under 36-43%' }
    ],
    related: ['loans', 'saving', 'planning']
  },
  auto: {
    title: 'Auto Finance',
    description: 'Calculate the total cost of car ownership. Compare leasing, auto loans, and depreciation.',
    icon: '🚗',
    color: 'bg-red-50/80 text-red-700',
    textColor: 'text-red-900',
    borderColor: 'border-red-100',
    overview: 'Vehicles are depreciating assets. Understanding the comprehensive cost of auto ownership—from fuel and maintenance to insurance premiums—protects your cash flow.',
    whoItHelps: [
      'Car shoppers trying to calculate total ownership costs.',
      'Buyers comparing dealer financing vs. credit union loans.',
      'Drivers auditing insurance premium increases.'
    ],
    roadmap: [
      { step: '1', title: 'Apply 20/4/10 Rule', desc: 'Aim for 20% down, a 4-year term, and keeping car bills under 10% of pay.' },
      { step: '2', title: 'Get Auto Quotes', desc: 'Secure insurance premium quotes for the specific car model *before* buying.' },
      { step: '3', title: 'Build Maintenance Fund', desc: 'Set aside sinking cash to cover tires, brakes, and regular services.' }
    ],
    mistakes: [
      { title: 'Focusing on Monthly payment', desc: 'Extending auto loans to 72 or 84 months to get lower monthly bills, ending up upside-down.' },
      { title: 'Ignoring Depreciation', desc: 'Buying brand-new cars and taking the steepest 20% depreciation hit in year one.' }
    ],
    faqs: [
      { question: 'Is leasing better than buying?', answer: 'Leasing has a lower payment, but it is almost always more expensive long-term because you never build equity.' },
      { question: 'How much should I spend on a car?', answer: 'Total auto costs (payment, gas, insurance) should remain under 10-15% of your monthly pay.' }
    ],
    related: ['loans', 'budgeting', 'saving']
  },
  planning: {
    title: 'Financial Planning',
    description: 'Build estate plans, outline legal wills, set up power of attorney, and secure your family.',
    icon: '🛡️',
    color: 'bg-indigo-50/80 text-indigo-700',
    textColor: 'text-indigo-900',
    borderColor: 'border-indigo-100',
    overview: 'Financial planning ensures your assets are distributed according to your wishes and protects your family from legal friction during difficult times.',
    whoItHelps: [
      'Parents wanting to set up guardianship structures.',
      'Individuals needing to draft a Will or Power of Attorney.',
      'Savers auditing beneficiary designations on retirement accounts.'
    ],
    roadmap: [
      { step: '1', title: 'Write a Basic Will', desc: 'Identify guardians for children and declare asset distributions.' },
      { step: '2', title: 'Set Up Power of Attorney', desc: 'Designate medical and financial POAs to manage assets if you are incapacitated.' },
      { step: '3', title: 'Audit Beneficiaries', desc: 'Verify beneficiaries on 401(k) and life insurance accounts annually.' }
    ],
    mistakes: [
      { title: 'Assuming Wills Do It All', desc: 'Failing to realize that beneficiary designations on retirement accounts override instructions in your Will.' },
      { title: 'Delaying Plans', desc: 'Assuming estate plans are only for the wealthy, leaving families with probate court delays.' }
    ],
    faqs: [
      { question: 'What is a Healthcare Directive?', answer: 'A document outlining your life-sustaining medical preferences if you are unable to communicate.' },
      { question: 'How often should I update my estate plan?', answer: 'Review your estate documents after major life milestones like marriage, divorce, or child births.' }
    ],
    related: ['retirement', 'insurance', 'taxes']
  },
  mindset: {
    title: 'Financial Mindset',
    description: 'Understand the behavioral psychology of spending, money habits, and status signaling.',
    icon: '🧠',
    color: 'bg-emerald-50/80 text-emerald-700',
    textColor: 'text-emerald-900',
    borderColor: 'border-emerald-100',
    overview: 'Money management is 80% behavior and 20% head knowledge. Identifying emotional spending triggers helps you escape the consumer treadmill.',
    whoItHelps: [
      'Savers struggling with impulse buying.',
      'Individuals facing lifestyle creep.',
      'Anyone wanting to build healthy financial habits.'
    ],
    roadmap: [
      { step: '1', title: 'Identify Triggers', desc: 'Track what emotions (stress, boredom) prompt impulse purchases.' },
      { step: '2', title: 'Apply 24-Hour Rule', desc: 'Wait 24 hours before completing any non-essential purchase over $50.' },
      { step: '3', title: 'Unsubscribe From Ads', desc: 'Remove marketing triggers by cleaning out your email box.' }
    ],
    mistakes: [
      { title: 'The Lifestyle Creep', desc: 'Raising your spending matches every time your salary increases, halting savings.' },
      { title: 'Guilt Spending', desc: 'Failing to build a balanced budget, making every discretionary purchase feel shameful.' }
    ],
    faqs: [
      { question: 'What is loss aversion?', answer: 'A cognitive bias where the pain of losing money is twice as powerful as the joy of gaining the same amount.' },
      { question: 'How can I increase saving friction?', answer: 'Remove saved credit cards from your browser to give your logical brain time to evaluate orders.' }
    ],
    related: ['budgeting', 'saving', 'credit-cards']
  },
  banking: {
    title: 'Banking',
    description: 'Compare online vs. traditional banks. Find high APY checking and savings accounts.',
    icon: '🏦',
    color: 'bg-sky-50/80 text-sky-700',
    textColor: 'text-sky-900',
    borderColor: 'border-sky-100',
    overview: 'Optimizing your banking hub secures FDIC protections and ensures you are paid competitive interest rates on deposit balances.',
    whoItHelps: [
      'Savers seeking high-yield deposit accounts.',
      'Consumers looking to eliminate banking fees.',
      'Anyone comparing checking interest perks.'
    ],
    roadmap: [
      { step: '1', title: 'Compare APYs', desc: 'Look for online bank rates yielding 4.00%-5.25% APY.' },
      { step: '2', title: 'Verify FDIC Status', desc: 'Confirm bank membership with the FDIC database.' },
      { step: '3', title: 'Automate Checking Hubs', desc: 'Configure direct deposit routing to deposit cash directly into savings.' }
    ],
    mistakes: [
      { title: 'Paying Monthly Fees', desc: 'Keeping accounts that charge monthly maintenance fees when fee-free alternatives exist.' },
      { title: 'Overdraft Protection Traps', desc: 'Enrolling in expensive bank overdraft features that trigger fee penalties.' }
    ],
    faqs: [
      { question: 'Are online banks safe?', answer: 'Yes, as long as the online bank is FDIC-insured, protecting deposits up to $250,000.' },
      { question: 'How long does a bank transfer take?', answer: 'Electronic transfer between banks typically takes 1 to 3 business days.' }
    ],
    related: ['saving', 'budgeting', 'loans']
  },
  insurance: {
    title: 'Insurance',
    description: 'Compare term and whole life insurance, auto premiums, and health policies.',
    icon: '🛡️',
    color: 'bg-emerald-50/80 text-emerald-700',
    textColor: 'text-emerald-900',
    borderColor: 'border-emerald-100',
    overview: 'Insurance preserves your net worth by transferring catastrophic risks to providers. Choosing cost-effective policies protects your investments.',
    whoItHelps: [
      'Parents wanting to compare life insurance policies.',
      'Drivers trying to lower auto insurance costs.',
      'Homeowners auditing coverage terms.'
    ],
    roadmap: [
      { step: '1', title: 'Identify Risks', desc: 'Determine liabilities requiring coverage (health, auto, home, dependents).' },
      { step: '2', title: 'Buy Term Life', desc: 'Choose affordable term life insurance over complex whole-life policies.' },
      { step: '3', title: 'Bundle Policies', desc: 'Bundle auto and home insurance for immediate premium discounts.' }
    ],
    mistakes: [
      { title: 'Buying Whole Life', desc: 'Purchasing whole life insurance under the assumption it is a good investment, when fees are high.' },
      { title: 'Under-insuring Assets', desc: 'Choosing low liability limits on auto policies to save $10 monthly, risking lawsuit exposure.' }
    ],
    faqs: [
      { question: 'What is term life insurance?', answer: 'A simple policy that pays beneficiaries if you pass away during a set term (e.g. 20 years).' },
      { question: 'Should I raise my deductible?', answer: 'Raising your deductible lowers monthly premiums, but you must keep cash in your emergency fund to cover it.' }
    ],
    related: ['planning', 'saving', 'loans']
  },
  loans: {
    title: 'Loans',
    description: 'Compare personal loans, interest rates, auto terms, and loan terms.',
    icon: '💵',
    color: 'bg-amber-50/80 text-amber-700',
    textColor: 'text-amber-900',
    borderColor: 'border-amber-100',
    overview: 'Borrowing responsibly requires comparing interest rates, checking amortization schedules, and checking total lifetime borrowing costs.',
    whoItHelps: [
      'Borrowers looking for personal financing solutions.',
      'Car shoppers evaluating financing limits.',
      'Savers comparing credit union loan options.'
    ],
    roadmap: [
      { step: '1', title: 'Check Credit Score', desc: 'Review your credit report before applying to ensure the best rates.' },
      { step: '2', title: 'Compare APRs', desc: 'Get loan quotes from multiple banks and local credit unions.' },
      { step: '3', title: 'Analyze Total Cost', desc: 'Evaluate the lifetime interest charges, not just the monthly loan payment.' }
    ],
    mistakes: [
      { title: 'Ignoring the APR', desc: 'Focusing on the monthly bill size while ignoring high interest rates that double total cost.' },
      { title: 'Borrowing for Consumables', desc: 'Taking out personal loans to fund travel, shopping, or clothing purchases.' }
    ],
    faqs: [
      { question: 'What is the difference between interest rate and APR?', answer: 'The interest rate is the base cost, while APR factors in upfront origination and processing fees.' },
      { question: 'Can I pay off personal loans early?', answer: 'Most reputable lenders have zero prepayment penalties, but verify the loan terms first.' }
    ],
    related: ['debt', 'credit', 'auto']
  },
  taxes: {
    title: 'Taxes',
    description: 'Simplify your annual tax return, evaluate software, and optimize deductions.',
    icon: '📄',
    color: 'bg-emerald-50/80 text-emerald-700',
    textColor: 'text-emerald-900',
    borderColor: 'border-emerald-100',
    overview: 'Strategic tax planning involves maximizing write-offs, utilizing standard deductions, and taking advantage of pre-tax accounts.',
    whoItHelps: [
      'Individuals preparing their annual tax filings.',
      'Savers looking for deductible retirement adjustments.',
      'Self-employed workers paying estimated taxes.'
    ],
    roadmap: [
      { step: '1', title: 'Organize W-2s & 1099s', desc: 'Consolidate income files, bank statements, and donation logs.' },
      { step: '2', title: 'Max Deductibles', desc: 'Make traditional 401(k), IRA, or HSA contributions before tax deadlines.' },
      { step: '3', title: 'Compare Software', desc: 'Select low-cost, IRS-vetted tax filing platforms.' }
    ],
    mistakes: [
      { title: 'Missing Deductions', desc: 'Failing to track eligible donations, home office usage, or student interest lines.' },
      { title: 'Underpaying Estimated Tax', desc: 'For freelancers: failing to submit quarterly estimates, leading to IRS penalties.' }
    ],
    faqs: [
      { question: 'What is the standard deduction?', answer: 'A fixed dollar amount that reduces your taxable income, varying by filing status.' },
      { question: 'When is the tax contribution deadline?', answer: 'You generally have until the April filing deadline of the following year to make IRA contributions.' }
    ],
    related: ['retirement', 'investing', 'planning']
  },
  'credit-cards': {
    title: 'Credit Cards',
    description: 'Compare cashback rewards, travel points, and balance transfer credit cards.',
    icon: '💳',
    color: 'bg-cyan-50/80 text-cyan-700',
    textColor: 'text-cyan-900',
    borderColor: 'border-cyan-100',
    overview: 'Credit cards are tools of efficiency when paid in full monthly. Using cash back multipliers and points programs rewards your normal spending.',
    whoItHelps: [
      'Consumers looking to optimize rewards points.',
      'Travelers seeking premium lounge and insurance perks.',
      'Borrowers needing 0% APR balance transfer options.'
    ],
    roadmap: [
      { step: '1', title: 'Audit Categories', desc: 'Identify where you spend the most (groceries, gas, travel).' },
      { step: '2', title: 'Match Cards to Multipliers', desc: 'Select cards offering 3-6% cash back on your top categories.' },
      { step: '3', title: 'Automate Full Payments', desc: 'Set up auto-pay to settle the statement balance to avoid interest charges.' }
    ],
    mistakes: [
      { title: 'Carrying Balances for Points', desc: 'Failing to realize that paying 22% APR interest completely wipes out any 2% rewards points.' },
      { title: 'Paying Idle Annual Fees', desc: 'Keeping cards with high annual fees when the credits do not offset the cost.' }
    ],
    faqs: [
      { question: 'Will opening a credit card hurt my score?', answer: 'It triggers a minor, temporary drop due to a hard inquiry, but builds your score long-term by expanding available credit.' },
      { question: 'What is statement balance vs total balance?', answer: 'Statement balance is the amount owed for the billing cycle; pay this in full by the due date to pay zero interest.' }
    ],
    related: ['credit', 'debt', 'banking']
  }
}

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  const categoriesFromPosts = [...new Set(posts.map((post) => post.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')))]
  const allSlugs = [...new Set([...Object.keys(categoryDatabase), ...categoriesFromPosts])]
  return allSlugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params.slug.toLowerCase()
  const info = categoryDatabase[slug] || categoryDatabase[slug.replace(/-/g, ' ')]
  
  if (!info) {
    return { title: 'Category Not Found | SmartMoneyPath' }
  }
  
  const canonicalUrl = `${SITE_URL}/categories/${slug}`
  return {
    title: `${info.title} Research & Guides | SmartMoneyPath`,
    description: info.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${info.title} | Financial Education Library`,
      description: info.description,
      url: canonicalUrl,
      siteName: 'SmartMoneyPath',
      type: 'website',
    },
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const slug = params.slug.toLowerCase()
  const info = categoryDatabase[slug]
  
  if (!info) {
    notFound()
  }

  const posts = await getPostsByCategory(slug)

  // Sort/filter posts to get Featured vs Popular
  const featuredPosts = posts.slice(0, 2)
  const popularPosts = posts.slice(2, 6)

  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Topics', url: `${SITE_URL}/categories` },
    { name: info.title, url: `${SITE_URL}/categories/${slug}` },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <BreadcrumbSchema items={breadcrumbItems} />
      {info.faqs.length > 0 && <FAQSchema questions={info.faqs} />}

      {/* Hero Section */}
      <section className="bg-secondary-50 pt-32 pb-20 relative overflow-hidden border-b border-secondary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="text-5xl mb-6">{info.icon}</div>
            <h1 className="text-4xl md:text-6xl font-black text-secondary-900 mb-6 tracking-tight">
              {info.title} <span className="text-primary-700">Guides</span>
            </h1>
            <p className="text-xl text-secondary-600 leading-relaxed font-semibold max-w-3xl">
              {info.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="bg-white text-secondary-900 border border-secondary-200 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">
                {posts.length} {posts.length === 1 ? 'Research Guide' : 'Research Guides'}
              </span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-600 rounded-full blur-[160px]"></div>
        </div>
      </section>

      {/* Overview & Who it helps */}
      <section className="py-20 bg-white border-b border-secondary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl md:text-3xl font-black text-secondary-900 flex items-center gap-2">
                <Info className="h-5 w-5 text-primary-600" />
                Category Overview
              </h2>
              <p className="text-base text-secondary-700 leading-relaxed font-semibold bg-secondary-50 p-6 rounded-3xl border border-secondary-100">
                {info.overview}
              </p>
            </div>
            
            <div className="lg:col-span-5 bg-secondary-950 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-black mb-6 flex items-center gap-2 text-primary-400">
                  <ShieldCheck className="h-5 w-5" /> Who this helps:
                </h3>
                <ul className="space-y-4">
                  {info.whoItHelps.map((persona, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-primary-400 shrink-0 mt-0.5" />
                      <span className="font-semibold text-secondary-200">{persona}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap & Mistakes */}
      <section className="py-20 bg-secondary-50 border-b border-secondary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Beginner Roadmap */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl md:text-3xl font-black text-secondary-900 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary-600" />
                Beginner Roadmap
              </h2>
              <div className="space-y-4">
                {info.roadmap.map((step, i) => (
                  <div key={i} className="bg-white border border-secondary-200 p-6 rounded-2xl flex gap-4 items-start shadow-sm hover:border-primary-200 transition-colors">
                    <span className="bg-primary-600 text-white font-black text-sm w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                      {step.step}
                    </span>
                    <div>
                      <h4 className="font-black text-secondary-900 mb-1 text-base">{step.title}</h4>
                      <p className="text-sm text-secondary-600 font-semibold">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-2xl md:text-3xl font-black text-secondary-900 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Common Mistakes to Avoid
              </h2>
              <div className="space-y-4">
                {info.mistakes.map((mistake, i) => (
                  <div key={i} className="bg-red-50/50 border border-red-200 p-6 rounded-2xl flex gap-3 items-start">
                    <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-black text-red-950 mb-1 text-sm">{mistake.title}</h4>
                      <p className="text-xs text-red-900 font-semibold">{mistake.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      {posts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-4xl font-black text-secondary-900 mb-12 tracking-tight flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary-600" />
              Featured Research & Popular Guides
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-20 bg-secondary-50 border-t border-secondary-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-secondary-900 mb-10 text-center flex items-center justify-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary-600" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {info.faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-secondary-200 p-6 rounded-2xl shadow-sm">
                <h4 className="font-black text-secondary-900 text-base mb-2">{faq.question}</h4>
                <p className="text-sm text-secondary-600 font-semibold leading-relaxed mb-0">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Categories Navigation */}
      <section className="py-12 bg-white border-t border-secondary-100 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h4 className="text-xs font-black uppercase text-secondary-400 tracking-wider mb-6">Related financial pillars:</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {info.related.map((relSlug) => {
              const relInfo = categoryDatabase[relSlug]
              if (!relInfo) return null
              return (
                <Link
                  key={relSlug}
                  href={`/categories/${relSlug}`}
                  className="px-5 py-2.5 rounded-xl bg-secondary-50 text-secondary-700 text-xs font-black uppercase tracking-wider hover:bg-primary-600 hover:text-white transition-all shadow-sm"
                >
                  {relInfo.title} guides →
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-secondary-900 relative overflow-hidden text-white">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
             <Mail className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-3xl font-black mb-4 tracking-tight">Smarter Money Decisions Start Here</h2>
          <p className="text-primary-100 text-base mb-8 max-w-lg mx-auto font-medium">
            Join 45,000+ readers who receive our data-driven worksheets, calculators, and regulatory updates directly in their inbox.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-secondary-900 px-8 py-3.5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-secondary-50 transition-all shadow-xl"
          >
            Join SmartMoneyPath <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-600 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
      </section>

      <Footer />
    </main>
  )
}
