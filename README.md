# Desafio Agents: Lista de Tarefas



Neste desafio, você irá construir mm Agent para interagir com uma lista de tarefas. Nesse desafio, você deve utilizar as seguintes tecnologias:

Langchain
LangGraph
MongoDB
TypeScript
vitest (opcional)

## Desafio

O seu Agent deve ser capaz de realizar atividades na lista de tarefas da mesma maneira como o usuário faz. 

Capacidades Esperadas do seu Agent:

### Criar uma tarefa com titulo, completa e ou com data caso o usuário solicite;

Prompt 1: 
```
Eu tenho que comprar os ingredientes para fazer Massa de Macarrão en casa
```

Prompt 2: 
```
Registra que ontem eu fui ao supermercado e comprei ovos
```

Prompt 3: 
```
Agendei uma consulta medica para a proxima sexta feira, as 10 horas da manha
```

### Completar uma Tarefa existente;

### Deletar uma tarefa existente;

### Sumarizar Tarefas


## Desafios Adicionais

- Persistir a conversa com a AI;
- Testes de integração no agent;

## Sobre Esses projeto

Esses projeto esta utilizando:

- Remix
- Typescript
- Mongoose
- tRPC
- Assistant UI
- Tailwindcss

As seguintes funcionalidades estão implementadas:

- Chat com a AI, usando Assistant UI. Ainda sem persistência;
- Todo List App completo, com calendário, Editar e Remover;


### Setup

- NodeJS >= 22
- pnpm
- docker

### Startup


Instalar dependências
```bash
pnpm install
```

Inciar MongoDB 
```bash
docker compose up -d
```

Definir variáveis de ambiente 
```
cp .env.example .env.local
```

Apos, Você deve definir o valor para a OPEN AI KEY manualmente;

Iniciar o projeto
```bash
pnpm dev
```



## Instruções de entrega
Você deve disponibilizar o seu projeto em um repositório privado no GitHub e dar acesso de leitura para os usuários @matheusAle e @christiancuri.