"use client";

import { useState } from "react";
import {
  ArrowLeftRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  KeyRound,
  LayoutDashboard,
  Menu,
  ShieldCheck,
  Terminal,
  Users,
  X,
} from "lucide-react";

type NavItem = {
  readonly label: string;
  readonly href: string;
  readonly icon: React.ComponentType<{ className?: string }>;
};

const NAV_ITEMS: readonly NavItem[] = [
  { label: "Overview", href: "#top", icon: LayoutDashboard },
  { label: "Send & Receive", href: "#route-preview", icon: ArrowLeftRight },
  { label: "Agent Pass", href: "#agent-pass", icon: KeyRound },
  { label: "Activity", href: "#activity", icon: Clock },
  { label: "Contacts", href: "#contacts", icon: Users },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Overview");

  return (
    <>
      <header className="site-header-wrapper" role="banner">
        <div className="shell site-header-inner">
          {/* Brand Wordmark */}
          <div className="header-brand-group">
            <a
              className="wordmark"
              href="#top"
              aria-label="Telya home"
              onClick={() => setActiveItem("Overview")}
            >
              Telya<span className="wordmark-dot" aria-hidden="true">.</span>
            </a>

            {/* Desktop Primary Navigation (Clean Text, No Clutter) */}
            <nav className="desktop-nav" aria-label="Primary navigation">
              <ul className="nav-list">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeItem === item.label;
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className={`nav-link ${isActive ? "active" : ""}`}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setActiveItem(item.label)}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Header Right Actions */}
          <div className="header-actions">
            {/* Persistent Testnet Status Pill */}
            <button
              type="button"
              className="network-badge interactive-badge"
              onClick={() => setInspectorOpen((prev) => !prev)}
              aria-expanded={inspectorOpen}
              aria-label="Toggle Testnet and Judge inspection panel"
            >
              <span className="status-dot pulse" aria-hidden="true" />
              <span className="network-text">Testnet</span>
              <span className="network-chain-pill">Stellar · Base</span>
              <ChevronDown
                className={`badge-chevron ${inspectorOpen ? "open" : ""}`}
                aria-hidden="true"
              />
            </button>

            {/* Health / Judge Mode Link */}
            <a
              className="health-link"
              href="/api/health"
              aria-label="View system health"
            >
              System health
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="mobile-menu-toggle"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? (
                <X className="menu-icon" aria-hidden="true" />
              ) : (
                <Menu className="menu-icon" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Flyout Navigation Menu */}
        {mobileMenuOpen && (
          <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation">
            <nav className="mobile-nav-list" aria-label="Mobile navigation list">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.label;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`mobile-nav-item ${isActive ? "active" : ""}`}
                    onClick={() => {
                      setActiveItem(item.label);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Icon className="nav-icon" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
              <div className="mobile-nav-divider" />
              <a
                href="/api/health"
                className="mobile-nav-item secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Terminal className="nav-icon" />
                <span>System Health & Diagnostics</span>
              </a>
            </nav>
          </div>
        )}

        {/* Persistent Testnet / Judge Inspector Modal */}
        {inspectorOpen && (
          <div
            className="inspector-popover"
            role="region"
            aria-label="Judge mode environment inspector"
          >
            <div className="inspector-header">
              <div className="inspector-title">
                <ShieldCheck className="inspector-icon" />
                <strong>Environment & Verification Specs</strong>
              </div>
              <button
                type="button"
                className="inspector-close"
                onClick={() => setInspectorOpen(false)}
                aria-label="Close environment inspector"
              >
                <X className="inspector-close-icon" />
              </button>
            </div>
            <dl className="inspector-grid">
              <div>
                <dt>Primary Chain</dt>
                <dd>Stellar Testnet (Passkey Smart Account)</dd>
              </div>
              <div>
                <dt>Cross-Chain Rail</dt>
                <dd>Circle CCTP Standard (Base Sepolia ⇄ Stellar)</dd>
              </div>
              <div>
                <dt>Fee Policy</dt>
                <dd className="proof-text">
                  <CheckCircle2 className="inline-check" /> Sponsored / Free
                </dd>
              </div>
              <div>
                <dt>Completion Rule</dt>
                <dd>Verified destination recipient + exact amount</dd>
              </div>
              <div>
                <dt>AI Execution Boundary</dt>
                <dd>Intent parser only (deterministic routing & signing)</dd>
              </div>
            </dl>
          </div>
        )}
      </header>
    </>
  );
}
