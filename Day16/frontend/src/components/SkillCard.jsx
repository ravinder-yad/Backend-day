function SkillCard({ skill, onRequest, onDelete, showDelete = false }) {
  return (
    <article className="skill-card">
      <p className="skill-category">{skill.category}</p>
      <h3>{skill.title}</h3>
      <p>{skill.description}</p>
      <p className="skill-owner">Offered by: {skill.ownerName || "Anonymous"}</p>
      <div className="card-actions">
        {onRequest ? (
          <button className="btn btn-primary" onClick={() => onRequest(skill)}>
            Request Swap
          </button>
        ) : null}
        {showDelete ? (
          <button className="btn btn-danger" onClick={() => onDelete(skill._id)}>
            Delete
          </button>
        ) : null}
      </div>
    </article>
  );
}

export default SkillCard;
