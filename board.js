export class Board {
    constructor(parentElement) {
        this.parentElement = parentElement;
        this.cols = 9;
        this.rows = 9;
        this.createBoard();
        this.position = ['', '', '', '', '', '', '', '', ''];
        this.updateBoard();
    }

    createBoard() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const parentElement = document.createElement('div');
                const element = document.createElement('input');
                parentElement.classList.add('container-tiles');
                element.id = `${i}-${j}`;
                element.type = "number";
                element.min = 1;
                element.max = 9;
                element.classList.add('tiles');
                element.textContent = "1";
                element.style.backgroundColor = '#fff';
                element.addEventListener('change', () => { this.updateBoard(); });

                parentElement.appendChild(element);
                this.parentElement.appendChild(parentElement);
            }
        }

    }

    updateBoard() {
        this.position = ['', '', '', '', '', '', '', '', ''];
        let board = Array.from(this.parentElement.children);
        board.forEach(container => {
            let tile = container.firstChild;
            let tileId = tile.id;
            if (tile.value != '') this.position[tileId[0]] += `${tile.value}`;
            else if (tile.value === '') this.position[tileId[0]] += `-`;
        });
    }

    changeBoard(rowIndex, colIndex, number) {
        document.getElementById(`${colIndex}-${rowIndex}`).value = number
        this.updateBoard()
    }

    loadFEN(FEN) {
        // vider le current board
        this.cleanBoard()
        
        let signs = {
            '&': 1,
            'é': 2, 
            '"': 3,
            "'": 4,
            '(': 5,
            '-': 6,
            'è': 7,
            '_': 8,
            'ç': 9
        }

        let progress = '00'

        for (let i = 0; i < FEN.length; i++) {
            let actualProgressX = parseInt(progress[0])
            let actualProgressY = parseInt(progress[1])
            let newProgress = ''
            if (FEN[i] === '-') {
                this.changeBoard(progress[0], progress[1], signs[FEN[i]])
                newProgress += actualProgressX + 1
                newProgress += actualProgressY
                progress = newProgress
                
            } else if (/\d/.test(FEN[i])) {
                // numbers => blank
                newProgress += actualProgressX + parseInt(FEN[i])
                newProgress += actualProgressY
                progress = newProgress
            } else if (!/\d/.test(FEN[i])) {
                // string
                if (/['&', 'é', '"', "'", '(', '-', 'è', '_', 'ç']/.test(FEN[i])) {
                    // signs => numbers
                    this.changeBoard(progress[0], progress[1], signs[FEN[i]])
                    newProgress += actualProgressX + 1
                    newProgress += actualProgressY
                    progress = newProgress
                } else if (/['/']/.test(FEN[i])) {
                    // / => jumps of row
                    newProgress += 0
                    newProgress += actualProgressY + 1
                    progress = newProgress
                } else {
                
                    console.error('FEN incorrect')
                }
            } else {
                console.error('FEN incorrect')
            }
        }
    }

    cleanBoard() {
        let board = Array.from(this.parentElement.children);
        board.forEach(container => {
            let tile = container.firstChild
            tile.value = ''
        })
    }
}