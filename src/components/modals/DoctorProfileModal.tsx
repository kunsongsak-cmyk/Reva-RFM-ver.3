import React from 'react';
import { DOCTOR_PROFILE_IMG, DOCTOR_BOARDROOM_IMG } from '../../data/clinicData';

interface DoctorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSchedule: () => void;
}

export const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({
  isOpen,
  onClose,
  onSelectSchedule
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-[#e2e2e3] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="relative h-32 bg-gradient-to-r from-[#7d5540] to-[#b88a72] p-6 flex items-end">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/40 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex items-end justify-between -mt-14 mb-4">
            <img
              src={DOCTOR_PROFILE_IMG}
              alt="พญ. นิศา สุวรรณรัตน์"
              className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg bg-white"
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onSelectSchedule();
                  onClose();
                }}
                className="px-4 py-2 bg-[#7d5540] text-white text-[13px] font-bold rounded-lg shadow-sm hover:bg-[#623e2b] flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                <span>ดูตารางตรวจ & นัดเคส</span>
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-headline-md text-[20px] font-bold text-[#1a1c1d]">
                พญ. นิศา สุวรรณรัตน์ (Dr. Nisa S.)
              </h3>
              <span className="material-symbols-outlined text-[#7d5540] text-[20px]" title="Board Certified">verified</span>
            </div>
            <p className="text-[13px] text-[#7d5540] font-semibold">
              Medical Director & Aesthetic Physician Leader · Aura Clinic Flagship
            </p>
            <p className="text-[12px] text-[#50443e] mt-2 leading-relaxed">
              ผู้เชี่ยวชาญด้าน Facial Contouring, High-Tier Lifting (Ulthera & Thermage) และ Bio-stimulators กว่า 12 ปีในระดับภูมิภาคเอเชียตะวันออกเฉียงใต้ กำกับดูแลมาตรฐานความปลอดภัยทางคลินิกและอัลกอริทึมการติดตามผลการรักษาคนไข้ของ Aura Clinic ทุกสาขา
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 my-4">
            <div className="p-3 bg-[#f3f3f4] rounded-xl border border-[#e2e2e3] text-center">
              <div className="font-data-metric text-[18px] text-[#7d5540]">98.4%</div>
              <div className="text-[11px] text-[#50443e] font-semibold mt-0.5">Patient Satisfaction</div>
            </div>
            <div className="p-3 bg-[#f3f3f4] rounded-xl border border-[#e2e2e3] text-center">
              <div className="font-data-metric text-[18px] text-[#7d5540]">4,200+</div>
              <div className="text-[11px] text-[#50443e] font-semibold mt-0.5">Ulthera & Filler Cases</div>
            </div>
            <div className="p-3 bg-[#f3f3f4] rounded-xl border border-[#e2e2e3] text-center">
              <div className="font-data-metric text-[18px] text-[#7d5540]">72.1%</div>
              <div className="text-[11px] text-[#50443e] font-semibold mt-0.5">VIP Retention Rate</div>
            </div>
          </div>

          <div className="p-3 bg-[#f9f9fa] rounded-xl border border-[#eeeeef] flex items-center gap-3">
            <img
              src={DOCTOR_BOARDROOM_IMG}
              alt="Clinical Review"
              className="w-16 h-12 rounded-lg object-cover border border-[#e2e2e3]"
            />
            <div className="text-[12px] text-[#50443e]">
              <span className="font-bold text-[#1a1c1d]">รอบตรวจเคสประจำวัน:</span> อังคาร-อาทิตย์ 11:00 - 20:00 น. ประจำห้อง Private Suite 01 สาขาทองหล่อ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
