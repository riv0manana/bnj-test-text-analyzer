import type { Analysis } from "@/hooks/useTextAnalyzer";

interface AnalysisItemProps {
  item: Analysis;
}

export function AnalysisItem({ item }: AnalysisItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
      <div className="flex-1 min-w-0 mr-4">
        <p className="font-medium truncate text-wrap">{item.text}</p>
        <p className="text-xs text-muted-foreground">
          {new Date(item.createdAt).toLocaleString()}
        </p>
      </div>
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold text-sm">
        {item.score}
      </div>
    </div>
  );
}
