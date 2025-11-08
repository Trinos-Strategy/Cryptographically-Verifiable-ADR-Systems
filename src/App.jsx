import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Clock, Shield, Lock, Users, Gavel, Download, FileText, Upload } from 'lucide-react';

export default function PEAPDisputeSystem() {
  const [stage, setStage] = useState('welcome');
  const [disputeData, setDisputeData] = useState({
    partyA: '',
    partyB: '',
    disputeType: '',
    amount: '',
    description: ''
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentTier, setCurrentTier] = useState(1);
  const [generatingAgreement, setGeneratingAgreement] = useState(false);
  const [settlementAgreement, setSettlementAgreement] = useState(null);
  const [uploadedTranscript, setUploadedTranscript] = useState(null);
  const [analyzingTranscript, setAnalyzingTranscript] = useState(false);
  const [transcriptAnalysis, setTranscriptAnalysis] = useState(null);

  const analyzeDispute = () => {
    setStage('ai-analyzing');
    setTimeout(() => {
      setStage('ai-results');
    }, 3000);
  };

  const generateSettlementAgreement = async (optionNumber) => {
    setGeneratingAgreement(true);
    const amount = parseFloat(disputeData.amount) || 10000;
    
    const optionDetails = {
      1: {
        title: "Quick Resolution",
        amount: amount * 0.45,
        description: `${disputeData.partyA} receives ${Math.round(amount * 0.45 / amount * 100)}% of disputed amount immediately, with mutual release of all claims.`
      },
      2: {
        title: "Balanced Settlement",
        amount: amount * 0.60,
        description: `Structured payment of $${(amount * 0.60).toLocaleString()} over 3 months, allowing continued business relationship.`
      },
      3: {
        title: "Full Vindication",
        amount: amount * 0.85,
        description: `Maximum compensation of $${(amount * 0.85).toLocaleString()} with detailed findings.`
      }
    };

    const option = optionDetails[optionNumber];
    
    // Mock data - example settlement agreement instead of API
    setTimeout(() => {
      const mockAgreement = `SETTLEMENT AGREEMENT AND MUTUAL RELEASE

This Settlement Agreement ("Agreement") is entered into as of ${new Date().toLocaleDateString()}, by and between:

${disputeData.partyA} ("Party A")
and
${disputeData.partyB} ("Party B")
(collectively, the "Parties")

RECITALS

WHEREAS, a dispute has arisen between the Parties concerning ${disputeData.disputeType} involving the sum of $${parseFloat(disputeData.amount).toLocaleString()};

WHEREAS, ${disputeData.description};

WHEREAS, the Parties desire to resolve all claims and disputes between them without the expense and uncertainty of litigation;

NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:

AGREEMENT

1. SETTLEMENT TERMS

1.1 Settlement Amount: Party B shall pay to Party A the sum of $${option.amount.toLocaleString()} (the "Settlement Amount").

1.2 Payment Terms: ${option.title === "Quick Resolution" 
  ? "The Settlement Amount shall be paid in full within five (5) business days of the execution of this Agreement via wire transfer or certified check."
  : option.title === "Balanced Settlement"
  ? "The Settlement Amount shall be paid in three equal installments of $" + (option.amount / 3).toLocaleString() + " over three months, with the first payment due within ten (10) business days of execution, and subsequent payments due on the same day of each following month."
  : "The Settlement Amount shall be paid in full within ten (10) business days of the execution of this Agreement, representing compensation for damages, breach of contract, and additional damages as detailed herein."}

1.3 Settlement Characterization: This settlement is entered into as a compromise of disputed claims and shall not be construed as an admission of liability by either Party.

2. MUTUAL RELEASE

2.1 Release by Party A: Party A hereby releases, acquits, and forever discharges Party B, and their respective agents, representatives, successors, and assigns, from any and all claims, demands, damages, actions, and causes of action, whether known or unknown, arising from or relating to the matters described in the Recitals.

2.2 Release by Party B: Party B hereby releases, acquits, and forever discharges Party A, and their respective agents, representatives, successors, and assigns, from any and all claims, demands, damages, actions, and causes of action, whether known or unknown, arising from or relating to the matters described in the Recitals.

3. CONFIDENTIALITY

3.1 The Parties agree to maintain the confidentiality of this Agreement and its terms, except as required by law or for enforcement purposes.

3.2 Neither Party shall make any public statements, social media posts, or other communications disparaging the other Party.

4. IMPLEMENTATION TIMELINE

4.1 This Agreement shall become effective immediately upon execution by both Parties.

4.2 Smart contract execution shall commence within twenty-four (24) hours of mutual acceptance.

4.3 All payment obligations shall be completed according to the schedule outlined in Section 1.2.

5. DISPUTE RESOLUTION

5.1 Should any dispute arise regarding the interpretation or enforcement of this Agreement, the Parties agree to first attempt resolution through good faith negotiation.

5.2 If negotiation fails, disputes shall be resolved through binding arbitration in accordance with the PEAP framework.

6. MISCELLANEOUS PROVISIONS

6.1 Entire Agreement: This Agreement constitutes the entire agreement between the Parties and supersedes all prior negotiations, understandings, and agreements.

6.2 Amendment: This Agreement may only be amended by written instrument signed by both Parties.

6.3 Governing Law: This Agreement shall be governed by and construed in accordance with applicable blockchain-based dispute resolution protocols and international arbitration standards.

6.4 Severability: If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.

6.5 Counterparts: This Agreement may be executed in counterparts, each of which shall be deemed an original and all of which together shall constitute one and the same instrument. Electronic signatures shall be deemed valid and binding.

SIGNATURES

Party A: ${disputeData.partyA}
Signature: _________________________
Date: _________________________

Party B: ${disputeData.partyB}
Signature: _________________________
Date: _________________________

---
This agreement was generated using the GTDR (Graduated Three-Tier Dispute Resolution) system (PEAP)
Cryptographically verified and blockchain-secured
Generated: ${new Date().toISOString()}`;

      setSettlementAgreement(mockAgreement);
      setSelectedOption(optionNumber);
      setGeneratingAgreement(false);
      setStage('agreement-generated');
    }, 3000);
  };

  const handleOptionSelect = (optionId) => {
    generateSettlementAgreement(optionId);
  };

  const escalateToHuman = () => {
    setCurrentTier(2);
    setStage('human-mediation');
  };

  const escalateToExpert = () => {
    setCurrentTier(3);
    setStage('expert-arbitration');
  };

  const downloadAgreement = () => {
    const blob = new Blob([settlementAgreement], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Settlement_Agreement_${disputeData.partyA}_${disputeData.partyB}_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadTranscriptAnalysis = () => {
    const blob = new Blob([transcriptAnalysis], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Mediation_Analysis_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleTranscriptUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadedTranscript(file.name);
    setAnalyzingTranscript(true);

    // Mock data - example analysis instead of real API
    setTimeout(() => {
      const mockAnalysis = `MEDIATION TRANSCRIPT ANALYSIS
GTDR (Graduated Three-Tier Dispute Resolution) system (PEAP)

EXECUTIVE SUMMARY

This mediation involved a commercial dispute between two business partners regarding revenue sharing and intellectual property rights in a digital asset platform. The core issues center on divergent interpretations of their partnership agreement and concerns about fair compensation. Both parties express willingness to preserve the business relationship while ensuring their interests are protected. A phased settlement approach with clear milestone verification appears most promising, allowing continued collaboration while addressing immediate financial concerns.

Key Issues Identified:
1. Revenue distribution methodology (45% vs 55% split controversy)
2. Intellectual property ownership and licensing rights
3. Future governance and decision-making authority
4. Timeline for implementation of agreed changes

DETAILED ANALYSIS

PARTY ANALYSIS

Party A:
- Primary concern: Seeking recognition for initial platform development contributions
- Underlying interests: Fair compensation, continued involvement in project direction
- Stated position: Requests 60% revenue share retrospectively
- Emotional state: Frustrated but open to negotiation
- BATNA: Could pursue litigation but acknowledges time and cost concerns

Party B:
- Primary concern: Maintaining operational control and protecting investment
- Underlying interests: Business stability, protecting against future disputes
- Stated position: Willing to adjust terms but seeks clarity on IP ownership
- Emotional state: Defensive but pragmatic
- BATNA: Has resources for extended litigation but prefers resolution

SETTLEMENT OPTIONS

Option 1: "Rapid Resolution with Modified Revenue Split"
- Adjust revenue split to 55/45 in favor of Party A going forward
- One-time payment of $42,000 to Party A within 30 days
- Confirm IP ownership as joint with clear licensing provisions
- Establish quarterly review meetings

Option 2: "Phased Partnership Restructure" (RECOMMENDED)
- Maintain 50/50 revenue split with two-tier payment structure
- Party A receives guaranteed minimum $8,000/month for 12 months
- After 12 months, performance-based split (55/45 if targets met)
- Establish formal Board with outside advisor as tiebreaker
- Create comprehensive IP agreement

Option 3: "Structured Buyout with Ongoing Royalty"
- Party B buys out Party A's stake for $175,000
- Party A retains 15% royalty on net revenue for 5 years
- Party A granted perpetual license for non-competing use
- Party B obtains full operational control

Option 4: "Equity Conversion with Milestone Vesting"
- Restructure as formal corporation
- Party A: 52% equity, Party B: 48% equity
- 3-year vesting with 1-year cliff
- Immediate cash payment of $35,000 to Party A

Option 5: "Time-Based Graduated Adjustment"
- Year 1: 52/48 split + $20,000 signing payment
- Year 2: 54/46 split (if revenue targets met)
- Year 3+: 55/45 split (permanent)
- Clear IP documentation immediately

RECOMMENDED SETTLEMENT PACKAGE

Primary Recommendation: Option 2 - "Phased Partnership Restructure"

This option addresses core interests while preserving the business relationship. The guaranteed minimum payment addresses Party A's immediate financial concerns while the performance-based adjustment aligns incentives for growth.

Implementation Timeline:
- Month 1: Execute agreement, select board advisor, begin payments
- Months 2-3: Draft IP agreement, establish reporting system
- Months 4-12: Regular board meetings, quarterly reviews
- Month 12: Performance assessment and split adjustment

DRAFT SETTLEMENT AGREEMENT

[Comprehensive legal agreement with all provisions including recitals, payment terms, governance structure, IP rights, confidentiality, dispute resolution, and miscellaneous provisions]

---
DISCLAIMER: This analysis is for discussion purposes only. Review with qualified legal counsel before execution.

Analysis completed: ${new Date().toISOString()}
Confidence level: High`;

      setTranscriptAnalysis(mockAnalysis);
      setAnalyzingTranscript(false);
      setStage('transcript-analyzed');
    }, 5000);
  };

  // Welcome Screen
  if (stage === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
              <Shield className="w-12 h-12 text-indigo-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              GTDR (Graduated Three-Tier Dispute Resolution) system
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Cryptographically Verified Three-Tier Dispute Resolution
            </p>
            <p className="text-sm text-gray-500">
              Expert-driven • Privacy-preserving • Legally enforceable
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How GTDR Works</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">AI-Generated Mediation</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Privacy-preserving AI analyzes your dispute and generates three settlement options. Automatically creates downloadable settlement agreements.
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> 2-48 hours
                    </span>
                    <span>$50-300</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">Human Expert Mediation</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Verified experts facilitate resolution. Upload transcripts for AI-powered analysis and settlement generation.
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> 1-2 weeks
                    </span>
                    <span>$2,000-8,000</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">Expert Arbitration</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Formal arbitration with full legal recognition and enforcement.
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> 3-6 weeks
                    </span>
                    <span>Full legal recognition</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setStage('submit')}
            className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
          >
            Submit Your Dispute
          </button>
        </div>
      </div>
    );
  }

  // Dispute Submission Form
  if (stage === 'submit') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Submit Dispute - Tier 1: AI Mediation</h2>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start">
              <Lock className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm text-blue-900">
                <strong>Privacy Protected:</strong> Your submission is encrypted, allowing AI analysis without exposing sensitive details.
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Party A (Your Name)
                  </label>
                  <input
                    type="text"
                    value={disputeData.partyA}
                    onChange={(e) => setDisputeData({...disputeData, partyA: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Party B (Other Party)
                  </label>
                  <input
                    type="text"
                    value={disputeData.partyB}
                    onChange={(e) => setDisputeData({...disputeData, partyB: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter other party name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dispute Type
                </label>
                <select
                  value={disputeData.disputeType}
                  onChange={(e) => setDisputeData({...disputeData, disputeType: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select dispute type</option>
                  <option value="escrow">Escrow Dispute</option>
                  <option value="contract">Smart Contract Execution</option>
                  <option value="securities">Digital Securities</option>
                  <option value="service">Service Agreement</option>
                  <option value="intellectual">Intellectual Property</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dispute Amount (USD)
                </label>
                <input
                  type="number"
                  value={disputeData.amount}
                  onChange={(e) => setDisputeData({...disputeData, amount: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter amount in dispute"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dispute Description
                </label>
                <textarea
                  value={disputeData.description}
                  onChange={(e) => setDisputeData({...disputeData, description: e.target.value})}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Describe the dispute in detail..."
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setStage('welcome')}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={analyzeDispute}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Submit for AI Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // AI Analyzing Stage or Generating Agreement
  if (stage === 'ai-analyzing' || generatingAgreement) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="inline-block p-4 bg-indigo-100 rounded-full mb-6 animate-pulse">
              <Shield className="w-16 h-16 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {generatingAgreement ? 'Generating Settlement Agreement' : 'Analyzing Your Dispute'}
            </h2>
            <p className="text-gray-600 mb-8">
              {generatingAgreement 
                ? 'Creating a comprehensive legal settlement agreement based on your selected option'
                : 'Processing your case using privacy-preserving protocols'}
            </p>
            
            <div className="space-y-4 text-left bg-gray-50 rounded-lg p-6">
              {generatingAgreement ? (
                <>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-sm text-gray-700">Analyzing selected settlement option</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-sm text-gray-700">Drafting recitals and settlement terms</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-sm text-gray-700">Creating mutual release and confidentiality clauses</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-sm text-gray-700">Finalizing legal provisions and signature blocks</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-sm text-gray-700">Encryption applied to sensitive data</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-sm text-gray-700">Analyzing legal precedents and contract terms</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-sm text-gray-700">Generating optimized settlement scenarios</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-sm text-gray-700">Verifying legal compliance</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // AI Results - Three Options
  if (stage === 'ai-results') {
    const amount = parseFloat(disputeData.amount) || 10000;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">AI Analysis Complete - Three Settlement Options</h2>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-green-900">
                Based on your dispute details, AI has generated three settlement scenarios. Each option will automatically generate a complete settlement agreement ready for download.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-500 transition-colors cursor-pointer">
                <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  SPEED OPTIMIZED
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Resolution</h3>
                <div className="text-3xl font-bold text-indigo-600 mb-4">
                  ${(amount * 0.45).toLocaleString()}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {disputeData.partyA} receives {Math.round(amount * 0.45 / amount * 100)}% of disputed amount immediately, with mutual release of all claims.
                </p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Immediate smart contract execution</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>No further proceedings required</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Minimal transaction costs</span>
                  </li>
                </ul>
                <button
                  onClick={() => handleOptionSelect(1)}
                  disabled={generatingAgreement}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  Generate Agreement
                </button>
              </div>

              <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-500 transition-colors cursor-pointer">
                <div className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  RELATIONSHIP FOCUSED
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Balanced Settlement</h3>
                <div className="text-3xl font-bold text-purple-600 mb-4">
                  ${(amount * 0.60).toLocaleString()}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Structured payment over 3 months, allowing continued business relationship with modified contract terms.
                </p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Preserves business relationship</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Revised contract terms included</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Payment schedule flexibility</span>
                  </li>
                </ul>
                <button
                  onClick={() => handleOptionSelect(2)}
                  disabled={generatingAgreement}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  Generate Agreement
                </button>
              </div>

              <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-green-500 transition-colors cursor-pointer">
                <div className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  COMPREHENSIVE
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Full Vindication</h3>
                <div className="text-3xl font-bold text-green-600 mb-4">
                  ${(amount * 0.85).toLocaleString()}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Maximum compensation with detailed findings, additional damages for breach, and public acknowledgment option.
                </p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Higher compensation amount</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Detailed reasoning provided</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Precedent-setting potential</span>
                  </li>
                </ul>
                <button
                  onClick={() => handleOptionSelect(3)}
                  disabled={generatingAgreement}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  Generate Agreement
                </button>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-start mb-4">
                <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Not satisfied with these options?
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    You can escalate to Tier 2 for human expert mediation.
                  </p>
                </div>
              </div>
              <button
                onClick={escalateToHuman}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Users className="w-5 h-5 mr-2" />
                Escalate to Human Expert Mediation (Tier 2)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Agreement Generated Stage
  if (stage === 'agreement-generated') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <CheckCircle className="w-10 h-10 text-green-500 mr-4" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Settlement Agreement Generated</h2>
                <p className="text-gray-600">Ready for review and execution</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="flex items-start">
                <FileText className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-green-900 mb-2">Comprehensive Legal Agreement Created</h3>
                  <p className="text-sm text-green-800">
                    A professional settlement agreement has been generated based on your selected option. This document includes all necessary legal provisions.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 max-h-96 overflow-y-auto border border-gray-200">
              <div className="font-mono text-xs whitespace-pre-wrap text-gray-800">
                {settlementAgreement}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={downloadAgreement}
                className="flex items-center justify-center bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Agreement
              </button>
              <button
                onClick={() => {
                  setStage('resolved');
                }}
                className="flex items-center justify-center bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Accept & Execute
              </button>
            </div>

            <div className="border-t pt-6">
              <p className="text-sm text-gray-600 mb-4">
                <strong>Important:</strong> This AI-generated settlement agreement is for discussion purposes only. All agreements should be reviewed by qualified legal counsel before execution.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setStage('ai-results')}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors text-sm"
                >
                  Choose Different Option
                </button>
                <button
                  onClick={escalateToHuman}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                >
                  Escalate to Human Mediator
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Human Mediation Stage
  if (stage === 'human-mediation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Tier 2: Human Expert Mediation</h2>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex items-start mb-4">
                <Lock className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-blue-900 mb-2">Cryptographic Credential Verification Active</h3>
                  <p className="text-sm text-blue-800">
                    Your mediator's qualifications are verified using zero-knowledge proofs, confirming expertise without revealing personal details.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-blue-200 rounded-xl p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  DM
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Dr. Maria Chen (Verified Expert)</h3>
                  <p className="text-sm text-gray-600">15+ years experience | Digital Asset Disputes Specialist</p>
                </div>
                <div className="ml-auto">
                  <div className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                    ✓ Credentials Verified
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700 italic mb-2">
                  "I've reviewed your case details through our secure channel. I believe we can find a creative solution that addresses both parties' core concerns."
                </p>
                <p className="text-xs text-gray-500">Sent via encrypted channel • 2 minutes ago</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-amber-900 mb-3 flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Upload Mediation Transcript for AI Analysis
              </h3>
              <p className="text-sm text-amber-800 mb-4">
                After your mediation session, upload the transcript for AI analysis to generate comprehensive settlement options.
              </p>
              <input
                type="file"
                accept=".txt,.doc,.docx"
                onChange={handleTranscriptUpload}
                disabled={analyzingTranscript}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
              />
              {uploadedTranscript && (
                <p className="text-sm text-green-600 mt-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Uploaded: {uploadedTranscript}
                </p>
              )}
            </div>

            {analyzingTranscript && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-center mb-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
                <p className="text-center text-gray-700 font-medium mb-2">Analyzing mediation transcript...</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Identifying parties and issues</p>
                  <p>• Mapping interests and BATNA</p>
                  <p>• Generating settlement options</p>
                  <p>• Drafting comprehensive agreement</p>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Clock className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-900">Estimated Timeline</span>
                </div>
                <p className="text-sm text-gray-600">1-2 weeks for complete mediation process</p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Shield className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-900">Cost Range</span>
                </div>
                <p className="text-sm text-gray-600">$2,000 - $8,000 (split between parties)</p>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  setSelectedOption('human-accepted');
                  setStage('resolved');
                }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Proceed with Human Mediation
              </button>

              <div className="border-t pt-4">
                <div className="flex items-start mb-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Need formal arbitration with binding decision?
                    </p>
                    <p className="text-sm text-gray-600">
                      Escalate to Tier 3 for expert arbitration with full legal recognition.
                    </p>
                  </div>
                </div>
                <button
                  onClick={escalateToExpert}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center"
                >
                  <Gavel className="w-5 h-5 mr-2" />
                  Escalate to Expert Arbitration (Tier 3)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Transcript Analyzed Stage
  if (stage === 'transcript-analyzed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <CheckCircle className="w-10 h-10 text-green-500 mr-4" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Mediation Transcript Analysis Complete</h2>
                <p className="text-gray-600">Comprehensive settlement options generated</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="flex items-start">
                <FileText className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-green-900 mb-2">Expert AI Analysis Complete</h3>
                  <p className="text-sm text-green-800">
                    The analysis includes party identification, issue extraction, interest mapping, BATNA assessment, settlement options, and a comprehensive draft settlement agreement.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 max-h-96 overflow-y-auto border border-gray-200">
              <div className="prose prose-sm max-w-none text-gray-800 whitespace-pre-wrap">
                {transcriptAnalysis}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={downloadTranscriptAnalysis}
                className="flex items-center justify-center bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Full Analysis
              </button>
              <button
                onClick={() => {
                  setSelectedOption('transcript-accepted');
                  setStage('resolved');
                }}
                className="flex items-center justify-center bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Proceed with Recommendations
              </button>
            </div>

            <div className="border-t pt-6">
              <p className="text-sm text-gray-600 mb-4">
                <strong>Note:</strong> This AI-generated analysis is for discussion purposes. All recommendations should be reviewed with qualified legal counsel.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setStage('human-mediation')}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors text-sm"
                >
                  Upload Different Transcript
                </button>
                <button
                  onClick={escalateToExpert}
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm"
                >
                  Escalate to Expert Arbitration
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Expert Arbitration Stage
  if (stage === 'expert-arbitration') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                3
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Tier 3: Expert Arbitration</h2>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-purple-900 mb-3">Advanced Cryptographic Protocols Active</h3>
              <div className="space-y-2 text-sm text-purple-800">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-purple-600" />
                  <span>Zero-knowledge credential verification for arbitrator panel</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-purple-600" />
                  <span>Secure multi-party computation ensuring independent analysis</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-purple-600" />
                  <span>Programmable transparency with attribute-based encryption</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl p-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Gavel className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-center text-gray-900 mb-2">Arbitrator Panel</h3>
                <p className="text-sm text-center text-gray-600 mb-3">3 verified experts selected</p>
                <div className="bg-white rounded-lg p-3 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Securities Law:</span>
                    <span className="text-green-600 font-medium">✓ Verified</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Blockchain Tech:</span>
                    <span className="text-green-600 font-medium">✓ Verified</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">International Law:</span>
                    <span className="text-green-600 font-medium">✓ Verified</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Lock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-center text-gray-900 mb-2">Independent Analysis</h3>
                <p className="text-sm text-center text-gray-600 mb-3">Cryptographic isolation prevents coordination</p>
                <div className="bg-white rounded-lg p-3 text-xs space-y-2">
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span>Phase 1: Individual review</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    <span>Phase 2: Secure MPC exchange</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span>Phase 3: Final decision</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-center text-gray-900 mb-2">Legal Recognition</h3>
                <p className="text-sm text-center text-gray-600 mb-3">Enforceable under international law</p>
                <div className="bg-white rounded-lg p-3 text-xs space-y-1">
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                    <span>New York Convention</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                    <span>Reasoned award provided</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                    <span>Cross-border enforcement</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedOption('expert-accepted');
                setStage('resolved');
              }}
              className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-lg"
            >
              Initiate Expert Arbitration Process
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Resolution Complete
  if (stage === 'resolved') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 flex items-center justify-center">
        <div className="max-w-3xl w-full">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="inline-block p-4 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Dispute Resolution In Progress</h2>
            <p className="text-lg text-gray-600 mb-8">
              {selectedOption === 'human-accepted' && "Your case is now being handled by a verified expert mediator."}
              {selectedOption === 'expert-accepted' && "Expert arbitration has been initiated. The panel will conduct independent analysis."}
              {selectedOption === 'transcript-accepted' && "Your mediation analysis has been completed."}
              {typeof selectedOption === 'number' && "Settlement agreement has been generated and is ready for execution."}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8 text-sm">
              <div className="bg-gray-50 rounded-lg p-4">
                <Shield className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <p className="font-medium text-gray-900">Privacy Protected</p>
                <p className="text-xs text-gray-600">End-to-end encryption</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <Lock className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <p className="font-medium text-gray-900">Tamper Proof</p>
                <p className="text-xs text-gray-600">Blockchain verified</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <CheckCircle className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <p className="font-medium text-gray-900">Enforceable</p>
                <p className="text-xs text-gray-600">Legal recognition</p>
              </div>
            </div>

            <button
              onClick={() => {
                setStage('welcome');
                setSelectedOption(null);
                setCurrentTier(1);
                setDisputeData({
                  partyA: '',
                  partyB: '',
                  disputeType: '',
                  amount: '',
                  description: ''
                });
                setSettlementAgreement(null);
                setTranscriptAnalysis(null);
                setUploadedTranscript(null);
              }}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Submit Another Dispute
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
