# 🏦 FinControl AI — Autonomous AI Finance Controller
> **Razorpay AI Buildathon Submission | Track 04: AI Finance Controller**

FinControl AI is an autonomous financial orchestration agent designed to eliminate manual reconciliation across multi-source datasets (Razorpay Payout Ledgers, Bank Statements, and ERP Invoices).

---

## ⚡ Key Features

- **Multi-Source Batch Reconciliation:** Automatically matches transactions across Razorpay ledgers, bank statements, and internal ERP records for 50+ batch entries.
- **Honest Exception & Discrepancy Tracking:** Flags and categorizes non-resolvable exceptions (MDR fee mismatches, missing vendor GSTINs, T+1 payout timing gaps) with clear failure audit trails.
- **Dynamic Cash Flow Forecaster:** Visualizes forward cash liquidity and revenue trends using Chart.js.
- **Gemini AI Controller Integration:** Integrated with Google Gemini API for real-time tax-line analysis, discrepancy explanations, and financial queries.
- **Export & Audit Logging:** Allows downloading reconciled outputs as CSV with real-time system logs.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, Modern Glassmorphism CSS3, Vanilla JavaScript (ES6+)
- **AI Agent Engine:** Google Gemini API (`@google/genai`)
- **Data Visualization:** Chart.js & Lucide Icons

---

## 🚀 Track 04 Alignment (Razorpay Buildathon)

This project strictly adheres to Track 04 requirements:
1. **Batch Processing:** Handles a 50+ record synthetic financial dataset.
2. **Measured Accuracy:** Calculates exact match rates and confidence scores per record.
3. **Audit Trail:** Every financial decision and unmatched exception is transparently documented in the execution audit log.