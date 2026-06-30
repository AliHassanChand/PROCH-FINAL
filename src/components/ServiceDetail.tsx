import React, { useState } from "react";
import { 
  ShieldCheck, 
  Sparkles, 
  Activity, 
  ArrowRight, 
  BookOpen, 
  HeartHandshake, 
  CheckCircle, 
  TrendingUp, 
  CalendarRange, 
  Fingerprint, 
  Home, 
  FileText, 
  HelpCircle,
  ChevronRight,
  Award,
  Compass,
  Eye,
  AlertTriangle,
  Users,
  Brain,
  Lock,
  Plus,
  Minus
} from "lucide-react";

interface ServiceDetailProps {
  serviceId: string;
  onNavigate: (sectionId: string) => void;
}

export default function ServiceDetail({ serviceId, onNavigate }: ServiceDetailProps) {
  
  // State for interactive FAQs accordion to avoid overlaps and provide maximum clarity
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Custom deep data mapped to each service to ensure real, highly specific practice-focused content
  const serviceData: Record<string, {
    title: string;
    sub: string;
    badge: string;
    overview: string;
    sopText: string;
    methodologies: string[];
    personCentred: string[];
    outcomes: string[];
    cqcAlignment: string;
    faqs: { q: string; a: string }[];
  }> = {
    "learning-disabilities": {
      title: "Learning Disabilities",
      sub: "Bespoke Active Support Pathways focused on self-care, communication, and cognitive growth.",
      badge: "CQC Safe & Effective Key Goal",
      overview: "PRO Care Homes delivers bespoke care for individuals aged 18-65 with moderate to severe learning disabilities. Operating strictly under the Active Support framework, we look beyond limitations to identify core potential. Moving away from standard institutional models, our residents are supported by specialised keyworkers using alternative communication modalities (Makaton, PECS) to establish complete control over their physical environments.",
      sopText: "Our Structured Care Standard: All support packages integrate comprehensive sensory profiling, progressive step-by-step task analysis, and functional lifestyle diaries overseen weekly by our Registered Managers to ensure continuous growth and achievement.",
      methodologies: [
        "Alternative Communication Masterplans (PECS, Makaton, individualised visual cues)",
        "Sensory integration audit led by occupational therapists to prevent systematic overload",
        "Progressive task-analysis checklists break down complex physical skills into manageable steps",
        "Bespoke adult-learning routines and localized college course enrollment systems"
      ],
      personCentred: [
        "Co-produced weekly schedule boards enabling total visual autonomy",
        "Dietary and hydration plans mapped to individual biological preferences",
        "Personal values matching during secondary support worker allocation",
        "Resident-led monthly review assemblies with family and circle-of-care"
      ],
      outcomes: [
        "94% achievement rate on personalised ASDAN independent living skill pathways",
        "Significant reduction in distress and frustration via accredited 1:1 Makaton & PECS instruction",
        "Successful graduated transitions to supported independent living within 18 to 24 months",
        "100% active resident participation in weekly co-produced home planning assemblies",
        "Measurable self-sufficiency gains across 32 core domestic milestones verified via Nourish",
        "Successful integration with local community programs, colleges, and social hubs"
      ],
      cqcAlignment: "Under Key Line of Inquiry (KLOI) - Effective: We custom design communication and developmental systems so every resident is fully heard and actively co-produces their daily plan.",
      faqs: [
        {
          q: "How does the Active Support framework operate for residents with learning disabilities?",
          a: "Our Active Support model ensures residents are never passive recipients of care. We break down everyday tasks—like meal preparation, self-care, or laundry—into manageable, step-by-step graded tasks. This allows residents to participate in every part of their day at their own level of ability, boosting their confidence, motor skills, and personal independence."
        },
        {
          q: "What alternative and augmentative communication (AAC) systems do you support?",
          a: "We integrate comprehensive alternative communication masterplans tailored to each resident's cognitive profile, including PECS (Picture Exchange Communication System), Makaton sign language, and customized high-contrast visual schedule boards. All support workers receive specialized training to ensure fluid, daily communication."
        },
        {
          q: "How do you support transition plans into lower-intensity housing or independent apartments?",
          a: "We utilize our Graduated Skill Matrix to track 32 distinct self-care and domestic milestones. As residents master these skills under our positive risk-taking framework, we co-create step-down roadmaps. Once capability and safety benchmarks are verified, we coordinate closely with local authorities and families to transition residents safely."
        },
        {
          q: "How are educational and community activities structured for residents?",
          a: "We collaborate with local special educational needs (SEN) colleges, community centers, and leisure providers to build weekly individual schedules. From cooking workshops to swimming or vocational courses, residents are fully supported to explore their passions and build lifelong social networks."
        }
      ]
    },
    "autism-support": {
      title: "Autism",
      sub: "Low-arousal sensory habitats engineered to reduce anxiety and promote self-advocacy.",
      badge: "MDT Sensory Engineered",
      overview: "We pride ourselves on providing truly neuro-affirming care. Recognizing the distinct neurology of autism spectrum conditions, we do not focus on enforcing conformity. Instead, we adapt the physical structures of 6 Flags House to fit the individual. Our home operates dedicated sensory-safe quiet niches, custom spectrum diets, and consistent rosters to eliminate relational stress.",
      sopText: "Our Autism Practice Guidelines: We incorporate comprehensive sensory diet integration audits, pre-admission environmental triggers screening, and proactive low-arousal crisis mitigation schedules.",
      methodologies: [
        "Sensory diets curated alongside specialised occupational therapy consultants",
        "Strict visual routing & schedule systems keeping transitions stress-free",
        "Nourish digital logging of sensory changes, capturing subtle precursors before overload",
        "Low-arousal environments with soundproofing, custom lighting, and neutral palettes"
      ],
      personCentred: [
        "Direct input into room sensory layout (lighting types, tactile textures, escape zones)",
        "Enabling hyper-fixations and special interests to direct recreational activities",
        "Individualised coping and soothing boxes designed for self-regulation",
        "Flexible daily structures that honor sensory threshold stamina"
      ],
      outcomes: [
        "91% decrease in sensory-induced distress events within the first 12 weeks of placement",
        "100% of residents equipped with custom-designed visual scheduling plans and sensory-safe escape keys",
        "Measurable self-advocacy progression tracked on personal neuro-affirming independent goal matrices",
        "Significant increase in comfortable social exposure hours through tailored, predictable community transitions",
        "Reduction in over-arousal fatigue verified daily via individualized occupational therapy sensory logs",
        "Enhanced long-term placement stability with zero relational stress incidents recorded"
      ],
      cqcAlignment: "Under KLOI - Responsive: Our care pathways are constructed around the unique sensory and neurodivergent signatures of each individual, rather than standardized groups.",
      faqs: [
        {
          q: "What is your stance on restraint and behavioural therapies for autistic residents?",
          a: "PRO Care Homes operates under strict neuro-affirming and positive practice guidelines. We are fully aligned with the Restraint Reduction Network (RRN) and never utilize punitive training or compliance-based therapies. Our focus is entirely on environment adaptation and emotional co-regulation."
        },
        {
          q: "How do you optimize the physical environments of 6 Flags House for sensory safety?",
          a: "We implement comprehensive environmental sensory audits. Our homes feature acoustic soundproofing, flicker-free dimmable LED arrays, soft-toned neutral color palettes, weighted pressure blankets, tactile decompression walls, and dedicated sensory-safe quiet pods."
        },
        {
          q: "How are daily schedules structured to reduce transitional anxiety?",
          a: "We co-create personalized visual schedules using PECS, high-contrast symbols, or digital tablet timelines. Daily routines are kept highly predictable, and any inevitable changes are pre-warned using low-arousal, step-by-step transitional routines."
        },
        {
          q: "What support is available for sensory diet integration?",
          a: "Every resident's sensory profile is reviewed by a specialized occupational therapist. We then build an active 'sensory diet' into their daily plan—including regulated vestibular, proprioceptive, and tactile input intervals throughout the day."
        }
      ]
    },
    "mental-health-support": {
      title: "Mental Health",
      sub: "Trauma-Informed transition pathways from acute wards to secure residential communities.",
      badge: "Trauma-Informed Core Profile",
      overview: "Our mental health support pathways provide an essential stepping-stone for adults transitioning from acute psychiatric wards back into community living. Championing a non-punitive, Psychologically Informed Environment (PIE), we support individuals with dual-diagnosis, personality disorders, and complex trauma to safely re-establish positive identity and cognitive stability.",
      sopText: "Our Trauma-Informed Practice Model: Daily risk scanning, joint weekly case-consultations with community mental health teams (CMHT), and electronic crisis-trigger mapping using Nourish logs.",
      methodologies: [
        "Trauma-Informed relational models designed to rebuild trust & psychological safety",
        "Co-designed relapse prevention planners identifying internal emotional warning flags",
        "Structured stress-regulation techniques (dialectical therapy support, mindfulness, somatic exercises)",
        "Strict oversight of safe medication support with audited compliance trackers"
      ],
      personCentred: [
        "Personalized triggers blueprint co-authored by the resident and keyworker",
        "Empowerment-based goal metrics that allow step-by-step risk ownership",
        "Encouraging private spiritual, religious, or creative identity paths",
        "Resident-led safety plans detailing how they wish staff to support them during high anxiety"
      ],
      outcomes: [
        "100% prevention of unplanned psychiatric hospital readmissions across our resident cohort",
        "Significant increase in self-initiated emotional regulation and stress-mitigation capability",
        "Successful integration into local vocational training, SEN college courses, or micro-employment",
        "Systematic rebuilding of trusted, positive relationships with family and remote support networks",
        "95% adherence to co-designed, non-punitive relapse prevention planners and early-warning grids",
        "Measurable self-esteem and identity-rebuilding milestones verified quarterly via multidisciplinary reviews"
      ],
      cqcAlignment: "Under KLOI - Effective & Caring: Delivering highly integrated, trauma-informed support frameworks that ensure psychological safety with deep human dignity.",
      faqs: [
        {
          q: "How do you coordinate with NHS psychiatric networks and community mental health teams (CMHT)?",
          a: "We maintain highly integrated, NHSmail-secure communication channels with local NHS Trusts, clinical coordinators, and CMHTs. We conduct joint weekly case-consultations and multi-agency reviews to guarantee seamless care alignment and safety."
        },
        {
          q: "What is your approach to crisis management and relapse prevention?",
          a: "Every individual co-designs an active Crisis Care & Relapse Prevention Map. We utilize proactive environmental trigger mitigation, sensory soothing kits, dialectical behavior techniques, and have on-call clinical quality assurance managers available 24/7."
        },
        {
          q: "What is a Psychologically Informed Environment (PIE) and how is it implemented?",
          a: "A PIE focuses on the psychological and emotional needs of residents. Our staff are trained in trauma-informed care, ensuring that physical spaces, daily routines, and personal relationships are explicitly designed to rebuild trust, self-worth, and emotional safety."
        },
        {
          q: "How do you assist with medication concordance and safety?",
          a: "We provide dignified, supervised medication support overseen by senior care leaders. We utilize electronic barcoded medication administration logs and hold monthly compliance audits, empowering residents to gradually understand and manage their own prescriptions."
        }
      ]
    },
    "personal-care": {
      title: "Dignified Personal Care Excellence",
      sub: "Dignity-first physical care assistance with hygiene, nutrition, and medicine management.",
      badge: "Best Practice Quality Care",
      overview: "Physical care demands are met with the highest level of support safety combined with absolute respect for personal space. We ensure that our residents maintain their self-respect, daily presentation, and biological health. At 6 Flags House, all bedrooms feature private en-suite bathroom zones to allow completely private, dignified support schedules.",
      sopText: "Our Dignity & Personal Care Standard: Multi-step hygiene support schedules, audited medication double-signatures, skin integrity preservation trackers, and nutritional logs via Nourish tablets.",
      methodologies: [
        "Dignity-first manual handling utilizing premium assistive tools",
        "Audited medication tracking with electronic barcodes to eliminate administration errors",
        "Robust nutritional mapping overseen by qualified nutrition specialists",
        "Active training for support staff on gender sensitivity and cultural modesty standards"
      ],
      personCentred: [
        "Support worker allocation based strictly on gender preferences and resident comfort",
        "Choice of personal toiletries, style preferences, and daily clothing wardrobe",
        "Bath/shower schedules mapped entirely to the resident's natural circadian rhythms",
        "Client selection of meals, textures, and sensory dining environments"
      ],
      outcomes: [
        "100% medication administration safety rating achieved via digital barcoded tracking systems",
        "Exemplary skin integrity and physical wellness preservation verified through daily skin check logs",
        "98% resident satisfaction score regarding dignity, modesty protection, and gender-matched staffing comfort",
        "Fully maintained physical fitness, muscle mobility, and optimal circulatory health via bespoke movement plans",
        "Robust nutritional balance and hydration benchmarks achieved under dietetic specialist supervision",
        "Zero safeguarding concerns and perfect alignment with CQC Regulation 10 dignity standards"
      ],
      cqcAlignment: "Under KLOI - Safe & Caring: Prioritizing physical safety alongside personal respect during physical assistance, safeguarding bodily autonomy.",
      faqs: [
        {
          q: "How do you protect a resident's modesty and dignity during personal hygiene support?",
          a: "We map staff rosters strictly to the resident's gender preferences, cultural background, and personal comfort boundaries. We utilize dignified manual handling techniques and ensure that personal care is conducted in complete privacy behind closed doors."
        },
        {
          q: "What level of training do your support staff receive for complex physical care?",
          a: "All support workers complete the statutory UK Care Certificate alongside advanced training in posture care, pressure area preservation, dysphagia safety, peg-feeding management, and electronic medication double-signatures."
        },
        {
          q: "Are bedrooms equipped with private, accessible en-suite facilities?",
          a: "Yes. Every bedroom at 6 Flags House features a fully accessible, private en-suite wet room zone. This allows personal care to take place seamlessly and discreetly without navigating public hallways."
        },
        {
          q: "How are meals and nutritional hydration plans managed?",
          a: "Our plans are overseen by registered nutritional specialists. We monitor daily hydration and nutritional logs on digital Nourish tablets. Meals are tailored around residents' personal preferences, physical swallowing capabilities, and sensory dining comforts."
        }
      ]
    },
    "community-participation": {
      title: "Community Participation & Active Citizenship",
      sub: "Ending social isolation through local high-street integration and travel independence.",
      badge: "Active Citizenship Program",
      overview: "PRO Care Homes rejects the old model of transporting residents in closed institutional vans. Instead, we advocate for active, self-directed community citizenship. We support our residents to walk, utilise public buses, complete high-street transactions, access local swimming pools, and take active roles in community hubs or charity groups.",
      sopText: "Our Active Community Integration Standard: Structured community risk profiling, graded exposure to public spaces, independent travel training logs, and weekly social budget audits.",
      methodologies: [
        "Personalised travel training guides under positive risk-taking framework",
        "Collaborations with local businesses to establish sensory-friendly visiting blocks",
        "Integration with college courses, specialised arts centers, and sports clubs",
        "Structured social budgeting training with visual cash folder organisers"
      ],
      personCentred: [
        "Resident-directed choice of community venues, outings and social clubs",
        "Bespoke volunteer and micro-employment pipelines matching skills",
        "Facilitating independent friendships and chosen romantic partnerships",
        "Custom travel books with visual maps and keyworker contact logs"
      ],
      outcomes: [
        "100% active engagement in weekly, self-directed community outings, events, or hobby groups",
        "Measurable growth in social communication, public transaction confidence, and navigation skills",
        "Complete eradication of social isolation through local high-street partnerships and community presence",
        "Successful completion of vocational courses, volunteering milestones, or certificate achievements",
        "Graduated transition to independent public transport travel for approved individuals",
        "Improved financial autonomy with residents managing personal weekly social budgets independently"
      ],
      cqcAlignment: "Under KLOI - Responsive: Creating dynamic life opportunities outside care home boundaries to give residents genuine roles in the UK community.",
      faqs: [
        {
          q: "How do you balance safety with positive risk-taking during community outings?",
          a: "We use a structured, step-down support strategy under our positive risk-taking framework. Keyworkers begin with close 1:1 side-by-side accompaniment, gradually transitioning to distant monitoring as independent travel and safety milestones are successfully audited."
        },
        {
          q: "How do you support residents to manage their money in public?",
          a: "We run practical financial workshops using visual budgeting cards, color-coded cash organizers, and secure contactless budgeting cards. This hands-on guidance builds real-world numeracy skills and independent spending confidence."
        },
        {
          q: "What local partnerships do you maintain to facilitate active citizenship?",
          a: "We collaborate with local cafes, leisure centers, special educational hubs, and employers to secure sensory-friendly visiting blocks and structured volunteer placements, ensuring our residents are valued members of the local high street."
        },
        {
          q: "How do residents choose and plan their weekly activities?",
          a: "Every resident chairs their own weekly 'Active Citizen planning meeting' with their keyworker. They use visual catalogs, menu choices, and local event guides to select, budget, and schedule their preferred outings and social interactions."
        }
      ]
    },
    "independent-living": {
      title: "Supported Living",
      sub: "Active step-by-step training roadmaps for cooking, budgeting, and home logistics.",
      badge: "Graduated Skill Academy",
      overview: "Our ultimate purpose is to equip individuals with the self-respect and practical capabilities needed to transition down into independent supported living apartments. We turn basic domestic tasks into achievements. Residents cook their own healthy recipes, clean their personal spaces, monitor small allowances, and maintain safety settings.",
      sopText: "Our Supported Living Practice Standard: The Graduated Skill Matrix tracking 32 separate life milestones, from safe kitchen knife handling to weekly grocery planning.",
      methodologies: [
        "Adaptive kitchens with sensory safety controls and visual instruction schedules",
        "Co-developed grocery planners linking budgeting, nutrition, and shopping",
        "Bespoke domestic checklist cards utilizing simple interactive tokens",
        "Digital progress logs celebrating small milestone mastery weekly"
      ],
      personCentred: [
        "Resident choice of dinner recipes and preferred culinary traditions",
        "Private safety lockers allowing residents to hold keys and manage personal belongings",
        "Self-paced skills practice without rushing or external expectations",
        "Resident-directed housekeeping routines paired with chosen music playlists"
      ],
      outcomes: [
        "94% achievement rate on personalized independent living skills pathways",
        "Measurable progression across 32 core domestic milestones verified weekly via Nourish systems",
        "Successful, highly coordinated step-down transitions to lower-intensity supported living apartments",
        "Daily independent meal preparation and kitchen safety mastery achieved by residents",
        "Complete domestic autonomy in cleaning, personal laundry, and room maintenance tasks",
        "Robust personal safety awareness and security procedures verified under supervised checks"
      ],
      cqcAlignment: "Under KLOI - Effective: Supporting real, measurable growth in daily self-reliance, giving residents control over their personal lives.",
      faqs: [
        {
          q: "What specialized tools and adaptive kitchens do you use for safety training?",
          a: "Our adaptive training kitchens feature induction hobs, automatic-shutoff kettles, adaptive safety knives, tactile color-coded dials, and sequential visual checklist cards to guide residents step-by-step through cooking and cleaning safely."
        },
        {
          q: "How do you evaluate if a resident is ready to transition to independent housing?",
          a: "We utilize the Graduated Skill Matrix to assess and track 32 distinct physical self-care, domestic, and financial milestones. Transition readiness is evaluated quarterly through comprehensive, multi-agency reviews involving families, social workers, and clinical teams."
        },
        {
          q: "How is budgeting and financial independence trained?",
          a: "Residents practice handling small personal allowances using visual planning binders and interactive tokens. We gradually progress to bank account navigation, utility payment tracking, and weekly grocery shopping budget management."
        },
        {
          q: "Can residents hold their own front door and bedroom keys?",
          a: "Yes. Where risk assessments support it under a positive risk-taking framework, we encourage residents to hold keys to their bedrooms and personal safety lockers, fostering authentic responsibility and privacy."
        }
      ]
    },
    "residential-support": {
      title: "Residential Care",
      sub: "Premium, dignified 24/7 supported placement focusing on permanent safety and comfort.",
      badge: "Outstanding Environment Model",
      overview: "6 Flags House stands as a premier specialist care home. Designed to marry high-quality care standards with home-like comfort, it supports adults with learning disabilities, autism spectrum conditions, and associated complex needs. Refined aesthetics, generous gardens, sensory integration cabins, and modern en-suite chambers offer a peaceful lifestyle of long-term stability.",
      sopText: "Our Residential Operations Standard: 24/7 integrated specialist care and specialised social support staffing, comprehensive safety audits, and fully transparent visual accountability checks.",
      methodologies: [
        "24-hour trained support teams including dedicated care and quality on-call advisors",
        "Rigorous quarterly fire, structural, and infection-control audits",
        "Bespoke acoustic modeling and lighting designs to eliminate anxiety triggers",
        "PRO Care Secure referrals gateway for secure and instant local authority access"
      ],
      personCentred: [
        "Complete creative choice over room decoration (paint, posters, smart audio systems)",
        "Open-door family visiting hours with private consultation lounges",
        "Individual secure lockers and absolute privacy within personal suites",
        "Customized sensory integration schedules across shared communal spaces"
      ],
      outcomes: [
        "100% placement stability maintained through robust Positive Behaviour Support (PBS) planning",
        "Exceptional environmental safety rating with zero health-and-safety or infection events",
        "98% family satisfaction score validating the warm, dignified, and welcoming atmosphere",
        "High staff-to-resident ratios ensuring prompt, highly responsive support day and night",
        "Full compliance with CQC Regulation 15 regarding premises, environmental acoustics, and comfort",
        "Successful long-term lifestyle stability for individuals who previously experienced placement breakdowns"
      ],
      cqcAlignment: "Under KLOI - Safe & Caring: Supplying beautifully styled, highly safe, and emotionally warm rooms that shield dignity while enabling long-term stability.",
      faqs: [
        {
          q: "What are the visiting policies for family members at 6 Flags House?",
          a: "We operate an open-arms, open-door policy. Families and circles of care are welcome to visit whenever they wish and can make full use of our beautifully styled private family lounges and landscaped gardens for quiet visits."
        },
        {
          q: "What makes 6 Flags House's physical environment superior to standard care homes?",
          a: "Our home combines premium residential aesthetic comfort with rigorous clinical standards. We feature acoustic noise absorption, flicker-free sensory lighting, private en-suite wet rooms, accessible therapeutic gardens, and independent sensory cabins."
        },
        {
          q: "How do you ensure 24/7 safety and management oversight?",
          a: "We provide 24-hour on-site support coverage with waking night-shift senior leaders. Additionally, we maintain a dedicated on-call manager network available 24/7 to resolve any emerging logistical or medical needs instantly."
        },
        {
          q: "How is the transition into 6 Flags House managed for a new resident?",
          a: "We execute a highly supportive, gradual transition process. This includes pre-admission environmental triggers matching, bedroom styling with the resident's personal belongings, familiarization visits, and structured introductions to team members."
        }
      ]
    },
    "positive-behaviour-support": {
      title: "Community-Based Support",
      sub: "Restraint-reduction support approach removing restrictions and empowering safe communication.",
      badge: "MDT Positive Behaviour Support Approved",
      overview: "Our Positive Behaviour Support (PBS) model is the core support framework of PRO Care Homes. Guided by specialised behaviour support consultants, we operate with a singular philosophy: all distressed behaviours are functional communication attempts. By analyzing environmental precursors, physical triggers, and emotional antecedents, we systematically eliminate restrictive practices.",
      sopText: "Our Positive Behaviour Support Model: Comprehensive Functional Behaviour Assessments (FBA), personalized green/amber/red tracking, and daily digital metrics on Nourish.",
      methodologies: [
        "Functional Behaviour Assessments (FBA) co-vetted by multidisciplinary experts",
        "Strict adherence to Restraint Reduction Network standards resulting in zero manual restrictions",
        "Advanced training on proactive and reactive verbal de-escalation models",
        "Nourish analytics mapping behavioural trends against environmental variables"
      ],
      personCentred: [
        "Bespoke sensory calming menu designed by the resident (scents, music, weighted items)",
        "Visual feedback tools allowing residents to communicate fatigue level",
        "Resident review of behaviour plans to ensure comfort and active consent",
        "Post-incident trauma support sessions focus on active listening and reassurance"
      ],
      outcomes: [
        "89% average reduction in high-intensity distressed communication incidents within 6 months",
        "100% eradication of manual, physical, or restrictive mechanical interventions",
        "Daily precursor and trigger logging completed on digital Nourish tablets to prevent escalation",
        "All support staff certified under BILD-accredited Positive Behaviour Support training frameworks",
        "Residents supported to access previously restricted community venues and events safely",
        "Measurable reduction in resident and caregiver anxiety levels verified via weekly clinical audits"
      ],
      cqcAlignment: "Under KLOI - Well-Led & Safe: Maintaining an ethical, non-punitive support culture and precise digital oversight to protect resident and staff safety.",
      faqs: [
        {
          q: "What is your restraint reduction policy and compliance standard?",
          a: "PRO Care Homes is fully committed to a strict zero-restraint culture, in complete alignment with the Restraint Reduction Network (RRN) standards. We do not use physical, mechanical, or chemical restrictions, focusing instead on environmental adjustments."
        },
        {
          q: "How are Functional Behaviour Assessments (FBA) conducted?",
          a: "Our specialized PBS consultants lead comprehensive, multi-disciplinary assessments. We analyze the setting events, immediate precursors, and personal functions of a behavior to build proactive, multi-stage positive support plans."
        },
        {
          q: "How do you utilize digital Nourish systems to prevent distress?",
          a: "Our care teams log subtle behavior changes (using green/amber/red tracking) in real-time on digital Nourish tablets. This allows the team to detect stress precursors instantly and implement proactive calming plans before escalation."
        },
        {
          q: "How do you support residents and staff immediately after a challenging incident?",
          a: "We implement a trauma-informed post-incident debrief protocol. This focuses on active listening, comforting physical safety, emotional reassurance, and detailed clinical reflection to adapt future environmental triggers and support strategies."
        }
      ]
    },
    "dementia-care": {
      title: "Specialist Dementia & Memory Pathways",
      sub: "Cognitive validation therapies and secure, memory-optimised environments designed to promote ongoing familiarity.",
      badge: "MDT Dementia & Memory Care",
      overview: "PRO Care Homes offers secure, specialist support for individuals living with early-onset, complex, or advanced stage dementia. Driven by cognitive validation therapy and the Eden Alternative philosophy, we focus on nourishing remaining strengths, preventing stress, and preserving life stories rather than tracking losses.",
      sopText: "Our Memory Support Excellence Standard: Structured life-story work, 24/7 safe quiet pacing circuits, dementia sensory diets, and personalised environmental memory anchors.",
      methodologies: [
        "Structured Life-Story Work & memory boards co-developed with friends and families",
        "Sensory gardens and safe circular wandering pathways avoiding dead-ends",
        "Eden Alternative validation practices emphasizing companionship, agency, and usefulness",
        "Orientation support with clear, high-contrast visual cues and nostalgic touchpoints"
      ],
      personCentred: [
        "Personal memory scrapbooks and custom item chests on bedroom thresholds",
        "Assistance with meals using high-contrast crockery to enhance nutritional intake",
        "Familiar sleep-prep and early riser schedules based on historic work/life habits",
        "Therapeutic music playlists curating sounds from the client's past eras"
      ],
      outcomes: [
        "96% success in daily nutritional intake and visual meal recognition using high-contrast dining setups",
        "Significant reduction in twilight sundowning distress and disorientation via circadian lighting",
        "100% of residents equipped with custom-built nostalgic memory scrapbooks and life-story boards",
        "Outstanding safety and comfort maintained along secure circular sensory gardens",
        "Measurable preservation of cognitive recognition, calm breathing, and verbal engagement",
        "Exemplary feedback from clinical memory specialists and families via monthly reviews"
      ],
      cqcAlignment: "Under KLOI - Caring & Responsive: Delivering sensory, music, and validation plans tailored specifically to memory and orientation parameters.",
      faqs: [
        {
          q: "What is Validation Therapy and why is it preferred over reality orientation?",
          a: "Validation Therapy (Eden Alternative) honors the resident's feelings and current cognitive reality rather than correcting them. If a resident believes they need to catch a bus to their childhood school, we validate the underlying feelings of responsibility and comfort instead of causing distress."
        },
        {
          q: "How is the physical home engineered for safe dementia care and secure pacing?",
          a: "Our layout features circular pacing circuits with no dead-ends, visual memory anchors on bedroom doors (such as customized nostalgia boxes), high-contrast bathroom thresholds to prevent falls, and enclosed sensory gardens designed for safe exploration."
        },
        {
          q: "How do you assist with dining, weight maintenance, and nutritional intake?",
          a: "We use high-contrast blue crockery to help residents visually identify their food, provide finger-food options to promote independence, and log all nutritional and fluid metrics instantly on digital Nourish tablets under speech and language therapist guidance."
        },
        {
          q: "How do you involve families in capturing a resident's life story?",
          a: "We collaborate closely with families to co-produce 'Life-Story Books' and threshold memory boxes. These contain photos, music, tactile treasures, and favorite scents from the resident's past, forming an invaluable emotional anchor for daily care."
        }
      ]
    }
  };

  // Normalise mapping keys between different schemas
  let normalizedId = serviceId;
  if (normalizedId === "residential") normalizedId = "residential-support";
  if (normalizedId === "supported-living") normalizedId = "independent-living";
  if (normalizedId === "autism") normalizedId = "autism-support";
  if (normalizedId === "mental-health") normalizedId = "mental-health-support";
  if (normalizedId === "community-support") normalizedId = "positive-behaviour-support";

  const currentData = serviceData[normalizedId] || serviceData["learning-disabilities"];

  // Core Premium Design configurations mapped per sub-page to simulate Outstanding aesthetic variations
  const premiumMeta: Record<string, {
    title: string;
    sub: string;
    badge: string;
    gradient: string;
    icon: React.ComponentType<any>;
    cqcBadge: string;
    cqcRegulation: string;
    breadcrumbLabel: string;
    sidebarTitle: string;
    sidebarLogs: { title: string; desc: string }[];
  }> = {
    "learning-disabilities": {
      title: "Learning Disabilities & Communication Support",
      sub: "Bespoke Active Support Pathways focused on self-care, communication, and cognitive growth.",
      badge: "CQC Quality: Effective",
      gradient: "from-[#081e36] via-[#0b1320] to-[#040810]",
      icon: Award,
      cqcBadge: "Effective Outcomes",
      cqcRegulation: "CQC Regulation 9: Person-Centred Care framework ensuring alternative communication formats.",
      breadcrumbLabel: "Learning Disabilities",
      sidebarTitle: "LD Clinical Oversight",
      sidebarLogs: [
        { title: "Practice Standards Log", desc: "Sensory profiling checklists and step-by-step task analysis logs verified weekly." },
        { title: "Alternative Modalities", desc: "Dedicated PECS and Makaton certified care champions translating complex plans." },
        { title: "Active Support Model", desc: "Schedules co-produced by occupational therapists to encourage true resident pride." }
      ]
    },
    "autism-support": {
      title: "Neuro-Affirming Autism Pathways & Low-Arousal Habitats",
      sub: "Low-arousal sensory habitats engineered to reduce anxiety, minimize transitions, and promote self-advocacy.",
      badge: "CQC Quality: Responsive",
      gradient: "from-[#1d0b2e] via-[#10061b] to-[#07010e]",
      icon: Fingerprint,
      cqcBadge: "Responsive Care",
      cqcRegulation: "CQC Regulation 12: Safe Care & Treatment adapting physical structures to prevent systemic overload.",
      breadcrumbLabel: "Autism Support",
      sidebarTitle: "Sensory Engineering Logs",
      sidebarLogs: [
        { title: "Sensory Audit Logs", desc: "Comprehensive occupational therapist sensory audits completed pre-admission." },
        { title: "Low-Arousal Design", desc: "Acoustic soundproofing, flicker-free LED arrays, and weighted sensory escape pods." },
        { title: "Predictable Schedules", desc: "Visual timetables matching natural circadian biology to lower transition distress." }
      ]
    },
    "mental-health-support": {
      title: "Trauma-Informed Mental Health & PIE Rehabilitation",
      sub: "Trauma-Informed transition pathways from acute psychiatric wards to secure residential communities.",
      badge: "CQC Quality: Effective",
      gradient: "from-[#0b282c] via-[#06181b] to-[#020a0b]",
      icon: Activity,
      cqcBadge: "Effective & Caring",
      cqcRegulation: "CQC Regulation 15: Premises & Equipment providing a non-punitive Psychologically Informed Environment (PIE).",
      breadcrumbLabel: "Mental Health",
      sidebarTitle: "Trauma-Informed Support Guidelines",
      sidebarLogs: [
        { title: "Practice Verification Check", desc: "Weekly multi-agency consults and daily trigger tracking updated via Nourish systems." },
        { title: "Relapse Planners", desc: "Co-designed safety planners detailing client emotional precursors and coping mechanisms." },
        { title: "Clinical Networks", desc: "NHSmail-compliant shared care channels with local NHS Foundation Trusts and CMHT teams." }
      ]
    },
    "personal-care": {
      title: "Dignified Personal Care Excellence & Autonomy",
      sub: "Dignity-first daily support routines preserving bodily autonomy inside private en-suite wetroom suites.",
      badge: "CQC Quality: Caring",
      gradient: "from-[#092b23] via-[#051a15] to-[#010b09]",
      icon: HeartHandshake,
      cqcBadge: "Dignity & Caring",
      cqcRegulation: "CQC Regulation 10: Dignity & Respect shielding bodily autonomy inside premium en-suite rooms.",
      breadcrumbLabel: "Personal Care",
      sidebarTitle: "Dignity Assurance Standards",
      sidebarLogs: [
        { title: "Practice Standards Routine", desc: "Audited medication double-signatures and skin integrity logs completed on-shift." },
        { title: "Modesty Standards", desc: "Rosters mapped strictly to client gender preferences, cultural backgrounds, and comforts." },
        { title: "Circadian Hygiene", desc: "Bathing and personal grooming schedules adapted around the resident's natural daily cycle." }
      ]
    },
    "community-participation": {
      title: "Active Citizenship & Local Community Integration",
      sub: "Ending social isolation through local high-street integration, volunteer opportunities, and travel independence.",
      badge: "CQC Quality: Responsive",
      gradient: "from-[#04241c] via-[#021510] to-[#010a08]",
      icon: Compass,
      cqcBadge: "Responsive Outcomes",
      cqcRegulation: "CQC Regulation 9: Person-Centred Care enabling independent travel goals under positive risk-taking.",
      breadcrumbLabel: "Community",
      sidebarTitle: "Citizen Transition Logs",
      sidebarLogs: [
        { title: "Participation Review Logs", desc: "Proactive community risk profiling and travel graduation checklists updated weekly." },
        { title: "Social Budgeting", desc: "Gradual financial autonomy training utilizing cash organisers and budgeting cards." },
        { title: "Partnership Network", desc: "Sensory-friendly community blocks established with local high-street shops and cafes." }
      ]
    },
    "independent-living": {
      title: "Supported Living Pathways & Practical Skill Graduation",
      sub: "Active step-by-step training roadmaps for cooking, budgeting, housekeeping, and home logistics.",
      badge: "CQC Quality: Effective",
      gradient: "from-[#2f1c08] via-[#1c1105] to-[#0a0601]",
      icon: BookOpen,
      cqcBadge: "Effective Life Skills",
      cqcRegulation: "CQC Regulation 17: Good Governance promoting self-reliance and gradual step-down pathways.",
      breadcrumbLabel: "Supported Living",
      sidebarTitle: "Milestone Tracking Academies",
      sidebarLogs: [
        { title: "Skill Progression Audit", desc: "Graduated Skill Matrix tracking 32 distinct physical self-care and domestic milestones." },
        { title: "Adaptive Kitchens", desc: "Supervised 1:1 kitchen interval schedules, induction hobs, and auto-shutoff kettles." },
        { title: "Transition Reviews", desc: "Quarterly multi-agency case assessments evaluating readiness for secondary apartments." }
      ]
    },
    "residential-support": {
      title: "Specialist 24/7 Residential Placements at 6 Flags House",
      sub: "Premium, dignified 24/7 supported placement focusing on permanent safety, warm environments, and comfort.",
      badge: "CQC Quality: Safe & Caring",
      gradient: "from-[#0d1637] via-[#080d22] to-[#030510]",
      icon: Home,
      cqcBadge: "Safe Environment",
      cqcRegulation: "CQC Regulation 12: Safe Care & Treatment maintaining outstanding physical environments.",
      breadcrumbLabel: "Residential Care",
      sidebarTitle: "Oversight & Audit Systems",
      sidebarLogs: [
        { title: "Management Safety Checks", desc: "Night-shift senior environmental checklists and 24/7 on-call manager coverage logs." },
        { title: "Regular Safety Audits", desc: "Rigorous quarterly fire, legionella, water, and infection-control audits on-site." },
        { title: "Family Lounges", desc: "Quiet visitation rooms enabling families to meet in comforting, supportive spaces." }
      ]
    },
    "positive-behaviour-support": {
      title: "Positive Behaviour Support (PBS) & Restraint Reduction",
      sub: "Restraint-reduction support approach removing restrictions, analyzing triggers, and empowering communication.",
      badge: "CQC Quality: Well-Led",
      gradient: "from-[#330c14] via-[#1e070c] to-[#0a0204]",
      icon: ShieldCheck,
      cqcBadge: "Well-Led Safety",
      cqcRegulation: "CQC Regulation 13: Safeguarding service users from abuse and improper treatment.",
      breadcrumbLabel: "Community Support",
      sidebarTitle: "PBS Oversight Controls",
      sidebarLogs: [
        { title: "PBS Support Standard", desc: "Comprehensive Functional Behaviour Assessments (FBA) co-vetted by clinical MDTs." },
        { title: "Amber Level Logging", desc: "Real-time precursor tracking on digital Nourish tablets to adjust environment layouts." },
        { title: "RRN Compliance", desc: "Full alignment with Restraint Reduction Network standards resulting in zero mechanical restrictions." }
      ]
    },
    "dementia-care": {
      title: "Specialist Dementia & Memory Pathways",
      sub: "Cognitive validation, memory-anchored settings, and stress-reduction therapies tailored to complex dementia.",
      badge: "CQC Quality: Caring",
      gradient: "from-[#062432] via-[#04161f] to-[#01090d]",
      icon: Brain,
      cqcBadge: "Caring & Memory Support",
      cqcRegulation: "CQC Regulation 9: Person-Centred Care tailored to specific cognitive thresholds and memories.",
      breadcrumbLabel: "Dementia Care",
      sidebarTitle: "Dementia Care Practice Guidelines",
      sidebarLogs: [
        { title: "Validation Audits", desc: "Eden Alternative validation schedules, circular secure walking paths, and sensory audits." },
        { title: "Visual Recognition", desc: "Use of high-contrast crockery, colored bathroom thresholds, and clear nostalgic anchors." },
        { title: "Life Story Mapping", desc: "Scrapbooks, custom nostalgia boxes, and curated soundtracks from historic eras." }
      ]
    }
  };

  const activeMeta = premiumMeta[normalizedId] || premiumMeta["learning-disabilities"];
  const HeroIcon = activeMeta.icon;

  return (
    <div id="service-details-view" className="animate-fadeIn font-sans bg-slate-50/50">
      
      {/* 1. IMMERSIVE OUTSTANDING HERO BANNER: Placed professionally to avoid absolute Header overlap */}
      <section className={`relative pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-16 lg:pb-24 bg-gradient-to-br ${activeMeta.gradient} text-white overflow-hidden select-none border-b border-white/5`}>
        {/* Ambient Glow Elements */}
        <div className="absolute inset-0 bg-white/[0.01] backdrop-blur-[1.5px]" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-12 w-[400px] h-[400px] bg-care-green/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-5">
            
            {/* Breadcrumbs Navigation */}
            <nav className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider font-mono text-white/70">
              <span className="hover:text-premium-gold transition cursor-pointer" onClick={() => onNavigate("hero")}>
                PRO Care
              </span>
              <ChevronRight className="w-3 h-3 text-white/40" />
              <span className="hover:text-premium-gold transition cursor-pointer" onClick={() => onNavigate("services-hub")}>
                Care Specialties
              </span>
              <ChevronRight className="w-3 h-3 text-white/40" />
              <span className="text-premium-gold font-extrabold">
                {activeMeta.breadcrumbLabel}
              </span>
            </nav>

            {/* Premium Badge Block */}
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-3.5 py-1 rounded-full shadow-inner">
              <HeroIcon className="w-3.5 h-3.5 text-premium-gold animate-bounce" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/95">
                {activeMeta.badge}
              </span>
            </div>

            {/* Core Descriptive Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {currentData.title}
            </h1>

            {/* Descriptive Subtitle Text */}
            <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed font-normal max-w-2xl font-sans">
              {currentData.sub}
            </p>

            {/* Action triggers */}
            <div className="pt-2.5 flex flex-wrap gap-3">
              <button 
                onClick={() => onNavigate("contact")}
                className="px-5 py-2.5 bg-premium-gold hover:bg-white text-gov-blue hover:text-gov-blue font-extrabold text-[11px] rounded-xl shadow-lg shadow-black/10 transition-all duration-200 transform active:scale-95 cursor-pointer"
              >
                Book Virtual Consultation
              </button>
              <button 
                onClick={() => onNavigate("referrals")}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-[11px] rounded-xl transition duration-200 cursor-pointer"
              >
                Inquire Pathways →
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 2. MAIN SUB-PAGES BODY: Styled to replicate Governance and Standards Layout with unique Odd/Even split designs */}
      <div id="service-details-layout-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-10 shadow-lg space-y-12">

          {/* Title and Overview block styled like CQC Standard Header in Governance pages */}
          <div className="border-b border-slate-100 pb-8">
            <span className={`text-[10px] uppercase font-bold tracking-widest font-mono px-2.5 py-1 rounded-md ${
              ["independent-living", "autism-support", "positive-behaviour-support", "community-participation"].includes(normalizedId)
                ? "text-emerald-700 bg-emerald-50"
                : "text-care-green bg-care-green/5"
            }`}>
              Specialist Support Portfolio
            </span>
            <h2 className="text-3xl font-extrabold text-gov-blue tracking-tight mt-3">
              {currentData.title}
            </h2>
            <p className="text-sm text-slate-600 mt-3 max-w-3xl leading-relaxed">
              {currentData.overview}
            </p>
          </div>

          {/* Conditional Layout implementation based on Odd vs. Even tabs */}
          {!["independent-living", "autism-support", "positive-behaviour-support", "community-participation"].includes(normalizedId) ? (
            /* ========================================================= */
            /* LAYOUT 1 (ODD PAGES): Classical Grid-Pillar and Star-Badge layout */
            /* ========================================================= */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: Operational Pillars, practice standard guidance, and Person-Centred routines */}
              <div className="lg:col-span-8 space-y-8 animate-fadeIn">
                
                <div className="space-y-4">
                  <h3 className="text-xs uppercase font-extrabold tracking-widest font-mono text-slate-400">
                    Core Operational Support Pillars
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {currentData.methodologies.map((method, idx) => {
                      const colors = [
                        "border-l-indigo-500",
                        "border-l-teal-500",
                        "border-l-purple-500",
                        "border-l-emerald-500"
                      ];
                      return (
                        <div 
                          key={idx} 
                          className={`bg-white p-6 border border-slate-150 border-l-4 ${colors[idx % 4]} rounded-2xl space-y-3 shadow-xs hover:shadow-md transition-all duration-300`}
                        >
                          <div className="flex items-center space-x-2.5 text-gov-blue font-bold text-sm font-sans">
                            <CheckCircle className="w-5 h-5 text-care-green" />
                            <span>Pillar {idx + 1}</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-sans">
                            {method}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Specialized Care Practice Standard Box */}
                <div className="bg-slate-50 border border-slate-150 p-6 rounded-2xl space-y-3">
                  <div className="flex items-center space-x-2.5 text-gov-blue font-bold text-xs uppercase font-mono tracking-wider">
                    <FileText className="w-4.5 h-4.5 text-premium-gold" />
                    <span>Specialized Care Practice Standard</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium italic font-sans">
                    &ldquo;{currentData.sopText}&rdquo;
                  </p>
                </div>

                {/* Person-Centred Service Delivery */}
                <div className="bg-white border border-slate-150 p-8 rounded-3xl space-y-6 shadow-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-premium-gold font-mono block">
                      Person-Centred Routines
                    </span>
                    <h3 className="text-xl font-extrabold text-gov-blue font-sans">
                      User Autonomy & Co-Production Actions
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentData.personCentred.map((pc, idx) => (
                      <div key={idx} className="flex items-start space-x-3 text-xs text-slate-600 leading-relaxed font-sans">
                        <span className="w-5.5 h-5.5 rounded-full bg-premium-gold/15 text-premium-gold font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                          ★
                        </span>
                        <span>{pc}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: CQC Alignment Sidebar & Administrative Oversight Logs */}
              <div className="lg:col-span-4 space-y-6 animate-fadeIn">
                
                {/* CQC Standards Alignment Sidebar Card */}
                <div className="bg-white border border-slate-150 rounded-3xl p-6 space-y-4 shadow-xs">
                  <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-150">
                    <div className="w-9 h-9 bg-care-green/10 text-care-green rounded-lg flex items-center justify-center font-extrabold text-xs font-mono">
                      CQC
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-gov-blue uppercase font-mono tracking-wider">CQC Quality Standard</h4>
                      <p className="text-[9px] text-slate-400 uppercase font-mono font-bold">Key Standard Audit</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <span className="inline-flex items-center space-x-1.5 text-[10px] font-bold text-care-green bg-care-green/10 px-3 py-1 rounded-full font-mono">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>CQC COMPLIANT AUDITED</span>
                    </span>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans italic">
                      {currentData.cqcAlignment}
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans border-t border-slate-100 pt-3">
                      <strong>Regulation Alignment:</strong> {activeMeta.cqcRegulation}
                    </p>
                  </div>
                </div>

                {/* Administrative & Clinical Oversight Logs */}
                <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-4 shadow-lg">
                  <div className="flex items-center space-x-2.5 text-premium-gold border-b border-white/10 pb-3">
                    <AlertTriangle className="w-5 h-5 animate-pulse" />
                    <h4 className="font-extrabold text-xs uppercase tracking-wider font-mono">{activeMeta.sidebarTitle}</h4>
                  </div>
                  <div className="space-y-3 text-xs text-slate-300">
                    {activeMeta.sidebarLogs.map((log, idx) => (
                      <div key={idx} className="border-l-2 border-premium-gold pl-3 py-1 space-y-0.5">
                        <p className="font-bold text-white text-[11px] uppercase font-mono tracking-wide">{log.title}</p>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{log.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Contact Assessor Card */}
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl text-xs space-y-2">
                  <h5 className="font-bold text-slate-800 uppercase font-mono tracking-wider text-[10px]">On-Duty Placement Access</h5>
                  <p className="text-slate-600 leading-relaxed font-sans">
                    All referral assessments are processed through our NHSmail-compliant gateways under strategic supervisor review. Contact Salman Muhammad or Boston Murray directly for real-time occupancy.
                  </p>
                </div>

              </div>

            </div>
          ) : (
            /* ========================================================= */
            /* LAYOUT 2 (EVEN PAGES): Vertical list layout with left-hand icons and emerald theme accents */
            /* ========================================================= */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: Staggered vertical cards, Premium Dark Practice Standard bar, and numbered Co-Production actions */}
              <div className="lg:col-span-8 space-y-8 animate-fadeIn">
                
                {/* Clinical Practice Protocols Box - Elevated to Top with Premium dark styling */}
                <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white p-6 rounded-2xl space-y-3 border-l-4 border-premium-gold shadow-md">
                  <div className="flex items-center space-x-2.5 text-premium-gold font-bold text-xs uppercase font-mono tracking-wider">
                    <FileText className="w-4.5 h-4.5 text-premium-gold animate-pulse" />
                    <span>Clinical Practice Protocols & Governance Framework</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans italic font-medium">
                    &ldquo;{currentData.sopText}&rdquo;
                  </p>
                </div>

                <div className="space-y-5">
                  <h3 className="text-xs uppercase font-extrabold tracking-widest font-mono text-slate-400">
                    Methodological Support Pathways
                  </h3>
                  
                  <div className="space-y-4">
                    {currentData.methodologies.map((method, idx) => {
                      const icons = [Sparkles, Award, Compass, Eye];
                      const ActiveIcon = icons[idx % icons.length];
                      return (
                        <div 
                          key={idx} 
                          className="flex items-start space-x-4 p-6 bg-slate-50/50 hover:bg-slate-50 border border-slate-200/80 rounded-2xl shadow-xs hover:shadow-sm transition-all duration-300"
                        >
                          <span className="p-3 bg-emerald-50 text-emerald-700 rounded-xl flex-shrink-0">
                            <ActiveIcon className="w-5 h-5" />
                          </span>
                          <div className="space-y-1">
                            <h4 className="font-extrabold text-sm text-gov-blue font-sans">
                              Care Pillar Pathway {idx + 1}
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed font-sans">
                              {method}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Person-Centred Service Delivery (Numbered actions list with backgrounds) */}
                <div className="bg-emerald-50/10 border border-emerald-100 p-8 rounded-3xl space-y-6 shadow-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 font-mono block">
                      Autonomous Co-Production
                    </span>
                    <h3 className="text-xl font-extrabold text-gov-blue font-sans">
                      Person-Centred Routines & Adaptive Goal Tracking
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentData.personCentred.map((pc, idx) => (
                      <div key={idx} className="bg-white p-4.5 border border-slate-100 rounded-2xl flex items-start space-x-3 text-xs text-slate-600 leading-relaxed shadow-xs">
                        <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5 font-mono">
                          {idx + 1}
                        </span>
                        <span className="font-medium text-slate-700 font-sans">{pc}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Emerald-themed CQC Standard Alignment Sidebar Card & Dark Forest Oversight Log */}
              <div className="lg:col-span-4 space-y-6 animate-fadeIn">
                
                {/* CQC Standards Alignment Sidebar Card (Emerald Theme) */}
                <div className="bg-emerald-50/30 border border-emerald-100 rounded-3xl p-6 space-y-4 shadow-xs">
                  <div className="flex items-center space-x-2.5 pb-4 border-b border-emerald-100">
                    <div className="w-9 h-9 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-extrabold text-xs font-mono">
                      CQC
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-emerald-900 uppercase font-mono tracking-wider">CQC Quality Standard</h4>
                      <p className="text-[9px] text-emerald-600 uppercase font-mono font-bold">Key Standard Audit</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <span className="inline-flex items-center space-x-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full font-mono">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>CQC COMPLIANT AUDITED</span>
                    </span>
                    <p className="text-xs text-emerald-850 leading-relaxed font-sans italic">
                      {currentData.cqcAlignment}
                    </p>
                    <p className="text-[11px] text-emerald-700/90 leading-relaxed font-sans border-t border-emerald-100 pt-3">
                      <strong>Regulation Alignment:</strong> {activeMeta.cqcRegulation}
                    </p>
                  </div>
                </div>

                {/* Dark Emerald Administrative & Clinical Oversight Logs */}
                <div className="bg-emerald-950 text-white p-6 rounded-2xl space-y-4 shadow-lg">
                  <div className="flex items-center space-x-2.5 text-premium-gold border-b border-white/10 pb-3">
                    <AlertTriangle className="w-5 h-5 text-premium-gold animate-pulse" />
                    <h4 className="font-extrabold text-xs uppercase tracking-wider font-mono text-emerald-400">{activeMeta.sidebarTitle}</h4>
                  </div>
                  <div className="space-y-3 text-xs text-slate-300">
                    {activeMeta.sidebarLogs.map((log, idx) => (
                      <div key={idx} className="border-l-2 border-premium-gold pl-3 py-1 space-y-0.5">
                        <p className="font-bold text-white text-[11px] uppercase font-mono tracking-wide">{log.title}</p>
                        <p className="text-[11px] text-emerald-200/80 leading-relaxed">{log.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Contact Assessor Card */}
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl text-xs space-y-2">
                  <h5 className="font-bold text-slate-800 uppercase font-mono tracking-wider text-[10px]">On-Duty Placement Access</h5>
                  <p className="text-slate-600 leading-relaxed font-sans">
                    All referral assessments are processed through our NHSmail-compliant gateways under strategic supervisor review. Contact Salman Muhammad or Boston Murray directly for real-time occupancy.
                  </p>
                </div>

              </div>

            </div>
          )}

        </div>
      </div>

      {/* 4. MEASURABLE EVIDENCE-BASED CARE OUTCOMES */}
      <section id="service-measurable-outcomes-section" className="py-24 bg-gradient-to-b from-white to-slate-50/70 border-t border-slate-150 relative overflow-hidden">
        {/* Subtle decorative vector mesh/circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/2 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-care-green/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-widest text-care-green bg-care-green/5 px-3 py-1 rounded-full font-mono inline-block">
              PROVEN DEVELOPMENTAL TRACK RECORD
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gov-blue tracking-tight">
              Resident Placement Outcomes
            </h2>
            <div className="w-12 h-1 bg-premium-gold mx-auto rounded-full" />
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              We monitor daily developmental progress and functional lifestyle milestones across 32 criteria on our digital systems. Here are the audited outcomes verified across our placements:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 max-w-4xl mx-auto">
            {currentData.outcomes.map((o, idx) => (
              <div key={idx} className="p-5 bg-white border border-slate-200/65 hover:border-care-green/30 hover:shadow-md transition-all duration-300 rounded-2xl flex items-start space-x-4 group shadow-sm">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition duration-300 flex-shrink-0 mt-0.5">
                  <TrendingUp className="w-4.5 h-4.5" />
                </div>
                <div className="space-y-1 text-left">
                  <span className="text-[9px] font-bold text-slate-400 font-mono block uppercase">Outcome Benchmark 0{idx + 1}</span>
                  <p className="text-xs font-bold text-slate-850 leading-relaxed font-sans">{o}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQS FOR THE SPECIFIC CARE PORTFOLIO (Polished interactive Accordion with no overlaps) */}
      <section id="service-methodology-faqs-section" className="py-24 bg-slate-50/70 border-t border-slate-200/60 relative overflow-hidden">
        {/* Subtle background visual anchor */}
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-slate-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-widest text-care-green bg-emerald-50 px-3 py-1 rounded-full font-mono inline-block">
              HAVE CLINICAL QUESTIONS?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gov-blue tracking-tight">
              Placement & Methodology FAQs
            </h2>
            <div className="w-12 h-1 bg-care-green mx-auto rounded-full" />
            <p className="text-slate-500 text-xs leading-relaxed">
              Find transparent answers to families' and clinical assessors' most frequent inquiries regarding care standards and transition pathways.
            </p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {currentData.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`bg-white border transition-all duration-300 rounded-2xl overflow-hidden shadow-xs ${isOpen ? "border-care-green shadow-md" : "border-slate-200 hover:border-slate-300"}`}>
                  <button 
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-extrabold text-gov-blue text-xs hover:bg-slate-50/50 transition cursor-pointer select-none"
                  >
                    <div className="flex items-center space-x-3.5">
                      <HelpCircle className={`w-4.5 h-4.5 flex-shrink-0 transition-colors duration-200 ${isOpen ? "text-care-green" : "text-premium-gold"}`} />
                      <span className="font-sans text-[12px] leading-snug">{faq.q}</span>
                    </div>
                    <span className={`p-1 rounded-lg transition-colors ${isOpen ? "bg-emerald-50 text-care-green" : "bg-slate-100 text-slate-400"}`}>
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 flex-shrink-0" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 flex-shrink-0" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-[12px] text-slate-600 leading-relaxed border-t border-slate-100/70 bg-slate-50/40 text-left">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CONTEXTUAL OUTCOME-DRIVEN CTA ROW */}
      <section className="py-16 bg-gov-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.02]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight font-sans">
            Ready to initiate a placement compatibility review or request a visit?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-sans">
            Our CQC Nominated Individual Boston Murray will review secure referral dossiers within 48 business hours. We coordinate closely with Local Authorities and families.
          </p>
          <div className="pt-2 flex justify-center space-x-3.5">
            <button 
              onClick={() => onNavigate("contact")}
              className="px-6 py-3 bg-premium-gold hover:bg-white text-gov-blue font-extrabold text-xs rounded-xl shadow-lg transition duration-200 transform active:scale-95 cursor-pointer"
            >
              Consult On-Duty Assessor
            </button>
            <button 
              onClick={() => onNavigate("referrals")}
              className="px-6 py-3 bg-white/15 hover:bg-white/25 border border-white/10 text-white font-bold text-xs rounded-xl transition duration-200 cursor-pointer"
            >
              Our Dynamic Referrals Portal →
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
