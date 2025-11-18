// components/ReferralLevels.tsx
"use client";

import React from "react";

interface Level {
  icon: string;
  name: string;
  bonus: string;
  widthPercent: number; // e.g. 20 for 20%
  level: number;
  minInvest: string;
  teamInvest: string;
  directRefs: number;
}

const levels: Level[] = [
  {
    icon: "https://script.viserlab.com/hyiplab/demo/assets/images/user_rankings/64097c605c94c1678343264.png",
    name: "Silver",
    bonus: "$50.00",
    widthPercent: 20,
    level: 1,
    minInvest: "$300.00",
    teamInvest: "$1,000.00",
    directRefs: 2,
  },
  {
    icon: "https://script.viserlab.com/hyiplab/demo/assets/images/user_rankings/64097c66c93141678343270.png",
    name: "Silver Pro",
    bonus: "$100.00",
    widthPercent: 31.4286,
    level: 2,
    minInvest: "$1,000.00",
    teamInvest: "$10,000.00",
    directRefs: 10,
  },
  {
    icon: "https://script.viserlab.com/hyiplab/demo/assets/images/user_rankings/6408814bcf0de1678278987.png",
    name: "Gold",
    bonus: "$200.00",
    widthPercent: 42.8571,
    level: 3,
    minInvest: "$5,000.00",
    teamInvest: "$20,000.00",
    directRefs: 20,
  },
  {
    icon: "https://script.viserlab.com/hyiplab/demo/assets/images/user_rankings/6408816d0f1ef1678279021.png",
    name: "Gold Pro",
    bonus: "$300.00",
    widthPercent: 54.2857,
    level: 4,
    minInvest: "$10,000.00",
    teamInvest: "$300,000.00",
    directRefs: 25,
  },
  {
    icon: "https://script.viserlab.com/hyiplab/demo/assets/images/user_rankings/64097c73b39cd1678343283.png",
    name: "Platinum",
    bonus: "$500.00",
    widthPercent: 65.7143,
    level: 5,
    minInvest: "$15,000.00",
    teamInvest: "$40,000.00",
    directRefs: 50,
  },
  {
    icon: "https://script.viserlab.com/hyiplab/demo/assets/images/user_rankings/640881854eba41678279045.png",
    name: "Platinum Pro",
    bonus: "$800.00",
    widthPercent: 77.1429,
    level: 6,
    minInvest: "$20,000.00",
    teamInvest: "$100,000.00",
    directRefs: 70,
  },
  {
    icon: "https://script.viserlab.com/hyiplab/demo/assets/images/user_rankings/640881961499d1678279062.png",
    name: "Diamond",
    bonus: "$1,000.00",
    widthPercent: 88.5714,
    level: 7,
    minInvest: "$25,000.00",
    teamInvest: "$110,000.00",
    directRefs: 100,
  },
  {
    icon: "https://script.viserlab.com/hyiplab/demo/assets/images/user_rankings/640881a0876631678279072.png",
    name: "Ambassador",
    bonus: "$2,000.00",
    widthPercent: 100,
    level: 8,
    minInvest: "$50,000.00",
    teamInvest: "$200,000.00",
    directRefs: 150,
  },
];

export default function ReferralLevels() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {levels.map((lvl, i) => (
        <div
          key={i}
          className="group relative w-[260px] bg-[#1f1f1f] rounded-lg p-4"
        >
          <div className="flex items-center mb-3">
            <img src={lvl.icon} className="w-12 h-12 mr-3" alt={lvl.name} />
            <h4 className="text-white font-semibold">{lvl.name}</h4>
          </div>
          <div className="h-3 bg-gray-700 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-[hsla(40,54%,56%,1)]"
              style={{ width: `${lvl.widthPercent}%` }}
            />
          </div>
          <div className="text-white text-sm font-medium">
            <i className="las la-coins mr-1"></i> Bonus: {lvl.bonus}
          </div>

          {/* Tooltip */}
          <div
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200
                          absolute left-1/2 transform -translate-x-1/2 top-0 -mt-2
                          bg-[#2a2a2a] text-white text-sm rounded shadow-lg p-3 z-10"
          >
            <ul className="space-y-1">
              <li className="flex justify-between">
                <span>Level</span>
                <span>{lvl.level}</span>
              </li>
              <li className="flex justify-between">
                <span>Minimum Invest</span>
                <span>{lvl.minInvest}</span>
              </li>
              <li className="flex justify-between">
                <span>Team Invest</span>
                <span>{lvl.teamInvest}</span>
              </li>
              <li className="flex justify-content-between">
                <span>No. of Direct Referral</span>
                <span>{lvl.directRefs}</span>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
