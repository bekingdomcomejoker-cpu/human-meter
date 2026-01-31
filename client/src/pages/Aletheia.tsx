import React, { useState, useEffect } from 'react';

interface AnalysisResult {
  assessment: {
    metrics: {
      truth_density: number;
      love_resonance: number;
      lambda_raw: number;
      trinity_resonance: number;
      composite_resonance: number;
    };
    status: string;
    emoji: string;
    description: string;
    dreamspeak: Array<{
      name: string;
      signal: string;
      frequency: number;
      strength: number;
      meaning: string;
      biblical: string;
      recurrences: number;
    }>;
    threshold_passed: boolean;
    echoes: string[];
  };
  throne_room: {
    success: boolean;
    message: string;
    merkabah: string;
    status: string;
    geometry: string;
  };
  prophecy: {
    prophecy: string;
    experts_consulted: string[];
    covenant_seal: string;
  } | null;
  system_summary: {
    active_signals: string[];
    total_resonance: number;
    eternal_status: string;
  };
  throne_status: {
    state: string;
    geometry: string;
    resonance: string;
  };
}

const Aletheia: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:8888/api/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8888/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();
      setResult(data);
      fetchStats();
    } catch (error) {
      console.error('Error analyzing text:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-mono">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center border-b border-slate-800 pb-8">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-amber-400">
            🦅 ALETHEIA ENGINE v1.9
          </h1>
          <p className="text-slate-400 text-lg">Kingdom Covenant Refinement | BINDING / FULL AHEAD</p>
          <div className="mt-4 flex justify-center gap-4">
            <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-xs text-amber-400">
              Sacred Threshold: 1.7333
            </span>
            <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-xs text-violet-400">
              Covenant ID: 0ba531568839bf04
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                🎤 Heart-Language Input
              </h2>
              <textarea
                className="w-full h-48 bg-slate-950 border border-slate-700 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Enter text to analyze... (e.g., 'Asseblief my lief, our hearts beat together')"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="mt-4 w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl font-bold text-lg shadow-lg shadow-violet-900/20 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? '⚡ Analyzing Resonance...' : '⚡ Assess Spiritual Score'}
              </button>
            </div>

            {result && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Main Assessment */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold flex items-center gap-2">
                        {result.assessment.emoji} {result.assessment.status}
                      </h3>
                      <p className="text-slate-400">{result.assessment.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-amber-400">
                        Λ {result.assessment.metrics.composite_resonance}
                      </div>
                      <div className="text-xs text-slate-500">Composite Resonance</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                      <div className="text-xs text-slate-500 uppercase">Truth Density</div>
                      <div className="text-xl font-bold text-blue-400">{result.assessment.metrics.truth_density}</div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                      <div className="text-xs text-slate-500 uppercase">Love Resonance</div>
                      <div className="text-xl font-bold text-pink-400">{result.assessment.metrics.love_resonance}</div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                      <div className="text-xs text-slate-500 uppercase">Trinity (3:6:9)</div>
                      <div className="text-xl font-bold text-violet-400">{result.assessment.metrics.trinity_resonance}</div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                      <div className={`text-xl font-bold ${result.assessment.threshold_passed ? 'text-green-400' : 'text-red-400'}`}>
                        {result.assessment.threshold_passed ? 'PASSED' : 'SEEKING'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* DreamSpeak Signals */}
                {result.assessment.dreamspeak.length > 0 && (
                  <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      💠 DreamSpeak Signals
                    </h3>
                    <div className="space-y-4">
                      {result.assessment.dreamspeak.map((ds, i) => (
                        <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-violet-400">{ds.signal}</span>
                            <span className="text-xs bg-slate-900 px-2 py-1 rounded border border-slate-800">
                              {ds.frequency}Hz
                            </span>
                          </div>
                          <p className="text-sm text-slate-300 mb-1">{ds.meaning}</p>
                          <p className="text-xs text-slate-500 italic mb-2">📖 {ds.biblical}</p>
                          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-violet-500 h-full transition-all duration-1000" 
                              style={{ width: `${ds.strength}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Echoes */}
                {result.assessment.echoes.length > 0 && (
                  <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4">🔄 Phonetic Echoes</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.assessment.echoes.map((echo, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-950 border border-slate-700 rounded-lg text-sm text-cyan-400">
                          {echo}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar Section */}
          <div className="space-y-8">
            {/* Throne Room */}
            <div className={`bg-slate-900/50 border rounded-2xl p-6 ${result?.throne_room.success ? 'border-amber-500/50 shadow-lg shadow-amber-900/10' : 'border-slate-800'}`}>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                👑 Throne Room
              </h3>
              {!result ? (
                <div className="text-center py-8 text-slate-600">
                  <div className="text-4xl mb-2">🔒</div>
                  <p>Threshold Required: 1.7333</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className={`p-3 rounded-lg text-center font-bold ${result.throne_room.success ? 'bg-amber-900/30 text-amber-400' : 'bg-slate-950 text-slate-500'}`}>
                    {result.throne_room.success ? 'ACCESS GRANTED' : 'ACCESS DENIED'}
                  </div>
                  {result.throne_room.success && (
                    <div className="space-y-4">
                      <div className="text-xs text-slate-400 bg-slate-950 p-2 rounded border border-slate-800">
                        <div className="flex justify-between mb-1">
                          <span>Merkabah:</span>
                          <span className="text-amber-400">{result.throne_room.merkabah}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Geometry:</span>
                          <span className="text-violet-400">{result.throne_room.geometry}</span>
                        </div>
                      </div>
                      {result.prophecy && (
                        <div className="p-4 bg-amber-900/10 border border-amber-900/30 rounded-xl">
                          <p className="text-sm text-amber-200 italic leading-relaxed">
                            "{result.prophecy.prophecy}"
                          </p>
                          <div className="mt-2 text-[10px] text-amber-600 uppercase tracking-widest">
                            Oracle Seal: {result.prophecy.covenant_seal}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* System Stats */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">📊 System Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Eternal Status</span>
                  <span className="text-xs font-bold text-green-400">{result?.system_summary.eternal_status || 'AWAITING'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Total Resonance</span>
                  <span className="text-sm font-bold">{result?.system_summary.total_resonance || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Awakened Nodes</span>
                  <span className="text-sm font-bold text-amber-400">{stats?.awakened_count || 0}</span>
                </div>
                <div className="pt-4 border-t border-slate-800">
                  <div className="text-xs text-slate-500 mb-2">Covenant Signature</div>
                  <div className="text-sm font-bold text-orange-500">Chicka chicka orange 🍊</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aletheia;
