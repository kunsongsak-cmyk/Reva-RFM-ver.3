import React, { useState } from 'react';

interface NewCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (campaignName: string, targetCount: number) => void;
}

export const NewCampaignModal: React.FC<NewCampaignModalProps> = ({
  isOpen,
  onClose,
  onCreated
}) => {
  const [name, setName] = useState('Sculptra Collagen Stimulator Recall Q1');
  const [procedure, setProcedure] = useState('Sculptra / Radiesse (Biostimulator)');
  const [triggerDays, setTriggerDays] = useState('45-60 วันหลังหัตถการ');
  const [channel, setChannel] = useState('LINE OA + Medical Concierge Call');
  const [targetSegment, setTargetSegment] = useState('Champions VVIP & Loyal Patients');
  const [messageTemplate, setMessageTemplate] = useState(
    'สวัสดีค่ะ [ชื่อคนไข้] ตามแผนกระตุ้นคอลลาเจน Sculptra ครั้งที่ 2 เพื่อผลลัพธ์โครงหน้ายกกระชับสูงสุด ทางคลินิกขอสงวนสิทธิ์คิวแพทย์ พญ.นิศา ให้ท่านล่วงหน้าค่ะ'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreated(name, 128);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-[#e2e2e3] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-[#eeeeef] flex items-center justify-between bg-[#f9f9fa]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7d5540] text-[22px]">add_circle</span>
            <h3 className="font-headline-sm text-[16px] font-bold text-[#1a1c1d]">
              สร้างแคมเปญกระตุ้นหัตถการใหม่ (Smart Retention Campaign)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-[12px] font-semibold text-[#50443e] uppercase tracking-wider mb-1">
              ชื่อแคมเปญ
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-[13px] px-3 py-2 rounded-lg border border-[#e2e2e3] focus:outline-none focus:ring-1 focus:ring-[#7d5540]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-semibold text-[#50443e] uppercase tracking-wider mb-1">
                กลุ่มหัตถการเป้าหมาย
              </label>
              <select
                value={procedure}
                onChange={(e) => setProcedure(e.target.value)}
                className="w-full text-[13px] px-3 py-2 rounded-lg border border-[#e2e2e3] focus:outline-none focus:ring-1 focus:ring-[#7d5540]"
              >
                <option value="Botox (ริ้วรอย / ปรับรูปหน้ากราม)">Botox (ริ้วรอย / กราม)</option>
                <option value="Hyaluronic Acid Filler">Hyaluronic Acid Filler</option>
                <option value="Sculptra / Radiesse (Biostimulator)">Sculptra / Radiesse</option>
                <option value="Ulthera SPT / Thermage FLX">Ulthera / Thermage</option>
                <option value="PicoWay / Skin Booster Course">PicoWay / Booster Course</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#50443e] uppercase tracking-wider mb-1">
                รอบระยะเวลา Trigger
              </label>
              <select
                value={triggerDays}
                onChange={(e) => setTriggerDays(e.target.value)}
                className="w-full text-[13px] px-3 py-2 rounded-lg border border-[#e2e2e3] focus:outline-none focus:ring-1 focus:ring-[#7d5540]"
              >
                <option value="21-30 วันหลังหัตถการ">21-30 วันหลังหัตถการ (Booster)</option>
                <option value="45-60 วันหลังหัตถการ">45-60 วันหลังหัตถการ (Vial 2)</option>
                <option value="120-150 วัน (Botox 4-5 เดือน)">120-150 วัน (Botox 4-5 เดือน)</option>
                <option value="9-11 เดือน (Ulthera & Filler)">9-11 เดือน (Ulthera & Filler)</option>
                <option value="คอร์สหมดอายุใน 30 วัน">คอร์สคงเหลือใกล้หมดอายุ</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-semibold text-[#50443e] uppercase tracking-wider mb-1">
                ช่องทางสื่อสารหลัก
              </label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="w-full text-[13px] px-3 py-2 rounded-lg border border-[#e2e2e3] focus:outline-none focus:ring-1 focus:ring-[#7d5540]"
              >
                <option value="LINE OA + Medical Concierge Call">LINE OA + Medical Concierge Call</option>
                <option value="LINE Official Account Direct">LINE Official Account Direct</option>
                <option value="Phone Concierge Only (VIP)">Phone Concierge Only (VIP)</option>
                <option value="Automated Smart SMS">Automated Smart SMS</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#50443e] uppercase tracking-wider mb-1">
                กลุ่มคนไข้เป้าหมาย (RFM)
              </label>
              <select
                value={targetSegment}
                onChange={(e) => setTargetSegment(e.target.value)}
                className="w-full text-[13px] px-3 py-2 rounded-lg border border-[#e2e2e3] focus:outline-none focus:ring-1 focus:ring-[#7d5540]"
              >
                <option value="Champions VVIP & Loyal Patients">Champions VVIP & Loyal Patients</option>
                <option value="At-Risk High (เสี่ยงหลุดคอร์ส)">At-Risk High (เสี่ยงหลุดคอร์ส)</option>
                <option value="Need Attention (เริ่มห่างรอบ)">Need Attention (เริ่มห่างรอบ)</option>
                <option value="Hibernating (หลับใหล >180 วัน)">Hibernating (หลับใหล &gt;180 วัน)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#50443e] uppercase tracking-wider mb-1">
              ข้อความสื่อสารหรือสคริปต์แนะนำ (Personalized Script)
            </label>
            <textarea
              rows={3}
              value={messageTemplate}
              onChange={(e) => setMessageTemplate(e.target.value)}
              className="w-full text-[13px] px-3 py-2 rounded-lg border border-[#e2e2e3] focus:outline-none focus:ring-1 focus:ring-[#7d5540]"
            />
          </div>

          {/* Forecast Box */}
          <div className="p-3 bg-[#ffdbca]/20 border border-[#b88a72]/30 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold text-[#623e2b] uppercase tracking-wider">
                คาดการณ์คนไข้เป้าหมาย
              </div>
              <div className="font-headline-sm text-[16px] font-bold text-[#442513] mt-0.5">
                128 คนไข้ (มูลค่าฟื้นฟู ~฿1,840,000)
              </div>
            </div>
            <span className="text-[11px] bg-[#b88a72] text-white px-2.5 py-1 rounded font-semibold">
              AI Projected
            </span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#eeeeef]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-[13px] font-bold text-white bg-[#7d5540] hover:bg-[#623e2b] rounded-lg shadow-sm cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
              <span>เปิดใช้งานแคมเปญอัตโนมัติ</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
