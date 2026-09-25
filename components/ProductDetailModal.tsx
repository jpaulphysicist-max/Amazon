'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product, Review } from '@/data/types';
import { HOLIDAYS } from '@/data/holidays';
import {
  X,
  Star,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Lock,
  ThumbsUp,
  Search,
  MessageSquarePlus,
  Share2,
} from 'lucide-react';
import { WriteReviewModal } from './WriteReviewModal';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onAddReview: (productId: string, review: Review) => void;
  deliveryZip: string;
}

export function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNow,
  onAddReview,
  deliveryZip,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [reviewFilterRating, setReviewFilterRating] = useState<number | 'all'>('all');
  const [reviewSearch, setReviewSearch] = useState('');
  const [helpfulVotedIds, setHelpfulVotedIds] = useState<Record<string, boolean>>({});

  if (!isOpen || !product) return null;

  const holiday = HOLIDAYS.find((h) => h.id === product.holidayId);
  const priceParts = product.price.toFixed(2).split('.');
  const wholePrice = priceParts[0];
  const centPrice = priceParts[1];

  const handleHelpfulClick = (reviewId: string) => {
    if (helpfulVotedIds[reviewId]) return;
    setHelpfulVotedIds((prev) => ({ ...prev, [reviewId]: true }));
  };

  // Filter reviews
  const filteredReviews = product.reviews.filter((r) => {
    if (reviewFilterRating !== 'all' && r.rating !== reviewFilterRating) return false;
    if (
      reviewSearch.trim() &&
      !r.title.toLowerCase().includes(reviewSearch.toLowerCase()) &&
      !r.content.toLowerCase().includes(reviewSearch.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
        <div className="bg-white rounded-sm max-w-5xl w-full my-6 text-slate-900 shadow-2xl border border-slate-300 relative max-h-[92vh] flex flex-col">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200 bg-slate-50 shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="font-semibold text-slate-900">{holiday?.name}</span>
              <span>&rsaquo;</span>
              <span>{product.department}</span>
              <span>&rsaquo;</span>
              <span className="truncate max-w-[200px] sm:max-w-md">{product.title}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="overflow-y-auto px-4 sm:px-6 py-6 space-y-8 flex-1">
            {/* Top 3-Column Product Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Column 1: Image Showcase (md:col-span-5) */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="relative w-full aspect-4/3 bg-[#f8f9fa] rounded border border-slate-200 overflow-hidden flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-contain p-4"
                    referrerPolicy="no-referrer"
                  />
                  {product.isBestSeller && (
                    <span className="absolute top-2 left-2 bg-[#e67a00] text-white text-[11px] font-bold px-2 py-0.5 rounded-r shadow-xs">
                      #1 Best Seller in {holiday?.shortName}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-600 mt-2 text-center">
                  Roll over image to zoom · Authentic Holiday Spec
                </p>
              </div>

              {/* Column 2: Product Specifications & Bullet Details (md:col-span-4) */}
              <div className="md:col-span-4 flex flex-col">
                <div className="text-xs text-[#007185] font-semibold hover:underline cursor-pointer mb-1">
                  Visit the {product.brand} Store
                </div>
                <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-2">
                  {product.title}
                </h1>

                {/* Star Rating Overview */}
                <div className="flex items-center gap-1.5 pb-3 border-b border-slate-200 mb-3">
                  <span className="text-xs font-bold text-slate-900">{product.rating}</span>
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
                  <a
                    href="#reviews-section"
                    className="text-xs text-[#007185] hover:text-[#c45500] hover:underline"
                  >
                    {product.ratingCount.toLocaleString()} ratings
                  </a>
                </div>

                {/* Price Display */}
                <div className="mb-4">
                  {product.dealTag && (
                    <div className="mb-1">
                      <span className="bg-[#cc0c39] text-white text-xs font-bold px-2 py-0.5 rounded-xs">
                        {product.dealTag}
                      </span>
                    </div>
                  )}
                  <div className="flex items-baseline gap-1.5">
                    <div className="flex items-start text-slate-900">
                      <span className="text-xs font-semibold mt-1">$</span>
                      <span className="text-3xl font-bold tracking-tight">{wholePrice}</span>
                      <span className="text-xs font-semibold mt-1">{centPrice}</span>
                    </div>
                    {product.listPrice && (
                      <span className="text-xs text-slate-500 line-through">
                        List Price: ${product.listPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    No Import Fees Deposit & FREE Shipping
                  </div>
                </div>

                {/* About this Item Bullets */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-wider">
                    About this item:
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                    {product.about.map((bullet, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specs Table */}
                <div className="border-t border-slate-200 pt-3">
                  <h4 className="text-xs font-bold text-slate-900 mb-2">Specifications:</h4>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <React.Fragment key={key}>
                        <span className="text-slate-500 font-medium">{key}</span>
                        <span className="text-slate-900 font-semibold">{val}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Column 3: Amazon Buy Box (md:col-span-3) */}
              <div className="md:col-span-3">
                <div className="border border-slate-300 rounded p-4 bg-white shadow-xs">
                  <div className="flex items-start text-slate-900 mb-2">
                    <span className="text-xs font-semibold mt-1">$</span>
                    <span className="text-2xl font-bold tracking-tight">{wholePrice}</span>
                    <span className="text-xs font-semibold mt-1">{centPrice}</span>
                  </div>

                  {/* Prime Delivery */}
                  {product.isPrime && (
                    <div className="text-xs text-slate-700 mb-2">
                      <div className="flex items-center gap-1 font-bold">
                        <span className="text-[#00a8e1]">prime</span>
                        <Check className="w-3.5 h-3.5 text-[#00a8e1]" />
                        <span>FREE delivery</span>
                      </div>
                      <div className="font-semibold text-slate-900 mt-0.5">
                        Tomorrow, 7 AM - 11 AM
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        Order within <span className="text-emerald-700 font-medium">4 hrs 12 mins</span>
                      </div>
                    </div>
                  )}

                  {/* Deliver to address */}
                  <div className="text-[11px] text-[#007185] flex items-center gap-1 mb-3">
                    <Truck className="w-3.5 h-3.5 shrink-0" />
                    <span>Deliver to Seattle {deliveryZip}</span>
                  </div>

                  {/* Stock status */}
                  <div className="text-sm font-semibold text-[#007600] mb-3">
                    {product.inStock ? 'In Stock' : 'Currently Unavailable'}
                  </div>

                  {/* Quantity selector */}
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Quantity:
                    </label>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full text-xs p-1.5 border border-slate-300 rounded bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(product, quantity);
                    }}
                    className="w-full py-2 px-4 mb-2 bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] text-slate-900 text-xs font-bold rounded-full shadow-xs border border-[#fcd200] transition cursor-pointer"
                  >
                    Add to Cart
                  </button>

                  {/* Buy Now button */}
                  <button
                    type="button"
                    onClick={() => {
                      onBuyNow(product, quantity);
                    }}
                    className="w-full py-2 px-4 mb-3 bg-[#ffa41c] hover:bg-[#fa8900] active:bg-[#e67a00] text-slate-900 text-xs font-bold rounded-full shadow-xs border border-[#ff8f00] transition cursor-pointer"
                  >
                    Buy Now
                  </button>

                  {/* Ships from / Sold by */}
                  <div className="text-[11px] text-slate-500 space-y-1 border-t border-slate-200 pt-3">
                    <div className="flex justify-between">
                      <span>Ships from</span>
                      <span className="text-slate-900 font-medium">Amazon.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sold by</span>
                      <span className="text-slate-900 font-medium">{product.brand} Direct</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Returns</span>
                      <span className="text-blue-700 font-medium">30-day refund / replacement</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600 pt-1">
                      <Lock className="w-3 h-3 text-slate-500" />
                      <span>Secure transaction</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200" />

            {/* Customer Reviews & Ratings System */}
            <div id="reviews-section" className="pt-2">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span>Customer Reviews</span>
                <span className="text-xs font-normal text-slate-500">
                  Verified holiday purchases & feedback
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left: Star Breakdown and "Write a Review" button (md:col-span-4) */}
                <div className="md:col-span-4">
                  {/* Rating summary */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center text-[#de7921]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 fill-current ${
                            star <= Math.round(product.rating)
                              ? 'text-[#de7921]'
                              : 'text-slate-200 fill-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-bold text-slate-900">{product.rating} out of 5</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">
                    {product.ratingCount.toLocaleString()} global ratings
                  </p>

                  {/* 5-Star Distribution Bars */}
                  <div className="space-y-2 mb-6">
                    {([5, 4, 3, 2, 1] as const).map((star) => {
                      const pct = product.ratingDistribution[star] || 0;
                      return (
                        <button
                          key={star}
                          onClick={() =>
                            setReviewFilterRating(reviewFilterRating === star ? 'all' : star)
                          }
                          className={`w-full flex items-center gap-2 text-xs text-left group p-1 rounded hover:bg-slate-100 transition ${
                            reviewFilterRating === star ? 'bg-amber-100 font-bold' : ''
                          }`}
                        >
                          <span className="w-12 text-[#007185] group-hover:underline font-medium">
                            {star} star
                          </span>
                          <div className="flex-1 h-4 bg-slate-100 rounded-xs overflow-hidden border border-slate-200">
                            <div
                              className="h-full bg-[#de7921] rounded-xs"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="w-8 text-right font-mono text-slate-600">{pct}%</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Write Review Callout */}
                  <div className="p-4 bg-slate-50 rounded border border-slate-200 text-left">
                    <h4 className="text-sm font-bold text-slate-900 mb-1">Review this product</h4>
                    <p className="text-xs text-slate-600 mb-3">
                      Share your thoughts with other holiday shoppers and help families choose the best decorations and gifts.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsWriteReviewOpen(true)}
                      className="w-full py-2 px-4 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded border border-slate-300 shadow-2xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquarePlus className="w-4 h-4 text-slate-700" />
                      <span>Write a customer review</span>
                    </button>
                  </div>
                </div>

                {/* Right: Reviews List & Filter Controls (md:col-span-8) */}
                <div className="md:col-span-8">
                  {/* Filter and Search Bar for Reviews */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-700">Filter:</span>
                      <select
                        value={reviewFilterRating}
                        onChange={(e) =>
                          setReviewFilterRating(
                            e.target.value === 'all' ? 'all' : Number(e.target.value)
                          )
                        }
                        className="text-xs p-1.5 border border-slate-300 rounded bg-white"
                      >
                        <option value="all">All star ratings</option>
                        <option value="5">5 stars only</option>
                        <option value="4">4 stars only</option>
                        <option value="3">3 stars only</option>
                        <option value="2">2 stars only</option>
                        <option value="1">1 star only</option>
                      </select>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        value={reviewSearch}
                        onChange={(e) => setReviewSearch(e.target.value)}
                        placeholder="Search customer reviews..."
                        className="w-full sm:w-60 text-xs px-3 py-1.5 pl-8 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-6">
                    {filteredReviews.length === 0 ? (
                      <div className="p-8 text-center bg-slate-50 rounded border border-dashed border-slate-300 text-xs text-slate-500">
                        No reviews found matching your filter criteria. Try selecting &quot;All star ratings&quot; or write the first review!
                      </div>
                    ) : (
                      filteredReviews.map((review) => {
                        const isHelpfulClicked = helpfulVotedIds[review.id];
                        const totalHelpful = review.helpfulCount + (isHelpfulClicked ? 1 : 0);

                        return (
                          <div key={review.id} className="text-left space-y-1.5 border-b border-slate-100 pb-5">
                            {/* Author */}
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold">
                                {review.author.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-xs font-semibold text-slate-900">
                                {review.author}
                              </span>
                            </div>

                            {/* Stars + Title */}
                            <div className="flex items-center gap-2">
                              <div className="flex items-center text-[#de7921]">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-3.5 h-3.5 fill-current ${
                                      star <= review.rating
                                        ? 'text-[#de7921]'
                                        : 'text-slate-200 fill-slate-200'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs font-bold text-slate-900">
                                {review.title}
                              </span>
                            </div>

                            {/* Date & Verified Purchase */}
                            <div className="text-[11px] text-slate-500 flex items-center gap-2">
                              <span>Reviewed in the United States on {review.date}</span>
                              {review.verifiedPurchase && (
                                <>
                                  <span>·</span>
                                  <span className="text-[#c45500] font-semibold">
                                    Verified Purchase
                                  </span>
                                </>
                              )}
                            </div>

                            {/* Review Content */}
                            <p className="text-xs text-slate-800 leading-relaxed pt-1">
                              {review.content}
                            </p>

                            {/* Helpful button */}
                            <div className="flex items-center gap-3 pt-2">
                              <button
                                type="button"
                                onClick={() => handleHelpfulClick(review.id)}
                                disabled={isHelpfulClicked}
                                className={`text-xs px-3 py-1 rounded border shadow-2xs transition flex items-center gap-1 ${
                                  isHelpfulClicked
                                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <ThumbsUp className="w-3 h-3" />
                                <span>{isHelpfulClicked ? 'Helpful' : 'Helpful'}</span>
                              </button>
                              <span className="text-[11px] text-slate-500">
                                {totalHelpful} {totalHelpful === 1 ? 'person' : 'people'} found this helpful
                              </span>
                              {isHelpfulClicked && (
                                <span className="text-[11px] text-emerald-600 font-medium">
                                  Thank you for your feedback!
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Creation Sub-Modal */}
      <WriteReviewModal
        product={product}
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        onSubmitReview={onAddReview}
      />
    </>
  );
}
