import React, { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Search,
    Filter,
    MoreHorizontal,
    ArrowUpDown,
    CheckSquare,
    Square,
    Download
} from 'lucide-react';

interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
}

interface Action<T> {
    icon: React.ElementType;
    label: string;
    onClick: (item: T) => void;
    color?: string;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    actions?: Action<T>[];
    onSearch?: (query: string) => void;
    onFilter?: () => void;
    title: string;
    subtitle?: string;
    primaryAction?: {
        label: string;
        icon: React.ElementType;
        onClick: () => void;
    };
}

export function DataTable<T extends { id: string | number }>({
    data,
    columns,
    actions,
    onSearch,
    title,
    subtitle,
    primaryAction
}: DataTableProps<T>) {
    const [selectedItems, setSelectedItems] = useState<Set<string | number>>(new Set());
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Search Logic (Client Side for now)
    const filteredData = data;
    // In a real app, filtering usually happens on the server or via a more complex local logic passed as prop

    // Pagination Logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const toggleSelection = (id: string | number) => {
        const newSelected = new Set(selectedItems);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedItems(newSelected);
    };

    const toggleAll = () => {
        if (selectedItems.size === paginatedData.length) {
            setSelectedItems(new Set());
        } else {
            setSelectedItems(new Set(paginatedData.map(item => item.id)));
        }
    };

    return (
        <div className="space-y-4">
            {/* Header Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 font-cairo">{title}</h2>
                    {subtitle && <p className="text-slate-500 text-sm">{subtitle}</p>}
                </div>

                <div className="flex gap-2">
                    {selectedItems.size > 0 && (
                        <button className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-red-100 transition-colors flex items-center gap-2 animate-fade-in">
                            <span className="bg-red-200 px-1.5 rounded text-xs">{selectedItems.size}</span>
                            حذف المحدد
                        </button>
                    )}

                    {primaryAction && (
                        <button
                            onClick={primaryAction.onClick}
                            className="bg-mint-600 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-mint-700 transition-colors flex items-center gap-2 shadow-lg shadow-mint-600/20"
                        >
                            <primaryAction.icon size={18} />
                            {primaryAction.label}
                        </button>
                    )}
                </div>
            </div>

            {/* Filters & Search Bar */}
            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute right-3 top-2.5 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="بحث..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            onSearch?.(e.target.value);
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-mint-500 transition-all"
                    />
                </div>
                <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500 flex items-center gap-2 px-4 font-bold text-sm">
                    <Filter size={18} />
                    <span className="hidden md:inline">تصفية</span>
                </button>
                <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500 flex items-center gap-2 px-4 font-bold text-sm">
                    <Download size={18} />
                    <span className="hidden md:inline">تصدير</span>
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead className="bg-slate-50 border-b border-slate-100 text-xs uppercase text-slate-500 font-medium">
                            <tr>
                                <th className="px-6 py-4 w-10">
                                    <button onClick={toggleAll} className="text-slate-400 hover:text-slate-600">
                                        {selectedItems.size === paginatedData.length && paginatedData.length > 0 ? <CheckSquare size={18} /> : <Square size={18} />}
                                    </button>
                                </th>
                                {columns.map((col, idx) => (
                                    <th key={idx} className={`px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors ${col.className}`}>
                                        <div className="flex items-center gap-1">
                                            {col.header}
                                            <ArrowUpDown size={12} className="opacity-50" />
                                        </div>
                                    </th>
                                ))}
                                {actions && <th className="px-6 py-4">الإجراءات</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {paginatedData.map((item, idx) => (
                                <tr key={item.id} className={`hover:bg-slate-50/80 transition-colors text-sm text-slate-600 ${selectedItems.has(item.id) ? 'bg-mint-50/30' : ''}`}>
                                    <td className="px-6 py-4">
                                        <button onClick={() => toggleSelection(item.id)} className={`text-slate-300 hover:text-mint-600 ${selectedItems.has(item.id) ? 'text-mint-600' : ''}`}>
                                            {selectedItems.has(item.id) ? <CheckSquare size={18} /> : <Square size={18} />}
                                        </button>
                                    </td>
                                    {columns.map((col, colIdx) => (
                                        <td key={colIdx} className="px-6 py-4">
                                            {typeof col.accessor === 'function'
                                                ? col.accessor(item)
                                                : (item[col.accessor] as React.ReactNode)}
                                        </td>
                                    ))}
                                    {actions && (
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                {actions.map((action, actionIdx) => (
                                                    <button
                                                        key={actionIdx}
                                                        onClick={() => action.onClick(item)}
                                                        title={action.label}
                                                        className={`p-1.5 rounded-lg transition-colors hover:bg-slate-100 ${action.color || 'text-slate-500'}`}
                                                    >
                                                        <action.icon size={16} />
                                                    </button>
                                                ))}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <p className="text-xs text-slate-500">
                        عرض <span className="font-bold text-slate-700">{Math.min(itemsPerPage, filteredData.length)}</span> من أصل <span className="font-bold text-slate-700">{filteredData.length}</span> سجل
                    </p>
                    <div className="flex gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={16} />
                        </button>
                        <div className="flex items-center gap-1 px-2">
                            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${currentPage === i + 1 ? 'bg-mint-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-200'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
