# Brevy.ly

**Brevy.ly** é um sistema de **encurtamento de links**, permitindo gerar URLs curtas, redirecionar usuários de forma eficiente e acompanhar o histórico de links criados.

## 📁 Estrutura do Repositório

Este projeto é um **monorepo**, organizado da seguinte forma:

```bash
├── web/        # Frontend
├── server/     # Backend
└── README.md
```

## 🧑‍💻 Desenvolvimento Local

### 🔧 Pré-requisitos

Antes de começar, você vai precisar ter instalado:

- **Node.js** (versão 18+ ou 20)
- **npm** ou **pnpm**
- **Docker** (opcional, para o backend)

---

## ▶️ Rodando o Frontend (`web`)

```bash
cd web
npm install
npm run dev
```

A aplicação ficará disponível em:
`http://localhost:5173`

---

## ▶️ Rodando o Backend (`server`)

### Sem Docker

```bash
cd server
npm install
npm run dev
```

Servidor disponível em:
`http://localhost:3333`

---

### Com Docker

```bash
cd server
docker build -t brevy-server .
docker run -p 3333:3333 brevy-server
```
