import { useState, useMemo, useEffect } from 'react';
import Sidebar, { type SidebarPage } from './components/Sidebar';
import Header from './components/Header';
import JobOverview from './components/JobOverview';
import PipelineBoard from './components/PipelineBoard';
import SearchFilters from './components/SearchFilters';
import CandidateTable from './components/CandidateTable';
import CandidateDrawer from './components/CandidateDrawer';
import AddCandidateModal from './components/AddCandidateModal';
import DashboardPage from './components/DashboardPage';
import CandidatesPage from './components/CandidatesPage';
import InterviewsPage from './components/InterviewsPage';
import ReportsPage from './components/ReportsPage';
import SettingsPage from './components/SettingsPage';
import type { Candidate, FilterState, Stage } from './types';
import { mockCandidates, mockJob } from './data/mockData';

const DEFAULT_FILTERS: FilterState = {
  search: '',
  stage: 'All',
  experience: 'Any',
  scoreMin: 0,
  scoreMax: 100,
};

type ViewMode = 'table' | 'pipeline';

function matchesExp(exp: number, range: string): boolean {
  if (range === 'Any') return true;
  if (range === '0-2') return exp >= 0 && exp <= 2;
  if (range === '2-5') return exp > 2 && exp <= 5;
  if (range === '5-10') return exp > 5 && exp <= 10;
  if (range === '10+') return exp > 10;
  return true;
}

const PAGE_META: Record<SidebarPage, { title: string; crumbs: { label: string }[] }> = {
  dashboard:  { title: 'Dashboard', crumbs: [{ label: 'TheHireHub.AI' }, { label: 'Dashboard' }] },
  jobs:       { title: 'Candidate Pipeline', crumbs: [{ label: 'TheHireHub.AI' }, { label: 'Jobs' }, { label: 'Senior Frontend Engineer' }, { label: 'Pipeline' }] },
  candidates: { title: 'All Candidates', crumbs: [{ label: 'TheHireHub.AI' }, { label: 'Candidates' }] },
  interviews: { title: 'Interviews', crumbs: [{ label: 'TheHireHub.AI' }, { label: 'Interviews' }] },
  reports:    { title: 'Reports & Analytics', crumbs: [{ label: 'TheHireHub.AI' }, { label: 'Reports' }] },
  settings:   { title: 'Settings', crumbs: [{ label: 'TheHireHub.AI' }, { label: 'Settings' }] },
};

export default function App() {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState<SidebarPage>('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleUpdateCandidate = (updatedCandidate: Candidate) => {
    setCandidates(prev => prev.map(c => c.id === updatedCandidate.id ? updatedCandidate : c));
    if (selectedCandidate?.id === updatedCandidate.id) {
      setSelectedCandidate(updatedCandidate);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleFilterChange = (patch: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...patch }));
  };

  const filteredCandidates = useMemo(() => {
    return candidates.filter(c => {
      const q = filters.search.toLowerCase();
      if (q && !c.name.toLowerCase().includes(q) && !c.company.toLowerCase().includes(q) && !c.currentRole.toLowerCase().includes(q)) return false;
      if (filters.stage !== 'All' && c.stage !== filters.stage) return false;
      if (!matchesExp(c.experience, filters.experience)) return false;
      if (c.matchScore < filters.scoreMin || c.matchScore > filters.scoreMax) return false;
      return true;
    });
  }, [filters, candidates]);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':  return <DashboardPage />;
      case 'candidates': return <CandidatesPage />;
      case 'interviews': return <InterviewsPage />;
      case 'reports':    return <ReportsPage />;
      case 'settings':   return <SettingsPage />;
      case 'jobs':
      default:
        return (
          <main className="flex-1 overflow-y-auto px-4 md:px-6 py-5 space-y-4">
            <JobOverview job={mockJob} loading={loading} />

            {/* View toggle */}
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-slate-500">
                Showing <span className="font-bold text-slate-900">{loading ? '—' : filteredCandidates.length}</span> candidates
              </h2>
              <div className="flex items-center gap-0.5 border border-slate-200 rounded-lg p-0.5 bg-white shadow-sm">
                {(['table', 'pipeline'] as ViewMode[]).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all capitalize ${viewMode === mode
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
                  >
                    {mode === 'table'
                      ? <span className="flex items-center gap-1.5">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                          <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                        </svg>List
                      </span>
                      : <span className="flex items-center gap-1.5">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                          <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                        </svg>Kanban
                      </span>
                    }
                  </button>
                ))}
              </div>
            </div>

            {viewMode === 'pipeline' && (
              <div className="overflow-x-auto pb-4">
                {loading ? (
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-3 lg:min-w-[900px]">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="flex-1">
                        <div className="skeleton-light h-10 mb-3 rounded-lg" />
                        {[1,2].map(j => <div key={j} className="skeleton-light h-28 mb-3 rounded-xl" />)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <PipelineBoard 
                    candidates={filteredCandidates} 
                    onCandidateClick={setSelectedCandidate} 
                    onDragStart={() => setSelectedCandidate(null)}
                    onDragEnd={(candidateId: string, newStage: Stage, destinationIndex: number) => {
                      setCandidates(prev => {
                        const newCandidates = [...prev];
                        const globalIndex = newCandidates.findIndex(c => c.id === candidateId);
                        if (globalIndex === -1) return prev;
                        
                        // Remove the element from its old position
                        const [draggedCandidate] = newCandidates.splice(globalIndex, 1);
                        const updatedCandidate = { ...draggedCandidate, stage: newStage };
                        
                        // Find what currently occupies the destination index in the filtered stage view
                        const stageFiltered = filteredCandidates.filter(c => c.stage === newStage && c.id !== candidateId);
                        const targetCandidate = stageFiltered[destinationIndex];
                        
                        if (targetCandidate) {
                            const targetGlobalIndex = newCandidates.findIndex(c => c.id === targetCandidate.id);
                            if (targetGlobalIndex !== -1) {
                                newCandidates.splice(targetGlobalIndex, 0, updatedCandidate);
                            } else {
                                newCandidates.push(updatedCandidate);
                            }
                        } else {
                            // If dropped at the end
                            newCandidates.push(updatedCandidate);
                        }
                        
                        return newCandidates;
                      });
                      setSelectedCandidate(null);
                    }}
                  />
                )}
              </div>
            )}

            <SearchFilters filters={filters} onChange={handleFilterChange} resultCount={loading ? 0 : filteredCandidates.length} />
            <CandidateTable candidates={filteredCandidates} onCandidateClick={setSelectedCandidate} loading={loading} />
            <div className="h-4" />
          </main>
        );
    }
  };

  const meta = PAGE_META[activePage];

  return (
    <div className="flex h-[100dvh] overflow-hidden" style={{ background: 'var(--bg-app)' }}>
      <Sidebar
        isOpenOnMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        activePage={activePage}
        onPageChange={page => { setActivePage(page); setIsMobileMenuOpen(false); }}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          onMenuClick={() => setIsMobileMenuOpen(true)}
          onAddCandidate={() => setShowAddModal(true)}
          title={meta.title}
          breadcrumbs={meta.crumbs}
        />
        {renderPage()}
      </div>

      <CandidateDrawer 
        candidate={selectedCandidate} 
        onClose={() => setSelectedCandidate(null)} 
        onUpdateCandidate={handleUpdateCandidate} 
      />
      <AddCandidateModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={(data) => { console.log('New candidate:', data); setShowAddModal(false); }}
      />
    </div>
  );
}
