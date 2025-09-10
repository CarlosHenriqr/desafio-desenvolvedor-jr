# Setup do Repositório para o Teste

## Configuração Inicial

### 1. Criar Repositório no GitHub
```bash
# No GitHub, criar repositório público: teste-desenvolvedor-jr
# Não inicializar com README (já temos os arquivos)
```

### 2. Inicializar Git Local
```bash
cd TestJr
git init
git add .
git commit -m "feat: adiciona projeto base com bugs intencionais

- Adiciona projeto Node.js com 3 bugs
- Adiciona projeto PHP com 4 bugs  
- Inclui documentação e templates de PR
- Configura processo de entrega via Pull Request"

git branch -M main
git remote add origin https://github.com/SUA_EMPRESA/teste-desenvolvedor-jr.git
git push -u origin main
```

### 3. Configurar Branch Protection (Opcional)
- Proteger branch `main`
- Exigir Pull Request para merge
- Exigir review antes do merge

## Processo para Candidatos

### 1. Enviar Link do Repositório
```
Olá [Nome],

Para o teste técnico, acesse: https://github.com/SUA_EMPRESA/teste-desenvolvedor-jr

Instruções:
1. Faça fork do repositório
2. Escolha uma versão (Node.js ou PHP)
3. Siga as instruções do README
4. Abra um Pull Request com suas correções

Tempo: 1-2 horas para correções + 35 min apresentação

Qualquer dúvida, entre em contato.
```

### 2. Acompanhar Pull Requests
- Receber notificação quando PR for aberto
- Revisar antes da entrevista
- Preparar perguntas específicas baseadas no PR

### 3. Durante a Entrevista
- Candidato apresenta o PR
- Demonstra projeto funcionando
- Explica processo de debugging
- Responde perguntas sobre as soluções

## Vantagens desta Abordagem

### Para a Empresa
- **Processo realista**: Simula workflow real de desenvolvimento
- **Avaliação completa**: Código + documentação + comunicação
- **Histórico**: PRs ficam salvos para comparação
- **Eficiência**: Menos tempo de setup, mais foco na avaliação

### Para o Candidato
- **Experiência real**: Trabalha como seria no dia a dia
- **Portfólio**: PR pode ser usado como exemplo de trabalho
- **Menos pressão**: Pode trabalhar no próprio ritmo
- **Aprendizado**: Processo educativo mesmo se não passar

## Alternativas de Entrega

### Opção 1: Pull Request (Recomendada)
- Fork + PR com correções
- Template estruturado
- Review code durante entrevista

### Opção 2: Repositório Próprio
- Candidato cria próprio repo
- Envia link com projeto corrigido
- Menos realista mas mais simples

### Opção 3: Zip/Email
- Envia arquivos corrigidos
- Mais tradicional
- Perde benefícios do Git workflow