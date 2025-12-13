import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxious";




const ReportLesson = ({ lessonId, userEmail }) => {
    console.log(lessonId,userEmail)
  const axios = useAxios();
  const [reason, setReason] = useState("");

  const reasons = [
    "Inappropriate Content",
    "Hate Speech or Harassment",
    "Misleading or False Information",
    "Spam or Promotional Content",
    "Sensitive or Disturbing Content",
    "Other",
  ];

  const handleReport = async () => {
  if (!reason) return alert("Please select a reason to report.");

  try {
    await axios.patch(`/lessons/${lessonId}/report`, {
      reporterEmail: userEmail,
      reason,
    });

    Swal.fire("Reported!", "Thank you for your report.", "success");
    setReason("");
  } catch (error) {
    Swal.fire("Error!", "Something went wrong. Try again.", "error");
  }
};


  return (
    <div className="mt-4">
      <select
        className="border p-2 rounded"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      >
        <option value="">Select reason</option>
        {reasons.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <button
        onClick={handleReport}
        disabled={!reason}
        className="ml-2 px-4 py-2 bg-red-600 text-white rounded disabled:bg-gray-400"
      >
        Submit Report
      </button>
    </div>
  );
};

export default ReportLesson;
