export interface TimelineEvent {
  stage: 'Submitted' | 'Under Review' | 'Action Taken' | 'Closed';
  timestamp: string;
  note: string;
}

export interface EvidenceFile {
  name: string;
  size: string;
  type: string;
}

export interface Complaint {
  id: string;
  type: string;
  datetime: string;
  location: string;
  description: string;
  peopleInvolved?: string;
  witnessDetails?: string;
  severity: 'Low' | 'Medium' | 'High';
  anonymous: boolean;
  status: 'Submitted' | 'Under Review' | 'Action Taken' | 'Closed';
  estimatedResponse: string;
  assignedOfficer?: string;
  timeline: TimelineEvent[];
  evidenceFiles: EvidenceFile[];
}

export const mockComplaints: Record<string, Complaint> = {
  'CS-2026-00482': {
    id: 'CS-2026-00482',
    type: 'Bullying',
    datetime: '2026-05-20T10:30',
    location: 'Classroom',
    description: 'Repeated verbal harassment and exclusionary behavior during group projects in the Main Block, Room 302.',
    severity: 'Medium',
    anonymous: true,
    status: 'Under Review',
    estimatedResponse: '12 - 24 Hours',
    assignedOfficer: 'Officer Sarah Jenkins (Campus Anti-Bullying Squad)',
    timeline: [
      {
        stage: 'Submitted',
        timestamp: '2026-05-20T10:32',
        note: 'Complaint filed anonymously. Encryption keys assigned and identity hashes secured.'
      },
      {
        stage: 'Under Review',
        timestamp: '2026-05-21T09:15',
        note: 'Case assigned to Campus Anti-Bullying Squad. Investigator reviewing classroom seating logs.'
      }
    ],
    evidenceFiles: [
      { name: 'incident_audio_rec.mp3', size: '2.4 MB', type: 'audio/mpeg' }
    ]
  },
  'CS-2026-09123': {
    id: 'CS-2026-09123',
    type: 'Threat/Violence',
    datetime: '2026-05-18T22:15',
    location: 'Hostel',
    description: 'Suspicious individual spotted loitering around the Block C girls hostel back entrance, attempting to force open the emergency fire exit.',
    severity: 'High',
    anonymous: false,
    peopleInvolved: 'Unknown male, approx 6ft tall in dark grey hoodie',
    witnessDetails: 'Hostel guard was doing rounds on the opposite side.',
    status: 'Action Taken',
    estimatedResponse: 'Resolved',
    assignedOfficer: 'Chief Marcus Vance (Campus Security)',
    timeline: [
      {
        stage: 'Submitted',
        timestamp: '2026-05-18T22:20',
        note: 'Emergency report received from verified student account.'
      },
      {
        stage: 'Under Review',
        timestamp: '2026-05-18T22:25',
        note: 'Emergency dispatch sent to Block C Hostel. CCTV footage from corridor cameras pulled for inspection.'
      },
      {
        stage: 'Action Taken',
        timestamp: '2026-05-19T08:00',
        note: 'Security patrols increased around Block C. Locks upgraded and external lighting reinforced. Suspect identified as non-campus resident and handed over to local authorities.'
      }
    ],
    evidenceFiles: [
      { name: 'cctv_screenshot_2215.jpg', size: '850 KB', type: 'image/jpeg' },
      { name: 'hostel_report_details.pdf', size: '120 KB', type: 'application/pdf' }
    ]
  },
  'CS-2026-00112': {
    id: 'CS-2026-00112',
    type: 'Ragging',
    datetime: '2026-05-15T16:00',
    location: 'Canteen',
    description: 'Group of senior students demanding freshman students perform humiliating physical exercises in the main dining hall during evening tea break.',
    severity: 'High',
    anonymous: true,
    status: 'Closed',
    estimatedResponse: 'Resolved',
    assignedOfficer: 'Dean of Student Welfare Committee',
    timeline: [
      {
        stage: 'Submitted',
        timestamp: '2026-05-15T16:15',
        note: 'Anonymous report submitted.'
      },
      {
        stage: 'Under Review',
        timestamp: '2026-05-16T10:00',
        note: "Dean's office initiated an official inquiry. Canteen staff and bystander students questioned under strict privacy guards."
      },
      {
        stage: 'Action Taken',
        timestamp: '2026-05-17T14:30',
        note: 'Three senior students suspended for 2 weeks and barred from the Canteen. Parents officially notified. Strict anti-ragging affidavit renewed.'
      },
      {
        stage: 'Closed',
        timestamp: '2026-05-18T12:00',
        note: 'Resolution confirmed by student welfare board. Case officially closed and archived.'
      }
    ],
    evidenceFiles: []
  }
};
