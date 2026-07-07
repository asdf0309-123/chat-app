const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

// Supabase client (set env vars before running)
// Directly set for now (dev)
const supabase = createClient(
  'https://gktycpztevwrduqkchsxv.supabase.co',
  'sb_publishable_PKIlIrSBoKor76Jpe8mjVA_9IL3YEtr'
);

let users = {};

io.on('connection', (socket) => {
  socket.on('join', (username) => {
    users[socket.id] = username;
    io.emit('system', `${username} joined`);
    io.emit('users', Object.values(users));
    // send recent messages
    (async () => {
      try {
        const { data } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: true })
          .limit(50);
        socket.emit('init', data || []);
      } catch (e) {
        console.error('init load error', e.message);
      }
    })();
  });

  socket.on('chat', (msg) => {
    // persist then broadcast
    (async () => {
      try {
        await supabase.from('messages').insert([
          { username: msg.name, text: msg.text }
        ]);
      } catch (e) {
        console.error('insert error', e.message);
      }
      io.emit('chat', msg);
    })();
  });

  socket.on('disconnect', () => {
    const name = users[socket.id];
    delete users[socket.id];
    if (name) {
      io.emit('system', `${name} left`);
      io.emit('users', Object.values(users));
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});
