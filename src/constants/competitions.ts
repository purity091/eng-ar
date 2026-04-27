import { Calculator, FlaskConical, Code, BookOpen, Brush, Trophy, DollarSign } from 'lucide-react';

export interface CompetitionStage {
    title: string;
    date: string;
    description: string;
    status: 'completed' | 'active' | 'upcoming';
}

export interface CompetitionResource {
    title: string;
    type: 'pdf' | 'video' | 'link';
    url: string;
}

export interface Competition {
    id: string;
    title: string;
    category: 'math' | 'science' | 'coding' | 'reading' | 'arts' | 'business';
    description: string;
    fullDescription?: string;
    targetGrades: number[];
    organizer: string;
    icon: any;
    url?: string;
    coverImage?: string;
    prizes?: string[];
    timeline?: CompetitionStage[];
    resources?: CompetitionResource[];
}

export const COMPETITIONS: Competition[] = [
    // Math
    {
        id: 'arab-math-olympiad',
        title: 'Arab Math Olympiad',
        category: 'math',
        description: 'Official competition bringing together students from Arab countries for advanced mathematical challenges.',
        fullDescription: 'The Arab Math Olympiad is a regional competition aimed at fostering scientific competition among Arab students and discovering talented individuals in mathematics. It covers algebra, geometry, number theory, and combinatorics.',
        targetGrades: [10, 11, 12],
        organizer: 'ALECSO',
        icon: Calculator,
        coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop',
        prizes: [
            'Gold, Silver, and Bronze medals for winners',
            'Certified recognition from the Arab League',
            'Opportunities to participate in the International Math Olympiad (IMO)'
        ],
        timeline: [
            { title: 'Local Registration', date: 'Sept 2024', description: 'Registration open via schools and ministries', status: 'completed' },
            { title: 'National Qualifiers', date: 'Nov 2024', description: 'Tests to determine the national team', status: 'active' },
            { title: 'Training Camp', date: 'Dec 2024', description: 'Intensive training for the national team', status: 'upcoming' },
            { title: 'Final Competition', date: 'Feb 2025', description: 'The Olympiad begins and winners are announced', status: 'upcoming' }
        ],
        resources: [
            { title: 'Previous Exams (PDF)', type: 'pdf', url: '#' },
            { title: 'Solution Strategies (Video)', type: 'video', url: '#' }
        ]
    },
    {
        id: 'kangaroo-math',
        title: 'Kangaroo Math',
        category: 'math',
        description: 'A fun and globally widespread mathematical thinking competition.',
        fullDescription: 'Kangaroo Math is one of the largest international competitions, with millions of students from over 70 countries. It aims to promote a passion for math through fun problems and smart challenges.',
        targetGrades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        organizer: 'Kangaroo Maths',
        icon: Calculator,
        coverImage: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=2071&auto=format&fit=crop',
        prizes: [
            'Gold medals for top ranks',
            'Partial scholarships for selected universities',
            'Physical prizes (tablets, books)'
        ],
        timeline: [
            { title: 'Early Registration', date: 'Jan 2025', description: 'Register via the official website', status: 'upcoming' },
            { title: 'Official Test', date: 'Mar 2025', description: 'Concurrent global testing', status: 'upcoming' },
            { title: 'Results', date: 'May 2025', description: 'Certificate and prize distribution', status: 'upcoming' }
        ]
    },

    // Science
    {
        id: 'arab-science-olympiad',
        title: 'Arab Science Olympiad',
        category: 'science',
        description: 'Discovering scientific talent in Physics, Chemistry, and Biology.',
        fullDescription: 'A scientific competition aimed at promoting interest in natural sciences and developing research and scientific thinking skills among Arab students.',
        targetGrades: [7, 8, 9, 10, 11, 12],
        organizer: 'ALECSO',
        icon: FlaskConical,
        coverImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'ibda-science',
        title: 'Ibda for Science and Engineering',
        category: 'science',
        description: 'The largest scientific research competition for students in the Arab world.',
        targetGrades: [7, 8, 9, 10, 11, 12],
        organizer: 'Mawhiba',
        icon: FlaskConical,
        coverImage: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=2070&auto=format&fit=crop',
        prizes: ['Representation at ISEF', 'Major cash prizes', 'Prestigious university scholarships']
    },

    // Coding & Tech
    {
        id: 'arab-informatics',
        title: 'Arab Informatics Olympiad',
        category: 'coding',
        description: 'A programming and algorithm competition, a gateway to the International Olympiad.',
        fullDescription: 'A strong programming challenge testing students\' problem-solving skills using algorithms and data structures. Gateway to IOI.',
        targetGrades: [10, 11, 12],
        organizer: 'IOI Arab',
        icon: Code,
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
        prizes: ['Olympic medals', 'Laptops and tech gear', 'Scholarships at top tech universities']
    },
    {
        id: 'future-science-challenge',
        title: 'Future Science Challenge',
        category: 'coding',
        description: 'Focused on programming, AI, and innovation.',
        targetGrades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        organizer: 'MOE UAE',
        icon: Code,
        coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop'
    },

    // Reading
    {
        id: 'arab-reading-challenge',
        title: 'Arab Reading Challenge',
        category: 'reading',
        description: 'The largest reading competition in the Arab world with valuable prizes.',
        fullDescription: 'An initiative to encourage students to read regularly, summarize books, and critique them. Millions of students participate annually.',
        targetGrades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        organizer: 'MBR Foundation',
        icon: BookOpen,
        coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2070&auto=format&fit=crop',
        prizes: ['Cash prizes up to 1 million AED', 'Educational trips', 'Home libraries']
    },

    // Arts & Business
    {
        id: 'media-arts',
        title: 'Media and Arts Creativity',
        category: 'arts',
        description: 'Artistic and cultural competitions to develop creative talents.',
        targetGrades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        organizer: 'Ministries of Education',
        icon: Brush,
        coverImage: 'https://images.unsplash.com/photo-1460661619275-d4c92560b45d?q=80&w=2069&auto=format&fit=crop'
    },
    {
        id: 'injaz-arab',
        title: 'Injaz Arab (Entrepreneurship)',
        category: 'business',
        description: 'Learn entrepreneurship and student project management.',
        targetGrades: [7, 8, 9, 10, 11, 12],
        organizer: 'Junior Achievement',
        icon: DollarSign,
        coverImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop',
        prizes: ['Financial support for projects', 'Incubation and acceleration programs', 'International certificates']
    }
];
