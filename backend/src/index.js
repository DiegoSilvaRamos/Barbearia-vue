require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado ao banco de dados SQLite.');
});

// Criação das tabelas de usuários e agendamentos
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phone TEXT,
        time TEXT,
        service TEXT
    )`);
});

app.use(express.json());

// Rota de registro
app.post('/api/register', async (req, res) => {
    const {
        username,
        password
    } = req.body;

    // Verificação de dados de entrada
    if (!username || !password) {
        return res.status(400).json({
            message: 'Usuário e senha são obrigatórios'
        });
    }

    // Verifica se o usuário já existe
    const existingUser = await new Promise((resolve) => {
        db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
            if (err) {
                return res.status(500).json({
                    message: 'Erro ao verificar usuário'
                });
            }
            resolve(row);
        });
    });

    if (existingUser) {
        console.log('Dados recebidos:', req.body);
        return res.status(400).json({
            message: 'Usuário já existe'
        });
    }

    // Hash da senha
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], (err) => {
            if (err) {
                return res.status(500).json({
                    message: 'Erro ao registrar usuário'
                });
            }
            res.status(201).json({
                message: 'Usuário registrado com sucesso!'
            });
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Erro ao processar a senha'
        });
    }
});

// Rota de login
app.post('/api/login', async (req, res) => {
    const {
        username,
        password
    } = req.body;

    // Verificação de dados de entrada
    if (!username || !password) {
        return res.status(400).json({
            message: 'Usuário e senha são obrigatórios'
        });
    }

    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Credenciais inválidas'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'Credenciais inválidas'
            });
        }

        const token = jwt.sign({
            username
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        console.log('Dados recebidos:', req.body);
        res.json({
            message: 'Login bem-sucedido!',
            token
        });
    });
});

// Rota para agendar cliente
app.post('/api/appointments', (req, res) => {
    const {
        name,
        phone,
        time,
        service
    } = req.body;

    // Verificação de dados de entrada
    if (!name || !phone || !time || !service) {
        return res.status(400).json({
            message: 'Todos os campos são obrigatórios'
        });
    }

    db.run(`INSERT INTO appointments (name, phone, time, service) VALUES (?, ?, ?, ?)`,
        [name, phone, time, service],
        function (err) {
            if (err) {
                return res.status(500).json({
                    message: 'Erro ao agendar cliente'
                });
            }
            res.status(201).json({
                message: 'Cliente agendado com sucesso!',
                appointmentId: this.lastID
            });
        });
});

// Rota para obter todos os clientes agendados
app.get('/api/appointments', (req, res) => {
    db.all(`SELECT * FROM appointments`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                message: 'Erro ao obter clientes agendados'
            });
        }
        res.json(rows);
    });
});



// Rota para deletar um agendamento
app.delete('/api/appointments/:id', (req, res) => {
    const appointmentId = req.params.id;
  
    db.run(`DELETE FROM appointments WHERE id = ?`, [appointmentId], function(err) {
      if (err) {
        return res.status(500).json({ message: 'Erro ao deletar agendamento.' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Agendamento não encontrado.' });
      }
      res.status(200).json({ message: 'Agendamento deletado com sucesso!' });
    });
  });

  // Rota para dar Update em um agendamento
  app.put('/api/appointments/:id', (req, res) => {
    const appointmentId = req.params.id;
    const { name, phone, time, service } = req.body;
  
    db.run(`UPDATE appointments SET name = ?, phone = ?, time = ?, service = ? WHERE id = ?`, [name, phone, time, service, appointmentId], function(err) {
      if (err) {
        return res.status(500).json({ message: 'Erro ao atualizar agendamento.' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Agendamento não encontrado.' });
      }
      res.status(200).json({ message: 'Agendamento atualizado com sucesso!' });
    });
  });


// Rota protegida
app.get('/api/protected', (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        res.json({
            message: 'Você está acessando uma rota protegida!',
            user
        });
    });
});

// Fechar a conexão com o banco de dados ao encerrar o aplicativo
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Conexão com o banco de dados fechada.');
        process.exit(0);
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});