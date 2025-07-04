import "./App.css";
import { Header } from "./components/Header";
import { RecordTable } from "./components/RecordTable";
import { RecordProvider } from "./components/Provider/RecordProvider";

function App() {
  return (
    <RecordProvider>
      <Header />
      <RecordTable />
    </RecordProvider>
  );
}

export default App;
