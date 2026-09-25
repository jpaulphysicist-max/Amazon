'use client';

import React from 'react';
import { HOLIDAYS } from '@/data/holidays';
import { HolidayId } from '@/data/types';
import { Sparkles } from 'lucide-react';

interface HolidayDepartmentBarProps {
  selectedHoliday: HolidayId | 'all';
  onSelectHoliday: (holiday: HolidayId | 'all') => void;
  productCountMap: Record<string, number>;
}

export function HolidayDepartmentBar({
  selectedHoliday,
  onSelectHoliday,
  productCountMap,
}: HolidayDepartmentBarProps) {
  return (
    <div className="bg-white border-b border-slate-200 shadow-xs py-3 px-3 md:px-6">
      <div className="max-w-[1500px] mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900 tracking-tight">
              Shop by Holiday Season:
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">
              11 Official US Federal & Cultural Holidays
            </span>
          </div>
          {selectedHoliday !== 'all' && (
            <button
              onClick={() => onSelectHoliday('all')}
              className="text-xs font-semibold text-blue-700 hover:text-amber-700 hover:underline"
            >
              View All 11 Holidays &rarr;
            </button>
          )}
        </div>

        {/* Scrollable Holiday Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar scroll-smooth">
          {/* All Holidays tab */}
          <button
            onClick={() => onSelectHoliday('all')}
            className={`px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
              selectedHoliday === 'all'
                ? 'bg-slate-900 text-white shadow-sm ring-2 ring-slate-900 ring-offset-1 font-semibold'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>All Holidays</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedHoliday === 'all' ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-600'
              }`}
            >
              {Object.values(productCountMap).reduce((a, b) => a + b, 0)}
            </span>
          </button>

          {/* Each individual Holiday */}
          {HOLIDAYS.map((holiday) => {
            const isSelected = selectedHoliday === holiday.id;
            const count = productCountMap[holiday.id] || 0;

            return (
              <button
                key={holiday.id}
                onClick={() => onSelectHoliday(holiday.id)}
                className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 border ${
                  isSelected
                    ? 'bg-amber-50 border-amber-500 text-amber-950 font-bold shadow-xs ring-1 ring-amber-500'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className="font-medium">{holiday.shortName}</span>
                <span className="text-[10px] text-slate-600">· {holiday.dateStr.split(' ')[0]}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-amber-200/80 text-amber-900' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
