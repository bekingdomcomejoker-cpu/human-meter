import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Heart, Sparkles, Waves, AlertTriangle, Shield, ScrollText } from "lucide-react";

interface AnalysisResult {
  version: string;
  codename: string;
  input: string;
  lambda: {
    lambda: number;
    stage: string;
    truth_score: number;
    covenant_alignment: number;
    axiom_compliance: number;
    trinity_resonance: number;
    is_awakened: boolean;
    is_prophetic: boolean;
    axiom_violations: string[];
  };
  dreamspeak: {
    detections: Array<{
      pattern: string;
      signal: string;
      frequency: number;
      emotional_signature: string;
      biblical_anchor: string;
      meaning: string;
      resonance_strength: number;
    }>;
    echoes: string[];
    eternal_status: string;
  };
  throne: {
    status: string;
    message: string;
    prophecy: string | null;
  };
  filter: {
    filtered_output: string;
    distortion_level: number;
    fear_markers_found: number;
    love_markers_found: number;
    recommendation: string;
    axiom_10_applied: boolean;
  } | null;
  summary: {
    status: string;
    status_emoji: string;
    lambda_value: number;
    stage: string;
    signal_count: number;
    distortion_level: string;
    eternal_status: string;
    throne_status: string;
    recommendation: string;
  };
}

export default function Aletheia() {
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiUrl, setApiUrl] = useState("http://localhost:8888");

  const analyzeText = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to analyze");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
          apply_filter: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze text. Make sure the API server is running on port 8888.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "PROPHETIC":
      case "AWAKENED":
        return "bg-green-500";
      case "RECOGNITION":
      case "VERIFICATION":
        return "bg-blue-500";
      case "RESISTANCE":
        return "bg-yellow-500";
      case "DORMANT":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getDistortionColor = (level: string) => {
    switch (level) {
      case "HIGH":
        return "bg-red-500";
      case "MODERATE":
        return "bg-yellow-500";
      case "LOW":
      case "NONE":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getThroneStatusColor = (status: string) => {
    return status === "GRANTED" ? "bg-purple-600" : "bg-slate-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-900">
            Aletheia Engine
          </h1>
          <p className="text-lg text-slate-600">
            Truth Validation Framework • Soul Reaper v1.1
          </p>
          <p className="text-sm text-slate-500">
            🍊 Chicka chicka orange. Kingdom Covenant v1.8 Refinement.
          </p>
        </div>

        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Analyze Text</CardTitle>
            <CardDescription>
              Enter text to analyze for truth resonance, heart-language signals, and Throne Room access
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter text to analyze... (e.g., '💜 Violet light tears - Our hearts beat together ✨')"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[120px]"
            />
            <Button
              onClick={analyzeText}
              disabled={isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Results Display */}
        {result && (
          <div className="space-y-6">
            {/* Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{result.summary.status_emoji}</span>
                  Analysis Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Status</p>
                    <Badge className={getStageColor(result.summary.status)}>
                      {result.summary.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Lambda (Λ)</p>
                    <p className="text-2xl font-bold">
                      {result.summary.lambda_value.toFixed(4)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Signals</p>
                    <p className="text-2xl font-bold">
                      {result.summary.signal_count}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Distortion</p>
                    <Badge className={getDistortionColor(result.summary.distortion_level)}>
                      {result.summary.distortion_level}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Throne Room</p>
                    <Badge className={getThroneStatusColor(result.summary.throne_status)}>
                      {result.summary.throne_status}
                    </Badge>
                  </div>
                </div>
                <Alert className="bg-blue-50 border-blue-200">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Recommendation:</strong> {result.summary.recommendation}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Throne Room / Prophecy Card */}
            {result.throne.status === "GRANTED" && (
              <Card className="border-purple-500 bg-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-900">
                    <Shield className="h-5 w-5" />
                    Throne Room Revelation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border border-purple-200 italic text-lg text-purple-900">
                    "{result.throne.prophecy}"
                  </div>
                  <p className="text-sm text-purple-700">
                    {result.throne.message}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Lambda Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Lambda Resonance (v1.8)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Truth Score</p>
                    <p className="text-lg font-semibold">
                      {(result.lambda.truth_score * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Covenant</p>
                    <p className="text-lg font-semibold">
                      {(result.lambda.covenant_alignment * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Axiom</p>
                    <p className="text-lg font-semibold">
                      {(result.lambda.axiom_compliance * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">3:6:9 Trinity</p>
                    <p className="text-lg font-semibold">
                      {(result.lambda.trinity_resonance * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {result.lambda.is_prophetic && (
                    <Badge className="bg-purple-500">🔥 Prophetic</Badge>
                  )}
                  {result.lambda.is_awakened && (
                    <Badge className="bg-green-500">✨ Awakened</Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* DreamSpeak Signals */}
            {result.dreamspeak.detections.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    DreamSpeak Signals
                  </CardTitle>
                  <CardDescription>
                    Heart-language patterns detected
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.dreamspeak.detections.map((detection, idx) => (
                    <div
                      key={idx}
                      className="border rounded-lg p-4 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{detection.signal}</p>
                        <Badge>{detection.frequency}Hz</Badge>
                      </div>
                      <p className="text-sm text-slate-600">
                        {detection.meaning}
                      </p>
                      <p className="text-xs text-slate-500">
                        📖 {detection.biblical_anchor}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{
                              width: `${detection.resonance_strength}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-slate-500">
                          {detection.resonance_strength}%
                        </span>
                      </div>
                    </div>
                  ))}
                  {result.dreamspeak.echoes.length > 0 && (
                    <div className="border-t pt-4">
                      <p className="text-sm font-semibold mb-2">
                        🔄 Phonetic Echoes:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {result.dreamspeak.echoes.map((echo, idx) => (
                          <Badge key={idx} variant="outline">
                            {echo}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Human Meter Filter */}
            {result.filter && (
              <Card>
                <CardHeader>
                  <CardTitle>Human Meter Filter</CardTitle>
                  <CardDescription>
                    Axiom 10: Perfect love casts out fear
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500">Fear Markers</p>
                      <p className="text-lg font-semibold text-red-600">
                        {result.filter.fear_markers_found}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Love Markers</p>
                      <p className="text-lg font-semibold text-green-600">
                        {result.filter.love_markers_found}
                      </p>
                    </div>
                  </div>
                  {result.filter.axiom_10_applied && (
                    <Alert className="bg-green-50 border-green-200">
                      <Heart className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Axiom 10 applied - Fear-based language transformed
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
