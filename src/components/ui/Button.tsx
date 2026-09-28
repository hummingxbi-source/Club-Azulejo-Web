import { forwardRef } from "react";
import { ArrowRight } from "lucide-react";

/* ────────────────────────────────────────────────
   Button — Club Azulejo design system
   Variants: primary · ghost · text
   Sizes:    md · lg
   ──────────────────────────────────────────────── */

type ButtonVariant = "primary" | "ghost" | "text";
type ButtonSize = "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  href?: string;
}

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  md: { padding: "10px 24px", fontSize: "0.875rem" },
  lg: { padding: "14px 32px", fontSize: "1rem" },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", icon, children, style, href, onClick, ...rest }, ref) => {
    const base: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      fontFamily: "var(--font-body)",
      fontWeight: 600,
      letterSpacing: "0.01em",
      borderRadius: "var(--radius-pill)",
      cursor: "pointer",
      transition: "background-color var(--duration-md) var(--ease-out), border-color var(--duration-md) var(--ease-out), filter var(--duration-md) var(--ease-out), transform var(--duration-md) var(--ease-out), opacity var(--duration-md) var(--ease-out)",
      whiteSpace: "nowrap",
      border: "none",
      textDecoration: "none",
      ...sizeStyles[size],
      ...style,
    };

    const variants: Record<ButtonVariant, React.CSSProperties> = {
      primary: {
        backgroundColor: "var(--color-accent)",
        color: "var(--color-accent-fg)",
      },
      ghost: {
        backgroundColor: "transparent",
        color: "var(--color-text)",
        border: "1px solid var(--color-line)",
      },
      text: {
        backgroundColor: "transparent",
        color: "var(--color-text)",
        padding: size === "lg" ? "14px 4px" : "10px 4px",
        borderRadius: "0",
      },
    };

    const mergedStyle = { ...base, ...variants[variant] };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (href) {
        window.location.href = href;
      }
      onClick?.(e);
    };

    return (
      <button ref={ref} style={mergedStyle} onClick={handleClick} className={`btn btn--${variant}`} {...rest}>
        {children}
        {variant === "text" ? (
          <ArrowRight size={16} className="btn-arrow" strokeWidth={1.5} />
        ) : icon ? (
          icon
        ) : null}
      </button>
    );
  }
);

Button.displayName = "Button";
