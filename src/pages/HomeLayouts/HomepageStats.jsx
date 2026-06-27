import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FileText, Globe, Lock } from "lucide-react";

const STATS = [
  {
    key: "total",
    label: "Total lessons",
    icon: FileText,
    badge: "All",
    badgeClass: "bg-gray-100 text-gray-500 border border-gray-200",
  },
  {
    key: "publicLessons",
    label: "Public lessons",
    icon: Globe,
    badge: "Visible to all",
    badgeClass: "bg-green-50 text-green-700",
  },
  {
    key: "premiumLessons",
    label: "Premium lessons",
    icon: Lock,
    badge: "Subscribers only",
    badgeClass: "bg-amber-50 text-amber-700",
  },
];

const HomepageStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const axiosSecure = useAxiosSecure();

  const fetchStats = () => {
    setLoading(true);
    setError(false);
    axiosSecure
      .get("/lessons/stats/all")
      .then((res) => setStats(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStats();
  }, [axiosSecure]);

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-center gap-2">
        Failed to load stats.
        <button onClick={fetchStats} className="underline font-medium">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 ">
        <div className=" flex flex-col justify-center items-center">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mt-4 ">
            Platform Overview
          </h2>
          <p className="text-sm text-secondary">Live stats across all lessons</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 border border-gray-100 rounded-xl overflow-hidden animated-bg">
          {STATS.map(({ key, label, icon: Icon, badge, badgeClass }) => (
            <div key={key} className="animated-bg px-5 py-5 flex flex-col justify-center items-center gap-1.5">
              <Icon size={18} className="text-white mb-1" />
              <div className="text-3xl font-medium text-white">
                {loading ? (
                  <div className="h-8 w-14 bg-gray-100 rounded animate-pulse" />
                ) : (
                  (stats?.[key] ?? "—")
                )}
              </div>
              <div className="text-sm text-white">{label}</div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full w-fit mt-1 ${badgeClass}`}
              >
                {badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomepageStats;
