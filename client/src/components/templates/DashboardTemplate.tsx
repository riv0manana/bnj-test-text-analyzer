import { ChatWindow } from "@/components/organisms/ChatWindow";
import { HistoryList } from "@/components/organisms/HistoryList";
import type { Message, Analysis } from "@/hooks/useTextAnalyzer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardTemplateProps {
  messages: Message[];
  history: Analysis[];
  loading: boolean;
  onSend: (text: string) => void;
}

export function DashboardTemplate({
  messages,
  history,
  loading,
  onSend,
}: DashboardTemplateProps) {
  return (
    <div className="flex h-screen w-full flex-col items-center bg-background p-4 md:p-8">
      <div className="w-full max-w-3xl flex-1 flex flex-col">
        <h1 className="text-3xl font-bold mb-6 text-center">Text Analyzer</h1>
        <span>riv0manana.dev (Test - BNJ Team Maker)</span>

        <Tabs defaultValue="chat" className="flex-1 flex flex-col h-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent
            value="chat"
            className="flex-1 flex flex-col overflow-hidden data-[state=inactive]:hidden"
          >
            <ChatWindow messages={messages} loading={loading} onSend={onSend} />
          </TabsContent>

          <TabsContent
            value="history"
            className="flex-1 overflow-hidden data-[state=inactive]:hidden"
          >
            <HistoryList history={history} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
