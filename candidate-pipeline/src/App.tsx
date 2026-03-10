import { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import JobOverview from './components/JobOverview';
import PipelineBoard from './components/PipelineBoard';
import SearchFilters from './components/SearchFilters';
import CandidateTable from './components/CandidateTable';
import CandidateDrawer from './components/CandidateDrawer';
import type { Candidate, FilterState } from './types';
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

export default function App() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simulate initial load
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleFilterChange = (patch: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...patch }));
  };

  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter(c => {
      const q = filters.search.toLowerCase();
      if (q && !c.name.toLowerCase().includes(q) && !c.company.toLowerCase().includes(q) && !c.currentRole.toLowerCase().includes(q)) return false;
      if (filters.stage !== 'All' && c.stage !== filters.stage) return false;
      if (!matchesExp(c.experience, filters.experience)) return false;
      if (c.matchScore < filters.scoreMin || c.matchScore > filters.scoreMax) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="flex h-[100dvh] overflow-hidden" style={{ background: 'var(--bg-app)' }}>
      <Sidebar
        isOpenOnMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header
          onMenuClick={() => setIsMobileMenuOpen(true)}
          title="Candidate Pipeline"
          breadcrumbs={[
            { label: 'TheHireHub.AI' },
            { label: 'Jobs' },
            { label: 'Senior Frontend Engineer' },
            { label: 'Pipeline' },
          ]}
        />

        <main className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-5 space-y-4 md:space-y-5">
          {/* Job Overview */}
          <JobOverview job={mockJob} loading={loading} />

          {/* View mode toggle */}
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white/50">
              Showing <span className="text-white font-bold">{loading ? '—' : filteredCandidates.length}</span> candidates
            </h2>
            <div className="flex items-center gap-1 bg-black/20 backdrop-blur-md border border-white/5 rounded-lg p-1">
              {(['table', 'pipeline'] as ViewMode[]).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all capitalize ${viewMode === mode
                    ? 'bg-yellow-400 text-black shadow-[0_0_10px_rgba(250,204,21,0.3)]'
                    : 'text-white/40 hover:text-white/80'
                    }`}
                >
                  {mode === 'table'
                    ? <span className="flex items-center gap-1.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                        <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                      </svg>
                      List
                    </span>
                    : <span className="flex items-center gap-1.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                      </svg>
                      Kanban
                    </span>
                  }
                </button>
              ))}
            </div>
          </div>

          {/* Pipeline board (Kanban) */}
          {viewMode === 'pipeline' && (
            <div className="overflow-x-auto pb-4">
              <div>
                {loading ? (
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-3 lg:min-w-[900px]">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="flex-1">
                        <div className="skeleton-dark h-12 mb-3 rounded-xl" />
                        {[1, 2].map(j => <div key={j} className="skeleton-dark h-28 mb-3 rounded-xl" />)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <PipelineBoard candidates={filteredCandidates} onCandidateClick={setSelectedCandidate} />
                )}
              </div>
            </div>
          )}

          {/* Search & Filters */}
          <SearchFilters
            filters={filters}
            onChange={handleFilterChange}
            resultCount={loading ? 0 : filteredCandidates.length}
          />

          {/* Candidate Table */}
          <CandidateTable
            candidates={filteredCandidates}
            onCandidateClick={setSelectedCandidate}
            loading={loading}
          />

          <div className="h-4" /> {/* bottom spacing */}
        </main>
      </div>

      {/* Detail drawer */}
      <CandidateDrawer
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
      />
    </div>
  );
}
