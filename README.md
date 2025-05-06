# Jogo de Lógica - Racha Cuca

Um jogo de dedução lógica inspirado no site Racha Cuca, onde o jogador precisa descobrir a combinação correta de atributos para cada casa baseado em um conjunto de dicas.

## Características

- **Design Responsivo**: O jogo se adapta a diferentes tamanhos de tela
- **Validação em Tempo Real**: As opções já selecionadas são automaticamente desabilitadas
- **Sistema de Dicas**: Botão para obter dicas aleatórias
- **Feedback Visual**: Animações e indicadores visuais para melhorar a experiência do usuário
- **Verificação Inteligente**: O sistema calcula a porcentagem de acertos mesmo quando a solução não está completamente correta

## Como Jogar

1. Leia as dicas apresentadas na parte inferior do jogo
2. Com base nas dicas, selecione os atributos corretos para cada casa
3. Cada atributo (cor, nacionalidade, animal, esporte) só pode ser usado uma vez
4. Clique em "Verificar Resposta" quando acreditar ter encontrado a solução correta
5. Use o botão "Dica" se precisar de ajuda
6. Você pode reiniciar o jogo a qualquer momento clicando em "Recomeçar"

## Tecnologias Utilizadas

- HTML5
- CSS3 (com layout flexbox e grid)
- JavaScript puro (sem dependências)

## Como Executar

Simplesmente abra o arquivo `index.html` em qualquer navegador moderno.

## Personalizando o Jogo

Você pode personalizar o quebra-cabeça editando os seguintes componentes:

1. **Atributos e opções**: Edite as opções nos elementos `<select>` no arquivo HTML
2. **Solução do quebra-cabeça**: Modifique o array `solucao` no arquivo JavaScript
3. **Dicas**: Atualize as dicas na lista `<ul>` no HTML e o array `dicas` no JavaScript
4. **Estilo**: Personalize as cores e estilos no arquivo CSS

## Criando Novos Quebra-Cabeças

Para criar um novo quebra-cabeça:

1. Determine a solução (qual atributo pertence a qual casa)
2. Crie dicas que permitam ao jogador deduzir logicamente a solução
3. Certifique-se de que as dicas levam a uma única solução possível
4. Atualize o array `solucao` no JavaScript e as dicas no HTML

## Licença

Este projeto está disponível como código aberto sob os termos da licença MIT. 