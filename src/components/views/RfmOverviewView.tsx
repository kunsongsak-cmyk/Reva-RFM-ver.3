import React, { useState, useMemo } from 'react';
import { Patient } from '../../types/clinic';

interface MatrixCell {
  key: string;
  count: number;
  tier: string;
  text: string;
  isStar?: boolean;
  isRisk?: boolean;
}

interface MatrixRow {
  r: number;
  label: string;
  cells: MatrixCell[];
}

interface RfmOverviewViewProps {
  patients: Patient[];
  onOpenQuickLog: (patient: Patient) => void;
  onOpenBroadcast: () => void;
  onNavigateToSegments: (segment?: string) => void;
  onShowToast: (title: string, desc?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const RfmOverviewView: React.FC<RfmOverviewViewProps> = ({
  patients,
  onOpenQuickLog,
  onOpenBroadcast,
  onNavigateToSegments,
  onShowToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState<'all' | 'urgent' | 'warning' | 'booked'>('all');
  const [selectedMatrixCell, setSelectedMatrixCell] = useState<string | null>(null);

  // Filtered patients for the table
  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      const matchQuery =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.hn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.phone.includes(searchQuery) ||
        p.primaryProcedure.toLowerCase().includes(searchQuery.toLowerCase());

      const matchUrgency =
        urgencyFilter === 'all' ? true : p.riskStatus === urgencyFilter;

      const matchMatrix = selectedMatrixCell
        ? `R${p.rScore}` === selectedMatrixCell || `M${p.mScore}` === selectedMatrixCell
        : true;

      return matchQuery && matchUrgency && matchMatrix;
    });
  }, [patients, searchQuery, urgencyFilter, selectedMatrixCell]);

  const handleExportCSV = () => {
    const csvHeader = 'HN,Name,Tier,RFM Segment,Recency Days,Monetary,Procedure\n';
    const csvRows = patients
      .map(
        (p) =>
          `"${p.hn}","${p.name}","${p.tier}","${p.rfmSegment}",${p.recencyDays},${p.monetary},"${p.primaryProcedure}"`
      )
      .join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Aura_Clinic_RFM_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('ส่งออกรายงานสำเร็จ', 'ไฟล์ Aura_Clinic_RFM_Report.csv ถูกบันทึกลงเครื่องแล้ว', 'success');
  };

  const handleSyncData = () => {
    onShowToast('ซิงค์ข้อมูลสำเร็จ', 'ดึงข้อมูลประวัติการรักษาและใบเสร็จล่าสุดจาก POS & CRM เรียบร้อย', 'info');
  };

  // RFM 5x5 Matrix Cell Definitions
  const matrixRows: MatrixRow[] = [
    {
      r: 5,
      label: 'R5 (<30 วัน)',
      cells: [
        { key: 'R5-F1', count: 184, tier: 'low', text: '184' },
        { key: 'R5-F2', count: 210, tier: 'med', text: '210' },
        { key: 'R5-F3', count: 340, tier: 'med', text: '340' },
        { key: 'R5-F4', count: 295, tier: 'high', text: '295' },
        { key: 'R5-F5', count: 324, tier: 'high', text: '324 (VIP)', isStar: true }
      ]
    },
    {
      r: 4,
      label: 'R4 (30-45 วัน)',
      cells: [
        { key: 'R4-F1', count: 95, tier: 'low', text: '95' },
        { key: 'R4-F2', count: 130, tier: 'low', text: '130' },
        { key: 'R4-F3', count: 215, tier: 'med', text: '215' },
        { key: 'R4-F4', count: 180, tier: 'high', text: '180' },
        { key: 'R4-F5', count: 198, tier: 'high', text: '198' }
      ]
    },
    {
      r: 3,
      label: 'R3 (45-90 วัน)',
      cells: [
        { key: 'R3-F1', count: 110, tier: 'low', text: '110' },
        { key: 'R3-F2', count: 145, tier: 'low', text: '145' },
        { key: 'R3-F3', count: 160, tier: 'med', text: '160' },
        { key: 'R3-F4', count: 142, tier: 'med', text: '142' },
        { key: 'R3-F5', count: 88, tier: 'high', text: '88' }
      ]
    },
    {
      r: 2,
      label: 'R2 (90-180 วัน)',
      cells: [
        { key: 'R2-F1', count: 165, tier: 'low', text: '165' },
        { key: 'R2-F2', count: 120, tier: 'low', text: '120' },
        { key: 'R2-F3', count: 95, tier: 'low', text: '95' },
        { key: 'R2-F4', count: 84, tier: 'med', text: '84' },
        { key: 'R2-F5', count: 48, tier: 'high', text: '48 (เสี่ยง)', isRisk: true }
      ]
    },
    {
      r: 1,
      label: 'R1 (>180 วัน)',
      cells: [
        { key: 'R1-F1', count: 280, tier: 'low', text: '280' },
        { key: 'R1-F2', count: 110, tier: 'low', text: '110' },
        { key: 'R1-F3', count: 62, tier: 'low', text: '62' },
        { key: 'R1-F4', count: 32, tier: 'low', text: '32' },
        { key: 'R1-F5', count: 15, tier: 'high', text: '15' }
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Top Banner with live intelligence */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#eeeeef] shadow-[0_2px_12px_rgba(28,36,48,0.03)]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffdbca] text-[#442513] font-label-sm text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7d5540] animate-pulse"></span>
              Live Intelligence
            </span>
            <span className="font-data-mono-sm text-[11px] text-[#50443e]">ID: AUR-THL-2025</span>
          </div>
          <h1 className="font-headline-lg text-[26px] font-bold text-[#1a1c1d]">
            สวัสดีตอนเช้า, พญ. นิศา
          </h1>
          <p className="font-body-md text-[13px] text-[#50443e] mt-1">
            ภาพรวมสุขภาพฐานคนไข้และโอกาสสร้างรายได้จากการติดตามหัตถการครบรอบวันนี้
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSyncData}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#f3f3f4] hover:bg-[#e8e8e9] text-[#1a1c1d] font-label-md text-[13px] transition-colors cursor-pointer border border-[#e2e2e3]/60"
          >
            <span className="material-symbols-outlined text-[#7d5540] text-[18px]">sync</span>
            <span>ซิงค์ข้อมูลล่าสุด</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7d5540] hover:bg-[#623e2b] text-white font-label-md text-[13px] font-bold shadow-sm transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>ส่งออกรายงาน RFM (CSV)</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-[#eeeeef] shadow-sm hover:border-[#b88a72]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-[13px] text-[#50443e]">คนไข้ Active ทั้งหมด</span>
            <div className="w-8 h-8 rounded-lg bg-[#f3f3f4] flex items-center justify-center text-[#7d5540]">
              <span className="material-symbols-outlined text-[18px]">groups</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-data-metric text-[28px] text-[#1a1c1d] font-bold">3,842</div>
            <div className="flex items-center gap-1 text-[12px] text-emerald-700 font-semibold mt-1">
              <span className="material-symbols-outlined text-[15px]">trending_up</span>
              <span>+8.4% จากไตรมาสก่อน</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-[#eeeeef] shadow-sm hover:border-[#b88a72]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-[13px] text-[#50443e]">Champions & Loyal VIP</span>
            <div className="w-8 h-8 rounded-lg bg-[#ffdbca] flex items-center justify-center text-[#442513]">
              <span className="material-symbols-outlined text-[18px]">star</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-data-metric text-[28px] text-[#1a1c1d] font-bold">846</div>
            <div className="flex items-center gap-1 text-[12px] text-[#7d5540] font-semibold mt-1">
              <span>22.0% ของฐานคนไข้ (สร้างรายได้ 68%)</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-[#ba1a1a]/20 shadow-sm hover:border-[#ba1a1a]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-[13px] text-[#ba1a1a] font-bold">คนไข้เสี่ยงหลุดคอร์ส (At-Risk)</span>
            <div className="w-8 h-8 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
              <span className="material-symbols-outlined text-[18px]">warning</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-data-metric text-[28px] text-[#ba1a1a] font-bold">412</div>
            <div className="flex items-center gap-1 text-[12px] text-[#93000a] font-semibold mt-1">
              <span>ขาดการติดต่อ 90-180 วัน (มูลค่าเสี่ยง ฿8.24M)</span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl border border-[#eeeeef] shadow-sm hover:border-[#b88a72]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-[13px] text-[#50443e]">อัตราความสำเร็จ Recall</span>
            <div className="w-8 h-8 rounded-lg bg-[#cee9d9] flex items-center justify-center text-[#1a3127]">
              <span className="material-symbols-outlined text-[18px]">autorenew</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-data-metric text-[28px] text-[#1a1c1d] font-bold">34.6%</div>
            <div className="flex items-center gap-1 text-[12px] text-emerald-700 font-semibold mt-1">
              <span className="material-symbols-outlined text-[15px]">trending_up</span>
              <span>+5.2% MoM (กลับมาทำซ้ำ 138 เคส)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: RFM Matrix (8 Cols) & Clinical Recall Sidebar (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* RFM 5x5 Matrix (8 Cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-[#eeeeef] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#eeeeef] gap-2">
              <div>
                <h3 className="font-headline-sm text-[18px] font-bold text-[#1a1c1d] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#7d5540]">grid_4x4</span>
                  <span>Aesthetic RFM 5x5 Matrix</span>
                </h3>
                <p className="font-body-sm text-[12px] text-[#50443e] mt-0.5">
                  การกระจายตัวของคนไข้ตามความถี่และการใช้จ่าย เทียบกับความสดใหม่ในการเข้ารับบริการ
                </p>
              </div>
              {selectedMatrixCell && (
                <button
                  onClick={() => setSelectedMatrixCell(null)}
                  className="text-[12px] text-[#7d5540] hover:underline font-semibold flex items-center gap-1"
                >
                  <span>ล้างตัวกรอง Matrix</span>
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              )}
            </div>

            {/* Matrix Legend */}
            <div className="flex items-center gap-4 py-3 text-[12px] text-[#50443e] flex-wrap">
              <span className="font-bold text-[#1a1c1d]">Legend:</span>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-[#7d5540]"></span>
                <span>High Value VIPs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-[#b88a72]/50"></span>
                <span>Medium Regulars</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-[#eeeeef]"></span>
                <span>Low / One-Time</span>
              </div>
            </div>

            {/* Matrix Interactive Table */}
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wider text-[#50443e]">
                    <th className="p-2 text-left w-28">Recency ↓</th>
                    <th className="p-2">F1 (1 ครั้ง)</th>
                    <th className="p-2">F2 (2 ครั้ง)</th>
                    <th className="p-2">F3 (3-5 ครั้ง)</th>
                    <th className="p-2">F4 (6-9 ครั้ง)</th>
                    <th className="p-2 font-bold text-[#7d5540]">F5 (10+ ครั้ง)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eeeeef]">
                  {matrixRows.map((row) => (
                    <tr key={row.r}>
                      <td className="p-2.5 text-left font-semibold text-[12px] text-[#50443e] whitespace-nowrap">
                        {row.label}
                      </td>
                      {row.cells.map((cell) => {
                        let bg = 'bg-[#f9f9fa] text-[#50443e] hover:bg-[#e8e8e9]';
                        if (cell.tier === 'high') {
                          bg = 'bg-[#7d5540] text-white hover:bg-[#623e2b] shadow-sm';
                        } else if (cell.tier === 'med') {
                          bg = 'bg-[#ffdbca] text-[#442513] hover:bg-[#efbca1]';
                        }

                        const isSelected = selectedMatrixCell === `R${row.r}`;

                        return (
                          <td key={cell.key} className="p-1.5">
                            <button
                              onClick={() => {
                                setSelectedMatrixCell(
                                  selectedMatrixCell === `R${row.r}` ? null : `R${row.r}`
                                );
                              }}
                              className={`w-full py-2.5 px-2 rounded-xl text-[12px] font-mono font-bold transition-all cursor-pointer ${bg} ${
                                isSelected ? 'ring-2 ring-black scale-105 shadow-md' : ''
                              }`}
                              title={`คลิกเพื่อกรองคนไข้กลุ่ม ${row.label} - ${cell.text}`}
                            >
                              <div className="flex items-center justify-center gap-1">
                                {cell.isStar && <span className="text-[12px]">★</span>}
                                <span>{cell.text}</span>
                              </div>
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#eeeeef] flex items-center justify-between text-[12px] text-[#50443e]">
            <span>คลิกที่เซลล์ใน Matrix เพื่อกรองตารางคนไข้ด้านล่างตามกลุ่มคะแนน</span>
            <button
              onClick={() => onNavigateToSegments()}
              className="text-[#7d5540] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>เปิดดูการวิเคราะห์ 11 Segment แบบละเอียด</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Side Panel: Clinical Recall Cycles & LTV Donut (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Clinical Recall Cycles */}
          <div className="bg-white p-5 rounded-2xl border border-[#eeeeef] shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#eeeeef]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#7d5540]">alarm</span>
                <h4 className="font-headline-sm text-[15px] font-bold text-[#1a1c1d]">
                  รอบหัตถการที่ต้องติดตาม
                </h4>
              </div>
              <span className="text-[11px] font-bold text-[#7d5540] bg-[#ffdbca] px-2 py-0.5 rounded">
                Auto-Cycle
              </span>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              {/* Item 1 */}
              <div className="p-3 rounded-xl bg-[#f9f9fa] border border-[#eeeeef] hover:border-[#b88a72] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold flex items-center justify-center font-mono">
                      BTX
                    </span>
                    <span className="font-bold text-[13px] text-[#1a1c1d]">โบท็อกซ์ริ้วรอย / กราม</span>
                  </div>
                  <span className="font-data-mono-sm text-[12px] text-[#ba1a1a] font-bold">148 คน</span>
                </div>
                <div className="text-[11px] text-[#50443e] mt-1.5 flex items-center justify-between">
                  <span>รอบมาตรฐาน: 4-6 เดือน</span>
                  <span className="text-amber-700 font-semibold">เริ่มคลายตัวแล้ว</span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-3 rounded-xl bg-[#f9f9fa] border border-[#eeeeef] hover:border-[#b88a72] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[#ffdbca] text-[#442513] text-[10px] font-bold flex items-center justify-center font-mono">
                      EBD
                    </span>
                    <span className="font-bold text-[13px] text-[#1a1c1d]">Thermage & Ulthera</span>
                  </div>
                  <span className="font-data-mono-sm text-[12px] text-[#7d5540] font-bold">54 VIPs</span>
                </div>
                <div className="text-[11px] text-[#50443e] mt-1.5 flex items-center justify-between">
                  <span>รอบมาตรฐาน: 10-12 เดือน</span>
                  <span className="text-emerald-700 font-semibold">Annual Maintenance</span>
                </div>
              </div>

              {/* Item 3 */}
              <div className="p-3 rounded-xl bg-[#f9f9fa] border border-[#eeeeef] hover:border-[#b88a72] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[#cee9d9] text-[#1a3127] text-[10px] font-bold flex items-center justify-center font-mono">
                      REV
                    </span>
                    <span className="font-bold text-[13px] text-[#1a1c1d]">Pico Laser & Rejuran</span>
                  </div>
                  <span className="font-data-mono-sm text-[12px] text-[#1a3127] font-bold">187 คน</span>
                </div>
                <div className="text-[11px] text-[#50443e] mt-1.5 flex items-center justify-between">
                  <span>รอบมาตรฐาน: 3-4 สัปดาห์</span>
                  <span className="text-[#50443e]">อยู่ในช่วงคอร์สต่อเนื่อง</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onShowToast('เปิดระบบ Auto-LINE สำเร็จ', 'ระบบจะส่งข้อความแจ้งเตือนอัตโนมัติ 09:00 น. วันพรุ่งนี้', 'success');
              }}
              className="w-full mt-4 py-2.5 bg-[#f3f3f4] hover:bg-[#b88a72] hover:text-[#442513] rounded-xl text-[12px] font-bold text-[#1a1c1d] transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#e2e2e3]"
            >
              <span className="material-symbols-outlined text-[16px]">sync_saved_locally</span>
              <span>เปิดระบบ Auto-LINE Sync ทุกเช้า</span>
            </button>
          </div>

          {/* LTV Breakdown Mini Widget */}
          <div className="bg-white p-5 rounded-2xl border border-[#eeeeef] shadow-sm">
            <h4 className="font-headline-sm text-[15px] font-bold text-[#1a1c1d] mb-3">
              สัดส่วนมูลค่าคนไข้ (Patient LTV Breakdown)
            </h4>
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background Circle */}
                  <path
                    className="text-[#eeeeef]"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Champions 68% */}
                  <path
                    className="text-[#7d5540]"
                    strokeDasharray="68, 100"
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <div className="font-mono text-[14px] font-bold text-[#1a1c1d]">68%</div>
                  <div className="text-[8px] text-[#50443e] uppercase">VIP Share</div>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 text-[11px] text-[#50443e] flex-1">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7d5540]"></span>
                    <span>VIP & Champions</span>
                  </span>
                  <span className="font-mono font-bold text-[#1a1c1d]">68% (฿24.5M)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#b88a72]"></span>
                    <span>Regular Patients</span>
                  </span>
                  <span className="font-mono font-bold text-[#1a1c1d]">22% (฿7.9M)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></span>
                    <span>At-Risk & Drift</span>
                  </span>
                  <span className="font-mono font-bold text-[#ba1a1a]">10% (฿3.6M)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Urgent Recall Action Table */}
      <div className="bg-white rounded-2xl border border-[#eeeeef] shadow-sm overflow-hidden">
        {/* Table Top Controls */}
        <div className="p-6 border-b border-[#eeeeef] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-headline-sm text-[18px] font-bold text-[#1a1c1d] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ba1a1a]">notification_important</span>
              <span>คนไข้ที่ต้องติดตามเร่งด่วน (Urgent Recall Action Table)</span>
            </h3>
            <p className="font-body-sm text-[12px] text-[#50443e] mt-0.5">
              คนไข้กลุ่มเสี่ยงสูงที่ขาดการรับบริการเกินรอบหัตถการมาตรฐาน พร้อมสคริปต์แนะนำเพื่อเปิดบทสนทนา
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Box */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#50443e] text-[18px]">
                search
              </span>
              <input
                type="text"
                placeholder="ค้นหาชื่อ, HN, เบอร์โทร..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 rounded-lg border border-[#e2e2e3] bg-[#f9f9fa] text-[13px] text-[#1a1c1d] focus:outline-none focus:ring-1 focus:ring-[#7d5540] w-60"
              />
            </div>

            {/* Urgency Filter */}
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value as any)}
              className="text-[13px] px-3 py-1.5 rounded-lg border border-[#e2e2e3] bg-[#f9f9fa] text-[#1a1c1d] focus:outline-none cursor-pointer"
            >
              <option value="all">สถานะทั้งหมด</option>
              <option value="urgent">เสี่ยงสูง (ขาด &gt;120 วัน)</option>
              <option value="warning">เกินรอบหัตถการ</option>
              <option value="booked">นัดหมายแล้ว</option>
            </select>
          </div>
        </div>

        {/* Alert Notification Banner */}
        <div className="px-6 py-3 bg-[#ffdad6]/30 border-b border-[#ffdad6]/60 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[12px] text-[#93000a]">
            <span className="material-symbols-outlined text-[18px]">priority_high</span>
            <span className="font-semibold">
              วันนี้มี 8 เคสระดับ Champions ที่ไม่มาคลินิกเกิน 120 วัน ควรให้ Medical Concierge โทรติดต่อรายบุคคล
            </span>
          </div>
          <button
            onClick={onOpenBroadcast}
            className="px-3 py-1 bg-[#ba1a1a] hover:bg-[#93000a] text-white text-[11px] font-bold rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">send</span>
            <span>บรอดแคสต์ LINE ถึงกลุ่ม At-Risk</span>
          </button>
        </div>

        {/* Patient Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9f9fa] text-[11px] uppercase tracking-wider text-[#50443e] border-b border-[#eeeeef]">
                <th className="py-3 px-6">คนไข้ (Patient)</th>
                <th className="py-3 px-4">หัตถการล่าสุด (Last Treatment)</th>
                <th className="py-3 px-4">ความสดใหม่ (Recency)</th>
                <th className="py-3 px-4">RFM Score</th>
                <th className="py-3 px-4">ยอดใช้จ่ายรวม (LTV)</th>
                <th className="py-3 px-4">สถานะการเตือน</th>
                <th className="py-3 px-6 text-right">จัดการ (Action)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eeeeef] text-[13px]">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-[#f3f3f4]/70 transition-colors">
                  {/* Patient Info */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {patient.avatarUrl ? (
                        <img
                          src={patient.avatarUrl}
                          alt={patient.name}
                          className="w-10 h-10 rounded-full object-cover ring-1 ring-[#e2e2e3]"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#f3f3f4] text-[#7d5540] font-bold flex items-center justify-center font-mono text-[13px] ring-1 ring-[#e2e2e3]">
                          {patient.initials}
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-[#1a1c1d] flex items-center gap-1.5">
                          <span>{patient.name}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                              patient.tier === 'VVIP Black' || patient.tier === 'Diamond VIP'
                                ? 'bg-[#7d5540] text-white'
                                : patient.tier === 'Doctor Colleague'
                                ? 'bg-[#dbe3f3] text-[#141c28]'
                                : 'bg-[#e2e2e3] text-[#50443e]'
                            }`}
                          >
                            {patient.tier}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#50443e] font-mono mt-0.5">
                          HN: {patient.hn} · {patient.phone}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Procedure */}
                  <td className="py-4 px-4">
                    <div className="font-semibold text-[#1a1c1d]">{patient.primaryProcedure}</div>
                    <div className="text-[11px] text-[#50443e] mt-0.5">พญ. นิศา สุวรรณรัตน์</div>
                  </td>

                  {/* Recency */}
                  <td className="py-4 px-4">
                    <div className="font-mono font-bold text-[#1a1c1d]">
                      {patient.recencyDays} วันที่แล้ว
                    </div>
                    <div className="text-[11px] text-[#50443e]">{patient.lastVisitDate}</div>
                  </td>

                  {/* RFM Score */}
                  <td className="py-4 px-4">
                    <span className="font-mono font-bold px-2 py-1 bg-[#f3f3f4] text-[#1a1c1d] rounded-md text-[12px] border border-[#e2e2e3]">
                      R:{patient.rScore} · F:{patient.fScore} · M:{patient.mScore}
                    </span>
                  </td>

                  {/* Monetary */}
                  <td className="py-4 px-4">
                    <div className="font-mono font-bold text-[#1a1c1d]">
                      ฿{patient.monetary.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-emerald-700 font-semibold">
                      {patient.visitsPerYear} ครั้ง/ปี
                    </div>
                  </td>

                  {/* Alert Status */}
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block text-[11px] px-2.5 py-1 rounded-full font-semibold ${
                        patient.riskStatus === 'urgent'
                          ? 'bg-[#ffdad6] text-[#93000a] border border-[#ffdad6]'
                          : patient.riskStatus === 'warning'
                          ? 'bg-[#ffdbca] text-[#442513]'
                          : 'bg-[#cee9d9] text-[#1a3127]'
                      }`}
                    >
                      {patient.riskLabel}
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          onShowToast('ส่งข้อความ LINE OA สำเร็จ', `ส่งการแจ้งเตือนสิทธิ์พิเศษไปยัง ${patient.name} แล้ว`, 'success');
                        }}
                        className="p-1.5 rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
                        title="ทักแชท LINE OA"
                      >
                        <span className="material-symbols-outlined text-[18px]">chat</span>
                      </button>
                      <button
                        onClick={() => onOpenQuickLog(patient)}
                        className="p-1.5 rounded-lg text-[#7d5540] bg-[#f3f3f4] hover:bg-[#e8e8e9] transition-colors cursor-pointer"
                        title="โทรบันทึกผล"
                      >
                        <span className="material-symbols-outlined text-[18px]">phone</span>
                      </button>
                      <button
                        onClick={() => onOpenQuickLog(patient)}
                        className="px-2.5 py-1 bg-[#7d5540] hover:bg-[#623e2b] text-white text-[11px] font-bold rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">calendar_add_on</span>
                        <span>นัดแพทย์</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
