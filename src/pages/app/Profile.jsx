import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/Card';
import Button from '../../components/Button';
import { 
  ArrowLeft, 
  User, 
  Edit, 
  Save, 
  X,
  Mail,
  Phone,
  MapPin,
  Sprout,
  Compass,
  Calendar,
  Lock
} from 'lucide-react';

const Profile = () => {
  const { user, setUser } = useApp();
  
  const [isEditing, setIsEditing] = useState(false);
  const [localUser, setLocalUser] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    district: '',
    village: '',
    cropType: '',
    landArea: ''
  });

  // Load context user state when component mounts or user updates
  useEffect(() => {
    if (user) {
      // Safely split location into state/district for editing
      const locationParts = user.location ? user.location.split(',') : [];
      const districtVal = locationParts[0]?.trim() || '';
      const stateVal = locationParts[1]?.trim() || '';

      setLocalUser({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        state: user.state || stateVal || 'Tamil Nadu',
        district: user.district || districtVal || 'Coimbatore',
        village: user.village || 'Wadgaon',
        cropType: user.cropType || 'Wheat',
        landArea: user.landArea || '5 acres'
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setLocalUser(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (setUser) {
      setUser({
        ...user,
        name: localUser.name,
        email: localUser.email,
        phone: localUser.phone,
        state: localUser.state,
        district: localUser.district,
        village: localUser.village,
        cropType: localUser.cropType,
        landArea: localUser.landArea,
        location: `${localUser.district}, ${localUser.state}`
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Revert local changes
    if (user) {
      const locationParts = user.location ? user.location.split(',') : [];
      const districtVal = locationParts[0]?.trim() || '';
      const stateVal = locationParts[1]?.trim() || '';

      setLocalUser({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        state: user.state || stateVal || '',
        district: user.district || districtVal || '',
        village: user.village || 'Wadgaon',
        cropType: user.cropType || '',
        landArea: user.landArea || ''
      });
    }
    setIsEditing(false);
  };

  // Helper to format values or return placeholder symbol
  const renderValue = (val) => {
    return val && val.trim() !== '' ? val : '—';
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. PAGE HEADER */}
      <div className="space-y-1">
        <Link 
          to="/settings" 
          className="text-xs font-bold text-primary hover:text-green-700 flex items-center gap-1.5 transition-colors select-none"
        >
          <ArrowLeft size={14} className="stroke-[3]" />
          Back to Settings
        </Link>
        <h1 className="text-2xl font-black text-textdark tracking-tight">My Profile</h1>
        <p className="text-xs text-textmuted font-semibold">
          Manage your personal details and registered farm specifications.
        </p>
      </div>

      {/* 2. PROFILE BANNER CARD */}
      <Card className="border border-slate-100 shadow-soft p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-36 h-36 bg-lightgreen opacity-30 rounded-full translate-x-12 -translate-y-12 select-none"></div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left w-full sm:w-auto">
            {/* Green Circular Icon */}
            <div className="w-20 h-20 rounded-full bg-lightgreen text-primary border-4 border-white shadow-md flex items-center justify-center font-black text-3xl select-none shrink-0">
              {localUser.name ? localUser.name.charAt(0).toUpperCase() : <User size={32} className="stroke-[2.5]" />}
            </div>
            <div className="space-y-1">
              {isEditing ? (
                <div className="space-y-1.5 max-w-xs">
                  <span className="text-[10px] text-textmuted uppercase tracking-wider font-bold block">Farmer Name</span>
                  <input
                    type="text"
                    value={localUser.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter name..."
                    className="block w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-textdark"
                  />
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-black text-textdark">{renderValue(localUser.name)}</h3>
                  <p className="text-xs text-textmuted font-semibold">
                    ID: <span className="font-mono">{user?.id || 'FRM-2026-979'}</span>
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Edit/Save Actions (Top Right / Center on mobile) */}
          <div className="flex items-center gap-2 select-none">
            {isEditing ? (
              <>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={handleCancel}
                  className="font-bold border border-slate-250 py-2.5 px-4"
                  icon={X}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={handleSave}
                  className="font-bold py-2.5 px-5"
                  icon={Save}
                >
                  Save
                </Button>
              </>
            ) : (
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => setIsEditing(true)}
                className="font-bold border border-slate-250 text-textdark hover:bg-slate-50 py-2.5 px-5"
                icon={Edit}
              >
                Edit
              </Button>
            )}
          </div>
        </div>

        {/* 3. PROFILE FIELDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-100 mt-6 pt-6 text-xs text-textdark">
          
          {/* LEFT COLUMN */}
          <div className="space-y-5">
            {/* Email Address */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-50 text-textmuted rounded-lg shrink-0 mt-0.5 select-none">
                <Mail size={14} className="stroke-[2.5]" />
              </div>
              <div className="space-y-1 flex-1 text-left">
                <span className="text-textmuted font-bold block text-[10px] uppercase tracking-wider select-none">Email Address</span>
                {isEditing ? (
                  <input
                    type="email"
                    value={localUser.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email..."
                    className="block w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-semibold"
                  />
                ) : (
                  <span className="font-bold text-textdark block py-0.5">{renderValue(localUser.email)}</span>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-50 text-textmuted rounded-lg shrink-0 mt-0.5 select-none">
                <Phone size={14} className="stroke-[2.5]" />
              </div>
              <div className="space-y-1 flex-1 text-left">
                <span className="text-textmuted font-bold block text-[10px] uppercase tracking-wider select-none">Phone Number</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={localUser.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter phone..."
                    className="block w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-semibold"
                  />
                ) : (
                  <span className="font-bold text-textdark block py-0.5">{renderValue(localUser.phone)}</span>
                )}
              </div>
            </div>

            {/* Village */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-50 text-textmuted rounded-lg shrink-0 mt-0.5 select-none">
                <MapPin size={14} className="stroke-[2.5]" />
              </div>
              <div className="space-y-1 flex-1 text-left">
                <span className="text-textmuted font-bold block text-[10px] uppercase tracking-wider select-none">Village</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={localUser.village}
                    onChange={(e) => handleInputChange('village', e.target.value)}
                    placeholder="Enter village..."
                    className="block w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-semibold"
                  />
                ) : (
                  <span className="font-bold text-textdark block py-0.5">{renderValue(localUser.village)}</span>
                )}
              </div>
            </div>

            {/* Last Login (Read-Only) */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-50 text-slate-300 rounded-lg shrink-0 mt-0.5 select-none">
                <Calendar size={14} className="stroke-[2.5]" />
              </div>
              <div className="space-y-1 flex-1 text-left">
                <span className="text-slate-400 font-bold block text-[10px] uppercase tracking-wider flex items-center gap-1 select-none">
                  Last Login Connection
                  <Lock size={10} className="text-slate-300 shrink-0" />
                </span>
                <span className="font-semibold text-textmuted block py-0.5 select-none">{user?.lastLogin || '—'}</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-5">
            {/* State */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-50 text-textmuted rounded-lg shrink-0 mt-0.5 select-none">
                <Compass size={14} className="stroke-[2.5]" />
              </div>
              <div className="space-y-1 flex-1 text-left">
                <span className="text-textmuted font-bold block text-[10px] uppercase tracking-wider select-none">State</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={localUser.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="Enter state..."
                    className="block w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-semibold"
                  />
                ) : (
                  <span className="font-bold text-textdark block py-0.5">{renderValue(localUser.state)}</span>
                )}
              </div>
            </div>

            {/* District */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-50 text-textmuted rounded-lg shrink-0 mt-0.5 select-none">
                <Compass size={14} className="stroke-[2.5]" />
              </div>
              <div className="space-y-1 flex-1 text-left">
                <span className="text-textmuted font-bold block text-[10px] uppercase tracking-wider select-none">District</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={localUser.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    placeholder="Enter district..."
                    className="block w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-semibold"
                  />
                ) : (
                  <span className="font-bold text-textdark block py-0.5">{renderValue(localUser.district)}</span>
                )}
              </div>
            </div>

            {/* Crop Type */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-50 text-textmuted rounded-lg shrink-0 mt-0.5 select-none">
                <Sprout size={14} className="stroke-[2.5]" />
              </div>
              <div className="space-y-1 flex-1 text-left">
                <span className="text-textmuted font-bold block text-[10px] uppercase tracking-wider select-none">Cultivated Crop</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={localUser.cropType}
                    onChange={(e) => handleInputChange('cropType', e.target.value)}
                    placeholder="Enter crop..."
                    className="block w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-semibold"
                  />
                ) : (
                  <span className="font-bold text-primary block py-0.5">{renderValue(localUser.cropType)}</span>
                )}
              </div>
            </div>

            {/* Total Land */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-50 text-textmuted rounded-lg shrink-0 mt-0.5 select-none">
                <Sprout size={14} className="stroke-[2.5]" />
              </div>
              <div className="space-y-1 flex-1 text-left">
                <span className="text-textmuted font-bold block text-[10px] uppercase tracking-wider select-none">Total Acreage</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={localUser.landArea}
                    onChange={(e) => handleInputChange('landArea', e.target.value)}
                    placeholder="Enter acreage (e.g. 5 acres)..."
                    className="block w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-semibold"
                  />
                ) : (
                  <span className="font-bold text-textdark block py-0.5">{renderValue(localUser.landArea)}</span>
                )}
              </div>
            </div>
          </div>

        </div>
      </Card>

    </div>
  );
};

export default Profile;
