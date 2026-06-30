import React, { useState } from "react";
import { Star, MessageSquareCode, Sparkles, Send, CheckCircle2 } from "lucide-react";
import PageHero from "./PageHero.tsx";

interface FeedbackProps {
  onNavigate?: (sectionId: string) => void;
}

export default function Feedback({ onNavigate }: FeedbackProps) {
  const [formData, setFormData] = useState({
    name: "",
    relationship: "Family Member / Circle of Care",
    rating: 5,
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const stats = [
    { label: "Family Satisfaction Index", value: "98.2%" },
    { label: "CQC Quality Standard Met", value: "100%" },
    { label: "Incident Resolution Ratio", value: "48hrs" }
  ];

  const genericFeedbacks = [
    {
      name: "Marcus G.",
      relation: "Parent of resident at 6 Flags House",
      score: 5,
      text: "The transition of my autistic son from his previous clinical ward to 6 Flags House was handled with absolute dedication. Knowing he has a real private ensuite and a tailored sensory garden makes us feel safe every night."
    },
    {
      name: "Elizabeth S.",
      relation: "NHS Continuing Healthcare Broker",
      score: 5,
      text: "PRO Care Homes' staff provide excellent compliance backups. Their live Nourish planning accounts for every trigger, and the team walks beside the resident rather than stepping back during difficult events."
    },
    {
      name: "Kirsty W.",
      relation: "Sister and circle of care member",
      score: 5,
      text: "We love checking the family portal on Nourish! Seeing photos of my sister participating in the local high street baking course makes me so proud."
    }
  ];

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      setFormError("Please fill out your name and the feedback narrative.");
      return;
    }
    setFormError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/feedbacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to submit feedback to MySQL database.");
      }

      setIsSubmitting(false);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Feedback submission failed:", err);
      setIsSubmitting(false);
      setFormError(err.message || "Could not save feedback to secure database. Connection to Hostinger MySQL failed.");
    }
  };

  return (
    <div id="feedback-view" className="animate-fadeIn">
      <PageHero sectionId="feedback" onNavigate={onNavigate} />
      
      <section id="feedback" className="py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Reviews Lists + Feedback Submit Form SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-xs">
          
          {/* Review List Left */}
          <div className="lg:col-span-7 space-y-6 text-slate-800">
            <h3 className="text-base font-bold text-slate-950 border-b border-slate-200 pb-3 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>Verifiable Family & Commissioner Reviews</span>
            </h3>

            {genericFeedbacks.map((f, idx) => (
              <div key={idx} className="bg-white border border-slate-150 p-6 rounded-2xl shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{f.name}</h4>
                    <p className="text-[10px] text-slate-450">{f.relation}</p>
                  </div>
                  <div className="flex items-center text-yellow-500 space-x-0.5">
                    {[...Array(f.score)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-650 text-xs leading-relaxed italic">
                  &ldquo;{f.text}&rdquo;
                </p>
              </div>
            ))}
          </div>

          {/* Feedback Form Right */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-md">
              <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center space-x-2">
                <MessageSquareCode className="w-5 h-5 text-sky-600" />
                <span>Submit Continuous Feedback</span>
              </h3>

              {submitted ? (
                <div className="bg-sky-50 border border-sky-200 p-6 rounded-xl text-center space-y-4 animate-scaleUp text-slate-800">
                  <div className="w-12 h-12 bg-sky-600 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base text-sky-950">Thank You For Co-producing!</h4>
                  <p className="text-slate-700 text-xs leading-relaxed">
                    We have successfully captured your feedback under our continuous review systems. Positive reviews are shared during staff assemblies to bolster spirit, while compliance queries go straight to strategic leads.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", relationship: "Family Member / Circle of Care", rating: 5, message: "" }); }}
                    className="text-xs text-sky-700 hover:underline font-bold block mx-auto"
                  >
                    Submit another review
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitFeedback} className="space-y-4">
                  
                  <div className="space-y-1">
                    <label className="font-bold text-slate-705 block">Your Name / circles *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Thomas Cartwright"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-805"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-705 block">Relationship to Resident</label>
                    <select
                      value={formData.relationship}
                      onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-805"
                    >
                      <option>Family Member / Circle of Care</option>
                      <option>NHS Healthcare Professional</option>
                      <option>Mental Health Case Worker</option>
                      <option>Concerned Resident Representative</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-705 block">Quality Rating (Stars)</label>
                    <select
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-805 font-bold"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ 5 Stars - Exceptional</option>
                      <option value="4">⭐⭐⭐⭐ 4 Stars - Satisfactory</option>
                      <option value="3">⭐⭐⭐ 3 Stars - Average</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-705 block">Your Review / Complaints / Narrative *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Share your experience working with our support workers or managers, or suggest specific changes to our routines..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-850"
                    />
                  </div>

                  {formError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium animate-shake">
                      ⚠️ {formError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition cursor-pointer disabled:opacity-55"
                  >
                    <Send className={`w-4 h-4 ${isSubmitting ? "animate-spin" : ""}`} />
                    <span>{isSubmitting ? "Submitting Review..." : "Post Public Review"}</span>
                  </button>

                  <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                    PRO Care Homes audits all reviews under CQC transparent regulatory procedures. We act with transparency.
                  </p>

                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  </div>
);
}
