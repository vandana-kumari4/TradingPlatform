import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export const UserProfile = () => {
  const { colors } = useTheme();
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState({
    name: "Vandana Kumari",
    email: "vandanasinghbhore04@gmail.com",
    bio: "Full-stack trader & engineer",
    city: "Jaipur",
    phone: "+91 6378 316593",
    avatar: "👩‍💻",
    portfolio: {
      totalValue: 450000,
      totalReturns: 12500,
      returnPercentage: 2.78,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  const containerStyle = {
    backgroundColor: colors.background,
    minHeight: "100vh",
    padding: "2rem",
  };

  const cardStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: "12px",
    padding: "2rem",
    marginBottom: "2rem",
  };

  const profileHeaderStyle = {
    display: "flex",
    gap: "2rem",
    alignItems: "flex-start",
    marginBottom: "2rem",
  };

  const avatarStyle = {
    fontSize: "80px",
    width: "120px",
    height: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceLight,
    borderRadius: "12px",
  };

  const profileInfoStyle = {
    flex: 1,
  };

  const labelStyle = {
    color: colors.textSecondary,
    fontSize: "12px",
    fontWeight: "600",
    marginTop: "1rem",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "6px",
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.background,
    color: colors.text,
    boxSizing: "border-box",
    marginTop: "0.5rem",
  };

  const buttonStyle = {
    padding: "0.75rem 1.5rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: colors.primary,
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    marginRight: "1rem",
    marginTop: "1rem",
  };

  const statsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.5rem",
    marginTop: "2rem",
  };

  const statBoxStyle = {
    backgroundColor: colors.surfaceLight,
    border: `1px solid ${colors.border}`,
    borderRadius: "12px",
    padding: "1.5rem",
    textAlign: "center",
  };

  const statValueStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: "0.5rem",
  };

  const statLabelStyle = {
    color: colors.textSecondary,
    fontSize: "12px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: colors.text, marginBottom: "2rem" }}>👤 My Profile</h1>

      <div style={cardStyle}>
        <div style={profileHeaderStyle}>
          <div style={avatarStyle}>{profile.avatar}</div>
          <div style={profileInfoStyle}>
            {isEditing ? (
              <>
                <label style={labelStyle}>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={inputStyle}
                />

                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={inputStyle}
                  disabled
                />

                <label style={labelStyle}>Bio</label>
                <input
                  type="text"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  style={inputStyle}
                />

                <label style={labelStyle}>City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  style={inputStyle}
                />

                <label style={labelStyle}>Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={inputStyle}
                />

                <button onClick={handleSave} style={buttonStyle}>
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  style={{ ...buttonStyle, backgroundColor: colors.surfaceLight, color: colors.text }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h2 style={{ color: colors.text, margin: 0 }}>{profile.name}</h2>
                <p style={{ color: colors.textSecondary, margin: "0.5rem 0" }}>{profile.email}</p>
                <p style={{ color: colors.text, fontSize: "14px", marginTop: "1rem" }}>
                  📍 {profile.city} | 📱 {profile.phone}
                </p>
                <p style={{ color: colors.text, fontSize: "14px", marginTop: "0.5rem" }}>
                  "{profile.bio}"
                </p>
                <button onClick={() => setIsEditing(true)} style={buttonStyle}>
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>

        {/* Portfolio Stats */}
        <div style={statsGridStyle}>
          <div style={statBoxStyle}>
            <div style={statValueStyle}>₹{profile.portfolio.totalValue.toLocaleString()}</div>
            <div style={statLabelStyle}>Portfolio Value</div>
          </div>
          <div style={statBoxStyle}>
            <div style={statValueStyle}>₹{profile.portfolio.totalReturns.toLocaleString()}</div>
            <div style={statLabelStyle}>Total Returns</div>
          </div>
          <div style={statBoxStyle}>
          <div style={{ ...statValueStyle, color: colors.success }}>
              +{profile.portfolio.returnPercentage}%
            </div>
            <div style={statLabelStyle}>Return %</div>
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div style={cardStyle}>
        <h2 style={{ color: colors.text, marginBottom: "1rem" }}>Account Information</h2>
        <div style={{ color: colors.text, lineHeight: "1.8" }}>
          <p>✅ <strong>Member Since:</strong> January 2024</p>
          <p>✅ <strong>Account Status:</strong> Active</p>
          <p>✅ <strong>KYC Status:</strong> Verified</p>
          <p>✅ <strong>Trading Experience:</strong> 1+ years</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;