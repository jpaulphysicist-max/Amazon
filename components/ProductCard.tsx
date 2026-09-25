'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/data/types';
import { HOLIDAYS } from '@/data/holidays';
import { Star, Check, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
}

export function ProductCard({ product, onOpenDetail, onAddToCart }: ProductCardProps) {
  const holiday = HOLIDAYS.find((h) => h.id === product.holidayId);

  // Price formatting: whole and decimal cents
  const priceParts = product.price.toFixed(2).split('.');
  const wholePrice = priceParts[0];
  const centPrice = priceParts[1];

  const handleCardClick = () => {
    onOpenDetail(product);
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, e);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xs border border-slate-200/90 p-4 flex flex-col justify-between hover:shadow-lg transition-all duration-200 cursor-pointer relative group h-full"
    >
      {/* Top Badging: Best Seller / Amazon's Choice */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.isBestSeller && (
          <span className="bg-[#e67a00] text-white text-[11px] font-bold px-2 py-0.5 rounded-r shadow-xs">
            #1 Best Seller
          </span>
        )}
        {product.isAmazonChoice && !product.isBestSeller && (
          <span className="bg-[#232f3e] text-white text-[11px] font-medium px-2 py-0.5 rounded-r flex items-center gap-1 shadow-xs">
            <span>Amazon&apos;s</span>
            <span className="text-amber-400 font-bold">Choice</span>
          </span>
        )}
      </div>

      <div>
        {/* Product Image Area */}
        <div className="relative w-full aspect-4/3 bg-[#f7f7f7] rounded-xs overflow-hidden mb-3 border border-slate-100 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-2 group-hover:scale-103 transition-transform duration-200"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Holiday Tag */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
          <span className="font-medium text-slate-700">{product.brand}</span>
          <span className="text-amber-800 font-semibold">{holiday?.shortName}</span>
        </div>

        {/* Title */}
        <h3
          className="text-sm font-medium text-slate-900 line-clamp-2 leading-snug group-hover:text-[#007185] transition-colors mb-1.5"
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Star Rating & Review Count */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center text-[#de7921]">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3.5 h-3.5 fill-current ${
                  star <= Math.round(product.rating)
                    ? 'text-[#de7921]'
                    : 'text-slate-200 fill-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-[#007185] hover:text-[#c45500] hover:underline">
            {product.rating}
          </span>
          <span className="text-xs text-slate-500">
            ({product.ratingCount.toLocaleString()})
          </span>
        </div>

        {/* Deal Tag */}
        {product.dealTag && (
          <div className="mb-1">
            <span className="bg-[#cc0c39] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-xs">
              {product.dealTag}
            </span>
          </div>
        )}

        {/* Price Row */}
        <div className="flex items-baseline gap-1.5 mb-1">
          <div className="flex items-start text-slate-900">
            <span className="text-xs font-semibold mt-1">$</span>
            <span className="text-2xl font-bold tracking-tight">{wholePrice}</span>
            <span className="text-xs font-semibold mt-1">{centPrice}</span>
          </div>
          {product.listPrice && (
            <span className="text-xs text-slate-500 line-through">
              List: ${product.listPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Prime & Delivery Estimate */}
        {product.isPrime && (
          <div className="flex items-center gap-1 text-xs text-slate-700 mb-1">
            <span className="font-bold text-[#00a8e1] tracking-tight">prime</span>
            <Check className="w-3.5 h-3.5 text-[#00a8e1] -ml-0.5" />
            <span className="font-bold text-slate-900">FREE delivery</span>
            <span className="font-bold text-slate-900">Tomorrow</span>
          </div>
        )}

        {/* Stock status */}
        {product.stockCount && product.stockCount < 10 ? (
          <p className="text-[11px] font-medium text-[#b12704] mb-2">
            Only {product.stockCount} left in stock - order soon.
          </p>
        ) : (
          <p className="text-[11px] font-medium text-[#007600] mb-2">In Stock</p>
        )}
      </div>

      {/* Buy Button */}
      <div className="mt-3 pt-2">
        <button
          type="button"
          onClick={handleAddClick}
          className="w-full py-1.5 px-3 bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] text-slate-900 text-xs font-medium rounded-full shadow-xs border border-[#fcd200] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <ShoppingCart className="w-3.5 h-3.5 text-slate-800" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
