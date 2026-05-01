"use client";

import VotingButtons from "./voting-buttons";
import { Badge } from "../ui/badge";

export default function ProductVotingSection({
  productId,
  voteCount,
}: {
  productId: number;
  voteCount: number;
}) {
  return (
    <>
      <div className="text-center mb-6">
        <p className="text-sm text-muted-foreground mb-2">
          Support this product
        </p>
        <VotingButtons productId={productId} voteCount={voteCount} />
      </div>
      {voteCount > 100 && (
        <div className="pt-6 border-t">
          <Badge className="w-full justify-center py-4">
            🔥 Featured Product
          </Badge>
        </div>
      )}
    </>
  );
}
