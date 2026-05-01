"use client";
import {
  downvoteProductAction,
  upvoteProductAction,
  hasUserVotedAction,
} from "@/lib/products/product-actions";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useOptimistic, useTransition, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function VotingButtons({
  hasVoted: initialHasVoted,
  voteCount: initialVoteCount,
  productId,
}: {
  hasVoted?: boolean;
  voteCount: number;
  productId: number;
}) {
  const [hasVoted, setHasVoted] = useState(initialHasVoted ?? false);
  const [isLoading, setIsLoading] = useState(!initialHasVoted);
  
  const [optimisticVoteCount, setOptimisticVoteCount] = useOptimistic(
    initialVoteCount,
    (currentCount, change: number) => Math.max(0, currentCount + change)
  );

  const [isPending, startTransition] = useTransition();

  // Fetch vote status on mount if not provided
  useEffect(() => {
    if (initialHasVoted === undefined) {
      hasUserVotedAction(productId).then((voted) => {
        setHasVoted(voted);
        setIsLoading(false);
      });
    }
  }, [productId, initialHasVoted]);

  const handleUpvote = async () => {
    if (hasVoted) return;

    startTransition(async () => {
      setOptimisticVoteCount(1);
      setHasVoted(true);
      const result = await upvoteProductAction(productId);
      if (!result.success) {
        setOptimisticVoteCount(-1);
        setHasVoted(false);
        alert(result.message);
      }
    });
  };

  const handleDownvote = async () => {
    if (!hasVoted) return;

    startTransition(async () => {
      setOptimisticVoteCount(-1);
      setHasVoted(false);
      const result = await downvoteProductAction(productId);
      if (!result.success) {
        setOptimisticVoteCount(1);
        setHasVoted(true);
        alert(result.message);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-1 shrink-0">
        <div className="h-8 w-8" />
        <span className="text-sm font-semibold text-foreground">
          {optimisticVoteCount}
        </span>
        <div className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center gap-1 shrink-0"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Button
        onClick={handleUpvote}
        variant="ghost"
        size="icon-sm"
        disabled={isPending || hasVoted}
        className={cn(
          "h-8 w-8 transition-colors",
          hasVoted
            ? "bg-primary/10 text-primary hover:bg-primary/20"
            : "hover:bg-primary/10 hover:text-primary text-muted-foreground"
        )}
      >
        <ChevronUpIcon className="size-5" />
      </Button>
      <span className="text-sm font-semibold transition-colors text-foreground">
        {optimisticVoteCount}
      </span>
      <Button
        onClick={handleDownvote}
        variant="ghost"
        size="icon-sm"
        disabled={isPending || !hasVoted}
        className={cn(
          "h-8 w-8 transition-colors",
          hasVoted
            ? "hover:text-destructive hover:bg-destructive/10 text-muted-foreground"
            : "opacity-50 cursor-not-allowed text-muted-foreground"
        )}
      >
        <ChevronDownIcon className="size-5" />
      </Button>
    </div>
  );
}