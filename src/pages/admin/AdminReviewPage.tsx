import React, { useState } from 'react';
import { Check, X, Eye, FileText, Video, Clock, TriangleAlert } from 'lucide-react';
import { MOCK_REVIEW_QUEUE } from '../../constants/reviewQueue';
import { DataTable } from '../../components/admin/DataTable';
import { ContentStatus } from '../../types';
import { usePermissions } from '../../hooks/usePermissions';

const AdminReviewPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { hasPermission, canAccessContent } = usePermissions();

    // Filter items based on scope (user can only see their countrys content)
    const filteredItems = MOCK_REVIEW_QUEUE.filter(item =>
        item.status === 'pending' &&
        canAccessContent(item.countryId) &&
        (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.author.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleApprove = (id: string) => {
        alert(`تم اعتماد المحتوى ${id} بنجاح!`);
    };

    const handleReject = (id: string) => {
        const reason = prompt('يرجى كتابة سبب الرفض (اختياري):');
        alert(`تم رفض المحتوى ${id}`);
    };

    const columns = [
        {
            header: 'المحتوى',
            accessor: (item: any) => (
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shrink-0 flex items-center justify-center">
                        {item.thumbnailUrl ? (
                            <img src={item.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                            item.type === 'book' ? <FileText className="text-slate-400" /> : <Video className="text-slate-400" />
                        )}
                    </div>
                    <div>
                        <p className="font-bold text-slate-800 line-clamp-1 w-64" title={item.title}>{item.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${item.type === 'book' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                                {item.type === 'book' ? 'كتاب' : 'درس'}
                            </span>
                            <span className="text-xs text-slate-400">• بواسطة {item.author}</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            header: 'السياق التعليمي',
            accessor: (item: any) => (
                <div className="text-xs space-y-1">
                    <div className="flex items-center gap-1">
                        <span className="font-bold text-slate-700">{item.subject}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                        <span>الصف {item.grade}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span className="uppercase">{item.countryId}</span>
                    </div>
                </div>
            )
        },
        {
            header: 'تاريخ التقديم',
            accessor: (item: any) => (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock size={14} />
                    <span>{item.submittedAt}</span>
                </div>
            )
        }
    ];

    // Build actions array conditionally based on permissions
    const actions = [];

    if (hasPermission('content', 'approve')) {
        actions.push({
            icon: Check,
            label: 'اعتماد',
            onClick: (item: any) => handleApprove(item.id),
            color: 'bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700'
        });
    }

    if (hasPermission('content', 'approve')) {
        actions.push({
            icon: X,
            label: 'رفض',
            onClick: (item: any) => handleReject(item.id),
            color: 'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700'
        });
    }

    // Everyone can preview
    actions.push({
        icon: Eye,
        label: 'معاينة',
        onClick: (item: any) => alert(`معاينة المحتوى ${item.id}`),
        color: 'bg-slate-50 text-slate-600 hover:bg-slate-100'
    });

    return (
        <div className="space-y-6">
            {!hasPermission('content', 'approve') && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
                    <div className="text-yellow-600"><TriangleAlert size={18} /></div>
                    <div>
                        <p className="font-bold text-yellow-800 text-sm">صلاحية محدودة</p>
                        <p className="text-yellow-700 text-xs">ليس لديك صلاحية اعتماد أو رفض المحتوى. يمكنك فقط المعاينة.</p>
                    </div>
                </div>
            )}

            <DataTable
                title="مراجعة المحتوى"
                subtitle="قائمة انتظار المحتوى الذي يحتاج إلى موافقة المشرف الأكاديمي (Academic Admin)"
                data={filteredItems}
                columns={columns}
                actions={actions}
                onSearch={setSearchQuery}
            />

            {filteredItems.length === 0 && (
                <div className="p-8 text-center bg-green-50 rounded-xl border border-green-100">
                    <Check className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-green-800">رائع! لا يوجد محتوى معلق</h3>
                    <p className="text-green-600 text-sm">تم مراجعة جميع الكتب والدروس المقدمة.</p>
                </div>
            )}
        </div>
    );
};

export default AdminReviewPage;

