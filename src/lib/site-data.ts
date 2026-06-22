/**
 * Habari Leo — Static content layer
 * --------------------------------------------------------------------------
 * All site data is colocated here so pages stay declarative and easy to
 * maintain. In a production app, swap this for a CMS/DB; the shape mirrors
 * what an API would return.
 */

import heroNairobi from "@/assets/hero-nairobi.jpg";
import imgPolitics from "@/assets/article-politics.jpg";
import imgBusiness from "@/assets/article-business.jpg";
import imgTech from "@/assets/article-tech.jpg";
import imgHealth from "@/assets/article-health.jpg";
import imgEntertainment from "@/assets/article-entertainment.jpg";
import imgSports from "@/assets/article-sports.jpg";
import imgAgri from "@/assets/article-agri.jpg";

export const SITE = {
  name: "Habari Leo",
  tagline: "Kenya's pulse, in real time.",
  description:
    "Habari Leo is a leading Kenyan digital newsroom covering politics, business, technology, health, sports and entertainment from Nairobi and beyond.",
  email: "newsroom@habarileo.co.ke",
  phone: "+254 700 000 000",
  address: "Westlands Office Park, 3rd Floor, Waiyaki Way, Nairobi",
  social: {
    facebook: "https://facebook.com/",
    twitter: "https://x.com/",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    youtube: "https://youtube.com/",
  },
} as const;

export type CategorySlug =
  | "news"
  | "politics"
  | "business"
  | "technology"
  | "health"
  | "entertainment"
  | "sports";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  accent: "brand" | "aqua" | "orange";
}

export const CATEGORIES: Category[] = [
  { slug: "news", name: "News", description: "Top headlines and breaking stories from across Kenya and East Africa.", accent: "brand" },
  { slug: "politics", name: "Politics", description: "Parliament, county governments, parties and policy that shape the nation.", accent: "orange" },
  { slug: "business", name: "Business", description: "Markets, banking, SMEs and the East African economy.", accent: "aqua" },
  { slug: "technology", name: "Technology", description: "Startups, fintech, mobile money and innovation across the continent.", accent: "aqua" },
  { slug: "health", name: "Health", description: "Public health, hospitals, wellness and medical research.", accent: "brand" },
  { slug: "entertainment", name: "Entertainment", description: "Music, film, celebrity news and the East African creative scene.", accent: "orange" },
  { slug: "sports", name: "Sports", description: "Football, athletics, rugby and Kenyan champions on the world stage.", accent: "orange" },
];

export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  initials: string;
  twitter?: string;
  linkedin?: string;
}

export const AUTHORS: Author[] = [
  {
    slug: "amina-otieno",
    name: "Amina Otieno",
    role: "Senior Political Correspondent",
    bio: "Amina has covered Kenyan politics for over twelve years, reporting from parliament, State House and every general election since 2013. She holds a Master's in Journalism from the University of Nairobi.",
    expertise: ["Politics", "Governance", "Elections"],
    initials: "AO",
    twitter: "https://x.com/",
    linkedin: "https://linkedin.com/",
  },
  {
    slug: "brian-kimani",
    name: "Brian Kimani",
    role: "Business Editor",
    bio: "Brian leads the business desk and previously worked at the Nairobi Securities Exchange. He writes weekly on banking, fintech and SME growth.",
    expertise: ["Banking", "Markets", "Macroeconomics"],
    initials: "BK",
    twitter: "https://x.com/",
  },
  {
    slug: "wanjiru-mwangi",
    name: "Wanjiru Mwangi",
    role: "Technology Reporter",
    bio: "Wanjiru tracks Africa's startup ecosystem from Konza to Lagos. She was a 2023 Africa Tech Journalism Fellow.",
    expertise: ["Startups", "Fintech", "AI"],
    initials: "WM",
    linkedin: "https://linkedin.com/",
  },
  {
    slug: "daniel-mutua",
    name: "Daniel Mutua",
    role: "Sports Editor",
    bio: "Daniel has reported on Harambee Stars, the Kenyan Premier League and three Olympic Games. He co-hosts the weekly Touchline podcast.",
    expertise: ["Football", "Athletics", "Rugby"],
    initials: "DM",
    twitter: "https://x.com/",
  },
  {
    slug: "njeri-kariuki",
    name: "Dr. Njeri Kariuki",
    role: "Health Correspondent",
    bio: "A medical doctor turned journalist, Njeri translates clinical research and public health policy into stories Kenyans can use.",
    expertise: ["Public Health", "Maternal Care", "Policy"],
    initials: "NK",
  },
  {
    slug: "kevin-omondi",
    name: "Kevin Omondi",
    role: "Entertainment Editor",
    bio: "Kevin profiles East Africa's biggest artists and runs our weekly culture newsletter, The Loop.",
    expertise: ["Music", "Film", "Culture"],
    initials: "KO",
    twitter: "https://x.com/",
  },
];

export const getAuthor = (slug: string) => AUTHORS.find((a) => a.slug === slug)!;

export interface Comment {
  id: string;
  name: string;
  initials: string;
  date: string;
  body: string;
  replies?: Omit<Comment, "replies">[];
}

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  category: CategorySlug;
  authorSlug: string;
  publishedAt: string; // ISO date
  readingMinutes: number;
  image: string;
  imageAlt: string;
  tags: string[];
  excerpt: string;
  body: string[]; // paragraphs (markdown-lite: ## h2, > quote, - list)
  featured?: boolean;
  trending?: boolean;
  editorsPick?: boolean;
  views: number;
  comments: Comment[];
}

/** Shared realistic discussion threads (referenced by article slug). */
const c = (
  name: string,
  initials: string,
  date: string,
  body: string,
  replies?: Omit<Comment, "replies">[],
): Comment => ({ id: `${initials}-${date}-${name}`.replace(/\s+/g, ""), name, initials, date, body, replies });

const COMMENTS_POLITICS_1: Comment[] = [
  c("James Mwangi", "JM", "2 hours ago",
    "This budget speech finally addresses the cost of living, but the devil is in the implementation. We have heard similar promises before. Treasury must publish quarterly performance reports so wananchi can hold them accountable.",
    [
      c("Faith Wairimu", "FW", "1 hour ago",
        "Agreed. Without transparent dashboards from KRA and the Controller of Budget, these figures remain political theatre."),
    ]),
  c("Peter Odhiambo", "PO", "3 hours ago",
    "The proposed VAT reduction on cooking gas is welcome, but small traders in Gikomba still pay county levies that quietly erase any savings. Devolution needs the same scrutiny."),
  c("Grace Mutindi", "GM", "4 hours ago",
    "What struck me was the silence on the wage bill. You cannot promise tax relief while expanding the executive. Numbers must add up."),
  c("Samuel Kiprop", "SK", "5 hours ago",
    "Good analysis. I would have liked more on agriculture subsidies — the maize farmer in Trans Nzoia is still waiting for last season's payment."),
  c("Linet Achieng", "LA", "Yesterday",
    "Excellent piece. Please do a follow up on how the proposed measures affect women-led SMEs."),
];

const COMMENTS_BUSINESS_1: Comment[] = [
  c("Daniel Mwaura", "DM", "1 hour ago",
    "The NSE 20 share index rebound is encouraging, but retail investors are still nursing losses from 2022. Banks need to publish clearer dividend forecasts.",
    [
      c("Ruth Atieno", "RA", "45 minutes ago",
        "True. Equity and KCB have been transparent, but smaller counters remain opaque. We need better investor relations across the board."),
    ]),
  c("Michael Otieno", "MO", "3 hours ago",
    "Mobile money interoperability has saved my business in Kisumu thousands in transaction fees. The CBK deserves credit for pushing this through."),
  c("Hellen Kimotho", "HK", "5 hours ago",
    "Inflation numbers feel kinder than what we see at the supermarket. KNBS basket needs updating to reflect actual urban household spending."),
  c("Joseph Maina", "JM", "Yesterday",
    "Insightful. A piece on private equity activity in agritech would be welcome — there is a lot moving quietly in that space."),
];

const COMMENTS_TECH_1: Comment[] = [
  c("Brenda Nyambura", "BN", "30 minutes ago",
    "Konza is finally showing tangible progress. The real test is whether universities can supply enough engineering talent to keep the data centres staffed."),
  c("Tony Kariuki", "TK", "2 hours ago",
    "M-PESA's API revamp is a quiet game changer for developers. I migrated three integrations in a weekend.",
    [
      c("Eric Wafula", "EW", "1 hour ago",
        "Same here. The new sandbox is finally usable. Hopefully Safaricom keeps the developer portal updated this time."),
    ]),
  c("Cynthia Mwende", "CM", "4 hours ago",
    "Great context on the funding slowdown. African founders are learning to build leaner, which will pay off long term."),
  c("Brian Otieno", "BO", "Yesterday",
    "Would love a deep dive on Kenya's cybersecurity posture — banking fraud has surged in the last quarter."),
];

const COMMENTS_HEALTH_1: Comment[] = [
  c("Mary Wanjiku", "MW", "1 hour ago",
    "Universal health coverage cannot succeed without strengthening referral hospitals. Level 4 facilities are overwhelmed."),
  c("Dr. Allan Kiprono", "AK", "3 hours ago",
    "As a clinician in Eldoret, I can confirm that the new digital records system is reducing duplicate tests. Slow rollout, but it works.",
    [
      c("Joyce Mumbi", "JM", "2 hours ago",
        "That is encouraging. Hopefully the system extends to community health volunteers soon."),
    ]),
  c("Patrick Njoroge", "PN", "5 hours ago",
    "We also need to talk about mental health funding. It remains less than 1% of the national health budget."),
  c("Sharon Akinyi", "SA", "Yesterday",
    "Excellent reporting. Maternal mortality stats in Kilifi deserve their own feature."),
];

const COMMENTS_SPORTS_1: Comment[] = [
  c("Felix Onyango", "FO", "20 minutes ago",
    "Harambee Stars finally showing tactical discipline. The new coach's pressing system is paying off."),
  c("Maureen Chebet", "MC", "2 hours ago",
    "Faith Kipyegon is rewriting the record books. Kenya should invest more in junior athletics academies to sustain this golden generation.",
    [
      c("Eliud Kiptanui", "EK", "1 hour ago",
        "Agreed. We need a proper national training centre in Iten with modern sports science facilities."),
    ]),
  c("Brian Wekesa", "BW", "4 hours ago",
    "Kenyan rugby sevens deserves more sponsorship. The Shujaa are punching above their weight on a shoestring budget."),
  c("Anne Wairimu", "AW", "Yesterday",
    "Please cover the women's volleyball league more. Malkia Strikers are a story in themselves."),
];

const COMMENTS_ENT_1: Comment[] = [
  c("Kelvin Mwangi", "KM", "1 hour ago",
    "Sauti Sol's solo projects are showing how much depth that group had. Bien's album is on repeat in my car."),
  c("Diana Achieng", "DA", "3 hours ago",
    "Kenyan film is finally getting international platforms. We need more incentives for local production though.",
    [
      c("Mark Otieno", "MO", "2 hours ago",
        "Yes — the Kenya Film Commission tax rebate is a good start but the application process is still bureaucratic."),
    ]),
  c("Pauline Njeri", "PN", "5 hours ago",
    "Great profile. Would love to read more about emerging gengetone artists too."),
  c("Victor Kiplagat", "VK", "Yesterday",
    "The Nairobi comedy scene is thriving. Churchill Show alumni are crushing it on streaming platforms."),
];

const ARTICLES_DATA: Article[] = [
  // ============================== POLITICS =================================
  {
    slug: "treasury-unveils-cost-of-living-relief-package",
    title: "Treasury unveils Sh120 billion cost-of-living relief package",
    subtitle:
      "The Cabinet Secretary outlined targeted subsidies on fuel, cooking gas and unga, alongside new tax bands aimed at low-income earners.",
    category: "politics",
    authorSlug: "amina-otieno",
    publishedAt: "2026-06-21T07:30:00Z",
    readingMinutes: 7,
    image: imgPolitics,
    imageAlt: "Parliament Buildings in Nairobi under a dramatic sky.",
    tags: ["Treasury", "Budget", "Cost of Living", "Parliament"],
    excerpt:
      "The package, the largest fiscal intervention since 2020, will be financed through a mix of expenditure cuts and a renegotiated IMF facility.",
    featured: true,
    trending: true,
    editorsPick: true,
    views: 18432,
    comments: COMMENTS_POLITICS_1,
    body: [
      "Treasury Cabinet Secretary unveiled a Sh120 billion cost-of-living relief package on Friday morning, framing it as the government's most ambitious fiscal intervention since the pandemic. The measures, tabled in Parliament shortly after the budget speech, will run for an initial period of twelve months and target households earning below Sh50,000 per month.",
      "Speaking at the National Treasury building in Nairobi, the CS said the package combines targeted subsidies, tax relief for low-income earners and a fresh round of cash transfers to vulnerable groups. The funding will be drawn from a combination of expenditure cuts, ringfenced KRA collections and a renegotiated facility with the International Monetary Fund.",
      "## What the package includes",
      "The headline measures include a Sh17 per litre reduction in the pump price of petrol and diesel, a halving of VAT on cooking gas from 16% to 8%, and the removal of import duty on essential pharmaceuticals. Maize flour will receive a temporary subsidy of Sh20 per two-kilogramme packet through a transparent voucher system that bypasses millers.",
      "On taxation, the CS announced a new PAYE band that exempts the first Sh30,000 of monthly income from tax, up from Sh24,000. The move is expected to lift the take-home pay of roughly 2.4 million Kenyan workers by an average of Sh2,800 per month.",
      "> Our calculations show this package will reduce the household cost of a typical urban basket by 11.4% within the first quarter of implementation, the CS told MPs.",
      "## Reaction from the opposition and civil society",
      "The opposition cautiously welcomed the announcement but warned that the figures presented to Parliament did not fully reconcile with the medium-term debt strategy paper. The Institute of Public Finance noted that the package would push the fiscal deficit to 5.4% of GDP unless matched by credible expenditure cuts elsewhere.",
      "Civil society organisations, including the Kenya Human Rights Commission, urged the government to publish quarterly implementation dashboards and route the cash transfers through M-PESA to minimise leakage. The Consumer Federation of Kenya called for an independent monitoring committee with representation from county governments.",
      "## What happens next",
      "Parliament's Finance Committee will scrutinise the proposals over the next three weeks before a final vote on the Finance Bill. The Treasury said the first tranche of subsidies will take effect within thirty days of presidential assent, with the new PAYE bands kicking in from the August payroll cycle.",
      "Analysts at Stanbic Bank described the package as 'fiscally significant but politically inevitable', noting that inflation has eroded household purchasing power for seven consecutive quarters. Whether the measures translate into real relief at the supermarket counter will depend, they argued, on the discipline of implementation.",
    ],
  },
  {
    slug: "senate-passes-county-revenue-allocation-bill",
    title: "Senate passes contested County Revenue Allocation Bill",
    subtitle: "After three months of horse trading, senators agreed on a Sh407 billion equitable share for the 47 counties.",
    category: "politics",
    authorSlug: "amina-otieno",
    publishedAt: "2026-06-19T14:10:00Z",
    readingMinutes: 5,
    image: imgPolitics,
    imageAlt: "Senators in session at the Kenyan parliament.",
    tags: ["Senate", "Devolution", "Counties"],
    excerpt: "The compromise formula favours arid and semi-arid counties while preserving allocations for urban authorities.",
    trending: true,
    views: 9132,
    comments: COMMENTS_POLITICS_1.slice(0, 4),
    body: [
      "The Senate on Wednesday evening passed the County Revenue Allocation Bill 2026 after a marathon session that stretched past midnight. The bill apportions Sh407 billion as the equitable share for the 47 counties, a Sh22 billion increase over the previous financial year.",
      "The compromise formula, hammered out by the Finance Committee, places greater weight on poverty index and land area while preserving urban allocations for Nairobi, Mombasa and Kisumu. Senators from arid and semi-arid counties, who had threatened to block the bill, secured an additional Sh11 billion for drought response.",
      "## A delicate balance",
      "Council of Governors chair welcomed the outcome, noting that the formula 'finally recognises the unique service delivery costs of pastoral counties'. However, governors from urban counties warned that the new weights could erode their capacity to maintain critical infrastructure.",
      "The bill now proceeds to the National Assembly for concurrence. If passed without amendment, the first disbursement is expected by the end of August, in time for the new financial year.",
      "Devolution remains one of the success stories of the 2010 constitution, but recurring delays in disbursement have left county workers unpaid for months at a time. The new bill includes a clause penalising the Treasury for late releases — a provision senators called 'long overdue'.",
    ],
  },
  {
    slug: "iebc-launches-2027-voter-registration-drive",
    title: "IEBC launches ambitious 2027 voter registration drive",
    subtitle: "The commission targets four million new voters, with a particular focus on youth and the diaspora.",
    category: "politics",
    authorSlug: "amina-otieno",
    publishedAt: "2026-06-17T09:00:00Z",
    readingMinutes: 4,
    image: imgPolitics,
    imageAlt: "Voter registration banners outside a Kenyan polling station.",
    tags: ["IEBC", "Elections", "Youth"],
    excerpt: "Mobile registration units will visit all 290 constituencies, while a new app will streamline diaspora registration.",
    views: 6422,
    comments: COMMENTS_POLITICS_1.slice(0, 3),
    body: [
      "The Independent Electoral and Boundaries Commission on Monday launched a continuous voter registration drive targeting four million new voters ahead of the 2027 general election. The exercise will run for an initial period of ninety days and prioritise youth, women and Kenyans in the diaspora.",
      "Mobile registration units will visit all 290 constituencies, while a new mobile application will allow Kenyans in the diaspora to begin registration online before completing biometric capture at consular offices. The IEBC chair said the commission had earmarked Sh2.1 billion for the exercise.",
      "## A youth turnout problem",
      "Despite Kenya's young population, voter turnout among under-35s has declined in successive elections. The IEBC has partnered with universities, TVET institutions and youth-focused civil society organisations to reverse the trend.",
      "Analysts welcomed the renewed focus on the diaspora, a constituency that has historically been underserved. Over five million Kenyans live abroad, but fewer than 12,000 voted in the last election.",
    ],
  },
  // ============================== BUSINESS =================================
  {
    slug: "nse-20-rebounds-to-12-month-high",
    title: "NSE 20 rebounds to a 12-month high as banking stocks rally",
    subtitle: "Equity Group and KCB led the surge, lifting the index past the 2,000 mark for the first time since June 2025.",
    category: "business",
    authorSlug: "brian-kimani",
    publishedAt: "2026-06-21T11:00:00Z",
    readingMinutes: 6,
    image: imgBusiness,
    imageAlt: "Glass skyscrapers in the Nairobi business district at sunset.",
    tags: ["NSE", "Banking", "Markets"],
    excerpt: "Foreign investor inflows of Sh4.3 billion in a single week signalled renewed confidence in Kenyan equities.",
    featured: true,
    trending: true,
    editorsPick: true,
    views: 12044,
    comments: COMMENTS_BUSINESS_1,
    body: [
      "The Nairobi Securities Exchange 20 share index closed Friday at 2,041 points, its highest level in twelve months, as banking stocks rallied on the back of strong half-year earnings guidance from Equity Group and KCB.",
      "Foreign investors were net buyers for the fifth consecutive week, ploughing Sh4.3 billion into Kenyan equities in the seven days to Friday. The shilling, which has steadied at 128 to the US dollar, has reduced currency risk for offshore portfolios.",
      "## What is driving the rally",
      "Three factors are powering the rebound. First, banking sector profitability has surprised on the upside, with net interest margins widening as deposit costs eased. Second, the Central Bank's signalled rate cuts have triggered a rotation from money market funds into dividend-paying equities. Third, Treasury's fiscal consolidation plan has reassured ratings agencies, narrowing Kenya's sovereign spread by 80 basis points.",
      "> The market is finally pricing in the structural reforms of the past eighteen months, said a portfolio manager at a leading asset management firm in Westlands.",
      "## Risks ahead",
      "Analysts cautioned that the rally remains narrow, concentrated in five large-cap counters. Mid and small-cap stocks have lagged, and trading volumes outside the top ten counters remain anaemic. A sharper-than-expected drought, geopolitical disruption to fuel prices, or fiscal slippage could quickly reverse sentiment.",
      "Retail investors, who account for less than 12% of NSE turnover, have largely sat out the rebound. The Capital Markets Authority is finalising a new framework to onboard mobile-first retail investors, with a public consultation expected next month.",
    ],
  },
  {
    slug: "central-bank-holds-rate-signals-easing",
    title: "Central Bank holds policy rate but signals easing cycle ahead",
    subtitle: "The Monetary Policy Committee retained the benchmark rate at 11.25%, with markets pricing in two cuts before December.",
    category: "business",
    authorSlug: "brian-kimani",
    publishedAt: "2026-06-18T15:45:00Z",
    readingMinutes: 4,
    image: imgBusiness,
    imageAlt: "Central Bank of Kenya headquarters.",
    tags: ["CBK", "Monetary Policy", "Inflation"],
    excerpt: "Headline inflation eased to 5.1%, bringing the MPC closer to its target band for the first time in eighteen months.",
    trending: true,
    views: 7831,
    comments: COMMENTS_BUSINESS_1.slice(0, 3),
    body: [
      "The Central Bank of Kenya's Monetary Policy Committee on Tuesday held the benchmark policy rate at 11.25% but signalled the start of an easing cycle, citing the steady decline in headline inflation and improved external balance.",
      "Headline inflation eased to 5.1% in May, the lowest in nineteen months, and within the CBK's 2.5% to 7.5% target band. Food inflation has moderated as the long rains delivered above-average maize and beans harvests in the western and rift valley regions.",
      "## Markets price in cuts",
      "Money market futures are now pricing in two 25 basis point cuts before the end of the year, with the first widely expected at the August MPC meeting. The yield on the 91-day Treasury bill has already dropped to 8.9%, its lowest since August 2024.",
      "Banks will likely begin to reprice loan books in the third quarter, providing modest relief to households and SMEs whose debt service costs have squeezed disposable income for two years running.",
    ],
  },
  {
    slug: "kenyan-exports-to-eac-hit-record",
    title: "Kenyan exports to the EAC hit a record Sh412 billion",
    subtitle: "Manufactured goods and processed agricultural products led the surge, driven by a stronger Tanzanian shilling.",
    category: "business",
    authorSlug: "brian-kimani",
    publishedAt: "2026-06-15T08:30:00Z",
    readingMinutes: 5,
    image: imgAgri,
    imageAlt: "Tea pickers harvesting on a Kenyan plantation.",
    tags: ["EAC", "Exports", "Manufacturing"],
    excerpt: "The trade balance with the East African Community swung firmly in Kenya's favour for the first time since 2019.",
    editorsPick: true,
    views: 5210,
    comments: COMMENTS_BUSINESS_1.slice(0, 4),
    body: [
      "Kenya's exports to the East African Community hit a record Sh412 billion in the twelve months to April, official data released by the Kenya National Bureau of Statistics on Wednesday showed. Manufactured goods accounted for 38% of the total, with processed agricultural products contributing a further 27%.",
      "Tanzania overtook Uganda as Kenya's largest regional trading partner, helped by the stronger Tanzanian shilling and easing of non-tariff barriers at the Namanga and Holili border posts. The trade balance with the EAC swung firmly into surplus for the first time since 2019.",
      "## Manufacturers welcome the figures",
      "The Kenya Association of Manufacturers said the data validated investments in plant modernisation and the EAC harmonised standards regime. The lobby called on the government to accelerate the Standard Gauge Railway extension to Malaba to further reduce logistics costs.",
      "Tea, coffee and processed avocado exports also posted double-digit growth, lifting earnings for smallholder farmers. The Agriculture and Food Authority said producer prices for tea at the Mombasa auction had risen 18% year-on-year.",
    ],
  },
  // ============================ TECHNOLOGY =================================
  {
    slug: "konza-techno-city-opens-first-data-centre",
    title: "Konza Techno City opens its first hyperscale data centre",
    subtitle: "The $250 million facility, backed by a consortium of investors, marks a turning point for Kenya's cloud ambitions.",
    category: "technology",
    authorSlug: "wanjiru-mwangi",
    publishedAt: "2026-06-20T10:00:00Z",
    readingMinutes: 6,
    image: imgTech,
    imageAlt: "Young African developers working on laptops in a modern Nairobi office.",
    tags: ["Konza", "Cloud", "Infrastructure"],
    excerpt: "The Tier III certified centre will host government workloads, regional fintech players and AI training infrastructure.",
    featured: true,
    trending: true,
    editorsPick: true,
    views: 14288,
    comments: COMMENTS_TECH_1,
    body: [
      "Konza Techno City on Thursday switched on its first hyperscale data centre, a $250 million Tier III certified facility built by a consortium of regional and international investors. The launch, attended by the President and the Cabinet Secretary for ICT, marks a significant milestone for the long-gestating smart city project located 60 kilometres south of Nairobi.",
      "The 22-megawatt facility, the largest in East and Central Africa, will host government workloads, regional fintech players and dedicated AI training infrastructure. Anchor tenants include a global hyperscale cloud provider, a leading pan-African bank and Kenya's eCitizen platform.",
      "## A long road from concept to switch-on",
      "Konza was first announced in 2008 as a Silicon Savannah modelled on Songdo in South Korea. Successive delays, financing gaps and shifting government priorities had reduced the project to a punchline in some circles. The opening of the data centre, alongside the recently inaugurated Konza Complex Phase 1, suggests the project is finally finding its footing.",
      "> This is no longer a concept. It is concrete, fibre and cooling infrastructure delivering real workloads, said the Konza Technopolis Development Authority chief executive.",
      "## Implications for African cloud",
      "Kenyan startups have long complained about latency and compliance challenges in serving local users from data centres in Frankfurt or Cape Town. The new facility, paired with submarine cable landings at Mombasa, should reduce round-trip latency to under 5 milliseconds for users in Nairobi and Mombasa.",
      "Data sovereignty has also climbed up the corporate agenda following the Data Protection Act 2019 and a series of high-profile fines for non-compliance. Local hosting reduces both legal exposure and operational risk for regulated industries.",
      "Industry analysts at Xalam estimate the East African data centre capacity will triple by 2028, with Nairobi positioning itself as the regional gateway alongside Johannesburg and Lagos. The challenge now, observers note, is matching infrastructure investment with skilled engineering talent.",
    ],
  },
  {
    slug: "mpesa-developer-api-revamp",
    title: "Safaricom unveils a developer-first overhaul of the M-PESA API",
    subtitle: "The new Daraja 3.0 platform promises a single SDK, OAuth 2.1 and a sandbox that finally mirrors production.",
    category: "technology",
    authorSlug: "wanjiru-mwangi",
    publishedAt: "2026-06-18T12:00:00Z",
    readingMinutes: 5,
    image: imgTech,
    imageAlt: "Developers collaborating on mobile money integration.",
    tags: ["M-PESA", "API", "Fintech"],
    excerpt: "After years of developer frustration, Safaricom is rebuilding the M-PESA integration experience from the ground up.",
    trending: true,
    views: 8702,
    comments: COMMENTS_TECH_1.slice(0, 4),
    body: [
      "Safaricom on Wednesday unveiled Daraja 3.0, a complete overhaul of the M-PESA developer platform that promises to address years of developer complaints. The new platform consolidates the previously fragmented STK push, B2C, C2B and reversal APIs into a single SDK with consistent error handling and OAuth 2.1 authentication.",
      "A new sandbox environment, crucially, now mirrors production behaviour, including realistic transaction timing, callback queues and edge case responses. Developers can spin up isolated merchant accounts in under two minutes via a self-service portal.",
      "## What changes for builders",
      "Daraja 3.0 introduces webhook signing using HMAC, configurable callback retry policies and a transaction simulator for testing failure modes. SDKs are available for Node.js, Python, PHP, Java and .NET, with community-maintained ports for Go and Rust.",
      "The pricing has also been simplified, with a free tier for the first 10,000 monthly transactions and transparent volume-based discounts for high-volume merchants. Existing Daraja 2 endpoints will be supported for an eighteen-month sunset period.",
      "Developer reception has been overwhelmingly positive. The launch hackathon in Westlands attracted over 600 developers, with prototypes ranging from chama savings tools to a real-time matatu fare collection system.",
    ],
  },
  {
    slug: "african-tech-funding-q2-2026",
    title: "African tech funding holds steady at $1.2 billion in Q2",
    subtitle: "Kenyan startups raised $312 million, second only to Egypt, with fintech and climate tech leading the pack.",
    category: "technology",
    authorSlug: "wanjiru-mwangi",
    publishedAt: "2026-06-14T09:30:00Z",
    readingMinutes: 4,
    image: imgTech,
    imageAlt: "Startup co-working space.",
    tags: ["Funding", "Startups", "VC"],
    excerpt: "While headline figures match Q1, mega-rounds masked a sharp decline in seed-stage activity.",
    views: 4980,
    comments: COMMENTS_TECH_1.slice(0, 3),
    body: [
      "African tech startups raised $1.2 billion in the second quarter of 2026, holding steady against a softening global venture capital backdrop, according to data compiled by Partech Africa and Briter Bridges.",
      "Kenyan startups secured $312 million across 41 deals, second only to Egypt's $341 million. Fintech accounted for 44% of Kenyan funding, followed by climate tech at 21% and logistics at 14%.",
      "## Mega-rounds mask seed-stage softness",
      "Three rounds above $50 million — including a Series C for a pan-African neobank headquartered in Nairobi — accounted for nearly half of Q2 disbursements. Strip these out and seed-stage funding fell 28% quarter-on-quarter, continuing a worrying trend for early-stage founders.",
      "Local VCs say the bar for first cheques has risen sharply. Founders are now expected to show clear unit economics, a defensible distribution channel and a realistic path to profitability within 24 months. Gone are the days of growth-at-all-costs term sheets.",
    ],
  },
  // ================================ HEALTH =================================
  {
    slug: "uhc-rollout-reaches-30-counties",
    title: "Universal Health Coverage rollout reaches 30 counties",
    subtitle: "The Ministry of Health reports 4.8 million households enrolled in the Social Health Authority since January.",
    category: "health",
    authorSlug: "njeri-kariuki",
    publishedAt: "2026-06-19T13:00:00Z",
    readingMinutes: 5,
    image: imgHealth,
    imageAlt: "A Kenyan doctor speaking with a patient in a hospital ward.",
    tags: ["UHC", "SHA", "Public Health"],
    excerpt: "Enrolment has outpaced internal targets, but referral hospitals warn that the funding model needs urgent recalibration.",
    featured: true,
    trending: true,
    views: 6843,
    comments: COMMENTS_HEALTH_1,
    body: [
      "The rollout of Universal Health Coverage has reached 30 of Kenya's 47 counties, with 4.8 million households enrolled in the Social Health Authority since the start of the year. The Ministry of Health, in a briefing to the parliamentary Health Committee on Tuesday, said enrolment had outpaced internal targets by 18%.",
      "The Cabinet Secretary attributed the strong uptake to county-level community health volunteer networks and integrations with the M-PESA platform that allow households to pay premiums in flexible monthly instalments.",
      "## Funding strain on referral hospitals",
      "However, the country's six national referral hospitals warned that the per-patient reimbursement rates under SHA are 23% below the actual cost of care for complex cases such as cancer treatment and dialysis. Without recalibration, several oncology units could face cashflow crises within the year.",
      "> We cannot promise universal coverage on the back of unsustainable reimbursement rates. The maths simply does not add up, said the CEO of one of the referral hospitals.",
      "## Encouraging primary care numbers",
      "On a more positive note, primary care utilisation has surged. Level 2 and 3 facilities in pilot counties reported 41% more visits in May compared with the same month last year, with maternal and child health services seeing the biggest jump.",
      "Public health experts say the early data is encouraging but cautioned against declaring victory prematurely. The real test, they argue, will come when chronic disease patients begin to draw down significantly on the scheme.",
    ],
  },
  {
    slug: "kenya-launches-malaria-vaccine-rollout",
    title: "Kenya begins nationwide rollout of new malaria vaccine",
    subtitle: "The R21 vaccine will reach 1.3 million children in malaria-endemic counties over the next twelve months.",
    category: "health",
    authorSlug: "njeri-kariuki",
    publishedAt: "2026-06-16T10:30:00Z",
    readingMinutes: 4,
    image: imgHealth,
    imageAlt: "Healthcare worker administering a vaccine.",
    tags: ["Malaria", "Vaccines", "Children"],
    excerpt: "Following successful pilots in Western and Nyanza, the vaccine joins the routine immunisation schedule.",
    views: 5210,
    comments: COMMENTS_HEALTH_1.slice(0, 4),
    body: [
      "Kenya on Monday began the nationwide rollout of the R21 malaria vaccine, joining the routine immunisation schedule for children in 14 malaria-endemic counties. Health officials expect to reach 1.3 million children over the next twelve months.",
      "The R21 vaccine, developed by the University of Oxford and manufactured by the Serum Institute of India, demonstrated efficacy above 75% in Phase III trials. Kenya was one of three African countries that participated in the trials.",
      "## A milestone for African public health",
      "Malaria kills approximately 12,000 Kenyans every year, the vast majority of them children under five. The rollout is being funded through a combination of government allocations, Gavi the Vaccine Alliance and bilateral support from the United Kingdom.",
      "Community health volunteers will play a central role in the rollout, conducting door-to-door sensitisation in high-prevalence areas. Vaccination teams will also coordinate with the ongoing measles and rubella catch-up campaign to minimise the burden on caregivers.",
    ],
  },
  // =========================== ENTERTAINMENT ===============================
  {
    slug: "bien-headlines-koroga-festival",
    title: "Bien headlines a sold-out Koroga Festival in Nairobi",
    subtitle: "The former Sauti Sol member drew over 12,000 fans to the Arboretum in his biggest solo show to date.",
    category: "entertainment",
    authorSlug: "kevin-omondi",
    publishedAt: "2026-06-20T22:30:00Z",
    readingMinutes: 4,
    image: imgEntertainment,
    imageAlt: "Live concert with colourful stage lighting.",
    tags: ["Music", "Koroga", "Bien"],
    excerpt: "His ninety-minute set blended Sauti Sol classics with material from his debut solo album, Alusa Why Are You Topless.",
    featured: true,
    trending: true,
    views: 9821,
    comments: COMMENTS_ENT_1,
    body: [
      "Bien-Aimé Baraza, the former Sauti Sol frontman, headlined a sold-out Koroga Festival at the Nairobi Arboretum on Saturday night, drawing more than 12,000 fans to what organisers described as the biggest edition of the long-running festival in five years.",
      "His ninety-minute headlining set blended Sauti Sol classics — including 'Suzanna' and 'Melanin' — with material from his Grammy-nominated debut solo album, 'Alusa Why Are You Topless'. Special guests included Wahu Kagwi, Khaligraph Jones and a surprise appearance by Tanzania's Nandy.",
      "## A new era for Kenyan live music",
      "The success of the festival underscores the growing appetite for premium live music experiences in Nairobi. Organisers said ticket sales were up 38% year-on-year, with VIP packages selling out within 48 hours of going on sale.",
      "Promoters credit the surge to a combination of post-pandemic enthusiasm, the maturing East African creative industry and a new generation of homegrown stars commanding the same loyalty as international acts.",
      "Bien himself thanked fans at the close of his set, calling the night 'a love letter to a city that raised me'. He confirmed an East African tour for the second half of the year, with dates in Kampala, Dar es Salaam and Kigali.",
    ],
  },
  {
    slug: "kenyan-film-secures-streaming-deal",
    title: "Kenyan-made drama 'The Reservoir' secures global streaming deal",
    subtitle: "The political thriller, shot entirely in Naivasha, will premiere on a major global streamer in September.",
    category: "entertainment",
    authorSlug: "kevin-omondi",
    publishedAt: "2026-06-15T11:00:00Z",
    readingMinutes: 4,
    image: imgEntertainment,
    imageAlt: "Stage lighting from a music performance.",
    tags: ["Film", "Streaming", "Industry"],
    excerpt: "The deal includes funding for a second season and signals growing international interest in Kenyan original content.",
    editorsPick: true,
    views: 4310,
    comments: COMMENTS_ENT_1.slice(0, 3),
    body: [
      "The Kenyan-made political thriller 'The Reservoir', shot entirely in and around Naivasha, has secured a global streaming deal with a major international platform, the production company confirmed on Thursday. The eight-episode first season will premiere worldwide in September.",
      "The deal includes a commitment to finance a second season and an option for a third, with production scheduled to begin in November. Industry insiders place the value of the multi-season deal in the high seven figures of US dollars.",
      "## A turning point for Kenyan originals",
      "The Reservoir joins a growing slate of Kenyan productions finding international distribution, following the success of 'Country Queen' and several Kalasha-winning short films. Producers said the deal validates a decade of patient capacity building in the local industry.",
      "The Kenya Film Commission welcomed the news, noting that international deals create downstream demand for local crew, post-production facilities and equipment rental. The commission is finalising a new production rebate scheme aimed at attracting international shoots to Kenya.",
    ],
  },
  // ================================ SPORTS =================================
  {
    slug: "kipyegon-breaks-1500m-world-record-again",
    title: "Faith Kipyegon breaks her own 1500m world record in Oslo",
    subtitle: "The triple Olympic champion clocked 3:48.62 at the Bislett Games, lowering her own mark by 0.6 seconds.",
    category: "sports",
    authorSlug: "daniel-mutua",
    publishedAt: "2026-06-20T20:30:00Z",
    readingMinutes: 5,
    image: imgSports,
    imageAlt: "Athletes running on a track at sunset.",
    tags: ["Athletics", "Kipyegon", "World Record"],
    excerpt: "Kipyegon's surge with 300 metres to go left a world-class field trailing in her wake.",
    featured: true,
    trending: true,
    editorsPick: true,
    views: 21455,
    comments: COMMENTS_SPORTS_1,
    body: [
      "Faith Kipyegon stamped her authority on the women's 1500 metres in emphatic style on Friday evening, breaking her own world record at the Bislett Games in Oslo. The triple Olympic champion crossed the line in 3 minutes, 48.62 seconds, lowering her previous mark of 3:49.04 set in Florence last year.",
      "Running in near-perfect conditions in the Norwegian capital, Kipyegon sat patiently in third position for the first two laps before unleashing a devastating surge with 300 metres to go. The world-class field, which included reigning world silver medallist Diribe Welteji and Australian record holder Jessica Hull, was left trailing in her wake.",
      "## The greatest of her generation",
      "Friday's performance cements Kipyegon's status as the most dominant middle-distance runner of her generation. She now holds the world records in the 1500 metres, the mile and is the only woman to have run under 4:00 in the mile.",
      "> I felt the rhythm tonight. The pacemaker was excellent, the weather was perfect, and the crowd carried me down the home straight, Kipyegon said after the race.",
      "## A boost for Iten and Kenyan athletics",
      "Kipyegon trains in Iten, the high-altitude town that has become synonymous with distance running excellence. Her continued dominance has inspired a new generation of Kenyan middle-distance athletes, several of whom are now breaking into the global top ten.",
      "Athletics Kenya welcomed the world record, calling it 'a moment of immense national pride'. Kipyegon's next outing is expected to be the Diamond League final, with eyes already turning to the World Championships later in the year.",
    ],
  },
  {
    slug: "harambee-stars-afcon-qualifier-win",
    title: "Harambee Stars edge past Cameroon in AFCON qualifier",
    subtitle: "Michael Olunga's second-half header sealed a famous 1-0 win at the Moi International Sports Centre.",
    category: "sports",
    authorSlug: "daniel-mutua",
    publishedAt: "2026-06-17T22:00:00Z",
    readingMinutes: 5,
    image: imgSports,
    imageAlt: "Football stadium under floodlights.",
    tags: ["Football", "Harambee Stars", "AFCON"],
    excerpt: "Kenya's tactical discipline and a passionate Kasarani crowd combined to upset one of African football's heavyweights.",
    trending: true,
    views: 11982,
    comments: COMMENTS_SPORTS_1.slice(0, 4),
    body: [
      "Harambee Stars produced one of their most memorable performances of recent years on Tuesday night, edging past five-time African champions Cameroon 1-0 at a heaving Moi International Sports Centre, Kasarani. Michael Olunga's second-half header was enough to claim three precious points in the AFCON qualifying campaign.",
      "Kenya, ranked 102 in the world, played with discipline and tactical maturity, frustrating a Cameroonian side that included several European-based stars. Goalkeeper Patrick Matasi was outstanding, producing three world-class saves in the closing twenty minutes.",
      "## Olunga's moment",
      "The decisive goal came in the 63rd minute. A swerving corner from Eric Johanna found Olunga rising imperiously at the near post. The veteran striker's powerful header beat the Cameroonian goalkeeper at his near post and sent the Kasarani faithful into raptures.",
      "## A new era under the new coach",
      "The win is the latest evidence that the new coaching set-up is bedding in. Kenya has now won four of its last six competitive matches, climbing 19 places in the FIFA rankings since January.",
      "Football Kenya Federation officials hailed the result as a 'turning point' and called for sustained investment in grassroots football. The next qualifier, away in Libya next month, looms as a chance to take a giant step towards a first AFCON appearance since 2019.",
    ],
  },
  {
    slug: "shujaa-rugby-singapore-sevens-final",
    title: "Shujaa reach Singapore Sevens final for the first time",
    subtitle: "Kenya's national rugby sevens team produced a giant-killing run to set up a final against South Africa.",
    category: "sports",
    authorSlug: "daniel-mutua",
    publishedAt: "2026-06-14T16:00:00Z",
    readingMinutes: 4,
    image: imgSports,
    imageAlt: "Sports stadium at sunset.",
    tags: ["Rugby", "Shujaa", "Sevens"],
    excerpt: "Wins over New Zealand, Argentina and Australia secured Kenya's best-ever finish on the World Series.",
    views: 6122,
    comments: COMMENTS_SPORTS_1.slice(0, 3),
    body: [
      "Kenya's national rugby sevens team, Shujaa, produced a giant-killing run at the Singapore Sevens on Saturday, reaching the final of a World Series leg for the first time since 2016 and the first time ever in Singapore.",
      "Pool stage wins over New Zealand and Argentina were followed by a thrilling 21-19 quarter-final win over Australia and a semi-final victory over Fiji. The team meets South Africa in the final on Sunday afternoon.",
      "## Belief returns",
      "The run marks a turnaround for a programme that has battled financial uncertainty and player exits in recent seasons. Captain Tony Omondi credited a stripped-down coaching staff and renewed focus on basics for the team's resurgence.",
      "Whatever the result in Sunday's final, the campaign has secured valuable World Series points and renewed sponsor interest. The Kenya Rugby Union confirmed that the team's annual budget would rise by 32% for the upcoming season.",
    ],
  },
  // ============================== NEWS (top) ===============================
  {
    slug: "long-rains-deliver-bumper-maize-harvest",
    title: "Long rains deliver a bumper maize harvest in Rift Valley",
    subtitle: "Farmers in Trans Nzoia and Uasin Gishu are reporting yields up 22%, raising hopes of stable unga prices.",
    category: "news",
    authorSlug: "brian-kimani",
    publishedAt: "2026-06-21T05:30:00Z",
    readingMinutes: 4,
    image: imgAgri,
    imageAlt: "Farmers in a green agricultural landscape.",
    tags: ["Agriculture", "Maize", "Food Security"],
    excerpt: "The Ministry of Agriculture expects national maize production to exceed 44 million bags this season.",
    featured: true,
    trending: true,
    views: 7204,
    comments: COMMENTS_BUSINESS_1.slice(0, 4),
    body: [
      "Kenyan farmers in the Rift Valley are reporting one of the best maize harvests in a decade, with yields in Trans Nzoia and Uasin Gishu up an estimated 22% on the previous season. The Ministry of Agriculture expects national production to exceed 44 million 90-kg bags, comfortably above the 42 million bags needed for national consumption.",
      "The Cabinet Secretary attributed the strong harvest to well-distributed long rains, improved access to certified seed and the smoother roll-out of the fertiliser subsidy programme. The government is now turning its attention to strategic grain reserve purchases to stabilise farmgate prices.",
      "## What this means for unga prices",
      "Consumer prices for the iconic two-kilogramme packet of unga have already eased to around Sh148 in Nairobi supermarkets, down from a peak of Sh215 earlier this year. Analysts expect further declines as the new crop reaches mills in August and September.",
      "Farmers, however, are urging caution. Without timely National Cereals and Produce Board purchases at announced floor prices, brokers could exploit the glut to depress farmgate earnings — a familiar Kenyan story.",
    ],
  },
];

// Public accessors -----------------------------------------------------------

export const ARTICLES: Article[] = ARTICLES_DATA;
export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);
export const articlesByCategory = (slug: CategorySlug) =>
  ARTICLES.filter((a) => a.category === slug);
export const articlesByAuthor = (authorSlug: string) =>
  ARTICLES.filter((a) => a.authorSlug === authorSlug);
export const trendingArticles = (limit = 5) =>
  ARTICLES.filter((a) => a.trending).slice(0, limit);
export const featuredArticle = () => ARTICLES.find((a) => a.featured)!;
export const editorsPicks = (limit = 4) =>
  ARTICLES.filter((a) => a.editorsPick).slice(0, limit);
export const mostRead = (limit = 5) =>
  [...ARTICLES].sort((a, b) => b.views - a.views).slice(0, limit);
export const latestArticles = (limit = 8) =>
  [...ARTICLES].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)).slice(0, limit);
export const relatedArticles = (article: Article, limit = 3) =>
  ARTICLES.filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, limit);

export const HERO_IMAGE = heroNairobi;

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
