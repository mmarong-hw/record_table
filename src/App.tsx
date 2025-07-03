import { useState } from 'react';
import './App.css'
import { CreateRecordModal } from "./components/Modal/CreateRecordModal";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <h1>HI</h1>
      <button onClick={() => {
        setOpen(true);
      }}>open</button>
      <CreateRecordModal open={open} onClose={() => {
        setOpen(false);
      }} onSubmit={(values) => {
        console.log(values);
      }} />
    </>
  )
}

export default App
