import React from 'react';
import AdminTaskbar from './admintaskbar.jsx';

const AdminAnalytics = () => {
  return (
    <div className="bg-[#0F172A] text-[#f8fafc] font-['Inter'] min-h-screen flex antialiased">
      {/* SideNavBar */}
      <AdminTaskbar />

      {/* Main Content Wrapper */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen bg-[#0F172A]">
        {/* TopNavBar (Mobile Only) */}
        <header className="md:hidden flex justify-between items-center w-full px-[24px] py-[16px] sticky top-0 z-50 bg-[#0F172A] border-b border-[#334155] shadow-sm">
          <div className="text-[24px] font-bold text-[#E50914]">CineAdmin</div>
          <div className="flex gap-[16px] text-[#94A3B8]">
            <span className="material-symbols-outlined cursor-pointer hover:text-[#f8fafc] transition-colors">notifications</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-[#f8fafc] transition-colors">contrast</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-[#f8fafc] transition-colors">settings</span>
          </div>
        </header>

        {/* Dashboard Header */}
        <div className="px-[24px] md:px-[48px] py-[32px] border-b border-[#334155] bg-[#1E293B]/50 backdrop-blur-md sticky top-0 z-30 hidden md:flex items-center justify-between">
          <div>
            <h1 className="text-[32px] font-bold text-[#f8fafc]">Analytics Dashboard</h1>
            <p className="text-[14px] text-[#94A3B8] mt-[4px]">Platform performance and user engagement metrics.</p>
          </div>
          <div className="flex gap-[16px] items-center text-[#94A3B8]">
            <button className="material-symbols-outlined cursor-pointer hover:text-[#f8fafc] transition-colors p-[8px] rounded-full hover:bg-[#334155]">notifications</button>
            <div className="w-px h-6 bg-[#334155]"></div>
            <img alt="Administrator Avatar" className="w-10 h-10 rounded-full border border-[#334155] cursor-pointer hover:opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPMTsST48fPxkcsW8Y51wCykPbFXH44gY-XVqEi_UlZQzr8CN17iN1CqvSyay2B2-TrE4MF8LPa8Y07VGLDybq2AR50OdGDSDnL-Dm6-SoXqnavfzGRoq-9dH7MiYokWa0VBk7AmJhdabbBzojwrrkzSfsrtirf_kBfIAuN7caC8PKaWjykTRzGG7M0W9XoqDMckbw4ITWY8AIPNPfaOAj-XfOPsFZ8cPQRDR7TLvX07YisQ2Y37j94PjhyzLXgvOhFt-oyvPda2bu" />
          </div>
        </div>

        <div className="p-[24px] md:p-[48px] max-w-[1440px] mx-auto w-full flex flex-col gap-[48px]">
          {/* Tab Navigation */}
          <div className="flex border-b border-[#334155] gap-[24px]">
            <button className="text-[#E50914] font-bold border-b-2 border-[#E50914] pb-[8px] text-[18px] flex items-center gap-[8px]">
              <span className="material-symbols-outlined">monitoring</span> Movie Analytics
            </button>
            <button className="text-[#94A3B8] font-medium hover:text-[#f8fafc] pb-[8px] text-[18px] flex items-center gap-[8px] transition-colors">
              <span className="material-symbols-outlined">query_stats</span> Revenue Analytics
            </button>
          </div>

          {/* Bento Grid: Analytics Overview */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
            {/* Stat Card 1 */}
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-[24px] flex flex-col justify-between hover:border-[#E50914] transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-[16px]">
                <div className="text-[14px] text-[#94A3B8]">Total Views (30d)</div>
                <span className="material-symbols-outlined text-[#7bd0ff]">visibility</span>
              </div>
              <div>
                <div className="text-[32px] font-bold text-[#f8fafc]">2.4M</div>
                <div className="text-[12px] text-[#E50914] mt-[4px] flex items-center gap-[4px]">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span> +12.5% vs last month
                </div>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-[24px] flex flex-col justify-between hover:border-[#E50914] transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-[16px]">
                <div className="text-[14px] text-[#94A3B8]">Active Subscribers</div>
                <span className="material-symbols-outlined text-[#a7c8ff]">groups</span>
              </div>
              <div>
                <div className="text-[32px] font-bold text-[#f8fafc]">84.2K</div>
                <div className="text-[12px] text-[#E50914] mt-[4px] flex items-center gap-[4px]">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span> +5.2% vs last month
                </div>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-[24px] flex flex-col justify-between hover:border-[#E50914] transition-colors cursor-pointer lg:col-span-2 relative overflow-hidden group">
              <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-[#E50914] to-transparent group-hover:opacity-20 transition-opacity"></div>
              <div className="relative z-10 flex justify-between h-full">
                <div className="flex flex-col justify-between">
                  <div className="text-[14px] text-[#94A3B8]">Top Performing Genre</div>
                  <div>
                    <div className="text-[32px] font-bold text-[#f8fafc]">Sci-Fi & Fantasy</div>
                    <div className="text-[12px] text-[#7bd0ff] mt-[4px]">45% of total watch time</div>
                  </div>
                </div>
                <div className="w-32 h-32 flex items-center justify-center opacity-80">
                  <svg className="w-full h-full text-[#E50914] drop-shadow-lg" viewBox="0 0 100 100">
                    <circle className="opacity-30" cx="50" cy="50" fill="none" r="40" stroke="currentColor" strokeDasharray="180 200" strokeLinecap="round" strokeWidth="8"></circle>
                    <circle cx="50" cy="50" fill="none" r="40" stroke="currentColor" strokeDasharray="120 200" strokeLinecap="round" strokeWidth="8"></circle>
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* Main Charts Area */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-[24px]">
            {/* Line Chart: Viewership Trends */}
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-[24px] lg:col-span-2 flex flex-col h-[400px]">
              <div className="flex justify-between items-center mb-[24px]">
                <h2 className="text-[18px] font-semibold text-[#f8fafc]">Viewership Trends</h2>
                <select className="bg-[#0F172A] border border-[#334155] text-[#94A3B8] text-[14px] rounded-lg px-[16px] py-[8px] focus:ring-[#E50914] focus:border-[#E50914] outline-none">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>This Year</option>
                </select>
              </div>
              <div className="flex-1 relative w-full h-full">
                {/* SVG Line Chart Mockup */}
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 300">
                  {/* Grid */}
                  <line stroke="#334155" strokeWidth="0.5" x1="0" x2="800" y1="50" y2="50"></line>
                  <line stroke="#334155" strokeWidth="0.5" x1="0" x2="800" y1="100" y2="100"></line>
                  <line stroke="#334155" strokeWidth="0.5" x1="0" x2="800" y1="150" y2="150"></line>
                  <line stroke="#334155" strokeWidth="0.5" x1="0" x2="800" y1="200" y2="200"></line>
                  <line stroke="#334155" strokeWidth="0.5" x1="0" x2="800" y1="250" y2="250"></line>
                  {/* Line */}
                  <path className="drop-shadow-[0_4px_12px_rgba(229,9,20,0.5)]" d="M 0 250 C 100 200, 200 280, 300 150 C 400 50, 500 180, 600 100 C 700 80, 800 20" fill="none" stroke="#E50914" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
                  {/* Area under line */}
                  <path d="M 0 250 C 100 200, 200 280, 300 150 C 400 50, 500 180, 600 100 C 700 80, 800 20 L 800 300 L 0 300 Z" fill="url(#gradient-red)" opacity="0.2"></path>
                  <defs>
                    <linearGradient id="gradient-red" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#E50914"></stop>
                      <stop offset="100%" stopColor="#0F172A" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                {/* Axis Labels */}
                <div className="absolute bottom-0 left-0 w-full flex justify-between font-mono text-[13px] text-[#94A3B8] pt-[8px] border-t border-[#334155] mt-[8px]">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>
            </div>

            {/* Bar Chart: Top Movies */}
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-[24px] flex flex-col h-[400px]">
              <h2 className="text-[18px] font-semibold text-[#f8fafc] mb-[24px]">Top Viewed Movies</h2>
              <div className="flex-1 flex flex-col justify-end gap-[16px]">
                {/* Bar Item 1 */}
                <div className="flex items-center gap-[16px]">
                  <div className="w-8 text-right text-[12px] font-medium text-[#94A3B8]">1.</div>
                  <div className="flex-1 h-8 bg-[#0F172A] rounded-r-full relative overflow-hidden border border-[#334155]">
                    <div className="absolute top-0 left-0 h-full bg-[#E50914]" style={{ width: '85%' }}></div>
                  </div>
                  <div className="w-16 text-right font-mono text-[13px] text-[#f8fafc]">850k</div>
                </div>
                {/* Bar Item 2 */}
                <div className="flex items-center gap-[16px]">
                  <div className="w-8 text-right text-[12px] font-medium text-[#94A3B8]">2.</div>
                  <div className="flex-1 h-8 bg-[#0F172A] rounded-r-full relative overflow-hidden border border-[#334155]">
                    <div className="absolute top-0 left-0 h-full bg-[#E50914]/80" style={{ width: '72%' }}></div>
                  </div>
                  <div className="w-16 text-right font-mono text-[13px] text-[#f8fafc]">720k</div>
                </div>
                {/* Bar Item 3 */}
                <div className="flex items-center gap-[16px]">
                  <div className="w-8 text-right text-[12px] font-medium text-[#94A3B8]">3.</div>
                  <div className="flex-1 h-8 bg-[#0F172A] rounded-r-full relative overflow-hidden border border-[#334155]">
                    <div className="absolute top-0 left-0 h-full bg-[#E50914]/60" style={{ width: '60%' }}></div>
                  </div>
                  <div className="w-16 text-right font-mono text-[13px] text-[#f8fafc]">600k</div>
                </div>
                {/* Bar Item 4 */}
                <div className="flex items-center gap-[16px]">
                  <div className="w-8 text-right text-[12px] font-medium text-[#94A3B8]">4.</div>
                  <div className="flex-1 h-8 bg-[#0F172A] rounded-r-full relative overflow-hidden border border-[#334155]">
                    <div className="absolute top-0 left-0 h-full bg-[#E50914]/40" style={{ width: '45%' }}></div>
                  </div>
                  <div className="w-16 text-right font-mono text-[13px] text-[#f8fafc]">450k</div>
                </div>
                {/* Bar Item 5 */}
                <div className="flex items-center gap-[16px]">
                  <div className="w-8 text-right text-[12px] font-medium text-[#94A3B8]">5.</div>
                  <div className="flex-1 h-8 bg-[#0F172A] rounded-r-full relative overflow-hidden border border-[#334155]">
                    <div className="absolute top-0 left-0 h-full bg-[#E50914]/20" style={{ width: '30%' }}></div>
                  </div>
                  <div className="w-16 text-right font-mono text-[13px] text-[#f8fafc]">300k</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminAnalytics;
