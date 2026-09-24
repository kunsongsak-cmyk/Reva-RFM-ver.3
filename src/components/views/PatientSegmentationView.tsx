import React, { useState, useMemo } from 'react';
import { Patient } from '../../types/clinic';

interface PatientSegmentationViewProps {
  patients: Patient[];
  onOpenQuickLog: (patient: Patient) => void;
  onOpenNewCampaign: () => void;
  onShowToast: (title: string, desc?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const PatientSegmentationView: React.FC<PatientSegmentationViewProps> = ({
  patients,
  onOpenQuickLog,
  onOpenNewCampaign,
  onShowToast
}) => {
  const [activeSegment, setActiveSegment] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [procedureFilter, setProcedureFilter] = useState('all');
  const [spendingFilter, setSpendingFilter] = useState('all');
  const [doctorFilter, setDoctorFilter] = useState('all');
  const [selectedPatientId, setSelectedPatientId] = useState<string>(patients[0]?.id || 'p-1');

  const segmentPills = [
    { id: 'All', label: 'ทั้งหมด (All)', count: '3,842' },
    { id: 'Champions VVIP', label: 'Champions VVIP', count: '324' },
    { id: 'Loyal Patients', label: 'Loyal Patients', count: '522' },
    { id: 'Need Attention', label: 'Need Attention', count: '389' },
    { id: 'At-Risk High', label: 'At-Risk High', count: '412', isRisk: true },
    { id: 'Hibernating', label: 'Hibernating', count: '580' },
    { id: 'New Customers', label: 'New Customers', count: '815' }
  ];

  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      // Segment filter
      if (activeSegment !== 'All' && p.rfmSegment !== activeSegment) {
        return false;
      }

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.hn.toLowerCase().includes(q) ||
          p.phone.includes(q) ||
          p.primaryProcedure.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Procedure
      if (procedureFilter !== 'all') {
        if (!p.primaryProcedure.toLowerCase().includes(procedureFilter.toLowerCase())) {
          return false;
        }
      }

      // Spending
      if (spendingFilter === 'high' && p.monetary < 500000) return false;
      if (spendingFilter === 'mid' && (p.monetary < 100000 || p.monetary >= 500000)) return false;
      if (spendingFilter === 'low' && p.monetary >= 100000) return false;

      // Doctor
      if (doctorFilter !== 'all' && p.doctor !== doctorFilter) return false;

      return true;
    });
  }, [patients, activeSegment, searchQuery, procedureFilter, spendingFilter, doctorFilter]);

  const selectedPatient = useMemo(() => {
    return patients.find((p) => p.id === selectedPatientId) || patients[0];
  }, [patients, selectedPatientId]);

  const handleExportCSV = () => {
    const csvHeader = 'HN,Name,Age,Gender,Phone,Tier,RFM Segment,R,F,M,Recency Days,Monetary,Doctor,Procedure\n';
    const csvRows = filteredPatients
      .map(
        (p) =>
          `"${p.hn}","${p.name}",${p.age},"${p.gender}","${p.phone}","${p.tier}","${p.rfmSegment}",${p.rScore},${p.fScore},${p.mScore},${p.recencyDays},${p.monetary},"${p.doctor}","${p.primaryProcedure}"`
      )
      .join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Aura_Patient_Segment_${activeSegment}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('ส่งออกรายชื่อสำเร็จ', `ส่งออกรายชื่อกลุ่ม ${activeSegment} เรียบร้อยแล้ว`, 'success');
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#eeeeef] shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#d8e0f0] text-[#5b6371] font-label-sm text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#575f6d]"></span>
              RFM Segmentation
            </span>
            <span className="font-data-mono-sm text-[11px] text-[#50443e]">Data Pipeline v2.4</span>
          </div>
          <h1 className="font-headline-lg text-[26px] font-bold text-[#1a1c1d]">
            การจัดกลุ่มและวิเคราะห์คนไข้ (Patient Segmentation)
          </h1>
          <p className="font-body-md text-[13px] text-[#50443e] mt-1">
            วิเคราะห์พฤติกรรมการรักษาเพื่อการสื่อสารที่ตรงจุดและเพิ่มอัตราการรักษาต่อเนื่อง
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#f3f3f4] hover:bg-[#e8e8e9] text-[#1a1c1d] font-label-md text-[13px] transition-colors cursor-pointer border border-[#e2e2e3]/60"
          >
            <span className="material-symbols-outlined text-[#7d5540] text-[18px]">download</span>
            <span>ส่งออกรายชื่อ (Export CSV)</span>
          </button>
          <button
            onClick={onOpenNewCampaign}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7d5540] hover:bg-[#623e2b] text-white font-label-md text-[13px] font-bold shadow-sm transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">campaign</span>
            <span>+ สร้างแคมเปญใหม่</span>
          </button>
        </div>
      </div>

      {/* Segment Filter Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {segmentPills.map((pill) => {
          const isActive = activeSegment === pill.id;
          return (
            <button
              key={pill.id}
              onClick={() => setActiveSegment(pill.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#7d5540] text-white shadow-sm'
                  : 'bg-white text-[#50443e] hover:bg-[#f3f3f4] border border-[#eeeeef]'
              }`}
            >
              <span>{pill.label}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded font-mono ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : pill.isRisk
                    ? 'bg-[#ffdad6] text-[#ba1a1a] font-bold'
                    : 'bg-[#f3f3f4] text-[#50443e]'
                }`}
              >
                {pill.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#eeeeef] shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#50443e] text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="ค้นหาชื่อ, นามสกุล, เลข HN หรือเบอร์โทรศัพท์..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#e2e2e3] bg-[#f9f9fa] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#7d5540]"
          />
        </div>

        {/* Procedure Dropdown */}
        <select
          value={procedureFilter}
          onChange={(e) => setProcedureFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-[#e2e2e3] bg-[#f9f9fa] text-[13px] text-[#1a1c1d] focus:outline-none cursor-pointer"
        >
          <option value="all">หัตถการล่าสุดทั้งหมด</option>
          <option value="Botox">Botox & ปรับรูปหน้า</option>
          <option value="Filler">Filler & Sculptra</option>
          <option value="Ulthera">Ulthera & Lifting</option>
          <option value="Pico">PicoWay Laser</option>
          <option value="Rejuran">Rejuran Healer</option>
        </select>

        {/* Spending Dropdown */}
        <select
          value={spendingFilter}
          onChange={(e) => setSpendingFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-[#e2e2e3] bg-[#f9f9fa] text-[13px] text-[#1a1c1d] focus:outline-none cursor-pointer"
        >
          <option value="all">ระดับยอดใช้จ่ายทั้งหมด</option>
          <option value="high">มากกว่า ฿500,000 (VVIP)</option>
          <option value="mid">฿100,000 - ฿500,000</option>
          <option value="low">ต่ำกว่า ฿100,000</option>
        </select>

        {/* Doctor Dropdown */}
        <select
          value={doctorFilter}
          onChange={(e) => setDoctorFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-[#e2e2e3] bg-[#f9f9fa] text-[13px] text-[#1a1c1d] focus:outline-none cursor-pointer"
        >
          <option value="all">แพทย์ผู้ดูแลทั้งหมด</option>
          <option value="พญ. นิศา สุวรรณรัตน์">พญ. นิศา สุวรรณรัตน์</option>
          <option value="นพ. ภัทร วงศ์เจริญ">นพ. ภัทร วงศ์เจริญ</option>
          <option value="นพ. ชานนท์ ฤทธิ์เดช">นพ. ชานนท์ ฤทธิ์เดช</option>
        </select>
      </div>

      {/* 3 Summary Value Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#eeeeef] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-[13px] text-[#50443e]">สัดส่วนมูลค่าตาม RFM</span>
            <span className="material-symbols-outlined text-[#7d5540] text-[18px]">pie_chart</span>
          </div>
          <div className="font-data-metric text-[26px] text-[#1a1c1d] font-bold mt-2">68.4%</div>
          <p className="font-body-sm text-[12px] text-[#50443e] mt-1">
            ของรายได้ทั้งหมดมาจากกลุ่ม Champions & Loyal (Pareto 80/20)
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#eeeeef] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-[13px] text-[#50443e]">ช่องว่างระยะเวลา (Recency Gap)</span>
            <span className="material-symbols-outlined text-[#575f6d] text-[18px]">timelapse</span>
          </div>
          <div className="font-data-metric text-[26px] text-[#1a1c1d] font-bold mt-2">
            68 วัน <span className="text-[14px] text-[#50443e] font-normal">vs 184 วัน</span>
          </div>
          <p className="font-body-sm text-[12px] text-[#50443e] mt-1">
            ระยะห่างเฉลี่ยคนไข้ประจำ เทียบกับกลุ่ม At-Risk ที่ขาดการติดต่อ
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#ffdad6] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-[13px] text-[#ba1a1a] font-bold">หัตถการค้างรอบด่วน</span>
            <span className="material-symbols-outlined text-[#ba1a1a] text-[18px]">warning</span>
          </div>
          <div className="font-data-metric text-[26px] text-[#ba1a1a] font-bold mt-2">148 คอร์ส</div>
          <p className="font-body-sm text-[12px] text-[#93000a] mt-1">
            คอร์สคงเหลือที่ใกล้หมดอายุใน 30 วัน (มูลค่ารวม ~฿3.1M)
          </p>
        </div>
      </div>

      {/* Main Grid: Patient Table (8 cols) + Side Quick Drawer (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table: 8 cols */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#eeeeef] shadow-sm overflow-hidden flex flex-col justify-between">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f9f9fa] text-[11px] uppercase tracking-wider text-[#50443e] border-b border-[#eeeeef]">
                  <th className="py-3 px-6">ข้อมูลคนไข้ (Patient Profile)</th>
                  <th className="py-3 px-4">กลุ่ม RFM</th>
                  <th className="py-3 px-4">หัตถการหลัก</th>
                  <th className="py-3 px-4">Recency</th>
                  <th className="py-3 px-6 text-right">ยอดใช้จ่ายรวม</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eeeeef] text-[13px]">
                {filteredPatients.map((patient) => {
                  const isSelected = patient.id === selectedPatient?.id;
                  return (
                    <tr
                      key={patient.id}
                      onClick={() => setSelectedPatientId(patient.id)}
                      className={`cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#ffdbca]/25 border-l-4 border-[#7d5540]'
                          : 'hover:bg-[#f3f3f4]/80'
                      }`}
                    >
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          {patient.avatarUrl ? (
                            <img
                              src={patient.avatarUrl}
                              alt={patient.name}
                              className="w-9 h-9 rounded-full object-cover ring-1 ring-[#e2e2e3]"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-[#f3f3f4] text-[#7d5540] font-bold flex items-center justify-center font-mono text-[12px] ring-1 ring-[#e2e2e3]">
                              {patient.initials}
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-[#1a1c1d] flex items-center gap-1.5">
                              <span>{patient.name}</span>
                              <span className="text-[11px] text-[#50443e] font-normal">
                                ({patient.age} ปี, {patient.gender})
                              </span>
                            </div>
                            <div className="text-[11px] text-[#50443e] font-mono mt-0.5">
                              HN: {patient.hn} · {patient.phone}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                            patient.rfmSegment === 'Champions VVIP'
                              ? 'bg-[#7d5540] text-white'
                              : patient.rfmSegment === 'At-Risk High'
                              ? 'bg-[#ffdad6] text-[#ba1a1a]'
                              : patient.rfmSegment === 'Need Attention'
                              ? 'bg-[#ffdbca] text-[#442513]'
                              : 'bg-[#d8e0f0] text-[#5b6371]'
                          }`}
                        >
                          {patient.rfmSegment}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#1a1c1d]">{patient.primaryProcedure}</div>
                        <div className="text-[11px] text-[#50443e]">{patient.doctor}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-mono font-bold text-[#1a1c1d]">{patient.recencyDays} วัน</div>
                        <div className="text-[11px] text-[#50443e]">{patient.lastVisitDate}</div>
                      </td>

                      <td className="py-3.5 px-6 text-right">
                        <div className="font-mono font-bold text-[#1a1c1d]">
                          ฿{patient.monetary.toLocaleString()}
                        </div>
                        <div className="text-[11px] text-emerald-700 font-semibold">
                          {patient.visitsPerYear} ครั้ง/ปี
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-[#eeeeef] bg-[#f9f9fa] flex items-center justify-between text-[12px] text-[#50443e]">
            <span>แสดง {filteredPatients.length} คนไข้ (คลิกแถวเพื่อดูรายละเอียดเชิงลึก)</span>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-[#7d5540]">เลือกคนไข้: {selectedPatient?.name}</span>
            </div>
          </div>
        </div>

        {/* Side Quick Drawer: 4 cols */}
        {selectedPatient && (
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#eeeeef] shadow-sm p-6 flex flex-col justify-between animate-in fade-in duration-200">
            <div>
              {/* Header profile */}
              <div className="flex items-start justify-between pb-4 border-b border-[#eeeeef]">
                <div className="flex items-center gap-3">
                  {selectedPatient.avatarUrl ? (
                    <img
                      src={selectedPatient.avatarUrl}
                      alt={selectedPatient.name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-[#b88a72]/40 shadow-sm"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-[#f3f3f4] text-[#7d5540] font-bold flex items-center justify-center font-mono text-[18px] ring-2 ring-[#b88a72]/40">
                      {selectedPatient.initials}
                    </div>
                  )}
                  <div>
                    <h4 className="font-headline-sm text-[16px] font-bold text-[#1a1c1d]">
                      {selectedPatient.name}
                    </h4>
                    <div className="text-[12px] text-[#50443e] font-mono mt-0.5">
                      HN: {selectedPatient.hn} · {selectedPatient.phone}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[10px] bg-[#7d5540] text-white px-2 py-0.5 rounded font-semibold">
                        {selectedPatient.tier}
                      </span>
                      <span className="text-[10px] text-[#50443e]">
                        {selectedPatient.age} ปี ({selectedPatient.gender})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RFM Score Detail Breakdown */}
              <div className="my-4 p-4 rounded-xl bg-[#f9f9fa] border border-[#eeeeef]">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#50443e] mb-2.5">
                  คะแนน RFM Score Breakdown
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-white rounded-lg border border-[#e2e2e3]">
                    <div className="text-[10px] text-[#50443e]">Recency</div>
                    <div className="font-mono text-[16px] font-bold text-[#7d5540]">
                      {selectedPatient.rScore}/5
                    </div>
                    <div className="text-[9px] text-[#50443e]">{selectedPatient.recencyDays} วัน</div>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#e2e2e3]">
                    <div className="text-[10px] text-[#50443e]">Frequency</div>
                    <div className="font-mono text-[16px] font-bold text-[#7d5540]">
                      {selectedPatient.fScore}/5
                    </div>
                    <div className="text-[9px] text-[#50443e]">{selectedPatient.visitsPerYear} ครั้ง</div>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#e2e2e3]">
                    <div className="text-[10px] text-[#50443e]">Monetary</div>
                    <div className="font-mono text-[16px] font-bold text-[#7d5540]">
                      {selectedPatient.mScore}/5
                    </div>
                    <div className="text-[9px] text-[#50443e]">฿{(selectedPatient.monetary / 1000).toFixed(0)}k</div>
                  </div>
                </div>
              </div>

              {/* Doctor Notes & Clinical Timeline */}
              <div className="mb-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#50443e] mb-1.5 flex items-center justify-between">
                  <span>บันทึกความเห็นทางคลินิก (Clinical Notes)</span>
                  <span className="text-[10px] text-[#7d5540]">{selectedPatient.doctor}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#ffdbca]/20 border border-[#b88a72]/30 text-[12px] text-[#442513] leading-relaxed">
                  {selectedPatient.treatmentNotes || 'ไม่มีบันทึกเพิ่มเติมในรอบนี้'}
                </div>
              </div>

              {/* Expiring Course Alert if any */}
              {selectedPatient.expiringCourse && (
                <div className="mb-4 p-3 rounded-xl bg-[#ffdad6]/40 border border-[#ffdad6] text-[12px]">
                  <div className="flex items-center justify-between text-[#ba1a1a] font-bold">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">alarm</span>
                      <span>คอร์สคงเหลือที่ใกล้หมดอายุ</span>
                    </span>
                    <span>{selectedPatient.expiringCourse.expiryDate}</span>
                  </div>
                  <div className="text-[#1a1c1d] font-semibold mt-1">
                    {selectedPatient.expiringCourse.name}
                  </div>
                  <div className="text-[11px] text-[#50443e] mt-0.5">
                    คงเหลือ {selectedPatient.expiringCourse.remaining} จาก {selectedPatient.expiringCourse.total} ครั้ง
                  </div>
                </div>
              )}
            </div>

            {/* Action Suite Buttons */}
            <div className="flex flex-col gap-2 pt-4 border-t border-[#eeeeef]">
              <button
                onClick={() => {
                  onShowToast('ส่งข้อความ LINE OA สำเร็จ', `ส่งเทมเพลตเสนอต่อคอร์สไปยัง ${selectedPatient.name} เรียบร้อย`, 'success');
                }}
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-[13px] font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>ส่งข้อความ LINE Official Account</span>
              </button>

              <button
                onClick={() => onOpenQuickLog(selectedPatient)}
                className="w-full py-2.5 bg-[#7d5540] hover:bg-[#623e2b] text-white rounded-xl text-[13px] font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">phone</span>
                <span>โทรประสานงาน & บันทึกผล</span>
              </button>

              <button
                onClick={() => onOpenQuickLog(selectedPatient)}
                className="w-full py-2 bg-[#f3f3f4] hover:bg-[#e8e8e9] text-[#1a1c1d] rounded-xl text-[12px] font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                <span>นัดหมายพบแพทย์ พญ. นิศา</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
