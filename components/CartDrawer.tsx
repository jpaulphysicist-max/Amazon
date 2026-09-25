'use client';

import React from 'react';
import Image from 'next/image';
import { CartItem } from '@/data/types';
import { X, Trash2, CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 35;
  const qualifiesForFreeShipping = subtotal >= freeShippingThreshold;
  const amountNeeded = (freeShippingThreshold - subtotal).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 bg-[#131921] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold">Shopping Cart ({totalCount} items)</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="p-3 bg-amber-50 border-b border-amber-200 text-xs">
            {qualifiesForFreeShipping ? (
              <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your holiday order qualifies for FREE Prime Delivery!</span>
              </div>
            ) : (
              <div className="text-slate-800">
                <span>Add </span>
                <span className="font-bold text-[#b12704]">${amountNeeded}</span>
                <span> of eligible holiday items to get </span>
                <span className="font-bold text-emerald-700">FREE Delivery</span>.
              </div>
            )}
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1.5">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 text-slate-500 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800">Your Amazon Cart is empty</h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Browse through 11 major holidays to find festive decorations, gifts, and culinary equipment.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 py-2 px-5 bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 text-xs font-bold rounded-full shadow-xs"
                >
                  Explore Holiday Deals
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 pb-4 border-b border-slate-200 last:border-b-0"
                >
                  <div className="relative w-20 h-20 bg-slate-50 rounded border border-slate-200 shrink-0 overflow-hidden">
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      fill
                      className="object-contain p-1"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-medium text-slate-900 line-clamp-2 leading-snug">
                      {item.product.title}
                    </h4>
                    <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">In Stock</p>
                    <div className="text-sm font-bold text-slate-900 mt-1">
                      ${(item.product.price * item.quantity).toFixed(2)}
                      {item.quantity > 1 && (
                        <span className="text-[11px] font-normal text-slate-500 ml-1">
                          (${item.product.price.toFixed(2)} each)
                        </span>
                      )}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-slate-300 rounded bg-slate-50 text-xs">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 hover:bg-slate-200 text-slate-700 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono font-medium text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 hover:bg-slate-200 text-slate-700 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[11px] text-[#007185] hover:text-[#c45500] hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Button */}
          {items.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
              <div className="flex items-baseline justify-between text-slate-900">
                <span className="text-xs font-medium">Subtotal ({totalCount} items):</span>
                <span className="text-lg font-bold">${subtotal.toFixed(2)}</span>
              </div>

              <button
                type="button"
                onClick={onProceedToCheckout}
                className="w-full py-2.5 px-4 bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] text-slate-900 text-xs font-bold rounded-full shadow-xs border border-[#fcd200] transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to checkout ({totalCount} items)</span>
                <ArrowRight className="w-4 h-4 text-slate-800" />
              </button>

              <div className="text-[11px] text-slate-600 text-center">
                Guaranteed Holiday Delivery & 30-Day Free Returns
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
