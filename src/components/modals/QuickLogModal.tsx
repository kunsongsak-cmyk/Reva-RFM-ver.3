import React, { useState } from 'react';

interface QuickLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
  procedure: string;
  phone: string;
  onSave: (result: {
    status: 'booked' | 'declined' | 'pending' | 'line';
    note: string;
    scheduledDate?: string;
  }) => void;
}

export const QuickLogModal: React.FC<QuickLogModalProps> = ({
  isOpen,
  onClose,
  patientName,
  procedure,
  phone,
  onSave
}) => {
  const [outcome, setOutcome] = useState<'booked' | 'line' | 'pending' | 'declined'>('booked');
  const [scheduledDate, setScheduledDate] = useState('2025-03-28T14:00');
  const [note, setNote] = useState('');
  const [attendingDoctor, setAttendingDoctor] = useState('พญ. นิศา สุวรรณรัตน์');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      status: outcome,
      note: note || (outcome === 'booked' ? `นัดหมายตรวจซ้ำเรียบร้อย (${attendingDoctor})` : 'ติดตามผลการรักษาตามรอบ'),
      scheduledDate: outcome === 'booked' ? scheduledDate : undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-[#e2e2e3] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-[#eeeeef] flex items-center justify-between bg-[#f9f9fa]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7d5540] text-[22px]">phone_in_talk</span>
            <h3 className="font-headline-sm text-[16px] font-bold text-[#1a1c1d]">
              บันทึกผลการติดต่อคนไข้ (Clinical Outreach Log)
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
          {/* Patient summary badge */}
          <div className="p-3 rounded-xl bg-[#f3f3f4] border border-[#e2e2e3] flex items-center justify-between">
            <div>
              <div className="font-bold text-[#1a1c1d] text-[14px]">{patientName}</div>
              <div className="text-[12px] text-[#50443e] mt-0.5">{procedure}</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[12px] font-semibold text-[#7d5540]">{phone}</div>
              <span className="inline-block text-[10px] bg-[#dbe3f3] text-[#141c28] px-2 py-0.5 rounded font-semibold mt-1">
                Outreach Call
              </span>
            </div>
          </div>

          {/* Outcome Radio Selection */}
          <div>
            <label className="block text-[12px] font-semibold text-[#50443e] uppercase tracking-wider mb-2">
              ผลการประสานงาน
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOutcome('booked')}
                className={`flex items-center gap-2 p-2.5 rounded-lg border text-left text-[13px] transition-all cursor-pointer ${
                  outcome === 'booked'
                    ? 'border-[#7d5540] bg-[#ffdbca]/30 text-[#442513] font-bold shadow-sm'
                    : 'border-[#e2e2e3] hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="material-symbols-outlined text-emerald-600 text-[18px]">event_available</span>
                <span>นัดหมายตรวจ/ทำซ้ำสำเร็จ</span>
              </button>

              <button
                type="button"
                onClick={() => setOutcome('line')}
                className={`flex items-center gap-2 p-2.5 rounded-lg border text-left text-[13px] transition-all cursor-pointer ${
                  outcome === 'line'
                    ? 'border-[#7d5540] bg-[#ffdbca]/30 text-[#442513] font-bold shadow-sm'
                    : 'border-[#e2e2e3] hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="material-symbols-outlined text-[#7d5540] text-[18px]">chat</span>
                <span>ส่งข้อความทาง LINE แล้ว</span>
              </button>

              <button
                type="button"
                onClick={() => setOutcome('pending')}
                className={`flex items-center gap-2 p-2.5 rounded-lg border text-left text-[13px] transition-all cursor-pointer ${
                  outcome === 'pending'
                    ? 'border-[#7d5540] bg-[#ffdbca]/30 text-[#442513] font-bold shadow-sm'
                    : 'border-[#e2e2e3] hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="material-symbols-outlined text-amber-600 text-[18px]">phone_missed</span>
                <span>ไม่รับสาย / ติดสาย</span>
              </button>

              <button
                type="button"
                onClick={() => setOutcome('declined')}
                className={`flex items-center gap-2 p-2.5 rounded-lg border text-left text-[13px] transition-all cursor-pointer ${
                  outcome === 'declined'
                    ? 'border-[#7d5540] bg-[#ffdbca]/30 text-[#442513] font-bold shadow-sm'
                    : 'border-[#e2e2e3] hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="material-symbols-outlined text-rose-600 text-[18px]">cancel</span>
                <span>ขอชะลอ / ยังไม่สะดวก</span>
              </button>
            </div>
          </div>

          {/* Conditional Date & Time Picker */}
          {outcome === 'booked' && (
            <div className="grid grid-cols-2 gap-3 p-3 bg-[#cee9d9]/20 rounded-xl border border-[#b2cdbe]">
              <div>
                <label className="block text-[11px] font-semibold text-[#1a3127] uppercase mb-1">
                  วันและเวลานัดหมาย
                </label>
                <input
                  type="datetime-local"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full text-[13px] px-3 py-2 rounded-lg border border-[#e2e2e3] bg-white focus:outline-none focus:ring-1 focus:ring-[#7d5540]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#1a3127] uppercase mb-1">
                  แพทย์ผู้ตรวจ (Doctor)
                </label>
                <select
                  value={attendingDoctor}
                  onChange={(e) => setAttendingDoctor(e.target.value)}
                  className="w-full text-[13px] px-3 py-2 rounded-lg border border-[#e2e2e3] bg-white focus:outline-none focus:ring-1 focus:ring-[#7d5540]"
                >
                  <option value="พญ. นิศา สุวรรณรัตน์">พญ. นิศา สุวรรณรัตน์</option>
                  <option value="นพ. ภัทร วงศ์เจริญ">นพ. ภัทร วงศ์เจริญ</option>
                  <option value="นพ. ชานนท์ ฤทธิ์เดช">นพ. ชานนท์ ฤทธิ์เดช</option>
                </select>
              </div>
            </div>
          )}

          {/* Clinical Staff Notes */}
          <div>
            <label className="block text-[12px] font-semibold text-[#50443e] uppercase tracking-wider mb-1">
              บันทึกข้อความจากคนไข้ / รายละเอียดเพิ่มเติม
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="เช่น คนไข้แจ้งว่าสนใจฉีดโบท็อกซ์กรามและลิฟท์กรอบหน้าเพิ่ม ขอจองห้อง VIP Suite 02..."
              className="w-full text-[13px] px-3 py-2 rounded-lg border border-[#e2e2e3] focus:outline-none focus:ring-1 focus:ring-[#7d5540]"
            />
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
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>บันทึกผลการโทร</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
