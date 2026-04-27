// Gamification System - Points and Badges

export interface UserPoints {
    userId: string;
    points: number;
    level: number;
    badges: Badge[];
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    unlockedAt?: string;
}

// Activity Points
export const ACTIVITY_POINTS = {
    POST_CREATED: 10,
    POST_LIKED: 2,
    REPLY_CREATED: 5,
    BEST_ANSWER: 50,
    POST_PINNED: 25,
    DAILY_LOGIN: 5,
    WEEK_STREAK: 20,
    SHARE_CONTENT: 3,
};

// Available Badges
export const AVAILABLE_BADGES: Badge[] = [
    {
        id: 'first-post',
        name: 'First Mission',
        description: 'You completed your first practice session!',
        icon: 'Target',
        rarity: 'common'
    },
    {
        id: 'helpful',
        name: 'Rising Star',
        description: 'Received 10 positive feedback marks.',
        icon: 'Star',
        rarity: 'common'
    },
    {
        id: 'expert',
        name: 'Language Master',
        description: 'Achieved 5 perfect pronunciation scores.',
        icon: 'Trophy',
        rarity: 'rare'
    },
    {
        id: 'influencer',
        name: 'Community Leader',
        description: 'Connected with 50 fellow students.',
        icon: 'Users',
        rarity: 'epic'
    },
    {
        id: 'legend',
        name: 'Readmint Legend',
        description: 'Reached 1,000 XP points.',
        icon: 'Crown',
        rarity: 'legendary'
    },
    {
        id: 'streak-7',
        name: 'Consistency King',
        description: '7-day learning streak achieved!',
        icon: 'Flame',
        rarity: 'rare'
    },
    {
        id: 'teacher-helper',
        name: 'Junior Mentor',
        description: 'Helped 20 students in the community.',
        icon: 'BookOpen',
        rarity: 'epic'
    }
];

// Calculate level from points
export const calculateLevel = (points: number): number => {
    return Math.floor(Math.sqrt(points / 10)) + 1;
};

// Calculate points for next level
export const pointsForNextLevel = (currentLevel: number): number => {
    return Math.pow(currentLevel, 2) * 10;
};

// Check for new badge unlocks
export const checkBadgeUnlock = (userId: string, stats: any): Badge[] => {
    const newBadges: Badge[] = [];

    if (stats.postsCount === 1) {
        newBadges.push(AVAILABLE_BADGES.find(b => b.id === 'first-post')!);
    }

    if (stats.totalLikes >= 10) {
        newBadges.push(AVAILABLE_BADGES.find(b => b.id === 'helpful')!);
    }

    return newBadges;
};

// Get badge color based on rarity
export const getBadgeColor = (rarity: Badge['rarity']): string => {
    switch (rarity) {
        case 'common': return 'bg-slate-100 text-slate-700 border-slate-300';
        case 'rare': return 'bg-blue-100 text-blue-700 border-blue-300';
        case 'epic': return 'bg-purple-100 text-purple-700 border-purple-300';
        case 'legendary': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    }
};
