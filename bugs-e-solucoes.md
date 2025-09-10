# Bugs Intencionais e Soluções

## Projeto Node.js

### Bug 1: Arquivo de dados não inicializado
**Problema**: Servidor falha ao tentar ler `tasks.json` que não existe
**Sintoma**: Erro 500 ao carregar tarefas
**Solução**: Descomentar linhas 11-13 no `server.js`

### Bug 2: Conversão de ID no PUT
**Problema**: ID vem como string da URL, mas é comparado com número
**Sintoma**: Não consegue marcar tarefas como concluídas
**Solução**: Converter `req.params.id` para número (linha 45)

### Bug 3: Conversão de ID no DELETE
**Problema**: Mesmo problema do PUT
**Sintoma**: Não consegue excluir tarefas
**Solução**: Converter `req.params.id` para número (linha 70)

## Projeto PHP

### Bug 1: CORS OPTIONS não tratado
**Problema**: Navegador faz preflight OPTIONS que não é tratado
**Sintoma**: Erro CORS ao fazer requisições
**Solução**: Descomentar linhas 7-9 no `index.php`

### Bug 2: Arquivo de dados não inicializado
**Problema**: Arquivo `tasks.json` não existe
**Sintoma**: Erro ao carregar tarefas
**Solução**: Descomentar linhas 13-15 no `index.php`

### Bug 3: Busca por ID incorreta no PUT
**Problema**: `array_search` não encontra ID corretamente
**Sintoma**: Não consegue marcar como concluída
**Solução**: Usar `array_search($taskId, array_column($tasks, 'id'))` (linha 52)

### Bug 4: Busca por ID incorreta no DELETE
**Problema**: Mesmo problema do PUT
**Sintoma**: Não consegue excluir tarefas
**Solução**: Usar `array_search($taskId, array_column($tasks, 'id'))` (linha 67)

## Processo de Debug Esperado

1. **Instalação**: Seguir README e instalar dependências
2. **Execução**: Rodar servidor e abrir frontend
3. **Teste inicial**: Tentar carregar tarefas (primeiro erro)
4. **Correção 1**: Inicializar arquivo de dados
5. **Teste adicionar**: Criar nova tarefa (deve funcionar)
6. **Teste marcar**: Tentar marcar como concluída (segundo erro)
7. **Correção 2**: Corrigir conversão de ID
8. **Teste excluir**: Tentar excluir tarefa (terceiro erro)
9. **Correção 3**: Corrigir conversão de ID no delete
10. **Teste final**: Verificar todas as funcionalidades