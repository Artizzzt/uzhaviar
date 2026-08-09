import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Button from '../../components/Button';
import { Card, StatCard, InfoCard } from '../../components/Card';
import { 
  Sprout, 
  AlertTriangle, 
  Droplet, 
  Plus, 
  Search, 
  ArrowRight,
  TrendingUp,
  Sliders
} from 'lucide-react';

const LayoutPreview = () => {
  // Demo pesticide data fields
  const pesticideFields = [
    { label: 'Quantity', value: '2.5 kg/acre' },
    { label: 'Cost', value: '₹350/kg' },
    { label: 'Best Time', value: 'Early morning (6-8 AM)' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 1. Navbar in App variant, showing the dropdown menu forced open */}
      <Navbar variant="app" forceProfileOpen={true} />

      {/* Main Body */}
      <div className="flex flex-1">
        {/* 2. Sidebar (Expanded by default) */}
        <Sidebar />

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 p-6 md:p-8 space-y-8 max-w-7xl w-full mx-auto">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-black text-textdark">Uzhaviyar Shared Components Preview</h1>
              <p className="text-sm text-textmuted mt-1">
                Visual language preview page displaying the active buttons, states, cards, and layouts.
              </p>
            </div>

            {/* 3. Button Primitives Preview */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-textdark border-b pb-2 border-slate-200">Button Variants & Sizes</h2>
              <Card className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-textmuted uppercase tracking-wider mb-3">Variants</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="primary">Primary (Solid Green)</Button>
                    <Button variant="secondary">Secondary (Outline)</Button>
                    <Button variant="danger">Danger (Text-red)</Button>
                    <Button variant="ghost">Ghost (Gray text-only)</Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-textmuted uppercase tracking-wider mb-3">Sizes</h3>
                  <div className="flex flex-wrap items-end gap-3">
                    <Button variant="primary" size="sm">Small Button</Button>
                    <Button variant="primary" size="md">Medium Button</Button>
                    <Button variant="primary" size="lg">Large Button</Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-textmuted uppercase tracking-wider mb-3">Buttons with Icons</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="primary" icon={Plus} iconPosition="left">Add Plot</Button>
                    <Button variant="secondary" icon={Search} iconPosition="right">Search Crops</Button>
                    <Button variant="outline" icon={ArrowRight} iconPosition="right">Next Step</Button>
                  </div>
                </div>
              </Card>
            </section>

            {/* 4. Card & StatCard Preview */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-textdark border-b pb-2 border-slate-200">Card & Stat Primitives</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Healthy Crops */}
                <StatCard 
                  icon={Sprout} 
                  label="Healthy Crops" 
                  value="85%" 
                  trend="+5% from last week" 
                />
                
                {/* Disease Detected */}
                <StatCard 
                  icon={AlertTriangle} 
                  label="Disease Detected" 
                  value="10%" 
                  trend="-2% from last week" 
                />

                {/* Sprayed Areas */}
                <StatCard 
                  icon={Droplet} 
                  label="Sprayed Areas" 
                  value="5%" 
                  trend="Treatment in progress" 
                />
              </div>
            </section>

            {/* 5. InfoCard Preview */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-textdark border-b pb-2 border-slate-200">Info Cards</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InfoCard
                  title="Mancozeb 75 WP"
                  badge={{ text: "Recommended", type: "success" }}
                  fields={pesticideFields}
                  actionLabel="View Details"
                  onAction={() => alert('Mancozeb Details Clicked')}
                />
                
                <InfoCard
                  title="Chlorpyrifos 20 EC"
                  badge={{ text: "Active Spray", type: "warning" }}
                  fields={[
                    { label: 'Quantity', value: '1.5 L/acre' },
                    { label: 'Cost', value: '₹420/L' },
                    { label: 'Best Time', value: 'Evening (4-6 PM)' }
                  ]}
                  actionLabel="View Details"
                  onAction={() => alert('Chlorpyrifos Details Clicked')}
                />

                <InfoCard
                  title="Root Rot Fungal Attack"
                  badge={{ text: "High Severity", type: "danger" }}
                  fields={[
                    { label: 'Affected Areas', value: 'Plot B (1.2 acres)' },
                    { label: 'Status', value: 'Needs Treatment' },
                    { label: 'Urgency', value: 'Immediate Action Required' }
                  ]}
                  actionLabel="Schedule Spray"
                  onAction={() => alert('Schedule Spray Clicked')}
                />
              </div>
            </section>

          </main>
          
          {/* Footer at bottom of layouts */}
      
        </div>
      </div>
    </div>
  );
};

export default LayoutPreview;
