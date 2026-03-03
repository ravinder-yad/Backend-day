const User = require("../models/User");
const Skill = require("../models/Skill");
const ExchangeRequest = require("../models/ExchangeRequest");

async function getPlatformStats(req, res) {
    try {
        const totalUsers = await User.countDocuments();
        const swapsToday = await ExchangeRequest.countDocuments({
            status: "accepted",
            updatedAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
        });
        const totalSkills = await Skill.countDocuments();

        // Registry Health = (Skills with description depth / Total Skills)
        const healthySkills = await Skill.countDocuments({ description: { $exists: true, $ne: "" } });
        const healthPercentage = totalSkills > 0 ? Math.round((healthySkills / totalSkills) * 100) : 100;

        res.json({
            activeBuilders: totalUsers,
            swapsToday,
            registryHealth: `${healthPercentage}%`
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch stats", error: error.message });
    }
}

async function getRecentActivity(req, res) {
    try {
        // Get last 3 skills
        const recentSkills = await Skill.find()
            .populate("owner", "name")
            .sort({ createdAt: -1 })
            .limit(3);

        // Get last 3 requests
        const recentRequests = await ExchangeRequest.find()
            .populate("sender", "name")
            .populate("skill", "title")
            .sort({ createdAt: -1 })
            .limit(3);

        const activity = [];

        recentSkills.forEach(s => {
            activity.push({
                id: `skill-${s._id}`,
                user: s.owner?.name || "Builder",
                type: "skill",
                target: s.title,
                time: s.createdAt
            });
        });

        recentRequests.forEach(r => {
            activity.push({
                id: `req-${r._id}`,
                user: r.sender?.name || "Builder",
                type: "swap",
                target: r.skill?.title || "Skill",
                time: r.createdAt
            });
        });

        // Sort by time and limit to 5
        const finalActivity = activity.sort((a, b) => b.time - a.time).slice(0, 5);

        res.json({ activity: finalActivity });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch activity", error: error.message });
    }
}

async function getUserStats(req, res) {
    try {
        const skillCount = await Skill.countDocuments({ owner: req.user._id });
        const acceptedSwaps = await ExchangeRequest.countDocuments({
            $or: [{ sender: req.user._id }, { receiver: req.user._id }],
            status: "accepted"
        });

        // Level calculation: (Skills * 20) + (Swaps * 10) capped at 100
        const progressValue = Math.min((skillCount * 20) + (acceptedSwaps * 10), 100);
        const levelName = progressValue >= 80 ? "Elite Builder" : progressValue >= 50 ? "Pro Contributor" : progressValue >= 20 ? "Skill Seeker" : "Newcomer";

        res.json({
            skillCount,
            acceptedSwaps,
            progress: `${progressValue || 5}%`,
            levelName
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user stats", error: error.message });
    }
}

module.exports = { getPlatformStats, getRecentActivity, getUserStats };
