'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CartItem, Order } from '@/data/types';
import {
  X,
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Package,
  Calendar,
  Lock,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderPlaced: (order: Order) => void;
  defaultZip: string;
}

export function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onOrderPlaced,
  defaultZip,
}: CheckoutModalProps) {
  const [step, setStep] = useState<'checkout' | 'success'>('checkout');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Address fields
  const [name, setName] = useState('John Paul');
  const [street, setStreet] = useState('410 Terry Ave N');
  const [city, setCity] = useState('Seattle');
  const [state, setState] = useState('WA');
  const [zip, setZip] = useState(defaultZip || '98109');

  // Delivery Speed
  const [deliverySpeed, setDeliverySpeed] = useState<'prime' | 'standard'>('prime');

  if (!isOpen) return null;

  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingFee = deliverySpeed === 'prime' ? 0.0 : 4.99;
  const estimatedTax = itemsTotal * 0.088; // ~8.8%
  const grandTotal = itemsTotal + shippingFee + estimatedTax;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = `114-${Math.floor(1000000 + Math.random() * 9000000)}-${Math.floor(
      1000000 + Math.random() * 9000000
    )}`;

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + (deliverySpeed === 'prime' ? 1 : 4));
    const deliveryEstimateStr = deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });

    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      items: cartItems.map((c) => ({
        product: c.product,
        quantity: c.quantity,
      })),
      total: grandTotal,
      shippingAddress: {
        name,
        street,
        city,
        state,
        zip,
      },
      deliveryEstimate: deliveryEstimateStr,
      status: 'Preparing',
    };

    setCreatedOrder(newOrder);
    onOrderPlaced(newOrder);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded max-w-3xl w-full text-slate-900 shadow-2xl border border-slate-300 relative max-h-[92vh] flex flex-col">
        {/* Amazon Checkout Top Header */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#f0f2f2] border-b border-slate-300">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-slate-900">amazon</span>
            <span className="text-xs text-amber-700 font-bold">Checkout</span>
            <div className="flex items-center gap-1 text-slate-500 text-xs ml-3 pl-3 border-l border-slate-300">
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Secure 256-Bit SSL</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'checkout' ? (
          <form onSubmit={handlePlaceOrder} className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Step 1: Shipping Address */}
            <div className="border border-slate-200 rounded p-4 bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">
                  1
                </span>
                <span>Select Holiday Delivery Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Street Address</label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                    className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <label className="block text-slate-700 font-semibold mb-1">State</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                      className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-slate-700 font-semibold mb-1">ZIP Code</label>
                    <input
                      type="text"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      required
                      className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="border border-slate-200 rounded p-4 bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">
                  2
                </span>
                <span>Payment Method</span>
              </h3>

              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-3 p-2 bg-white border border-amber-300 rounded cursor-pointer">
                  <input type="radio" name="payment" defaultChecked className="text-amber-600" />
                  <CreditCard className="w-4 h-4 text-blue-700" />
                  <div className="flex-1">
                    <span className="font-bold text-slate-900">Amazon Prime Rewards Visa</span>
                    <span className="text-slate-500 ml-2">ending in 4242 · Earn 5% back</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">Exp 08/29</span>
                </label>
                <label className="flex items-center gap-3 p-2 bg-white border border-slate-200 rounded cursor-pointer">
                  <input type="radio" name="payment" className="text-amber-600" />
                  <div className="flex-1">
                    <span className="font-semibold text-slate-900">Amazon Gift Card Balance</span>
                    <span className="text-emerald-700 font-bold ml-2">$75.00 available</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 3: Review Items & Delivery Option */}
            <div className="border border-slate-200 rounded p-4 bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">
                  3
                </span>
                <span>Review Items & Choose Delivery Speed</span>
              </h3>

              {/* Delivery Speed Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
                <label
                  onClick={() => setDeliverySpeed('prime')}
                  className={`p-3 rounded border cursor-pointer flex flex-col justify-between ${
                    deliverySpeed === 'prime'
                      ? 'bg-amber-50/80 border-amber-500 shadow-xs'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">FREE Prime Delivery</span>
                    <span className="text-[#00a8e1] font-bold text-xs">prime</span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-1">Tomorrow, 7 AM - 11 AM</p>
                  <span className="text-emerald-700 font-semibold text-[11px] mt-2">$0.00</span>
                </label>

                <label
                  onClick={() => setDeliverySpeed('standard')}
                  className={`p-3 rounded border cursor-pointer flex flex-col justify-between ${
                    deliverySpeed === 'standard'
                      ? 'bg-amber-50/80 border-amber-500 shadow-xs'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Standard Shipping</span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-1">3-5 business days</p>
                  <span className="text-slate-700 font-semibold text-[11px] mt-2">$4.99</span>
                </label>
              </div>

              {/* Items Thumbnails */}
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between text-xs py-1 border-b border-slate-200 last:border-b-0"
                  >
                    <div className="flex items-center gap-2 max-w-[80%]">
                      <div className="relative w-8 h-8 bg-white border border-slate-200 rounded shrink-0 overflow-hidden">
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          fill
                          className="object-contain p-0.5"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="truncate">{item.product.title}</span>
                      <span className="text-slate-500 shrink-0">x{item.quantity}</span>
                    </div>
                    <span className="font-bold text-slate-900 shrink-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary & Place Order */}
            <div className="p-4 bg-slate-100 rounded border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items ({cartItems.reduce((a, b) => a + b.quantity, 0)}):</span>
                <span>${itemsTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping & Handling:</span>
                <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Estimated Tax to be collected:</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-300 pt-2 flex justify-between text-sm font-bold text-[#b12704]">
                <span>Order Total:</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] text-slate-900 text-sm font-bold rounded-full shadow-xs border border-[#fcd200] transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-slate-900" />
                  <span>Place your order in USD</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-500 text-center pt-1">
                By placing your order, you agree to Amazon&apos;s Holiday Conditions of Use and Privacy Notice.
              </p>
            </div>
          </form>
        ) : (
          /* Confirmation Success Screen */
          <div className="p-8 text-center space-y-6 flex-1 overflow-y-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-2">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Thank you, your order has been placed!
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                An email confirmation has been sent to jpaul.physicist@gmail.com
              </p>
              <div className="mt-2 inline-block px-3 py-1 bg-slate-100 rounded text-xs font-mono text-slate-800 font-bold border border-slate-200">
                Order #{createdOrder?.id}
              </div>
            </div>

            {/* Tracking Card */}
            <div className="max-w-md mx-auto bg-slate-50 p-4 rounded border border-slate-200 text-left text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-amber-600" />
                  <span className="font-bold text-slate-900">Guaranteed Holiday Delivery</span>
                </div>
                <span className="font-semibold text-emerald-700">
                  {createdOrder?.deliveryEstimate}
                </span>
              </div>

              {/* Visual tracking timeline */}
              <div className="py-2">
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-600 mb-1">
                  <span className="font-bold text-emerald-700">Ordered</span>
                  <span>Shipped</span>
                  <span>Out for Delivery</span>
                  <span>Delivered</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-1/4 rounded-full" />
                </div>
              </div>

              <div className="text-[11px] text-slate-500">
                Shipping to: <span className="font-medium text-slate-800">{createdOrder?.shippingAddress.street}, {createdOrder?.shippingAddress.city}, {createdOrder?.shippingAddress.state}</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-6 bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 text-xs font-bold rounded-full shadow-xs border border-[#fcd200]"
              >
                Continue Holiday Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
