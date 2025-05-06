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
        { estilo: 'italiano', chef: 'joao', prato: 'pizza', bebida: 'vinho' },
        { estilo: 'japones', chef: 'ana', prato: 'sushi', bebida: 'sake' },
        { estilo: 'mexicano', chef: 'pedro', prato: 'taco', bebida: 'tequila' },
        { estilo: 'brasileiro', chef: 'maria', prato: 'feijoada', bebida: 'caipirinha' }
    ];
    
    // Mapeamento das dicas para as soluções
    const dicasSolucao = [
        { 
            texto: "O restaurante Italiano serve Pizza.", 
            validacao: () => {
                for (let i = 0; i < 4; i++) {
                    if (userSelections.estilo[i] === 'italiano' && userSelections.prato[i] === 'pizza') {
                        return true;
                    }
                }
                return false;
            }
        },
        { 
            texto: "O restaurante Japonês está ao lado do restaurante Mexicano.", 
            validacao: () => {
                let japonesIndex = -1;
                let mexicanoIndex = -1;
                
                for (let i = 0; i < 4; i++) {
                    if (userSelections.estilo[i] === 'japones') japonesIndex = i;
                    if (userSelections.estilo[i] === 'mexicano') mexicanoIndex = i;
                }
                
                if (japonesIndex !== -1 && mexicanoIndex !== -1) {
                    return Math.abs(japonesIndex - mexicanoIndex) === 1;
                }
                
                return false;
            }
        },
        { 
            texto: "O restaurante Brasileiro serve Caipirinha.", 
            validacao: () => {
                for (let i = 0; i < 4; i++) {
                    if (userSelections.estilo[i] === 'brasileiro' && userSelections.bebida[i] === 'caipirinha') {
                        return true;
                    }
                }
                return false;
            }
        },
        { 
            texto: "O restaurante que serve Sushi está exatamente à esquerda do restaurante que serve Taco.", 
            validacao: () => {
                let sushiIndex = -1;
                let tacoIndex = -1;
                
                for (let i = 0; i < 4; i++) {
                    if (userSelections.prato[i] === 'sushi') sushiIndex = i;
                    if (userSelections.prato[i] === 'taco') tacoIndex = i;
                }
                
                if (sushiIndex !== -1 && tacoIndex !== -1) {
                    return sushiIndex + 1 === tacoIndex;
                }
                
                return false;
            }
        },
        { 
            texto: "O chef João trabalha no restaurante Italiano.", 
            validacao: () => {
                for (let i = 0; i < 4; i++) {
                    if (userSelections.chef[i] === 'joao' && userSelections.estilo[i] === 'italiano') {
                        return true;
                    }
                }
                return false;
            }
        },
        { 
            texto: "O chef Maria está entre o chef Ana e o chef Pedro, nessa ordem.", 
            validacao: () => {
                let mariaIndex = -1;
                let anaIndex = -1;
                let pedroIndex = -1;
                
                for (let i = 0; i < 4; i++) {
                    if (userSelections.chef[i] === 'maria') mariaIndex = i;
                    if (userSelections.chef[i] === 'ana') anaIndex = i;
                    if (userSelections.chef[i] === 'pedro') pedroIndex = i;
                }
                
                if (mariaIndex !== -1 && anaIndex !== -1 && pedroIndex !== -1) {
                    return anaIndex < mariaIndex && mariaIndex < pedroIndex;
                }
                
                return false;
            }
        },
        { 
            texto: "O chef Pedro está entre o chef João e o chef Maria, nessa ordem.", 
            validacao: () => {
                let pedroIndex = -1;
                let joaoIndex = -1;
                let mariaIndex = -1;
                
                for (let i = 0; i < 4; i++) {
                    if (userSelections.chef[i] === 'pedro') pedroIndex = i;
                    if (userSelections.chef[i] === 'joao') joaoIndex = i;
                    if (userSelections.chef[i] === 'maria') mariaIndex = i;
                }
                
                if (pedroIndex !== -1 && joaoIndex !== -1 && mariaIndex !== -1) {
                    return joaoIndex < pedroIndex && pedroIndex < mariaIndex;
                }
                
                return false;
            }
        },
        { 
            texto: "A chef Ana trabalha no restaurante Japonês.", 
            validacao: () => {
                for (let i = 0; i < 4; i++) {
                    if (userSelections.chef[i] === 'ana' && userSelections.estilo[i] === 'japones') {
                        return true;
                    }
                }
                return false;
            }
        },
        { 
            texto: "O restaurante que serve Vinho está ao lado do restaurante que serve Sake.", 
            validacao: () => {
                let vinhoIndex = -1;
                let sakeIndex = -1;
                
                for (let i = 0; i < 4; i++) {
                    if (userSelections.bebida[i] === 'vinho') vinhoIndex = i;
                    if (userSelections.bebida[i] === 'sake') sakeIndex = i;
                }
                
                if (vinhoIndex !== -1 && sakeIndex !== -1) {
                    return Math.abs(vinhoIndex - sakeIndex) === 1;
                }
                
                return false;
            }
        },
        { 
            texto: "O restaurante que serve Tequila é o Mexicano.", 
            validacao: () => {
                for (let i = 0; i < 4; i++) {
                    if (userSelections.bebida[i] === 'tequila' && userSelections.estilo[i] === 'mexicano') {
                        return true;
                    }
                }
                return false;
            }
        }
    ];
    
    // Armazena as seleções do usuário
    let userSelections = {
        estilo: Array(4).fill(''),
        chef: Array(4).fill(''),
        prato: Array(4).fill(''),
        bebida: Array(4).fill('')
    };
    
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
            
            if (dica.texto.includes("O restaurante Italiano serve Pizza")) {
                temSelecaoRelevante = userSelections.estilo.some(item => item === 'italiano') || 
                                      userSelections.prato.some(item => item === 'pizza');
                temTodasInformacoes = userSelections.estilo.includes('italiano') && 
                                     userSelections.prato.includes('pizza');
            }
            else if (dica.texto.includes("O restaurante Japonês está ao lado do restaurante Mexicano")) {
                temSelecaoRelevante = userSelections.estilo.some(item => item === 'japones') || 
                                      userSelections.estilo.some(item => item === 'mexicano');
                temTodasInformacoes = userSelections.estilo.includes('japones') && 
                                     userSelections.estilo.includes('mexicano');
            }
            else if (dica.texto.includes("O restaurante Brasileiro serve Caipirinha")) {
                temSelecaoRelevante = userSelections.estilo.some(item => item === 'brasileiro') || 
                                      userSelections.bebida.some(item => item === 'caipirinha');
                temTodasInformacoes = userSelections.estilo.includes('brasileiro') && 
                                     userSelections.bebida.includes('caipirinha');
            }
            else if (dica.texto.includes("O restaurante que serve Sushi está exatamente à esquerda")) {
                temSelecaoRelevante = userSelections.prato.some(item => item === 'sushi') || 
                                      userSelections.prato.some(item => item === 'taco');
                temTodasInformacoes = userSelections.prato.includes('sushi') && 
                                     userSelections.prato.includes('taco');
            }
            else if (dica.texto.includes("O chef João trabalha no restaurante Italiano")) {
                temSelecaoRelevante = userSelections.chef.some(item => item === 'joao') || 
                                      userSelections.estilo.some(item => item === 'italiano');
                temTodasInformacoes = userSelections.chef.includes('joao') && 
                                     userSelections.estilo.includes('italiano');
            }
            else if (dica.texto.includes("O chef Maria está entre o chef Ana e o chef Pedro")) {
                temSelecaoRelevante = userSelections.chef.some(item => item === 'maria') || 
                                      userSelections.chef.some(item => item === 'ana') ||
                                      userSelections.chef.some(item => item === 'pedro');
                temTodasInformacoes = userSelections.chef.includes('maria') && 
                                     userSelections.chef.includes('ana') &&
                                     userSelections.chef.includes('pedro');
            }
            else if (dica.texto.includes("O chef Pedro está entre o chef João e o chef Maria")) {
                temSelecaoRelevante = userSelections.chef.some(item => item === 'pedro') || 
                                      userSelections.chef.some(item => item === 'joao') ||
                                      userSelections.chef.some(item => item === 'maria');
                temTodasInformacoes = userSelections.chef.includes('pedro') && 
                                     userSelections.chef.includes('joao') &&
                                     userSelections.chef.includes('maria');
            }
            else if (dica.texto.includes("A chef Ana trabalha no restaurante Japonês")) {
                temSelecaoRelevante = userSelections.chef.some(item => item === 'ana') || 
                                      userSelections.estilo.some(item => item === 'japones');
                temTodasInformacoes = userSelections.chef.includes('ana') && 
                                     userSelections.estilo.includes('japones');
            }
            else if (dica.texto.includes("O restaurante que serve Vinho está ao lado do restaurante que serve Sake")) {
                temSelecaoRelevante = userSelections.bebida.some(item => item === 'vinho') || 
                                      userSelections.bebida.some(item => item === 'sake');
                temTodasInformacoes = userSelections.bebida.includes('vinho') && 
                                     userSelections.bebida.includes('sake');
            }
            else if (dica.texto.includes("O restaurante que serve Tequila é o Mexicano")) {
                temSelecaoRelevante = userSelections.bebida.some(item => item === 'tequila') || 
                                      userSelections.estilo.some(item => item === 'mexicano');
                temTodasInformacoes = userSelections.bebida.includes('tequila') && 
                                     userSelections.estilo.includes('mexicano');
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
                userSelections[type][house] = value;
                
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
        select.addEventListener('change', (e) => {
            // Extrair a categoria e o índice do ID do select
            if (select.id) {
                const [categoria, indice] = select.id.split('-');
                const valor = select.value;
                const casaIndice = parseInt(indice) - 1;
                
                // Armazenar a seleção do usuário
                userSelections[categoria][casaIndice] = valor;
                
                // Desabilitar a opção selecionada em outros selects da mesma categoria
                document.querySelectorAll(`select.${categoria}`).forEach((otherSelect) => {
                    if (otherSelect !== select) {
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
            }
            
            verificarCelulasEspecificas();
            verificarDicas();
            verificarCompletude();
        });
    });
    
    // Botão de verificação
    verificarBtn.addEventListener('click', () => {
        // Verificar se todas as posições foram preenchidas
        const categorias = ['estilo', 'chef', 'prato', 'bebida'];
        const faltandoSelecoes = categorias.some(categoria => 
            userSelections[categoria].some(valor => valor === '')
        );
        
        if (faltandoSelecoes) {
            exibirMensagem('Preencha todas as opções antes de verificar!', 'error');
            mensagemEl.style.display = 'block';
            return;
        }
        
        // Limpar quaisquer indicadores anteriores
        limparIndicadoresResposta();
        
        // Verificar cada resposta individualmente e adicionar indicadores
        let totalAcertos = 0;
        let totalItems = 4 * 4; // 4 restaurantes com 4 atributos cada
        
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
            mensagemEl.style.display = 'block';
            
            // Adicionar efeito visual de sucesso
            document.querySelectorAll('.select-cell').forEach(cell => {
                cell.classList.add('success');
            });
            
            // Adicionar classe para títulos dos restaurantes
            document.querySelectorAll('.house-title').forEach(title => {
                title.classList.add('success');
            });
        } else {
            const percentualAcerto = Math.round((totalAcertos / totalItems) * 100);
            exibirMensagem(`Resposta incompleta. Você acertou ${totalAcertos} de ${totalItems} itens (${percentualAcerto}%). Corrija os itens marcados e tente novamente!`, 'error');
            mensagemEl.style.display = 'block';
        }
    });
    
    resetarBtn.addEventListener('click', () => {
        // Resetar todas as seleções
        selectores.forEach(select => {
            select.selectedIndex = 0;
            
            Array.from(select.options).forEach(option => {
                option.disabled = false;
            });
        });
        
        // Resetar o objeto de seleções do usuário
        userSelections = {
            estilo: Array(4).fill(''),
            chef: Array(4).fill(''),
            prato: Array(4).fill(''),
            bebida: Array(4).fill('')
        };
        
        // Limpar a mensagem
        mensagemEl.style.display = 'none';
        mensagemEl.textContent = '';
        mensagemEl.className = 'message';
        
        // Limpar indicadores de resposta
        limparIndicadoresResposta();
        
        // Remover efeitos de destaque e sucesso
        document.querySelectorAll('.select-cell').forEach(cell => {
            cell.classList.remove('highlight', 'success', 'resposta-errada-pulsante', 'dica-importante', 'resposta-correta', 'resposta-errada');
        });
        
        document.querySelectorAll('.house-title').forEach(title => {
            title.classList.remove('success');
        });
        
        verificarBtn.classList.remove('pulse');
        
        exibirMensagem('Jogo reiniciado! Tente novamente.', 'hint');
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