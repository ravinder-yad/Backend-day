const Skill = require("../models/Skill");

async function getSkills(req, res) {
  try {
    const { search = "", category = "" } = req.query;

    const query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (category) {
      query.category = category;
    }

    const skills = await Skill.find(query).populate("owner", "name email").sort({ createdAt: -1 });

    return res.json({
      skills: skills.map((skill) => ({
        _id: skill._id,
        title: skill.title,
        category: skill.category,
        description: skill.description,
        owner: skill.owner?._id,
        ownerName: skill.owner?.name,
      })),
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch skills", error: error.message });
  }
}

async function createSkill(req, res) {
  try {
    const { title, category, description } = req.body;

    if (!title || !category || !description) {
      return res.status(400).json({ message: "Title, category and description are required" });
    }

    const skill = await Skill.create({
      title,
      category,
      description,
      owner: req.user._id,
    });

    return res.status(201).json({ message: "Skill created", skill });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create skill", error: error.message });
  }
}

async function updateSkill(req, res) {
  try {
    const { id } = req.params;
    const { title, category, description } = req.body;

    const skill = await Skill.findById(id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    if (skill.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only edit your own skills" });
    }

    skill.title = title || skill.title;
    skill.category = category || skill.category;
    skill.description = description || skill.description;
    await skill.save();

    return res.json({ message: "Skill updated", skill });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update skill", error: error.message });
  }
}

async function deleteSkill(req, res) {
  try {
    const { id } = req.params;

    const skill = await Skill.findById(id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    if (skill.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own skills" });
    }

    await skill.deleteOne();
    return res.json({ message: "Skill deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete skill", error: error.message });
  }
}

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
