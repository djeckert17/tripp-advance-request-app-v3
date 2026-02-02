import React, { useState, useEffect } from 'react';

// ============================================================================
// TRIPP+ Enterprise Fund - State Department Advance Request Process
// Interactive Web Application
// Brand Color System: TRIPP+ Enhanced Brand (Dark Mode)
// ============================================================================

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

  :root {
    /* TRIPP+ Primary Brand Colors */
    --tripp-navy: #1A1A2E;
    --tripp-gold: #C9A227;
    --tripp-gold-light: #E8D58A;
    --tripp-royal-blue: #0A2463;
    
    /* TRIPP+ Secondary Colors (Infrastructure) */
    --tripp-steel-blue: #7A96A8;
    --tripp-slate-gray: #8B9BA8;
    --tripp-sky-blue: #6BA3C8;
    --tripp-teal-navy: #2C4A5C;
    
    /* TRIPP+ Supporting Colors */
    --tripp-warm-white: #F5F5F0;
    --tripp-charcoal: #2A2A3E;
    
    /* Functional Colors */
    --color-success: #10b981;
    --color-success-light: #34d399;
    --color-warning: #f59e0b;
    --color-error: #ef4444;
    
    /* Typography */
    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-sans);
    background: var(--tripp-navy);
    color: var(--tripp-warm-white);
    line-height: 1.6;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .app-container {
    min-height: 100vh;
    background: linear-gradient(180deg, 
      var(--tripp-navy) 0%, 
      var(--tripp-charcoal) 50%, 
      var(--tripp-navy) 100%
    );
  }

  /* ========================================
     HEADER
     ======================================== */
  .header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(26, 26, 46, 0.92);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(201, 162, 39, 0.15);
    padding: 0.875rem 1.5rem;
  }

  .header-content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
  }

  .logo-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-shrink: 0;
  }

  .logo-badge {
    background: linear-gradient(135deg, var(--tripp-gold) 0%, #B8922B 100%);
    padding: 0.625rem 1rem;
    border-radius: 6px;
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 0.875rem;
    color: var(--tripp-navy);
    letter-spacing: 0.02em;
    box-shadow: 0 2px 8px rgba(201, 162, 39, 0.3);
  }

  .logo-text {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .logo-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--tripp-warm-white);
    letter-spacing: -0.01em;
    white-space: nowrap;
  }

  .logo-divider {
    width: 1px;
    height: 24px;
    background: var(--tripp-steel-blue);
    opacity: 0.4;
  }

  .logo-subtitle {
    font-size: 0.8125rem;
    color: var(--tripp-gold);
    letter-spacing: 0.02em;
    font-weight: 600;
    white-space: nowrap;
  }

  /* Navigation */
  .nav-tabs {
    display: flex;
    gap: 0.25rem;
    background: rgba(44, 74, 92, 0.4);
    padding: 0.25rem;
    border-radius: 10px;
    border: 1px solid rgba(122, 150, 168, 0.15);
  }

  .nav-tab {
    padding: 0.5rem 1rem;
    border: none;
    background: transparent;
    color: var(--tripp-slate-gray);
    font-family: var(--font-sans);
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .nav-tab:hover {
    color: var(--tripp-warm-white);
    background: rgba(122, 150, 168, 0.15);
  }

  .nav-tab.active {
    background: linear-gradient(135deg, var(--tripp-gold) 0%, #B8922B 100%);
    color: var(--tripp-navy);
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(201, 162, 39, 0.25);
  }

  /* ========================================
     MAIN CONTENT
     ======================================== */
  .main-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  /* ========================================
     HERO SECTION
     ======================================== */
  .hero-section {
    text-align: center;
    padding: 3rem 1.5rem 4rem;
    background: radial-gradient(ellipse at center top, rgba(201, 162, 39, 0.08) 0%, transparent 50%);
    margin-bottom: 2rem;
    position: relative;
  }

  .hero-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--tripp-gold), transparent);
    opacity: 0.5;
  }

  .hero-eyebrow {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--tripp-gold);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: 1rem;
    font-weight: 500;
  }

  .hero-title {
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    font-weight: 800;
    color: var(--tripp-warm-white);
    margin-bottom: 1rem;
    line-height: 1.15;
    letter-spacing: -0.02em;
  }

  .hero-title .highlight {
    background: linear-gradient(135deg, var(--tripp-gold) 0%, var(--tripp-gold-light) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-description {
    font-size: 1.0625rem;
    color: var(--tripp-slate-gray);
    max-width: 640px;
    margin: 0 auto 2.5rem;
    line-height: 1.7;
  }

  .hero-stats {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .stat-item {
    text-align: center;
    padding: 1rem 1.5rem;
    background: rgba(44, 74, 92, 0.3);
    border-radius: 12px;
    border: 1px solid rgba(122, 150, 168, 0.1);
    min-width: 120px;
  }

  .stat-value {
    font-family: var(--font-mono);
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--tripp-gold);
    line-height: 1.2;
  }

  .stat-label {
    font-size: 0.6875rem;
    color: var(--tripp-steel-blue);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-top: 0.25rem;
    font-weight: 500;
  }

  /* ========================================
     SECTION HEADERS
     ======================================== */
  .section-header {
    margin-bottom: 2rem;
  }

  .section-eyebrow {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--tripp-gold);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: 500;
  }

  .section-eyebrow::before {
    content: '';
    width: 24px;
    height: 2px;
    background: var(--tripp-gold);
  }

  .section-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--tripp-warm-white);
    margin-bottom: 0.5rem;
    letter-spacing: -0.01em;
  }

  .section-description {
    color: var(--tripp-slate-gray);
    max-width: 600px;
    font-size: 0.9375rem;
  }

  .savings-note {
    display: block;
    margin-top: 0.5rem;
    color: var(--color-success);
    font-weight: 500;
    font-size: 0.875rem;
  }

  /* ========================================
     TIMELINE / PHASE CARDS
     ======================================== */
  .timeline-container {
    position: relative;
    padding: 1rem 0 2rem;
  }

  .timeline-phases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.25rem;
  }

  .phase-card {
    background: linear-gradient(135deg, 
      rgba(44, 74, 92, 0.5) 0%, 
      rgba(44, 74, 92, 0.2) 100%
    );
    border: 1px solid rgba(122, 150, 168, 0.15);
    border-radius: 16px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .phase-card:hover {
    transform: translateY(-4px);
    border-color: rgba(201, 162, 39, 0.4);
    box-shadow: 
      0 12px 32px -8px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(201, 162, 39, 0.1);
  }

  .phase-card.active {
    border-color: var(--tripp-gold);
    background: linear-gradient(135deg, 
      rgba(201, 162, 39, 0.12) 0%, 
      rgba(44, 74, 92, 0.5) 100%
    );
    box-shadow: 
      0 0 24px rgba(201, 162, 39, 0.15),
      inset 0 1px 0 rgba(201, 162, 39, 0.1);
  }

  .phase-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }

  .phase-number {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, var(--tripp-gold) 0%, #B8922B 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--tripp-navy);
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(201, 162, 39, 0.3);
  }

  .phase-info h3 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--tripp-warm-white);
    margin-bottom: 0.125rem;
  }

  .phase-info span {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--tripp-sky-blue);
    font-weight: 500;
  }

  .phase-steps {
    margin-top: 0.75rem;
  }

  .step-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(122, 150, 168, 0.08);
  }

  .step-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .step-day {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    color: var(--tripp-sky-blue);
    background: rgba(107, 163, 200, 0.15);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    white-space: nowrap;
    font-weight: 500;
    flex-shrink: 0;
  }

  .step-content h4 {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--tripp-warm-white);
    margin-bottom: 0.125rem;
  }

  .step-content p {
    font-size: 0.75rem;
    color: var(--tripp-slate-gray);
    line-height: 1.5;
  }

  /* ========================================
     FORM STRUCTURE
     ======================================== */
  .form-structure {
    background: linear-gradient(135deg, 
      rgba(44, 74, 92, 0.4) 0%, 
      rgba(44, 74, 92, 0.2) 100%
    );
    border: 1px solid rgba(122, 150, 168, 0.15);
    border-radius: 20px;
    padding: 2rem;
    margin: 2.5rem 0;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
    margin-top: 2rem;
  }

  .column-card {
    background: rgba(26, 26, 46, 0.6);
    border: 1px solid rgba(122, 150, 168, 0.12);
    border-radius: 12px;
    padding: 1.25rem 1rem;
    text-align: center;
    transition: all 0.25s ease;
  }

  .column-card:hover {
    border-color: var(--tripp-gold);
    transform: translateY(-2px);
  }

  .column-card.auto-calc {
    border-color: rgba(16, 185, 129, 0.35);
    background: rgba(16, 185, 129, 0.08);
  }

  .column-letter {
    font-family: var(--font-mono);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--tripp-gold);
    margin-bottom: 0.5rem;
  }

  .column-card.auto-calc .column-letter {
    color: var(--color-success);
  }

  .column-title {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--tripp-warm-white);
    margin-bottom: 0.5rem;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1.3;
  }

  .column-source {
    font-size: 0.6875rem;
    color: var(--tripp-slate-gray);
    font-style: italic;
  }

  .column-formula {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--color-success);
    background: rgba(16, 185, 129, 0.15);
    padding: 0.25rem 0.625rem;
    border-radius: 4px;
    margin-top: 0.625rem;
    display: inline-block;
    font-weight: 500;
  }

  /* ========================================
     BUDGET MAPPING
     ======================================== */
  .mapping-section {
    margin: 2.5rem 0;
  }

  .mapping-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.25rem;
    margin-top: 2rem;
  }

  .mapping-card {
    background: linear-gradient(135deg, 
      rgba(44, 74, 92, 0.45) 0%, 
      rgba(44, 74, 92, 0.2) 100%
    );
    border: 1px solid rgba(122, 150, 168, 0.12);
    border-radius: 14px;
    padding: 1.25rem;
    transition: all 0.25s ease;
  }

  .mapping-card:hover {
    transform: translateY(-2px);
    border-color: rgba(201, 162, 39, 0.3);
    box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.3);
  }

  .mapping-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    padding-bottom: 0.875rem;
    border-bottom: 1px solid rgba(122, 150, 168, 0.1);
  }

  .mapping-title {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--tripp-warm-white);
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .mapping-note {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--tripp-sky-blue);
    font-style: italic;
  }

  .mapping-amount {
    font-family: var(--font-mono);
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--tripp-gold);
  }

  .mapping-items {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .mapping-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8125rem;
    padding: 0.375rem 0;
    border-bottom: 1px dashed rgba(122, 150, 168, 0.08);
  }

  .mapping-item:last-child {
    border-bottom: none;
  }

  .mapping-item span:first-child {
    color: var(--tripp-slate-gray);
  }

  .mapping-item span:last-child {
    font-family: var(--font-mono);
    color: var(--tripp-warm-white);
    font-size: 0.75rem;
  }

  .mapping-percentage {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    margin-top: 1rem;
    padding-top: 0.875rem;
    border-top: 1px solid rgba(122, 150, 168, 0.1);
  }

  .percentage-bar {
    flex: 1;
    height: 6px;
    background: rgba(122, 150, 168, 0.15);
    border-radius: 3px;
    overflow: hidden;
  }

  .percentage-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--tripp-gold) 0%, var(--tripp-gold-light) 100%);
    border-radius: 3px;
    transition: width 0.6s ease;
  }

  .percentage-label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--tripp-gold);
    min-width: 40px;
    text-align: right;
    font-weight: 600;
  }

  /* ========================================
     CHECKLIST
     ======================================== */
  .checklist-section {
    margin: 2.5rem 0;
  }

  .checklist-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 1.25rem;
    margin-top: 2rem;
  }

  .checklist-card {
    background: linear-gradient(135deg, 
      rgba(44, 74, 92, 0.45) 0%, 
      rgba(44, 74, 92, 0.2) 100%
    );
    border: 1px solid rgba(122, 150, 168, 0.12);
    border-radius: 14px;
    padding: 1.25rem;
  }

  .checklist-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    padding-bottom: 0.875rem;
    border-bottom: 1px solid rgba(122, 150, 168, 0.1);
  }

  .checklist-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
    flex-shrink: 0;
  }

  .checklist-icon.pre { 
    background: rgba(107, 163, 200, 0.2); 
    color: var(--tripp-sky-blue); 
  }
  .checklist-icon.submit { 
    background: rgba(201, 162, 39, 0.2); 
    color: var(--tripp-gold); 
  }
  .checklist-icon.post { 
    background: rgba(16, 185, 129, 0.2); 
    color: var(--color-success); 
  }

  .checklist-title {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--tripp-warm-white);
  }

  .checklist-timing {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    color: var(--tripp-slate-gray);
    font-weight: 500;
  }

  .checklist-items {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .checklist-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.5rem 0.375rem;
    border-radius: 8px;
    transition: all 0.15s ease;
    cursor: pointer;
  }

  .checklist-item:hover {
    background: rgba(122, 150, 168, 0.08);
  }

  .check-box {
    width: 18px;
    height: 18px;
    border: 2px solid var(--tripp-steel-blue);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.15s ease;
    margin-top: 1px;
  }

  .checklist-item.checked .check-box {
    background: var(--color-success);
    border-color: var(--color-success);
  }

  .check-mark {
    color: var(--tripp-navy);
    font-size: 0.625rem;
    opacity: 0;
    transition: opacity 0.15s ease;
  }

  .checklist-item.checked .check-mark {
    opacity: 1;
  }

  .checklist-item span:last-child {
    font-size: 0.8125rem;
    color: var(--tripp-warm-white);
    transition: all 0.15s ease;
    line-height: 1.4;
  }

  .checklist-item.checked span:last-child {
    color: var(--tripp-slate-gray);
    text-decoration: line-through;
  }

  /* ========================================
     PITFALLS
     ======================================== */
  .pitfalls-section {
    margin: 2.5rem 0;
  }

  .pitfalls-grid {
    display: grid;
    gap: 0.875rem;
    margin-top: 2rem;
  }

  .pitfall-card {
    background: linear-gradient(135deg, 
      rgba(239, 68, 68, 0.08) 0%, 
      rgba(44, 74, 92, 0.3) 100%
    );
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
    transition: all 0.3s ease;
  }

  .pitfall-card:hover {
    border-color: rgba(16, 185, 129, 0.4);
    background: linear-gradient(135deg, 
      rgba(16, 185, 129, 0.08) 0%, 
      rgba(44, 74, 92, 0.3) 100%
    );
  }

  .pitfall-number {
    width: 32px;
    height: 32px;
    background: rgba(239, 68, 68, 0.2);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 0.8125rem;
    color: var(--color-error);
    transition: all 0.3s ease;
    flex-shrink: 0;
  }

  .pitfall-card:hover .pitfall-number {
    background: rgba(16, 185, 129, 0.2);
    color: var(--color-success);
  }

  .pitfall-content {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .pitfall-problem {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-error);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.3s ease;
  }

  .pitfall-card:hover .pitfall-problem {
    color: var(--color-success);
  }

  .pitfall-solution {
    font-size: 0.8125rem;
    color: var(--tripp-slate-gray);
    padding-left: 1.25rem;
    position: relative;
    line-height: 1.5;
  }

  .pitfall-solution::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--color-success);
  }

  /* ========================================
     EXAMPLE SCENARIO
     ======================================== */
  .example-section {
    margin: 2.5rem 0;
    background: linear-gradient(135deg,
      rgba(201, 162, 39, 0.1) 0%,
      rgba(44, 74, 92, 0.4) 100%
    );
    border: 1px solid rgba(201, 162, 39, 0.2);
    border-radius: 20px;
    padding: 1.75rem;
  }

  .budget-construction-notice {
    background: linear-gradient(135deg,
      rgba(201, 162, 39, 0.12) 0%,
      rgba(44, 74, 92, 0.35) 100%
    );
    border: 1px solid rgba(201, 162, 39, 0.25);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    margin: 1.5rem 0 2rem 0;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .construction-badge {
    background: var(--tripp-gold);
    color: var(--tripp-navy);
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    padding: 0.25rem 0.625rem;
    border-radius: 4px;
    text-transform: uppercase;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .construction-text {
    margin: 0;
    font-size: 0.9375rem;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.6;
    flex: 1 1 0%;
    min-width: 220px;
  }

  .example-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.75rem;
  }

  .example-badge {
    background: var(--tripp-gold);
    color: var(--tripp-navy);
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 700;
    padding: 0.25rem 0.625rem;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .example-amount {
    font-family: var(--font-mono);
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--tripp-gold);
  }

  .example-timeline {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .timeline-entry {
    display: grid;
    grid-template-columns: 90px 1fr;
    gap: 1rem;
    padding: 0.875rem 1rem;
    background: rgba(26, 26, 46, 0.5);
    border-radius: 10px;
    border-left: 3px solid var(--tripp-gold);
    transition: all 0.2s ease;
  }

  .timeline-entry:hover {
    background: rgba(26, 26, 46, 0.7);
    transform: translateX(4px);
  }

  .timeline-date {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--tripp-gold);
    font-weight: 600;
  }

  .timeline-day {
    font-size: 0.6875rem;
    color: var(--tripp-slate-gray);
  }

  .timeline-action {
    font-size: 0.8125rem;
    color: var(--tripp-warm-white);
    line-height: 1.5;
  }

  .timeline-action strong {
    color: var(--tripp-warm-white);
    font-weight: 600;
  }

  .example-result {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-top: 1.5rem;
    padding-top: 1.25rem;
    border-top: 1px solid rgba(122, 150, 168, 0.1);
  }

  .result-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(16, 185, 129, 0.12);
    padding: 0.5rem 0.875rem;
    border-radius: 8px;
    font-size: 0.8125rem;
    color: var(--color-success);
    border: 1px solid rgba(16, 185, 129, 0.2);
  }

  /* ========================================
     RESOURCES
     ======================================== */
  .resources-section {
    margin: 2.5rem 0;
  }

  .resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.25rem;
    margin-top: 2rem;
  }

  .resource-card {
    background: linear-gradient(135deg, 
      rgba(44, 74, 92, 0.45) 0%, 
      rgba(44, 74, 92, 0.2) 100%
    );
    border: 1px solid rgba(122, 150, 168, 0.12);
    border-radius: 14px;
    padding: 1.25rem;
  }

  .resource-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .resource-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
    background: rgba(201, 162, 39, 0.15);
    color: var(--tripp-gold);
    flex-shrink: 0;
  }

  .resource-title {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--tripp-warm-white);
  }

  .resource-items {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .resource-item {
    font-size: 0.8125rem;
    color: var(--tripp-slate-gray);
    padding: 0.375rem 0;
    border-bottom: 1px dashed rgba(122, 150, 168, 0.08);
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    line-height: 1.4;
  }

  .resource-item:last-child {
    border-bottom: none;
  }

  .resource-item::before {
    content: '•';
    color: var(--tripp-gold);
    flex-shrink: 0;
  }

  /* ========================================
     FOOTER
     ======================================== */
  .footer {
    margin-top: 3rem;
    padding: 1.5rem;
    border-top: 1px solid rgba(122, 150, 168, 0.1);
    text-align: center;
  }

  .footer-text {
    font-size: 0.75rem;
    color: var(--tripp-slate-gray);
  }

  .footer-version {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    color: var(--tripp-steel-blue);
    margin-top: 0.375rem;
  }

  /* ========================================
     RESPONSIVE
     ======================================== */
  @media (max-width: 1100px) {
    .header-content {
      flex-direction: column;
      gap: 1rem;
    }
  }

  @media (max-width: 900px) {
    .nav-tabs {
      flex-wrap: wrap;
      justify-content: center;
    }

    .form-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .form-grid > *:nth-child(4),
    .form-grid > *:nth-child(5) {
      grid-column: span 1;
    }
  }

  @media (max-width: 640px) {
    .header {
      padding: 0.75rem 1rem;
    }

    .logo-text {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.125rem;
    }

    .logo-divider {
      display: none;
    }

    .logo-title {
      font-size: 1rem;
    }

    .logo-subtitle {
      font-size: 0.6875rem;
    }
    
    .main-content {
      padding: 1.5rem 1rem;
    }

    .budget-construction-notice {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 1rem;
    }

    .construction-text {
      font-size: 0.875rem;
    }

    .form-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .form-grid > *:last-child {
      grid-column: span 2;
    }

    .timeline-entry {
      grid-template-columns: 1fr;
      gap: 0.25rem;
    }

    .checklist-grid {
      grid-template-columns: 1fr;
    }

    .hero-stats {
      gap: 1rem;
    }

    .stat-item {
      min-width: 100px;
      padding: 0.75rem 1rem;
    }
  }

  /* ========================================
     ANIMATIONS
     ======================================== */
  @keyframes fadeInUp {
    from { 
      opacity: 0; 
      transform: translateY(12px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }

  .animate-in {
    animation: fadeInUp 0.4s ease forwards;
  }
`;

// ============================================================================
// Icon Components
// ============================================================================

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const CheckCircleIcon = () => <span>✓</span>;

// ============================================================================
// Data
// ============================================================================

const phases = [
  {
    number: 1,
    title: "Planning & Preparation",
    timeline: "T-20 to T-12 days",
    steps: [
      { day: "T-20", title: "CFO Budget Review", desc: "Review Budget Table 2, identify 90-day planned outlays" },
      { day: "T-15", title: "Map to State Form", desc: "Allocate budget items to 7 admin categories" },
      { day: "T-14", title: "Update Historical Data", desc: "Update columns B, C, D from bank records" },
      { day: "T-13", title: "Draft Budget Narrative", desc: "2-3 page explanation, detail large items (>$100K)" },
      { day: "T-12", title: "Internal Review", desc: "MD/CIO and Grants Manager review" }
    ]
  },
  {
    number: 2,
    title: "Form Completion & Submission",
    timeline: "T-10 days (Deadline)",
    steps: [
      { day: "T-10", title: "Complete Excel Form", desc: "Fill all columns, verify calculations" },
      { day: "T-10", title: "CFO Signature", desc: "Sign certification, add bank payment info" },
      { day: "T-10", title: "Assemble Package", desc: "Excel form, narrative, invoices (if >$50K)" },
      { day: "T-10", title: "Email Submission", desc: "Send to GOR, CC EUR/ACE, MD/CIO, Chairman" },
      { day: "T-10", title: "Log Submission", desc: "Update Grants Database, set calendar reminders" }
    ]
  },
  {
    number: 3,
    title: "State Department Review",
    timeline: "T-9 to T-1 days",
    steps: [
      { day: "T-9", title: "GOR Reviews Request", desc: "Completeness, narrative, admin cap compliance" },
      { day: "T-5", title: "Possible Outcomes", desc: "Approve, request clarification, or revision" },
      { day: "T-3", title: "Grants Officer Approval", desc: "GO signs SF-270 after GOR recommendation" },
      { day: "T-2", title: "Treasury Processing", desc: "CGFS processes within 5 business days of approval" }
    ]
  },
  {
    number: 4,
    title: "Funds Receipt & Monitoring",
    timeline: "Day T to T+90",
    steps: [
      { day: "T", title: "Wire Transfer Arrives", desc: "Treasury wires funds to TRIPP+ bank account" },
      { day: "T+2", title: "Confirm Receipt", desc: "Verify amount, record in accounting system" },
      { day: "Weekly", title: "Cash Burn Monitoring", desc: "Track actual vs. planned outlays" },
      { day: "Monthly", title: "Admin Cap Tracking", desc: "Monitor utilization (alert at 85%+)" },
      { day: "T+75", title: "Plan Next Request", desc: "Begin Phase 1 for next 90-day cycle" }
    ]
  }
];

const budgetMapping = [
  {
    category: "Salaries & Benefits",
    amount: "TBD",
    percentage: 46,
    items: [
      { name: "Prorated Salaries (8 staff)", value: "TBD" },
      { name: "Health Insurance & Benefits", value: "TBD" },
      { name: "Recruiting & Onboarding", value: "TBD" }
    ]
  },
  {
    category: "Professional Fees",
    amount: "TBD",
    percentage: 39,
    note: "(incl. Outsourced CFO $35K)",
    items: [
      { name: "Outsourced CFO Services (Q1)", value: "TBD" },
      { name: "Legal Counsel (US)", value: "TBD" },
      { name: "Regional Legal Counsel", value: "TBD" },
      { name: "Audit & Tax Advisory", value: "TBD" },
      { name: "Executive Search & IT Consulting", value: "TBD" }
    ]
  },
  {
    category: "Operating Expenses",
    amount: "TBD",
    percentage: 10,
    items: [
      { name: "Technology & Software", value: "TBD" },
      { name: "Insurance (D&O, Cyber)", value: "TBD" },
      { name: "Marketing & Website", value: "TBD" },
      { name: "Telecom & Supplies", value: "TBD" }
    ]
  },
  {
    category: "Travel",
    amount: "TBD",
    percentage: 2,
    items: [
      { name: "Domestic (Recruiting, State meetings)", value: "TBD" },
      { name: "International Setup (Reduced)", value: "TBD" }
    ]
  },
  {
    category: "Building Rent / Lease",
    amount: "TBD",
    percentage: 2,
    items: [
      { name: "DC HQ Co-working (3 mo)", value: "TBD" },
      { name: "Armenia Office Setup", value: "TBD" },
      { name: "Azerbaijan Office Setup", value: "TBD" }
    ]
  },
  {
    category: "Furniture & Fixtures",
    amount: "TBD",
    percentage: 1,
    items: [
      { name: "DC Office Equipment", value: "TBD" },
      { name: "Regional Office Setup", value: "TBD" }
    ]
  },
  {
    category: "Other",
    amount: "TBD",
    percentage: 1,
    items: [
      { name: "Bank Fees & Setup", value: "TBD" },
      { name: "FX & Contingency", value: "TBD" }
    ]
  }
];

const pitfalls = [
  {
    problem: "Submit too late (funds don't arrive when needed)",
    solution: "Submit 10 business days before funds needed (15 days if complex)"
  },
  {
    problem: "Incomplete form (missing bank info, unsigned)",
    solution: "Use checklist before submission; verify all required fields"
  },
  {
    problem: "Budget narrative too vague (State requests clarification)",
    solution: "Use narrative template; explain large line items (>$100K) in detail"
  },
  {
    problem: "Incorrect carry-over calculation (Column D wrong)",
    solution: "Reconcile bank statements monthly; maintain accurate Column B & C"
  },
  {
    problem: "Exceed 90-day coverage (Grant Agreement violation)",
    solution: "Max 90 days; if unsure, request shorter period (60-75 days)"
  },
  {
    problem: "Admin cap violation (cumulative expenses exceed 5%)",
    solution: "Track monthly; use dashboard alerts (Yellow: 70-85%, Red: >85%)"
  },
  {
    problem: "No follow-up (don't know when funds will arrive)",
    solution: "Confirm receipt of submission with GOR; set calendar reminders"
  }
];

const exampleTimeline = [
  { date: "Feb 10", day: "Day 10", action: "CFO (acting/interim) begins budget review" },
  { date: "Feb 13", day: "Day 13", action: "<strong>Map $800K budget</strong> to State form categories" },
  { date: "Feb 17", day: "Day 17", action: "Internal review (MD/CIO, Chairman)" },
  { date: "Feb 19", day: "Day 19", action: "📧 <strong>SUBMIT to GOR</strong> — Coverage: Feb 15 – May 15, 2026" },
  { date: "Feb 19-27", day: "Day 19-27", action: "State Department review (7 business days)" },
  { date: "Feb 27", day: "Day 27", action: "GOR approves, Treasury initiates wire" },
  { date: "Feb 28", day: "Day 28", action: "💰 <strong>Wire arrives</strong> — Amount: $800,000" },
  { date: "Mar 1", day: "Day 30-45", action: "Dir Finance (or outsourced CFO) confirms receipt; Dir Finance/CCO start by Day 30-45" }
];

const preSubmissionChecklist = [
  "Budget reviewed and mapped to State form categories",
  "Column B (Cash Advances Received) updated from bank records",
  "Column C (Cash Outlays to Date) updated from accounting system",
  "Column D auto-calculated correctly (B - C)",
  "Column E (Planned Outlays) entered from budget mapping",
  "Column F auto-calculated correctly (E - D)",
  "Disbursement Period dates filled (From/To)",
  "Number of days = 90 (or less, never more)",
  "CFO signature added",
  "Bank payment info complete (Name, Address, Routing, Account)",
  "Budget narrative attached (2-3 pages)"
];

const submissionChecklist = [
  "Email to GOR with subject: \"TRIPP+ Periodic Advance Request - [Period]\"",
  "CC: EUR/ACE, MD/CIO, Chairman",
  "All attachments included",
  "Logged in Grants Management Database",
  "Calendar reminder set for expected arrival (Day T-1 to T+1)"
];

const postSubmissionChecklist = [
  "Confirm wire arrival in bank account",
  "Verify amount matches Column F (Net Cash Requested)",
  "Record in accounting system",
  "Update cumulative advances received (for next request Column B)",
  "Confirm to MD/CIO and Chairman",
  "Update Grants Database status to \"Received\"",
  "Set reminder for next request planning (Day 75-80)"
];

// ============================================================================
// Components
// ============================================================================

function Header({ activeTab, setActiveTab }) {
  const tabs = ['Overview', 'Timeline', 'Form Structure', 'Budget Mapping', 'Checklist', 'Resources'];
  
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-badge">TRIPP+</div>
          <div className="logo-text">
            <div className="logo-title">Enterprise Fund</div>
            <div className="logo-divider"></div>
            <div className="logo-subtitle">Advance Request Process</div>
          </div>
        </div>
        <nav className="nav-tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-eyebrow">State Department Grant Agreement</div>
      <h1 className="hero-title">
        Advance Request <span className="highlight">Process Guide</span>
      </h1>
      <p className="hero-description">
        Complete visual guide for requesting fund advances from the Department of State. 
        From budget planning through funds receipt—everything CFOs need to know.
      </p>
      <div className="hero-stats">
        <div className="stat-item">
          <div className="stat-value">90</div>
          <div className="stat-label">Day Coverage</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">10</div>
          <div className="stat-label">Day Lead Time</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">5%</div>
          <div className="stat-label">Admin Cap</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">$200M</div>
          <div className="stat-label">Total Grant</div>
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  const [activePhase, setActivePhase] = useState(0);
  
  return (
    <section className="timeline-container">
      <div className="section-header">
        <div className="section-eyebrow">Process Timeline</div>
        <h2 className="section-title">Four Phases to Funding</h2>
        <p className="section-description">
          Follow this timeline to ensure funds arrive when needed. Submit at least 10 business days before funds are required.
        </p>
      </div>
      
      <div className="timeline-phases">
        {phases.map((phase, index) => (
          <div 
            key={index}
            className={`phase-card ${activePhase === index ? 'active' : ''}`}
            onClick={() => setActivePhase(index)}
          >
            <div className="phase-header">
              <div className="phase-number">{phase.number}</div>
              <div className="phase-info">
                <h3>{phase.title}</h3>
                <span>{phase.timeline}</span>
              </div>
            </div>
            
            <div className="phase-steps">
              {phase.steps.map((step, stepIndex) => (
                <div key={stepIndex} className="step-item">
                  <div className="step-day">{step.day}</div>
                  <div className="step-content">
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FormStructureSection() {
  const columns = [
    { letter: 'B', title: 'Cash Advances Received', source: 'Cumulative draws from State', isAuto: false },
    { letter: 'C', title: 'Cash Outlays to Date', source: 'Cumulative actual expenses', isAuto: false },
    { letter: 'D', title: 'Carry-Over Funds', source: 'Previous undisbursed', formula: 'B - C', isAuto: true },
    { letter: 'E', title: 'Planned Outlays', source: 'Budget forecast (this period)', isAuto: false },
    { letter: 'F', title: 'Net Cash Requested', source: 'Amount to receive', formula: 'E - D', isAuto: true }
  ];

  return (
    <section className="form-structure">
      <div className="section-header">
        <div className="section-eyebrow">Form Structure</div>
        <h2 className="section-title">5-Column Request Form</h2>
        <p className="section-description">
          The State Department form uses a 5-column structure. Columns D and F auto-calculate based on your inputs.
        </p>
      </div>

      <div className="form-grid">
        {columns.map((col, index) => (
          <div key={index} className={`column-card ${col.isAuto ? 'auto-calc' : ''}`}>
            <div className="column-letter">{col.letter}</div>
            <div className="column-title">{col.title}</div>
            <div className="column-source">{col.source}</div>
            {col.formula && (
              <div className="column-formula">= {col.formula}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function BudgetMappingSection() {
  return (
    <section className="mapping-section">
      <div className="section-header">
        <div className="section-eyebrow">Budget Mapping</div>
        <h2 className="section-title">Initial Draw Request: TBD</h2>
        <p className="section-description">
          How TRIPP+ budget line items map to State Department form categories for the first 90-day period.
        </p>
      </div>

      <div className="budget-construction-notice">
        <div className="construction-badge">UNDER CONSTRUCTION</div>
        <p className="construction-text">
          This budget is currently being revised. Dollar amounts shown as "TBD" will be updated once the new budget model is finalized.
        </p>
      </div>

      <div className="mapping-grid">
        {budgetMapping.map((item, index) => (
          <div key={index} className="mapping-card">
            <div className="mapping-header">
              <div className="mapping-title">
                {item.category}
                {item.note && <span className="mapping-note">{item.note}</span>}
              </div>
              <div className="mapping-amount">{item.amount}</div>
            </div>
            
            <div className="mapping-items">
              {item.items.map((subItem, subIndex) => (
                <div key={subIndex} className="mapping-item">
                  <span>{subItem.name}</span>
                  <span>{subItem.value}</span>
                </div>
              ))}
            </div>

            <div className="mapping-percentage">
              <div className="percentage-bar">
                <div 
                  className="percentage-fill" 
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <div className="percentage-label">{item.percentage}%</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ChecklistSection() {
  const [checkedItems, setCheckedItems] = useState(() => {
    // Load saved checkbox states from localStorage on mount
    const saved = localStorage.getItem('tripp-checklist-state');
    return saved ? JSON.parse(saved) : {};
  });

  const toggleItem = (section, index) => {
    const key = `${section}-${index}`;
    setCheckedItems(prev => {
      const newState = {
        ...prev,
        [key]: !prev[key]
      };
      // Save to localStorage whenever state changes
      localStorage.setItem('tripp-checklist-state', JSON.stringify(newState));
      return newState;
    });
  };

  const renderChecklist = (items, section, icon, title, timing) => (
    <div className="checklist-card">
      <div className="checklist-header">
        <div className={`checklist-icon ${section}`}>{icon}</div>
        <div>
          <div className="checklist-title">{title}</div>
          <div className="checklist-timing">{timing}</div>
        </div>
      </div>
      <div className="checklist-items">
        {items.map((item, index) => {
          const key = `${section}-${index}`;
          const isChecked = checkedItems[key];
          return (
            <div 
              key={index} 
              className={`checklist-item ${isChecked ? 'checked' : ''}`}
              onClick={() => toggleItem(section, index)}
            >
              <div className="check-box">
                <span className="check-mark"><CheckIcon /></span>
              </div>
              <span>{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="checklist-section">
      <div className="section-header">
        <div className="section-eyebrow">CFO Checklist</div>
        <h2 className="section-title">Submission Requirements</h2>
        <p className="section-description">
          Use this interactive checklist before every submission. Click items to mark them complete.
        </p>
      </div>

      <div className="checklist-grid">
        {renderChecklist(preSubmissionChecklist, 'pre', '📋', 'Pre-Submission', 'Day T-10')}
        {renderChecklist(submissionChecklist, 'submit', '📧', 'Submission', 'Day T-10')}
        {renderChecklist(postSubmissionChecklist, 'post', '✅', 'Post-Submission', 'Day T+1 to T+2')}
      </div>
    </section>
  );
}

function PitfallsSection() {
  return (
    <section className="pitfalls-section">
      <div className="section-header">
        <div className="section-eyebrow">Common Pitfalls</div>
        <h2 className="section-title">Avoid These Mistakes</h2>
        <p className="section-description">
          Learn from common errors to ensure smooth processing. Hover over each card to see the solution.
        </p>
      </div>

      <div className="pitfalls-grid">
        {pitfalls.map((pitfall, index) => (
          <div key={index} className="pitfall-card">
            <div className="pitfall-number">#{index + 1}</div>
            <div className="pitfall-content">
              <div className="pitfall-problem">
                <span>❌</span> {pitfall.problem}
              </div>
              <div className="pitfall-solution">
                {pitfall.solution}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExampleSection() {
  return (
    <section className="example-section">
      <div className="example-header">
        <div>
          <div className="example-badge">Example Scenario</div>
          <h2 className="section-title" style={{ marginTop: '0.5rem' }}>First Advance Request</h2>
          <p className="section-description">
            Fund established February 1, 2026. Funds needed by Day 30-45 (March 1-15) for Dir Finance/CCO start and payroll.
          </p>
        </div>
        <div className="example-amount">$800,000</div>
      </div>

      <div className="example-timeline">
        {exampleTimeline.map((entry, index) => (
          <div key={index} className="timeline-entry">
            <div>
              <div className="timeline-date">{entry.date}</div>
              <div className="timeline-day">{entry.day}</div>
            </div>
            <div 
              className="timeline-action"
              dangerouslySetInnerHTML={{ __html: entry.action }}
            />
          </div>
        ))}
      </div>

      <div className="example-result">
        <div className="result-item">
          <CheckCircleIcon /> Funds arrived 2+ days before needed
        </div>
        <div className="result-item">
          <CheckCircleIcon /> Outsourced CFO provides Day 1-14 oversight
        </div>
        <div className="result-item">
          <CheckCircleIcon /> Dir Finance/CCO start Day 25-45
        </div>
        <div className="result-item">
          <CheckCircleIcon /> $50K savings through optimized budget
        </div>
      </div>
    </section>
  );
}

function ResourcesSection() {
  return (
    <section className="resources-section">
      <div className="section-header">
        <div className="section-eyebrow">Resources</div>
        <h2 className="section-title">Documents & Contacts</h2>
        <p className="section-description">
          Key documents and contacts for the advance request process.
        </p>
      </div>

      <div className="resources-grid">
        <div className="resource-card">
          <div className="resource-header">
            <div className="resource-icon">📁</div>
            <div className="resource-title">Required Documents</div>
          </div>
          <div className="resource-items">
            <div className="resource-item">Periodic Advance Request Form (Annex 2 Excel)</div>
            <div className="resource-item">Budget to State Form Mapping Guide</div>
            <div className="resource-item">Budget Table 2: Monthly Cashflow</div>
            <div className="resource-item">Budget Narrative Template (2-3 pages)</div>
            <div className="resource-item">Large invoices (&gt;$50K) if applicable</div>
          </div>
        </div>

        <div className="resource-card">
          <div className="resource-header">
            <div className="resource-icon">👤</div>
            <div className="resource-title">Key Contacts</div>
          </div>
          <div className="resource-items">
            <div className="resource-item">Grants Officer's Representative (GOR)</div>
            <div className="resource-item">EUR/ACE Program Officer</div>
            <div className="resource-item">MD/CIO: Daniel Eckert</div>
            <div className="resource-item">Dir Finance & Grants Mgmt: [To be hired Day 25-45]</div>
            <div className="resource-item">Outsourced CFO: [Engaged Day 1-14]</div>
            <div className="resource-item">Grants Manager: [To be hired Day 60]</div>
          </div>
        </div>

        <div className="resource-card">
          <div className="resource-header">
            <div className="resource-icon">📅</div>
            <div className="resource-title">Key Deadlines</div>
          </div>
          <div className="resource-items">
            <div className="resource-item">Advance requests: 10 business days before needed</div>
            <div className="resource-item">Quarterly financial reports: 30 days after quarter-end</div>
            <div className="resource-item">Semi-annual reviews: Coordinated with EUR/ACE</div>
            <div className="resource-item">Annual Report: Month 14-15 (Year 1), then annually</div>
            <div className="resource-item">Next request planning: Day 75-80 of current period</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-text">
        TRIPP+ Enterprise Fund • State Department Advance Request Process Guide
      </div>
      <div className="footer-version">
        Version 1.1 • January 31, 2026 • Next Review: Day 90
      </div>
    </footer>
  );
}

// ============================================================================
// Main App Component
// ============================================================================

export default function App() {
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    return () => document.head.removeChild(styleElement);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <>
            <HeroSection />
            <TimelineSection />
            <ExampleSection />
            <PitfallsSection />
          </>
        );
      case 'Timeline':
        return <TimelineSection />;
      case 'Form Structure':
        return <FormStructureSection />;
      case 'Budget Mapping':
        return <BudgetMappingSection />;
      case 'Checklist':
        return <ChecklistSection />;
      case 'Resources':
        return <ResourcesSection />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="app-container">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}
