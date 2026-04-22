const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const sendEmail = require("../common/Emailsender");

// OTP Generator helper
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Ultra Premium Email Template
const getEmailTemplate = (name, otp, type) => `
    <div style="background-color: #f4f7f9; padding: 50px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.05);">
            <div style="background: linear-gradient(135deg, #0d6efd 0%, #0043a8 100%); padding: 40px; text-align: center;">
                <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 10px 20px; border-radius: 50px; color: white; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">
                    Secure Gateway
                </div>
                <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -1px;">AuthPremium</h1>
            </div>
            
            <div style="padding: 50px 40px; text-align: center;">
                <h2 style="color: #1e293b; margin: 0 0 15px; font-size: 24px; font-weight: 700;">${type === 'signup' ? 'Welcome aboard!' : 'Verification requested'}</h2>
                <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin-bottom: 40px;">
                    Hi ${name || 'User'},<br>
                    Please enter the 6-digit verification code below to access your account.
                </p>
                
                <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 30px; display: inline-block;">
                    <span style="font-size: 42px; font-weight: 800; letter-spacing: 12px; color: #0d6efd; font-family: 'Courier New', Courier, monospace;">${otp}</span>
                </div>
                
                <p style="color: #94a3b8; font-size: 13px; margin-top: 40px;">
                    Valid for <b>5 minutes</b>. For your security, do not share this code with anyone.
                </p>
            </div>
            
            <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #edf2f7;">
                <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                    Sent by AuthPremium Security Team<br>
                    © 2026 AuthPremium Inc. | Privacy Policy | Support
                </p>
            </div>
        </div>
    </div>
`;

// ================= SIGNUP =================
const signup = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ success: false, message: "Name & Email required" });
        }

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const otp = generateOTP();

        const newUser = new User({
            name,
            email,
            otp,
            otpExpire: new Date(Date.now() + 5 * 60 * 1000)
        });

        await newUser.save();

        // Send Premium Email
        try {
            await sendEmail(
                email,
                "Signup Verification Code",
                `Your code is: ${otp}`,
                getEmailTemplate(name, otp, 'signup')
            );
            console.log("✅ Signup Email Sent to:", email);
        } catch (emailError) {
            console.log("❌ Email failed but OTP is:", otp);
        }

        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp: process.env.NODE_ENV === "development" ? otp : undefined
        });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ success: false, message: "Signup failed" });
    }
};

// ================= SMART LOGIN (Auto-Signup) =================
const login = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email required" });
        }

        let user = await User.findOne({ email });

        // 🔥 SEAMLESS AUTH: Auto-create user if not found
        if (!user) {
            console.log("✨ New user detected! Auto-creating account for:", email);
            user = new User({
                email,
                name: email.split('@')[0], // Use email prefix as temporary name
                isVerified: false
            });
        }

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpire = new Date(Date.now() + 5 * 60 * 1000);

        await user.save();

        // Send Premium Email
        try {
            await sendEmail(
                email,
                "Verification Code",
                `Your verification code is: ${otp}`,
                getEmailTemplate(user.name, otp, 'login')
            );
            console.log("✅ OTP Email Sent to:", email);
        } catch (emailError) {
            console.log("❌ Email failed but OTP is:", otp);
        }

        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp: process.env.NODE_ENV === "development" ? otp : undefined
        });

    } catch (error) {
        console.error("Auth Error:", error);
        res.status(500).json({ success: false, message: "Authentication failed" });
    }
};

// ================= VERIFY OTP =================
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!user.otp || user.otp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        if (!user.otpExpire || user.otpExpire < new Date()) {
            return res.status(400).json({ success: false, message: "OTP expired" });
        }

        // clear OTP
        user.otp = null;
        user.otpExpire = null;
        user.isVerified = true;

        await user.save();

        // JWT Token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || "super_secret_auth_key_123",
            { expiresIn: "7d" }
        );

        res.status(200).json({
            success: true,
            message: "OTP verified",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Verify Error:", error);
        res.status(500).json({ success: false, message: "Verification failed" });
    }
};

module.exports = { signup, login, verifyOTP };