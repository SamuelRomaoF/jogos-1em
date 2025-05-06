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
        { cientista: 'einstein', area: 'fisica', descoberta: 'relatividade', epoca: 'moderna' },
        { cientista: 'newton', area: 'astronomia', descoberta: 'gravidade', epoca: 'iluminismo' },
        { cientista: 'darwin', area: 'biologia', descoberta: 'evolucao', epoca: 'revolucao' },
        { cientista: 'marie', area: 'quimica', descoberta: 'radioatividade', epoca: 'renascenca' }
    ];
    
    // Mapeamento das dicas para as soluções
    const dicasSolucao = [
        { 
            texto: "O cientista que desenvolveu a Teoria da Relatividade está na Era Moderna.", 
            validacao: () => {
                for (let i = 0; i < 4; i++) {
                    if (userSelections.descoberta[i] === 'relatividade' && userSelections.epoca[i] === 'moderna') {
                        return true;
                    }
                }
                return false;
            }
        },
        { 
            texto: "O cientista que descobriu a Radioatividade está ao lado do cientista que desenvolveu a Lei da Gravidade.", 
            validacao: () => {
                let radioatividadeIndex = -1;
                let gravidadeIndex = -1;
                
                for (let i = 0; i < 4; i++) {
                    if (userSelections.descoberta[i] === 'radioatividade') radioatividadeIndex = i;
                    if (userSelections.descoberta[i] === 'gravidade') gravidadeIndex = i;
                }
                
                if (radioatividadeIndex !== -1 && gravidadeIndex !== -1) {
                    return Math.abs(radioatividadeIndex - gravidadeIndex) === 1;
                }
                
                return false;
            }
        },
        { 
            texto: "O cientista que desenvolveu a Teoria da Evolução está na Revolução Industrial.", 
            validacao: () => {
                for (let i = 0; i < 4; i++) {
                    if (userSelections.descoberta[i] === 'evolucao' && userSelections.epoca[i] === 'revolucao') {
                        return true;
                    }
                }
                return false;
            }
        },
        { 
            texto: "O cientista que desenvolveu a Teoria da Relatividade está exatamente à esquerda do cientista que descobriu a Radioatividade.", 
            validacao: () => {
                let relatividadeIndex = -1;
                let radioatividadeIndex = -1;
                
                for (let i = 0; i < 4; i++) {
                    if (userSelections.descoberta[i] === 'relatividade') relatividadeIndex = i;
                    if (userSelections.descoberta[i] === 'radioatividade') radioatividadeIndex = i;
                }
                
                if (relatividadeIndex !== -1 && radioatividadeIndex !== -1) {
                    return relatividadeIndex + 1 === radioatividadeIndex;
                }
                
                return false;
            }
        },
        { 
            texto: "O cientista Einstein trabalha na Física.", 
            validacao: () => {
                for (let i = 0; i < 4; i++) {
                    if (userSelections.cientista[i] === 'einstein' && userSelections.area[i] === 'fisica') {
                        return true;
                    }
                }
                return false;
            }
        },
        { 
            texto: "O cientista Darwin está entre o cientista Newton e Marie Curie, nessa ordem.", 
            validacao: () => {
                let darwinIndex = -1;
                let newtonIndex = -1;
                let marieIndex = -1;
                
                for (let i = 0; i < 4; i++) {
                    if (userSelections.cientista[i] === 'darwin') darwinIndex = i;
                    if (userSelections.cientista[i] === 'newton') newtonIndex = i;
                    if (userSelections.cientista[i] === 'marie') marieIndex = i;
                }
                
                if (darwinIndex !== -1 && newtonIndex !== -1 && marieIndex !== -1) {
                    return newtonIndex < darwinIndex && darwinIndex < marieIndex;
                }
                
                return false;
            }
        },
        { 
            texto: "O cientista Newton está entre o cientista Einstein e o cientista Darwin, nessa ordem.", 
            validacao: () => {
                let newtonIndex = -1;
                let einsteinIndex = -1;
                let darwinIndex = -1;
                
                for (let i = 0; i < 4; i++) {
                    if (userSelections.cientista[i] === 'newton') newtonIndex = i;
                    if (userSelections.cientista[i] === 'einstein') einsteinIndex = i;
                    if (userSelections.cientista[i] === 'darwin') darwinIndex = i;
                }
                
                if (newtonIndex !== -1 && einsteinIndex !== -1 && darwinIndex !== -1) {
                    return einsteinIndex < newtonIndex && newtonIndex < darwinIndex;
                }
                
                return false;
            }
        },
        { 
            texto: "A cientista Marie Curie trabalha na Química.", 
            validacao: () => {
                for (let i = 0; i < 4; i++) {
                    if (userSelections.cientista[i] === 'marie' && userSelections.area[i] === 'quimica') {
                        return true;
                    }
                }
                return false;
            }
        },
        { 
            texto: "O cientista que trabalha na Física está ao lado do cientista que trabalha na Biologia.", 
            validacao: () => {
                let fisicaIndex = -1;
                let biologiaIndex = -1;
                
                for (let i = 0; i < 4; i++) {
                    if (userSelections.area[i] === 'fisica') fisicaIndex = i;
                    if (userSelections.area[i] === 'biologia') biologiaIndex = i;
                }
                
                if (fisicaIndex !== -1 && biologiaIndex !== -1) {
                    return Math.abs(fisicaIndex - biologiaIndex) === 1;
                }
                
                return false;
            }
        },
        { 
            texto: "O cientista que trabalha na Astronomia é o que desenvolveu a Lei da Gravidade.", 
            validacao: () => {
                for (let i = 0; i < 4; i++) {
                    if (userSelections.area[i] === 'astronomia' && userSelections.descoberta[i] === 'gravidade') {
                        return true;
                    }
                }
                return false;
            }
        }
    ];
    
    // Armazena as seleções do usuário
    let userSelections = {
        cientista: Array(4).fill(''),
        area: Array(4).fill(''),
        descoberta: Array(4).fill(''),
        epoca: Array(4).fill('')
    };
    
    // Função para atualizar seleções e gerenciar opções disponíveis
    function atualizarSelecoes(select) {
        // Extrair informações do select
        const cell = select.closest('.select-cell');
        if (!cell) return;
        
        const house = parseInt(cell.dataset.house) - 1;
        const type = cell.dataset.type;
        const value = select.value;
        
        // Armazenar valor anterior para restaurar opções
        const valorAnterior = userSelections[type][house];
        
        // Atualizar seleção do usuário
        userSelections[type][house] = value;
        
        // Re-habilitar valor anterior em outros selects do mesmo tipo
        if (valorAnterior) {
            document.querySelectorAll(`select.${type}`).forEach(otherSelect => {
                Array.from(otherSelect.options).forEach(option => {
                    if (option.value === valorAnterior) {
                        option.disabled = false;
                    }
                });
            });
        }
        
        // Desabilitar novo valor em outros selects do mesmo tipo
        if (value) {
            document.querySelectorAll(`select.${type}`).forEach(otherSelect => {
                if (otherSelect !== select) {
                    Array.from(otherSelect.options).forEach(option => {
                        if (option.value === value) {
                            option.disabled = true;
                        }
                    });
                }
            });
        }
        
        // Verificar seleções
        verificarCelulasEspecificas();
        verificarDicas();
        verificarCompletude();
    }
    
    // Verificar cada dica e adicionar os indicadores
    function verificarDicas() {
        const itens = document.querySelectorAll('.clues li');
        
        dicasSolucao.forEach((dica) => {
            const itemDica = Array.from(itens).find(item => 
                item.textContent.includes(dica.texto)
            );
            
            if (!itemDica) return;
            
            let temSelecaoRelevante = false;
            let temTodasInformacoes = true;
            
            if (dica.texto.includes("Teoria da Relatividade está na Era Moderna")) {
                temSelecaoRelevante = userSelections.descoberta.some(item => item === 'relatividade') || 
                                      userSelections.epoca.some(item => item === 'moderna');
                temTodasInformacoes = userSelections.descoberta.includes('relatividade') && 
                                     userSelections.epoca.includes('moderna');
            }
            else if (dica.texto.includes("Radioatividade está ao lado do cientista que desenvolveu a Lei da Gravidade")) {
                temSelecaoRelevante = userSelections.descoberta.some(item => item === 'radioatividade') || 
                                      userSelections.descoberta.some(item => item === 'gravidade');
                temTodasInformacoes = userSelections.descoberta.includes('radioatividade') && 
                                     userSelections.descoberta.includes('gravidade');
            }
            else if (dica.texto.includes("Teoria da Evolução está na Revolução Industrial")) {
                temSelecaoRelevante = userSelections.descoberta.some(item => item === 'evolucao') || 
                                      userSelections.epoca.some(item => item === 'revolucao');
                temTodasInformacoes = userSelections.descoberta.includes('evolucao') && 
                                     userSelections.epoca.includes('revolucao');
            }
            else if (dica.texto.includes("Teoria da Relatividade está exatamente à esquerda")) {
                temSelecaoRelevante = userSelections.descoberta.some(item => item === 'relatividade') || 
                                      userSelections.descoberta.some(item => item === 'radioatividade');
                temTodasInformacoes = userSelections.descoberta.includes('relatividade') && 
                                     userSelections.descoberta.includes('radioatividade');
            }
            else if (dica.texto.includes("Einstein trabalha na Física")) {
                temSelecaoRelevante = userSelections.cientista.some(item => item === 'einstein') || 
                                      userSelections.area.some(item => item === 'fisica');
                temTodasInformacoes = userSelections.cientista.includes('einstein') && 
                                     userSelections.area.includes('fisica');
            }
            else if (dica.texto.includes("Darwin está entre o cientista Newton e Marie Curie")) {
                temSelecaoRelevante = userSelections.cientista.some(item => item === 'darwin') || 
                                      userSelections.cientista.some(item => item === 'newton') ||
                                      userSelections.cientista.some(item => item === 'marie');
                temTodasInformacoes = userSelections.cientista.includes('darwin') && 
                                     userSelections.cientista.includes('newton') &&
                                     userSelections.cientista.includes('marie');
            }
            else if (dica.texto.includes("Newton está entre o cientista Einstein e o cientista Darwin")) {
                temSelecaoRelevante = userSelections.cientista.some(item => item === 'newton') || 
                                      userSelections.cientista.some(item => item === 'einstein') ||
                                      userSelections.cientista.some(item => item === 'darwin');
                temTodasInformacoes = userSelections.cientista.includes('newton') && 
                                     userSelections.cientista.includes('einstein') &&
                                     userSelections.cientista.includes('darwin');
            }
            else if (dica.texto.includes("Marie Curie trabalha na Química")) {
                temSelecaoRelevante = userSelections.cientista.some(item => item === 'marie') || 
                                      userSelections.area.some(item => item === 'quimica');
                temTodasInformacoes = userSelections.cientista.includes('marie') && 
                                     userSelections.area.includes('quimica');
            }
            else if (dica.texto.includes("trabalha na Física está ao lado do cientista que trabalha na Biologia")) {
                temSelecaoRelevante = userSelections.area.some(item => item === 'fisica') || 
                                      userSelections.area.some(item => item === 'biologia');
                temTodasInformacoes = userSelections.area.includes('fisica') && 
                                     userSelections.area.includes('biologia');
            }
            else if (dica.texto.includes("trabalha na Astronomia é o que desenvolveu a Lei da Gravidade")) {
                temSelecaoRelevante = userSelections.area.some(item => item === 'astronomia') || 
                                      userSelections.descoberta.some(item => item === 'gravidade');
                temTodasInformacoes = userSelections.area.includes('astronomia') && 
                                     userSelections.descoberta.includes('gravidade');
            }
            
            if (temSelecaoRelevante) {
                const correto = dica.validacao();
                adicionarIndicadorDica(itemDica, correto);
            }
        });
    }
    
    // Verificar células específicas
    function verificarCelulasEspecificas() {
        selectores.forEach(select => {
            const cell = select.closest('.select-cell');
            if (!cell) return;
            
            const house = parseInt(cell.dataset.house) - 1;
            const type = cell.dataset.type;
            const value = select.value;
            
            if (value) {
                // Verificar se a seleção está correta
                const correto = value === solucao[house][type];
                adicionarIndicadorResposta(cell, correto);
            }
        });
    }
    
    // Verificar completude
    function verificarCompletude() {
        const todasPreenchidas = Object.values(userSelections).every(arr => 
            arr.every(val => val !== '')
        );
        
        if (todasPreenchidas) {
            const todasCorretas = Object.keys(userSelections).every(type => 
                userSelections[type].every((val, i) => val === solucao[i][type])
            );
            
            if (todasCorretas) {
                exibirMensagem('Parabéns! Você resolveu o quebra-cabeça!', 'success');
                verificarBtn.classList.add('pulse');
            } else {
                exibirMensagem('Ops! Algumas respostas estão incorretas. Tente novamente!', 'error');
            }
        }
    }
    
    // Limpar indicadores de resposta
    function limparIndicadoresResposta() {
        document.querySelectorAll('.select-cell').forEach(cell => {
            cell.classList.remove('resposta-correta', 'resposta-errada', 'resposta-errada-pulsante', 'success');
            const indicador = cell.querySelector('.indicador-resposta');
            if (indicador) {
                indicador.remove();
            }
        });
        
        document.querySelectorAll('.clues li').forEach(item => {
            item.classList.remove('dica-correta', 'dica-errada');
            const indicador = item.querySelector('.dica-indicador');
            if (indicador) {
                indicador.remove();
            }
        });
        
        document.querySelectorAll('.house-title').forEach(title => {
            title.classList.remove('success');
        });
    }
    
    // Adicionar indicador de resposta
    function adicionarIndicadorResposta(cell, correto) {
        cell.classList.remove('resposta-correta', 'resposta-errada');
        cell.classList.add(correto ? 'resposta-correta' : 'resposta-errada');
        
        // Criar o indicador visual
        const indicador = document.createElement('span');
        indicador.className = 'indicador-resposta';
        indicador.textContent = correto ? '✓' : '✗';
        
        // Remover o indicador se existir
        let indicadorExistente = cell.querySelector('.indicador-resposta');
        if (indicadorExistente) {
            indicadorExistente.remove();
        }
        
        // Adicionar o novo indicador
        cell.appendChild(indicador);
    }
    
    // Adicionar indicador de dica
    function adicionarIndicadorDica(item, correto) {
        item.classList.remove('dica-correta', 'dica-errada');
        item.classList.add(correto ? 'dica-correta' : 'dica-errada');
        
        // Remover o indicador se existir
        let indicador = item.querySelector('.dica-indicador');
        if (indicador) {
            indicador.remove();
        }
        
        // Criar novo indicador
        const indicadorNovo = document.createElement('span');
        indicadorNovo.className = 'dica-indicador';
        indicadorNovo.textContent = correto ? ' ✓' : ' ✗';
        
        // Adicionar o indicador ao item
        item.appendChild(indicadorNovo);
    }
    
    // Exibir mensagem
    function exibirMensagem(texto, tipo) {
        mensagemEl.textContent = texto;
        mensagemEl.className = `message ${tipo}`;
        mensagemEl.style.display = texto ? 'block' : 'none';
        
        // Rolar até a mensagem se tiver texto
        if (texto) {
            mensagemEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    // Event Listeners
    selectores.forEach(select => {
        select.addEventListener('change', () => {
            atualizarSelecoes(select);
        });
    });
    
    verificarBtn.addEventListener('click', () => {
        // Verificar se todas as posições foram preenchidas
        const categorias = ['cientista', 'area', 'descoberta', 'epoca'];
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
        let totalItems = 4 * 4; // 4 cientistas com 4 atributos cada
        
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
            
            // Adicionar classe para títulos dos cientistas
            document.querySelectorAll('.house-title').forEach(title => {
                title.classList.add('success');
            });
        } else {
            const percentualAcerto = Math.round((totalAcertos / totalItems) * 100);
            exibirMensagem(`Resposta incompleta. Você acertou ${totalAcertos} de ${totalItems} itens (${percentualAcerto}%). Corrija os itens marcados e tente novamente!`, 'error');
        }
    });
    
    resetarBtn.addEventListener('click', () => {
        selectores.forEach(select => {
            select.value = '';
            
            // Re-habilitar todas as opções
            Array.from(select.options).forEach(option => {
                option.disabled = false;
            });
        });
        
        userSelections = {
            cientista: Array(4).fill(''),
            area: Array(4).fill(''),
            descoberta: Array(4).fill(''),
            epoca: Array(4).fill('')
        };
        
        limparIndicadoresResposta();
        document.querySelectorAll('.clues li').forEach(item => {
            item.classList.remove('dica-correta', 'dica-errada');
            const indicador = item.querySelector('.dica-indicador');
            if (indicador) {
                indicador.remove();
            }
        });
        
        exibirMensagem('', '');
        verificarBtn.classList.remove('pulse');
    });
    
    dicaBtn.addEventListener('click', () => {
        const dicasIncorretas = dicasSolucao.filter(dica => !dica.validacao());
        if (dicasIncorretas.length > 0) {
            const dicaAleatoria = dicasIncorretas[Math.floor(Math.random() * dicasIncorretas.length)];
            exibirMensagem(`Dica: ${dicaAleatoria.texto}`, 'hint');
        } else {
            exibirMensagem('Você já resolveu todas as dicas!', 'success');
        }
    });
}); 