/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Phone,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  HeartHandshake,
  Activity,
  Dumbbell,
  Home,
  Clock,
  ChevronDown,
  X,
  Award,
  Users,
  Stethoscope,
  ArrowRight,
  Building,
  FileCheck
} from 'lucide-react';

// Real photography generated for Astor Health
const HERO_IMG = '/src/assets/images/hero_caregiver_senior_1794224895419.jpg';
const HHA_IMG = '/src/assets/images/home_health_aide_care_1794224896338.jpg';
const FITNESS_IMG = '/src/assets/images/senior_physical_fitness_1794224898464.jpg';
const LEADERSHIP_IMG = '/src/assets/images/care_director_consultation_1794224897908.jpg';
const ACA_SEAL_IMG = '/assets/aistudio/HQ-Transparent-File_c778bd0d.png';

interface ServiceDetail {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  whatItIs: string;
  whatWeDo: string[];
  conditions?: string[];
  recommendedFor: string;
  certification: string;
}

const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'hha',
    name: 'Home Health Aide (HHA)',
    shortName: 'Home Health Aide',
    tagline: 'Skilled, hands-on daily health and personal support at home',
    whatItIs: 'Skilled, hands-on daily health and personal support at home delivered by certified healthcare aides under physician-directed care plans.',
    whatWeDo: [
      'Checking vital signs (blood pressure, temperature, pulse, and oxygen saturation)',
      'Helping with medications and coordinating reminders according to clinical instructions',
      'Assisting with personal hygiene, bathing, dressing, and skin care',
      'Supporting safe transfer and movement around the house to prevent falls',
      'Following and documenting doctor-approved care plans for family and clinician peace of mind'
    ],
    recommendedFor: 'Individuals managing chronic conditions or recovering from surgery who require medical monitoring alongside daily support.',
    certification: 'NYS Certified Home Health Aide (HHA) with ongoing clinical in-service education.'
  },
  {
    id: 'pca',
    name: 'Personal Care Aide (PCA)',
    shortName: 'Personal Care Aide',
    tagline: 'Respectful daily assistance to help clients stay independent and comfortable',
    whatItIs: 'Respectful daily assistance to help clients stay independent and comfortable in the familiar surroundings of their own home.',
    whatWeDo: [
      'Help with daily bathing, grooming, and personal hygiene',
      'Assistance with getting dressed and morning/evening routines',
      'Support with safely using the restroom and incontinence care',
      'Assisting with walking safely and steady navigation throughout the house',
      'Friendly companionship, mental stimulation, and daily medication reminders'
    ],
    recommendedFor: 'Seniors and individuals who need a dependable helping hand with non-clinical daily living activities.',
    certification: 'Licensed Personal Care Aide with comprehensive background checks and empathy screening.'
  },
  {
    id: 'homemaker',
    name: 'Household Assistance (Homemaker Services)',
    shortName: 'Household Assistance',
    tagline: 'Non-medical help around the house to keep the home clean, safe, and stress-free',
    whatItIs: 'Non-medical help around the house to keep the home clean, safe, and stress-free for seniors and family caregivers.',
    whatWeDo: [
      'Light house cleaning, dusting, tidying, and maintaining sanitary living spaces',
      'Cooking healthy, wholesome meals tailored to dietary preferences and restrictions',
      'Laundry, folding clothes, and changing bed linens',
      'Grocery shopping, picking up prescriptions, and running household errands',
      'Escorting and driving clients to doctor appointments, community gatherings, or social outings'
    ],
    recommendedFor: 'Older adults who wish to avoid the physical strain of chores and families seeking peace of mind.',
    certification: 'Vetted, bonded, and trained household support specialists.'
  },
  {
    id: 'specialized',
    name: 'Specialized Care for Complex Health Conditions',
    shortName: 'Specialized Care',
    tagline: 'Expert, patient support for individuals recovering from surgery or living with ongoing health challenges',
    whatItIs: 'Expert, patient support for individuals recovering from surgery or living with ongoing health challenges requiring specialized protocols.',
    whatWeDo: [
      'Alzheimer’s disease and memory loss (dementia) cueing and gentle redirection',
      'Parkinson’s disease mobility assistance and tremors management',
      'Stroke recovery rehabilitation support and communication reinforcement',
      'ALS (Lou Gehrig’s disease) and Multiple Sclerosis (MS) physical adaptation',
      'Traumatic Brain Injury (TBI) specialized cognitive and sensory routines',
      'Care after hospital discharge or surgical procedures to reduce 30-day readmissions'
    ],
    conditions: [
      'Alzheimer’s disease & dementia',
      'Parkinson’s disease',
      'Stroke recovery & physical disabilities',
      'ALS & Multiple Sclerosis (MS)',
      'Traumatic Brain Injury (TBI)',
      'Post-hospital discharge & post-operative recovery'
    ],
    recommendedFor: 'Families managing multi-faceted medical diagnoses needing tailored caregiver matching.',
    certification: 'Advanced condition-specific care certifications and specialized clinical oversight.'
  },
  {
    id: 'fitness',
    name: 'In-Home Physical Fitness Training',
    shortName: 'Physical Fitness Training',
    tagline: 'Safe, one-on-one exercise programs led by certified trainers right in your living room',
    whatItIs: 'Safe, one-on-one exercise programs led by certified trainers right in your living room, designed to enhance vitality and reduce injury risks.',
    whatWeDo: [
      'Gentle strength exercises using resistance bands and light weights to sustain muscle tone',
      'Balance training and proprioception routines specifically designed to prevent dangerous falls',
      'Stretching and joint mobilization for improved daily flexibility and comfort',
      'Heart-healthy movement and aerobic conditioning designed around your exact physical abilities',
      'Progressive tracking of functional mobility milestones in coordination with your doctor'
    ],
    recommendedFor: 'Seniors seeking to maintain autonomy, regain balance, and stay energized safely at home.',
    certification: 'Certified Senior Fitness Specialists (CSFS) and certified physical trainers.'
  }
];

export default function App() {
  const [activeServiceModal, setActiveServiceModal] = useState<ServiceDetail | null>(null);
  const [isRequestCareOpen, setIsRequestCareOpen] = useState(false);
  const [isJoinTeamOpen, setIsJoinTeamOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);

  // Form states
  const [requestFormData, setRequestFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    locationState: 'New York',
    serviceNeeded: 'Home Health Aide (HHA)',
    hoursNeeded: 'Full-Time (24/7 Care)',
    notes: ''
  });
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const [careerFormData, setCareerFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    role: 'Home Health Aide (HHA)',
    experienceYears: '3+ years',
    certifications: 'NYS Certified HHA'
  });
  const [careerSubmitted, setCareerSubmitted] = useState(false);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSubmitted(true);
    setTimeout(() => {
      // keep open for confirmation message
    }, 500);
  };

  const handleCareerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCareerSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD] text-slate-800 flex flex-col selection:bg-amber-100 selection:text-slate-900">
      {/* SECTION 1: TOP NAVIGATION BAR - Inline, Clean & Compact */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Left Side: Astor Health Brand */}
          <div className="flex items-center gap-3 select-none shrink-0">
            <span className="text-2xl font-extrabold tracking-tight text-[#0B1B3D]">
              Astor<span className="text-amber-600 font-bold ml-1">Health</span>
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-semibold tracking-wide">
              24/7 Care
            </span>
          </div>

          {/* Center Links - Inline with About Us dropdown */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[15px] font-medium text-slate-600 select-none">
            <span className="text-[#0B1B3D] font-bold">Home</span>
            <span>Our Services</span>
            <span>Who We Help</span>
            <span>Client Stories</span>

            {/* About Us with Dropdown (containing Contact Us) */}
            <div
              className="relative"
              onMouseEnter={() => setIsAboutDropdownOpen(true)}
              onMouseLeave={() => setIsAboutDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                className="flex items-center gap-1 text-slate-600 hover:text-[#0B1B3D] font-medium transition-colors cursor-pointer py-1.5 focus:outline-hidden"
                aria-expanded={isAboutDropdownOpen}
              >
                <span>About Us</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isAboutDropdownOpen ? 'rotate-180 text-amber-600' : 'text-slate-400'}`} />
              </button>

              {isAboutDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <span className="block px-4 py-2 text-sm text-slate-700 hover:text-[#0B1B3D] hover:bg-slate-50 font-medium transition-colors cursor-default">
                    About Us
                  </span>
                  <span className="block px-4 py-2 text-sm text-slate-700 hover:text-[#0B1B3D] hover:bg-slate-50 font-medium transition-colors cursor-default border-t border-slate-100">
                    Contact Us
                  </span>
                </div>
              )}
            </div>
          </nav>

          {/* Right Side: Inline Phone & Action Buttons */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="tel:7184967111"
              className="inline-flex items-center gap-2 px-3 py-2 text-slate-800 hover:text-[#0B1B3D] text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span className="tabular-nums font-bold">(718) 496-7111</span>
            </a>

            <button
              onClick={() => setIsRequestCareOpen(true)}
              className="bg-[#0B1B3D] hover:bg-[#16284F] text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              Request Care
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <div className="space-y-1.5 w-6">
              <span className="block w-6 h-0.5 bg-slate-800"></span>
              <span className="block w-6 h-0.5 bg-slate-800"></span>
              <span className="block w-6 h-0.5 bg-slate-800"></span>
            </div>}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4">
            <nav className="flex flex-col space-y-3 text-lg font-medium text-slate-800 select-none">
              <span className="text-[#0B1B3D] font-semibold py-1">Home</span>
              <span className="py-1">Our Services</span>
              <span className="py-1">Who We Help</span>
              <span className="py-1">Client Stories</span>
              <div>
                <button
                  type="button"
                  onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                  className="w-full flex items-center justify-between py-1 text-left font-medium text-slate-800 cursor-pointer"
                >
                  <span>About Us</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isAboutDropdownOpen ? 'rotate-180 text-amber-600' : 'text-slate-400'}`} />
                </button>
                {isAboutDropdownOpen && (
                  <div className="pl-4 mt-1.5 space-y-2 text-base text-slate-600 border-l-2 border-amber-500">
                    <span className="block py-1">About Us</span>
                    <span className="block py-1">Contact Us</span>
                  </div>
                )}
              </div>
              <span className="py-1">FAQ</span>
            </nav>
            <div className="pt-3 border-t border-slate-200 flex flex-col gap-3">
              <a
                href="tel:7184967111"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-50 text-emerald-800 font-bold rounded-lg border border-emerald-200"
              >
                <Phone className="w-5 h-5 text-emerald-600" />
                <span>Call 24/7: (718) 496-7111</span>
              </a>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsRequestCareOpen(true);
                }}
                className="w-full py-3 bg-[#0B1B3D] text-white font-bold rounded-lg shadow-sm"
              >
                Request Care
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* SECTION 2: TOP BANNER (The "Hero" Area) */}
        <section className="relative bg-gradient-to-b from-white via-[#F5F8FC] to-[#FAFBFD] pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Heading, Copy, Action Buttons, Trust Bar */}
              <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
                {/* Only H1 heading on the page per instructions */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B3D] tracking-tight leading-[1.15] text-balance">
                  Reliable 24/7 In-Home Care Services in New York and Pennsylvania
                </h1>

                {/* Sub-heading */}
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
                  Astor Health provides licensed caregivers, home health aides, and personal support so you or your loved one can live safely, comfortably, and independently at home.
                </p>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    onClick={() => setIsRequestCareOpen(true)}
                    className="bg-[#0B1B3D] hover:bg-[#16284F] text-white px-7 py-3.5 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>Request Care Today</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href="tel:7184967111"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white hover:bg-slate-50 text-[#0B1B3D] border-2 border-slate-300 hover:border-[#0B1B3D] rounded-xl font-bold text-base transition-all shadow-xs"
                  >
                    <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Speak With Our Care Team: (718) 496-7111</span>
                  </a>
                </div>

                {/* Quick Trust Bar (Directly below buttons) */}
                <div className="pt-4 border-t border-slate-200/80">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-semibold text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>24/7 Caregiver Support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Licensed & Background-Checked Staff</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Custom Care Plans for Every Family</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: High Quality Caregiver Photo */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] lg:aspect-[16/11]">
                  <img
                    src={HERO_IMG}
                    alt="Astor Health caregiver helping a senior woman walk safely in her New York home"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACCREDITATION & CERTIFIED MEMBER EMBLEM */}
        <section className="bg-white border-b border-slate-200 py-6 sm:py-8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-center sm:text-left">
            <div className="shrink-0 flex items-center justify-center">
              <img
                src={ACA_SEAL_IMG}
                alt="American Caregiver Association Certified Member - The National Standard Since 1985"
                className="h-28 sm:h-32 w-auto object-contain drop-shadow-sm transition-transform hover:scale-105 duration-200"
              />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 text-xs font-semibold uppercase tracking-wider border border-blue-100">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                <span>National Care Standard Accreditation</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B1B3D]">
                American Caregiver Association · Certified Member
              </h3>
            </div>
          </div>
        </section>

        {/* SECTION 3: QUICK SUMMARY BLOCK (Built Specifically for AI & Voice Search) */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="bg-[#FAFBFD] border-2 border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs relative">
              {/* Exact H2 and Copy Format from Blueprint */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3D] mb-4">
                Complete Home Care Tailored to Your Family
              </h2>

              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-normal">
                Astor Health is a licensed home care agency based in Manhattan, New York (223 E 25th St, Unit G), serving families across New York and Pennsylvania. We deliver 24/7 in-home support for seniors, people with disabilities, and patients recovering from surgery or managing long-term illnesses. Our services include Home Health Aides, Personal Care Aides, Household Assistance, Specialized Medical Support, and In-Home Physical Fitness Training.
              </p>

              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>223 E 25th St, Unit G, New York, NY 10010</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <a href="tel:7184967111" className="font-bold text-slate-900 hover:underline">
                    (718) 496-7111 (24/7 Live Intake)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: CORE SERVICES GRID (What Astor Health Offers) */}
        <section id="services" className="py-16 sm:py-24 bg-[#FAFBFD] border-b border-slate-200 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3D] mb-4">
                Our Home Care Services
              </h2>
              <p className="text-lg text-slate-600">
                Whether your loved one needs a few hours of help with housework or full-time medical support, we match you with the right professional.
              </p>
            </div>

            {/* 5 Core Services Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service 1: Home Health Aide (HHA) */}
              <div className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1B3D] mb-2">
                    1. Home Health Aide (HHA)
                  </h3>
                  <div className="mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      What it is:
                    </span>
                    <p className="text-base text-slate-700 font-medium">
                      Skilled, hands-on daily health and personal support at home.
                    </p>
                  </div>
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      What we do:
                    </span>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>Checking vital signs (blood pressure, temperature, pulse)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>Helping with medications & schedule coordination</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>Personal hygiene & safe movement around the house</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>Following doctor-approved care plans</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Service 2: Personal Care Aide (PCA) */}
              <div className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1B3D] mb-2">
                    2. Personal Care Aide (PCA)
                  </h3>
                  <div className="mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      What it is:
                    </span>
                    <p className="text-base text-slate-700 font-medium">
                      Respectful daily assistance to help clients stay independent and comfortable.
                    </p>
                  </div>
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      What we do:
                    </span>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>Help with bathing, grooming, and getting dressed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>Assisting with restroom routines & mobility</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>Walking safely around the residence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>Friendly companionship & daily medication reminders</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Service 3: Household Assistance (Homemaker Services) */}
              <div className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Home className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1B3D] mb-2">
                    3. Household Assistance
                  </h3>
                  <div className="mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      What it is:
                    </span>
                    <p className="text-base text-slate-700 font-medium">
                      Non-medical help around the house to keep the home clean, safe, and stress-free.
                    </p>
                  </div>
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      What we do:
                    </span>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>Light house cleaning, dusting, and tidying rooms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>Cooking healthy, nutritious meals and dietary prep</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>Laundry, changing bed linens, and grocery shopping</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>Driving clients to doctor appointments or social outings</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Service 4: Specialized Care for Complex Health Conditions */}
              <div className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all group lg:col-span-2">
                <div>
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Activity className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1B3D] mb-2">
                    4. Specialized Care for Complex Health Conditions
                  </h3>
                  <div className="mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      What it is:
                    </span>
                    <p className="text-base text-slate-700 font-medium">
                      Expert, patient support for individuals recovering from surgery or living with ongoing health challenges.
                    </p>
                  </div>
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Conditions we support:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
                      <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                        <span>Alzheimer’s disease and memory loss (dementia)</span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                        <span>Parkinson’s disease</span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                        <span>Stroke recovery and physical disabilities</span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                        <span>ALS (Lou Gehrig’s disease) & MS</span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                        <span>Traumatic Brain Injury (TBI)</span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                        <span>Care after hospital discharge or surgery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service 5: In-Home Physical Fitness Training */}
              <div className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Dumbbell className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1B3D] mb-2">
                    5. In-Home Physical Fitness Training
                  </h3>
                  <div className="mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      What it is:
                    </span>
                    <p className="text-base text-slate-700 font-medium">
                      Safe, one-on-one exercise programs led by certified trainers right in your living room.
                    </p>
                  </div>
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      What we do:
                    </span>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>Gentle strength exercises with resistance bands</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>Balance training to prevent dangerous falls</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>Stretching routines for joint flexibility</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>Heart-healthy movement tailored to your abilities</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Single Unified Action below services grid */}
            <div className="mt-12 text-center">
              <button
                onClick={() => setActiveServiceModal(SERVICES_DATA[0])}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0B1B3D] hover:bg-[#16284F] text-white font-bold text-base rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <span>Learn More About Our Services</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 5: WHO WE HELP (Audience Clarity) */}
        <section id="who-we-help" className="py-16 sm:py-24 bg-white border-b border-slate-200 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                Support for Every Family Situation
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3D] mt-2 mb-4">
                Who We Serve
              </h2>
              <p className="text-lg text-slate-600">
                People often search based on who needs help rather than technical healthcare terms. Here is how we provide dedicated care for your loved one.
              </p>
            </div>

            {/* 4 Simple Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Column 1 */}
              <div className="bg-[#FAFBFD] p-6 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                    <Home className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Seniors Living at Home
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Helping older adults stay in the homes they love with daily help, dignity, safety, and companionship.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-semibold text-amber-800">
                  Daily Independence & Safety
                </div>
              </div>

              {/* Column 2 */}
              <div className="bg-[#FAFBFD] p-6 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Patients Recovering from Surgery
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Short-term or long-term support while healing after a hospital stay, minimizing complications and preventing readmissions.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-semibold text-blue-800">
                  Hospital-to-Home Transition
                </div>
              </div>

              {/* Column 3 */}
              <div className="bg-[#FAFBFD] p-6 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Individuals with Disabilities
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Dedicated daily care, physical mobility support, and assistive routines to encourage maximum personal autonomy.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-semibold text-emerald-800">
                  Empowering Autonomy
                </div>
              </div>

              {/* Column 4 */}
              <div className="bg-[#FAFBFD] p-6 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center mb-4">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Family Caregivers Needing a Break (Respite Care)
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Stepping in so family members can rest, work, or take time for themselves knowing their loved one is in safe, licensed hands.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-semibold text-purple-800">
                  Flexible Respite Schedules
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: HOW TO GET STARTED (3 Simple Steps) */}
        <section className="py-16 sm:py-24 bg-[#FAFBFD] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3D] mb-4">
                How to Start Care with Astor Health
              </h2>
              <p className="text-lg text-slate-600">
                Getting compassionate, reliable care for your family shouldn't feel overwhelming. We make starting simple in three clear steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs relative flex flex-col">
                <div className="w-12 h-12 rounded-full bg-[#0B1B3D] text-white flex items-center justify-center font-black text-xl mb-6 shadow-sm">
                  1
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Free Care Conversation
                </h3>
                <p className="text-base text-slate-600 leading-relaxed mb-6 flex-1">
                  Call us anytime at{' '}
                  <a href="tel:7184967111" className="font-bold text-[#0B1B3D] underline">
                    (718) 496-7111
                  </a>{' '}
                  or fill out our online form to tell us about your family’s needs, routines, and timing.
                </p>
                <button
                  onClick={() => setIsRequestCareOpen(true)}
                  className="text-sm font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Start Conversation Online</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs relative flex flex-col">
                <div className="w-12 h-12 rounded-full bg-[#0B1B3D] text-white flex items-center justify-center font-black text-xl mb-6 shadow-sm">
                  2
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Custom Care Plan
                </h3>
                <p className="text-base text-slate-600 leading-relaxed mb-6 flex-1">
                  Working with you and your doctors, we create a daily care schedule that fits your health needs, home routine, and family budget.
                </p>
                <div className="text-xs font-semibold text-slate-400">
                  Personalized to your physician's guidance
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs relative flex flex-col">
                <div className="w-12 h-12 rounded-full bg-[#0B1B3D] text-white flex items-center justify-center font-black text-xl mb-6 shadow-sm">
                  3
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Caregiver Match
                </h3>
                <p className="text-base text-slate-600 leading-relaxed mb-6 flex-1">
                  We introduce you to a trained, compassionate caregiver who fits your family’s personality, cultural preferences, and clinical requirements.
                </p>
                <div className="text-xs font-semibold text-emerald-700 font-bold">
                  Guaranteed caregiver compatibility
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: WHY FAMILIES TRUST ASTOR HEALTH (Authority & Real Facts) */}
        <section id="about" className="py-16 sm:py-24 bg-white border-b border-slate-200 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3D] mb-4">
                Why Choose Astor Health?
              </h2>
              <p className="text-lg text-slate-600">
                Healthcare is personal. Here are the core promises and genuine leadership values that guide every caregiver in our agency.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column (Key Promises) */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-[#FAFBFD] p-6 rounded-2xl border border-slate-200 flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      Available 24 Hours a Day, 7 Days a Week
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Real people answer the phone whenever an emergency or question comes up—never an automated runaround or unanswered voicemail.
                    </p>
                  </div>
                </div>

                <div className="bg-[#FAFBFD] p-6 rounded-2xl border border-slate-200 flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      Carefully Vetted Caregivers
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Every aide and trainer is thoroughly trained, background-checked, credentialed, and selected for genuine kindness, patience, and warmth.
                    </p>
                  </div>
                </div>

                <div className="bg-[#FAFBFD] p-6 rounded-2xl border border-slate-200 flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      Healthcare Partnerships
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      We coordinate directly with hospitals, rehabilitation centers, physicians, and community healthcare organizations for seamless transitions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column (Our Story & Leadership) */}
              <div className="lg:col-span-6 bg-gradient-to-br from-[#0B1B3D] to-[#16284F] text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
                <div className="relative z-10 space-y-6">

                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    Rooted in the Value of Family
                  </h3>

                  <p className="text-slate-200 text-base leading-relaxed">
                    Astor Health was founded by <strong className="text-white">JP de Leon, Director of Operations</strong>, with a mission to bring compassionate, reliable care directly into the homes of families across New York and Pennsylvania.
                  </p>

                  <blockquote className="border-l-2 border-amber-400 pl-4 py-1 italic text-slate-100 text-base">
                    "Inspired by Robert I. Toll's guiding belief that family is life's most prized possession, our daily pledge is to treat your loved ones with the exact dignity, patience, and vigilance we would give our own parents."
                  </blockquote>

                  <div className="pt-4 border-t border-white/10 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400 shrink-0">
                      <img
                        src={LEADERSHIP_IMG}
                        alt="JP de Leon Director of Operations Astor Health reviewing family care plan"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-white text-base">JP de Leon</div>
                      <div className="text-xs text-amber-300 font-medium">
                        Director of Operations · Astor Health
                      </div>
                      <div className="text-xs text-slate-300">
                        Manhattan Office: 223 E 25th St, Unit G, New York, NY
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: REAL CLIENT STORIES (Social Proof) */}
        <section id="stories" className="py-16 sm:py-24 bg-[#FAFBFD] border-b border-slate-200 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3D] mb-4">
                What Families Say About Our Care
              </h2>
              <p className="text-lg text-slate-600">
                Real feedback from family members who rely on Astor Health every single day.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Quote 1 */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex text-amber-400">
                    {'★'.repeat(5)}
                  </div>
                  <p className="text-lg sm:text-xl text-slate-800 italic leading-relaxed font-normal">
                    "There just aren't enough words that capture how strongly positive I feel about the agency and everybody I have encountered with them."
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-900">— Barbara G.</span>
                  <span className="text-slate-500 font-medium">Manhattan, NY</span>
                </div>
              </div>

              {/* Quote 2 */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex text-amber-400">
                    {'★'.repeat(5)}
                  </div>
                  <p className="text-lg sm:text-xl text-slate-800 italic leading-relaxed font-normal">
                    "I see them being as the major health provider in the area and like the cream where people go to who want the best."
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-900">— Jane T.</span>
                  <span className="text-slate-500 font-medium">New York, NY</span>
                </div>
              </div>
            </div>

            {/* Link from blueprint */}
            <div className="text-center mt-10">
              <button
                onClick={() => setIsRequestCareOpen(true)}
                className="inline-flex items-center gap-2 font-bold text-[#0B1B3D] hover:text-amber-700 transition-colors text-base underline underline-offset-4 cursor-pointer"
              >
                <span>Read More Family Stories</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 9: DIRECT QUESTIONS & ANSWERS (The AEO & GEO Powerhouse) */}
        <section id="faq" className="py-16 sm:py-24 bg-white border-b border-slate-200 scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3D] mb-4">
                Frequently Asked Questions About Home Care
              </h2>
            </div>

            <div className="space-y-4">
              {/* FAQ 1 */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-[#FAFBFD]">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-lg hover:bg-slate-100/60 transition-colors"
                >
                  <span>What is the difference between a Home Health Aide (HHA) and a Personal Care Aide (PCA)?</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform ${openFaqIndex === 0 ? 'rotate-180 text-amber-600' : ''}`}
                  />
                </button>
                {openFaqIndex === 0 && (
                  <div className="px-5 pb-5 pt-1 text-slate-700 text-base leading-relaxed border-t border-slate-100 bg-white">
                    <strong>Both help with daily tasks like bathing, dressing, and meal preparation,</strong> but a Home Health Aide (HHA) has extra training to monitor vital signs (like blood pressure and pulse) and assist with more specific medical care plans, while a Personal Care Aide (PCA) focuses on everyday personal comfort, grooming, and companionship.
                  </div>
                )}
              </div>

              {/* FAQ 2 */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-[#FAFBFD]">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-lg hover:bg-slate-100/60 transition-colors"
                >
                  <span>Does Astor Health provide care for people with Alzheimer's or dementia?</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform ${openFaqIndex === 1 ? 'rotate-180 text-amber-600' : ''}`}
                  />
                </button>
                {openFaqIndex === 1 && (
                  <div className="px-5 pb-5 pt-1 text-slate-700 text-base leading-relaxed border-t border-slate-100 bg-white">
                    <strong>Yes, Astor Health provides specialized in-home care</strong> for individuals living with Alzheimer's disease, dementia, Parkinson's disease, ALS, Multiple Sclerosis, stroke recovery, and traumatic brain injuries.
                  </div>
                )}
              </div>

              {/* FAQ 3 */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-[#FAFBFD]">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === 2 ? null : 2)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-lg hover:bg-slate-100/60 transition-colors"
                >
                  <span>What areas does Astor Health serve?</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform ${openFaqIndex === 2 ? 'rotate-180 text-amber-600' : ''}`}
                  />
                </button>
                {openFaqIndex === 2 && (
                  <div className="px-5 pb-5 pt-1 text-slate-700 text-base leading-relaxed border-t border-slate-100 bg-white">
                    <strong>Astor Health serves individuals and families across New York</strong> (with our main office in Manhattan at 223 E 25th St, Unit G) and Pennsylvania.
                  </div>
                )}
              </div>

              {/* FAQ 4 */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-[#FAFBFD]">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === 3 ? null : 3)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-lg hover:bg-slate-100/60 transition-colors"
                >
                  <span>Can I get a caregiver for 24-hour support or just a few hours a week?</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform ${openFaqIndex === 3 ? 'rotate-180 text-amber-600' : ''}`}
                  />
                </button>
                {openFaqIndex === 3 && (
                  <div className="px-5 pb-5 pt-1 text-slate-700 text-base leading-relaxed border-t border-slate-100 bg-white">
                    <strong>Yes, we build custom schedules</strong> ranging from a few hours a week for housework and errands to full 24/7 around-the-clock care at home.
                  </div>
                )}
              </div>

              {/* FAQ 5 */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-[#FAFBFD]">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === 4 ? null : 4)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-lg hover:bg-slate-100/60 transition-colors"
                >
                  <span>How can healthcare facilities or careers applicants contact Astor Health?</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform ${openFaqIndex === 4 ? 'rotate-180 text-amber-600' : ''}`}
                  />
                </button>
                {openFaqIndex === 4 && (
                  <div className="px-5 pb-5 pt-1 text-slate-700 text-base leading-relaxed border-t border-slate-100 bg-white space-y-2">
                    <p>
                      <strong>Families and healthcare partners can call (718) 496-7111</strong> or email{' '}
                      <a href="mailto:info@astorhealth.com" className="font-bold underline text-[#0B1B3D]">
                        info@astorhealth.com
                      </a>.
                    </p>
                    <p>
                      Caregivers looking to join our team can call{' '}
                      <a href="tel:6468772943" className="font-bold underline text-[#0B1B3D]">
                        (646) 877-2943
                      </a>{' '}
                      or email{' '}
                      <a href="mailto:recruitment@astorhealth.com" className="font-bold underline text-[#0B1B3D]">
                        recruitment@astorhealth.com
                      </a>.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10: CLEAR FOOTER (Complete Business Identity) */}
        <footer id="contact" className="bg-[#0B1B3D] text-white pt-16 pb-12 border-t-4 border-amber-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-700/80">
              {/* Col 1: Brand & Manhattan Address */}
              <div className="lg:col-span-4 space-y-4">
                <div>
                  <span className="text-2xl font-black tracking-tight text-white">
                    Astor<span className="text-amber-400">Health</span>
                  </span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Licensed 24/7 in-home care agency dedicated to keeping seniors, postoperative patients, and individuals with disabilities safe and comfortable at home.
                </p>

                <div className="space-y-2 text-sm text-slate-200 pt-2">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Manhattan Office Address:</strong>
                      <span>223 E 25th St, Unit G, New York, NY 10010</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Building className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      <strong className="text-white">Service Areas:</strong> New York & Pennsylvania
                    </span>
                  </div>
                </div>
              </div>

              {/* Col 2: Real Contact Phone Numbers & Emails */}
              <div className="lg:col-span-4 space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                  Direct Contact & Intake
                </h4>
                <div className="space-y-3 text-sm text-slate-200">
                  <div>
                    <span className="text-xs text-slate-400 block">Request Care Phone (24/7):</span>
                    <a
                      href="tel:7184967111"
                      className="text-lg font-bold text-white hover:text-amber-300 transition-colors flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4 text-emerald-400" />
                      <span>(718) 496-7111</span>
                    </a>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Recruitment / Jobs Phone:</span>
                    <a
                      href="tel:6468772943"
                      className="font-bold text-white hover:text-amber-300 transition-colors flex items-center gap-2"
                    >
                      <Users className="w-4 h-4 text-blue-400" />
                      <span>(646) 877-2943</span>
                    </a>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Confidential Healthcare Fax:</span>
                    <span className="tabular-nums text-slate-300">(646) 777-5164</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Email Inquiries:</span>
                    <div className="space-y-0.5">
                      <a href="mailto:info@astorhealth.com" className="text-amber-300 hover:underline block">
                        info@astorhealth.com
                      </a>
                      <a href="mailto:recruitment@astorhealth.com" className="text-amber-300 hover:underline block">
                        recruitment@astorhealth.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Col 3: Quick Links - Plain text, not clickable */}
              <div className="lg:col-span-4 space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                  Quick Links
                </h4>
                <div className="flex flex-col space-y-2 text-sm text-slate-300 select-none">
                  <span>Our Services</span>
                  <span>Who We Help</span>
                  <span>About Us</span>
                  <span>Client Stories</span>
                  <span>Frequently Asked Questions</span>
                  <span>Privacy Policy</span>
                  <span>Partner With Us</span>
                  <span>Join Our Team</span>
                </div>
              </div>
            </div>

            {/* Bottom copyright */}
            <div className="pt-8 flex items-center justify-center text-xs text-slate-400">
              <p>© {new Date().getFullYear()} Astor Health. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </main>

      {/* FLOATING ACTION PILL: 24/7 CALL */}
      <div className="fixed bottom-6 right-6 z-30">
        <a
          href="tel:7184967111"
          className="bg-[#0B1B3D] hover:bg-[#16284F] text-white px-5 py-3 rounded-full font-bold text-sm shadow-xl flex items-center gap-2 transition-all hover:scale-102"
          aria-label="Call Astor Health 24/7 Care Dispatch"
        >
          <Phone className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Call 24/7: (718) 496-7111</span>
        </a>
      </div>

      {/* MODAL 1: REQUEST CARE INTAKE MODAL */}
      {isRequestCareOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsRequestCareOpen(false);
                setRequestSubmitted(false);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
              aria-label="Close dialog"
            >
              <X className="w-6 h-6" />
            </button>

            {requestSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Request Received</h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  Thank you for reaching out to Astor Health. A care coordinator will review your information and call you within 15–30 minutes to discuss your custom care plan.
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-700">
                  Need immediate care right now? Call our 24/7 hotline directly:{' '}
                  <a href="tel:7184967111" className="font-bold text-[#0B1B3D] underline">
                    (718) 496-7111
                  </a>
                </div>
                <button
                  onClick={() => {
                    setIsRequestCareOpen(false);
                    setRequestSubmitted(false);
                  }}
                  className="px-6 py-2.5 bg-[#0B1B3D] text-white font-bold rounded-lg mt-4 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    Astor Health Care Intake
                  </span>
                  <h3 className="text-2xl font-bold text-[#0B1B3D] mt-1">
                    Request Care for Your Family
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Tell us what help your loved one needs, or call our 24/7 intake desk directly at{' '}
                    <a href="tel:7184967111" className="font-bold text-[#0B1B3D] underline">
                      (718) 496-7111
                    </a>.
                  </p>
                </div>

                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={requestFormData.fullName}
                      onChange={(e) => setRequestFormData({ ...requestFormData, fullName: e.target.value })}
                      placeholder="e.g., Sarah Johnson"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0B1B3D] focus:border-transparent text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={requestFormData.phone}
                        onChange={(e) => setRequestFormData({ ...requestFormData, phone: e.target.value })}
                        placeholder="(718) 000-0000"
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0B1B3D] focus:border-transparent text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={requestFormData.email}
                        onChange={(e) => setRequestFormData({ ...requestFormData, email: e.target.value })}
                        placeholder="sarah@example.com"
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0B1B3D] focus:border-transparent text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Location / State *
                      </label>
                      <select
                        value={requestFormData.locationState}
                        onChange={(e) => setRequestFormData({ ...requestFormData, locationState: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0B1B3D] text-sm"
                      >
                        <option value="New York">New York (All Boroughs & Suburbs)</option>
                        <option value="Pennsylvania">Pennsylvania</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Schedule Needed *
                      </label>
                      <select
                        value={requestFormData.hoursNeeded}
                        onChange={(e) => setRequestFormData({ ...requestFormData, hoursNeeded: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0B1B3D] text-sm"
                      >
                        <option value="Full-Time (24/7 Care)">Full-Time (24/7 Around the Clock)</option>
                        <option value="Daytime Support (8–12 hrs/day)">Daytime Support (8–12 hrs/day)</option>
                        <option value="Part-Time (A few hours / week)">Part-Time (A few hours / week)</option>
                        <option value="Respite Care for Family">Respite Care for Family</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Primary Service Needed
                    </label>
                    <select
                      value={requestFormData.serviceNeeded}
                      onChange={(e) => setRequestFormData({ ...requestFormData, serviceNeeded: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0B1B3D] text-sm"
                    >
                      <option value="Home Health Aide (HHA)">Home Health Aide (HHA) – Vital signs & health tasks</option>
                      <option value="Personal Care Aide (PCA)">Personal Care Aide (PCA) – Bathing, dressing & companionship</option>
                      <option value="Household Assistance">Household Assistance – Cleaning, cooking & errands</option>
                      <option value="Specialized Care">Specialized Care – Alzheimer's, Parkinson's, Stroke</option>
                      <option value="In-Home Fitness">In-Home Physical Fitness Training – Fall prevention</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Brief Notes / Health Conditions
                    </label>
                    <textarea
                      rows={3}
                      value={requestFormData.notes}
                      onChange={(e) => setRequestFormData({ ...requestFormData, notes: e.target.value })}
                      placeholder="Tell us about your loved one's situation, mobility, or discharge date..."
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0B1B3D] text-sm"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-3">
                    <a
                      href="tel:7184967111"
                      className="text-xs text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Prefer to call? (718) 496-7111</span>
                    </a>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#0B1B3D] hover:bg-[#16284F] text-white font-bold rounded-xl shadow-md cursor-pointer"
                    >
                      Submit Care Request
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: JOIN OUR TEAM (Caregiver Recruitment) */}
      {isJoinTeamOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsJoinTeamOpen(false);
                setCareerSubmitted(false);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
              aria-label="Close dialog"
            >
              <X className="w-6 h-6" />
            </button>

            {careerSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Application Received</h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  Thank you for applying to join the Astor Health caregiver family. Our HR recruitment team will review your credentials and contact you within 24 hours.
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-700">
                  Questions? Call our Recruitment Line directly:{' '}
                  <a href="tel:6468772943" className="font-bold text-[#0B1B3D] underline">
                    (646) 877-2943
                  </a>{' '}
                  or email{' '}
                  <a href="mailto:recruitment@astorhealth.com" className="font-bold text-[#0B1B3D] underline">
                    recruitment@astorhealth.com
                  </a>.
                </div>
                <button
                  onClick={() => {
                    setIsJoinTeamOpen(false);
                    setCareerSubmitted(false);
                  }}
                  className="px-6 py-2.5 bg-[#0B1B3D] text-white font-bold rounded-lg mt-4 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    Careers at Astor Health
                  </span>
                  <h3 className="text-2xl font-bold text-[#0B1B3D] mt-1">
                    Join Our Caregiver & Trainer Team
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    We offer competitive pay, flexible hours across NY & PA, health benefits, and a supportive team culture.
                  </p>
                </div>

                <div className="mb-5 p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center justify-between">
                  <div>
                    <span className="font-bold block">Recruitment Hotline:</span>
                    <a href="tel:6468772943" className="font-bold underline text-blue-950 text-sm">
                      (646) 877-2943
                    </a>
                  </div>
                  <span className="text-slate-500">recruitment@astorhealth.com</span>
                </div>

                <form onSubmit={handleCareerSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={careerFormData.fullName}
                      onChange={(e) => setCareerFormData({ ...careerFormData, fullName: e.target.value })}
                      placeholder="e.g., Maria Santos"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0B1B3D] text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={careerFormData.phone}
                        onChange={(e) => setCareerFormData({ ...careerFormData, phone: e.target.value })}
                        placeholder="(646) 000-0000"
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0B1B3D] text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={careerFormData.email}
                        onChange={(e) => setCareerFormData({ ...careerFormData, email: e.target.value })}
                        placeholder="maria@example.com"
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0B1B3D] text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Desired Position *
                      </label>
                      <select
                        value={careerFormData.role}
                        onChange={(e) => setCareerFormData({ ...careerFormData, role: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0B1B3D] text-sm"
                      >
                        <option value="Home Health Aide (HHA)">Home Health Aide (HHA)</option>
                        <option value="Personal Care Aide (PCA)">Personal Care Aide (PCA)</option>
                        <option value="Homemaker / Housekeeper">Homemaker / Housekeeper</option>
                        <option value="Certified Fitness Trainer">Certified In-Home Fitness Trainer</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Years of Experience
                      </label>
                      <select
                        value={careerFormData.experienceYears}
                        onChange={(e) => setCareerFormData({ ...careerFormData, experienceYears: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0B1B3D] text-sm"
                      >
                        <option value="1–2 years">1–2 years</option>
                        <option value="3+ years">3+ years</option>
                        <option value="5+ years">5+ years</option>
                        <option value="Entry Level / In Training">Entry Level / In Training</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Certifications Held
                    </label>
                    <input
                      type="text"
                      value={careerFormData.certifications}
                      onChange={(e) => setCareerFormData({ ...careerFormData, certifications: e.target.value })}
                      placeholder="e.g., NYS Certified HHA, CPR/First Aid, CSFS"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0B1B3D] text-sm"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsJoinTeamOpen(false)}
                      className="px-4 py-2.5 text-slate-600 hover:text-slate-800 text-sm font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#0B1B3D] hover:bg-[#16284F] text-white font-bold rounded-xl shadow-md cursor-pointer text-sm"
                    >
                      Submit Caregiver Application
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: SERVICE DETAIL MODAL (Deep-Dive) */}
      {activeServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveServiceModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
              aria-label="Close dialog"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                  Service Specification
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3D] mt-1">
                  {activeServiceModal.name}
                </h3>
                <p className="text-base text-slate-600 mt-2 font-medium">
                  {activeServiceModal.tagline}
                </p>
              </div>

              {/* High quality photo related to the service */}
              <div className="rounded-xl overflow-hidden aspect-[16/9] border border-slate-200">
                <img
                  src={
                    activeServiceModal.id === 'fitness'
                      ? FITNESS_IMG
                      : activeServiceModal.id === 'specialized'
                      ? LEADERSHIP_IMG
                      : HHA_IMG
                  }
                  alt={activeServiceModal.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Clinical Scope & Description
                </h4>
                <p className="text-base text-slate-700 leading-relaxed">
                  {activeServiceModal.whatItIs}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Daily Tasks & Caregiver Duties
                </h4>
                <ul className="space-y-2.5 text-sm text-slate-700">
                  {activeServiceModal.whatWeDo.map((task, i) => (
                    <li key={i} className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {activeServiceModal.conditions && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Conditions We Support
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeServiceModal.conditions.map((c, i) => (
                      <span key={i} className="text-xs font-semibold px-3 py-1 bg-purple-50 text-purple-800 rounded-md border border-purple-200">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <p>
                  <strong>Caregiver Qualification:</strong> {activeServiceModal.certification}
                </p>
                <p>
                  <strong>Recommended For:</strong> {activeServiceModal.recommendedFor}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <a
                  href="tel:7184967111"
                  className="font-bold text-[#0B1B3D] text-sm flex items-center gap-1.5 hover:underline"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Call to Schedule: (718) 496-7111</span>
                </a>
                <button
                  onClick={() => {
                    setRequestFormData({
                      ...requestFormData,
                      serviceNeeded: activeServiceModal.name
                    });
                    setActiveServiceModal(null);
                    setIsRequestCareOpen(true);
                  }}
                  className="px-6 py-2.5 bg-[#0B1B3D] hover:bg-[#16284F] text-white font-bold rounded-xl text-sm shadow-md cursor-pointer"
                >
                  Request {activeServiceModal.shortName}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: PRIVACY POLICY MODAL */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setIsPrivacyModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
              aria-label="Close dialog"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="space-y-4">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                Client Confidentiality
              </span>
              <h3 className="text-2xl font-bold text-[#0B1B3D]">
                HIPAA &amp; Privacy Policy
              </h3>
              <div className="text-sm text-slate-600 space-y-3 leading-relaxed">
                <p>
                  Astor Health strictly complies with the Health Insurance Portability and Accountability Act (HIPAA), state health regulations, and client confidentiality standards.
                </p>
                <p>
                  All patient medical records, personal identifying information, and family care schedules are protected with strict administrative, physical, and technical safeguards. We never sell or share patient data with third parties.
                </p>
                <p>
                  For any privacy inquiries or health record requests, please contact our compliance desk at{' '}
                  <a href="mailto:info@astorhealth.com" className="text-[#0B1B3D] font-bold underline">
                    info@astorhealth.com
                  </a>{' '}
                  or call{' '}
                  <a href="tel:7184967111" className="text-[#0B1B3D] font-bold underline">
                    (718) 496-7111
                  </a>.
                </p>
              </div>
              <button
                onClick={() => setIsPrivacyModalOpen(false)}
                className="w-full mt-4 py-2.5 bg-[#0B1B3D] text-white font-bold rounded-xl cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
