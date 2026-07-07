const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const supabase = createClient(
  "https://gktycpztevwrduqkchsxv.supabase.co",
  process.env.SUPABASE_KEY || "sb_secret_f_-lLofZx0L3ZxgKFRVeJg_GO_fN1Fu"
);

app.use(express.static("public"));

io.on("connection", async (socket) => {
  console.log("user connected");

  // ✅ 과거 메시지 불러오기
  const { data, error } = await supabase
    .from("message2")
    .select("*")
    .order("created_at", { ascending: true });

  console.log("LOAD:", data, error);

  if (data) {
    socket.emit("load messages", data);
  }

  // ✅ 새 메시지 처리
  socket.on("chat message", async (msg) => {
    const messageData = {
      username: String(msg.username || "anon"),
      text: String(msg.text || "")
    };

    const { error: insertError } = await supabase
      .from("message2")
      .insert([{ username: messageData.username, text: messageData.text }]);

    if (insertError) {
      console.error("INSERT ERROR:", insertError);
    }

    io.emit("chat message", messageData);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server running");
});
