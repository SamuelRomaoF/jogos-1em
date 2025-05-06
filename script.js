document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const selectores = document.querySelectorAll('select');
    const verificarBtn = document.getElementById('verificar');
    const resetarBtn = document.getElementById('resetar');
    const dicaBtn = document.getElementById('dica');
    const mensagemEl = document.getElementById('mensagem');
    const categoryRows = document.querySelectorAll('.category-row');
    
    // Solução do quebra-cabeça
    const solucao = [
        { cor: 'azul', nacionalidade: 'italiano', animal: 'cachorro', esporte: 'basquete' },
        { cor: 'vermelha', nacionalidade: 'frances', animal: 'cavalo', esporte: 'futebol' },
        { cor: 'amarela', nacionalidade: 'espanhol', animal: 'borboleta', esporte: 'tenis' },
        { cor: 'preta', nacionalidade: 'alemao', animal: 'tartaruga', esporte: 'sinuca' }
    ];
    
    // Mapeamento das dicas para as soluções
    const dicasSolucao = [
        { 
            texto: "Na quarta posição mora o homem que joga Sinuca.", 
            validacao: () => userSelections.esporte[3] === 'sinuca'
        },
        { 
            texto: "O homem que joga Futebol mora ao lado da casa Preta.", 
            validacao: () => {
                // Encontrar índice de Futebol e casa Preta
                let futebolIndex = -1;
                let pretaIndex = -1;
                
                for (let i = 0; i < 4; i++) {
                    if (userSelections.esporte[i] === 'futebol') futebolIndex = i;
                    if (userSelections.cor[i] === 'preta') pretaIndex = i;
                }
                
                // Se ambos estão selecionados, verificar se estão lado a lado
                if (futebolIndex !== -1 && pretaIndex !== -1) {
                    return Math.abs(futebolIndex - pretaIndex) === 1;
                }
                
                return false;
            }
        },
        { 
            texto: "O Francês mora ao lado do homem que gosta de Basquete.", 
            validacao: () => {
                // Encontrar índice do Francês e Basquete
                let francesIndex = -1;
                let basqueteIndex = -1;
                
                for (let i = 0; i < 4; i++) {
                    if (userSelections.nacionalidade[i] === 'frances') francesIndex = i;
                    if (userSelections.esporte[i] === 'basquete') basqueteIndex = i;
                }
                
                // Se ambos estão selecionados, verificar se estão lado a lado
                if (francesIndex !== -1 && basqueteIndex !== -1) {
                    return Math.abs(francesIndex - basqueteIndex) === 1;
                }
                
                return false;
            }
        },
        { 
            texto: "O homem que gosta de Cachorros mora exatamente à esquerda do homem que gosta de Tartarugas.", 
            validacao: () => {
                // Encontrar índice de Cachorro e Tartaruga
                let cachorroIndex = -1;
                let tartarugaIndex = -1;
                
                for (let i = 0; i < 4; i++) {
                    if (userSelections.animal[i] === 'cachorro') cachorroIndex = i;
                    if (userSelections.animal[i] === 'tartaruga') tartarugaIndex = i;
                }
                
                // Se ambos estão selecionados, verificar se Cachorro está à esquerda de Tartaruga
                if (cachorroIndex !== -1 && tartarugaIndex !== -1) {
                    return cachorroIndex + 1 === tartarugaIndex;
                }
                
                return false;
            }
        },
        { 
            texto: "O homem que gosta de Cavalos também gosta de Futebol.", 
            validacao: () => {
                for (let i = 0; i < 4; i++) {
                    if (userSelections.animal[i] === 'cavalo' && userSelections.esporte[i] === 'futebol') {
                        return true;
                    }
                }
                return false;
            }
        },
        { 
            texto: "O Espanhol mora em algum lugar entre o homem que gosta de Borboletas e o Francês, nessa ordem.", 
            validacao: () => {
                // Encontrar índices
                let borbeletaIndex = -1;
                let espanholIndex = -1;
                let francesIndex = -1;
                
                for (let i = 0; i < 4; i++) {
                    if (userSelections.animal[i] === 'borboleta') borbeletaIndex = i;
                    if (userSelections.nacionalidade[i] === 'espanhol') espanholIndex = i;
                    if (userSelections.nacionalidade[i] === 'frances') francesIndex = i;
                }
                
                // Verificar a ordem
                if (borbeletaIndex !== -1 && espanholIndex !== -1 && francesIndex !== -1) {
                    return borbeletaIndex < espanholIndex && espanholIndex < francesIndex;
                }
                
                return false;
            }
        },
        { 
            texto: "O Espanhol mora em algum lugar entre o homem que joga Tênis e o Alemão, nessa ordem.", 
            validacao: () => {
                // Encontrar índices
                let tenisIndex = -1;
                let espanholIndex = -1;
                let alemaoIndex = -1;
                
                for (let i = 0; i < 4; i++) {
                    if (userSelections.esporte[i] === 'tenis') tenisIndex = i;
                    if (userSelections.nacionalidade[i] === 'espanhol') espanholIndex = i;
                    if (userSelections.nacionalidade[i] === 'alemao') alemaoIndex = i;
                }
                
                // Verificar a ordem
                if (tenisIndex !== -1 && espanholIndex !== -1 && alemaoIndex !== -1) {
                    return tenisIndex < espanholIndex && espanholIndex < alemaoIndex;
                }
                
                return false;
            }
        },
        { 
            texto: "O homem que gosta de Tartarugas também gosta de Sinuca.", 
            validacao: () => {
                for (let i = 0; i < 4; i++) {
                    if (userSelections.animal[i] === 'tartaruga' && userSelections.esporte[i] === 'sinuca') {
                        return true;
                    }
                }
                return false;
            }
        },
        { 
            texto: "O homem que gosta de Sinuca mora ao lado da casa Amarela.", 
            validacao: () => {
                // Encontrar índice de Sinuca e casa Amarela
                let sinucaIndex = -1;
                let amarelaIndex = -1;
                
                for (let i = 0; i < 4; i++) {
                    if (userSelections.esporte[i] === 'sinuca') sinucaIndex = i;
                    if (userSelections.cor[i] === 'amarela') amarelaIndex = i;
                }
                
                // Se ambos estão selecionados, verificar se estão lado a lado
                if (sinucaIndex !== -1 && amarelaIndex !== -1) {
                    return Math.abs(sinucaIndex - amarelaIndex) === 1;
                }
                
                return false;
            }
        },
        { 
            texto: "O morador da casa vermelha joga Futebol.", 
            validacao: () => {
                for (let i = 0; i < 4; i++) {
                    if (userSelections.cor[i] === 'vermelha' && userSelections.esporte[i] === 'futebol') {
                        return true;
                    }
                }
                return false;
            }
        }
    ];
    
    // Armazena as seleções do usuário
    let userSelections = {
        cor: Array(4).fill(''),
        nacionalidade: Array(4).fill(''),
        animal: Array(4).fill(''),
        esporte: Array(4).fill('')
    };
    
    // Verificar cada dica e adicionar os indicadores
    function verificarDicas() {
        const itens = document.querySelectorAll('.clues li');
        
        dicasSolucao.forEach((dica) => {
            // Encontrar o elemento da dica correspondente
            const itemDica = Array.from(itens).find(item => 
                item.textContent.includes(dica.texto)
            );
            
            if (!itemDica) return;
            
            // Verificar se há seleções relevantes para esta dica antes de avaliá-la
            let temSelecaoRelevante = false;
            let temTodasInformacoes = true;
            
            // Caso especial para a primeira dica (quarta posição)
            if (dica.texto.includes("Na quarta posição")) {
                temSelecaoRelevante = userSelections.esporte[3] !== '';
            }
            // Caso especial para a dica sobre Tartarugas e Sinuca
            else if (dica.texto.includes("Tartarugas também gosta de Sinuca")) {
                temSelecaoRelevante = userSelections.animal.some(item => item === 'tartaruga') || 
                                      userSelections.esporte.some(item => item === 'sinuca');
                // Só avalia se o usuário já selecionou tartaruga E sinuca
                temTodasInformacoes = userSelections.animal.includes('tartaruga') && 
                                     userSelections.esporte.includes('sinuca');
            }
            // Caso especial para a dica sobre Sinuca e casa Amarela
            else if (dica.texto.includes("Sinuca mora ao lado da casa Amarela")) {
                temSelecaoRelevante = userSelections.esporte.some(item => item === 'sinuca') || 
                                      userSelections.cor.some(item => item === 'amarela');
                // Só avalia se o usuário já selecionou sinuca E amarela
                temTodasInformacoes = userSelections.esporte.includes('sinuca') && 
                                     userSelections.cor.includes('amarela');
            }
            // Outros casos específicos para dicas que necessitam múltiplas informações
            else if (dica.texto.includes("Futebol mora ao lado da casa Preta")) {
                temSelecaoRelevante = userSelections.esporte.some(item => item === 'futebol') || 
                                      userSelections.cor.some(item => item === 'preta');
                temTodasInformacoes = userSelections.esporte.includes('futebol') && 
                                     userSelections.cor.includes('preta');
            }
            else if (dica.texto.includes("Francês mora ao lado do homem que gosta de Basquete")) {
                temSelecaoRelevante = userSelections.nacionalidade.some(item => item === 'frances') || 
                                      userSelections.esporte.some(item => item === 'basquete');
                temTodasInformacoes = userSelections.nacionalidade.includes('frances') && 
                                     userSelections.esporte.includes('basquete');
            }
            else if (dica.texto.includes("Cachorros mora exatamente à esquerda")) {
                temSelecaoRelevante = userSelections.animal.some(item => item === 'cachorro') || 
                                      userSelections.animal.some(item => item === 'tartaruga');
                temTodasInformacoes = userSelections.animal.includes('cachorro') && 
                                     userSelections.animal.includes('tartaruga');
            }
            else if (dica.texto.includes("Cavalos também gosta de Futebol")) {
                temSelecaoRelevante = userSelections.animal.some(item => item === 'cavalo') || 
                                      userSelections.esporte.some(item => item === 'futebol');
                temTodasInformacoes = userSelections.animal.includes('cavalo') && 
                                     userSelections.esporte.includes('futebol');
            }
            else if (dica.texto.includes("Espanhol mora em algum lugar entre o homem que gosta de Borboletas")) {
                temSelecaoRelevante = userSelections.nacionalidade.some(item => item === 'espanhol') || 
                                      userSelections.animal.some(item => item === 'borboleta') ||
                                      userSelections.nacionalidade.some(item => item === 'frances');
                temTodasInformacoes = userSelections.nacionalidade.includes('espanhol') && 
                                     userSelections.animal.includes('borboleta') &&
                                     userSelections.nacionalidade.includes('frances');
            }
            else if (dica.texto.includes("Espanhol mora em algum lugar entre o homem que joga Tênis")) {
                temSelecaoRelevante = userSelections.nacionalidade.some(item => item === 'espanhol') || 
                                      userSelections.esporte.some(item => item === 'tenis') ||
                                      userSelections.nacionalidade.some(item => item === 'alemao');
                temTodasInformacoes = userSelections.nacionalidade.includes('espanhol') && 
                                     userSelections.esporte.includes('tenis') &&
                                     userSelections.nacionalidade.includes('alemao');
            }
            else if (dica.texto.includes("morador da casa vermelha joga Futebol")) {
                temSelecaoRelevante = userSelections.cor.some(item => item === 'vermelha') || 
                                      userSelections.esporte.some(item => item === 'futebol');
                temTodasInformacoes = userSelections.cor.includes('vermelha') && 
                                     userSelections.esporte.includes('futebol');
            }
            // Caso genérico para dicas simples
            else {
                // Dependendo da dica, verificar se há seleções suficientes para avaliá-la
                if (dica.texto.includes("Sinuca")) {
                    temSelecaoRelevante = userSelections.esporte.some(item => item === 'sinuca');
                } else if (dica.texto.includes("Futebol")) {
                    temSelecaoRelevante = userSelections.esporte.some(item => item === 'futebol');
                } else if (dica.texto.includes("Francês")) {
                    temSelecaoRelevante = userSelections.nacionalidade.some(item => item === 'frances');
                } else if (dica.texto.includes("Espanhol")) {
                    temSelecaoRelevante = userSelections.nacionalidade.some(item => item === 'espanhol');
                } else if (dica.texto.includes("Alemão")) {
                    temSelecaoRelevante = userSelections.nacionalidade.some(item => item === 'alemao');
                } else if (dica.texto.includes("Borboletas")) {
                    temSelecaoRelevante = userSelections.animal.some(item => item === 'borboleta');
                } else if (dica.texto.includes("Cachorros")) {
                    temSelecaoRelevante = userSelections.animal.some(item => item === 'cachorro');
                } else if (dica.texto.includes("Tartarugas")) {
                    temSelecaoRelevante = userSelections.animal.some(item => item === 'tartaruga');
                } else if (dica.texto.includes("Cavalos")) {
                    temSelecaoRelevante = userSelections.animal.some(item => item === 'cavalo');
                } else if (dica.texto.includes("Preta")) {
                    temSelecaoRelevante = userSelections.cor.some(item => item === 'preta');
                } else if (dica.texto.includes("Amarela")) {
                    temSelecaoRelevante = userSelections.cor.some(item => item === 'amarela');
                } else if (dica.texto.includes("vermelha")) {
                    temSelecaoRelevante = userSelections.cor.some(item => item === 'vermelha');
                } else if (dica.texto.includes("Tênis")) {
                    temSelecaoRelevante = userSelections.esporte.some(item => item === 'tenis');
                } else if (dica.texto.includes("Basquete")) {
                    temSelecaoRelevante = userSelections.esporte.some(item => item === 'basquete');
                }
            }
            
            // Limpar indicadores anteriores
            itemDica.classList.remove('dica-correta', 'dica-errada');
            const indicadorAnterior = itemDica.querySelector('.dica-indicador');
            if (indicadorAnterior) {
                indicadorAnterior.remove();
            }
            
            if (temSelecaoRelevante && temTodasInformacoes) {
                // Verificar se a dica está correta com base na validação
                const estaDicaCorreta = dica.validacao();
                
                // Adicionar o indicador visual na dica apenas se tiver seleções relevantes
                adicionarIndicadorDica(itemDica, estaDicaCorreta);
            }
        });
    }
    
    // Verificar células específicas e mostrar feedback
    function verificarCelulasEspecificas() {
        // Verificar a casa 4 e esporte Sinuca especificamente
        const casa4Esporte = document.querySelector(`.select-cell[data-house="4"][data-type="esporte"]`);
        if (casa4Esporte) {
            const estaCerto = userSelections.esporte[3] === 'sinuca';
            
            // Se o usuário selecionou algo para esta casa e está errado
            if (userSelections.esporte[3] !== '' && !estaCerto) {
                adicionarIndicadorResposta(casa4Esporte, false);
                casa4Esporte.classList.add('resposta-errada-pulsante');
            } else if (userSelections.esporte[3] !== '' && estaCerto) {
                adicionarIndicadorResposta(casa4Esporte, true);
                casa4Esporte.classList.remove('resposta-errada-pulsante');
            }
        }
    }
    
    // Prevenir a seleção de valores duplicados
    selectores.forEach(select => {
        select.addEventListener('change', (e) => {
            const [categoria, indice] = e.target.id.split('-');
            const valor = e.target.value;
            const casaIndice = parseInt(indice) - 1;
            
            // Armazenar a seleção do usuário
            userSelections[categoria][casaIndice] = valor;
            
            // Desabilitar a opção selecionada em outros selects da mesma categoria
            document.querySelectorAll(`select.${categoria}`).forEach((otherSelect, idx) => {
                if (otherSelect !== e.target) {
                    Array.from(otherSelect.options).forEach(option => {
                        if (option.value === valor && valor !== '') {
                            option.disabled = true;
                        }
                    });
                }
            });
            
            // Habilitar opções que não estão mais selecionadas
            const todasOpcoes = Array.from(document.querySelectorAll(`select.${categoria} option`))
                .filter(option => option.value !== '')
                .map(option => option.value);
                
            const opcoesUtilizadas = userSelections[categoria].filter(val => val !== '');
            
            const opcoesDisponiveis = todasOpcoes.filter(opcao => !opcoesUtilizadas.includes(opcao));
            
            document.querySelectorAll(`select.${categoria}`).forEach(select => {
                Array.from(select.options).forEach(option => {
                    if (opcoesDisponiveis.includes(option.value)) {
                        option.disabled = false;
                    }
                });
            });
            
            // Atualizar a cor das células se a categoria for cor
            if (categoria === 'cor') {
                // Remover cores anteriores da casa atual
                document.querySelectorAll(`.select-cell[data-house="${indice}"]`).forEach(cell => {
                    cell.removeAttribute('data-color');
                });
                
                if (valor !== '') {
                    // Aplicar cor a todas as células da casa selecionada
                    document.querySelectorAll(`.select-cell[data-house="${indice}"]`).forEach(cell => {
                        cell.setAttribute('data-color', valor);
                    });
                    
                    // Aplicar cor ao título da casa
                    const houseTitles = document.querySelectorAll('.house-title');
                    if (houseTitles[casaIndice]) {
                        houseTitles[casaIndice].setAttribute('data-color', valor);
                    }
                } else {
                    // Se a cor foi removida, também remover do título
                    const houseTitles = document.querySelectorAll('.house-title');
                    if (houseTitles[casaIndice]) {
                        houseTitles[casaIndice].removeAttribute('data-color');
                    }
                }
            }
            
            // Atualizar a célula modificada
            const cell = e.target.closest('.select-cell');
            if (cell) {
                // Primeiro remover indicadores anteriores desta célula
                cell.classList.remove('resposta-correta', 'resposta-errada', 'resposta-errada-pulsante');
                const indicador = cell.querySelector('.indicador-resposta');
                if (indicador) indicador.remove();
                
                // Se o usuário selecionou algum valor, verificar se está correto
                if (valor !== '') {
                    // Verificar se a resposta está correta conforme a solução
                    const respostaCorreta = solucao[casaIndice][categoria];
                    const estaCorrecto = valor === respostaCorreta;
                    
                    // Adicionar o indicador visual
                    adicionarIndicadorResposta(cell, estaCorrecto);
                    
                    // Se estiver errado, adicionar efeito pulsante
                    if (!estaCorrecto) {
                        cell.classList.add('resposta-errada-pulsante');
                    }
                }
            }
            
            // Verificar células específicas que têm dicas diretas
            verificarCelulasEspecificas();
            
            // Verificar e atualizar as dicas
            verificarDicas();
            
            // Verificar automaticamente se todas as seleções foram feitas
            verificarCompletude();
        });
    });
    
    // Verificar se o jogador preencheu todas as opções
    function verificarCompletude() {
        const todasPreenchidas = Object.values(userSelections).every(categoria => 
            categoria.every(valor => valor !== '')
        );
        
        if (todasPreenchidas) {
            verificarBtn.classList.add('pulse');
        } else {
            verificarBtn.classList.remove('pulse');
        }
    }
    
    // Limpar os indicadores de resposta certa/errada
    function limparIndicadoresResposta() {
        document.querySelectorAll('.select-cell').forEach(cell => {
            cell.classList.remove('resposta-correta', 'resposta-errada', 'resposta-errada-pulsante');
            const indicador = cell.querySelector('.indicador-resposta');
            if (indicador) {
                indicador.remove();
            }
        });
        
        // Limpar indicadores nas dicas
        document.querySelectorAll('li').forEach(item => {
            item.classList.remove('dica-correta', 'dica-errada');
            const indicador = item.querySelector('.dica-indicador');
            if (indicador) {
                indicador.remove();
            }
        });
    }
    
    // Adicionar um indicador de resposta (✓ ou ✗)
    function adicionarIndicadorResposta(cell, correto) {
        // Verificar se a célula existe
        if (!cell) return;
        
        // Remover indicador anterior se existir
        const indicadorAnterior = cell.querySelector('.indicador-resposta');
        if (indicadorAnterior) {
            indicadorAnterior.remove();
        }
        
        // Adicionar classe de estilo apropriada à célula (mas sem símbolo)
        cell.classList.add(correto ? 'resposta-correta' : 'resposta-errada');
    }
    
    // Adicionar um indicador para as dicas (✓ ou ✗)
    function adicionarIndicadorDica(item, correto) {
        // Verificar se o item existe
        if (!item) return;
        
        // Remover indicador anterior se existir
        const indicadorAnterior = item.querySelector('.dica-indicador');
        if (indicadorAnterior) {
            indicadorAnterior.remove();
        }
        
        // Adicionar a classe correspondente
        item.classList.remove('dica-correta', 'dica-errada');
        item.classList.add(correto ? 'dica-correta' : 'dica-errada');
        
        // Criar novo indicador
        const indicador = document.createElement('span');
        indicador.className = 'dica-indicador';
        indicador.textContent = correto ? ' ✓' : ' ✗';
        
        // Adicionar o indicador ao item
        item.appendChild(indicador);
    }
    
    // Botão de verificação
    verificarBtn.addEventListener('click', () => {
        // Verificar se todas as posições foram preenchidas
        const categorias = ['cor', 'nacionalidade', 'animal', 'esporte'];
        const faltandoSelecoes = categorias.some(categoria => 
            userSelections[categoria].some(valor => valor === '')
        );
        
        if (faltandoSelecoes) {
            exibirMensagem('Preencha todas as opções antes de verificar!', 'error');
            return;
        }
        
        // Limpar quaisquer indicadores anteriores
        limparIndicadoresResposta();
        
        // Verificar cada resposta individualmente e adicionar indicadores
        let totalAcertos = 0;
        let totalItems = 4 * 4; // 4 casas com 4 atributos cada
        
        categorias.forEach(categoria => {
            for (let i = 0; i < 4; i++) {
                const respostaCorreta = solucao[i][categoria];
                const respostaUsuario = userSelections[categoria][i];
                const estaCorrecto = respostaUsuario === respostaCorreta;
                
                if (estaCorrecto) {
                    totalAcertos++;
                }
                
                // Encontrar a célula correspondente e adicionar o indicador
                const cell = document.querySelector(`.select-cell[data-house="${i+1}"][data-type="${categoria}"]`);
                
                if (cell) {
                    adicionarIndicadorResposta(cell, estaCorrecto);
                    
                    // Destacar visualmente as células erradas com um efeito pulsante
                    if (!estaCorrecto) {
                        cell.classList.add('resposta-errada-pulsante');
                    }
                }
            }
        });
        
        // Destacar especialmente células com dicas importantes
        verificarCelulasEspecificas();
        
        // Verificar cada dica
        verificarDicas();
        
        // Verificar se a resposta completa está correta
        const solucionadoCompletamente = totalAcertos === totalItems;
        
        if (solucionadoCompletamente) {
            exibirMensagem('Parabéns! Você resolveu o quebra-cabeça corretamente!', 'success');
            
            // Adicionar efeito visual de sucesso
            document.querySelectorAll('.select-cell').forEach(cell => {
                cell.classList.add('success');
            });
            
            // Adicionar classe para títulos das casas
            document.querySelectorAll('.house-title').forEach(title => {
                title.classList.add('success');
            });
        } else {
            const percentualAcerto = Math.round((totalAcertos / totalItems) * 100);
            exibirMensagem(`Resposta incompleta. Você acertou ${totalAcertos} de ${totalItems} itens (${percentualAcerto}%). Corrija os itens marcados com ✗ e tente novamente!`, 'error');
        }
    });
    
    // Botão de resetar
    resetarBtn.addEventListener('click', () => {
        // Resetar todas as seleções
        selectores.forEach(select => {
            select.selectedIndex = 0;
            
            Array.from(select.options).forEach(option => {
                option.disabled = false;
            });
        });
        
        // Resetar o objeto de seleções do usuário
        Object.keys(userSelections).forEach(key => {
            userSelections[key] = Array(4).fill('');
        });
        
        // Limpar a mensagem
        mensagemEl.style.display = 'none';
        mensagemEl.textContent = '';
        mensagemEl.className = 'message';
        
        // Remover atributos de cor das células e títulos
        document.querySelectorAll('.select-cell, .house-title').forEach(el => {
            el.removeAttribute('data-color');
        });
        
        // Limpar indicadores de resposta
        limparIndicadoresResposta();
        
        // Remover efeitos de destaque e sucesso
        document.querySelectorAll('.select-cell').forEach(cell => {
            cell.classList.remove('highlight', 'success', 'resposta-errada-pulsante', 'dica-importante');
        });
        
        document.querySelectorAll('.house-title').forEach(title => {
            title.classList.remove('success');
        });
        
        verificarBtn.classList.remove('pulse');
        
        exibirMensagem('Jogo reiniciado! Tente novamente.', 'hint');
    });
    
    // Fornecer uma dica
    dicaBtn.addEventListener('click', () => {
        const dicas = [
            "O homem que joga Sinuca está na quarta casa, isso já é uma informação importante.",
            "Lembre-se que o Francês mora ao lado do homem que gosta de Basquete.",
            "O morador da casa vermelha joga Futebol, e quem gosta de Cavalos também gosta de Futebol.",
            "Quem tem um Cachorro mora à esquerda de quem tem uma Tartaruga.",
            "O Espanhol está entre quem gosta de Borboletas e o Francês.",
            "O Espanhol também está entre quem joga Tênis e o Alemão.",
            "A casa amarela está ao lado de quem joga Sinuca.",
            "Quem gosta de Tartarugas também gosta de Sinuca."
        ];
        
        const dicaAleatoria = dicas[Math.floor(Math.random() * dicas.length)];
        exibirMensagem(`Dica: ${dicaAleatoria}`, 'hint');
    });
    
    // Exibir mensagem
    function exibirMensagem(texto, tipo) {
        mensagemEl.textContent = texto;
        mensagemEl.className = `message ${tipo}`;
        mensagemEl.style.display = 'block';
        
        // Rolar até a mensagem
        mensagemEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Adicionar efeito de hover para destacar células
    document.querySelectorAll('.select-cell').forEach(cell => {
        const categoria = cell.getAttribute('data-type');
        const casa = cell.getAttribute('data-house');
        
        cell.addEventListener('mouseenter', () => {
            cell.classList.add('highlight');
            
            // Destacar todas as células da mesma casa
            const todasCelulasCasa = document.querySelectorAll(`.select-cell[data-house="${casa}"]`);
            todasCelulasCasa.forEach(celula => {
                if (celula !== cell) {
                    celula.classList.add('house-related');
                }
            });
            
            // Destacar todas as células da mesma categoria
            const todasCelulasCategoria = document.querySelectorAll(`.select-cell[data-type="${categoria}"]`);
            todasCelulasCategoria.forEach(celula => {
                if (celula !== cell && !celula.classList.contains('house-related')) {
                    celula.classList.add('category-related');
                }
            });
        });
        
        cell.addEventListener('mouseleave', () => {
            cell.classList.remove('highlight');
            
            // Remover destaque de todas as células relacionadas
            document.querySelectorAll('.house-related, .category-related').forEach(celula => {
                celula.classList.remove('house-related', 'category-related');
            });
        });
    });
    
    // Adicionar estilos para as relações entre células e indicadores de resposta
    const style = document.createElement('style');
    style.textContent = `
        .select-cell.house-related {
            background-color: rgba(76, 175, 80, 0.05);
            border-radius: 4px;
        }
        
        .select-cell.category-related {
            background-color: rgba(76, 132, 255, 0.05);
            border-radius: 4px;
        }
        
        .select-cell.success, .house-title.success {
            background-color: #e8f5e9;
            border: 1px solid #4caf50;
            animation: successPulse 2s infinite;
        }
        
        .select-cell.resposta-correta {
            background-color: rgba(76, 175, 80, 0.2) !important;
        }
        
        .select-cell.resposta-errada {
            background-color: rgba(244, 67, 54, 0.2) !important;
        }
        
        .indicador-resposta {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-weight: bold;
            font-size: 20px;
            background-color: white;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        
        .resposta-correta .indicador-resposta {
            color: #4caf50;
            border: 1px solid #4caf50;
        }
        
        .resposta-errada .indicador-resposta {
            color: #f44336;
            border: 1px solid #f44336;
        }
        
        /* Estilos para dicas corretas e erradas */
        .dica-correta {
            background-color: rgba(76, 175, 80, 0.1) !important;
            padding: 5px !important;
            border-radius: 4px !important;
            border-left: 3px solid #4caf50 !important;
        }
        
        .dica-errada {
            background-color: rgba(244, 67, 54, 0.1) !important;
            padding: 5px !important;
            border-radius: 4px !important;
            border-left: 3px solid #f44336 !important;
        }
        
        .dica-indicador {
            font-weight: bold;
            font-size: 16px;
            margin-left: 5px;
        }
        
        .dica-correta .dica-indicador {
            color: #4caf50;
        }
        
        .dica-errada .dica-indicador {
            color: #f44336;
        }
        
        .select-cell {
            position: relative;
        }
        
        .resposta-errada-pulsante {
            animation: errorPulse 2s infinite;
        }
        
        .dica-importante {
            border: 2px solid #f44336 !important;
            position: relative;
            z-index: 5;
        }
        
        .tooltip-dica {
            position: absolute;
            bottom: -40px;
            left: 0;
            right: 0;
            background-color: #f44336;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 10;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        
        @keyframes successPulse {
            0%, 100% { box-shadow: 0 0 5px rgba(76, 175, 80, 0.2); }
            50% { box-shadow: 0 0 15px rgba(76, 175, 80, 0.7); }
        }
        
        @keyframes errorPulse {
            0%, 100% { box-shadow: 0 0 5px rgba(244, 67, 54, 0.2); }
            50% { box-shadow: 0 0 15px rgba(244, 67, 54, 0.7); }
        }
    `;
    document.head.appendChild(style);
    
    // Inicializar cores baseado em seleções pré-existentes
    document.querySelectorAll('select.cor').forEach(select => {
        if (select.value !== '') {
            const [_, indice] = select.id.split('-');
            const valor = select.value;
            const casaIndice = parseInt(indice) - 1;
            
            // Armazenar a seleção do usuário
            userSelections.cor[casaIndice] = valor;
            
            // Aplicar cor a todas as células da casa
            document.querySelectorAll(`.select-cell[data-house="${indice}"]`).forEach(cell => {
                cell.setAttribute('data-color', valor);
            });
            
            // Aplicar cor ao título da casa
            const houseTitles = document.querySelectorAll('.house-title');
            if (houseTitles[casaIndice]) {
                houseTitles[casaIndice].setAttribute('data-color', valor);
            }
        }
    });
    
    // Inicializar todas as outras seleções pré-existentes
    document.querySelectorAll('select:not(.cor)').forEach(select => {
        if (select.value !== '') {
            const [categoria, indice] = select.id.split('-');
            const valor = select.value;
            const casaIndice = parseInt(indice) - 1;
            
            // Armazenar a seleção do usuário
            userSelections[categoria][casaIndice] = valor;
        }
    });
    
    // Verificar dicas inicialmente para qualquer seleção pré-existente
    if (Object.values(userSelections).some(categoria => categoria.some(valor => valor !== ''))) {
        verificarDicas();
        verificarCelulasEspecificas();
    }
    
    // Força a verificação inicial após carregar a página
    setTimeout(() => {
        verificarDicas();
        verificarCelulasEspecificas();
    }, 500);
}); 