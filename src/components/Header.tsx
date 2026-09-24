import React, { useState } from 'react';
import { DOCTOR_PROFILE_IMG } from '../data/clinicData';

interface HeaderProps {
  currentBranch: string;
  onBranchChange: (branch: string) => void;
  currentTimeframe: string;
  onTimeframeChange: (tf: string) => void;
  onOpenNotifications?: () => void;
  onDoctorClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentBranch,
  onBranchChange,
  currentTimeframe,
  onTimeframeChange,
  onDoctorClick
}) => {
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [showBranchMenu, setShowBranchMenu] = useState(false);
  const [showTimeframeMenu, setShowTimeframeMenu] = useState(false);

  const branches = [
    'สาขาทองหล่อ (Thonglor Flagship)',
    'สาขาสยามพารากอน (Siam Paragon)',
    'สาขาราชพฤกษ์ (Ratchaphruek Private)'
  ];

  const timeframes = [
    '30 วันล่าสุด (Recent 30 Days)',
    'ไตรมาสนี้ (Q1 2025)',
    'ปีงบประมาณ 2025 (FY2025)'
  ];

  const notifications = [
    { title: 'เคสเสี่ยงหลุดคอร์ส', desc: 'คุณลลิตา เกินรอบฉีดโบท็อกซ์ 32 วัน', time: '10 นาทีที่แล้ว', type: 'urgent' },
    { title: 'นัดหมายสำเร็จ', desc: 'คุณชนิกานต์ ยืนยันคิวนัดตรวจซ้ำ 28 มี.ค.', time: '25 นาทีที่แล้ว', type: 'success' },
    { title: 'คอร์สใกล้หมดอายุ', desc: 'คุณวรวัฒน์ เหลือ Pico 2 ครั้ง หมดอายุ 18 วัน', time: '1 ชม. ที่แล้ว', type: 'warning' },
    { title: 'AI Retention Trigger', desc: 'วิเคราะห์อัตรากลับมาทำซ้ำประจำเดือน ก.พ. พร้อมแล้ว', time: '2 ชม. ที่แล้ว', type: 'info' },
    { title: 'สิทธิ์ VIP พิเศษ', desc: 'คุณพิมพ์ใจ ได้รับสิทธิ์ Touch-up 15% ถึงสิ้นเดือน', time: '3 ชม. ที่แล้ว', type: 'vip' }
  ];

  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-white/85 backdrop-blur-xl border-b border-[#eeeeef] shadow-[0_1px_8px_rgba(28,36,48,0.04)] z-40 px-6 flex items-center justify-between">
      {/* Left controls */}
      <div className="flex items-center gap-3">
        {/* Branch Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowBranchMenu(!showBranchMenu);
              setShowTimeframeMenu(false);
              setShowNotificationMenu(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f3f3f4] hover:bg-[#e8e8e9] text-[#1a1c1d] font-body-md text-[13px] transition-colors cursor-pointer border border-[#e2e2e3]/40"
          >
            <span className="material-symbols-outlined text-[#7d5540] text-[18px]">domain</span>
            <span className="font-semibold">{currentBranch}</span>
            <span className="material-symbols-outlined text-[#50443e] text-[18px]">expand_more</span>
          </button>

          {showBranchMenu && (
            <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#e2e2e3] py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-1.5 text-[11px] font-semibold uppercase text-[#50443e] tracking-wider border-b border-[#eeeeef]">
                เลือกสาขาที่ให้บริการ
              </div>
              {branches.map((b) => (
                <button
                  key={b}
                  onClick={() => {
                    onBranchChange(b);
                    setShowBranchMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-[13px] flex items-center justify-between hover:bg-[#f3f3f4] transition-colors ${
                    currentBranch === b ? 'text-[#7d5540] font-bold bg-[#ffdbca]/20' : 'text-[#1a1c1d]'
                  }`}
                >
                  <span>{b}</span>
                  {currentBranch === b && (
                    <span className="material-symbols-outlined text-[16px] text-[#7d5540]">check</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Timeframe Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowTimeframeMenu(!showTimeframeMenu);
              setShowBranchMenu(false);
              setShowNotificationMenu(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f3f3f4] hover:bg-[#e8e8e9] text-[#50443e] font-label-md text-[13px] transition-colors cursor-pointer border border-[#e2e2e3]/40"
          >
            <span className="material-symbols-outlined text-[16px] text-[#575f6d]">calendar_today</span>
            <span>{currentTimeframe}</span>
            <span className="material-symbols-outlined text-[#50443e] text-[16px]">expand_more</span>
          </button>

          {showTimeframeMenu && (
            <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#e2e2e3] py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-1.5 text-[11px] font-semibold uppercase text-[#50443e] tracking-wider border-b border-[#eeeeef]">
                ช่วงเวลาวิเคราะห์ Cohort & RFM
              </div>
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => {
                    onTimeframeChange(tf);
                    setShowTimeframeMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-[13px] flex items-center justify-between hover:bg-[#f3f3f4] transition-colors ${
                    currentTimeframe === tf ? 'text-[#7d5540] font-bold bg-[#ffdbca]/20' : 'text-[#1a1c1d]'
                  }`}
                >
                  <span>{tf}</span>
                  {currentTimeframe === tf && (
                    <span className="material-symbols-outlined text-[16px] text-[#7d5540]">check</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotificationMenu(!showNotificationMenu);
              setShowBranchMenu(false);
              setShowTimeframeMenu(false);
            }}
            className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[#eeeeef] hover:bg-[#e8e8e9] transition-colors cursor-pointer"
            title="การแจ้งเตือนงานติดตาม"
          >
            <span className="material-symbols-outlined text-[#50443e] text-[20px]">notifications</span>
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#7d5540] text-white font-label-sm text-[10px] flex items-center justify-center font-bold">
              5
            </span>
          </button>

          {showNotificationMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-[#e2e2e3] p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-[#eeeeef]">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-[14px] font-bold text-[#1a1c1d]">
                    การแจ้งเตือนด่วน (5)
                  </span>
                </div>
                <button
                  onClick={() => setShowNotificationMenu(false)}
                  className="text-[11px] text-[#7d5540] hover:underline font-semibold"
                >
                  อ่านทั้งหมด
                </button>
              </div>
              <div className="flex flex-col gap-2 mt-2 max-h-72 overflow-y-auto">
                {notifications.map((n, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-[#f3f3f4] hover:bg-[#e8e8e9] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[12px] text-[#1a1c1d]">{n.title}</span>
                      <span className="text-[10px] text-[#50443e] font-mono">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-[#50443e] mt-0.5">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-[#e2e2e3] opacity-70"></div>

        {/* Doctor Profile Pill */}
        <button
          onClick={onDoctorClick}
          className="flex items-center gap-3 pl-1 hover:opacity-90 transition-opacity cursor-pointer text-left"
        >
          <div className="flex flex-col text-right">
            <span className="font-body-md text-[13px] font-semibold text-[#1a1c1d] leading-tight">
              พญ. นิศา สุวรรณรัตน์
            </span>
            <span className="font-label-sm text-[11px] text-[#7d5540] leading-tight mt-0.5 font-semibold">
              Medical Director
            </span>
          </div>
          <div className="relative">
            <img
              alt="Profile พญ. นิศา สุวรรณรัตน์"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#b88a72]/50 shadow-sm"
              src={DOCTOR_PROFILE_IMG}
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" title="Active on duty"></span>
          </div>
        </button>
      </div>
    </header>
  );
};
