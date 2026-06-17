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
    if (!formData.fullName || !formData.email || !formData.phone || !formData.jobTitle) {
      toast.warning('⚠️ Please fill in all fields');
      return;
    }
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
      
      {/* HEADER */}
      <header className="header">
        <div className="logo">🚀 Luxetrailco</div>
        <div className="header-right">
          <button className="theme-btn" onClick={() => document.body.classList.toggle('dark')}>🌙</button>
          <button className="toggle-btn" onClick={() => setIsAdmin(!isAdmin)}>
            {isAdmin ? '👤 User' : '🎯 Admin'}
          </button>
        </div>
      </header>

      {isAdmin ? (
        /* ===== ADMIN DASHBOARD ===== */
        <div className="admin-dashboard">
          <h1>🎯 Admin Dashboard</h1>
          <div className="stats-grid">
            <div className="stat-card"><h3>📊 Total Jobs</h3><p>{jobs.length}</p></div>
            <div className="stat-card"><h3>📝 Applications</h3><p>1,284</p></div>
            <div className="stat-card"><h3>⏳ Pending</h3><p>89</p></div>
            <div className="stat-card"><h3>✅ Approved</h3><p>156</p></div>
          </div>
          <div className="job-list">
            <h2>📋 Job Listings</h2>
            {jobs.map(job => (
              <div key={job.id} className="job-item">
                <span><strong>{job.title}</strong> - {job.company}</span>
                <button>✏️</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ===== USER VIEW ===== */
        <div className="user-view">
          
          {/* HERO SECTION */}
          <div className="hero">
            <div className="hero-badge">🔥 500+ Jobs Posted</div>
            <h1>✨ <span className="gradient">Find Your Dream</span> Career</h1>
            <p>Apply in 2 minutes. No account needed. Join 10,000+ successful candidates.</p>
            <button className="btn-primary" onClick={() => document.getElementById('jobs').scrollIntoView({behavior:'smooth'})}>Browse Jobs →</button>
          </div>

          {/* STATS SECTION */}
          <div className="stats-grid">
            <div className="stat-card"><span className="stat-icon">💼</span><p className="stat-number">500+</p><p className="stat-label">Jobs Posted</p></div>
            <div className="stat-card"><span className="stat-icon">👥</span><p className="stat-number">10K+</p><p className="stat-label">Candidates</p></div>
            <div className="stat-card"><span className="stat-icon">🏢</span><p className="stat-number">200+</p><p className="stat-label">Companies</p></div>
            <div className="stat-card"><span className="stat-icon">⭐</span><p className="stat-number">98%</p><p className="stat-label">Success Rate</p></div>
          </div>

          {/* WHY US SECTION */}
          <div className="section">
            <h2>🌟 Why Luxetrailco?</h2>
            <div className="why-grid">
              <div className="why-card"><span className="why-icon">⚡</span><h4>Fast Apply</h4><p>Apply in under 2 minutes</p></div>
              <div className="why-card"><span className="why-icon">🔒</span><h4>No Account Needed</h4><p>Apply without registering</p></div>
              <div className="why-card"><span className="why-icon">📊</span><h4>Track Progress</h4><p>Real-time application status</p></div>
              <div className="why-card"><span className="why-icon">💼</span><h4>Top Companies</h4><p>Work with industry leaders</p></div>
            </div>
          </div>

          {/* HOW IT WORKS */}
          <div className="section">
            <h2>📋 How It Works</h2>
            <div className="steps">
              <div className="step"><span className="step-num">1</span><h4>Browse Jobs</h4><p>Find your perfect role</p></div>
              <div className="step"><span className="step-num">2</span><h4>Apply Fast</h4><p>Fill in your details</p></div>
              <div className="step"><span className="step-num">3</span><h4>Get Tracked</h4><p>Receive tracking number</p></div>
              <div className="step"><span className="step-num">4</span><h4>Get Hired</h4><p>Land your dream job!</p></div>
            </div>
          </div>

          {/* JOB LISTINGS */}
          <div id="jobs" className="section">
            <h2>🌟 Featured Jobs</h2>
            {jobs.map(job => (
              <div key={job.id} className="job-card">
                <h3>{job.title}</h3>
                <p>{job.company} • {job.location}</p>
                <p className="salary">💰 {job.salary}</p>
                <div className="job-tags">{job.tags?.map(t => <span key={t} className="tag">{t}</span>)}</div>
                <button className="apply-btn" onClick={() => setFormData({...formData, jobTitle: job.title})}>Apply Now</button>
              </div>
            ))}
          </div>

          {/* TESTIMONIALS */}
          <div className="section">
            <h2>💬 What Candidates Say</h2>
            <div className="testimonials">
              <div className="testimonial"><p>"Luxetrailco made my job search so easy!"</p><span>- Sarah K.</span></div>
              <div className="testimonial"><p>"Got hired in 2 weeks. Amazing platform!"</p><span>- Mike R.</span></div>
            </div>
          </div>

          {/* APPLICATION FORM */}
          <div className="section">
            <h2>📝 Quick Application</h2>
            <form className="apply-form" onSubmit={handleSubmit}>
              <input type="text" placeholder="Full Name" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} required />
              <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
              <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
              <select value={formData.jobTitle} onChange={(e) => setFormData({...formData, jobTitle: e.target.value})} required>
                <option value="">Select a job</option>
                {jobs.map(job => <option key={job.id} value={job.title}>{job.title}</option>)}
              </select>
              <button type="submit">🚀 Submit Application</button>
            </form>
          </div>

          {/* FAQ SECTION */}
          <div className="section">
            <h2>❓ FAQ</h2>
            <div className="faq">
              <div className="faq-item"><h4>How do I apply?</h4><p>Fill in the form above and submit.</p></div>
              <div className="faq-item"><h4>Do I need an account?</h4><p>No! Apply without registering.</p></div>
              <div className="faq-item"><h4>How to track my application?</h4><p>Use the tracking number sent to you.</p></div>
            </div>
          </div>

          {/* SUPPORT / CONTACT */}
          <div className="section">
            <h2>📞 Support</h2>
            <div className="support">
              <p>📧 support@luxetrailco.xyz</p>
              <p>📱 +123 456 7890</p>
              <p>💬 WhatsApp: Click the floating button</p>
            </div>
          </div>

          {/* FOOTER */}
          <footer className="footer">
            <p>© 2026 Luxetrailco. Made with ❤️</p>
            <div className="footer-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Contact</a>
            </div>
          </footer>
        </div>
      )}

      {/* WHATSAPP FLOATING BUTTON */}
      <button className="whatsapp-float" onClick={() => window.open('https://wa.me/1234567890?text=Hello%20Luxetrailco!', '_blank')}>
        💬
      </button>
    </div>
  );
}

export default App;
