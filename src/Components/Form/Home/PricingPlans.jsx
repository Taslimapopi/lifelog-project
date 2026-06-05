import React from "react";
import { Link } from "react-router";
import { FaCheck, FaTimes, FaBolt, FaCrown } from "react-icons/fa";

const PricingPlans = () => {
  return (
    <section className="py-20 bg-base-100 border-t border-base-200">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-accent/10 text-accent uppercase tracking-wider">
            Membership Plans
          </span>
          <h2 className="text-4xl font-extrabold mt-4 mb-6 tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Choose Your Journey
          </h2>
          <p className="text-gray-500 text-lg">
            Unlock premium features and get deeper insights from lifelogs using our advanced AI engine.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Free Tier Card */}
          <div className="card bg-base-200 shadow-xl border border-base-300 hover:border-accent/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <div className="card-body p-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-base-content flex items-center gap-2">
                      <FaBolt className="text-primary text-xl" /> Free Tier
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">For casual learners</p>
                  </div>
                  <span className="badge badge-secondary badge-outline px-3 py-2 font-semibold">Starter</span>
                </div>
                
                <div className="my-6">
                  <span className="text-5xl font-extrabold">$0</span>
                  <span className="text-gray-500">/ forever</span>
                </div>

                <hr className="border-base-300 my-6" />

                {/* Features List */}
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm text-base-content/80">
                    <FaCheck className="text-success text-base flex-shrink-0" />
                    <span>Read all public life lessons</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-base-content/80">
                    <FaCheck className="text-success text-base flex-shrink-0" />
                    <span>Write comments and leave likes</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-base-content/80">
                    <FaCheck className="text-success text-base flex-shrink-0" />
                    <span>Bookmark favorite lessons</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-400 line-through">
                    <FaTimes className="text-error text-base flex-shrink-0" />
                    <span>Unlimited AI summaries (Powered by Gemini)</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-400 line-through">
                    <FaTimes className="text-error text-base flex-shrink-0" />
                    <span>Access to Premium exclusive lessons</span>
                  </li>
                </ul>
              </div>

              <div className="card-actions mt-8">
                <Link to="/auth/register" className="btn btn-outline btn-block border-base-300 hover:bg-neutral hover:text-white transition">
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>

          {/* Premium Tier Card */}
          <div className="card bg-neutral text-neutral-content shadow-2xl border-2 border-primary hover:border-accent transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            {/* Ribbon Tag */}
            <div className="absolute top-0 right-0 bg-primary text-black font-extrabold text-[10px] uppercase tracking-widest px-8 py-1.5 rotate-45 translate-x-7 translate-y-3 shadow-md">
              Best Value
            </div>
            
            <div className="card-body p-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                      <FaCrown className="text-primary text-xl" /> Premium Membership
                    </h3>
                    <p className="text-sm text-primary/80 mt-1 font-medium">For growth seekers</p>
                  </div>
                </div>
                
                <div className="my-6">
                  <span className="text-5xl font-extrabold text-white">$10</span>
                  <span className="text-primary/70">/ month</span>
                </div>

                <hr className="border-primary/20 my-6" />

                {/* Features List */}
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm text-white">
                    <FaCheck className="text-primary text-base flex-shrink-0" />
                    <span>Read all public life lessons</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white">
                    <FaCheck className="text-primary text-base flex-shrink-0" />
                    <span>Write comments and leave likes</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white">
                    <FaCheck className="text-primary text-base flex-shrink-0" />
                    <span>Bookmark favorite lessons</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white font-semibold">
                    <FaCheck className="text-primary text-base flex-shrink-0" />
                    <span>✨ Unlimited AI summaries (Powered by Gemini)</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white font-semibold">
                    <FaCheck className="text-primary text-base flex-shrink-0" />
                    <span>Access to Premium exclusive lessons</span>
                  </li>
                </ul>
              </div>

              <div className="card-actions mt-8">
                <Link to="/pricing" className="btn btn-primary btn-block text-black font-extrabold shadow-lg shadow-primary/20 hover:scale-[1.02] transition">
                  Upgrade to Premium
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
