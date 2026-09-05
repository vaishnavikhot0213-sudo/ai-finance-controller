const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// 1. Synthetic Financial Ledger Dataset (50 Multi-Source Records)
const generateLedgerData = () => {
    const data = [];
    for (let i = 1; i <= 50; i++) {
        // Flag specific transactions as exception for Audit testing
        const isException = (i === 4 || i === 12 || i === 28 || i === 43);
        data.push({
            id: `TXN-2026-${100 + i}`,
            merchant: `Merchant_${(i % 8) + 1} Pvt Ltd`,
            amount: Math.floor(Math.random() * 250000) + 12000,
            status: isException ? 'EXCEPTION' : 'MATCHED',
            confidence: isException ? 0.60 : 0.98,
            timestamp: new Date().toISOString(),
            flagReason: isException ? "MDR Fee Mismatch (+1.8%) / Unmatched Tax Line" : "Verified across Bank & ERP Logs"
        });
    }
    return data;
};

// 2. Advanced Ledger API Endpoint with Deterministic Analytics
app.get('/api/ledger', (req, res) => {
    const dataset = generateLedgerData();
    const totalVolume = dataset.reduce((acc, curr) => acc + curr.amount, 0);
    const exceptions = dataset.filter(d => d.status === 'EXCEPTION');
    const matched = dataset.filter(d => d.status === 'MATCHED');

    res.json({
        success: true,
        auditEngine: "FinControl-v2.1-Deterministic",
        totalRecords: dataset.length,
        totalVolume: totalVolume,
        matchRate: `${((matched.length / dataset.length) * 100).toFixed(1)}%`,
        exceptionsCount: exceptions.length,
        data: dataset
    });
});

// 3. AI Agent Assistant Endpoint with Rule Engine Fallback
app.post('/api/agent/query', (req, res) => {
    const { query } = req.body;
    let responseText = "";

    if (!query) {
        return res.status(400).json({ error: "Query parameter required" });
    }

    const q = query.toLowerCase();
    
    if (q.includes("exception") || q.includes("flag") || q.includes("104")) {
        responseText = "TXN-2026-104 flagged due to an unverified MDR fee deduction of 1.8% not reflected in ERP invoice #INV-882. Recommended Action: Auto-route to GST Tax Audit Queue.";
    } else if (q.includes("tax") || q.includes("gst")) {
        responseText = "GST Reconciliation engine indicates 100% Tax-line match for all 'MATCHED' items. 4 exceptions require manual input tax credit (ITC) claim review.";
    } else if (q.includes("forecast") || q.includes("cash")) {
        responseText = "Projected 7-Day Net Liquidity is ₹2,10,00,000 based on automated clearing settlement schedules.";
    } else {
        responseText = `Agent Audit Log: Query processed for '${query}'. All ledger states verified against Razorpay Payouts DB. Integrity status: SECURE.`;
    }

    res.json({
        success: true,
        query: query,
        agentResponse: responseText,
        auditTrailId: `AUDIT-LOG-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toISOString()
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`FinControl AI Server running on port ${PORT}`);
});
