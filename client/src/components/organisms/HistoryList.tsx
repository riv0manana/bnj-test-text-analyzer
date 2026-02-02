import type { Analysis } from "@/hooks/useTextAnalyzer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalysisItem } from "@/components/molecules/AnalysisItem";

interface HistoryListProps {
  history: Analysis[];
}

export function HistoryList({ history }: HistoryListProps) {
  return (
    <Card className="h-full flex flex-col border-0 shadow-none md:border md:shadow-sm">
      <CardHeader>
        <CardTitle>Analysis History</CardTitle>
        <CardDescription>
          Review your past text analyses and scores.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full p-4 pt-0">
          <div className="space-y-4">
            {history.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No history available.</p>
            ) : (
              history.map((item) => (
                <AnalysisItem key={item.id} item={item} />
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
