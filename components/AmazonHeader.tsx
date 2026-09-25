'use client';

import React, { useState } from 'react';
import {
  Search,
  ShoppingCart,
  MapPin,
  Menu,
  ChevronDown,
  Sparkles,
  Package,
  User,
} from 'lucide-react';
import { HOLIDAYS } from '@/data/holidays';
import { HolidayId } from '@/data/types';

interface AmazonHeaderProps {
  selectedHoliday: HolidayId | 'all';
  onSelectHoliday: (holiday: HolidayId | 'all') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenOrders: () => void;
  onOpenSideMenu: () => void;
  onOpenAdvisor: () => void;
  deliveryZip: string;
  onChangeZip: (zip: string) => void;
}

export function AmazonHeader({
  selectedHoliday,
  onSelectHoliday,
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  onOpenOrders,
  onOpenSideMenu,
  onOpenAdvisor,
  deliveryZip,
  onChangeZip,
}: AmazonHeaderProps) {
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [zipModalOpen, setZipModalOpen] = useState(false);
  const [tempZip, setTempZip] = useState(deliveryZip);

  const currentHolidayName =
    selectedHoliday === 'all'
      ? 'All Holidays'
      : HOLIDAYS.find((h) => h.id === selectedHoliday)?.shortName || 'All Holidays';

  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempZip.trim()) {
      onChangeZip(tempZip.trim());
      setZipModalOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#131921] text-white shadow-md">
        {/* Slim Holiday Shipping Notification */}
        <div className="bg-[#232f3e] text-xs text-amber-300 py-1 px-4 text-center border-b border-white/10 flex items-center justify-center gap-2">
          <span className="font-semibold text-white">Holiday Shopping Event:</span>
          <span>FREE One-Day Prime Delivery on 11 Major US Holidays Decor & Gifts!</span>
          <button
            onClick={onOpenAdvisor}
            className="ml-2 text-white bg-amber-600/60 hover:bg-amber-600 px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 transition-colors"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            Ask Holiday Assistant
          </button>
        </div>

        {/* Main Header Row */}
        <div className="max-w-[1500px] mx-auto px-2 md:px-4 py-2 flex items-center gap-2 md:gap-4">
          {/* Logo */}
          <div
            onClick={() => onSelectHoliday('all')}
            className="flex items-center cursor-pointer p-1.5 hover:ring-1 hover:ring-white rounded transition"
            title="Amazon Holiday Store Home"
          >
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="text-xl md:text-2xl font-bold tracking-tight text-white font-sans">
                  amazon
                </span>
                <span className="text-xs text-amber-400 font-semibold ml-0.5">.holiday</span>
              </div>
              <svg className="w-16 h-2.5 text-amber-400 -mt-1" viewBox="0 0 100 20" fill="none">
                <path
                  d="M5 14 Q 50 25, 95 6"
                  stroke="#ff9900"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <polygon points="90,4 98,6 94,12" fill="#ff9900" />
              </svg>
            </div>
          </div>

          {/* Delivery Location Pill */}
          <button
            onClick={() => setZipModalOpen(true)}
            className="hidden lg:flex items-center gap-1.5 p-1.5 hover:ring-1 hover:ring-white rounded text-left transition"
            title="Change delivery location"
          >
            <MapPin className="w-4 h-4 text-white mt-1 shrink-0" />
            <div className="flex flex-col text-xs leading-tight">
              <span className="text-slate-300 text-[11px]">Deliver to</span>
              <span className="font-bold text-white whitespace-nowrap">
                Seattle {deliveryZip}
              </span>
            </div>
          </button>

          {/* Amazon Broad Search Bar */}
          <div className="flex-1 flex items-center h-10 max-w-3xl relative">
            <div className="relative h-full">
              <button
                type="button"
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className="h-full bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-medium px-2.5 rounded-l-md flex items-center gap-1 border-r border-slate-300 whitespace-nowrap"
              >
                <span className="max-w-[110px] truncate">{currentHolidayName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
              </button>

              {/* Dropdown Menu */}
              {categoryDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setCategoryDropdownOpen(false)}
                  />
                  <div className="absolute left-0 top-full mt-1 w-64 max-h-80 overflow-y-auto bg-white rounded-md shadow-xl border border-slate-200 text-slate-800 z-40 text-xs py-1">
                    <button
                      onClick={() => {
                        onSelectHoliday('all');
                        setCategoryDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 font-medium hover:bg-amber-100 flex items-center justify-between ${
                        selectedHoliday === 'all' ? 'bg-amber-50 text-amber-900 font-bold' : ''
                      }`}
                    >
                      <span>🌟 All 11 Holidays</span>
                      <span className="text-[11px] text-slate-500">26 items</span>
                    </button>
                    <div className="border-t border-slate-200 my-1" />
                    <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Select Holiday
                    </div>
                    {HOLIDAYS.map((holiday) => (
                      <button
                        key={holiday.id}
                        onClick={() => {
                          onSelectHoliday(holiday.id);
                          setCategoryDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 hover:bg-amber-100 flex items-center justify-between ${
                          selectedHoliday === holiday.id
                            ? 'bg-amber-50 text-amber-900 font-bold'
                            : ''
                        }`}
                      >
                        <span className="truncate">{holiday.shortName}</span>
                        <span className="text-[10px] text-slate-400">{holiday.dateStr.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={`Search ${currentHolidayName} goods, decorations, gifts...`}
              className="flex-1 h-full px-3 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#f90] border-0"
            />

            {/* Search Action Button */}
            <button
              aria-label="Search"
              className="h-full px-4 bg-[#febd69] hover:bg-[#f3a847] text-slate-900 rounded-r-md flex items-center justify-center transition-colors"
            >
              <Search className="w-5 h-5 text-slate-800" />
            </button>
          </div>

          {/* Right Header Navigation */}
          <div className="flex items-center gap-1 md:gap-3 shrink-0">
            {/* Language / Region */}
            <div className="hidden xl:flex items-center gap-1 p-1.5 hover:ring-1 hover:ring-white rounded cursor-pointer">
              <span className="text-base">🇺🇸</span>
              <span className="text-xs font-bold uppercase">EN</span>
            </div>

            {/* Account & Lists */}
            <div
              onClick={onOpenOrders}
              className="hidden sm:flex flex-col p-1.5 hover:ring-1 hover:ring-white rounded cursor-pointer text-left leading-tight"
            >
              <span className="text-[11px] text-slate-300">Hello, Holiday Shopper</span>
              <div className="flex items-center gap-0.5 font-bold text-xs">
                <span>Account & Orders</span>
                <ChevronDown className="w-3 h-3 text-slate-300" />
              </div>
            </div>

            {/* Returns & Orders */}
            <button
              onClick={onOpenOrders}
              className="hidden md:flex flex-col p-1.5 hover:ring-1 hover:ring-white rounded text-left leading-tight"
            >
              <span className="text-[11px] text-slate-300">Returns</span>
              <span className="font-bold text-xs">& Orders</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-1 p-1.5 hover:ring-1 hover:ring-white rounded text-white relative transition"
              title="View Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-7 h-7 text-white" />
                <span className="absolute -top-1 left-3.5 bg-[#f08804] text-slate-900 font-bold text-xs rounded-full min-w-[20px] h-[20px] px-1 flex items-center justify-center border-2 border-[#131921]">
                  {cartCount}
                </span>
              </div>
              <span className="hidden sm:inline font-bold text-xs mt-2">Cart</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation Bar (#232f3e) */}
        <div className="bg-[#232f3e] px-2 md:px-4 py-1.5 text-xs text-white flex items-center justify-between border-t border-white/5 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 md:gap-4 shrink-0">
            {/* All Menu Button */}
            <button
              onClick={onOpenSideMenu}
              className="flex items-center gap-1 px-2 py-1 font-bold hover:ring-1 hover:ring-white rounded transition"
            >
              <Menu className="w-4 h-4" />
              <span>All Holidays</span>
            </button>

            {/* Fast Department Links */}
            <button
              onClick={() => onSelectHoliday('all')}
              className={`px-2 py-1 hover:ring-1 hover:ring-white rounded transition whitespace-nowrap ${
                selectedHoliday === 'all' ? 'font-bold text-amber-400' : ''
              }`}
            >
              Today&apos;s Holiday Deals
            </button>
            <button
              onClick={() => onSelectHoliday('christmas')}
              className={`px-2 py-1 hover:ring-1 hover:ring-white rounded transition whitespace-nowrap ${
                selectedHoliday === 'christmas' ? 'font-bold text-amber-400' : ''
              }`}
            >
              Christmas Shop
            </button>
            <button
              onClick={() => onSelectHoliday('halloween')}
              className={`px-2 py-1 hover:ring-1 hover:ring-white rounded transition whitespace-nowrap ${
                selectedHoliday === 'halloween' ? 'font-bold text-amber-400' : ''
              }`}
            >
              Halloween Central
            </button>
            <button
              onClick={() => onSelectHoliday('thanksgiving')}
              className={`px-2 py-1 hover:ring-1 hover:ring-white rounded transition whitespace-nowrap ${
                selectedHoliday === 'thanksgiving' ? 'font-bold text-amber-400' : ''
              }`}
            >
              Thanksgiving Feast
            </button>
            <button
              onClick={() => onSelectHoliday('independence-day')}
              className={`px-2 py-1 hover:ring-1 hover:ring-white rounded transition whitespace-nowrap ${
                selectedHoliday === 'independence-day' ? 'font-bold text-amber-400' : ''
              }`}
            >
              4th of July
            </button>
            <button
              onClick={() => onSelectHoliday('juneteenth')}
              className={`hidden lg:inline-block px-2 py-1 hover:ring-1 hover:ring-white rounded transition whitespace-nowrap ${
                selectedHoliday === 'juneteenth' ? 'font-bold text-amber-400' : ''
              }`}
            >
              Juneteenth
            </button>
            <button
              onClick={() => onSelectHoliday('veterans-day')}
              className={`hidden xl:inline-block px-2 py-1 hover:ring-1 hover:ring-white rounded transition whitespace-nowrap ${
                selectedHoliday === 'veterans-day' ? 'font-bold text-amber-400' : ''
              }`}
            >
              Veterans Tribute
            </button>
            <button
              onClick={() => onSelectHoliday('new-year')}
              className={`hidden lg:inline-block px-2 py-1 hover:ring-1 hover:ring-white rounded transition whitespace-nowrap ${
                selectedHoliday === 'new-year' ? 'font-bold text-amber-400' : ''
              }`}
            >
              New Year Toast
            </button>
          </div>

          {/* AI Advisor Pill */}
          <button
            onClick={onOpenAdvisor}
            className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-full transition shadow-sm shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>Holiday Gift Advisor</span>
          </button>
        </div>
      </header>

      {/* Zip Code Change Modal */}
      {zipModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-6 text-slate-900 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Choose your location</h3>
            <p className="text-xs text-slate-600 mb-4">
              Holiday delivery options and delivery speeds may vary for different locations.
            </p>
            <form onSubmit={handleZipSubmit}>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Enter a US ZIP Code
              </label>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={tempZip}
                  onChange={(e) => setTempZip(e.target.value)}
                  placeholder="e.g. 98101"
                  className="flex-1 px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  maxLength={5}
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 text-xs font-bold rounded border border-[#fcd200]"
                >
                  Apply
                </button>
              </div>
            </form>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setZipModalOpen(false)}
                className="text-xs text-slate-600 hover:text-slate-900 font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
