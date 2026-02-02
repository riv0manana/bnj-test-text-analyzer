import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { useTextAnalyzer } from "@/hooks/useTextAnalyzer";

function App() {
  const { messages, history, loading, analyzeText } = useTextAnalyzer();

  return (
    <DashboardTemplate
      messages={messages}
      history={history}
      loading={loading}
      onSend={analyzeText}
    />
  );
}

export default App;
