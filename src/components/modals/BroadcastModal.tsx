import React, { useState } from 'react';

interface BroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBroadcastSent: (count: number) => void;
}

export const BroadcastModal: React.FC<BroadcastModalProps> = ({
  isOpen,
  onClose,
  onBroadcastSent
}) => {
  const [recipientGroup, setRecipientGroup] = useState('At-Risk High (ขาดการติดต่อ 90-180 วัน)');
  const [incentivePerk, setIncentivePerk] = useState('Privilege Touch-up 15% + นัดคิวส่วนตัว');
  const [message, setMessage] = useState(
    'Aura Clinic ขอส่งมอบสิทธิ์ดูแลความงามระดับ VIP: ตรวจเช็คสภาพผิวและประเมินผลหัตถการเดิม พร้อมรับสิทธิ์ Privilege Touch-up 15% สงวนสิทธิ์เฉพาะท่านถึงสิ้นเดือนนี้ค่ะ'
  );

  if (!isOpen) return null;

  const countMap: Record<string, number> = {
    'At-Risk High (ขาดการติดต่อ 90-180 วัน)': 412,
    'Need Attention (ห่างรอบ 45-90 วัน)': 389,
    'Champions VVIP (รอบบำรุงรักษา)': 324
  };

  const targetCount = countMap[recipientGroup] || 412;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    onBroadcastSent(targetCount);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-[#e2e2e3] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-[#eeeeef] flex items-center justify-between bg-[#f9f9fa]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7d5540] text-[22px]">send</span>
            <h3 className="font-headline-sm text-[16px] font-bold text-[#1a1c1d]">
              บรอดแคสต์ข้อความดึงกลับคนไข้ (Targeted LINE Broadcast)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSend} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-[12px] font-semibold text-[#50443e] uppercase tracking-wider mb-1">
              กลุ่มคนไข้ผู้รับข้อความ
            </label>
            <select
              value={recipientGroup}
              onChange={(e) => setRecipientGroup(e.target.value)}
              className="w-full text-[13px] px-3 py-2 rounded-lg border border-[#e2e2e3] focus:outline-none focus:ring-1 focus:ring-[#7d5540]"
            >
              <option value="At-Risk High (ขาดการติดต่อ 90-180 วัน)">At-Risk High (ขาดการติดต่อ 90-180 วัน) - 412 ท่าน</option>
              <option value="Need Attention (ห่างรอบ 45-90 วัน)">Need Attention (ห่างรอบ 45-90 วัน) - 389 ท่าน</option>
              <option value="Champions VVIP (รอบบำรุงรักษา)">Champions VVIP (รอบบำรุงรักษา) - 324 ท่าน</option>
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#50443e] uppercase tracking-wider mb-1">
              สิทธิประโยชน์ดึงกลับ (Incentive Perk)
            </label>
            <input
              type="text"
              value={incentivePerk}
              onChange={(e) => setIncentivePerk(e.target.value)}
              className="w-full text-[13px] px-3 py-2 rounded-lg border border-[#e2e2e3] focus:outline-none focus:ring-1 focus:ring-[#7d5540]"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#50443e] uppercase tracking-wider mb-1">
              เนื้อหาข้อความ LINE Official Account
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full text-[13px] px-3 py-2 rounded-lg border border-[#e2e2e3] focus:outline-none focus:ring-1 focus:ring-[#7d5540]"
            />
          </div>

          <div className="p-3 bg-[#ffdad6]/40 border border-[#ffdad6] rounded-xl flex items-center gap-3">
            <span className="material-symbols-outlined text-[#ba1a1a] text-[20px]">info</span>
            <div className="text-[12px] text-[#93000a]">
              ข้อความจะถูกส่งตรงเข้า LINE OA เฉพาะกลุ่มเป้าหมาย {targetCount} รายการ โดยไม่รบกวนคนไข้อื่น
            </div>
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
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>ยืนยันส่งข้อความทันที</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
