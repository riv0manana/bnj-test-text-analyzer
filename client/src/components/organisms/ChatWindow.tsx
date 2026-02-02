import type { Message } from "@/hooks/useTextAnalyzer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { MessageBubble } from "@/components/molecules/MessageBubble";
import { ChatInput } from "@/components/molecules/ChatInput";

interface ChatWindowProps {
  messages: Message[];
  loading: boolean;
  onSend: (text: string) => void;
}

export function ChatWindow({ messages, loading, onSend }: ChatWindowProps) {
  return (
    <Card className="flex-1 flex flex-col overflow-hidden border-0 shadow-none md:border md:shadow-sm">
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full p-4">
          <div className="flex flex-col gap-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground mt-10">
                Start a conversation to analyze text...
              </div>
            )}
            {messages.map((msg, index) => (
              <MessageBubble key={index} message={msg} />
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted max-w-[80%] rounded-lg px-4 py-2">
                  <p className="animate-pulse">Analyzing...</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <div className="p-4 border-t">
        <ChatInput onSend={onSend} loading={loading} />
      </div>
    </Card>
  );
}
