# Soluções

## Versão escolhida

Node.js + Express.

## Preparação do projeto

O backend não possuía `package.json`, dependências declaradas nem comando de
inicialização. Foi criado o arquivo de configuração com `express`, `cors` e o
script `npm start`.

## Bugs corrigidos

### 1. Arquivo de tarefas não existia

O sistema tentava ler `tasks.json`, mas o arquivo não era criado em uma
instalação nova. Isso causava erro `500` ao listar ou criar tarefas.

**Correção:** o backend cria um `tasks.json` com uma lista vazia quando o
arquivo ainda não existe.

### 2. Não era possível concluir tarefas

O ID era salvo como número, mas chegava pela URL como texto. A busca não
encontrava a tarefa e a API retornava `404`.

**Correção:** o ID recebido é convertido para número antes da comparação.

### 3. Não era possível excluir tarefas

A exclusão tinha a mesma inconsistência entre ID numérico e textual, por isso a
filtragem não removia a tarefa.

**Correção:** o ID também é convertido para número na rota `DELETE`.

### 4. IDs inválidos não eram tratados

**Correção:** as rotas de atualização e exclusão retornam `400 Bad Request`
quando recebem um ID inválido e `404 Not Found` quando a tarefa não existe.

## Melhorias adicionais

### Prazo da tarefa

Adicionei um campo opcional para a data em que a tarefa deve ser realizada. O
prazo é salvo no arquivo JSON e exibido no formato `dd/mm/aaaa`.

Datas passadas são bloqueadas no campo de data do frontend e validadas novamente
na API, evitando que uma requisição manual burle a regra.

### Docker

Adicionei Docker Compose para iniciar frontend e backend sem instalar Node.js ou
Python na máquina.

```bash
docker compose up --build
```

- Frontend: `http://localhost:8080`
- API: `http://localhost:3000/api/tasks`

Para encerrar:

```bash
docker compose down
```

## Testes realizados

- [x] Listar tarefas
- [x] Criar tarefa com e sem prazo
- [x] Bloquear prazo anterior ao dia atual
- [x] Concluir e desmarcar tarefa
- [x] Excluir tarefa
- [x] Atualizar a página e conferir a persistência
- [x] Retornar `400` para ID ou prazo inválido
- [x] Retornar `404` para tarefa inexistente
