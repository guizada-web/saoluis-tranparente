# CleanWork

Aplicativo web para transparência e participação comunitária em São Luís — permite visualizar obras públicas no mapa, submeter demandas comunitárias e acompanhar informações básicas das obras.

## Visão geral

O projeto é dividido em duas partes:

- `backend/` — API em Node.js (Express) que serve endpoints para obras e demandas.
- `frontend/` — Aplicação React com Vite que exibe mapa, lista de demandas e formulário para criar novas demandas.

Funcionalidades principais:

- Listagem de obras públicas no mapa (Leaflet).
- Criação de novas demandas comunitárias (opcionalmente com localização geográfica).
- Alternância entre tema claro e escuro (modo noturno).
- Possibilidade de remover a localização associada a uma demanda.

## Pré-requisitos

- Node.js (recomendado 18+)
- NPM ou Yarn
- Banco de dados PostgreSQL (opcional: o backend está configurado para usar Postgres via variáveis de ambiente)

## Configuração do backend

1. Copie o arquivo de exemplo de variáveis de ambiente (se houver) ou crie `.env` na pasta `backend` com as seguintes variáveis:

```
DB_USER=seu_usuario
# 🌆 CleanWork

Aplicativo web para transparência e participação comunitária em São Luís — visualize obras públicas no mapa, submeta demandas e acompanhe informações relevantes.

---

## 🔎 Visão geral

O projeto tem duas partes principais:

- `backend/` — API em Node.js (Express) que fornece endpoints para obras e demandas.
- `frontend/` — Aplicação React (Vite) com mapa (Leaflet), formulário de novas demandas e listagem.

Funcionalidades principais:

- 🗺️ Listagem de obras públicas no mapa (Leaflet).
- 📝 Criação de demandas comunitárias (opcional com localização geográfica).
- 🌙 Alternância entre tema claro e escuro (persistido em localStorage).
- ❌ Remoção da localização associada a uma demanda.

---

## ⚙️ Pré-requisitos

- Node.js (recomendado 18+)
- NPM ou Yarn
- PostgreSQL (o backend usa Postgres via variáveis de ambiente)

---

## 🛠️ Configuração do backend

1. Crie um arquivo `.env` dentro de `backend/` com as variáveis:

```env
DB_USER=seu_usuario
DB_HOST=localhost
DB_NAME=seu_banco
DB_PASS=sua_senha
DB_PORT=5432
PORT=5000
```

2. Instale dependências e inicie o servidor (PowerShell):

```powershell
cd backend
npm install
npm run dev    # usa nodemon; ou npm start
```

> ❗ Observação: o projeto NÃO cria automaticamente as tabelas no banco (o script de init foi removido). Crie a tabela `demandas` manualmente ou use sua ferramenta de migração favorita.

Exemplo SQL para criar a tabela `demandas`:

```sql
CREATE TABLE demandas (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  bairro TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  usuario_id INTEGER,
  status TEXT DEFAULT 'aberta',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🖥️ Configuração do frontend

1. Instale dependências e inicie a aplicação (PowerShell):

```powershell
cd frontend
npm install
npm run dev
```

O frontend (Vite) ficará disponível em `http://localhost:5173` por padrão.

---

## 🚀 Endpoints principais

- `GET /api/demandas` — lista todas as demandas
- `POST /api/demandas` — cria nova demanda (aceita `titulo`, `descricao`, `bairro`, `latitude`, `longitude`, `usuario_id`)
- `PUT /api/demandas/:id` — atualiza status da demanda
- `PATCH /api/demandas/:id/location` — atualiza ou remove localização (envie `{ "latitude": null, "longitude": null }` para remover)
- `DELETE /api/demandas/:id` — exclui demanda

---

## 🗺️ Integração mapa / demandas

- Clique no mapa para selecionar coordenadas ao criar uma demanda — as coordenadas são enviadas ao backend junto ao POST.
- Marcadores no mapa representam obras (ou demandas com localização). O popup do marcador tem um botão para remover a localização (faz um `PATCH /api/demandas/:id/location`).

---

## 📝 Notas e recomendações

- O tema claro/escuro é gerenciado por `ThemeContext` e salvo em `localStorage`.
- Para automatizar a criação das tabelas, adicione migrações com ferramentas como Knex, Sequelize CLI ou TypeORM.

---

## ✅ Próximos passos sugeridos

- Implementar autenticação para associar `usuario_id` às demandas.
- Adicionar paginação e filtros à listagem de demandas.
- Escrever testes automatizados para os endpoints e componentes.

---

Se quiser, eu posso:

- ▶️ Iniciar o backend aqui para testar os endpoints (preciso de sua confirmação para rodar o servidor).
- 🧭 Criar scripts de migração para facilitar a criação das tabelas.
