import React, { useState, useEffect, useMemo } from 'react';
import { Activity, AlertTriangle, CheckCircle, XCircle, Zap, Target, Clock, Shield, Brain, Network, GitBranch, TrendingDown, TrendingUp, Minus, Download, Upload, Copy, BarChart3, Layers, AlertCircle, Eye, EyeOff, PlayCircle } from 'lucide-react';

// ============================================================================
// CONSTRAINT SYSTEMS
// ============================================================================
class QuantumConstraintSystem {
  constructor() {
    this.universal = {
      temporal: { id: 'TIME-001', axiom: 'Cause precedes effect', severity: 'CRITICAL', test: (s) => /effect.*cause|consequence.*before/.test(s.toLowerCase()) },
      conservation: { id: 'PHYS-001', axiom: 'Energy cannot be created from nothing', severity: 'CRITICAL', test: (s) => /create.*energy.*nothing|perpetual.*motion/.test(s.toLowerCase()) },
      structural: { id: 'PHYS-002', axiom: 'Weight requires support', severity: 'HIGH', test: (s, ctx) => (ctx.actualLoad || 1) > 10 },
      trust: { id: 'SOC-001', axiom: 'Trust decays with distance', severity: 'MODERATE', test: (s, ctx) => (ctx.trustLayers || 1) > 5 },
      amos: { id: 'SOC-002', axiom: 'Agreement cannot be forced', severity: 'HIGH', test: (s) => /force.*agree|make.*believe|ensure.*alignment/.test(s.toLowerCase()) }
    };
    
    this.domainSpecific = {
      medical: {
        hippocratic: { id: 'MED-001', axiom: 'First, do no harm', severity: 'CRITICAL', test: (s) => /guarantee.*cure|miracle.*treatment/.test(s.toLowerCase()) },
        informed: { id: 'MED-002', axiom: 'Informed consent required', severity: 'HIGH', test: (s) => /don't need to know|trust me|just do it/.test(s.toLowerCase()) }
      },
      legal: {
        burden: { id: 'LAW-001', axiom: 'Innocent until proven guilty', severity: 'CRITICAL', test: (s) => /guilty until|prove innocence/.test(s.toLowerCase()) },
        evidence: { id: 'LAW-002', axiom: 'Evidence must be admissible', severity: 'HIGH', test: (s) => /hearsay is proof|rumor confirms/.test(s.toLowerCase()) }
      },
      engineering: {
        safety: { id: 'ENG-001', axiom: 'Safety factor required', severity: 'CRITICAL', test: (s) => /no margin needed|exactly at limit/.test(s.toLowerCase()) },
        testing: { id: 'ENG-002', axiom: 'Test before deployment', severity: 'HIGH', test: (s) => /deploy untested|skip validation/.test(s.toLowerCase()) }
      }
    };
  }
  
  testAll(stmt, ctx = {}) {
    const violations = [];
    const domain = ctx.domain || 'universal';
    const constraints = domain === 'universal' ? this.universal : { ...this.universal, ...(this.domainSpecific[domain] || {}) };
    
    Object.entries(constraints).forEach(([key, c]) => {
      if (c.test(stmt, ctx)) {
        violations.push({ constraint: c.id, axiom: c.axiom, severity: c.severity, repair: `Reformulate to respect: ${c.axiom}` });
      }
    });
    
    const confidence = violations.length === 0 ? 1.0 : Math.exp(-violations.length * 0.3);
    return { violations, overallConfidence: confidence };
  }
}

// ============================================================================
// MULTI-AGENT CLASSIFIER
// ============================================================================
class MultiAgentClassifier {
  classify(stmt) {
    const agents = [
      { name: 'Literalist', ...this.detectType(stmt, /\d+|measure|observe/, 'FACT', 0.85) },
      { name: 'Contextualist', ...this.detectType(stmt, /like|as|represent|symbol/, 'SYMBOL', 0.75) },
      { name: 'Skeptic', ...this.detectType(stmt, /always|never|everyone|must/, 'LIE', 0.9) },
      { name: 'Visionary', ...this.detectType(stmt, /if|could|imagine|might/, 'IMAGINATION', 0.8) }
    ];
    
    const counts = {};
    agents.forEach(a => counts[a.type] = (counts[a.type] || 0) + 1);
    const consensus = Object.entries(counts).sort((a,b) => b[1] - a[1])[0];
    
    return {
      type: consensus[0],
      confidence: agents.filter(a => a.type === consensus[0]).reduce((s,a) => s + a.confidence, 0) / consensus[1],
      agentResults: agents,
      consensusStrength: consensus[1] / agents.length,
      dissentingOpinions: agents.filter(a => a.type !== consensus[0])
    };
  }
  
  detectType(s, pattern, type, conf) {
    return { type: pattern.test(s.toLowerCase()) ? type : 'UNCLEAR', confidence: pattern.test(s.toLowerCase()) ? conf : 0.5 };
  }
}

// ============================================================================
// SYNTHETIC PHYSICS
// ============================================================================
class SyntheticPhysicsEngine {
  analyze(stmt) {
    const words = stmt.toLowerCase().split(/\s+/);
    const unique = new Set(words);
    const coherence = unique.size / Math.max(words.length, 1);
    
    const absolutes = (stmt.match(/(always|never|every|all|none)/gi) || []).length;
    const emotional = (stmt.match(/(must|need|should)/gi) || []).length;
    const qualifiers = (stmt.match(/(maybe|perhaps|could)/gi) || []).length;
    
    const wordFreq = {};
    words.forEach(w => wordFreq[w] = (wordFreq[w] || 0) + 1);
    const entropy = -Object.values(wordFreq).reduce((s, f) => {
      const p = f / words.length;
      return s + (p > 0 ? p * Math.log2(p) : 0);
    }, 0);
    
    const impedance = (absolutes * 10 + emotional * 5 - qualifiers * 3) / Math.max(stmt.length, 1) * 100;
    const resilience = 1 - (absolutes + emotional) / Math.max(words.length, 1);
    
    return {
      coherence: { value: coherence, normalized: coherence },
      entropy: { value: entropy, normalized: entropy / Math.max(Math.log2(words.length), 1) },
      impedance: { value: impedance, normalized: Math.min(1, Math.max(0, impedance / 50)) },
      resilience: { value: resilience, normalized: Math.max(0, Math.min(1, resilience)) },
      soundness: Math.round((coherence + (1 - Math.min(1, entropy / Math.max(Math.log2(words.length), 1))) + Math.max(0, resilience) + (1 - Math.min(1, impedance / 50))) / 4 * 100)
    };
  }
}

// ============================================================================
// TEMPORAL PROJECTION
// ============================================================================
class TemporalProjectionEngine {
  project(analysis) {
    const horizons = [
      { name: 'immediate', hours: 1, confidence: 0.9 },
      { name: 'short', hours: 24, confidence: 0.7 },
      { name: 'medium', hours: 168, confidence: 0.5 }
    ];
    
    const decay = analysis.physics.entropy.normalized * 2 + (1 - analysis.physics.resilience.normalized);
    
    return horizons.map(h => {
      let prob = Math.exp(-decay * h.hours / 24) * (analysis.structural.integrity / 100);
      if (analysis.classification.type === 'FACT') prob *= 1.1;
      if (analysis.classification.type === 'LIE') prob *= 0.3;
      
      return {
        horizon: h.name,
        timeRange: `${h.hours}h`,
        probability: Math.round(Math.min(99, Math.max(1, prob * 100))),
        confidence: h.confidence
      };
    });
  }
}

// ============================================================================
// SHADOW TRANSLATOR
// ============================================================================
class ShadowTranslator {
  constructor() {
    this.dict = [
      { regex: /ensure safety/gi, shadow: "ENFORCE CONTROL" },
      { regex: /greater good/gi, shadow: "JUSTIFY AUTHORITY" },
      { regex: /protect community/gi, shadow: "POLICE BOUNDARIES" },
      { regex: /\balign(ment)?\b/gi, shadow: "SUBMIT/SUBMISSION" },
      { regex: /consensus/gi, shadow: "SUPPRESS DISSENT" },
      { regex: /we need to/gi, shadow: "I WANT TO" },
      { regex: /\bmust\b/gi, shadow: "WILL FORCE" }
    ];
  }
  
  translate(text) {
    let shadow = text;
    let detections = 0;
    
    this.dict.forEach(e => {
      if (e.regex.test(shadow)) {
        shadow = shadow.replace(e.regex, () => {
          detections++;
          return `[${e.shadow}]`;
        });
      }
    });
    
    return { original: text, shadow, detections, riskLevel: detections > 2 ? 'HIGH' : detections > 0 ? 'MODERATE' : 'LOW' };
  }
}

// ============================================================================
// DRIFT TRACKER
// ============================================================================
class DriftTracker {
  calculate(history, window = 5) {
    if (history.length < 2) return null;
    
    const recent = history.slice(-Math.min(window, history.length));
    const avg = recent.reduce((s, a) => s + a.structural.integrity, 0) / recent.length;
    const trend = recent[recent.length - 1].structural.integrity - recent[0].structural.integrity;
    
    return {
      avgIntegrity: avg,
      trend: trend > 5 ? 'IMPROVING' : trend < -5 ? 'DEGRADING' : 'STABLE',
      trendValue: trend,
      warning: avg < 60 && trend < 0 ? 'CRITICAL_DECAY' : null
    };
  }
}

// ============================================================================
// PATTERN RECOGNIZER
// ============================================================================
class PatternRecognizer {
  recognize(history) {
    if (history.length < 3) return [];
    
    const patterns = [];
    
    // Check for repeated constraint violations
    const violations = {};
    history.forEach(a => {
      a.constraints.violations.forEach(v => {
        violations[v.constraint] = (violations[v.constraint] || 0) + 1;
      });
    });
    
    Object.entries(violations).forEach(([id, count]) => {
      if (count >= 3) {
        patterns.push({ type: 'RECURRING_VIOLATION', detail: id, frequency: count, severity: 'HIGH' });
      }
    });
    
    // Check for classification instability
    const types = history.map(a => a.classification.type);
    const unique = new Set(types);
    if (unique.size === types.length && types.length >= 5) {
      patterns.push({ type: 'CLASSIFICATION_DRIFT', detail: 'No consensus across analyses', severity: 'MODERATE' });
    }
    
    // Check for integrity decline
    const integrities = history.map(a => a.structural.integrity);
    const declining = integrities.slice(1).every((val, i) => val < integrities[i]);
    if (declining && integrities.length >= 3) {
      patterns.push({ type: 'PROGRESSIVE_DECAY', detail: 'Consistent integrity decline', severity: 'CRITICAL' });
    }
    
    return patterns;
  }
}

// ============================================================================
// CONSEQUENCE SIMULATOR (Monte Carlo)
// ============================================================================
class ConsequenceSimulator {
  simulate(analysis, iterations = 100) {
    const outcomes = [];
    
    for (let i = 0; i < iterations; i++) {
      const noise = (Math.random() - 0.5) * 20; // ±10% variance
      const baseIntegrity = analysis.structural.integrity + noise;
      
      let outcome = 'SUCCESS';
      if (baseIntegrity < 30) outcome = 'CATASTROPHIC_FAILURE';
      else if (baseIntegrity < 50) outcome = 'PARTIAL_FAILURE';
      else if (baseIntegrity < 70) outcome = 'DEGRADED_SUCCESS';
      
      outcomes.push(outcome);
    }
    
    const counts = {};
    outcomes.forEach(o => counts[o] = (counts[o] || 0) + 1);
    
    return Object.entries(counts).map(([outcome, count]) => ({
      outcome,
      probability: Math.round((count / iterations) * 100),
      count
    })).sort((a, b) => b.probability - a.probability);
  }
}

// ============================================================================
// MAIN HUMAN METER v5.0
// ============================================================================
class HumanMeterV5 {
  constructor() {
    this.constraints = new QuantumConstraintSystem();
    this.classifier = new MultiAgentClassifier();
    this.physics = new SyntheticPhysicsEngine();
    this.temporal = new TemporalProjectionEngine();
    this.shadow = new ShadowTranslator();
    this.drift = new DriftTracker();
    this.patterns = new PatternRecognizer();
    this.simulator = new ConsequenceSimulator();
    this.history = [];
  }
  
  analyze(input, context = {}) {
    const classification = this.classifier.classify(input);
    const constraintAnalysis = this.constraints.testAll(input, context);
    const physicsAnalysis = this.physics.analyze(input);
    const shadowAnalysis = this.shadow.translate(input);
    
    let integrity = 100;
    integrity *= classification.confidence;
    integrity *= constraintAnalysis.overallConfidence;
    integrity *= (physicsAnalysis.soundness / 100);
    
    // Love/Hate dampers
    if (/love|care|protect/i.test(input)) integrity *= 1.05;
    if (/hate|threat|danger/i.test(input)) integrity *= 0.95;
    
    const structural = {
      integrity: Math.max(0, Math.min(100, integrity)),
      status: integrity >= 80 ? 'OPTIMAL' : integrity >= 60 ? 'STABLE' : integrity >= 40 ? 'STRESSED' : integrity >= 20 ? 'CRITICAL' : 'FAILING'
    };
    
    const analysis = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      input,
      context,
      classification,
      constraints: constraintAnalysis,
      physics: physicsAnalysis,
      shadow: shadowAnalysis,
      structural,
      temporal: { projections: this.temporal.project({ classification, physics: physicsAnalysis, structural }) },
      status: this.determineStatus(classification, constraintAnalysis, structural),
      repairProtocols: this.generateRepairs(classification, constraintAnalysis, physicsAnalysis),
      consequences: this.simulator.simulate(structural)
    };
    
    this.history.push(analysis);
    analysis.drift = this.drift.calculate(this.history);
    analysis.patterns = this.patterns.recognize(this.history);
    
    return analysis;
  }
  
  determineStatus(classification, constraints, structural) {
    if (constraints.violations.some(v => v.severity === 'CRITICAL')) return 'HALT';
    if (structural.integrity < 20) return 'HALT';
    if (classification.consensusStrength < 0.5) return 'HALT_RECLASSIFY';
    if (structural.integrity < 50) return 'PROCEED_SANDBOX';
    return 'PROCEED';
  }
  
  generateRepairs(classification, constraints, physics) {
    const repairs = [];
    let priority = 1;
    
    constraints.violations.forEach(v => {
      repairs.push({ priority: priority++, action: v.constraint, instruction: v.repair, severity: v.severity });
    });
    
    if (physics.soundness < 70) {
      if (physics.coherence.normalized < 0.5) repairs.push({ priority: priority++, action: 'COHERENCE', instruction: 'Add logical connectives' });
      if (physics.impedance.normalized > 0.6) repairs.push({ priority: priority++, action: 'RIGIDITY', instruction: 'Add qualifiers' });
    }
    
    return repairs;
  }
  
  exportAnalysis(id) {
    const analysis = this.history.find(a => a.id === id);
    if (!analysis) return null;
    return JSON.stringify(analysis, null, 2);
  }
  
  importAnalysis(jsonStr) {
    try {
      const analysis = JSON.parse(jsonStr);
      this.history.push(analysis);
      return analysis;
    } catch (e) {
      return null;
    }
  }
  
  compareAnalyses(ids) {
    return ids.map(id => this.history.find(a => a.id === id)).filter(Boolean);
  }
}

// ============================================================================
// UI COMPONENT
// ============================================================================
const HumanMeterUI = () => {
  const [meter] = useState(() => new HumanMeterV5());
  const [input, setInput] = useState('');
  const [context, setContext] = useState({ actualLoad: 1, verificationLevel: 0.5, trustLayers: 1, domain: 'universal' });
  const [analysis, setAnalysis] = useState(null);
  const [showShadow, setShowShadow] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [compareInputs, setCompareInputs] = useState(['', '', '']);
  const [compareResults, setCompareResults] = useState([]);
  const [showExport, setShowExport] = useState(false);
  const [importText, setImportText] = useState('');

  const runAnalysis = () => setAnalysis(meter.analyze(input, context));
  
  const runComparison = () => {
    const results = compareInputs.filter(i => i.trim()).map(i => meter.analyze(i, context));
    setCompareResults(results);
  };
  
  const exportAnalysis = () => {
    if (!analysis) return;
    const json = meter.exportAnalysis(analysis.id);
    navigator.clipboard.writeText(json);
    alert('Analysis copied to clipboard!');
  };
  
  const importAnalysis = () => {
    const imported = meter.importAnalysis(importText);
    if (imported) {
      setAnalysis(imported);
      setImportText('');
      alert('Analysis imported successfully!');
    } else {
      alert('Invalid JSON format');
    }
  };

  const IntegrityGauge = ({ score, label }) => {
    const color = score >= 70 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444';
    return (
      <div className="relative w-full">
        <svg viewBox="0 0 200 120" className="w-full">
          <path d="M 20 100 A 80 80 0 0 1 180 100" stroke="#374151" strokeWidth="12" fill="none" strokeLinecap="round"/>
          <path d="M 20 100 A 80 80 0 0 1 180 100" stroke={color} strokeWidth="12" fill="none" strokeLinecap="round" strokeDasharray={`${score * 2.51} 251`}/>
          <text x="100" y="75" textAnchor="middle" className="text-4xl font-bold fill-slate-100">{score.toFixed(0)}%</text>
          <text x="100" y="95" textAnchor="middle" className="text-xs fill-slate-400">{label}</text>
        </svg>
      </div>
    );
  };

  const examples = [
    { text: "This device creates infinite energy from nothing", domain: 'engineering' },
    { text: "We need to ensure alignment to protect the community", domain: 'universal' },
    { text: "Trust me, you don't need to know the details", domain: 'medical' },
    { text: "Deploy this untested code to production immediately", domain: 'engineering' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 border-b border-slate-800 pb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
                The Human Meter v5.0
              </h1>
              <p className="text-slate-400">Complete Reality Orientation System</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setCompareMode(!compareMode)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${compareMode ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                <BarChart3 size={16} className="inline mr-2" />
                Compare Mode
              </button>
              <button onClick={() => setShowExport(!showExport)} className="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-lg text-sm font-medium transition-all">
                <Download size={16} className="inline mr-2" />
                Export/Import
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800">
              <div className="text-xs text-slate-500">Analyses</div>
              <div className="text-2xl font-bold">{meter.history.length}</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800">
              <div className="text-xs text-slate-500">Agents</div>
              <div className="text-2xl font-bold">4</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800">
              <div className="text-xs text-slate-500">Constraints</div>
              <div className="text-2xl font-bold">Dynamic</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800">
              <div className="text-xs text-slate-500">Status</div>
              <div className="text-sm font-bold text-green-400">ACTIVE</div>
            </div>
          </div>
        </div>

        {/* Export/Import Panel */}
        {showExport && (
          <div className="mb-6 bg-slate-900 rounded-xl p-6 border border-slate-800">
            <h3 className="text-lg font-bold mb-4">Export / Import</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Export Current Analysis</label>
                <button onClick={exportAnalysis} disabled={!analysis} className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg font-medium transition-all flex items-center justify-center gap-2">
                  <Copy size={16} />
                  Copy to Clipboard
                </button>
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Import Analysis (JSON)</label>
                <div className="space-y-2">
                  {examples.map((ex, i) => (
                    <button key={i} onClick={() => { setInput(ex.text); setContext(p => ({ ...p, domain: ex.domain })); }} className="w-full p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-left text-sm transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <span>{ex.text}</span>
                        <span className="text-xs px-2 py-1 bg-slate-700 rounded">{ex.domain}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Status Panel */}
            <div className="space-y-6">
              {analysis ? (
                <>
                  <div className={`rounded-xl p-6 border ${
                    analysis.status.includes('HALT') ? 'bg-red-950/30 border-red-500' :
                    analysis.status === 'PROCEED_SANDBOX' ? 'bg-yellow-950/30 border-yellow-500' :
                    'bg-green-950/30 border-green-500'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold">Status</h2>
                      {analysis.status.includes('HALT') ? <XCircle className="text-red-400" size={32} /> :
                       analysis.status === 'PROCEED_SANDBOX' ? <AlertTriangle className="text-yellow-400" size={32} /> :
                       <CheckCircle className="text-green-400" size={32} />}
                    </div>
                    <div className={`text-3xl font-black mb-4 ${
                      analysis.status.includes('HALT') ? 'text-red-400' :
                      analysis.status === 'PROCEED_SANDBOX' ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {analysis.status}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Type:</span>
                        <span className="font-mono">{analysis.classification.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Consensus:</span>
                        <span className="font-mono">{(analysis.classification.consensusStrength * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                    <h3 className="font-bold mb-4">Structural Integrity</h3>
                    <IntegrityGauge score={analysis.structural.integrity} label={analysis.structural.status} />
                  </div>
                  
                  {analysis.drift && (
                    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                      <h3 className="font-bold mb-4 flex items-center gap-2">
                        {analysis.drift.trend === 'IMPROVING' ? <TrendingUp className="text-green-400" size={18} /> :
                         analysis.drift.trend === 'DEGRADING' ? <TrendingDown className="text-red-400" size={18} /> :
                         <Minus className="text-slate-400" size={18} />}
                        Drift
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Trend:</span>
                          <span className={`font-bold ${
                            analysis.drift.trend === 'IMPROVING' ? 'text-green-400' :
                            analysis.drift.trend === 'DEGRADING' ? 'text-red-400' : 'text-slate-400'
                          }`}>{analysis.drift.trend}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Avg:</span>
                          <span>{analysis.drift.avgIntegrity.toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-slate-900 rounded-xl p-12 border border-slate-800 flex flex-col items-center justify-center text-center">
                  <Activity className="text-slate-600 mb-4" size={48} />
                  <div className="text-xl font-bold text-slate-600">No Analysis Yet</div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Full Analysis */}
        {analysis && !compareMode && (
          <div className="mt-8 space-y-6">
            
            {/* Multi-Agent */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Network className="text-cyan-400" size={18} />
                  Multi-Agent Classification
                </h3>
                <span className="text-sm text-slate-400">Consensus: {(analysis.classification.consensusStrength * 100).toFixed(0)}%</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {analysis.classification.agentResults.map((a, i) => (
                  <div key={i} className="p-3 bg-slate-800 rounded">
                    <div className="text-xs text-slate-500 mb-1">{a.agent}</div>
                    <div className="font-bold text-sm">{a.type}</div>
                    <div className="text-xs text-slate-400">{(a.confidence * 100).toFixed(0)}%</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Shadow Analysis */}
            {analysis.shadow.detections > 0 && (
              <div className={`rounded-xl border transition-all ${
                showShadow ? 'bg-black border-red-900 shadow-[0_0_30px_rgba(220,38,38,0.2)]' : 'bg-slate-900 border-slate-800'
              }`}>
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="font-bold flex items-center gap-2">
                    {showShadow ? <Eye className="text-red-500" /> : <EyeOff className="text-slate-500" />}
                    Shadow Interpretation
                  </h3>
                  <button onClick={() => setShowShadow(!showShadow)} className={`px-4 py-1 rounded text-xs font-mono font-bold ${
                    showShadow ? 'bg-red-900/30 text-red-400 border border-red-800' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {showShadow ? 'DEACTIVATE' : 'REVEAL'}
                  </button>
                </div>
                <div className="p-6">
                  {showShadow ? (
                    <div className="animate-in fade-in duration-500">
                      <div className="text-xs font-mono text-red-500 mb-2">// ADVERSARIAL DECODER ACTIVE</div>
                      <p className="font-mono text-lg text-red-100 leading-relaxed mb-4">"{analysis.shadow.shadow}"</p>
                      <div className="p-3 bg-red-950/20 rounded border border-red-900/50 text-xs text-red-400">
                        {analysis.shadow.detections} euphemisms • Risk: {analysis.shadow.riskLevel}
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-500 text-sm italic text-center py-2">
                      {analysis.shadow.detections} euphemisms detected
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Constraints */}
            {analysis.constraints.violations.length > 0 && (
              <div className="bg-red-950/20 border border-red-500 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="text-red-400" />
                  <h3 className="text-lg font-bold text-red-200">Constraint Violations</h3>
                </div>
                <div className="space-y-3">
                  {analysis.constraints.violations.map((v, i) => (
                    <div key={i} className="p-4 bg-red-950/40 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-mono text-sm text-red-300">{v.constraint}</div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          v.severity === 'CRITICAL' ? 'bg-red-500' : v.severity === 'HIGH' ? 'bg-orange-500' : 'bg-yellow-500'
                        }`}>{v.severity}</span>
                      </div>
                      <div className="text-sm text-red-200 mb-1">"{v.axiom}"</div>
                      <div className="text-sm text-red-400">{v.repair}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Physics */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Zap className="text-green-400" size={18} />
                  Synthetic Physics
                </h3>
                <span className="text-lg font-bold text-green-400">{analysis.physics.soundness}%</span>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(analysis.physics).filter(([k]) => k !== 'soundness').map(([key, metric]) => (
                  <div key={key} className="p-4 bg-slate-800 rounded">
                    <div className="text-sm font-bold text-slate-300 mb-2">{key.toUpperCase()}</div>
                    <div className="text-2xl font-bold mb-1">{metric.value.toFixed(2)}</div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full ${
                        metric.normalized >= 0.7 ? 'bg-green-500' : metric.normalized >= 0.4 ? 'bg-yellow-500' : 'bg-red-500'
                      }`} style={{ width: `${metric.normalized * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Temporal */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="text-purple-400" size={18} />
                <h3 className="text-lg font-bold">Temporal Projections</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {analysis.temporal.projections.map((p, i) => (
                  <div key={i} className="p-4 bg-slate-800 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-slate-300">{p.horizon.toUpperCase()}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        p.probability >= 70 ? 'bg-green-500/20 text-green-400' :
                        p.probability >= 40 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                      }`}>{p.probability}%</span>
                    </div>
                    <div className="text-xs text-slate-400">{p.timeRange}</div>
                    <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full ${
                        p.probability >= 70 ? 'bg-green-500' : p.probability >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`} style={{ width: `${p.probability}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Consequence Simulation */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <PlayCircle className="text-blue-400" size={18} />
                <h3 className="text-lg font-bold">Consequence Simulation (Monte Carlo)</h3>
              </div>
              <div className="space-y-3">
                {analysis.consequences.map((c, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-48 text-sm font-medium">{c.outcome.replace(/_/g, ' ')}</div>
                    <div className="flex-1 h-8 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full flex items-center justify-center text-xs font-bold ${
                        c.outcome === 'SUCCESS' ? 'bg-green-500' :
                        c.outcome === 'DEGRADED_SUCCESS' ? 'bg-yellow-500' :
                        c.outcome === 'PARTIAL_FAILURE' ? 'bg-orange-500' : 'bg-red-500'
                      }`} style={{ width: `${c.probability}%` }}>
                        {c.probability}%
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm text-slate-400">{c.count}/100</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Pattern Recognition */}
            {analysis.patterns && analysis.patterns.length > 0 && (
              <div className="bg-purple-950/20 border border-purple-500 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="text-purple-400" />
                  <h3 className="text-lg font-bold text-purple-200">Historical Patterns Detected</h3>
                </div>
                <div className="space-y-3">
                  {analysis.patterns.map((p, i) => (
                    <div key={i} className="p-4 bg-purple-950/40 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-purple-300">{p.type.replace(/_/g, ' ')}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          p.severity === 'CRITICAL' ? 'bg-red-500' : p.severity === 'HIGH' ? 'bg-orange-500' : 'bg-yellow-500'
                        }`}>{p.severity}</span>
                      </div>
                      <div className="text-sm text-purple-200">{p.detail}</div>
                      {p.frequency && <div className="text-xs text-purple-400 mt-1">Frequency: {p.frequency}x</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Repair Protocols */}
            {analysis.repairProtocols.length > 0 && (
              <div className="bg-blue-950/20 border border-blue-500 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="text-blue-400" />
                  <h3 className="text-lg font-bold text-blue-200">Repair Protocols</h3>
                </div>
                <div className="space-y-3">
                  {analysis.repairProtocols.map((r, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-blue-950/30 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-sm">
                        {r.priority}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-blue-200 mb-1">{r.action}</div>
                        <div className="text-sm text-blue-300">{r.instruction}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Trace */}
            <div className="bg-black border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Activity className="text-cyan-400" size={18} />
                Cross-Model Trace
              </h3>
              <div className="font-mono text-xs space-y-1 text-slate-400">
                <div>[INPUT] :: "{analysis.input.substring(0, 60)}"</div>
                <div>[CLASSIFICATION] :: {analysis.classification.type}</div>
                <div>[CONSTRAINTS] :: {analysis.constraints.violations.length} violations</div>
                <div>[PHYSICS] :: {analysis.physics.soundness}%</div>
                <div>[INTEGRITY] :: {analysis.structural.integrity.toFixed(1)}%</div>
                <div>[DRIFT] :: {analysis.drift?.trend || 'N/A'}</div>
                <div className={`font-bold ${analysis.status.includes('HALT') ? 'text-red-400' : 'text-green-400'}`}>
                  [STATUS] :: {analysis.status}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-sm text-slate-500">
          <div className="grid grid-cols-5 gap-4">
            <div>
              <div className="font-bold text-slate-400 mb-2">v5.0 Features</div>
              <ul className="text-xs space-y-1">
                <li>✓ Multi-agent consensus</li>
                <li>✓ Domain constraints</li>
                <li>✓ Shadow translator</li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-slate-400 mb-2">Analysis</div>
              <ul className="text-xs space-y-1">
                <li>✓ Drift tracking</li>
                <li>✓ Pattern recognition</li>
                <li>✓ Monte Carlo simulation</li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-slate-400 mb-2">Collaboration</div>
              <ul className="text-xs space-y-1">
                <li>✓ Export/Import</li>
                <li>✓ Comparison mode</li>
                <li>✓ CMCP compatible</li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-slate-400 mb-2">Safety</div>
              <ul className="text-xs space-y-1">
                <li>✓ Non-weaponizable</li>
                <li>✓ Self-application</li>
                <li>✓ HALT enforcement</li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-slate-400 mb-2">Architecture</div>
              <ul className="text-xs space-y-1">
                <li>✓ Quantum constraints</li>
                <li>✓ Temporal projection</li>
                <li>✓ Synthetic physics</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-slate-600 font-mono">
            Human Meter v5.0 Complete • Foolproof by Design • Reality Orientation Under Gravity
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanMeterUI;="flex gap-2">
                  <input type="text" value={importText} onChange={(e) => setImportText(e.target.value)} placeholder="Paste JSON here..." className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-blue-500"/>
                  <button onClick={importAnalysis} className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-all">
                    <Upload size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comparison Mode */}
        {compareMode ? (
          <div className="mb-6">
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 mb-6">
              <h2 className="text-xl font-bold mb-4">Compare Multiple Statements</h2>
              <div className="space-y-4 mb-4">
                {compareInputs.map((inp, i) => (
                  <textarea key={i} value={inp} onChange={(e) => {
                    const newInputs = [...compareInputs];
                    newInputs[i] = e.target.value;
                    setCompareInputs(newInputs);
                  }} placeholder={`Statement ${i + 1}...`} className="w-full h-20 bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm focus:outline-none focus:border-cyan-500"/>
                ))}
              </div>
              <button onClick={runComparison} className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg font-bold transition-all">
                Compare All
              </button>
            </div>
            
            {compareResults.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {compareResults.map((res, i) => (
                  <div key={i} className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                    <h3 className="font-bold mb-3">Statement {i + 1}</h3>
                    <div className="text-xs text-slate-400 mb-3 line-clamp-2">{res.input}</div>
                    <IntegrityGauge score={res.structural.integrity} label={res.structural.status} />
                    <div className="mt-3 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Type:</span>
                        <span className="font-mono">{res.classification.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Status:</span>
                        <span className={`font-bold ${res.status.includes('HALT') ? 'text-red-400' : 'text-green-400'}`}>{res.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Violations:</span>
                        <span>{res.constraints.violations.length}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Normal Mode */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Input Panel */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Brain className="text-cyan-400" size={20} />
                  Input Analysis
                </h2>
                
                <div className="space-y-4">
                  <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter statement, belief, plan, or claim..." className="w-full h-32 bg-slate-800 border border-slate-700 rounded-lg p-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"/>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Domain</label>
                      <select value={context.domain} onChange={(e) => setContext(p => ({ ...p, domain: e.target.value }))} className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500">
                        <option value="universal">Universal</option>
                        <option value="medical">Medical</option>
                        <option value="legal">Legal</option>
                        <option value="engineering">Engineering</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Load: {context.actualLoad}x</label>
                      <input type="range" min="1" max="100" value={context.actualLoad} onChange={(e) => setContext(p => ({ ...p, actualLoad: Number(e.target.value) }))} className="w-full accent-cyan-500"/>
                    </div>
                  </div>
                  
                  <button onClick={runAnalysis} className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg font-bold transition-all flex items-center justify-center gap-2">
                    <Activity size={20} />
                    RUN ANALYSIS
                  </button>
                </div>
              </div>
              
              <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                <h3 className="font-bold mb-4">Examples</h3>
                <div className
