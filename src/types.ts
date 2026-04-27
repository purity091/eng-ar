export enum EducationalStage {
  PRIMARY = 'Primary',
  PREPARATORY = 'Preparatory',
  SECONDARY = 'Secondary',
  UNIVERSITY = 'University'
}

export enum Tab {
  HOME = 'home',
  BOOKS = 'books',
  LESSONS = 'lessons',
  COMMUNITY = 'community',
  AI_HELPER = 'ai_helper'
}

export interface Country {
  id: string;
  name: string;
  flag: string; // Emoji or URL
  subdomain: string;
}

export interface Book {
  id: string;
  title: string;
  subject: string;
  grade: number;
  stage: EducationalStage;
  coverUrl: string;
  author: string;
  countryId: string; // Linking content to specific country
}

export interface Lesson {
  id: string;
  title: string;
  subject: string;
  duration: string; // e.g. "15 mins"
  videoUrl?: string;
  thumbnailUrl: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  grade: number; // Added grade for filtering
  countryId: string; // Linking content to specific country
}

export interface ForumTopic {
  id: string;
  title: string;
  author: string;
  replies: number;
  views: number;
  tags: string[];
  lastActive: string;
  countryId: string; // Linking content to specific country
  grade?: number; // Optional grade specific topic
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

// --- RBAC & Admin Types ---

export type UserRole =
  | 'platform_owner'
  | 'global_super_admin'
  | 'country_admin'
  | 'stage_admin'
  | 'academic_admin'
  | 'teacher'
  | 'moderator'
  | 'student';

export const UserRoleEnum = {
  PLATFORM_OWNER: 'platform_owner',
  GLOBAL_SUPER_ADMIN: 'global_super_admin',
  COUNTRY_ADMIN: 'country_admin',
  STAGE_ADMIN: 'stage_admin',
  ACADEMIC_ADMIN: 'academic_admin',
  TEACHER: 'teacher',
  MODERATOR: 'moderator',
  STUDENT: 'student'
} as const;

export type Action = 'view' | 'create' | 'edit' | 'delete' | 'publish' | 'archive' | 'approve' | 'manage';
export type Resource = 'users' | 'content' | 'competitions' | 'settings' | 'applications' | 'reports';

export interface UserScope {
  billing?: boolean;
  global?: boolean;
  countryId?: string | 'ALL';
  stage?: EducationalStage;
  subjects?: string[];
}

export interface AdminProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  avatarUrl?: string;
  role: UserRole;

  // Scope (The "Attribute" in ABAC)
  assignedCountryId?: string; // 'ALL' for Global, 'eg', 'sa', etc.
  assignedStage?: EducationalStage;
  assignedSubjects?: string[];

  status: 'active' | 'suspended' | 'pending';
  lastActive: string;
}

// --- Content Approval Workflow ---

export type ContentStatus = 'draft' | 'pending' | 'approved' | 'rejected';

export interface ReviewItem {
  id: string;
  title: string;
  type: 'book' | 'lesson';
  author: string;
  submittedAt: string;
  status: ContentStatus;

  // Context for the reviewer
  countryId: string;
  subject: string;
  grade: number;
  thumbnailUrl?: string; // For visual context
}

// --- Authentication Types ---

export interface AuthUser {
  id: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: AuthUser;
}

export interface AuthError {
  code: string;
  message: string;
}

export interface RegistrationData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  user?: AuthUser;
  error?: string;
}