import React, { useState } from 'react';
import { ActiveTab, Patient, OutreachQueueItem } from './types/clinic';
import { INITIAL_PATIENTS, INITIAL_QUEUE_ITEMS } from './data/clinicData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { RfmOverviewView } from './components/views/RfmOverviewView';
import { PatientSegmentationView } from './components/views/PatientSegmentationView';
import { RecallCampaignsView } from './components/views/RecallCampaignsView';
import { TreatmentRetentionView } from './components/views/TreatmentRetentionView';
import { QuickLogModal } from './components/modals/QuickLogModal';
import { NewCampaignModal } from './components/modals/NewCampaignModal';
import { BroadcastModal } from './components/modals/BroadcastModal';
import { DoctorProfileModal } from './components/modals/DoctorProfileModal';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('rfm-dashboard');
  const [currentBranch, setCurrentBranch] = useState('สาขาทองหล่อ (Thonglor Flagship)');
  const [currentTimeframe, setCurrentTimeframe] = useState('30 วันล่าสุด (Recent 30 Days)');

  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [queueItems, setQueueItems] = useState<OutreachQueueItem[]>(INITIAL_QUEUE_ITEMS);

  // Modal states
  const [isQuickLogOpen, setIsQuickLogOpen] = useState(false);
  const [selectedPatientForLog, setSelectedPatientForLog] = useState<{
    name: string;
    procedure: string;
    phone: string;
    patientId?: string;
    queueItemId?: string;
  } | null>(null);

  const [isNewCampaignOpen, setIsNewCampaignOpen] = useState(false);
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [isDoctorProfileOpen, setIsDoctorProfileOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (
    title: string,
    desc?: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'success'
  ) => {
    const newToast: ToastMessage = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      desc,
      type
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Handlers
  const handleOpenPatientQuickLog = (patient: Patient) => {
    setSelectedPatientForLog({
      name: patient.name,
      procedure: patient.primaryProcedure,
      phone: patient.phone,
      patientId: patient.id
    });
    setIsQuickLogOpen(true);
  };

  const handleOpenQueueQuickLog = (item: OutreachQueueItem) => {
    setSelectedPatientForLog({
      name: item.name,
      procedure: item.procedure,
      phone: item.phone,
      queueItemId: item.id
    });
    setIsQuickLogOpen(true);
  };

  const handleSaveQuickLog = (result: {
    status: 'booked' | 'declined' | 'pending' | 'line';
    note: string;
    scheduledDate?: string;
  }) => {
    if (selectedPatientForLog?.queueItemId) {
      setQueueItems((prev) =>
        prev.map((item) => {
          if (item.id === selectedPatientForLog.queueItemId) {
            return {
              ...item,
              status: result.status,
              completedNote: result.note,
              scheduledDate: result.scheduledDate,
              loggedBy: 'พญ. นิศา'
            };
          }
          return item;
        })
      );
    }

    if (selectedPatientForLog?.patientId) {
      setPatients((prev) =>
        prev.map((p) => {
          if (p.id === selectedPatientForLog.patientId) {
            return {
              ...p,
              riskStatus: result.status === 'booked' ? 'booked' : p.riskStatus,
              riskLabel: result.status === 'booked' ? 'นัดหมายสำเร็จ' : p.riskLabel,
              lastContactStatus: result.note
            };
          }
          return p;
        })
      );
    }

    showToast(
      result.status === 'booked' ? 'บันทึกการนัดหมายสำเร็จ' : 'บันทึกประวัติการติดต่อเรียบร้อย',
      `ผลการประสานงานกับ ${selectedPatientForLog?.name} ถูกบันทึกเข้าเวชระเบียนเรียบร้อยแล้ว`,
      'success'
    );
  };

  const handleUpdateQueueStatus = (
    id: string,
    status: 'pending' | 'line' | 'booked' | 'declined',
    note?: string
  ) => {
    setQueueItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status,
            completedNote: note || item.completedNote,
            loggedBy: note ? 'ทีมประสานงาน' : item.loggedBy
          };
        }
        return item;
      })
    );
  };

  const handleCampaignCreated = (name: string, targetCount: number) => {
    showToast(
      'เปิดใช้งานแคมเปญสำเร็จ',
      `แคมเปญ "${name}" กำลังทยอยส่งข้อความและจัดคิวติดต่อคนไข้ ${targetCount} ราย`,
      'success'
    );
  };

  const handleBroadcastSent = (count: number) => {
    showToast(
      'บรอดแคสต์ LINE สำเร็จ',
      `ส่งข้อความพร้อมสิทธิ์ Privilege Touch-up 15% ไปยังคนไข้กลุ่มเป้าหมาย ${count} รายเรียบร้อย`,
      'success'
    );
  };

  const handleRefreshIntelligence = () => {
    showToast(
      'RFM Intelligence อัปเดตล่าสุด',
      'คำนวณคะแนนความสดใหม่ (Recency) ความถี่ (Frequency) และมูลค่า (Monetary) ตามรอบ POS & CRM เรียบร้อย',
      'info'
    );
  };

  return (
    <div className="min-h-screen bg-[#f9f9fa] text-[#1a1c1d] flex">
      {/* Fixed Left Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onRefreshIntelligence={handleRefreshIntelligence}
      />

      {/* Top Application Header */}
      <Header
        currentBranch={currentBranch}
        onBranchChange={(branch) => {
          setCurrentBranch(branch);
          showToast('สลับสาขาสำเร็จ', `เปลี่ยนการแสดงผลข้อมูลเป็น ${branch}`, 'info');
        }}
        currentTimeframe={currentTimeframe}
        onTimeframeChange={(tf) => {
          setCurrentTimeframe(tf);
          showToast('เปลี่ยนช่วงเวลาการวิเคราะห์', `อัปเดตมุมมองเป็น ${tf}`, 'info');
        }}
        onDoctorClick={() => setIsDoctorProfileOpen(true)}
      />

      {/* Main Viewport Content */}
      <main className="ml-72 pt-20 px-8 w-full max-w-[1700px] min-h-screen">
        {activeTab === 'rfm-dashboard' && (
          <RfmOverviewView
            patients={patients}
            onOpenQuickLog={handleOpenPatientQuickLog}
            onOpenBroadcast={() => setIsBroadcastOpen(true)}
            onNavigateToSegments={() => {
              setActiveTab('patient-segments');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'patient-segments' && (
          <PatientSegmentationView
            patients={patients}
            onOpenQuickLog={handleOpenPatientQuickLog}
            onOpenNewCampaign={() => setIsNewCampaignOpen(true)}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'recall-campaigns' && (
          <RecallCampaignsView
            queueItems={queueItems}
            onOpenQuickLogModal={handleOpenQueueQuickLog}
            onOpenNewCampaign={() => setIsNewCampaignOpen(true)}
            onOpenBroadcast={() => setIsBroadcastOpen(true)}
            onShowToast={showToast}
            onUpdateQueueItemStatus={handleUpdateQueueStatus}
          />
        )}

        {activeTab === 'treatment-retention' && (
          <TreatmentRetentionView
            onShowToast={showToast}
            onOpenNewCampaign={() => setIsNewCampaignOpen(true)}
          />
        )}
      </main>

      {/* Interactive Modals */}
      {selectedPatientForLog && (
        <QuickLogModal
          isOpen={isQuickLogOpen}
          onClose={() => {
            setIsQuickLogOpen(false);
            setSelectedPatientForLog(null);
          }}
          patientName={selectedPatientForLog.name}
          procedure={selectedPatientForLog.procedure}
          phone={selectedPatientForLog.phone}
          onSave={handleSaveQuickLog}
        />
      )}

      <NewCampaignModal
        isOpen={isNewCampaignOpen}
        onClose={() => setIsNewCampaignOpen(false)}
        onCreated={handleCampaignCreated}
      />

      <BroadcastModal
        isOpen={isBroadcastOpen}
        onClose={() => setIsBroadcastOpen(false)}
        onBroadcastSent={handleBroadcastSent}
      />

      <DoctorProfileModal
        isOpen={isDoctorProfileOpen}
        onClose={() => setIsDoctorProfileOpen(false)}
        onSelectSchedule={() => {
          setActiveTab('recall-campaigns');
          showToast('ตารางนัดหมาย พญ. นิศา', 'นำทางไปยังศูนย์ติดตามคนไข้และคิวตรวจ', 'info');
        }}
      />

      {/* Global Floating Toast Feedback */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
