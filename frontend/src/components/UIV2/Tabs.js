import React, { useState } from "react";
import designSystemV2 from "../../styles/designSystemV2";

export const Tabs = ({ children, defaultTab = 0, onChange, ...props }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (index) => {
    setActiveTab(index);
    onChange?.(index);
  };

  const childArray = React.Children.toArray(children).filter(
    (child) => child.type === Tab
  );

  return (
    <div {...props}>
      <TabList>
        {childArray.map((child, index) => (
          <TabButton
            key={index}
            isActive={activeTab === index}
            onClick={() => handleTabChange(index)}
          >
            {child.props.label}
          </TabButton>
        ))}
      </TabList>
      <TabContent>{childArray[activeTab]?.props.children}</TabContent>
    </div>
  );
};

export const TabList = ({ children }) => {
  const { colors, spacing } = designSystemV2;

  const style = {
    display: "flex",
    borderBottom: `2px solid ${colors.border}`,
    gap: spacing.lg,
  };

  return <div style={style}>{children}</div>;
};

export const TabButton = ({ isActive, onClick, children }) => {
  const { colors, spacing, typography, transition } = designSystemV2;

  const style = {
    padding: `${spacing.md} 0`,
    marginBottom: "-2px",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: isActive ? `2px solid ${colors.primary}` : "transparent",
    color: isActive ? colors.primary : colors.textSecondary,
    cursor: "pointer",
    fontFamily: typography.fontFamily,
    fontWeight: 500,
    fontSize: "14px",
    transition: transition.base,
    whiteSpace: "nowrap",
  };

  return (
    <button style={style} onClick={onClick}>
      {children}
    </button>
  );
};

export const Tab = ({ label, children }) => {
  return children;
};

export const TabContent = ({ children }) => {
  const { spacing } = designSystemV2;

  const style = {
    paddingTop: spacing.lg,
  };

  return <div style={style}>{children}</div>;
};

export default Tabs;