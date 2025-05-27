import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import TicTacToeDuel from "../components/tictactoe/tictactoe-duel";

export default component$(() => {
  // Main route: show the TicTacToe Duel container centered
  return (
    <div style={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f7fafc" }}>
      <TicTacToeDuel />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
