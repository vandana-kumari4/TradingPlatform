import React, { useState } from "react";
import designSystemV2 from "../styles/designSystemV2";
import { Button, Input, Badge } from "./UIV2";
import { Edit2, Save, X, Mail, Phone, MapPin, Calendar } from "lucide-react";

export const ProfileV2 = () => {
  const { colors, spacing, typography, radius, shadow } = designSystemV2;

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Vandana Kumari",
    email: "vandanasinghbhore04@gmail.com",
    phone: "+91 6378 316593",
    location: "Jaipur, Rajasthan",
    joinDate: "January 2024",
    bio: "Full-Stack GenAI Engineer | Stock Trading Enthusiast",
  });

  const [formData, setFormData] = useState(profile);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  // Styles
  const containerStyle = {
    backgroundColor: colors.bg,
    minHeight: "100vh",
    padding: spacing.xl,
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
    fontSize: "28px",
  };

  const headerSubtitleStyle = {
    ...typography.body,
    color: colors.textSecondary,
  };

  const profileCardStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    overflow: "hidden",
    boxShadow: shadow.xs,
    marginBottom: spacing.lg,
  };

  const profileHeaderStyle = {
    padding: spacing.xl,
    display: "flex",
    gap: spacing.lg,
    alignItems: "flex-start",
    borderBottom: `1px solid ${colors.border}`,
  };

  const avatarStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: colors.primaryLight,
    color: colors.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    fontWeight: 700,
    flexShrink: 0,
  };

  const profileInfoStyle = {
    flex: 1,
  };

  const nameStyle = {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  };

  const bioStyle = {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  };

  const joinDateStyle = {
    ...typography.bodySmall,
    color: colors.textTertiary,
  };

  const headerActionsStyle = {
    display: "flex",
    gap: spacing.sm,
  };

  const contentSectionStyle = {
    padding: spacing.xl,
  };

  const sectionTitleStyle = {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  };

  const infoItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: spacing.lg,
    marginBottom: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottom: `1px solid ${colors.border}`,
  };

  const infoItemLastStyle = {
    ...infoItemStyle,
    borderBottom: "none",
  };

  const infoIconStyle = {
    width: "40px",
    height: "40px",
    borderRadius: radius.md,
    backgroundColor: colors.bgSecondary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.textSecondary,
    flexShrink: 0,
  };

  const infoContentStyle = {
    flex: 1,
  };

  const infoLabelStyle = {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    display: "block",
  };

  const infoValueStyle = {
    ...typography.body,
    color: colors.textPrimary,
  };

  const formGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: spacing.lg,
    marginBottom: spacing.lg,
  };

  const statsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: spacing.lg,
  };

  const statCardStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.lg,
    textAlign: "center",
    boxShadow: shadow.xs,
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
          <h1 style={headerTitleStyle}>Account Settings</h1>
          <p style={headerSubtitleStyle}>Manage your profile and preferences</p>
        </div>

        {/* PROFILE CARD */}
        <div style={profileCardStyle}>
          {/* PROFILE HEADER */}
          <div style={profileHeaderStyle}>
            <div style={avatarStyle}>
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>

            <div style={profileInfoStyle}>
              <div style={nameStyle}>{profile.name}</div>
              <p style={bioStyle}>{profile.bio}</p>
              <div style={joinDateStyle}>Joined {profile.joinDate}</div>
            </div>

            <div style={headerActionsStyle}>
              {!isEditing && (
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Edit2}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              )}
            </div>
          </div>

          {/* PROFILE CONTENT */}
          {!isEditing ? (
            <div style={contentSectionStyle}>
              <div style={sectionTitleStyle}>Contact Information</div>

              <div style={infoItemStyle}>
                <div style={infoIconStyle}>
                  <Mail size={18} />
                </div>
                <div style={infoContentStyle}>
                  <label style={infoLabelStyle}>Email</label>
                  <div style={infoValueStyle}>{profile.email}</div>
                </div>
              </div>

              <div style={infoItemStyle}>
                <div style={infoIconStyle}>
                  <Phone size={18} />
                </div>
                <div style={infoContentStyle}>
                  <label style={infoLabelStyle}>Phone</label>
                  <div style={infoValueStyle}>{profile.phone}</div>
                </div>
              </div>

              <div style={infoItemStyle}>
                <div style={infoIconStyle}>
                  <MapPin size={18} />
                </div>
                <div style={infoContentStyle}>
                  <label style={infoLabelStyle}>Location</label>
                  <div style={infoValueStyle}>{profile.location}</div>
                </div>
              </div>

              <div style={infoItemLastStyle}>
                <div style={infoIconStyle}>
                  <Calendar size={18} />
                </div>
                <div style={infoContentStyle}>
                  <label style={infoLabelStyle}>Member Since</label>
                  <div style={infoValueStyle}>{profile.joinDate}</div>
                </div>
              </div>
            </div>
          ) : (
            <div style={contentSectionStyle}>
              <div style={sectionTitleStyle}>Edit Profile</div>

              <div style={formGridStyle}>
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  fullWidth
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  fullWidth
                />
                <Input
                  label="Phone"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  fullWidth
                />
                <Input
                  label="Location"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  fullWidth
                />
              </div>

              <div style={{ marginBottom: spacing.lg }}>
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
                  value={formData.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  style={{
                    width: "100%",
                    padding: spacing.lg,
                    borderRadius: radius.md,
                    border: `1px solid ${colors.border}`,
                    backgroundColor: colors.bgSecondary,
                    color: colors.textPrimary,
                    fontFamily: typography.fontFamily,
                    fontSize: "14px",
                    minHeight: "100px",
                    resize: "vertical",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: spacing.md }}>
                <Button
                  variant="secondary"
                  icon={X}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  icon={Save}
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* PORTFOLIO STATS */}
        <div style={{ marginBottom: spacing["2xl"] }}>
          <h2 style={{ ...sectionTitleStyle, marginBottom: spacing.lg }}>Portfolio Overview</h2>
          <div style={statsGridStyle}>
            <div style={statCardStyle}>
              <div style={statValueStyle}>₹450,000</div>
              <div style={statLabelStyle}>Portfolio Value</div>
            </div>
            <div style={statCardStyle}>
              <div style={statValueStyle}>+₹12,500</div>
              <div style={statLabelStyle}>Total Gain</div>
            </div>
            <div style={statCardStyle}>
              <div style={statValueStyle}>+2.78%</div>
              <div style={statLabelStyle}>Total Return</div>
            </div>
            <div style={statCardStyle}>
              <div style={statValueStyle}>5</div>
              <div style={statLabelStyle}>Active Holdings</div>
            </div>
          </div>
        </div>

        {/* ACCOUNT ACTIONS */}
        <div style={profileCardStyle}>
          <div style={contentSectionStyle}>
            <div style={{ ...sectionTitleStyle, marginBottom: spacing.lg }}>Account Actions</div>

            <div style={{ display: "grid", gap: spacing.md }}>
              <Button variant="secondary" fullWidth>
                Change Password
              </Button>
              <Button variant="secondary" fullWidth>
                Two-Factor Authentication
              </Button>
              <Button variant="secondary" fullWidth>
                Download Data
              </Button>
              <Button variant="danger" fullWidth>
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileV2;