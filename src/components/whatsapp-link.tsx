import type { ReactNode } from "react";
import { AppleChevron } from "@/components/apple-chevron";
import { brand, safeWhatsAppHref } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function WhatsAppLink({
  children = "Pedir orçamento",
  className,
  message,
  chevron = false,
}: {
  children?: ReactNode;
  className?: string;
  message?: string;
  chevron?: boolean;
}) {
  return (
    <a
      href={safeWhatsAppHref(message ?? brand.whatsappIntro)}
      target="_top"
      rel="noopener noreferrer"
      referrerPolicy="no-referrer"
      className={cn(
        "relative z-10 inline-flex min-h-11 cursor-pointer items-center touch-manipulation",
        className,
      )}
    >
      {children}
      {chevron ? <AppleChevron /> : null}
    </a>
  );
}