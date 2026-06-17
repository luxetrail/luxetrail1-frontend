import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const API_URL = 'https://luxetrail1-backend.onrender.com/api';

function App() {
  const [jobs, setJobs] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    jobTitle: ''
  });

  // Fetch jobs from backend
  useEffect(() => {
    axios.get(`${API_URL}/jobs`)
      .then(res => setJobs(res.data))
      .catch(err => console.log('Error fetching jobs:', err));
  }, []);

  // Submit application
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/applications`, formData);
      toast.success(`✅ Application submitted! Tracking: ${res.data.trackingNumber}`);
      setFormData({ fullName: '', email: '', phone: '', jobTitle: '' });
    } catch (error) {
      toast.error('❌ Failed to submit. Please try again.');
    }
  };

  return (
    <div className="app">
      <ToastContainer />
      
      {/* Header */}
      <header className="header">
        <div className="logo">🚀 Luxetrailco</div>
        <button className="toggle-btn" onClick={() => setIsAdmin(!isAdmin)}>
          {isAdmin ? '👤 User' : '🎯 Admin'}
        </button>
      </header>

      {isAdmin ? (
        /* ADMIN DASHBOARD */
        <div className="admin-dashboard">
          <h1>🎯 Admin Dashboard</h1>
          <div className="stats">
            <div className="stat-card">
              <h3>📊 Total Jobs</h3>
              <p>{jobs.length}</p>
            </div>
            <div className="stat-card">
              <h3>📝 Applications</h3>
              <p>1,284</p>
            </div>
          </div>
          <div className="job-list">
            <h2>📋 Job Listings</h2>
            {jobs.map(job => (
              <div key={job.id} className="job-item">
                <span>{job.title}</span>
                <span>{job.company}</span>
                <button>✏️ Edit</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* USER VIEW */
        <div className="user-view">
          {/* Hero */}
          <div className="hero">
            <h1>✨ Find Your Dream Career</h1>
            <p>Apply in 2 minutes. No account needed.</p>
          </div>

          {/* Job Listings */}
          <div className="job-listings">
            <h2>🌟 Featured Jobs</h2>
            {jobs.map(job => (
              <div key={job.id} className="job-card">
                <h3>{job.title}</h3>
                <p>{job.company} • {job.location}</p>
                <p className="salary">{job.salary}</p>
                <button className="apply-btn" onClick={() => setFormData({...formData, jobTitle: job.title})}>
                  Apply Now
                </button>
              </div>
            ))}
          </div>

          {/* Application Form */}
          <div className="apply-form">
            <h2>📝 Quick Application</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Full Name" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} required />
              <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
              <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
              <input type="text" placeholder="Job Title" value={formData.jobTitle} onChange={(e) => setFormData({...formData, jobTitle: e.target.value})} required />
              <button type="submit">🚀 Submit Application</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
