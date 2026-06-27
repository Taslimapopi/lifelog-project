const AISummaryModal = ({ summary, onClose }) => {
  if (!summary) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
        >✕</button>

        <h3 className="text-xl font-semibold mb-4">AI Lesson Summary</h3>

        <p className="text-gray-700 leading-relaxed">{summary}</p>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
};

export default AISummaryModal;