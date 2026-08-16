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
  const actionLabel = loading
    ? "CHECKING SAVED ITEMS"
    : toggle.isPending
      ? isSaved ? "REMOVING FROM BOARD" : "SAVING TO BOARD"
      : !isAuthenticated
        ? "SIGN IN TO SAVE"
        : isSaved
          ? "SAVED TO MY BOARD"
          : "SAVE TO MY BOARD";

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
      aria-label={isAuthenticated ? `${isSaved ? "Remove" : "Save"} ${signal.title} ${isSaved ? "from" : "to"} your personal signal board` : `Sign in to save ${signal.title} to your personal signal board`}
    >
      <span aria-live="polite">{actionLabel}</span>
      <b>{isSaved ? "●" : "+"}</b>
    </button>
  );
}
