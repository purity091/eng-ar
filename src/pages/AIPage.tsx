import React from 'react';
import { AITutor } from '../components/AITutor';
import { useApp } from '../contexts/AppContext';

const AIPage: React.FC = () => {
    const { userProfile } = useApp();

    return (
        <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-180px)] pb-20 md:pb-0">
            <AITutor
                grade={userProfile?.grade || 10}
                stage={userProfile?.stage || 'Secondary'}
            />
        </div>
    );
};

export default AIPage;
