import React from 'react';
import { ActiveTab } from '../types/clinic';
import { CLINIC_LOGO } from '../data/clinicData';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onRefreshIntelligence?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, onRefreshIntelligence }) => {
  const menuItems = [
    {
      id: 'rfm-dashboard' as ActiveTab,
      label: 'RFM Overview',
      desc: 'แดชบอร์ดวิเคราะห์ RFM & Matrix',
      icon: 'grid_view'
    },
    {
      id: 'patient-segments' as ActiveTab,
      label: 'Patient Segmentation',
      desc: 'จัดกลุ่มคนไข้ & รายชื่อ VIP',
      icon: 'group'
    },
    {
      id: 'recall-campaigns' as ActiveTab,
      label: 'Recall & Campaigns',
      desc: 'ระบบติดตาม & กระตุ้นหัตถการ',
      icon: 'notifications_active'
    },
    {
      id: 'treatment-retention' as ActiveTab,
      label: 'Treatment Retention',
      desc: 'วิเคราะห์การซื้อซ้ำ & คอร์ส',
      icon: 'medical_services'
    }
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-white z-50 flex flex-col justify-between py-6 px-4 shadow-[0_4px_24px_rgba(28,36,48,0.04)] border-r border-[#eeeeef]">
      <div className="flex flex-col gap-6">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3 px-3 py-2 cursor-pointer" onClick={() => onTabChange('rfm-dashboard')}>
          <img
            alt="Aura Clinic Aesthetic Logo"
            className="h-8 w-auto object-contain"
            src={CLINIC_LOGO}
            onError={(e) => {
              // Fallback logo if network blocked
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-[18px] text-[#1a1c1d] tracking-tight leading-none font-bold">
              Aura Clinic
            </span>
            <span className="font-label-sm text-[11px] text-[#7d5540] tracking-wider uppercase mt-1 font-semibold">
              RFM Retention Suite
            </span>
          </div>
        </div>

        <div className="h-px bg-[#e2e2e3] w-full mx-1 opacity-60"></div>

        {/* Navigation Section */}
        <div className="px-3">
          <p className="font-label-sm text-[11px] text-[#50443e] uppercase tracking-wider mb-2 font-semibold">
            Menu Analytics & Operations
          </p>
          <nav className="flex flex-col gap-1.5">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#b88a72] text-[#442513] font-semibold rounded-lg shadow-[0_4px_16px_rgba(184,138,114,0.18)]'
                      : 'text-[#50443e] hover:bg-[#e8e8e9] hover:text-[#1a1c1d]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-[#442513]' : 'text-[#7d5540]'}`}>
                    {item.icon}
                  </span>
                  <div className="flex flex-col">
                    <span className="leading-none text-[14px]">{item.label}</span>
                    <span className="font-label-sm text-[11px] opacity-75 mt-0.5 font-normal">
                      {item.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Intelligence Box & Version Footer */}
      <div className="flex flex-col gap-3 px-3">
        <div
          onClick={onRefreshIntelligence}
          className="bg-[#f3f3f4] rounded-lg p-3 hover:bg-[#e8e8e9] transition-colors cursor-pointer border border-[#e2e2e3]/60"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#7d5540] text-[18px]">verified</span>
              <span className="font-label-md text-[13px] text-[#1a1c1d] font-semibold">
                RFM Intelligence
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          </div>
          <p className="font-body-sm text-[12px] text-[#50443e]">
            อัปเดตโมเดลคะแนนคนไข้ล่าสุด 08:30 น. วันนี้
          </p>
        </div>
        <div className="flex items-center justify-between text-[#50443e] text-[11px] px-1">
          <span>v2.4 Flagship Suite</span>
          <span className="font-data-mono-sm text-[11px] text-[#7d5540] font-semibold">Bangkok HQ</span>
        </div>
      </div>
    </aside>
  );
};
