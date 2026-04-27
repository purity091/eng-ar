export const adminDashboardStats = [
    { id: 'students', value: '12,450', delta: '+12%', tone: 'sky' },
    { id: 'books', value: '840', delta: '+5%', tone: 'emerald' },
    { id: 'views', value: '45.2K', delta: '+24%', tone: 'violet' },
    { id: 'reports', value: '3', delta: '-2', tone: 'amber' },
];

export const adminPlatformHealth = [
    { id: 'attendance', value: '92%', trend: '+4%', status: 'healthy' },
    { id: 'utilization', value: '78%', trend: '+9%', status: 'monitor' },
    { id: 'reviews', value: '14', trend: '4 urgent', status: 'urgent' },
    { id: 'renewals', value: '87%', trend: '+6%', status: 'healthy' },
];

export const adminActivityFeed = [
    { id: 'a1', title: 'New student enrolled', detail: 'Ahmed Mohammed joined Grade 4 in the progress term.', time: '2m' },
    { id: 'a2', title: 'Teacher availability updated', detail: 'Emma Carter opened 3 extra slots for Tuesday evening.', time: '18m' },
    { id: 'a3', title: 'Renewal risk escalated', detail: 'Two families dropped below the retention confidence threshold.', time: '42m' },
    { id: 'a4', title: 'Curriculum unit approved', detail: 'Animals Listening Pack moved to ready-for-release.', time: '1h' },
];

export const adminActionCards = [
    { id: 'curriculum', tone: 'sky' },
    { id: 'schedule', tone: 'violet' },
    { id: 'subscriptions', tone: 'amber' },
    { id: 'snapshot', tone: 'slate' },
];

export const adminReviewQueue = [
    { id: 'q1', title: 'Teacher overload risk', detail: 'Emma Carter exceeded the recommended load for KG sessions.', priority: 'urgent' },
    { id: 'q2', title: 'At-risk renewals', detail: '5 subscriptions need manual outreach before next billing.', priority: 'monitor' },
    { id: 'q3', title: 'Curriculum release review', detail: '2 units are waiting for QA sign-off and publishing.', priority: 'healthy' },
];

export const adminStudentRecords = [
    { id: 'st-1', name: 'Omar Fahd', country: 'UAE', age: 7, grade: 'Grade 2', level: 'Pre-A1', plan: 'Progress', attendance: 92, engagement: 74, renewal: 88, owner: 'Emma', status: 'healthy' },
    { id: 'st-2', name: 'Sara Ahmed', country: 'Saudi Arabia', age: 8, grade: 'Grade 3', level: 'A1', plan: 'Progress', attendance: 85, engagement: 68, renewal: 61, owner: 'James', status: 'watch' },
    { id: 'st-3', name: 'Layan Khalid', country: 'Saudi Arabia', age: 6, grade: 'Grade 1', level: 'A1', plan: 'Foundation', attendance: 97, engagement: 89, renewal: 94, owner: 'Emma', status: 'growth' },
    { id: 'st-4', name: 'Zayn Ali', country: 'Qatar', age: 9, grade: 'Grade 4', level: 'A2', plan: 'Mastery', attendance: 73, engagement: 58, renewal: 44, owner: 'Nora', status: 'risk' },
    { id: 'st-5', name: 'Maya Noor', country: 'Kuwait', age: 10, grade: 'Grade 5', level: 'A2', plan: 'Mastery', attendance: 95, engagement: 83, renewal: 91, owner: 'James', status: 'healthy' },
];

export const adminTeacherRecords = [
    { id: 'tc-1', name: 'Emma Carter', accent: 'British', specialty: 'KG phonics and confidence', capacity: 8, booked: 7, qaScore: 96, load: 88, focus: 'Reduce back-to-back KG blocks', nextReview: 'Tue 4:00 PM', status: 'full' },
    { id: 'tc-2', name: 'James Lee', accent: 'American', specialty: 'Grades 1-3 speaking', capacity: 7, booked: 5, qaScore: 92, load: 71, focus: 'Strong retention outcomes', nextReview: 'Wed 6:30 PM', status: 'balanced' },
    { id: 'tc-3', name: 'Nora Blake', accent: 'British', specialty: 'Reading and vocabulary', capacity: 6, booked: 3, qaScore: 89, load: 50, focus: 'Can absorb 2 additional evening slots', nextReview: 'Thu 5:15 PM', status: 'light' },
];

export const adminScheduleDays = [
    { day: 'Sunday', sessions: 7, capacity: 10, peak: '4:00 PM - 6:00 PM', status: 'healthy' },
    { day: 'Monday', sessions: 9, capacity: 10, peak: '5:00 PM - 7:00 PM', status: 'overloaded' },
    { day: 'Tuesday', sessions: 8, capacity: 10, peak: '4:00 PM - 6:30 PM', status: 'healthy' },
    { day: 'Wednesday', sessions: 6, capacity: 10, peak: '3:30 PM - 5:30 PM', status: 'healthy' },
    { day: 'Thursday', sessions: 5, capacity: 10, peak: '4:00 PM - 5:00 PM', status: 'healthy' },
];

export const adminScheduleMoves = [
    'Move 2 Grade 1 group sessions from Monday to Wednesday.',
    'Unlock Nora Blake for one extra Tuesday evening block.',
    'Pause new KG assignments on Monday until load is normalized.',
];

export const adminCurriculumTracks = [
    { id: 'cr-1', level: 'KG2', title: 'Phonics Foundations', units: 12, coverage: '82%', owner: 'Learning Design', updatedAt: '2 days ago', status: 'Active', sentence: 'I can hear the sound', targetWords: ['cat', 'dog', 'sun'], skills: ['Phonics', 'Listening', 'Repetition'] },
    { id: 'cr-2', level: 'Grade 2', title: 'Animals and School Life', units: 18, coverage: '76%', owner: 'Primary Team', updatedAt: 'Today', status: 'Review', sentence: 'I can see a bird', targetWords: ['bird', 'school', 'bag'], skills: ['Speaking', 'Vocabulary', 'Listening'] },
    { id: 'cr-3', level: 'Grade 5', title: 'Reading for Meaning', units: 10, coverage: '91%', owner: 'Upper Primary', updatedAt: '5 days ago', status: 'Published', sentence: 'I can explain the story', targetWords: ['character', 'setting', 'problem'], skills: ['Reading', 'Comprehension', 'Discussion'] },
];

export const adminReleaseQueue = [
    { id: 'rl-1', name: 'Animals Listening Pack', owner: 'Primary Team', status: 'Ready for QA' },
    { id: 'rl-2', name: 'KG Sound Drill Cards', owner: 'Learning Design', status: 'Awaiting Assets' },
    { id: 'rl-3', name: 'Reading Fluency Challenge', owner: 'Upper Primary', status: 'Publish Today' },
];

export const adminSubscriptionRecords = [
    { id: 'sb-1', student: 'Omar Fahd', packageName: 'Progress Term', growthScore: '74 / 100', attendance: '90%', renewalProbability: '88%', nextBilling: '15 Mar 2026', status: 'healthy' },
    { id: 'sb-2', student: 'Layan Khalid', packageName: 'Foundation Term', growthScore: '58 / 100', attendance: '65%', renewalProbability: '46%', nextBilling: '11 Mar 2026', status: 'risk' },
    { id: 'sb-3', student: 'Sara Ahmed', packageName: 'Progress Term', growthScore: '83 / 100', attendance: '95%', renewalProbability: '92%', nextBilling: '28 Mar 2026', status: 'healthy' },
    { id: 'sb-4', student: 'Zayn Ali', packageName: 'Mastery Term', growthScore: '67 / 100', attendance: '72%', renewalProbability: '54%', nextBilling: '21 Mar 2026', status: 'watch' },
];

export const adminSubscriptionFunnel = [
    { id: 'active', value: '1,284', delta: '+8%', tone: 'emerald' },
    { id: 'likelyRenew', value: '87%', delta: '+6%', tone: 'sky' },
    { id: 'revenueRisk', value: 'SAR 48K', delta: '5 accounts', tone: 'amber' },
];

export const adminUserRecords = [
    { id: 'u-1', name: 'Mona Rashid', email: 'mona@readmint.com', role: 'Country Admin', scope: 'Saudi Arabia / All stages', status: 'active', lastActive: '12m ago' },
    { id: 'u-2', name: 'Adel Nasser', email: 'adel@readmint.com', role: 'Academic Admin', scope: 'UAE / Primary', status: 'active', lastActive: '1h ago' },
    { id: 'u-3', name: 'Rana Youssef', email: 'rana@readmint.com', role: 'Moderator', scope: 'Global / Community', status: 'pending', lastActive: 'Yesterday' },
    { id: 'u-4', name: 'Tariq Salem', email: 'tariq@readmint.com', role: 'Teacher', scope: 'Saudi Arabia / KG', status: 'suspended', lastActive: '3d ago' },
];

export const adminContentLibrary = [
    { id: 'cnt-1', title: 'Animals Starter Pack', type: 'Book', subject: 'Vocabulary', grade: 'Grade 1', country: 'Saudi Arabia', owner: 'Primary Team', status: 'Published', updatedAt: 'Today' },
    { id: 'cnt-2', title: 'School Objects Listening', type: 'Lesson', subject: 'Listening', grade: 'Grade 2', country: 'UAE', owner: 'Emma Carter', status: 'Review', updatedAt: '2h ago' },
    { id: 'cnt-3', title: 'Phonics Drill Cards', type: 'Resource', subject: 'Phonics', grade: 'KG2', country: 'Saudi Arabia', owner: 'Learning Design', status: 'Draft', updatedAt: '1d ago' },
    { id: 'cnt-4', title: 'Reading Fluency Challenge', type: 'Lesson', subject: 'Reading', grade: 'Grade 5', country: 'Qatar', owner: 'Upper Primary', status: 'Published', updatedAt: '4d ago' },
];

export const adminReviewItems = [
    { id: 'rv-1', title: 'My School Bag Revision', author: 'Emma Carter', type: 'Lesson', country: 'Saudi Arabia', grade: 'Grade 2', submittedAt: '18m ago', priority: 'urgent' },
    { id: 'rv-2', title: 'Phonics Warm-Up Board', author: 'Learning Design', type: 'Resource', country: 'UAE', grade: 'KG2', submittedAt: '2h ago', priority: 'monitor' },
    { id: 'rv-3', title: 'Reading Pair Practice', author: 'James Lee', type: 'Lesson', country: 'Qatar', grade: 'Grade 4', submittedAt: 'Yesterday', priority: 'healthy' },
];

export const adminTeacherApplications = [
    { id: 'app-1', name: 'Sophia Green', country: 'UK', specialty: 'Early years speaking', experience: '6 years', status: 'pending', submittedAt: 'Today 10:40' },
    { id: 'app-2', name: 'Daniel Moore', country: 'USA', specialty: 'Primary reading fluency', experience: '4 years', status: 'approved', submittedAt: 'Yesterday 16:15' },
    { id: 'app-3', name: 'Ella Brooks', country: 'Canada', specialty: 'Phonics and confidence', experience: '7 years', status: 'rejected', submittedAt: '2 days ago' },
];

export const adminSettingsSections = [
    { id: 'platform', title: 'Platform Identity', description: 'Brand, support channels, and operator-facing defaults.' },
    { id: 'access', title: 'Access and Registration', description: 'Approval logic, verification rules, and account provisioning.' },
    { id: 'content', title: 'Content Governance', description: 'Moderation thresholds, review routing, and publishing constraints.' },
    { id: 'security', title: 'Security Controls', description: 'Sessions, password rules, and privileged-account protection.' },
];

export const adminProfileActivity = [
    { id: 'pa-1', action: 'Updated curriculum release permissions', time: '30m ago' },
    { id: 'pa-2', action: 'Reviewed 3 pending teacher applications', time: '2h ago' },
    { id: 'pa-3', action: 'Exported renewal-risk snapshot', time: 'Yesterday' },
];
