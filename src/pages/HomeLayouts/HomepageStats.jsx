import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const HomepageStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    axiosSecure.get('/lessons/stats/all')
      .then(res => {
        setStats(res.data);
        setLoading(false);
        console.log('Stats fetched:', res.data);
      })
      .catch(() => setLoading(false));
  }, [axiosSecure]);

  if (loading) {
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-white rounded-3xl shadow animate-pulse">Loading stats...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-white rounded-3xl shadow">
      <div className="text-center">
        <div className="text-5xl font-bold text-blue-600">{stats?.total}</div>
        <div className="text-sm text-gray-500">Total Lessons</div>
      </div>
      <div className="text-center">
        <div className="text-5xl font-bold text-blue-600">{stats?.publicLessons}</div>
        <div className="text-sm text-gray-500">Public Lesson</div>
      </div>
      <div>
       
        <div className="text-5xl font-bold text-blue-600">{stats?.premiumLessons}</div>
        <div className="text-sm text-gray-500">Premium Lessons</div>
      </div>
    </div>
  );
};

export default HomepageStats;