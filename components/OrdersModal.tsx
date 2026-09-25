'use client';

import React from 'react';
import Image from 'next/image';
import { Order } from '@/data/types';
import { X, Package, Truck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export function OrdersModal({ isOpen, onClose, orders }: OrdersModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded max-w-2xl w-full text-slate-900 shadow-2xl border border-slate-300 relative max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#131921] text-white rounded-t">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold">Your Holiday Orders & Deliveries</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <Package className="w-12 h-12 mx-auto text-slate-300" />
              <h3 className="text-base font-bold text-slate-800">No holiday orders placed yet</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Explore our festive collections for Christmas, Halloween, 4th of July, Thanksgiving, and more to start shopping!
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="border border-slate-300 rounded overflow-hidden shadow-xs bg-white text-xs"
              >
                {/* Order Top Strip */}
                <div className="bg-[#f0f2f2] px-4 py-2.5 border-b border-slate-300 flex flex-wrap items-center justify-between gap-2 text-slate-600">
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-500">
                        Order Placed
                      </span>
                      <span className="font-semibold text-slate-800">{order.date}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-500">
                        Total
                      </span>
                      <span className="font-semibold text-slate-800">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-500">
                        Ship To
                      </span>
                      <span className="font-semibold text-slate-800">
                        {order.shippingAddress.name}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="block text-[10px] uppercase font-bold text-slate-500">
                      Order # {order.id}
                    </span>
                    <span className="text-[#007185] hover:underline cursor-pointer font-medium">
                      View invoice
                    </span>
                  </div>
                </div>

                {/* Order Body */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                      <Truck className="w-4 h-4 text-emerald-600" />
                      <span>Arriving by {order.deliveryEstimate}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded font-semibold text-[11px]">
                      {order.status}
                    </span>
                  </div>

                  {/* Items list */}
                  <div className="space-y-2 pt-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="relative w-12 h-12 bg-slate-50 border border-slate-200 rounded shrink-0 overflow-hidden">
                          <Image
                            src={item.product.image}
                            alt={item.product.title}
                            fill
                            className="object-contain p-0.5"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-900 truncate">
                            {item.product.title}
                          </p>
                          <p className="text-[11px] text-slate-500">Qty: {item.quantity} · ${item.product.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 text-xs font-bold rounded-full shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
