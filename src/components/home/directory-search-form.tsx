"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

const CITIES = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
  "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur",
  "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Vadodara",
  "Firozabad", "Ludhiana",
];

interface DirectorySearchFormProps {
  tone: {
    panel: string;
    action: string;
  };
  primaryTask?: {
    route: string;
  };
}

export function DirectorySearchForm({ tone, primaryTask }: DirectorySearchFormProps) {
  const [serviceQuery, setServiceQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const enabledTasks = SITE_CONFIG.tasks.filter((t) => t.enabled);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".search-form-container")) {
        setShowServiceDropdown(false);
        setShowCityDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchUrl = `/listings${selectedCity ? `?city=${encodeURIComponent(selectedCity)}` : ""}`;

  return (
    <div className={`mt-8 grid gap-3 rounded-[2rem] p-4 ${tone.panel} md:grid-cols-[1.25fr_0.8fr_auto] search-form-container`}>
      {/* What do you need today */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <Search className="h-4 w-4 opacity-50" />
        </div>
        <input
          type="text"
          value={serviceQuery}
          onChange={(e) => {
            setServiceQuery(e.target.value);
            setShowServiceDropdown(true);
          }}
          onFocus={() => setShowServiceDropdown(true)}
          placeholder="What do you need today?"
          className="w-full rounded-full bg-black/5 px-4 py-3 pl-11 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          autoComplete="off"
        />
        {showServiceDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-xl shadow-lg z-50 max-h-60 overflow-auto">
            {enabledTasks
              .filter((t) => t.label.toLowerCase().includes(serviceQuery.toLowerCase()))
              .map((task) => (
                <button
                  key={task.key}
                  onClick={() => {
                    setServiceQuery(task.label);
                    setShowServiceDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-100 first:rounded-t-xl last:rounded-b-xl"
                >
                  {task.label}
                </button>
              ))}
            {enabledTasks.filter((t) =>
              t.label.toLowerCase().includes(serviceQuery.toLowerCase())
            ).length === 0 && (
              <div className="px-4 py-3 text-sm text-slate-400">No service found</div>
            )}
          </div>
        )}
      </div>

      {/* Choose area or city */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <MapPin className="h-4 w-4 opacity-50" />
        </div>
        <input
          type="text"
          value={cityQuery}
          onChange={(e) => {
            setCityQuery(e.target.value);
            setShowCityDropdown(true);
          }}
          onFocus={() => setShowCityDropdown(true)}
          placeholder="Choose area or city"
          className="w-full rounded-full bg-black/5 px-4 py-3 pl-11 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          autoComplete="off"
        />
        {showCityDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-xl shadow-lg z-50 max-h-60 overflow-auto">
            {CITIES.filter((city) =>
              city.toLowerCase().includes(cityQuery.toLowerCase())
            ).map((city) => (
              <button
                key={city}
                onClick={() => {
                  setSelectedCity(city);
                  setCityQuery(city);
                  setShowCityDropdown(false);
                }}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-100 first:rounded-t-xl last:rounded-b-xl"
              >
                {city}
              </button>
            ))}
            {CITIES.filter((city) =>
              city.toLowerCase().includes(cityQuery.toLowerCase())
            ).length === 0 && (
              <div className="px-4 py-3 text-sm text-slate-400">No city found</div>
            )}
          </div>
        )}
      </div>

      {/* Browse now button */}
      <Link
        href={searchUrl}
        className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}
      >
        Browse now
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
