import React, { useState } from 'react';
import { OutreachQueueItem } from '../../types/clinic';

interface RecallCampaignsViewProps {
  queueItems: OutreachQueueItem[];
  onOpenQuickLogModal: (item: OutreachQueueItem) => void;
  onOpenNewCampaign: () => void;
  onOpenBroadcast: () => void;
  onShowToast: (title: string, desc?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  onUpdateQueueItemStatus: (id: string, status: 'pending' | 'line' | 'booked' | 'declined', note?: string) => void;
}

export const RecallCampaignsView: React.FC<RecallCampaignsViewProps> = ({
  queueItems,
  onOpenQuickLogModal,
  onOpenNewCampaign,
  onOpenBroadcast,
  onShowToast,
  onUpdateQueueItemStatus
}) => {
  const [activeQueueTab, setActiveQueueTab] = useState<'all' | 'pending' | 'line' | 'booked'>('all');

  const filteredQueue = queueItems.filter((item) => {
    if (activeQueueTab === 'all') return true;
    return item.status === activeQueueTab;
  });

  const pendingCount = queueItems.filter((i) => i.status === 'pending').length;
  const lineCount = queueItems.filter((i) => i.status === 'line').length;
  const bookedCount = queueItems.filter((i) => i.status === 'booked').length;

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#eeeeef] shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#cee9d9] text-[#1a3127] font-label-sm text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4b6458] animate-pulse"></span>
              Automated Patient Retention Engine
            </span>
            <span className="font-data-mono-sm text-[11px] text-[#50443e]">System Status: Active</span>
          </div>
          <h1 className="font-headline-lg text-[26px] font-bold text-[#1a1c1d]">
            ศูนย์ติดตามคนไข้และแคมเปญดึงกลับ (Recall & Retention)
          </h1>
          <p className="font-body-md text-[13px] text-[#50443e] mt-1">
            ระบบอัตโนมัติแจ้งเตือนรอบหัตถการ คอร์สใกล้หมดอายุ และการติดตามผลการรักษาเฉพาะบุคคล
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenBroadcast}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#ffdad6]/60 hover:bg-[#ffdad6] text-[#ba1a1a] font-label-md text-[13px] font-bold transition-colors cursor-pointer border border-[#ffdad6]"
          >
            <span className="material-symbols-outlined text-[18px]">campaign</span>
            <span>บรอดแคสต์กลุ่ม At-Risk</span>
          </button>
          <button
            onClick={onOpenNewCampaign}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7d5540] hover:bg-[#623e2b] text-white font-label-md text-[13px] font-bold shadow-sm transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>+ สร้างแคมเปญใหม่</span>
          </button>
        </div>
      </div>

      {/* 4 Smart Treatment Trigger Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Trigger 1 */}
        <div className="bg-white p-5 rounded-2xl border border-[#eeeeef] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-[#ffdbca] flex items-center justify-center text-[#7d5540]">
                <span className="material-symbols-outlined text-[20px]">calendar_month</span>
              </div>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                เปิดใช้งาน
              </span>
            </div>
            <h4 className="font-headline-sm text-[15px] font-bold text-[#1a1c1d] mt-3">
              Botox Cycle Recall
            </h4>
            <p className="text-[12px] text-[#50443e] mt-1">
              ทักเตือนเมื่อฉีดครบ 4-6 เดือน ก่อนกล้ามเนื้อคืนตัวเต็มที่
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#eeeeef] flex items-center justify-between text-[11px]">
            <span className="text-[#50443e]">คนไข้ถึงรอบ: <strong className="text-[#1a1c1d]">148 คน</strong></span>
            <span className="text-emerald-700 font-bold">Conv. 42.8%</span>
          </div>
        </div>

        {/* Trigger 2 */}
        <div className="bg-white p-5 rounded-2xl border border-[#eeeeef] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
                <span className="material-symbols-outlined text-[20px]">history</span>
              </div>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                เปิดใช้งาน
              </span>
            </div>
            <h4 className="font-headline-sm text-[15px] font-bold text-[#1a1c1d] mt-3">
              Course Expiry Alert
            </h4>
            <p className="text-[12px] text-[#50443e] mt-1">
              เตือนคอร์สเลเซอร์/ทรีตเมนต์คงเหลือที่ใกล้หมดอายุใน 30 วัน
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#eeeeef] flex items-center justify-between text-[11px]">
            <span className="text-[#50443e]">คนไข้ค้างคอร์ส: <strong className="text-[#1a1c1d]">42 คน</strong></span>
            <span className="text-emerald-700 font-bold">Conv. 70.8%</span>
          </div>
        </div>

        {/* Trigger 3 */}
        <div className="bg-white p-5 rounded-2xl border border-[#eeeeef] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-[#dbe3f3] flex items-center justify-center text-[#141c28]">
                <span className="material-symbols-outlined text-[20px]">diamond</span>
              </div>
              <span className="text-[10px] font-bold bg-[#f3f3f4] text-[#50443e] px-2 py-0.5 rounded-full">
                สแตนด์บาย
              </span>
            </div>
            <h4 className="font-headline-sm text-[15px] font-bold text-[#1a1c1d] mt-3">
              High-Value VIP Win-Back
            </h4>
            <p className="text-[12px] text-[#50443e] mt-1">
              ดึงกลับคนไข้ VVIP ที่ขาดการติดต่อ &gt; 90 วัน ด้วยสิทธิพิเศษ
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#eeeeef] flex items-center justify-between text-[11px]">
            <span className="text-[#50443e]">คนไข้ VIP: <strong className="text-[#1a1c1d]">19 คน</strong></span>
            <span className="text-[#7d5540] font-bold">Re-activation 53.5%</span>
          </div>
        </div>

        {/* Trigger 4 */}
        <div className="bg-white p-5 rounded-2xl border border-[#eeeeef] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-[#cee9d9] flex items-center justify-center text-[#1a3127]">
                <span className="material-symbols-outlined text-[20px]">sentiment_very_satisfied</span>
              </div>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                อัตโนมัติ
              </span>
            </div>
            <h4 className="font-headline-sm text-[15px] font-bold text-[#1a1c1d] mt-3">
              Post-Procedure Care
            </h4>
            <p className="text-[12px] text-[#50443e] mt-1">
              ติดตามอาการหลังทำ Day 1, Day 3 และ Day 7 อัตโนมัติ
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#eeeeef] flex items-center justify-between text-[11px]">
            <span className="text-[#50443e]">ติดตามวันนี้: <strong className="text-[#1a1c1d]">28 คน</strong></span>
            <span className="text-emerald-700 font-bold">CSAT Score 4.92/5</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Outreach Queue (8 cols) + Side Performance Panel (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Outreach Queue: 8 cols */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="bg-white p-6 rounded-2xl border border-[#eeeeef] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#eeeeef] gap-3">
              <div>
                <h3 className="font-headline-sm text-[18px] font-bold text-[#1a1c1d] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#7d5540]">assignment_late</span>
                  <span>คิวงานติดตามประจำวัน (Today's Outreach Queue)</span>
                </h3>
                <p className="font-body-sm text-[12px] text-[#50443e] mt-0.5">
                  58 เคสที่ต้องดำเนินการโดยทีมประสานงานและ Medical Concierge
                </p>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 bg-[#f3f3f4] p-1 rounded-xl">
                <button
                  onClick={() => setActiveQueueTab('all')}
                  className={`px-3 py-1 text-[12px] font-semibold rounded-lg transition-all cursor-pointer ${
                    activeQueueTab === 'all'
                      ? 'bg-white text-[#1a1c1d] shadow-sm'
                      : 'text-[#50443e] hover:text-[#1a1c1d]'
                  }`}
                >
                  ทั้งหมด ({queueItems.length})
                </button>
                <button
                  onClick={() => setActiveQueueTab('pending')}
                  className={`px-3 py-1 text-[12px] font-semibold rounded-lg transition-all cursor-pointer ${
                    activeQueueTab === 'pending'
                      ? 'bg-white text-[#1a1c1d] shadow-sm'
                      : 'text-[#50443e] hover:text-[#1a1c1d]'
                  }`}
                >
                  ค้างโทร ({pendingCount})
                </button>
                <button
                  onClick={() => setActiveQueueTab('line')}
                  className={`px-3 py-1 text-[12px] font-semibold rounded-lg transition-all cursor-pointer ${
                    activeQueueTab === 'line'
                      ? 'bg-white text-[#1a1c1d] shadow-sm'
                      : 'text-[#50443e] hover:text-[#1a1c1d]'
                  }`}
                >
                  LINE รอตอบ ({lineCount})
                </button>
                <button
                  onClick={() => setActiveQueueTab('booked')}
                  className={`px-3 py-1 text-[12px] font-semibold rounded-lg transition-all cursor-pointer ${
                    activeQueueTab === 'booked'
                      ? 'bg-white text-[#1a1c1d] shadow-sm'
                      : 'text-[#50443e] hover:text-[#1a1c1d]'
                  }`}
                >
                  นัดสำเร็จ ({bookedCount})
                </button>
              </div>
            </div>

            {/* Queue Items List */}
            <div className="flex flex-col gap-4 mt-5">
              {filteredQueue.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-[#eeeeef] bg-[#f9f9fa] hover:border-[#b88a72]/60 transition-all flex flex-col gap-3"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {item.avatarUrl ? (
                        <img
                          src={item.avatarUrl}
                          alt={item.name}
                          className="w-11 h-11 rounded-full object-cover ring-1 ring-[#e2e2e3]"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-[#f3f3f4] text-[#7d5540] font-bold flex items-center justify-center font-mono text-[13px] ring-1 ring-[#e2e2e3]">
                          {item.initials}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[14px] text-[#1a1c1d]">{item.name}</span>
                          <span className="text-[10px] bg-[#7d5540] text-white px-2 py-0.5 rounded font-semibold">
                            {item.tier}
                          </span>
                          <span className="font-mono text-[11px] text-[#50443e] bg-white px-2 py-0.5 rounded border border-[#e2e2e3]">
                            {item.rfmString}
                          </span>
                        </div>
                        <div className="text-[12px] text-[#50443e] mt-0.5">
                          {item.procedure} · <span className="font-semibold">{item.courseDetails}</span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[11px] px-2.5 py-1 rounded-full font-semibold ${
                        item.status === 'pending'
                          ? 'bg-[#ffdad6] text-[#ba1a1a]'
                          : item.status === 'line'
                          ? 'bg-[#d8e0f0] text-[#5b6371]'
                          : 'bg-[#cee9d9] text-[#1a3127]'
                      }`}
                    >
                      {item.status === 'pending'
                        ? 'ค้างโทรติดตาม'
                        : item.status === 'line'
                        ? 'LINE รอตอบกลับ'
                        : item.status === 'booked'
                        ? 'นัดหมายตรวจซ้ำแล้ว'
                        : 'ปฏิเสธ'}
                    </span>
                  </div>

                  {/* Suggested Script Box */}
                  <div className="p-3 bg-white rounded-lg border border-[#e2e2e3] text-[12px] text-[#442513] italic leading-relaxed">
                    {item.suggestedScript}
                  </div>

                  {/* Log info if completed */}
                  {item.completedNote && (
                    <div className="text-[11px] text-[#1a3127] bg-[#cee9d9]/30 p-2 rounded-lg border border-[#b2cdbe]">
                      ✓ บันทึกโดย {item.loggedBy}: {item.completedNote} ({item.scheduledDate})
                    </div>
                  )}

                  {/* Actions row */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="text-[12px] text-[#50443e] font-mono flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">call</span>
                      <span>{item.phone}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onShowToast('เปิดแชท LINE OA สำเร็จ', `กำลังส่งข้อความเทมเพลตไปยัง ${item.name}`, 'info');
                          onUpdateQueueItemStatus(item.id, 'line');
                        }}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[12px] font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer border border-emerald-200"
                      >
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                        <span>ส่ง LINE Direct</span>
                      </button>

                      <button
                        onClick={() => onOpenQuickLogModal(item)}
                        className="px-3 py-1.5 bg-[#7d5540] hover:bg-[#623e2b] text-white text-[12px] font-bold rounded-lg shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">phone_in_talk</span>
                        <span>บันทึกผลโทร</span>
                      </button>

                      {item.status !== 'booked' && (
                        <button
                          onClick={() => {
                            onUpdateQueueItemStatus(item.id, 'booked', 'นัดหมายสำเร็จผ่านการติดตาม');
                            onShowToast('นัดหมายสำเร็จ', `บันทึกคิวนัด ${item.name} ตรวจซ้ำเรียบร้อยแล้ว`, 'success');
                          }}
                          className="px-2.5 py-1.5 bg-[#cee9d9] hover:bg-[#b2cdbe] text-[#1a3127] text-[12px] font-bold rounded-lg transition-colors cursor-pointer"
                          title="ทำเครื่องหมายว่านัดสำเร็จ"
                        >
                          ✓ นัดแล้ว
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side Performance Panel: 4 cols */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Revenue Recovered Spotlight */}
          <div className="bg-white p-6 rounded-2xl border border-[#eeeeef] shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#eeeeef]">
              <h4 className="font-headline-sm text-[15px] font-bold text-[#1a1c1d]">
                รายได้ที่กู้คืนได้เดือนนี้
              </h4>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                +24.6% MoM
              </span>
            </div>

            <div className="my-4">
              <div className="font-data-metric text-[32px] text-[#7d5540] font-bold">
                ฿1,420,000
              </div>
              <p className="text-[12px] text-[#50443e] mt-1">
                จากคนไข้ 138 คน ที่ตอบรับการแจ้งเตือนและกลับมาทำซ้ำ
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#eeeeef] text-center">
              <div className="p-2.5 bg-[#f9f9fa] rounded-xl border border-[#eeeeef]">
                <div className="text-[10px] text-[#50443e]">Avg. Ticket / Case</div>
                <div className="font-mono text-[15px] font-bold text-[#1a1c1d] mt-0.5">฿10,290</div>
              </div>
              <div className="p-2.5 bg-[#f9f9fa] rounded-xl border border-[#eeeeef]">
                <div className="text-[10px] text-[#50443e]">ROI แคมเปญ</div>
                <div className="font-mono text-[15px] font-bold text-emerald-700 mt-0.5">14.8x</div>
              </div>
            </div>
          </div>

          {/* Conversion by Channel */}
          <div className="bg-white p-6 rounded-2xl border border-[#eeeeef] shadow-sm">
            <h4 className="font-headline-sm text-[15px] font-bold text-[#1a1c1d] mb-4">
              อัตราการตอบรับแยกตามช่องทาง
            </h4>
            <div className="flex flex-col gap-4">
              {/* Phone */}
              <div>
                <div className="flex items-center justify-between text-[12px] mb-1">
                  <span className="font-semibold text-[#1a1c1d] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#7d5540]">phone_in_talk</span>
                    <span>Phone Concierge (VIP)</span>
                  </span>
                  <span className="font-mono font-bold text-[#7d5540]">46% (68/148)</span>
                </div>
                <div className="w-full bg-[#eeeeef] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#7d5540] h-full rounded-full w-[46%]"></div>
                </div>
              </div>

              {/* LINE OA */}
              <div>
                <div className="flex items-center justify-between text-[12px] mb-1">
                  <span className="font-semibold text-[#1a1c1d] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">chat</span>
                    <span>LINE Official Account</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-700">28% (42/150)</span>
                </div>
                <div className="w-full bg-[#eeeeef] h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full w-[28%]"></div>
                </div>
              </div>

              {/* SMS */}
              <div>
                <div className="flex items-center justify-between text-[12px] mb-1">
                  <span className="font-semibold text-[#1a1c1d] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#575f6d]">sms</span>
                    <span>Automated Smart SMS</span>
                  </span>
                  <span className="font-mono font-bold text-[#575f6d]">12% (18/150)</span>
                </div>
                <div className="w-full bg-[#eeeeef] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#575f6d] h-full rounded-full w-[12%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Retention Best Practice Tip Box */}
          <div className="bg-[#ffdbca]/20 border border-[#b88a72]/40 p-5 rounded-2xl">
            <div className="flex items-center gap-2 text-[#442513] font-bold text-[13px] mb-1.5">
              <span className="material-symbols-outlined text-[#7d5540]">lightbulb</span>
              <span>คำแนะนำทางคลินิก (Retention Tip)</span>
            </div>
            <p className="text-[12px] text-[#50443e] leading-relaxed">
              คนไข้กลุ่มฉีดโบท็อกซ์ริ้วรอยมีโอกาสตัดสินใจทำซ้ำสูงสุดหากติดต่อในช่วงสัปดาห์ที่ 16-18 หลังการฉีดครั้งก่อน (ก่อนที่กล้ามเนื้อจะกลับมาทำงานเต็มที่ 100%)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
