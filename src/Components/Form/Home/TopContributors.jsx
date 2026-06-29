import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxios from "../../../hooks/useAxious";

const RANK_CONFIG = [
  {
    rank: 2,
    label: "🥈",
    ring: "conic-gradient(from 0deg,#b4b2a9,#d3d1c7,#fff,#b4b2a9)",
    glow: "rgba(180,178,169,.45)",
    barH: "80px",
    barBg: "linear-gradient(180deg,#d3d1c7,#b4b2a9)",
    barText: "#5f5e5a",
    avatarSize: 84,
    delay: 0.1,
  },
  {
    rank: 1,
    label: "👑",
    ring: "conic-gradient(from 0deg,#ef9f27,#fac775,#faeeda,#ef9f27)",
    glow: "rgba(239,159,39,.55)",
    barH: "120px",
    barBg: "linear-gradient(180deg,#fac775,#ef9f27)",
    barText: "#412402",
    avatarSize: 104,
    delay: 0,
  },
  {
    rank: 3,
    label: "🥉",
    ring: "conic-gradient(from 0deg,#d85a30,#f0997b,#faece7,#d85a30)",
    glow: "rgba(216,90,48,.45)",
    barH: "56px",
    barBg: "linear-gradient(180deg,#f0997b,#d85a30)",
    barText: "#4a1b0c",
    avatarSize: 84,
    delay: 0.2,
  },
];

const reorder = (arr) => {
  if (arr.length < 3) return arr;
  return [arr[1], arr[0], arr[2]];
};

const TopContributors = () => {
  const axios = useAxios();
  const { data = [], isLoading, error } = useQuery({
    queryKey: ["topContributors"],
    queryFn: async () => {
      const res = await axios.get("/top-users");
      return res.data;
    },
  });

  const ordered = reorder(data);

  return (
    <section className="relative overflow-hidden w-full py-10 px-6">
      {/* Animated bg orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 w-56 h-56 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ background: "rgba(55,138,221,.1)", filter: "blur(36px)" }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-10 left-8 w-52 h-52 rounded-full"
          style={{ background: "rgba(212,83,126,.1)", filter: "blur(28px)" }}
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-6 right-8 w-44 h-44 rounded-full"
          style={{ background: "rgba(55,138,221,.1)", filter: "blur(24px)" }}
          animate={{ opacity: [0.12, 0.28, 0.12] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative text-center text-2xl font-semibold text-gray-800 mb-8 tracking-wide"
      >
        ✦ Top Premium Contributors ✦
      </motion.h2>

      {isLoading && (
        <p className="text-center text-gray-400">Loading contributors...</p>
      )}
      {error && (
        <p className="text-center text-red-400">Error loading contributors</p>
      )}

      {!isLoading && !error && (
        <>
          {/* Podium row */}
          <div className="relative flex justify-center items-end w-full max-w-2xl mx-auto gap-0">
            {ordered.map((user, i) => {
              const cfg = RANK_CONFIG[i];
              const isFirst = cfg.rank === 1;

              return (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: cfg.delay,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex-1 flex flex-col items-center gap-2 px-3"
                >
                  {/* Crown for 1st */}
                  {isFirst && (
                    <motion.div
                      animate={{ y: [0, -6, 0], rotate: [-8, -8, -8] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      className="text-2xl leading-none"
                    >
                      👑
                    </motion.div>
                  )}

                  {/* Avatar */}
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 1.07, 1] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: cfg.delay + 0.3,
                      }}
                      style={{
                        width: cfg.avatarSize,
                        height: cfg.avatarSize,
                        borderRadius: "50%",
                        padding: 3,
                        background: cfg.ring,
                        boxShadow: `0 0 ${isFirst ? 36 : 22}px ${cfg.glow}`,
                      }}
                    >
                      <img
                        src={user.photoURL || "/default-avatar.png"}
                        alt={user.displayName}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </motion.div>

                    {/* Medal */}
                    <span className="absolute -top-2 -right-2 text-xl leading-none">
                      {cfg.label}
                    </span>

                    {/* TOP badge */}
                    {isFirst && (
                      <span
                        className="absolute -bottom-1 -right-2 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: "#ef9f27", color: "#412402" }}
                      >
                        TOP
                      </span>
                    )}
                  </div>

                  {/* Name & info */}
                  <div className="text-center">
                    <p className="m-0 mb-0.5 font-semibold text-gray-800"
                      style={{ fontSize: isFirst ? 16 : 15 }}>
                      {user.displayName}
                    </p>
                    <p className="m-0 text-xs text-gray-400 truncate max-w-[120px]">
                      {user.email}
                    </p>
                  </div>

                  {/* Podium bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: cfg.barH }}
                    transition={{
                      delay: cfg.delay + 0.15,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      width: "100%",
                      borderRadius: "10px 10px 0 0",
                      background: cfg.barBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    <span
                      style={{
                        fontSize: isFirst ? 32 : 24,
                        fontWeight: 500,
                        color: cfg.barText,
                      }}
                    >
                      {cfg.rank}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Stage base */}
          <div className="w-full max-w-2xl mx-auto h-1.5 bg-gray-200 rounded-b" />
        </>
      )}
    </section>
  );
};

export default TopContributors;