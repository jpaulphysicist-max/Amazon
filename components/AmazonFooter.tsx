'use client';

import React from 'react';
import { HOLIDAYS } from '@/data/holidays';
import { HolidayId } from '@/data/types';
import { Globe } from 'lucide-react';

interface AmazonFooterProps {
  onSelectHoliday: (holiday: HolidayId | 'all') => void;
}

export function AmazonFooter({ onSelectHoliday }: AmazonFooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#131921] text-white text-xs mt-12">
      {/* Back to top bar */}
      <button
        type="button"
        onClick={scrollToTop}
        className="w-full py-3 bg-[#37475a] hover:bg-[#485769] text-center font-semibold text-white transition text-xs cursor-pointer"
      >
        Back to top
      </button>

      {/* 4-Column Directory */}
      <div className="max-w-[1200px] mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-slate-300">
        <div>
          <h4 className="font-bold text-white text-sm mb-3">Get to Know Us</h4>
          <ul className="space-y-2 text-xs">
            <li className="hover:underline cursor-pointer">About Amazon Holiday</li>
            <li className="hover:underline cursor-pointer">Holiday Sustainability</li>
            <li className="hover:underline cursor-pointer">Amazon Science</li>
            <li className="hover:underline cursor-pointer">Community Gift Giving</li>
            <li className="hover:underline cursor-pointer">Amazon Devices</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-3">Make Money with Us</h4>
          <ul className="space-y-2 text-xs">
            <li className="hover:underline cursor-pointer">Sell Holiday Goods on Amazon</li>
            <li className="hover:underline cursor-pointer">Sell apps on Amazon</li>
            <li className="hover:underline cursor-pointer">Become an Affiliate</li>
            <li className="hover:underline cursor-pointer">Advertise Your Products</li>
            <li className="hover:underline cursor-pointer">Host an Amazon Hub</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-3">Amazon Payment Products</h4>
          <ul className="space-y-2 text-xs">
            <li className="hover:underline cursor-pointer">Amazon Prime Rewards Visa</li>
            <li className="hover:underline cursor-pointer">Shop with Points</li>
            <li className="hover:underline cursor-pointer">Reload Your Balance</li>
            <li className="hover:underline cursor-pointer">Amazon Currency Converter</li>
            <li className="hover:underline cursor-pointer">Holiday Gift Cards</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-3">Holiday Gift Guides</h4>
          <ul className="space-y-1.5 text-xs">
            {HOLIDAYS.slice(0, 6).map((h) => (
              <li
                key={h.id}
                onClick={() => onSelectHoliday(h.id)}
                className="hover:underline hover:text-amber-400 cursor-pointer"
              >
                {h.shortName} Gift Guide
              </li>
            ))}
            <li
              onClick={() => onSelectHoliday('all')}
              className="text-amber-400 hover:underline cursor-pointer font-semibold pt-1"
            >
              View All 11 Holidays &rarr;
            </li>
          </ul>
        </div>
      </div>

      {/* Mid Footer: Logo & Language */}
      <div className="border-t border-slate-700 py-6">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div
            onClick={() => onSelectHoliday('all')}
            className="cursor-pointer flex flex-col items-center"
          >
            <div className="flex items-baseline">
              <span className="text-xl font-bold tracking-tight text-white">amazon</span>
              <span className="text-xs text-amber-400 font-semibold ml-0.5">.holiday</span>
            </div>
            <svg className="w-14 h-2 text-amber-400" viewBox="0 0 100 20" fill="none">
              <path
                d="M5 14 Q 50 25, 95 6"
                stroke="#ff9900"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <polygon points="90,4 98,6 94,12" fill="#ff9900" />
            </svg>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-300">
            <div className="px-3 py-1.5 border border-slate-600 rounded flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" />
              <span>English</span>
            </div>
            <div className="px-3 py-1.5 border border-slate-600 rounded">
              <span>$ USD - U.S. Dollar</span>
            </div>
            <div className="px-3 py-1.5 border border-slate-600 rounded flex items-center gap-1.5">
              <span>🇺🇸</span>
              <span>United States</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Legal */}
      <div className="bg-[#0f1111] py-8 text-center text-[11px] text-slate-400 space-y-2 border-t border-slate-800">
        <div className="flex flex-wrap justify-center gap-4 text-slate-300">
          <span className="hover:underline cursor-pointer">Conditions of Use</span>
          <span className="hover:underline cursor-pointer">Privacy Notice</span>
          <span className="hover:underline cursor-pointer">Consumer Health Data Privacy Disclosure</span>
          <span className="hover:underline cursor-pointer">Your Ads Privacy Choices</span>
        </div>
        <p className="text-slate-500">
          © 1996–2026, Amazon.com, Inc. or its affiliates. Holiday Store Catalog & Review System.
        </p>
      </div>
    </footer>
  );
}
