'use client';

import React from 'react';
import Image from 'next/image';
import { HERO_BANNER, CHRISTMAS_TREE_IMG, HALLOWEEN_DECOR_IMG, THANKSGIVING_ROASTER_IMG, PATRIOTIC_JULY4_IMG } from '@/data/productImages';
import { HolidayId } from '@/data/types';
import { Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface AmazonHeroBannerProps {
  onSelectHoliday: (holiday: HolidayId) => void;
}

export function AmazonHeroBanner({ onSelectHoliday }: AmazonHeroBannerProps) {
  return (
    <div className="relative w-full bg-[#eaeded] pb-4">
      {/* Top Banner Graphic with Gradient Fade */}
      <div className="relative w-full h-[260px] sm:h-[320px] md:h-[400px] overflow-hidden">
        <Image
          src={HERO_BANNER}
          alt="Amazon Holiday Store - Celebrate Every Season"
          fill
          priority
          className="object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Soft Vignette and Bottom Gradient fade into Amazon background #eaeded */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#eaeded] via-[#eaeded]/30 to-black/30 pointer-events-none" />

        {/* Hero Copy Overlay */}
        <div className="absolute top-6 md:top-12 left-4 md:left-12 max-w-xl text-white drop-shadow-md z-10 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-xs px-3 py-1 rounded text-xs font-semibold text-amber-300 mb-2 border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Amazon Holiday Storefront</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight font-sans">
            Decorations, Gifts & Goods for All 11 Major US Holidays
          </h1>
          <p className="text-xs sm:text-sm text-slate-100 mt-2 font-medium">
            From New Year to Christmas, discover millions of holiday essentials with verified customer reviews and fast Prime delivery.
          </p>
        </div>
      </div>

      {/* Floating 4-Column Amazon Card Grid Overlapping Hero */}
      <div className="max-w-[1500px] mx-auto px-3 md:px-6 -mt-16 sm:-mt-24 md:-mt-32 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Christmas & Winter */}
          <div
            onClick={() => onSelectHoliday('christmas')}
            className="bg-white p-4 rounded-xs shadow-md border border-slate-200/80 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow group"
          >
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Christmas & Winter Magic
              </h2>
              <div className="relative w-full h-44 my-3 bg-slate-50 rounded-xs overflow-hidden border border-slate-100">
                <Image
                  src={CHRISTMAS_TREE_IMG}
                  alt="Pre-lit Dunhill Fir Christmas Tree"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs text-slate-600 line-clamp-2">
                Pre-lit 7.5ft trees, hand-blown vintage glass ornaments, fairy lights & cozy family pajamas.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-700 group-hover:underline">
              <span>Shop Christmas deals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Halloween & Trick-or-Treat */}
          <div
            onClick={() => onSelectHoliday('halloween')}
            className="bg-white p-4 rounded-xs shadow-md border border-slate-200/80 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow group"
          >
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Halloween Yard & Haunt
              </h2>
              <div className="relative w-full h-44 my-3 bg-slate-50 rounded-xs overflow-hidden border border-slate-100">
                <Image
                  src={HALLOWEEN_DECOR_IMG}
                  alt="Jack-O-Lantern Ceramic Set"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs text-slate-600 line-clamp-2">
                Illuminated ceramic jack-o-lanterns, giant 200” spider webs, and 120-piece candy cauldrons.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-700 group-hover:underline">
              <span>Explore Halloween</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Thanksgiving Feast */}
          <div
            onClick={() => onSelectHoliday('thanksgiving')}
            className="bg-white p-4 rounded-xs shadow-md border border-slate-200/80 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow group"
          >
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Thanksgiving Feast & Kitchen
              </h2>
              <div className="relative w-full h-44 my-3 bg-slate-50 rounded-xs overflow-hidden border border-slate-100">
                <Image
                  src={THANKSGIVING_ROASTER_IMG}
                  alt="Thanksgiving Turkey Roaster Pan"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs text-slate-600 line-clamp-2">
                Cuisinart 16-inch turkey roasters with V-rack, instant meat thermometers, and harvest table runners.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-700 group-hover:underline">
              <span>Shop Thanksgiving</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Patriotic & Heritage */}
          <div
            onClick={() => onSelectHoliday('independence-day')}
            className="bg-white p-4 rounded-xs shadow-md border border-slate-200/80 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow group"
          >
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Patriotic & National Honors
              </h2>
              <div className="relative w-full h-44 my-3 bg-slate-50 rounded-xs overflow-hidden border border-slate-100">
                <Image
                  src={PATRIOTIC_JULY4_IMG}
                  alt="American Heavyweight Flag & BBQ Gear"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs text-slate-600 line-clamp-2">
                Memorial Day, Juneteenth, 4th of July, Labor Day & Veterans Day flags, BBQ sets, and challenge coin cases.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-700 group-hover:underline">
              <span>View Patriotic gear</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Amazon Holiday Confidence Bar */}
        <div className="mt-4 bg-white p-3 rounded-xs border border-slate-200/70 flex flex-wrap items-center justify-around gap-4 text-xs text-slate-700 shadow-xs">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#007185]" />
            <span className="font-semibold text-slate-900">Guaranteed Holiday Delivery:</span>
            <span>Free 1-Day & 2-Day Shipping for Prime Members</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#007185]" />
            <span className="font-semibold text-slate-900">Verified Customer Reviews:</span>
            <span>Real photos and ratings from verified buyers</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#007185]" />
            <span className="font-semibold text-slate-900">Extended Holiday Returns:</span>
            <span>Hassle-free returns through January 31st</span>
          </div>
        </div>
      </div>
    </div>
  );
}
