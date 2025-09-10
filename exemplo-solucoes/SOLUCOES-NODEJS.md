# Soluções - Projeto Node.js

## Bugs Encontrados e Correções

### Bug 1: Arquivo de dados não inicializado
**Problema**: Ao tentar carregar tarefas, o servidor retorna erro 500
**Como identifiquei**: 
- Testei a funcionalidade "Listar tarefas"
- Verifiquei o console do navegador e vi erro de rede
- Olhei os logs do servidor Node.js
- Vi que o arquivo `tasks.json` não existia

**Solução aplicada**:
```javascript
// Descomentei as linhas 11-13 no server.js
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}
```

### Bug 2: Não consegue marcar tarefas como concluídas
**Problema**: Checkbox não funciona, tarefa não muda de status
**Como identifiquei**:
- Criei uma tarefa com sucesso
- Tentei marcar como concluída clicando no checkbox
- Nada aconteceu, tarefa continuou pendente
- Verifiquei Network tab e vi que requisição PUT retornava 404

**Solução aplicada**:
```javascript
// Linha 45 - converti string para número
const taskId = parseInt(req.params.id);
```

### Bug 3: Não consegue excluir tarefas
**Problema**: Botão "Excluir" não remove a tarefa
**Como identifiquei**:
- Tentei excluir uma tarefa
- Confirmei a exclusão mas tarefa permaneceu
- Network tab mostrava 404 na requisição DELETE
- Mesmo problema de conversão de ID

**Solução aplicada**:
```javascript
// Linha 70 - converti string para número
const taskId = parseInt(req.params.id);
```

## Processo de Debugging

1. **Teste sistemático**: Testei cada funcionalidade uma por vez
2. **Console do navegador**: Verifiquei erros JavaScript e requisições de rede
3. **Logs do servidor**: Observei mensagens de erro no terminal
4. **Análise do código**: Li o código para entender a lógica
5. **Teste das correções**: Após cada correção, testei a funcionalidade

## Ferramentas Utilizadas
- DevTools do navegador (Network, Console)
- Terminal para logs do servidor
- Editor de código para análise

## Aprendizados
- Importância de inicializar recursos (arquivos, banco de dados)
- Diferença entre tipos string e number em JavaScript
- Como debuggar aplicações full-stack
- Processo sistemático de identificação de problemas