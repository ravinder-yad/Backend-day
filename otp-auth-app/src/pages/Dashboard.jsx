import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  LogOut, 
  LayoutDashboard, 
  User as UserIcon, 
  Settings, 
  Bell, 
  Search,
  Activity,
  Users,
  Briefcase,
  Zap,
  TrendingUp,
  MoreVertical,
  ChevronRight
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const stats = [
    { title: 'Total Sessions', value: '24', icon: <Activity size={20} />, color: 'text-primary', bg: 'bg-primary' },
    { title: 'Active Projects', value: '12', icon: <Briefcase size={20} />, color: 'text-success', bg: 'bg-success' },
    { title: 'Team Members', value: '08', icon: <Users size={20} />, color: 'text-warning', bg: 'bg-warning' },
    { title: 'System Status', value: 'Live', icon: <Zap size={20} />, color: 'text-danger', bg: 'bg-danger' },
  ];

  return (
    <div className="min-vh-100 bg-light pb-5">
      {/* Premium Glassy Navbar */}
      <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top shadow-sm px-4 py-2">
        <div className="container-fluid">
          <div className="navbar-brand fw-bold d-flex align-items-center gap-2 text-primary">
            <div className="bg-primary p-2 rounded-3 text-white">
              <Zap size={20} fill="white" />
            </div>
            <span style={{ letterSpacing: '-0.5px' }}>AuthPremium</span>
          </div>
          
          <div className="d-none d-md-flex align-items-center bg-light rounded-pill px-3 py-2 mx-auto shadow-inner" style={{ width: '400px' }}>
            <Search size={16} className="text-muted me-2" />
            <input type="text" className="form-control border-0 bg-transparent shadow-none small" placeholder="Search for data, users, or settings..." />
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="position-relative d-none d-sm-block">
               <button className="btn btn-light rounded-circle p-2"><Bell size={20} /></button>
               <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-white" style={{ fontSize: '10px' }}>3</span>
            </div>
            <div className="vr d-none d-sm-block mx-2"></div>
            <div className="d-flex align-items-center gap-2 pe-3 border-end">
              <div className="avatar-circle bg-primary text-white">{user?.name?.charAt(0) || 'U'}</div>
              <div className="text-start d-none d-lg-block">
                <div className="fw-bold small">{user?.name || 'User'}</div>
                <div className="text-muted" style={{ fontSize: '10px' }}>Admin Role</div>
              </div>
            </div>
            <button onClick={logout} className="btn btn-white text-danger border-0 p-2 rounded-circle hover-bg-danger-light">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="container-fluid p-4 mt-2">
        <motion.div variants={container} initial="hidden" animate="show" className="row g-4">
          
          {/* Welcome Card & Visual Chart */}
          <motion.div variants={item} className="col-12 col-lg-8">
            <div className="card border-0 shadow-sm overflow-hidden h-100" style={{ borderRadius: '24px' }}>
              <div className="row g-0 h-100">
                <div className="col-md-7 p-5 text-white" style={{ background: 'linear-gradient(135deg, #0d6efd 0%, #0043a8 100%)' }}>
                  <h1 className="fw-bold mb-3">Hello, {user?.name?.split(' ')[0] || 'User'}! ✨</h1>
                  <p className="opacity-75 mb-4">You've completed 80% of your weekly tasks. Your system performance is at its peak today.</p>
                  <div className="d-flex gap-3">
                    <button className="btn btn-light rounded-pill px-4 fw-bold text-primary shadow-sm">View Analytics</button>
                    <button className="btn btn-link text-white text-decoration-none fw-medium">Settings</button>
                  </div>
                </div>
                <div className="col-md-5 bg-white p-5">
                  <div className="d-flex justify-content-between align-items-end h-100 gap-2">
                    {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                      <div key={i} className="text-center w-100">
                        <div className="chart-bar mx-auto">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                            className="chart-bar-fill"
                          ></motion.div>
                        </div>
                        <div className="text-muted mt-2" style={{ fontSize: '10px' }}>{['M','T','W','T','F','S','S'][i]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* System Health / Quick Info */}
          <motion.div variants={item} className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm h-100 p-4" style={{ borderRadius: '24px' }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h6 className="fw-bold mb-0">System Health</h6>
                <TrendingUp size={18} className="text-success" />
              </div>
              <div className="text-center py-3">
                <div className="position-relative d-inline-block">
                  <svg width="120" height="120" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f0f0f0" strokeWidth="8" />
                    <motion.circle 
                      cx="50" cy="50" r="40" fill="none" stroke="#0d6efd" strokeWidth="8" 
                      strokeDasharray="251.2"
                      initial={{ strokeDashoffset: 251.2 }}
                      animate={{ strokeDashoffset: 251.2 * 0.15 }}
                      transition={{ duration: 2 }}
                    />
                  </svg>
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <div className="fs-4 fw-bold text-primary">85%</div>
                  </div>
                </div>
                <p className="text-muted small mt-3">Memory & CPU are stable</p>
              </div>
              <button className="btn btn-outline-primary w-100 rounded-pill mt-auto fw-bold py-2">Optimize Now</button>
            </div>
          </motion.div>

          {/* Stats Row */}
          {stats.map((stat, i) => (
            <motion.div key={i} variants={item} className="col-12 col-md-6 col-xl-3">
              <div className="card border-0 shadow-sm p-4 h-100 hover-lift" style={{ borderRadius: '24px' }}>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className={`${stat.bg} bg-opacity-10 p-3 rounded-4 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <button className="btn btn-link p-0 text-muted shadow-none"><MoreVertical size={16} /></button>
                </div>
                <div className="text-muted small fw-medium mb-1">{stat.title}</div>
                <div className="fs-3 fw-bold">{stat.value}</div>
                <div className="text-success small mt-2 fw-medium">
                  <TrendingUp size={12} className="me-1" /> +12% from last week
                </div>
              </div>
            </motion.div>
          ))}

          {/* Team Activity Section */}
          <motion.div variants={item} className="col-12 col-xl-8">
            <div className="card border-0 shadow-sm" style={{ borderRadius: '24px' }}>
              <div className="card-header bg-white border-0 p-4 d-flex justify-content-between align-items-center">
                <h5 className="fw-bold mb-0">Active Team Members</h5>
                <button className="btn btn-light rounded-pill px-3 btn-sm fw-bold text-muted">View Analytics</button>
              </div>
              <div className="card-body p-4 pt-0">
                <div className="row g-4">
                  {[
                    { name: 'Alex Johnson', role: 'UI Designer', init: 'AJ', color: 'bg-primary' },
                    { name: 'Sarah Miller', role: 'Developer', init: 'SM', color: 'bg-success' },
                    { name: 'Mike Ross', role: 'Analyst', init: 'MR', color: 'bg-warning' },
                    { name: 'Emma Wilson', role: 'Support', init: 'EW', color: 'bg-danger' }
                  ].map((member, i) => (
                    <div key={i} className="col-12 col-sm-6">
                      <div className="p-3 border rounded-4 d-flex align-items-center justify-content-between bg-light bg-opacity-50">
                        <div className="d-flex align-items-center gap-3">
                          <div className={`avatar-circle ${member.color} text-white`}>{member.init}</div>
                          <div>
                            <div className="fw-bold small">{member.name}</div>
                            <div className="text-muted" style={{ fontSize: '10px' }}>{member.role}</div>
                          </div>
                        </div>
                        <div className="d-flex gap-1">
                           <div className="bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></div>
                           <span className="text-muted" style={{ fontSize: '10px' }}>Online</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Jobs / Alerts */}
          <motion.div variants={item} className="col-12 col-xl-4">
            <div className="card border-0 shadow-sm" style={{ borderRadius: '24px' }}>
              <div className="card-body p-4 text-center">
                 <h5 className="fw-bold mb-4 text-start">Recent Updates</h5>
                 <div className="d-grid gap-3">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="text-start p-3 border-start border-primary border-4 bg-light rounded-3 d-flex justify-content-between align-items-center">
                        <div>
                          <div className="fw-bold small">System Update v2.{i}</div>
                          <div className="text-muted small">New security patches applied</div>
                        </div>
                        <ChevronRight size={16} className="text-muted" />
                      </div>
                    ))}
                 </div>
                 <hr className="my-4 opacity-50" />
                 <div className="p-4 bg-primary bg-opacity-10 rounded-4">
                    <p className="fw-bold text-primary mb-2">Invite your friends!</p>
                    <p className="text-muted small mb-3">Earn premium points for every referral you make.</p>
                    <button className="btn btn-primary w-100 rounded-pill fw-bold py-2 shadow-sm">Invite Team</button>
                 </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
