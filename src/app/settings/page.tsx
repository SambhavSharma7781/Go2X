"use client";

import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="space-y-4 relative z-10">
        <h2 className="text-4xl font-bold text-zinc-100 tracking-tight">Settings</h2>
        <p className="text-zinc-400 font-medium text-lg">
          Manage your account preferences and learning settings.
        </p>
      </div>

      <div className="bg-[#111111]/80 backdrop-blur-md p-12 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center space-y-6 shadow-2xl">
        <div className="w-20 h-20 rounded-2xl bg-[#1A1A1A] flex items-center justify-center border border-white/10 shadow-inner">
          <SettingsIcon className="w-10 h-10 text-zinc-500" />
        </div>
        <p className="text-zinc-200 font-medium tracking-wide">
          Advanced settings are being calibrated by the AI...
        </p>
      </div>
    </div>
  );
}
