const ExchangeRequest = require("../models/ExchangeRequest");
const Skill = require("../models/Skill");

async function createRequest(req, res) {
  try {
    const { skillId, message = "" } = req.body;
    if (!skillId) {
      return res.status(400).json({ message: "skillId is required" });
    }

    const skill = await Skill.findById(skillId);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    if (skill.owner.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot request your own skill" });
    }

    const existingRequest = await ExchangeRequest.findOne({
      skill: skillId,
      sender: req.user._id,
      status: "pending",
    });
    if (existingRequest) {
      return res.status(409).json({ message: "Pending request already exists for this skill" });
    }

    const exchangeRequest = await ExchangeRequest.create({
      skill: skill._id,
      sender: req.user._id,
      receiver: skill.owner,
      message,
    });

    return res.status(201).json({ message: "Request created", request: exchangeRequest });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create request", error: error.message });
  }
}

async function getMyRequests(req, res) {
  try {
    const requests = await ExchangeRequest.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    })
      .populate("skill", "title category")
      .populate("sender", "name email")
      .populate("receiver", "name email")
      .sort({ createdAt: -1 });

    return res.json({ requests });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch requests", error: error.message });
  }
}

async function updateRequestStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Status must be accepted or rejected" });
    }

    const request = await ExchangeRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only request receiver can update status" });
    }

    request.status = status;
    await request.save();
    return res.json({ message: "Request status updated", request });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update request", error: error.message });
  }
}

module.exports = { createRequest, getMyRequests, updateRequestStatus };
