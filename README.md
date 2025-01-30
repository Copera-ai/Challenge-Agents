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
Eu tenho que comprar os ingredientes para fazer massa de macarrão em casa
```

Prompt 2: 
```
Agendei uma consulta medica para a proxima sexta feira, as 10 horas da manha
```



### Completar uma Tarefa existente;

Prompt 1: 
```
Registra que ontem eu fui ao supermercado e comprei ovos
```


### Modificar uma tarefa existente;

Prompt 1:
```
A minha consulta foi foi remarcada para a proxima semana, no mesmo horario
```

Prompt 2:
```
A minha reuniao da sexta com o Marcos foi cancelada.
```

Prompt 3:
```
A minha reuniao da sexta com o Marcos foi cancelada, anota no titulo e marca como completa
```



### Sumarizar Tarefas

Prompt 1:
```
Quantas atividades eu tenho para realizar ainda hoje?
```

Prompt 2:

```
Quais ativiades eu deixei de realizar na ultima semana? 
```

Prompt 3: 
```
Quando foi que eu realize a "X" atividade? 
```


### Outros prompts

Prompt 1:
```
Quais tarefas da semana podem ser combinadas na mesma atividade?
```

Prompt 2:
```
Com base nas atividades atuais, tem algo que vocẽ acha q eu deva incluir?
```

Prompt 3:
```
Qual é a atividade mais facil de ser feita hoje, na sua opniao?  
```



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

No seu repositorio, você deve incluir um video de demo do interagindo com o seu Agent. Não é necessario explicar codigo ou implementaçåo, apenas demostar que o Agent é capas de realizar as ações na lista de tarefas.

