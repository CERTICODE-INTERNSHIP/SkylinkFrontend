import { useState } from "react";
import { Search, Plane } from "lucide-react";

type TabType = "pnr" | "flight";

const TAB_CONFIG: Record<
  TabType,
  {
    label: string;
    inputLabel: string;
    placeholder: string;
    examples: string[];
  }
> = {
  pnr: {
    label: "By PNR",
    inputLabel: "PNR / Booking Reference",
    placeholder: "E.G.  SK7831",
    examples: ["SK7831", "SK4421"],
  },
  flight: {
    label: "By Flight No.",
    inputLabel: "Flight Number",
    placeholder: "E.G.  PR101",
    examples: ["PR101", "5J213"],
  },
};

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  examples,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  examples: string[];
}) => (
  <div className="mb-5">
    <label className="mb-2 block text-xs font-semibold text-slate-600">
      {label}
    </label>

    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value.toUpperCase())}
      maxLength={8}
      className="w-full rounded-xl border border-[#d8dfee] bg-white px-4 py-3.5 text-sm tracking-widest text-[#1a2a4a] outline-none transition placeholder:text-slate-300 focus:border-[#1e2d4a] focus:ring-2 focus:ring-[#1e2d4a]/10"
    />

    <p className="mt-2 text-xs text-slate-400">
      Try:{" "}
      {examples.map((ex, i) => (
        <span key={ex}>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-500">
            {ex}
          </code>
          {i < examples.length - 1 && " or "}
        </span>
      ))}
    </p>
  </div>
);

const Tabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}) => (
  <div className="mb-6 flex rounded-xl border border-[#e8ecf4] p-1">
    {(Object.keys(TAB_CONFIG) as TabType[]).map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${
          activeTab === tab
            ? "bg-[#1e2d4a] font-semibold text-white shadow-sm"
            : "text-slate-400 hover:text-slate-600"
        }`}
      >
        {TAB_CONFIG[tab].label}
      </button>
    ))}
  </div>
);

const PNRStatusPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("pnr");
  const [values, setValues] = useState<Record<TabType, string>>({
    pnr: "",
    flight: "",
  });

  const config = TAB_CONFIG[activeTab];

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f2f5]">
      {/* HERO */}
      <div className="flex flex-col items-center gap-3 bg-gradient-to-br from-[#1a2540] via-[#1e2d4a] to-[#384F68] px-6 pb-16 pt-12 text-center">
        <Plane size={28} color="#ffffff" strokeWidth={1.8} />
        <h1 className="text-2xl font-bold text-white">Flight Status</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-400">
          Real-time updates for your flight — gate, terminal, delays, and more.
        </p>
      </div>

      {/* SEARCH CARD */}
      <div className="flex flex-1 items-center justify-center px-5 py-12">
        <div className="w-full max-w-[420px]">
          <div className="rounded-2xl bg-white p-7 shadow-xl">
            
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <InputField
              label={config.inputLabel}
              placeholder={config.placeholder}
              examples={config.examples}
              value={values[activeTab]}
              onChange={(val) =>
                setValues((prev) => ({ ...prev, [activeTab]: val }))
              }
            />

            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#5E83AE] py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#162440] hover:-translate-y-px hover:shadow-lg active:translate-y-0">
              <Search size={15} strokeWidth={2.2} />
              Check Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PNRStatusPage;