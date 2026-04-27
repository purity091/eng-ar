import React, { useState, useEffect } from 'react';
import {
    Users, Search, Filter, CheckCircle, XCircle, Clock,
    Mail, Phone, MapPin, Briefcase, GraduationCap, Eye,
    ChevronDown, MoreVertical, Download, RefreshCw, X
} from 'lucide-react';
import { COUNTRIES } from '../../constants';

// Application interface
interface TeacherApplication {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    countryId: string;
    specialization: string;
    experience: string;
    currentPosition: string;
    bio: string;
    portfolio?: string;
    status: 'pending' | 'approved' | 'rejected';
    submittedAt: string;
}

const AdminApplicationsPage: React.FC = () => {
    const [applications, setApplications] = useState<TeacherApplication[]>([]);
    const [filteredApplications, setFilteredApplications] = useState<TeacherApplication[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [selectedApplication, setSelectedApplication] = useState<TeacherApplication | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load applications from localStorage
    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = () => {
        setIsLoading(true);
        setTimeout(() => {
            const stored = localStorage.getItem('teacher_applications');
            const apps = stored ? JSON.parse(stored) : [];
            setApplications(apps);
            setFilteredApplications(apps);
            setIsLoading(false);
        }, 500);
    };

    // Filter applications
    useEffect(() => {
        let filtered = [...applications];

        if (searchQuery) {
            filtered = filtered.filter(app =>
                app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.specialization.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(app => app.status === statusFilter);
        }

        // Sort by date (newest first)
        filtered.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

        setFilteredApplications(filtered);
    }, [applications, searchQuery, statusFilter]);

    // Update application status
    const updateStatus = (id: string, newStatus: 'approved' | 'rejected') => {
        const updated = applications.map(app =>
            app.id === id ? { ...app, status: newStatus } : app
        );
        setApplications(updated);
        localStorage.setItem('teacher_applications', JSON.stringify(updated));

        if (selectedApplication?.id === id) {
            setSelectedApplication({ ...selectedApplication, status: newStatus });
        }
    };

    // Get country name
    const getCountryName = (countryId: string) => {
        const country = COUNTRIES.find(c => c.id === countryId);
        return country ? `${country.flag} ${country.name}` : countryId;
    };

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Status badge
    const StatusBadge = ({ status }: { status: string }) => {
        const styles = {
            pending: 'bg-amber-100 text-amber-700 border-amber-200',
            approved: 'bg-mint-100 text-mint-700 border-mint-200',
            rejected: 'bg-red-100 text-red-700 border-red-200'
        };
        const labels = {
            pending: ',Sد ا".راجعة',
            approved: '.,ب^"',
            rejected: '.رف^ض'
        };
        return (
            <span className={`px-2 py-1 rounded-lg text-xs font-bold border ${styles[status as keyof typeof styles]}`}>
                {labels[status as keyof typeof labels]}
            </span>
        );
    };

    // Stats
    const stats = {
        total: applications.length,
        pending: applications.filter(a => a.status === 'pending').length,
        approved: applications.filter(a => a.status === 'approved').length,
        rejected: applications.filter(a => a.status === 'rejected').length
    };

    return (
        <div className="p-6 font-cairo" dir="rtl">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Users className="text-mint-500" size={28} />
                        طبات ا?ض.ا. ا".ع".S?
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">إدارة ^.راجعة طبات اا?ض.ا. "".?صة</p>
                </div>
                <button
                    onClick={loadApplications}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                >
                    <RefreshCw size={18} />
                    تحدSث
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-sm">إج.اS اطبات</span>
                        <Users size={20} className="text-slate-400" />
                    </div>
                    <p className="text-2xl font-bold text-slate-800 mt-2">{stats.total}</p>
                </div>
                <div className="bg-white rounded-xl border border-amber-200 p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-amber-600 text-sm">,Sد ا".راجعة</span>
                        <Clock size={20} className="text-amber-400" />
                    </div>
                    <p className="text-2xl font-bold text-amber-600 mt-2">{stats.pending}</p>
                </div>
                <div className="bg-white rounded-xl border border-mint-200 p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-mint-600 text-sm">.,ب^"</span>
                        <CheckCircle size={20} className="text-mint-400" />
                    </div>
                    <p className="text-2xl font-bold text-mint-600 mt-2">{stats.approved}</p>
                </div>
                <div className="bg-white rounded-xl border border-red-200 p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-red-600 text-sm">.رف^ض</span>
                        <XCircle size={20} className="text-red-400" />
                    </div>
                    <p className="text-2xl font-bold text-red-600 mt-2">{stats.rejected}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute right-3 top-2.5 text-slate-400" size={18} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="بحث بااس. أ^ ابرSد أ^ اتخصص..."
                            className="w-full p-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-lg focus:border-mint-500 outline-none text-sm"
                        />
                    </div>
                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                            className="appearance-none p-2.5 pr-4 pl-10 bg-slate-50 border border-slate-200 rounded-lg focus:border-mint-500 outline-none text-sm min-w-[150px]"
                        >
                            <option value="all">ج.Sع احاات</option>
                            <option value="pending">,Sد ا".راجعة</option>
                            <option value="approved">.,ب^"</option>
                            <option value="rejected">.رف^ض</option>
                        </select>
                        <ChevronDown className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    </div>
                </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {isLoading ? (
                    <div className="p-12 text-center text-slate-500">
                        <RefreshCw className="animate-spin mx-auto mb-4" size={32} />
                        <p>جارS اتح.S"...</p>
                    </div>
                ) : filteredApplications.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                        <Users className="mx-auto mb-4 opacity-30" size={48} />
                        <p className="font-bold">"ا ت^جد طبات</p>
                        <p className="text-sm">". Sت. اعث^ر ع"? طبات .طاب,ة ""بحث</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="text-right p-4 text-xs font-bold text-slate-600">ا".ت,د.</th>
                                    <th className="text-right p-4 text-xs font-bold text-slate-600">اتخصص</th>
                                    <th className="text-right p-4 text-xs font-bold text-slate-600">اخبرة</th>
                                    <th className="text-right p-4 text-xs font-bold text-slate-600">اد^"ة</th>
                                    <th className="text-right p-4 text-xs font-bold text-slate-600">احاة</th>
                                    <th className="text-right p-4 text-xs font-bold text-slate-600">اتارSخ</th>
                                    <th className="text-center p-4 text-xs font-bold text-slate-600">إجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredApplications.map(app => (
                                    <tr key={app.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="p-4">
                                            <div>
                                                <p className="font-bold text-slate-800 text-sm">{app.fullName}</p>
                                                <p className="text-xs text-slate-500">{app.email}</p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-sm text-slate-700">{app.specialization}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-sm text-slate-600">{app.experience} س?^ات</span>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-sm">{getCountryName(app.countryId)}</span>
                                        </td>
                                        <td className="p-4">
                                            <StatusBadge status={app.status} />
                                        </td>
                                        <td className="p-4">
                                            <span className="text-xs text-slate-500">{formatDate(app.submittedAt)}</span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => setSelectedApplication(app)}
                                                    className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                                                    title="عرض اتفاصS""
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                {app.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => updateStatus(app.id, 'approved')}
                                                            className="p-2 text-mint-600 hover:bg-mint-50 rounded-lg transition-colors"
                                                            title=",ب^""
                                                        >
                                                            <CheckCircle size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => updateStatus(app.id, 'rejected')}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="رفض"
                                                        >
                                                            <XCircle size={18} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {selectedApplication && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-800">تفاصS" اطب</h2>
                            <button
                                onClick={() => setSelectedApplication(null)}
                                className="text-slate-500 hover:text-slate-700"
                            >`n                                <X size={18} />`n                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Status */}
                            <div className="flex items-center justify-between">
                                <StatusBadge status={selectedApplication.status} />
                                <span className="text-xs text-slate-500">{formatDate(selectedApplication.submittedAt)}</span>
                            </div>

                            {/* Personal Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                                        <Users size={14} />
                                        ااس. اfا."
                                    </div>
                                    <p className="font-bold text-slate-800">{selectedApplication.fullName}</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                                        <Mail size={14} />
                                        ابرSد اإfتر^?S
                                    </div>
                                    <p className="font-bold text-slate-800" dir="ltr">{selectedApplication.email}</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                                        <Phone size={14} />
                                        ر,. ا"?اتف
                                    </div>
                                    <p className="font-bold text-slate-800" dir="ltr">{selectedApplication.phone}</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                                        <MapPin size={14} />
                                        اد^"ة
                                    </div>
                                    <p className="font-bold text-slate-800">{getCountryName(selectedApplication.countryId)}</p>
                                </div>
                            </div>

                            {/* Professional Info */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-mint-50 rounded-xl p-4 border border-mint-100">
                                    <div className="flex items-center gap-2 text-mint-600 text-xs mb-1">
                                        <GraduationCap size={14} />
                                        اتخصص
                                    </div>
                                    <p className="font-bold text-mint-800">{selectedApplication.specialization}</p>
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                                    <div className="flex items-center gap-2 text-purple-600 text-xs mb-1">
                                        <Clock size={14} />
                                        اخبرة
                                    </div>
                                    <p className="font-bold text-purple-800">{selectedApplication.experience} س?^ات</p>
                                </div>
                                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                    <div className="flex items-center gap-2 text-blue-600 text-xs mb-1">
                                        <Briefcase size={14} />
                                        ا"^ظSفة احاSة
                                    </div>
                                    <p className="font-bold text-blue-800 text-sm">{selectedApplication.currentPosition}</p>
                                </div>
                            </div>

                            {/* Bio */}
                            <div>
                                <h3 className="font-bold text-slate-700 mb-2">?بذة ع? ا".ت,د.</h3>
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <p className="text-slate-600 text-sm leading-relaxed">{selectedApplication.bio}</p>
                                </div>
                            </div>

                            {/* Portfolio */}
                            {selectedApplication.portfolio && (
                                <div>
                                    <h3 className="font-bold text-slate-700 mb-2">ا"."ف اشخصS</h3>
                                    <a
                                        href={selectedApplication.portfolio}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-mint-600 hover:underline text-sm"
                                    >
                                        {selectedApplication.portfolio}
                                    </a>
                                </div>
                            )}

                            {/* Actions */}
                            {selectedApplication.status === 'pending' && (
                                <div className="flex gap-3 pt-4 border-t border-slate-100">
                                    <button
                                        onClick={() => {
                                            updateStatus(selectedApplication.id, 'approved');
                                        }}
                                        className="flex-1 py-3 bg-mint-600 text-white rounded-xl font-bold hover:bg-mint-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle size={18} />
                                        ,ب^" اطب
                                    </button>
                                    <button
                                        onClick={() => {
                                            updateStatus(selectedApplication.id, 'rejected');
                                        }}
                                        className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <XCircle size={18} />
                                        رفض اطب
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminApplicationsPage;



