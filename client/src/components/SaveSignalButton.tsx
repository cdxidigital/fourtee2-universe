import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";

type SaveSignalButtonProps = {
  signal: {
    signalType: "destination" | "playlist";
    portal: "travel" | "music" | "you";
    sourceId: string;
    title: string;
    subtitle?: string;
    href?: string;
  };
  className?: string;
};

/** fourtee2 signal control: persists only an authenticated user's genuine saved items. */
export function SaveSignalButton({ signal, className = "" }: SaveSignalButtonProps) {
  const { isAuthenticated, loading } = useAuth();
  const utils = trpc.useUtils();
  const signals = trpc.signal.list.useQuery(undefined, { enabled: isAuthenticated });
  const toggle = trpc.signal.toggle.useMutation({
    onSuccess: async () => {
      await utils.signal.list.invalidate();
    },
  });
  const isSaved = signals.data?.some(item => item.signalType === signal.signalType && item.sourceId === signal.sourceId) ?? false;

  const handleSave = () => {
    if (!isAuthenticated) {
      startLogin();
      return;
    }
    toggle.mutate(signal);
  };

  return (
    <button
      type="button"
      className={`save-signal ${isSaved ? "is-saved" : ""} ${className}`}
      onClick={handleSave}
      disabled={loading || toggle.isPending}
      aria-pressed={isSaved}
    >
      <span>{isSaved ? "SIGNAL SAVED" : "SAVE TO SIGNAL BOARD"}</span>
      <b>{isSaved ? "●" : "+"}</b>
    </button>
  );
}
