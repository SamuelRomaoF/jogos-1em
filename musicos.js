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
        { musico: 'joao', instrumento: 'guitarra', estilo: 'rock', banda: 'banda1' },
        { musico: 'pedro', instrumento: 'bateria', estilo: 'jazz', banda: 'banda2' },
        { musico: 'maria', instrumento: 'teclado', estilo: 'samba', banda: 'banda3' },
        { musico: 'ana', instrumento: 'baixo', estilo: 'blues', banda: 'banda4' }
    ];
    
    // Mapeamento das dicas para as soluções
    const dicasSolucao = [
        { 
            texto: "O músico que toca Guitarra está na Banda 1.", 
            validacao: () => {
                for (let i = 0; i < 4; i++) {
                    if (userSelections.instrumento[i] === 'guitarra' && userSelections.banda[i] === 'banda1') {
                        return true;
                    }
                }
                return false;
            }
        },
        { 
            texto: "O músico que toca Bateria está ao lado do músico que toca Baixo.", 
            validacao: () => {
                let bateriaIndex = -1;
                let baixoIndex = -1;
                
                for (let i = 0; i < 4; i++) {
                    if (userSelections.instrumento[i] === 'bateria') bateriaIndex = i;
                    if (userSelections.instrumento[i] === 'baixo') baixoIndex = i;
                }
                
                if (bateriaIndex !== -1 && baixoIndex !== -1) {
                    return Math.abs(bateriaIndex - baixoIndex) === 1;
                }
                
                return false;
            }
        },
        { 
            texto: "O músico que toca Teclado está na Banda 3.", 
            validacao: () => {
                for (let i = 0; i < 4; i++) {
                    if (userSelections.instrumento[i] === 'teclado' && userSelections.banda[i] === 'banda3') {
                        return true;
                    }
                }
                return false;
            }
        },
        { 
            texto: "O músico que toca Guitarra está exatamente à esquerda do músico que toca Bateria.", 
            validacao: () => {
                let guitarraIndex = -1;
                let bateriaIndex = -1;
                
                for (let i = 0; i < 4; i++) {
                    if (userSelections.instrumento[i] === 'guitarra') guitarraIndex = i;
                    if (userSelections.instrumento[i] === 'bateria') bateriaIndex = i;
                }
                
                if (guitarraIndex !== -1 && bateriaIndex !== -1) {
                    return guitarraIndex + 1 === bateriaIndex;
                }
                
                return false;
            }
        },
        { 
            texto: "O músico João toca Guitarra.", 
            validacao: () => {
                for (let i = 0; i < 4; i++) {
                    if (userSelections.musico[i] === 'joao' && userSelections.instrumento[i] === 'guitarra') {
                        return true;
                    }
                }
                return false;
            }
        },
        { 
            texto: "O músico Maria está entre o músico Pedro e o músico Ana, nessa ordem.", 
            validacao: () => {
                let mariaIndex = -1;
                let pedroIndex = -1;
                let anaIndex = -1;
                
                for (let i = 0; i < 4; i++) {
                    if (userSelections.musico[i] === 'maria') mariaIndex = i;
                    if (userSelections.musico[i] === 'pedro') pedroIndex = i;
                    if (userSelections.musico[i] === 'ana') anaIndex = i;
                }
                
                if (mariaIndex !== -1 && pedroIndex !== -1 && anaIndex !== -1) {
                    return pedroIndex < mariaIndex && mariaIndex < anaIndex;
                }
                
                return false;
            }
        },
        { 
            texto: "O músico Pedro está entre o músico João e o músico Maria, nessa ordem.", 
            validacao: () => {
                let pedroIndex = -1;
                let joaoIndex = -1;
                let mariaIndex = -1;
                
                for (let i = 0; i < 4; i++) {
                    if (userSelections.musico[i] === 'pedro') pedroIndex = i;
                    if (userSelections.musico[i] === 'joao') joaoIndex = i;
                    if (userSelections.musico[i] === 'maria') mariaIndex = i;
                }
                
                if (pedroIndex !== -1 && joaoIndex !== -1 && mariaIndex !== -1) {
                    return joaoIndex < pedroIndex && pedroIndex < mariaIndex;
                }
                
                return false;
            }
        },
        { 
            texto: "A música Ana toca Teclado.", 
            validacao: () => {
                for (let i = 0; i < 4; i++) {
                    if (userSelections.musico[i] === 'ana' && userSelections.instrumento[i] === 'teclado') {
                        return true;
                    }
                }
                return false;
            }
        },
        { 
            texto: "O músico que toca na Banda 1 está ao lado do músico que toca na Banda 2.", 
            validacao: () => {
                let banda1Index = -1;
                let banda2Index = -1;
                
                for (let i = 0; i < 4; i++) {
                    if (userSelections.banda[i] === 'banda1') banda1Index = i;
                    if (userSelections.banda[i] === 'banda2') banda2Index = i;
                }
                
                if (banda1Index !== -1 && banda2Index !== -1) {
                    return Math.abs(banda1Index - banda2Index) === 1;
                }
                
                return false;
            }
        },
        { 
            texto: "O músico que toca na Banda 4 é o que toca Baixo.", 
            validacao: () => {
                for (let i = 0; i < 4; i++) {
                    if (userSelections.banda[i] === 'banda4' && userSelections.instrumento[i] === 'baixo') {
                        return true;
                    }
                }
                return false;
            }
        }
    ];
    
    // Armazena as seleções do usuário
    let userSelections = {
        musico: Array(4).fill(''),
        instrumento: Array(4).fill(''),
        estilo: Array(4).fill(''),
        banda: Array(4).fill('')
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
            
            if (dica.texto.includes("O músico que toca Guitarra está na Banda 1")) {
                temSelecaoRelevante = userSelections.instrumento.some(item => item === 'guitarra') || 
                                      userSelections.banda.some(item => item === 'banda1');
                temTodasInformacoes = userSelections.instrumento.includes('guitarra') && 
                                     userSelections.banda.includes('banda1');
            }
            else if (dica.texto.includes("O músico que toca Bateria está ao lado do músico que toca Baixo")) {
                temSelecaoRelevante = userSelections.instrumento.some(item => item === 'bateria') || 
                                      userSelections.instrumento.some(item => item === 'baixo');
                temTodasInformacoes = userSelections.instrumento.includes('bateria') && 
                                     userSelections.instrumento.includes('baixo');
            }
            else if (dica.texto.includes("O músico que toca Teclado está na Banda 3")) {
                temSelecaoRelevante = userSelections.instrumento.some(item => item === 'teclado') || 
                                      userSelections.banda.some(item => item === 'banda3');
                temTodasInformacoes = userSelections.instrumento.includes('teclado') && 
                                     userSelections.banda.includes('banda3');
            }
            else if (dica.texto.includes("O músico que toca Guitarra está exatamente à esquerda")) {
                temSelecaoRelevante = userSelections.instrumento.some(item => item === 'guitarra') || 
                                      userSelections.instrumento.some(item => item === 'bateria');
                temTodasInformacoes = userSelections.instrumento.includes('guitarra') && 
                                     userSelections.instrumento.includes('bateria');
            }
            else if (dica.texto.includes("O músico João toca Guitarra")) {
                temSelecaoRelevante = userSelections.musico.some(item => item === 'joao') || 
                                      userSelections.instrumento.some(item => item === 'guitarra');
                temTodasInformacoes = userSelections.musico.includes('joao') && 
                                     userSelections.instrumento.includes('guitarra');
            }
            else if (dica.texto.includes("O músico Maria está entre o músico Pedro e o músico Ana")) {
                temSelecaoRelevante = userSelections.musico.some(item => item === 'maria') || 
                                      userSelections.musico.some(item => item === 'pedro') ||
                                      userSelections.musico.some(item => item === 'ana');
                temTodasInformacoes = userSelections.musico.includes('maria') && 
                                     userSelections.musico.includes('pedro') &&
                                     userSelections.musico.includes('ana');
            }
            else if (dica.texto.includes("O músico Pedro está entre o músico João e o músico Maria")) {
                temSelecaoRelevante = userSelections.musico.some(item => item === 'pedro') || 
                                      userSelections.musico.some(item => item === 'joao') ||
                                      userSelections.musico.some(item => item === 'maria');
                temTodasInformacoes = userSelections.musico.includes('pedro') && 
                                     userSelections.musico.includes('joao') &&
                                     userSelections.musico.includes('maria');
            }
            else if (dica.texto.includes("A música Ana toca Teclado")) {
                temSelecaoRelevante = userSelections.musico.some(item => item === 'ana') || 
                                      userSelections.instrumento.some(item => item === 'teclado');
                temTodasInformacoes = userSelections.musico.includes('ana') && 
                                     userSelections.instrumento.includes('teclado');
            }
            else if (dica.texto.includes("O músico que toca na Banda 1 está ao lado do músico que toca na Banda 2")) {
                temSelecaoRelevante = userSelections.banda.some(item => item === 'banda1') || 
                                      userSelections.banda.some(item => item === 'banda2');
                temTodasInformacoes = userSelections.banda.includes('banda1') && 
                                     userSelections.banda.includes('banda2');
            }
            else if (dica.texto.includes("O músico que toca na Banda 4 é o que toca Baixo")) {
                temSelecaoRelevante = userSelections.banda.some(item => item === 'banda4') || 
                                      userSelections.instrumento.some(item => item === 'baixo');
                temTodasInformacoes = userSelections.banda.includes('banda4') && 
                                     userSelections.instrumento.includes('baixo');
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
        const categorias = ['musico', 'instrumento', 'estilo', 'banda'];
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
        let totalItems = 4 * 4; // 4 músicos com 4 atributos cada
        
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
            
            // Adicionar classe para títulos dos músicos
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
            musico: Array(4).fill(''),
            instrumento: Array(4).fill(''),
            estilo: Array(4).fill(''),
            banda: Array(4).fill('')
        };
        
        limparIndicadoresResposta();
        document.querySelectorAll('.clues li').forEach(item => {
            item.classList.remove('correct', 'incorrect');
            const indicador = item.querySelector('.indicator');
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