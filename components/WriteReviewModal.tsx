'use client';

import React, { useState } from 'react';
import { Star, X, CheckCircle2 } from 'lucide-react';
import { Product, Review } from '@/data/types';

interface WriteReviewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (productId: string, review: Review) => void;
}

export function WriteReviewModal({
  product,
  isOpen,
  onClose,
  onSubmitReview,
}: WriteReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const ratingDescriptions: Record<number, string> = {
    1: 'Poor - Not what I expected for the holidays',
    2: 'Fair - Had several issues',
    3: 'Average - It was okay',
    4: 'Good - Met holiday expectations',
    5: 'Great - Festive, high quality & recommended!',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newReview: Review = {
      id: `user-rev-${Date.now()}`,
      author: author.trim() || 'Verified Amazon Shopper',
      rating,
      title: title.trim(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      content: content.trim(),
      verifiedPurchase: true,
      helpfulCount: 0,
    };

    onSubmitReview(product.id, newReview);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-md max-w-lg w-full p-6 text-slate-900 shadow-2xl border border-slate-300 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-10 text-center flex flex-col items-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mb-2 animate-bounce" />
            <h3 className="text-xl font-bold text-slate-900">Review Submitted!</h3>
            <p className="text-xs text-slate-600 mt-1">
              Thank you for sharing your holiday product review with the Amazon community.
            </p>
          </div>
        ) : (
          <div>
            <div className="border-b border-slate-200 pb-3 mb-4">
              <h2 className="text-lg font-bold text-slate-900">Create Review</h2>
              <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{product.title}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Overall Rating */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Overall rating <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 text-slate-300 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-7 h-7 fill-current ${
                          star <= (hoverRating || rating)
                            ? 'text-[#de7921]'
                            : 'text-slate-300 fill-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-semibold text-slate-700">
                    {ratingDescriptions[hoverRating || rating]}
                  </span>
                </div>
              </div>

              {/* Reviewer Name */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Your Public Name
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. holiday_shopper99"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Headline */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Add a headline <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What's most important to know about this holiday item?"
                  required
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Written Review */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Add a written review <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  placeholder="How did this product perform for your holiday celebration? Mention setup, quality, festive atmosphere, and family reactions..."
                  required
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 p-2.5 rounded text-[11px] text-amber-900 flex items-center justify-between">
                <span>Verified Holiday Purchase Badge will be attached.</span>
                <span className="font-semibold text-emerald-700">✓ Verified Buyer</span>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded border border-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-slate-900 bg-[#ffd814] hover:bg-[#f7ca00] rounded shadow-xs border border-[#fcd200] transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
