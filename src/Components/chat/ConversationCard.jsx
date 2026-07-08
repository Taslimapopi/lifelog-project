const ConversationCard = ({
  conversation,
  active,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer border-b p-4 transition

      ${
        active
          ? "bg-primary/10"
          : "hover:bg-secondary"
      }
      `}
    >
      <div className="flex items-center gap-3">
       <div className="avatar">
  {conversation.photoURL ? (
    <div className="w-12 rounded-full ring ring-primary ring-offset-2">
      <img
        src={conversation.photo}
        alt={conversation.name}
      />
    </div>
  ) : (
    <div className="placeholder">
      <div className="w-10 h-10 rounded-full bg-primary text-white flex justify-center items-center">
        <span className="font-semibold ">
          {conversation.name?.[0]?.toUpperCase()}
        </span>
      </div>
    </div>
  )}
</div>

        <div className="flex-1">
          <h3 className="font-semibold">
            {conversation.name}
          </h3>

          <p className="truncate text-sm text-base-content">
            {conversation.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationCard;