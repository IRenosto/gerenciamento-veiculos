# Microsserviços de Gerenciamento de Veículos

Este projeto é composto por dois microsserviços principais: **Cadastro** e **Listagem** de veículos. Utiliza **Node.js**, **Express**, **Swagger**, **Redis**, **Docker**.

## Serviços

### 1. Cadastro Service

Responsável por cadastrar, atualizar, consultar e excluir veículos. Expõe uma API RESTful com validações e documentação via Swagger.

**Principais rotas:**

| Método | Rota              | Descrição                                 |
|--------|-------------------|-------------------------------------------|
| GET    | `/`               | Verifica se o serviço está no ar          |
| GET    | `/metrics`        | Retorna métricas do Prometheus            |
| POST   | `/veiculos`       | Cria um novo veículo                      |
| GET    | `/veiculos`       | Lista todos os veículos com filtros       |
| GET    | `/veiculos/:id`   | Consulta um veículo pelo ID               |
| PATCH  | `/veiculos/:id`   | Atualiza um veículo                       |
| DELETE | `/veiculos/:id`   | Remove um veículo                         |

---

### 2. Listagem Service

Responsável por consumir eventos (via Redis) e listar os veículos armazenados. Também oferece uma rota para visualizar o histórico da fila.

**Principais rotas:**

| Método | Rota                   | Descrição                                  |
|--------|------------------------|--------------------------------------------|
| GET    | `/`                    | Verifica se o serviço está no ar           |
| GET    | `/veiculos`            | Lista os veículos armazenados              |
| GET    | `/fila-veiculos`       | Exibe os registros atuais da fila Redis    |

---

## Como executar

Certifique-se de ter o **Docker** e o **Docker Compose** instalados.

Configurar adequadamente um .env em cada serviço usando como base o .env.example

Na raiz do projeto executar:

```bash
docker compose up --build
```

O Docker Compose irá subir os dois serviços automaticamente.

---

## Documentação da API

A documentação está disponível via Swagger em:

- Cadastro Service: [http://localhost:{PORTA_CADASTRO}/api-docs](http://localhost:{PORTA_CADASTRO}/api-docs)
- Listagem Service: [http://localhost:{PORTA_LISTAGEM}/api-docs](http://localhost:{PORTA_LISTAGEM}/api-docs)

Substitua `{PORTA_*}` pela porta mapeada no `.env`.

---

## Tecnologias e Ferramentas

- Node.js / Express
- TypeScript
- Redis
- Swagger (OpenAPI)
- Docker e Docker Compose
- Prometheus (métricas)
- Zod (validação)

---