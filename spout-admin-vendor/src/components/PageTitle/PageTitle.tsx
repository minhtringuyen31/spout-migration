import React from "react";

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return <div className="text-3xl font-semibold">{title}</div>;
};

export default PageTitle;
