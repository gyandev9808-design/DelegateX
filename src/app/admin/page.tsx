"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Trash2, ArrowUp, ArrowDown, Edit2, Check, Shield, Globe } from "lucide-react";

interface CountryItem {
  id: string;
  name: string;
  assignedDelegate: string;
}

export default function AdminCountryPanel() {
  const [committeeName, setCommitteeName] = useState("United Nations Security Council");
  const [topic, setTopic] = useState("Addressing Arctic Security & Maritime Sovereignty");
  
  // Dynamic countries list (starts empty or with defaults that can be edited/reordered)
  const [countries, setCountries] = useState<CountryItem[]>([
    { id: "1", name: "United States of America", assignedDelegate: "Unassigned" },
    { id: "2", name: "French Republic", assignedDelegate: "Unassigned" },
    { id: "3", name: "United Kingdom", assignedDelegate: "Unassigned" },
    { id: "4", name: "People's Republic of China", assignedDelegate: "Unassigned" },
    { id: "5", name: "Russian Federation", assignedDelegate: "Unassigned" },
  ]);

  const [newCountryName, setNewCountryName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNameValue, setEditNameValue] = useState("");

  const handleAddCountry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCountryName.trim()) return;
    setCountries([
      ...countries,
      {
        id: Date.now().toString(),
        name: newCountryName.trim(),
        assignedDelegate: "Unassigned",
      },
    ]);
    setNewCountryName("");
  };

  const handleDelete = (id: string) => {
    setCountries(countries.filter((c) => c.id !== id));
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= countries.length) return;
    const updated = [...countries];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setCountries(updated);
  };

  const startEdit = (country: CountryItem) => {
    setEditingId(country.id);
    setEditNameValue(country.name);
  };

  const saveEdit = (id: string) => {
    setCountries(
      countries.map((c) => (c.id === id ? { ...c, name: editNameValue.trim() || c.name } : c))
    );
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-indigo-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Secretariat & Admin Panel</h1>
              <p className="text-xs text-slate-400">Configure Committee and Arrange Delegation Roster</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/committee"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition"
            >
              Open Live Committee →
            </Link>
          </div>
        </div>

        {/* Committee Details Configuration */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-slate-400 block mb-1">Committee Name</label>
            <input
              type="text"
              value={committeeName}
              onChange={(e) => setCommitteeName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-400 block mb-1">Agenda Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Add Country Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base font-semibold text-white">Country Allocations ({countries.length})</h2>
            </div>
          </div>

          <form onSubmit={handleAddCountry} className="flex gap-3">
            <input
              type="text"
              placeholder="Enter country name (e.g., Japan, Germany, Brazil)..."
              value={newCountryName}
              onChange={(e) => setNewCountryName(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold flex items-center space-x-2 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Country</span>
            </button>
          </form>

          {/* Roster List with Arrangement Controls */}
          <div className="space-y-2 pt-2">
            {countries.length === 0 ? (
              <p className="text-center py-8 text-slate-500 text-sm">No countries added yet. Add delegations above.</p>
            ) : (
              countries.map((c, idx) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <span className="text-xs font-mono text-slate-500 w-6">{idx + 1}.</span>
                    {editingId === c.id ? (
                      <div className="flex items-center space-x-2 flex-1 max-w-sm">
                        <input
                          type="text"
                          value={editNameValue}
                          onChange={(e) => setEditNameValue(e.target.value)}
                          className="bg-slate-900 border border-indigo-500 rounded px-2 py-1 text-sm text-white w-full"
                          autoFocus
                        />
                        <button
                          onClick={() => saveEdit(c.id)}
                          className="p-1.5 bg-emerald-600 text-white rounded hover:bg-emerald-500"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm font-medium text-slate-200">{c.name}</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Reorder Buttons */}
                    <button
                      onClick={() => handleMove(idx, "up")}
                      disabled={idx === 0}
                      className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 rounded bg-slate-900 border border-slate-800"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMove(idx, "down")}
                      disabled={idx === countries.length - 1}
                      className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 rounded bg-slate-900 border border-slate-800"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>

                    {/* Edit Button */}
                    <button
                      onClick={() => startEdit(c)}
                      className="p-1.5 text-slate-400 hover:text-indigo-400 rounded bg-slate-900 border border-slate-800"
                      title="Edit Country Name"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 rounded bg-slate-900 border border-slate-800"
                      title="Remove Country"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
