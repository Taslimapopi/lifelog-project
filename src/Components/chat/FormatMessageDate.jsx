export const formatMessageTime = (date) => {
  const d = new Date(date);
  const now = new Date();

  const isToday = d.toDateString() === now.toDateString();

  if (isToday) {
    return d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (d.toDateString() === yesterday.toDateString()) {
    return `Yesterday ${d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  const diffDays = Math.floor((now - d) / (1000 * 60 * 60 * 24));

  // within week or 7 days
  if (diffDays < 7) {
    return `${d.toLocaleDateString([], {
      weekday: "long",
    })} ${d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  // within year
  if (d.getFullYear() === now.getFullYear()) {
    return d.toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
  }

  // previous year count
  return d.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};