import { Leaf, Scissors, Shovel, SprayCan, Sprout, type LucideProps } from "lucide-react";
import type { ServiceIcon as ServiceIconName } from "@/lib/content";

const map = { shovel: Shovel, sprout: Sprout, scissors: Scissors, leaf: Leaf, spray: SprayCan } as const;

export function ServiceIcon({ name, ...props }: { name: ServiceIconName } & LucideProps) {
  const Icon = map[name];
  return <Icon aria-hidden {...props} />;
}
