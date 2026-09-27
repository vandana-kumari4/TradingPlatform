import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import designSystem from "../styles/designSystem";
import { Mail, Phone, MapPin, Edit2, Save, X } from "lucide-react";
import { Button, Input, Card } from "./UI";

export const UserProfile = () => {
  const { isDark } = useTheme();
  const { colors, spacing, typography, radius, shadow, transitions } = designSystem;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Vandana Kumari",
    email: "vandanasinghbhore04@gmail.com",
    phone: "+91 6378 316593",
    location: "Jaipur, Rajasthan",
    bio: "Full-Stack GenAI Engineer | Stock Trading Enthusiast",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Profile updated:", formData);
  };

  // STYLES
  const containerStyle = {
    backgroundColor: colors.bgSecondary,
    minHeight: "100vh",
    padding: `${spacing.xl} ${spacing.xl}`,
  };

  const contentStyle = {
    maxWidth: "800px",
    margin: "0 auto",
  };

  const headerStyle = {
    marginBottom: spacing["2xl"],
  };

  const headerTitleStyle = {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  };

  const profileCardStyle = {
    backgroundColor: colors.bgPrimary,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    boxShadow: shadow.xs,
  };

  const avatarStyle = {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    backgroundColor: colors.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "48px",
    marginBottom: spacing.lg,
  };

  const profileHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottom: `1px solid ${colors.border}`,
  };

  const profileInfoStyle = {
    flex: 1,
  };

  const nameStyle = {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  };

  const bioStyle = {
    ...typography.bodyLarge,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  };

  const contactInfoStyle = {
    display: "grid",
    gap: spacing.md,
  };

  const contactItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: spacing.md,
    color: colors.textSecondary,
    fontSize: "14px",
  };

  const formGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: spacing.lg,
    marginBottom: spacing.xl,
  };

  const buttonGroupStyle = {
    display: "flex",
    gap: spacing.md,
    justifyContent: "flex-end",
  };

  const statsCardStyle = {
    backgroundColor: colors.bgSecondary,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.lg,
    textAlign: "center",
  };

  const statValueStyle = {
    ...typography.h3,
    color: colors.primary,
    marginBottom: spacing.sm,
  };

  const statLabelStyle = {
    ...typography.bodySmall,
    color: colors.textSecondary,
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* HEADER */}
        <div style={headerStyle}>
          <h1 style={headerTitleStyle}>Profile</h1>
        </div>

        {/* PROFILE CARD */}
        <div style={profileCardStyle}>
          {/* HEADER */}
          <div style={profileHeaderStyle}>
            <div style={profileInfoStyle}>
              <div style={avatarStyle}>VK</div>
              {!isEditing && (
                <>
                  <h2 style={nameStyle}>{formData.name}</h2>
                  <p style={bioStyle}>{formData.bio}</p>
                  <div style={contactInfoStyle}>
                    <div style={contactItemStyle}>
                      <Mail size={16} />
                      {formData.email}
                    </div>
                    <div style={contactItemStyle}>
                      <Phone size={16} />
                      {formData.phone}
                    </div>
                    <div style={contactItemStyle}>
                      <MapPin size={16} />
                      {formData.location}
                    </div>
                  </div>
                </>
              )}
            </div>

            {!isEditing && (
              <Button
                variant="secondary"
                size="md"
                onClick={() => setIsEditing(true)}
                icon={Edit2}
              >
                Edit Profile
              </Button>
            )}
          </div>

          {/* EDIT FORM */}
          {isEditing && (
            <>
              <div style={formGridStyle}>
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                />
                <Input
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                />
                <Input
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  fullWidth
                />
              </div>

              <div style={{ marginBottom: spacing.xl }}>
                <label
                  style={{
                    ...typography.label,
                    color: colors.textSecondary,
                    display: "block",
                    marginBottom: spacing.sm,
                  }}
                >
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: spacing.lg,
                    borderRadius: radius.md,
                    border: `1px solid ${colors.border}`,
                    backgroundColor: colors.bgSecondary,
                    color: colors.textPrimary,
                    fontFamily: "inherit",
                    fontSize: "14px",
                    minHeight: "100px",
                    resize: "vertical",
                  }}
                />
              </div>

              <div style={buttonGroupStyle}>
                <Button variant="secondary" onClick={() => setIsEditing(false)} icon={X}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSave} icon={Save}>
                  Save Changes
                </Button>
              </div>
            </>
          )}
        </div>

        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: spacing.lg,
          }}
        >
          <div style={statsCardStyle}>
            <div style={statValueStyle}>₹450,000</div>
            <div style={statLabelStyle}>Portfolio Value</div>
          </div>
          <div style={statsCardStyle}>
            <div style={statValueStyle}>+12,500</div>
            <div style={statLabelStyle}>Total Gain</div>
          </div>
          <div style={statsCardStyle}>
            <div style={statValueStyle}>5</div>
            <div style={statLabelStyle}>Holdings</div>
          </div>
          <div style={statsCardStyle}>
            <div style={statValueStyle}>2.86%</div>
            <div style={statLabelStyle}>YTD Return</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;