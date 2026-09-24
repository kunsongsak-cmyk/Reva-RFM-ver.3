import React, { useState } from 'react';
import { PROCEDURE_LIFECYCLES, COHORT_DATA, VIP_SUITE_ROOM_IMG, DOCTOR_BOARDROOM_IMG } from '../../data/clinicData';

interface TreatmentRetentionViewProps {
  onShowToast: (title: string, desc?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  onOpenNewCampaign: () => void;
}

export const TreatmentRetentionView: React.FC<TreatmentRetentionViewProps> = ({
  onShowToast,
  onOpenNewCampaign
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [timeframe, setTimeframe] = useState('2024-2025');

  const handleDownloadPDF = () => {
    onShowToast('กำลังจัดเตรียมรายงาน PDF', 'ดาวน์โหลดเอกสาร Executive_Retention_Brief_2025.pdf เรียบร้อย', 'success');
  };

  const handleExportXLSX = () => {
    onShowToast('ส่งออก Excel สำเร็จ', 'ดาวน์โหลดตาราง Cohort_Retention_Matrix.xlsx แล้ว', 'success');
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Top Banner with Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#eeeeef] shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffdbca] text-[#442513] font-label-sm text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7d5540]"></span>
              Clinical Cohort Analytics 2025
            </span>
            <span className="font-data-mono-sm text-[11px] text-[#50443e]">Data Pipeline v2.4</span>
          </div>
          <h1 className="font-headline-lg text-[26px] font-bold text-[#1a1c1d]">
            Treatment Retention & Cohort Procedure Intelligence
          </h1>
          <p className="font-body-md text-[13px] text-[#50443e] mt-1">
            วิเคราะห์อัตราการกลับมาทำซ้ำ ระยะเวลาการคงผลลัพธ์ของแต่ละหัตถการ และความผูกพันของคนไข้ตามรุ่นที่เริ่มเข้ารับบริการ
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#e2e2e3] bg-[#f9f9fa] text-[13px] text-[#1a1c1d] focus:outline-none cursor-pointer"
          >
            <option value="all">แพทย์ผู้ทำหัตถการทั้งหมด</option>
            <option value="dr-nisa">พญ. นิศา สุวรรณรัตน์</option>
            <option value="dr-pattara">นพ. ภัทร วงศ์เจริญ</option>
            <option value="dr-chanon">นพ. ชานนท์ ฤทธิ์เดช</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#e2e2e3] bg-[#f9f9fa] text-[13px] text-[#1a1c1d] focus:outline-none cursor-pointer"
          >
            <option value="all">ทุกกลุ่มหัตถการ (All Procedures)</option>
            <option value="botox">Botulinum Toxin</option>
            <option value="filler">Filler & Biostimulator</option>
            <option value="energy">Energy-Based Devices (Ulthera/Thermage)</option>
            <option value="laser">Laser & PicoWay</option>
            <option value="booster">Skin Booster & Rejuran</option>
          </select>

          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#e2e2e3] bg-[#f9f9fa] text-[13px] text-[#1a1c1d] focus:outline-none cursor-pointer"
          >
            <option value="2024-2025">Cohort ปี 2024 - 2025</option>
            <option value="q1-2025">ไตรมาส Q1 2025</option>
            <option value="trailing-12">ย้อนหลัง 12 เดือนเต็ม</option>
          </select>
        </div>
      </div>

      {/* 4 Stat Bento Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-[#eeeeef] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-[13px] text-[#50443e]">Overall Clinic Repeat Rate</span>
            <div className="w-8 h-8 rounded-lg bg-[#cee9d9] flex items-center justify-center text-[#1a3127]">
              <span className="material-symbols-outlined text-[18px]">cached</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-data-metric text-[28px] text-[#1a1c1d] font-bold">58.4%</div>
            <div className="flex items-center gap-1 text-[12px] text-emerald-700 font-semibold mt-1">
              <span className="material-symbols-outlined text-[15px]">trending_up</span>
              <span>+4.2% YoY (Benchmark ทั่วไป 45%)</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-[#eeeeef] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-[13px] text-[#50443e]">Average Patient LTV</span>
            <div className="w-8 h-8 rounded-lg bg-[#ffdbca] flex items-center justify-center text-[#442513]">
              <span className="material-symbols-outlined text-[18px]">payments</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-data-metric text-[28px] text-[#7d5540] font-bold">฿92,400</div>
            <div className="flex items-center gap-1 text-[12px] text-[#7d5540] font-semibold mt-1">
              <span>ต่อคนไข้ Active ใน 18 เดือน (+18.5%)</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-[#eeeeef] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-[13px] text-[#50443e]">Top Retention Champion</span>
            <div className="w-8 h-8 rounded-lg bg-[#d8e0f0] flex items-center justify-center text-[#5b6371]">
              <span className="material-symbols-outlined text-[18px]">military_tech</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-headline-sm text-[20px] text-[#1a1c1d] font-bold leading-tight">
              Toxin & Skin Booster
            </div>
            <div className="flex items-center gap-1 text-[12px] text-emerald-700 font-semibold mt-1">
              <span>72.1% Repeat ใน 6 เดือน (Rejuran/Allergan)</span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl border border-[#ffdad6] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-[13px] text-[#ba1a1a] font-bold">Churn & Drift Rate</span>
            <div className="w-8 h-8 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
              <span className="material-symbols-outlined text-[18px]">trending_down</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-data-metric text-[28px] text-[#ba1a1a] font-bold">16.2%</div>
            <div className="flex items-center gap-1 text-[12px] text-emerald-700 font-semibold mt-1">
              <span>ลดลง -3.8% (จุดเสี่ยงหลักคือเดือนที่ 4-5)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section: Procedure Lifecycle Breakdown (8 cols) & Suite Ambient Spotlight (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Procedure Lifecycles: 8 cols */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-[#eeeeef] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#eeeeef]">
              <div>
                <h3 className="font-headline-sm text-[18px] font-bold text-[#1a1c1d] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#7d5540]">timeline</span>
                  <span>วงจรการคงผลลัพธ์และช่วงเวลาการทำซ้ำ (Procedure Lifecycle & Optimal Interval)</span>
                </h3>
                <p className="font-body-sm text-[12px] text-[#50443e] mt-0.5">
                  วิเคราะห์ช่วงเวลาที่ผลการรักษาเริ่มลดทอน (Efficacy Drop-off) เพื่อการส่งข้อความเตือนนัดหมายที่แม่นยำ
                </p>
              </div>
            </div>

            {/* Lifecycle Items List */}
            <div className="flex flex-col gap-5 mt-5">
              {PROCEDURE_LIFECYCLES.map((proc) => (
                <div
                  key={proc.id}
                  className="p-4 rounded-xl bg-[#f9f9fa] border border-[#eeeeef] hover:border-[#b88a72]/60 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold text-[#7d5540] bg-[#ffdbca] px-2 py-0.5 rounded">
                          {proc.code}
                        </span>
                        <h4 className="font-bold text-[14px] text-[#1a1c1d]">{proc.name}</h4>
                        <span className="text-[11px] text-[#50443e]">({proc.brands})</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[12px] font-bold text-[#1a1c1d]">
                        รอบเฉลี่ย: <span className="text-[#7d5540]">{proc.avgCycleMonths}</span>
                      </div>
                      <div className="text-[11px] text-[#50443e]">
                        Repeat: <strong className="text-emerald-700">{proc.repeatRate}</strong> · LTV: {proc.avgLtv}
                      </div>
                    </div>
                  </div>

                  {/* Multi-segment Interval Bar */}
                  <div className="mt-3">
                    <div className="w-full bg-[#eeeeef] h-3 rounded-full overflow-hidden flex">
                      <div
                        style={{ width: `${proc.optimalPercent}%` }}
                        className="bg-emerald-600 h-full"
                        title="Optimal Efficacy Period"
                      ></div>
                      <div
                        style={{ width: `${proc.recallPercent}%` }}
                        className="bg-[#7d5540] h-full"
                        title="Ideal Recall Target"
                      ></div>
                      {proc.driftPercent > 0 && (
                        <div
                          style={{ width: `${proc.driftPercent}%` }}
                          className="bg-[#ba1a1a] h-full"
                          title="Late Churn Risk"
                        ></div>
                      )}
                    </div>
                  </div>

                  {/* Interval Milestones */}
                  <div className="grid grid-cols-3 gap-2 mt-2.5 text-[11px]">
                    <div className="flex items-center gap-1 text-emerald-800">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      <span>{proc.firstOptimalMonth}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#7d5540] font-semibold text-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[#7d5540]"></span>
                      <span>{proc.peakOrRecallMonth}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#ba1a1a] justify-end">
                      <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
                      <span>{proc.driftRiskMonth}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-[#eeeeef] flex items-center justify-between text-[12px] text-[#50443e]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Optimal Efficacy
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7d5540]"></span> Peak Recall Window
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></span> High Churn Risk
              </span>
            </div>
            <button
              onClick={onOpenNewCampaign}
              className="text-[#7d5540] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>ตั้งค่า Trigger อัตโนมัติ</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Suite Spotlight & Critical Drop-off Alert (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Aesthetic Suite Card */}
          <div className="bg-white rounded-2xl border border-[#eeeeef] shadow-sm overflow-hidden flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <img
                src={VIP_SUITE_ROOM_IMG}
                alt="Aura Clinic VIP Suite 04"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-wider bg-[#7d5540] px-2 py-0.5 rounded font-bold">
                  Clinical Excellence
                </span>
                <h4 className="font-headline-sm text-[16px] font-bold mt-1">
                  ห้องหัตถการระดับพรีเมียม (Suite 04)
                </h4>
              </div>
            </div>
            <div className="p-5 flex flex-col gap-3">
              <p className="text-[12px] text-[#50443e] leading-relaxed">
                การสร้างประสบการณ์ส่วนบุคคลในห้องหัตถการชั้นนำ ส่งผลต่ออัตราการกลับมาทำซ้ำ (Repeat Rate) เพิ่มขึ้น <strong>28.4%</strong> ในคนไข้กลุ่ม Ulthera และ Thermage VIPs
              </p>
              <div className="flex items-center justify-between text-[11px] text-[#50443e] pt-2 border-t border-[#eeeeef]">
                <span>ความพึงพอใจการบริการ: <strong>99.1%</strong></span>
                <span className="text-emerald-700 font-bold">Private Ambience</span>
              </div>
            </div>
          </div>

          {/* Critical Drop-off Alert Box */}
          <div className="p-5 rounded-2xl bg-[#ffdad6]/30 border border-[#ffdad6] flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#ba1a1a]">
              <span className="material-symbols-outlined text-[20px]">crisis_alert</span>
              <h4 className="font-bold text-[14px]">
                จุดเสี่ยงคนไข้หลุดคอร์สสูงสุด: เดือนที่ 4 - 6
              </h4>
            </div>
            <p className="text-[12px] text-[#50443e] leading-relaxed">
              คนไข้กว่า <strong>64.2%</strong> ที่ไม่ได้รับการติดต่อติดตามอาการหลังทำในเดือนที่ 4 มักเปลี่ยนไปใช้บริการคลินิกอื่นเมื่อต้องการเติมโบท็อกซ์หรือฟิลเลอร์รอบใหม่
            </p>
            <button
              onClick={() => {
                onShowToast('เปิดใช้งานโปรแกรม 14-Day Touchpoint แล้ว', 'ระบบจะส่งข้อความแจ้งเตือนอัตโนมัติก่อนเข้าสู่เดือนที่ 4', 'success');
              }}
              className="w-full py-2 bg-[#ba1a1a] hover:bg-[#93000a] text-white rounded-xl text-[12px] font-bold transition-colors cursor-pointer shadow-sm"
            >
              เปิดใช้งานโปรแกรม 14-Day Touchpoint
            </button>
          </div>
        </div>
      </div>

      {/* Cohort Retention Heatmap Matrix Table */}
      <div className="bg-white rounded-2xl border border-[#eeeeef] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#eeeeef] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-headline-sm text-[18px] font-bold text-[#1a1c1d] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#7d5540]">table_chart</span>
              <span>ตารางอัตราการคงอยู่ของคนไข้ตามรุ่นที่เริ่มรับบริการ (Cohort Retention Heatmap Matrix)</span>
            </h3>
            <p className="font-body-sm text-[12px] text-[#50443e] mt-0.5">
              วิเคราะห์คนไข้ใหม่ตั้งแต่ ม.ค. 2024 - มิ.ย. 2024 ติดตามอัตราการกลับมาซื้อซ้ำตั้งแต่เดือนที่ 0 ถึงเดือนที่ 12
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportXLSX}
              className="px-3.5 py-1.5 rounded-lg bg-[#f3f3f4] hover:bg-[#e8e8e9] text-[#1a1c1d] text-[12px] font-bold transition-colors cursor-pointer flex items-center gap-1.5 border border-[#e2e2e3]"
            >
              <span className="material-symbols-outlined text-[16px]">file_download</span>
              <span>ส่งออก XLSX</span>
            </button>
          </div>
        </div>

        {/* Heatmap Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse text-[12px]">
            <thead>
              <tr className="bg-[#f9f9fa] uppercase tracking-wider text-[#50443e] text-[11px] border-b border-[#eeeeef]">
                <th className="py-3 px-6 text-left">รุ่นคนไข้ใหม่ (Cohort)</th>
                <th className="py-3 px-3">คนไข้ใหม่</th>
                <th className="py-3 px-3">M0</th>
                <th className="py-3 px-3">M1</th>
                <th className="py-3 px-3">M2</th>
                <th className="py-3 px-3">M3</th>
                <th className="py-3 px-3">M4</th>
                <th className="py-3 px-3">M5</th>
                <th className="py-3 px-3 font-bold text-[#7d5540]">M6 (Peak)</th>
                <th className="py-3 px-3">M8</th>
                <th className="py-3 px-3">M10</th>
                <th className="py-3 px-3 font-bold text-[#7d5540]">M12 (Annual)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eeeeef] font-mono">
              {COHORT_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#f3f3f4]/70 transition-colors">
                  <td className="py-3.5 px-6 text-left font-body-sm font-bold text-[#1a1c1d]">
                    {row.month}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-[#50443e]">{row.newPatients}</td>
                  <td className="py-3.5 px-3 font-bold bg-[#7d5540] text-white">{row.m0}</td>
                  <td className="py-3.5 px-3 bg-[#b88a72]/30 text-[#442513]">{row.m1}</td>
                  <td className="py-3.5 px-3 bg-[#ffdbca]/30 text-[#50443e]">{row.m2}</td>
                  <td className="py-3.5 px-3 bg-[#ffdbca]/20 text-[#50443e]">{row.m3}</td>
                  <td className="py-3.5 px-3 bg-[#eeeeef] text-[#50443e]">{row.m4}</td>
                  <td className="py-3.5 px-3 bg-[#ffdbca]/40 text-[#442513] font-semibold">{row.m5}</td>
                  <td className="py-3.5 px-3 bg-[#7d5540] text-white font-bold">{row.m6}</td>
                  <td className="py-3.5 px-3 bg-[#ffdbca]/30 text-[#50443e]">{row.m8}</td>
                  <td className="py-3.5 px-3 bg-[#b88a72]/40 text-[#442513] font-semibold">{row.m10}</td>
                  <td className="py-3.5 px-3 bg-[#7d5540] text-white font-bold">{row.m12}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Heatmap Legend Footer */}
        <div className="p-4 bg-[#f9f9fa] border-t border-[#eeeeef] flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-[#50443e] gap-2">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#1a1c1d]">ความหนาแน่น Retention:</span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-[#7d5540]"></span> &gt; 65% (Peak Retention)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-[#b88a72]"></span> 50% - 65% (Strong)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-[#ffdbca]"></span> 35% - 50% (Normal)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-[#eeeeef]"></span> &lt; 35% (Drop-off)
            </span>
          </div>
          <div>อัปเดตข้อมูลอัตโนมัติจากเวชระเบียนคลินิก</div>
        </div>
      </div>

      {/* Strategic AI Recommendations & Executive Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* AI Recommendations: 7 cols */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#eeeeef] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#7d5540] font-bold text-[15px] mb-1">
              <span className="material-symbols-outlined">auto_awesome</span>
              <span>ข้อเสนอแนะเชิงกลยุทธ์จาก AI (Clinical Director Insights)</span>
            </div>
            <p className="text-[12px] text-[#50443e] mb-4">
              ข้อสังเกตจากโมเดลวิเคราะห์ความเชื่อมโยงของผลลัพธ์หัตถการและพฤติกรรมการกลับมาทำซ้ำ
            </p>

            <div className="flex flex-col gap-3">
              {/* Insight 1 */}
              <div className="p-4 rounded-xl bg-[#cee9d9]/20 border border-[#b2cdbe] flex items-start gap-3">
                <span className="material-symbols-outlined text-emerald-700 text-[22px] mt-0.5">trending_up</span>
                <div>
                  <h5 className="font-bold text-[13px] text-[#1a3127]">
                    การข้ามสายหัตถการ (Cross-Procedure Synergy): Ulthera + Skin Booster
                  </h5>
                  <p className="text-[12px] text-[#50443e] mt-1 leading-relaxed">
                    คนไข้ที่ทำ Ulthera เมื่อได้รับการแนะนำ Skin Booster เพิ่มเติมในเดือนที่ 1-2 มีอัตรา Repeat Rate ในเดือนที่ 12 เพิ่มขึ้น <strong>3.4 เท่า</strong> เมื่อเทียบกับคนที่ทำยกกระชับเพียงอย่างเดียว
                  </p>
                </div>
              </div>

              {/* Insight 2 */}
              <div className="p-4 rounded-xl bg-[#ffdad6]/20 border border-[#ffdad6] flex items-start gap-3">
                <span className="material-symbols-outlined text-[#ba1a1a] text-[22px] mt-0.5">priority_high</span>
                <div>
                  <h5 className="font-bold text-[13px] text-[#93000a]">
                    กลุ่มฉีด Filler ครบ 12 เดือน: โอกาสการกระตุ้นมูลค่า ฿1.42M
                  </h5>
                  <p className="text-[12px] text-[#50443e] mt-1 leading-relaxed">
                    ขณะนี้มีคนไข้ 84 คนที่ฉีด Filler ครบ 12 เดือนและยังไม่ได้เข้ามาตรวจประเมินผล มีโอกาสปิดการขาย Touch-up หรือเพิ่มเติมบริเวณใหม่สูงถึง <strong>61.5%</strong> หากทักภายใน 14 วันนี้
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              onOpenNewCampaign();
              onShowToast('สร้างแคมเปญอัตโนมัติ', 'เริ่มตั้งค่าแคมเปญกระตุ้น Filler 12-Month Touch-up', 'info');
            }}
            className="w-full mt-4 py-2.5 bg-[#7d5540] hover:bg-[#623e2b] text-white rounded-xl text-[13px] font-bold transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
            <span>เปิดแคมเปญกระตุ้น Filler 12-Month Touch-up ทันที</span>
          </button>
        </div>

        {/* Executive Retention Brief Card: 5 cols */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#eeeeef] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#eeeeef]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#7d5540]">description</span>
                <h4 className="font-headline-sm text-[15px] font-bold text-[#1a1c1d]">
                  Executive Retention Brief
                </h4>
              </div>
              <span className="text-[10px] font-bold text-[#7d5540] bg-[#ffdbca] px-2 py-0.5 rounded">
                PDF Ready
              </span>
            </div>

            <div className="my-4 flex items-center gap-3 p-3 bg-[#f9f9fa] rounded-xl border border-[#eeeeef]">
              <img
                src={DOCTOR_BOARDROOM_IMG}
                alt="Medical Review"
                className="w-16 h-16 rounded-lg object-cover border border-[#e2e2e3]"
              />
              <div>
                <div className="font-bold text-[13px] text-[#1a1c1d]">
                  รายงานการประเมินคุณภาพ & ความผูกพันคนไข้
                </div>
                <div className="text-[11px] text-[#50443e] mt-0.5">
                  ลงนามรับรองโดย พญ. นิศา สุวรรณรัตน์
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-1">
                  ✓ ได้รับการรับรองตามมาตรฐาน Aesthetic Quality Board
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-[12px] text-[#50443e]">
              <div className="flex justify-between">
                <span>อัตราการรักษาฐานคนไข้ VIP:</span>
                <strong className="text-[#1a1c1d]">88.4%</strong>
              </div>
              <div className="flex justify-between">
                <span>มูลค่ารวมที่ฟื้นฟูได้ใน Q1:</span>
                <strong className="text-emerald-700">฿4,260,000</strong>
              </div>
              <div className="flex justify-between">
                <span>เป้าหมาย Cohort M6 ในรอบถัดไป:</span>
                <strong className="text-[#7d5540]">&gt; 75.0%</strong>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-4 border-t border-[#eeeeef]">
            <button
              onClick={handleDownloadPDF}
              className="flex-1 py-2.5 bg-[#f3f3f4] hover:bg-[#e8e8e9] text-[#1a1c1d] rounded-xl text-[12px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 border border-[#e2e2e3]"
            >
              <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
              <span>ดาวน์โหลด PDF</span>
            </button>
            <button
              onClick={handleExportXLSX}
              className="flex-1 py-2.5 bg-[#7d5540] hover:bg-[#623e2b] text-white rounded-xl text-[12px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">share</span>
              <span>ส่งออก XLSX</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
