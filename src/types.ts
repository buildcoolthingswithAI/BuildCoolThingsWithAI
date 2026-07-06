/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId = 'home' | 'episodes' | 'projects' | 'about' | 'contact';

export interface Episode {
  id: string;
  number: number;
  title: string;
  description: string;
  publishDate: string;
  duration: string;
  tags: string[];
  youtubeUrl: string;
  youtubeId: string;
  featured: boolean;
  hasBlueprint?: boolean;
  blueprintContent?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Completed' | 'In Progress' | 'Upcoming';
  featured: boolean;
  imageUrl: string;
}

export interface Technology {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'AI / Cloud' | 'Tools';
  iconName: string;
  description: string;
}

export interface RoadmapStep {
  id: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
  recommendedEpisodes: string[]; // Episode IDs
  recommendedProjects: string[]; // Project IDs
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
