const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const supabase = createClient(
  "https://gktycpztevwrduqkchsxv.supabase.co",
  "sb_publishable_PKIlIrSBoKor76Jpe8mjVA_9IL3YEtr"
);

app.use(express.static("public"));

io.on("connection", async (socket) => {
  console.log("user connected");

  // ✅ 과거 메시지 불러오기
  const { data, error } = await supabase
    .from("messages2")
    .select("*")
    .order("created_at", { ascending: true });

  if (data) {
    socket.emit("load messages2", data);
  }

  // ✅ 새 메시지 처리
  socket.on("chat message", async (msg) => {
    const messageData = {
      username: msg.username,
      text: msg.text,
    };

    // DB 저장
    await supabase.from("messages2").insert([messageData]);

    // 실시간 전송
    io.emit("chat message", messageData);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server running");
});
