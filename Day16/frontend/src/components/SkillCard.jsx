import { useAuth } from "../context/AuthContext";

function SkillCard({ skill, onRequest, onEdit, onDelete }) {
  const { user } = useAuth();
  const userId = user?._id?.toString();
  const skillOwnerId = (skill.owner?._id || skill.owner)?.toString();
  const isOwner = userId && skillOwnerId && userId === skillOwnerId;

  return (
    <div className="glass-panel" style={{
      padding: "2.5rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      position: "relative",
      overflow: "visible",
      minHeight: "420px",
      background: "var(--bg-card)",
      border: isOwner ? "1.5px solid var(--accent)" : "1px solid var(--glass-border)"
    }}>
      {/* Category Tag Float */}
      <div style={{
        position: "absolute",
        top: "-15px",
        right: "30px",
        background: "linear-gradient(135deg, var(--accent), #0ea171)",
        color: "#fff",
        padding: "0.5rem 1.2rem",
        borderRadius: "14px",
        fontSize: "0.75rem",
        fontWeight: "900",
        boxShadow: "0 10px 20px -5px var(--accent-glow)",
        zIndex: "10",
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }}>
        {skill.category}
      </div>

      {/* Header: Avatar & Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "0.5rem" }}>
        <div style={{
          width: "60px",
          height: "60px",
          fontSize: "1.5rem",
          borderRadius: "20px",
          background: isOwner ? "var(--accent)" : "#fff",
          display: "grid",
          placeItems: "center",
          boxShadow: "var(--shadow-crystal)",
          border: "1px solid var(--glass-border)",
          fontWeight: "950",
          color: isOwner ? "#fff" : "var(--accent)"
        }}>
          {skill.owner?.name?.[0] || skill.ownerName?.[0] || "S"}
        </div>
        <div>
          <h4 style={{
            fontSize: "1.3rem",
            fontWeight: "950",
            color: "var(--text-main)",
            letterSpacing: "-0.03em",
            marginBottom: "0.2rem",
            lineHeight: "1.1"
          }}>
            {skill.title}
          </h4>
          <p style={{
            color: "var(--text-dim)",
            fontSize: "0.85rem",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem"
          }}>
            <span style={{ color: "var(--accent)" }}>●</span> {isOwner ? "You (Owner)" : (skill.ownerName || "Builder")}
          </p>
        </div>
      </div>

      {/* Description Box (Glass-on-Glass) */}
      <div style={{
        background: "rgba(248, 250, 252, 0.4)",
        border: "1px solid var(--glass-border)",
        padding: "1.5rem",
        borderRadius: "20px",
        flexGrow: 1,
        display: "flex",
        alignItems: "center"
      }}>
        <p style={{
          color: "var(--text-dim)",
          fontSize: "0.95rem",
          lineHeight: "1.6",
          fontWeight: "500",
          margin: 0
        }}>
          {skill.description || "Expert-level skill in high-demand domain. Connect to discuss exchange details and project scope."}
        </p>
      </div>

      {/* Action Section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>

        {/* Only show Edit/Delete if isOwner is true */}
        {isOwner ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
            <button
              onClick={() => onEdit(skill)}
              className="btn btn-ghost"
              style={{ borderRadius: "15px", padding: "0.8rem", fontSize: "0.85rem", width: "100%", background: "#fff" }}
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => onDelete(skill._id)}
              className="btn"
              style={{
                borderRadius: "15px",
                padding: "0.8rem",
                fontSize: "0.85rem",
                background: "#fff5f5",
                color: "#ef4444",
                border: "1px solid #fee2e2",
                width: "100%"
              }}
            >
              🗑️ Delete
            </button>
          </div>
        ) : (
          <button
            onClick={() => onRequest(skill)}
            className="btn btn-primary"
            style={{ width: "100%", borderRadius: "18px", padding: "1.1rem" }}
          >
            Send Swap Request 🤝
          </button>
        )}
      </div>
    </div>
  );
}

export default SkillCard;
