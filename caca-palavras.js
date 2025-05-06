document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const grid = document.getElementById('grid');
    const wordList = document.getElementById('word-list');
    const newGameBtn = document.getElementById('new-game-btn');
    const hintBtn = document.getElementById('dica');
    const messageEl = document.getElementById('mensagem');
    const timerEl = document.getElementById('timer');
    
    // Variáveis do jogo
    let words = [];
    let board = [];
    let foundWords = [];
    let startCell = null;
    let currentCells = [];
    let timerInterval;
    let secondsElapsed = 0;
    
    // Lista de palavras por tema
    const wordThemes = {
        animais: ['CACHORRO', 'GATO', 'ELEFANTE', 'GIRAFA', 'LEAO', 'TIGRE', 'ZEBRA', 'MACACO', 'COELHO', 'COBRA'],
        frutas: ['BANANA', 'MACA', 'LARANJA', 'ABACAXI', 'UVA', 'MELANCIA', 'MORANGO', 'PERA', 'KIWI', 'MANGA'],
        paises: ['BRASIL', 'PORTUGAL', 'FRANCA', 'ESPANHA', 'ITALIA', 'ALEMANHA', 'JAPAO', 'CHINA', 'CANADA', 'MEXICO'],
        esportes: ['FUTEBOL', 'VOLEI', 'BASQUETE', 'NATACAO', 'TENIS', 'CICLISMO', 'SKATE', 'SURF', 'JUDO', 'BOXE']
    };
    
    // Tamanho do tabuleiro
    const ROWS = 15;
    const COLS = 15;
    
    // Direções para inserir palavras (horizontal, vertical, diagonal)
    const directions = [
        [0, 1],   // horizontal →
        [1, 0],   // vertical ↓
        [1, 1],   // diagonal ↘
        [1, -1],  // diagonal ↙
        [0, -1],  // horizontal ←
        [-1, 0],  // vertical ↑
        [-1, -1], // diagonal ↖
        [-1, 1]   // diagonal ↗
    ];
    
    // Iniciar novo jogo
    function startNewGame() {
        // Resetar variáveis
        board = [];
        foundWords = [];
        startCell = null;
        currentCells = [];
        resetTimer();
        
        // Escolher tema aleatório
        const themes = Object.keys(wordThemes);
        const theme = themes[Math.floor(Math.random() * themes.length)];
        words = [...wordThemes[theme]];
        
        // Atualizar indicador de tema
        document.querySelector('.game-level-indicator span').textContent = `Tema: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`;
        
        // Criar tabuleiro vazio
        for (let i = 0; i < ROWS; i++) {
            board[i] = [];
            for (let j = 0; j < COLS; j++) {
                board[i][j] = '';
            }
        }
        
        // Inserir palavras no tabuleiro
        for (const word of words) {
            let placed = false;
            let attempts = 0;
            
            // Tentar posicionar a palavra até 100 tentativas
            while (!placed && attempts < 100) {
                attempts++;
                
                // Escolher direção aleatória
                const dirIndex = Math.floor(Math.random() * directions.length);
                const [dx, dy] = directions[dirIndex];
                
                // Escolher posição inicial aleatória
                const row = Math.floor(Math.random() * ROWS);
                const col = Math.floor(Math.random() * COLS);
                
                // Verificar se a palavra cabe na direção escolhida
                if (canPlaceWord(word, row, col, dx, dy)) {
                    placeWord(word, row, col, dx, dy);
                    placed = true;
                }
            }
        }
        
        // Preencher espaços vazios com letras aleatórias
        fillEmptySpaces();
        
        // Renderizar tabuleiro e lista de palavras
        renderBoard();
        renderWordList();
        
        // Iniciar timer
        startTimer();
    }
    
    // Verificar se uma palavra pode ser colocada em determinada posição
    function canPlaceWord(word, row, col, dx, dy) {
        const wordLength = word.length;
        
        for (let i = 0; i < wordLength; i++) {
            const newRow = row + i * dx;
            const newCol = col + i * dy;
            
            // Verificar se está dentro dos limites do tabuleiro
            if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS) {
                return false;
            }
            
            // Verificar se a célula está vazia ou tem a mesma letra
            if (board[newRow][newCol] !== '' && board[newRow][newCol] !== word[i]) {
                return false;
            }
        }
        
        return true;
    }
    
    // Colocar palavra no tabuleiro
    function placeWord(word, row, col, dx, dy) {
        const wordLength = word.length;
        
        for (let i = 0; i < wordLength; i++) {
            const newRow = row + i * dx;
            const newCol = col + i * dy;
            board[newRow][newCol] = word[i];
        }
    }
    
    // Preencher espaços vazios com letras aleatórias
    function fillEmptySpaces() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                if (board[i][j] === '') {
                    const randomIndex = Math.floor(Math.random() * letters.length);
                    board[i][j] = letters[randomIndex];
                }
            }
        }
    }
    
    // Renderizar tabuleiro
    function renderBoard() {
        grid.innerHTML = '';
        
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                const cell = document.createElement('div');
                cell.classList.add('grid-cell');
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.textContent = board[i][j];
                
                // Adicionar eventos
                cell.addEventListener('mousedown', handleCellMouseDown);
                cell.addEventListener('mouseenter', handleCellMouseEnter);
                
                grid.appendChild(cell);
            }
        }
        
        // Adicionar evento para finalizar seleção
        document.addEventListener('mouseup', handleDocumentMouseUp);
    }
    
    // Renderizar lista de palavras
    function renderWordList() {
        wordList.innerHTML = '';
        
        for (const word of words) {
            const wordItem = document.createElement('div');
            wordItem.classList.add('word-item');
            wordItem.dataset.word = word;
            wordItem.textContent = word;
            
            if (foundWords.includes(word)) {
                wordItem.classList.add('found');
            }
            
            wordList.appendChild(wordItem);
        }
    }
    
    // Eventos de mouse
    function handleCellMouseDown(e) {
        startCell = {
            row: parseInt(e.target.dataset.row),
            col: parseInt(e.target.dataset.col)
        };
        
        currentCells = [e.target];
        e.target.classList.add('selected');
    }
    
    function handleCellMouseEnter(e) {
        if (!startCell) return;
        
        const currentRow = parseInt(e.target.dataset.row);
        const currentCol = parseInt(e.target.dataset.col);
        const startRow = startCell.row;
        const startCol = startCell.col;
        
        // Verificar se a seleção é em linha reta (horizontal, vertical ou diagonal)
        const rowDiff = currentRow - startRow;
        const colDiff = currentCol - startCol;
        
        // Verificar se é uma linha reta
        if (rowDiff === 0 || colDiff === 0 || Math.abs(rowDiff) === Math.abs(colDiff)) {
            // Limpar seleção anterior
            currentCells.forEach(cell => cell.classList.remove('selected'));
            currentCells = [];
            
            // Calcular direção
            const dx = rowDiff === 0 ? 0 : rowDiff > 0 ? 1 : -1;
            const dy = colDiff === 0 ? 0 : colDiff > 0 ? 1 : -1;
            
            // Selecionar células na linha reta
            const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
            for (let i = 0; i <= steps; i++) {
                const row = startRow + i * dx;
                const col = startCol + i * dy;
                const cell = document.querySelector(`.grid-cell[data-row="${row}"][data-col="${col}"]`);
                if (cell) {
                    cell.classList.add('selected');
                    currentCells.push(cell);
                }
            }
        }
    }
    
    function handleDocumentMouseUp() {
        if (!currentCells.length) return;
        
        // Obter palavra selecionada
        const selectedWord = currentCells.map(cell => cell.textContent).join('');
        
        // Verificar se a palavra está na lista e ainda não foi encontrada
        if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
            foundWords.push(selectedWord);
            
            // Marcar células como encontradas
            currentCells.forEach(cell => {
                cell.classList.remove('selected');
                cell.classList.add('found');
            });
            
            // Atualizar lista de palavras
            const wordItem = document.querySelector(`.word-item[data-word="${selectedWord}"]`);
            if (wordItem) {
                wordItem.classList.add('found');
            }
            
            // Verificar se todas as palavras foram encontradas
            if (foundWords.length === words.length) {
                clearInterval(timerInterval);
                showMessage('Parabéns! Você encontrou todas as palavras!', 'success');
            } else {
                showMessage(`Você encontrou a palavra "${selectedWord}"!`, 'success');
            }
        } else if (words.includes(selectedWord) && foundWords.includes(selectedWord)) {
            showMessage('Essa palavra já foi encontrada!', 'error');
        }
        
        // Limpar seleção
        currentCells.forEach(cell => cell.classList.remove('selected'));
        currentCells = [];
        startCell = null;
    }
    
    // Mostrar mensagem
    function showMessage(text, type) {
        messageEl.textContent = text;
        messageEl.className = 'message ' + type;
        
        setTimeout(() => {
            messageEl.className = 'message';
        }, 3000);
    }
    
    // Timer
    function startTimer() {
        secondsElapsed = 0;
        updateTimerDisplay();
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            secondsElapsed++;
            updateTimerDisplay();
        }, 1000);
    }
    
    function resetTimer() {
        clearInterval(timerInterval);
        secondsElapsed = 0;
        updateTimerDisplay();
    }
    
    function updateTimerDisplay() {
        const minutes = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
        const seconds = (secondsElapsed % 60).toString().padStart(2, '0');
        timerEl.textContent = `${minutes}:${seconds}`;
    }
    
    // Função de dica
    function giveHint() {
        // Encontrar palavras não descobertas
        const remainingWords = words.filter(word => !foundWords.includes(word));
        
        if (remainingWords.length === 0) {
            showMessage('Você já encontrou todas as palavras!', 'hint');
            return;
        }
        
        // Escolher uma palavra aleatória
        const randomWord = remainingWords[Math.floor(Math.random() * remainingWords.length)];
        
        // Destacar a primeira letra da palavra no tabuleiro
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                for (const [dx, dy] of directions) {
                    if (canPlaceWord(randomWord, i, j, dx, dy) && board[i][j] === randomWord[0]) {
                        // Verificar se esta é realmente a posição da palavra
                        let isMatch = true;
                        for (let k = 0; k < randomWord.length; k++) {
                            const newRow = i + k * dx;
                            const newCol = j + k * dy;
                            if (board[newRow][newCol] !== randomWord[k]) {
                                isMatch = false;
                                break;
                            }
                        }
                        
                        if (isMatch) {
                            // Destacar a primeira letra
                            const cell = document.querySelector(`.grid-cell[data-row="${i}"][data-col="${j}"]`);
                            if (cell) {
                                cell.classList.add('selected');
                                setTimeout(() => {
                                    cell.classList.remove('selected');
                                }, 2000);
                            }
                            
                            showMessage(`Dica: Procure a palavra "${randomWord}" começando pela letra destacada`, 'hint');
                            return;
                        }
                    }
                }
            }
        }
    }
    
    // Event listeners
    newGameBtn.addEventListener('click', startNewGame);
    hintBtn.addEventListener('click', giveHint);
    
    // Iniciar jogo ao carregar a página
    startNewGame();
}); 