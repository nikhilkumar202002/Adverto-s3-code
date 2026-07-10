import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full px-5 sm:px-6 md:px-10 lg:px-[60px] xl:px-[80px] ${className}`}>
      {children}
    </div>
  );
}
