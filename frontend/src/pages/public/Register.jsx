import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import { Card } from '../../components/Card';
import { indianStates, districtsByState, assignedManager } from '../../data/mockData';
import { calculateFertilizerPlan } from '../../utils/fertilizerCalculator';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  MapPin, 
  Sprout, 
  ArrowLeft, 
  ArrowRight,
  Loader,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Clock,
  ClipboardList
} from 'lucide-react';

const Register = () => {
  const { register } = useApp();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    state: '',
    district: '',
    village: '',
    landArea: '',
    cropType: ''
  });

  const [error, setError] = useState('');
  const [loadingStep3, setLoadingStep3] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [isAgreed, setIsAgreed] = useState(false);

  // Sync districts when selected state changes
  useEffect(() => {
    if (formData.state) {
      setDistricts(districtsByState[formData.state] || []);
    } else {
      setDistricts([]);
    }
  }, [formData.state]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData(prev => ({
      ...prev,
      state: selectedState,
      district: '' // Reset district when state changes
    }));
  };

  const validateStep1 = () => {
    setError('');
    const { name, email, phone, password, confirmPassword } = formData;

    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields.');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    setError('');
    const { name, state, district, village, landArea, cropType } = formData;

    if (!name.trim() || !state || !district || !village.trim() || !landArea || !cropType) {
      setError('Please fill in all farm details.');
      return false;
    }

    const acres = parseFloat(landArea);
    if (isNaN(acres) || acres <= 0) {
      setError('Please enter a valid land area in acres.');
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3);
        // Simulate calculations loading state on step 3
        setLoadingStep3(true);
        setTimeout(() => {
          setLoadingStep3(false);
        }, 2500);
      }
    } else if (currentStep === 3) {
      if (isAgreed) {
        setCurrentStep(4);
      } else {
        setError('Please accept the Terms and Conditions to continue.');
      }
    }
  };

  const handleBackStep = () => {
    setError('');
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    register(formData);
    navigate('/dashboard');
  };

  // Render Step Indicator Timeline
  const StepIndicator = () => {
    if (currentStep === 4) return null;
    const steps = [
      { num: 1, label: 'Account' },
      { num: 2, label: 'Farm Details' },
      { num: 3, label: 'Fertilizer Plan' }
    ];

    return (
      <div className="max-w-md mx-auto w-full mb-10 select-none">
        <div className="flex items-center justify-between relative">
          {/* Progress Connecting Line */}
          <div className="absolute top-[18px] left-[15%] right-[15%] h-0.5 bg-slate-200 -z-10">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
            ></div>
          </div>

          {steps.map((s, idx) => {
            const isCompleted = currentStep > s.num;
            const isActive = currentStep === s.num;
            return (
              <div key={idx} className="flex flex-col items-center">
                <div 
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 ${
                    isCompleted 
                      ? 'bg-primary border-primary text-white' 
                      : isActive 
                        ? 'bg-white border-primary text-primary shadow-sm shadow-green-150' 
                        : 'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 size={16} className="text-white" /> : s.num}
                </div>
                <span className={`text-[10px] sm:text-xs font-bold mt-2 uppercase tracking-wide transition-colors ${
                  isActive || isCompleted ? 'text-textdark' : 'text-slate-400'
                }`}>
                  {s.label}
                </span>
              </div>
              
            );
          })}
          
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Navbar variant="public" />

      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        
        {/* Step Indicator Header */}
              <AlertCircle size={15} className="shrink-0" />
        <StepIndicator />

        {/* Form Card wrapper */}
        <Card className="w-full max-w-xl p-8 relative overflow-hidden border border-slate-100 bg-white">
          
          {/* Form inline error message */}
          {error && (
            <div className="bg-red-50 text-danger text-xs font-semibold p-4 rounded-xl border border-red-100 flex items-center gap-2 mb-6">
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1 - ACCOUNT CREATION */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-textdark tracking-tight">Create Account</h2>
                <p className="text-xs text-textmuted">Enter your farmer credentials</p>
              </div>
<div className="absolute top-2 right-8">
  <Button
    variant="ghost"
    onClick={() => navigate("/sign-in")}
    className="font-bold border border-green-600 text-green-700 hover:bg-green-50"
  >
    Sign In
  </Button>
</div>

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-textdark uppercase tracking-wider block">Farmer Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-textmuted">
                    <User size={15} />
                  </div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-textdark uppercase tracking-wider block">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-textmuted">
                    <Mail size={15} />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="email@example.com"
                    className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-textdark uppercase tracking-wider block">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-textmuted">
                    <Phone size={15} />
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 XXXXX-XXXXX"
                    className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Password row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-textdark uppercase tracking-wider block">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-textmuted">
                      <Lock size={15} />
                    </div>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Min 6 characters"
                      className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-textdark uppercase tracking-wider block">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-textmuted">
                      <Lock size={15} />
                    </div>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Re-enter password"
                      className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="pt-4 flex justify-between items-center gap-3">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/role-selection')}
                  className="font-bold flex items-center gap-1.5"
                >
                  <ArrowLeft size={15} className="stroke-[3]" />
                  Back
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleNextStep}
                  className="font-bold px-8"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Continue
                </Button>
              </div>
            </div>
            
          )}

          {/* STEP 2 - FARM DETAILS */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-textdark tracking-tight">Farmer Details</h2>
                <p className="text-xs text-textmuted">Step 2 &mdash; Tell us about your farm</p>
              </div>

              {/* Name (Carried over & editable) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-textdark uppercase tracking-wider block">Farmer Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter name"
                  className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-textdark bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              {/* State and District Dropdown Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-textdark uppercase tracking-wider block">State</label>
                  <select
                    value={formData.state}
                    onChange={handleStateChange}
                    className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-textdark bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    <option value="">Select State</option>
                    {indianStates.map((st, i) => (
                      <option key={i} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-textdark uppercase tracking-wider block">District</label>
                  <select
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    disabled={!formData.state}
                    className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-textdark bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select District</option>
                    {districts.map((dst, i) => (
                      <option key={i} value={dst}>{dst}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Village and Land Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-textdark uppercase tracking-wider block">Village / Town</label>
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => handleInputChange('village', e.target.value)}
                    placeholder="Enter village"
                    className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-textdark uppercase tracking-wider block">Area of Land (acres)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.landArea}
                    onChange={(e) => handleInputChange('landArea', e.target.value)}
                    placeholder="e.g. 3.5"
                    className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Crop Type Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-textdark uppercase tracking-wider block">Crop Type</label>
                <select
                  value={formData.cropType}
                  onChange={(e) => handleInputChange('cropType', e.target.value)}
                  className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-textdark bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                >
                  <option value="">Select Crop</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Rice">Rice</option>
                  <option value="Maize">Maize</option>
                  <option value="Sugarcane">Sugarcane</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Pulses">Pulses</option>
                  <option value="Vegetables">Vegetables</option>
                </select>
              </div>

              {/* Controls */}
              <div className="pt-4 flex justify-between items-center gap-3">
                <Button 
                  variant="ghost" 
                  onClick={handleBackStep}
                  className="font-bold flex items-center gap-1.5"
                  icon={ArrowLeft}
                  iconPosition="left"
                >
                  Back
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleNextStep}
                  className="font-bold px-8"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3 - PLAN REVIEW & GENERATION */}
          {currentStep === 3 && (
            <div className="space-y-6 text-left">
              {loadingStep3 ? (
                // Loading calculator phase
                <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center select-none">
                  <Loader size={48} className="text-primary animate-spin" />
                  <h3 className="text-lg font-extrabold text-textdark">Calculating Fertilizer Plan...</h3>
                  <p className="text-xs text-textmuted max-w-xs">
                    Our scientific models are analyzing soil moisture index, crop stages, and climate variables for your {formData.landArea} acres plot.
                  </p>
                </div>
              ) : (() => {
                const plan = calculateFertilizerPlan({
                  cropType: formData.cropType,
                  areaOfLand: formData.landArea
                });
                return (
                  <div className="space-y-6">
                    <div className="text-center sm:text-left space-y-1">
                      <h2 className="text-xl font-black text-textdark tracking-tight">Fertilizer Recommendation</h2>
                      <p className="text-xs text-textmuted">
                        For {formData.name} &bull; {formData.village}, {formData.district}, {formData.state}
                      </p>
                    </div>

                    {/* Top Card: Summary */}
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4.5 space-y-3 text-xs text-textdark">
                      <h3 className="font-bold text-textdark uppercase tracking-wider text-[10px] border-b pb-1.5 border-slate-200">
                        Farm Profile Summary
                      </h3>
                      <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                        <div>
                          <span className="text-textmuted block text-[10px] uppercase font-semibold">Crop Type</span>
                          <span className="font-bold">{formData.cropType}</span>
                        </div>
                        <div>
                          <span className="text-textmuted block text-[10px] uppercase font-semibold">Farm Location</span>
                          <span className="font-bold">{formData.district}, {formData.state}</span>
                        </div>
                        <div>
                          <span className="text-textmuted block text-[10px] uppercase font-semibold">Area of Land</span>
                          <span className="font-bold">{formData.landArea} Acres</span>
                        </div>
                        <div>
                          <span className="text-textmuted block text-[10px] uppercase font-semibold">Village</span>
                          <span className="font-bold">{formData.village}</span>
                        </div>
                      </div>
                    </div>

                    {/* Plan Card (2x2 Grid) */}
                    <div className="bg-lightgreen border border-green-150 rounded-xl p-4.5 space-y-3 text-xs text-textdark">
                      <h3 className="font-bold text-primary uppercase tracking-wider text-[10px] border-b pb-1.5 border-green-200/60">
                        Calculated Fertilizer Plan
                      </h3>
                      <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                        <div>
                          <span className="text-textdark/70 block text-[10px] uppercase font-semibold">Fertilizer Type</span>
                          <span className="font-extrabold text-sm">{plan.baseFertilizer}</span>
                        </div>
                        <div>
                          <span className="text-textdark/70 block text-[10px] uppercase font-semibold">Total Quantity</span>
                          <span className="font-extrabold text-sm text-primary">{plan.totalQuantity} kg</span>
                        </div>
                        <div>
                          <span className="text-textdark/70 block text-[10px] uppercase font-semibold">Estimated Cost</span>
                          <span className="font-extrabold text-sm">₹{plan.estimatedCost.toLocaleString('en-IN')}</span>
                        </div>
                        <div>
                          <span className="text-textdark/70 block text-[10px] uppercase font-semibold">Expected Yield</span>
                          <span className="font-extrabold text-sm">{plan.expectedYield} Quintals</span>
                        </div>
                      </div>
                    </div>

                    {/* Application Schedule Card */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4.5 space-y-3 text-xs text-textdark">
                      <h3 className="font-bold text-textdark uppercase tracking-wider text-[10px] border-b pb-1.5 border-slate-200 flex items-center gap-1.5">
                        <ClipboardList size={14} className="text-primary" />
                        Application Schedule
                      </h3>
                      <ul className="space-y-2 list-disc pl-4 text-textdark font-medium">
                        <li>
                          <strong>First Dose (60%):</strong> {plan.schedule.first.quantity} kg {plan.schedule.first.stage}
                        </li>
                        <li>
                          <strong>Second Dose (40%):</strong> {plan.schedule.second.quantity} kg {plan.schedule.second.stage}
                        </li>
                        <li className="text-primary font-semibold">
                          {plan.organicNote}
                        </li>
                      </ul>
                    </div>

                    {/* Agreement Checkbox */}
                    <label className="flex items-start gap-3 cursor-pointer select-none text-xs text-textdark pt-2">
                      <input
                        type="checkbox"
                        checked={isAgreed}
                        onChange={(e) => {
                          setIsAgreed(e.target.checked);
                          setError('');
                        }}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/20 accent-primary"
                      />
                      <span className="leading-relaxed font-semibold text-textmuted">
                        I accept the above mentioned Terms and Conditions regarding the fertilizer recommendation and its application schedule.
                      </span>
                    </label>

                    {/* Controls */}
                    <div className="pt-4 flex justify-between items-center gap-3">
                      <Button 
                        variant="ghost" 
                        onClick={() => navigate('/')}
                        className="font-bold text-danger hover:bg-red-50 border border-red-200"
                      >
                        Decline
                      </Button>
                      
                      <div className="flex gap-3">
                        <Button 
                          variant="ghost" 
                          onClick={handleBackStep}
                          className="font-bold flex items-center gap-1.5"
                          icon={ArrowLeft}
                          iconPosition="left"
                        >
                          Back
                        </Button>
                        <Button 
                          variant="primary" 
                          onClick={handleNextStep}
                          disabled={!isAgreed}
                          className={`font-bold px-8 transition-opacity ${!isAgreed ? 'opacity-50 cursor-not-allowed' : ''}`}
                          icon={ArrowRight}
                          iconPosition="right"
                        >
                          Continue
                        </Button>
                      </div>
                      
                    </div>
                  </div>
                  
                );
              })()}
              
            </div>
          )}

          {/* STEP 4 - CONFIRMATION SCREEN */}
          {currentStep === 4 && (() => {
            const formatVisitDate = () => {
              const date = new Date();
              date.setDate(date.getDate() + 4);
              return date.toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });
            };

            return (
              <div className="space-y-8 text-center py-4">
                {/* Centered Checkmark */}
                <div className="w-16 h-16 bg-lightgreen text-primary border border-green-200 rounded-full flex items-center justify-center mx-auto shadow-sm animate-pulse">
                  <CheckCircle2 size={36} className="stroke-[2.5]" />
                </div>

                {/* Heading */}
                <div className="space-y-1.5">
                  <h2 className="text-2xl font-black text-textdark tracking-tight">Visit Scheduled!</h2>
                  <p className="text-xs text-textmuted max-w-sm mx-auto">
                    A manager will visit <strong className="text-textdark font-bold">{formData.name}</strong>'s farm to complete verification.
                  </p>
                </div>

                {/* Dynamic Detail List */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 text-left text-xs text-textdark space-y-3.5 max-w-md mx-auto">
                  <h3 className="font-bold text-textdark uppercase tracking-wider text-[10px] border-b pb-1.5 border-slate-200">
                    Verification Details
                  </h3>

                  <div className="space-y-2.5">
                    {/* Farmer Name */}
                    <div className="flex items-start gap-3">
                      <User size={15} className="text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="text-textmuted block text-[10px] uppercase font-semibold">Farmer Name</span>
                        <span className="font-bold text-textdark">{formData.name}</span>
                      </div>
                    </div>

                    {/* Farm Location */}
                    <div className="flex items-start gap-3">
                      <MapPin size={15} className="text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="text-textmuted block text-[10px] uppercase font-semibold">Farm Location</span>
                        <span className="font-bold text-textdark">
                          {formData.village}, {formData.district}, {formData.state}
                        </span>
                      </div>
                    </div>

                    {/* Crop Type */}
                    <div className="flex items-start gap-3">
                      <Sprout size={15} className="text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="text-textmuted block text-[10px] uppercase font-semibold">Crop Type</span>
                        <span className="font-bold text-textdark">{formData.cropType}</span>
                      </div>
                    </div>

                    {/* Manager Name */}
                    <div className="flex items-start gap-3">
                      <User size={15} className="text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="text-textmuted block text-[10px] uppercase font-semibold">Assigned Manager</span>
                        <span className="font-bold text-textdark">{assignedManager.name}</span>
                      </div>
                    </div>

                    {/* Visit Date */}
                    <div className="flex items-start gap-3">
                      <Calendar size={15} className="text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="text-textmuted block text-[10px] uppercase font-semibold">Visit Date</span>
                        <span className="font-bold text-textdark">{formatVisitDate()}</span>
                      </div>
                    </div>

                    {/* Visit Time */}
                    <div className="flex items-start gap-3">
                      <Clock size={15} className="text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="text-textmuted block text-[10px] uppercase font-semibold">Visit Window</span>
                        <span className="font-bold text-textdark">10:00 AM &ndash; 12:00 PM</span>
                      </div>
                    </div>

                    {/* Contact Number */}
                    <div className="flex items-start gap-3">
                      <Phone size={15} className="text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="text-textmuted block text-[10px] uppercase font-semibold">Contact Number</span>
                        <span className="font-bold text-textdark">{assignedManager.contact}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Go to Dashboard CTA */}
                <div className="pt-2 max-w-md mx-auto">
                  <Button 
                    variant="primary" 
                    onClick={handleFinish}
                    className="w-full font-bold py-3.5 animate-pulse"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            );
          })()}

        </Card>

      </main>

    </div>
  );
};

export default Register;
