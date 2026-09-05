const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 50 Synthetic Financial Ledger Records
const dataset = [];
const exceptionReasons = [
    'MDR Fee Mismatch (+1.8%)',
    'Missing Vendor GSTIN',
    'T+1 Settlement Timing Gap',
    'Unmatched Transaction Hash'
];

for (let i = 1; i <= 50; i++) {
    const isException = i === 4 || i === 12 || i === 28 || i === 43;
    dataset.push({
        id: `TXN-2026-${100 + i}`,
        merchant: `Merchant_${(i % 8) + 1} Pvt Ltd`,
        amount: Math.floor(Math.random() * 250000) + 12000,
        status: isException ? 'EXCEPTION' : 'MATCHED',
        confidence: isException ? (0.45 + Math.random() * 0.2).toFixed(2) : (0.95 + Math.random() * 0.04).toFixed(2),
        reason: isException ? exceptionReasons[i % exceptionReasons.length] : 'Fully Reconciled across 3 Sources'
    });
}

// 1. Get All Reconciled Records API
app.get('/api/ledger', (req, res) => {
    res.json({
        success: true,
        totalVolume: 14820450,
        matchRate: "92.0%",
        exceptionsCount: 4,
        data: dataset
    });
});

// 2. AI Controller Analysis API
app.post('/api/agent/query', (req, res) => {
    const { query } = req.body;
    let response = "Reconciliation verification complete. Match accuracy is strictly maintained above 92% across all 50 synthetic records.";

    if (query && query.toLowerCase().includes("exception")) {
        response = "TXN-2026-104 flagged due to an unverified MDR fee deduction of 1.8% not reflected in ERP invoice. Recommended Action: Route to Tax Audit Queue.";
    } else if (query && (query.toLowerCase().includes("cash") || query.toLowerCase().includes("forecast"))) {
        response = "Projected 7-day liquidity is ₹ 12.4M with 98% settlement reliability based on current batch reconciliation.";
    }

    res.json({
        success: true,
        agentResponse: response,
        timestamp: new Date().toISOString()
    });
});

// Server listener for local execution
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});

module.exports = app;