import React from 'react';

// Regular button — no magnetic movement, just clean hover via CSS/Tailwind
export default function MagneticButton({
  children,
  as: Component = 'button',
  className = '',
  ...props
}) {
  return (
    <Component
      className={`cursor-pointer inline-flex items-center justify-center select-none transition-all duration-200 hover:brightness-110 hover:scale-[1.03] active:scale-[0.97] ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
