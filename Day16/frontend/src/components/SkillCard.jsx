import { useAuth } from "../context/AuthContext";

function SkillCard({ skill, onRequest, onEdit, onDelete }) {
  const { user } = useAuth();

  const userId = user?._id?.toString();
  const skillOwnerId = skill.owner?.toString();
  const isOwner = userId && skillOwnerId && userId === skillOwnerId;

  const avatarLetter = (skill.ownerName || "U").charAt(0).toUpperCase();

  return (
    <div className={`skill-card-v2 ${isOwner ? 'owner-card' : ''}`} style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "2.2rem",
      background: "#ffffff",
      border: "1px solid #f1f5f9",
      borderRadius: "32px",
      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.03)",
      transition: "var(--transition-smooth)",
      position: "relative",
      minHeight: "400px"
    }}>
      {/* Top Section: Avatar & Category */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div style={{
          width: "48px",
          height: "48px",
          background: isOwner ? "var(--accent)" : "#f8fafc",
          borderRadius: "16px",
          display: "grid",
          placeItems: "center",
          fontSize: "1.2rem",
          fontWeight: "900",
          color: isOwner ? "#fff" : "var(--accent)",
          boxShadow: isOwner ? "0 8px 16px -4px var(--accent-glow)" : "none",
          border: isOwner ? "none" : "1px solid #e2e8f0"
        }}>
          {avatarLetter}
        </div>
        <span style={{
          background: "var(--accent-glow)",
          color: "var(--accent)",
          padding: "0.5rem 1rem",
          borderRadius: "100px",
          fontSize: "0.7rem",
          fontWeight: "850",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          border: "1px solid rgba(16, 185, 129, 0.1)"
        }}>
          {skill.category}
        </span>
      </div>

      {/* Content Section */}
      <div style={{ flexGrow: 1 }}>
        <h3 style={{
          fontSize: "1.6rem",
          fontWeight: "900",
          color: "var(--text-main)",
          marginBottom: "0.8rem",
          lineHeight: "1.2"
        }}>
          {skill.title}
        </h3>
        <p style={{
          color: "var(--text-dim)",
          fontSize: "0.95rem",
          lineHeight: "1.6",
          marginBottom: "2rem"
        }}>
          {skill.description}
        </p>
      </div>

      {/* Footer / Action Section */}
      <div style={{ marginTop: "auto" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.8rem",
          marginBottom: "1.5rem",
          padding: "0.8rem 1rem",
          background: "#f8fafc",
          borderRadius: "16px",
          border: "1px solid #f1f5f9"
        }}>
          <span style={{ fontSize: "0.8rem", color: "var(--text-dim)", fontWeight: "600" }}>By</span>
          <span style={{ fontSize: "0.85rem", fontWeight: "800", color: "var(--text-main)" }}>
            {isOwner ? "You (Owner)" : (skill.ownerName || "Builder")}
          </span>
        </div>

        {/* Global Action Bar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
            <button
              onClick={() => onEdit(skill)}
              className="btn btn-ghost"
              style={{
                padding: "0.7rem",
                fontSize: "0.85rem",
                justifyContent: "center",
                borderColor: "#e2e8f0",
                background: "#fff",
                borderRadius: "16px"
              }}
            >
              <span style={{ marginRight: "0.4rem" }}>✏️</span> Edit
            </button>
            <button
              onClick={() => onDelete(skill._id)}
              className="btn"
              style={{
                padding: "0.7rem",
                fontSize: "0.85rem",
                justifyContent: "center",
                background: "#fff5f5",
                color: "#e03131",
                border: "1px solid #ffe3e3",
                borderRadius: "16px"
              }}
            >
              <span style={{ marginRight: "0.4rem" }}>🗑️</span> Delete
            </button>
          </div>

          {!isOwner && (
            <button
              onClick={() => onRequest(skill)}
              className="btn btn-primary"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "1rem",
                borderRadius: "16px",
                fontSize: "0.95rem"
              }}
            >
              Connect & Swap
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SkillCard;
