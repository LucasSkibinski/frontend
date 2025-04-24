import { useEffect, useState } from "react";

export default function Home() {
  const [mensagem, setMensagem] = useState("Carregando...");

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((res) => res.text())
      .then((data) => setMensagem(data))
      .catch((err) => {
        console.error(err);
        setMensagem("Erro na comunicação com o backend");
      });
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Teste Front ↔ Back</h1>
      <p>Resposta do backend:</p>
      <pre>{mensagem}</pre>
    </div>
  );
}
