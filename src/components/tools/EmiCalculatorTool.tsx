"use client";

import React, { useState } from "react";
import { Calculator, Award, DollarSign, Percent } from "lucide-react";

export default function EmiCalculatorTool() {
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTerm, setLoanTerm] = useState<number>(5);

  const calculateEmi = () => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = loanTerm * 12;

    if (r === 0) {
      const emiVal = P / n;
      const totalAmount = P;
      const totalInterest = 0;
      return { emi: emiVal, interest: totalInterest, total: totalAmount };
    }

    const emiVal = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emiVal * n;
    const totalInterest = totalAmount - P;

    return { emi: emiVal, interest: totalInterest, total: totalAmount };
  };

  const { emi, interest, total } = calculateEmi();

  const interestPercent = total ? Math.floor((interest / total) * 100) : 0;
  const principalPercent = 100 - interestPercent;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Input panel */}
      <div className="glass-panel border border-border/40 rounded-2xl p-5 space-y-6">
        <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5 pb-2 border-b border-border/30">
          <Calculator className="w-4.5 h-4.5 text-indigo-400" />
          <span>Loan & Interest Parameters</span>
        </h3>

        <div className="space-y-4">
          {/* Loan Amount */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-muted-foreground">Principal Loan Amount</span>
              <span className="text-foreground font-mono">${loanAmount.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="2000000"
              step="5000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Interest Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-muted-foreground">Annual Interest Rate</span>
              <span className="text-foreground font-mono">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Term length */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-muted-foreground">Loan Tenure Duration</span>
              <span className="text-foreground font-mono">{loanTerm} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Output details card */}
      <div className="glass-panel border border-border/40 rounded-2xl p-5 space-y-6 flex flex-col justify-between">
        
        {/* Main metrics */}
        <div className="space-y-4">
          <div>
            <span className="text-[10px] text-muted-foreground uppercase font-semibold">Estimated Monthly EMI</span>
            <p className="text-3xl font-extrabold text-indigo-400 mt-1">${emi.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-xs pt-4 border-t border-border/30">
            <div>
              <span className="text-muted-foreground">Total Interest Payable</span>
              <p className="font-bold text-foreground mt-0.5">${interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Total Payment Amount</span>
              <p className="font-bold text-foreground mt-0.5">${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        {/* Visual progress bar distribution */}
        <div className="space-y-3.5 pt-4 border-t border-border/30">
          <div className="flex justify-between text-[10px] font-bold uppercase font-mono">
            <span className="text-indigo-400">Principal ({principalPercent}%)</span>
            <span className="text-purple-400">Interest ({interestPercent}%)</span>
          </div>
          
          {/* Progress bar container */}
          <div className="h-4 rounded-full bg-muted/40 overflow-hidden flex">
            <div className="bg-indigo-600 h-full transition-all" style={{ width: `${principalPercent}%` }} />
            <div className="bg-purple-600 h-full transition-all" style={{ width: `${interestPercent}%` }} />
          </div>
        </div>

      </div>

    </div>
  );
}
