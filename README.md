# DTA Vision Documentação

## 🟢 Introdução

O **DTA Vision** é um recurso voltado para integração entre sistemas ERP e o serviço de visão computacional da TOTVS. Com ele, é possível capturar, processar e automatizar operações inteligentes em aplicativos web utilizando poucos parâmetros.

Esta documentação refere-se à implementação apresentada no StackBlitz, disponível em:  
[https://stackblitz.com/~/github.com/yuriduartetotvs/dtaVisionStackBlitz](https://stackblitz.com/~/github.com/yuriduartetotvs/dtaVisionStackBlitz)

---

## 🟦 Sobre a Execução no Stackblitz

O projeto disponível no link acima já possui uma implementação de exemplo do DTA Vision, permitindo a visualização rápida das funcionalidades e integração base do componente.

### Como executar

1. Clique no link acima e abra o projeto no StackBlitz.
2. No painel lateral, edite as variáveis principais do arquivo de configuração conforme sua necessidade (vide seção Variáveis).
3. Pressione o botão "Run" ou aguarde a execução automática.
4. Interaja com a interface e visualize os logs/resultados da integração.

---

## 🟧 Variáveis para Configuração

No componente principal, localize as seguintes variáveis essenciais para a integração do DTA Vision:

```typescript
// Variáveis para o DTA Vision
idTotvsVision = ""; // Esse ID deve ser recuperado do seu ERP 
idProjeto = ""; // É o id que damos para você  
user = ""; // Usuário que está usando o projeto 
contingency: string = ''; // Apenas se necessário
```

## Detalhamento das Variáveis
| Variável          | Tipo     | Descrição                                                                                             | Exemplo                      |
|-------------------|----------|-------------------------------------------------------------------------------------------------------|------------------------------|
| `idTotvsVision`   | string   | **Obrigatório.** ID do ambiente TOTVS Vision. Deve ser obtido pelo administrador do seu ERP.          | `idTotvsVision = "ERP123";`  |
| `idProjeto`       | string   | **Obrigatório.** Identificador único do projeto atribuído pela equipe TOTVS.                          | `idProjeto = "PROJ001";`     |
| `user`            | string   | **Obrigatório.** Representa o usuário logado no ERP ou no sistema consumidor.                         | `user = "fulano";`           |
| `contingency`     | string   | **Opcional.** Parâmetro especial para executar ações em contingência caso necessário.                  | `contingency = "ativa";`     |




## Estrutura Básica (Exemplo de Uso)
```typescript
idTotvsVision = 'SEU_ID_TOTVS';
idProjeto = 'ID_DO_PROJETO';
user = 'nome_usuario';
contingency = ''; // Usar apenas se solicitado
```

## 🟩 Observações Finais

- **Segurança:** Não compartilhe o `idTotvsVision` e `idProjeto` fora de ambientes controlados.
- **Atenção:** O correto funcionamento depende do cadastro prévio do projeto junto ao time TOTVS DTA Vision.
- **Suporte:** Em dúvidas técnicas, procure a central de suporte DTA VISION ou o responsável pela integração.

## 📚 Referências

- [Repositório DTA Vision no Github](https://github.com/yuriduartetotvs/dtaVisionStackBlitz)
- [Stackblitz DTA Vision](https://stackblitz.com/~/github.com/yuriduartetotvs/dtaVisionStackBlitz)
- [Documentação Oficial TOTVS](https://npm.totvs.io/-/web/detail/dta-vision-ocr) (pode variar conforme produto)

ola mundo