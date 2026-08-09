import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { Card } from '../../components/Card';
import { platformStats, howItWorksSteps, testimonials as mockTestimonials, faqs as mockFaqs } from '../../data/mockData';
import { getFaqs, getTestimonials } from '../../services/api';
import { 
  Users, 
  Zap, 
  TrendingUp, 
  Globe, 
  Sprout, 
  Bug, 
  BarChart3, 
  Sliders, 
  Map, 
  Droplet, 
  FileText,
  Check,
  Award,
  Activity,
  Star,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [faqsList, setFaqsList] = useState(mockFaqs);
  const [testimonialsList, setTestimonialsList] = useState(mockTestimonials);

  useEffect(() => {
    let isMounted = true;
    Promise.allSettled([getFaqs(), getTestimonials()]).then(([faqsRes, testRes]) => {
      if (isMounted) {
        if (faqsRes.status === 'fulfilled' && Array.isArray(faqsRes.value) && faqsRes.value.length > 0) {
          setFaqsList(faqsRes.value);
        }
        if (testRes.status === 'fulfilled' && Array.isArray(testRes.value) && testRes.value.length > 0) {
          setTestimonialsList(testRes.value);
        }
      }
    });
    return () => { isMounted = false; };
  }, []);

  // Map icon strings to Lucide components for Stats Bar
  const getStatsIcon = (iconName) => {
    switch (iconName) {
      case 'Users': return Users;
      case 'Zap': return Zap;
      case 'TrendingUp': return TrendingUp;
      case 'Globe': return Globe;
      default: return Globe;
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const highlightFeatures = [
    {
      title: 'Fertilizer Management',
      description: 'Calculated plans per crop based on land and soil characteristics.',
      icon: Sliders
    },
    {
      title: 'Disease Detection',
      description: 'Upload crop images to immediately identify diseases & pests.',
      icon: Bug
    },
    {
      title: 'Farm Analytics',
      description: 'Review historical reports & crop moisture trends on the fly.',
      icon: BarChart3
    }
  ];

  const gridFeatures = [
    {
      title: 'Smart Fertilizer Planning',
      description: 'Calculate exact fertilizer quantities based on crop type, land area, and soil conditions.',
      icon: Sliders
    },
    {
      title: 'Disease Detection',
      description: 'Upload crop images to detect diseases early and get precise treatment recommendations.',
      icon: Bug
    },
    {
      title: 'Interactive Farm Map',
      description: 'Visualize your entire farm with Google Maps integration and section-wise health data.',
      icon: Map
    },
    {
      title: 'Crop Health Analytics',
      description: 'Track crop health trends, soil moisture, temperature, and humidity over time.',
      icon: TrendingUp
    },
    {
      title: 'Smart Spray Control',
      description: 'Manage pesticide applications with schedule, quantity, and safety information.',
      icon: Droplet
    },
    {
      title: 'Farm Reports',
      description: 'Generate downloadable reports on yield, fertilizer usage, disease history, and more.',
      icon: FileText
    }
  ];

  const chooseChecklist = [
    'Designed specifically for Indian crops and soil conditions',
    'Manager-verified registration for authentic farmer support',
    'Multi-language support: English, Tamil, Hindi',
    'Completely free to register and use the core platform',
    'Dedicated farm manager assigned to every farmer'
  ];

  const chooseStats = [
    { value: '4.9★', label: 'Average Rating' },
    { value: '99.5%', label: 'Uptime' },
    { value: '< 24h', label: 'Support Response' },
    { value: '12K+', label: 'Active Farmers' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 scroll-smooth">
      {/* Navigation Header */}
      <Navbar variant="public" />

      {/* 1. HERO SECTION */}
      <section className="relative bg-darkgreen text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ecfdf5_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-[#1b4e3e] border border-emerald-800 text-[#86efac] px-4 py-1.5 rounded-full text-xs font-bold tracking-wide select-none shadow-sm">
            <Sprout size={14} className="stroke-[2.5]" />
            Smart Agriculture Management Platform
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white">
            Sustainable Fertilizer <br />
            <span className="text-[#4ade80]">Usage Optimizer</span> <br />
            for Higher Yield
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-normal leading-relaxed">
            Data-driven farm management &mdash; optimize fertilizer usage, detect diseases early, 
            monitor crop health, and maximize your agricultural yield sustainably.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/sign-in')}
              className="w-full sm:w-auto bg-white text-darkgreen hover:bg-slate-100 font-bold px-8 py-3.5 rounded-full shadow-md text-sm transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              Get Started Free <ArrowRight size={16} className="stroke-[2.5]" />
            </button>
            <button
              onClick={() => navigate('/sign-in')}
              className="w-full sm:w-auto border border-white/20 hover:bg-white/10 text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all duration-200"
            >
              Sign In to Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="bg-[#0b3024] border-t border-emerald-950 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
            {platformStats.map((stat, idx) => {
              const Icon = getStatsIcon(stat.icon);
              return (
                <div key={idx} className="flex flex-col items-center space-y-2">
                  <div className="p-2.5 bg-white/5 text-[#4ade80] rounded-xl flex items-center justify-center">
                    <Icon size={22} className="stroke-[2]" />
                  </div>
                  <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-400 font-semibold tracking-wide">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FEATURE HIGHLIGHT CARDS */}
      <section className="bg-white py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlightFeatures.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card 
                  key={idx} 
                  className="text-center p-8 hover:translate-y-[-4px] transition-transform duration-300"
                >
                  <div className="w-14 h-14 bg-lightgreen text-primary rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
                    <Icon size={24} className="stroke-[2]" />
                  </div>
                  <h3 className="text-lg font-bold text-textdark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-textmuted leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PLATFORM FEATURES GRID */}
      <section id="features" className="bg-slate-50 py-24 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-black text-textdark tracking-tight">
              Platform Features
            </h2>
            <p className="text-sm md:text-base text-textmuted max-w-xl mx-auto leading-relaxed">
              Everything you need to manage your farm efficiently, all in one platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-lightgreen rounded-card border border-green-100 p-6 flex flex-col hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-5 shadow-sm">
                    <Icon size={20} className="stroke-[2.5]" />
                  </div>
                  <h4 className="font-bold text-base text-textdark mb-2">
                    {feat.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-textdark/85">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="bg-white py-24 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative">
            <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-[2px] bg-green-200 -z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
              {howItWorksSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center space-y-4 px-2">
                  <div className="w-20 h-20 bg-primary text-white font-extrabold text-xl rounded-full inline-flex items-center justify-center border-4 border-white shadow-md select-none shrink-0">
                    {step.step}
                  </div>
                  <h3 className="font-extrabold text-textdark text-base">{step.title}</h3>
                  <p className="text-xs leading-relaxed text-textmuted max-w-[240px]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. BENEFITS FOR FARMERS SECTION */}
      <section id="benefits" className="bg-white py-24 scroll-mt-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-black text-textdark tracking-tight">
              Benefits for Farmers
            </h2>
            <p className="text-sm md:text-base text-textmuted max-w-xl mx-auto leading-relaxed">
              Real results delivered to farmers across India through data-driven farm management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-lightgreen border border-green-200 rounded-card p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="p-3 bg-white text-primary rounded-xl inline-block shadow-sm mb-5">
                  <TrendingUp size={24} className="stroke-[2.5]" />
                </div>
                <h3 className="text-lg font-bold text-textdark mb-3">Higher Yield</h3>
                <p className="text-xs md:text-sm leading-relaxed text-textdark/90">
                  Farmers using our platform report an average 40% improvement in yield through optimized fertilizer usage and timely disease treatment.
                </p>
              </div>
            </div>

            <div className="bg-[#fffbeb] border border-amber-200 rounded-card p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="p-3 bg-white text-warning rounded-xl inline-block shadow-sm mb-5">
                  <Award size={24} className="stroke-[2.5]" />
                </div>
                <h3 className="text-lg font-bold text-textdark mb-3">Cost Savings</h3>
                <p className="text-xs md:text-sm leading-relaxed text-textdark/90">
                  Reduce over-fertilization by applying the exact recommended quantity. Farmers save an average of ₹8,000&ndash;₹15,000 per season.
                </p>
              </div>
            </div>

            <div className="bg-[#eff6ff] border border-blue-200 rounded-card p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="p-3 bg-white text-blue-600 rounded-xl inline-block shadow-sm mb-5">
                  <Activity size={24} className="stroke-[2.5]" />
                </div>
                <h3 className="text-lg font-bold text-textdark mb-3">Sustainable Farming</h3>
                <p className="text-xs md:text-sm leading-relaxed text-textdark/90">
                  Minimize chemical overuse, protect soil health for future seasons, and contribute to environmentally responsible agriculture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE UZHAVIYAR SECTION */}
      <section className="bg-darkgreen text-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                Why Choose Uzhaviyar?
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-lg font-normal">
                We are committed to empowering every farmer with professional-grade farm management tools that are simple, effective, and built for Indian agriculture.
                   
              </p>
              
              <ul className="space-y-4 pt-2">
                {chooseChecklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-200 font-semibold select-none">
                    <div className="bg-emerald-900/50 p-1 rounded-full border border-emerald-800">
                      <Check size={14} className="text-[#4ade80] stroke-[3]" />
                    </div>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <button
                  onClick={() => navigate('/sign-in')}
                  className="bg-white text-darkgreen hover:bg-slate-100 font-bold px-8 py-3.5 rounded-full shadow-md text-sm transition-transform duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  Start for Free <ArrowRight size={16} className="stroke-[2.5]" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {chooseStats.map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#1b4e3e] p-8 rounded-card border border-emerald-800/40 text-center flex flex-col justify-center shadow-inner"
                >
                  <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                    {item.value}
                  </span>
                  <span className="text-xs text-slate-300 font-semibold tracking-wide mt-2 leading-tight">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS SECTION */}
      <section id="testimonials" className="bg-lightgreen py-24 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-black text-textdark tracking-tight">
              What Farmers Say
            </h2>
            <p className="text-sm md:text-base text-textmuted max-w-xl mx-auto leading-relaxed">
              Trusted by thousands of farmers across India.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsList.map((item, idx) => (
              <Card key={item.id || idx} className="bg-white rounded-card shadow-soft p-8 flex flex-col justify-between border-transparent">
                <div>
                  {/* Rating stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < item.rating ? "fill-[#f59e0b] text-[#f59e0b]" : "text-slate-200"} 
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-sm italic text-textdark font-medium leading-relaxed">
                    &ldquo;{item.text}&rdquo;
                  </p>
                </div>

                <div>
                  {/* Divider */}
                  <div className="border-t border-slate-100 my-5"></div>

                  {/* Profile Block */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-sm select-none">
                      {(item.name || 'F').charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-textdark">{item.name}</h4>
                      <p className="text-[11px] text-textmuted font-semibold mt-0.5">{item.cropType} &bull; {item.landArea}</p>
                      <p className="text-[10px] text-textmuted/80 mt-0.5">{item.location}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA BANNER */}
      <section className="bg-darkgreen text-white py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ecfdf5_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="relative max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Join 12,500+ farmers already using Uzhaviyar to grow more with less. Registration is free.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto bg-white text-darkgreen hover:bg-slate-100 font-bold px-8 py-3.5 rounded-full shadow-md text-sm transition-transform duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              Register Now &mdash; It's Free
            </button>
            <button
              onClick={() => navigate('/signin')}
              className="w-full sm:w-auto border border-white/20 hover:bg-white/10 text-white font-bold px-8 py-3.5 rounded-full text-sm transition-colors duration-200"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section id="faq" className="bg-white py-24 scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 space-y-12">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-black text-textdark tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-textmuted leading-relaxed">
              Have questions? We have answers.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3.5">
            {faqsList.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={faq.id}
                  onClick={() => toggleFaq(idx)}
                  className={`border rounded-xl cursor-pointer p-5 transition-all duration-300 select-none ${
                    isOpen 
                      ? 'bg-lightgreen/30 border-green-200 shadow-sm' 
                      : 'bg-white hover:bg-lightgreen/10 border-slate-100 hover:border-green-150'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className={`font-bold text-sm sm:text-base transition-colors ${
                      isOpen ? 'text-textdark' : 'text-textdark/90'
                    }`}>
                      {faq.question}
                    </span>
                    <ChevronDown 
                      size={18} 
                      className={`text-textmuted transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-primary' : ''
                      }`} 
                    />
                  </div>

                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-40 opacity-100 mt-4 border-t border-slate-100/55 pt-3.5' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-xs sm:text-sm text-textmuted leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
