import React from 'react';
import { Link } from 'react-router-dom';
import { contactData } from '../../data/mockData';
import { Card } from '../../components/Card';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  Globe 
} from 'lucide-react';

const ContactUs = () => {
  const { manager, helpline, emailSupport, office } = contactData;

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. PAGE HEADER */}
      <div className="space-y-1">
        <Link 
          to="/dashboard" 
          className="text-xs font-bold text-primary hover:text-green-700 flex items-center gap-1.5 transition-colors select-none"
        >
          <ArrowLeft size={14} className="stroke-[3]" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-black text-textdark tracking-tight">Contact Us</h1>
        <p className="text-xs text-textmuted font-semibold">
          Get in touch with your manager or general customer support.
        </p>
      </div>

      {/* 2. ASSIGNED FARM MANAGER CARD */}
      <Card className="border border-slate-100 shadow-soft p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 select-none">
          <div className="flex items-center gap-4">
            {/* Green User Icon */}
            <div className="w-14 h-14 bg-lightgreen text-primary rounded-full flex items-center justify-center shadow-inner shrink-0">
              <User size={28} className="stroke-[2.5]" />
            </div>
            <div className="text-left space-y-0.5">
              <h3 className="font-extrabold text-base text-textdark">{manager.name}</h3>
              <p className="text-xs text-primary font-bold">{manager.role}</p>
            </div>
          </div>
          <span className="self-start md:self-center text-[10px] font-black uppercase tracking-widest text-[#0f3d2e] bg-[#ecfdf5] border border-green-200 px-3 py-1 rounded-full">
            Assigned Manager
          </span>
        </div>

        {/* 2x2 Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-xs text-textdark select-none">
          
          {/* Phone */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-slate-50 text-textmuted rounded-lg shrink-0 mt-0.5">
              <Phone size={14} className="stroke-[2.5]" />
            </div>
            <div className="space-y-0.5 text-left">
              <span className="text-textmuted font-bold block text-[10px] uppercase tracking-wider">Phone</span>
              <span className="font-bold text-textdark">{manager.phone}</span>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-slate-50 text-textmuted rounded-lg shrink-0 mt-0.5">
              <Mail size={14} className="stroke-[2.5]" />
            </div>
            <div className="space-y-0.5 text-left">
              <span className="text-textmuted font-bold block text-[10px] uppercase tracking-wider">Email</span>
              <span className="font-bold text-textdark break-all">{manager.email}</span>
            </div>
          </div>

          {/* Coverage Zone */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-slate-50 text-textmuted rounded-lg shrink-0 mt-0.5">
              <Globe size={14} className="stroke-[2.5]" />
            </div>
            <div className="space-y-0.5 text-left">
              <span className="text-textmuted font-bold block text-[10px] uppercase tracking-wider">Coverage Zone</span>
              <span className="font-bold text-textdark">{manager.zone}</span>
            </div>
          </div>

          {/* Support Timings */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-slate-50 text-textmuted rounded-lg shrink-0 mt-0.5">
              <Clock size={14} className="stroke-[2.5]" />
            </div>
            <div className="space-y-0.5 text-left">
              <span className="text-textmuted font-bold block text-[10px] uppercase tracking-wider">Support Timings</span>
              <span className="font-bold text-textdark">{manager.timings}</span>
            </div>
          </div>

        </div>
      </Card>

      {/* 3. GENERAL SUPPORT ROW (2 Cards side-by-side) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
        
        {/* Helpline */}
        <Card className="flex items-center gap-4 p-5 border border-slate-100 shadow-soft hover:translate-y-[-2px] transition-transform duration-200">
          <div className="p-3 bg-lightgreen text-primary rounded-xl shrink-0">
            <Phone size={20} className="stroke-[2.5]" />
          </div>
          <div className="space-y-0.5 text-left">
            <h4 className="font-extrabold text-sm text-textdark">Helpline Support</h4>
            <p className="text-xs font-bold text-primary">{helpline.phone}</p>
            <p className="text-[10px] text-textmuted font-semibold">Hours: {helpline.timings}</p>
          </div>
        </Card>

        {/* Email Support */}
        <Card className="flex items-center gap-4 p-5 border border-slate-100 shadow-soft hover:translate-y-[-2px] transition-transform duration-200">
          <div className="p-3 bg-lightgreen text-primary rounded-xl shrink-0">
            <Mail size={20} className="stroke-[2.5]" />
          </div>
          <div className="space-y-0.5 text-left">
            <h4 className="font-extrabold text-sm text-textdark">Email Support</h4>
            <p className="text-xs font-bold text-primary">{emailSupport.email}</p>
            <p className="text-[10px] text-textmuted font-semibold">Response: {emailSupport.timings}</p>
          </div>
        </Card>

      </div>

      {/* 4. OFFICE ADDRESS CARD */}
      <Card className="flex items-start gap-4 p-5 border border-slate-100 shadow-soft select-none">
        <div className="p-3 bg-lightgreen text-primary rounded-xl shrink-0">
          <MapPin size={20} className="stroke-[2.5]" />
        </div>
        <div className="space-y-1 text-left">
          <h4 className="font-extrabold text-sm text-textdark">{office.name}</h4>
          <p className="text-xs text-textdark font-semibold leading-relaxed max-w-2xl">
            {office.address}
          </p>
        </div>
      </Card>

    </div>
  );
};

export default ContactUs;
