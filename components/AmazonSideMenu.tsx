'use client';

import React from 'react';
import { HOLIDAYS } from '@/data/holidays';
import { HolidayId } from '@/data/types';
import { X, User, ChevronRight, Gift, Sparkles, HelpCircle, Package } from 'lucide-react';

interface AmazonSideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHoliday: (holiday: HolidayId | 'all') => void;
  onOpenOrders: () => void;
  onOpenAdvisor: () => void;
}

export function AmazonSideMenu({
  isOpen,
  onClose,
  onSelectHoliday,
  onOpenOrders,
  onOpenAdvisor,
}: AmazonSideMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
        <div className="w-screen max-w-xs sm:max-w-sm bg-white shadow-2xl flex flex-col text-slate-900">
          {/* Header */}
          <div className="p-4 bg-[#232f3e] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-bold">Hello, Holiday Shopper</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-slate-300 hover:text-white rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Sections */}
          <div className="flex-1 overflow-y-auto py-2 text-xs divide-y divide-slate-200">
            {/* Quick Actions */}
            <div className="py-2">
              <div className="px-4 py-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Holiday Quick Links
              </div>
              <button
                onClick={() => {
                  onSelectHoliday('all');
                  onClose();
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-100 flex items-center justify-between font-semibold text-slate-800"
              >
                <span>🌟 Today&apos;s Holiday Deals</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => {
                  onOpenAdvisor();
                  onClose();
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-100 flex items-center justify-between font-semibold text-amber-700"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask Rufus Holiday AI</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => {
                  onOpenOrders();
                  onClose();
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-100 flex items-center justify-between font-medium text-slate-700"
              >
                <div className="flex items-center gap-2">
                  <Package className="w-3.5 h-3.5 text-slate-500" />
                  <span>Your Orders & Returns</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Shop by Holiday (All 11 Holidays) */}
            <div className="py-2">
              <div className="px-4 py-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Shop By Holiday Season
              </div>
              {HOLIDAYS.map((h) => (
                <button
                  key={h.id}
                  onClick={() => {
                    onSelectHoliday(h.id);
                    onClose();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-amber-50 hover:text-amber-900 flex items-center justify-between text-slate-700 transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{h.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              ))}
            </div>

            {/* Programs & Features */}
            <div className="py-2">
              <div className="px-4 py-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Programs & Features
              </div>
              <div className="px-4 py-2 text-slate-600 flex items-center justify-between cursor-pointer hover:bg-slate-100">
                <span>Amazon Prime Free Shipping</span>
                <span className="text-[10px] text-emerald-700 font-bold">Active</span>
              </div>
              <div className="px-4 py-2 text-slate-600 flex items-center justify-between cursor-pointer hover:bg-slate-100">
                <span>Holiday Gift Cards</span>
                <Gift className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="px-4 py-2 text-slate-600 flex items-center justify-between cursor-pointer hover:bg-slate-100">
                <span>Extended Holiday Returns Policy</span>
                <span className="text-[10px] text-slate-400">Jan 31</span>
              </div>
            </div>

            {/* Help & Settings */}
            <div className="py-2">
              <div className="px-4 py-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Help & Settings
              </div>
              <div className="px-4 py-2 text-slate-600 cursor-pointer hover:bg-slate-100">
                Your Account
              </div>
              <div className="px-4 py-2 text-slate-600 cursor-pointer hover:bg-slate-100">
                Customer Service & FAQ
              </div>
              <div className="px-4 py-2 text-slate-600 cursor-pointer hover:bg-slate-100">
                United States (English)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
