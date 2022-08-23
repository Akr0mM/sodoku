import { Board } from './board.js';
import { findSolution } from './solver.js';



const btnSolution = document.getElementById('find-solution-btn');
const btnImportFEN = document.getElementById('import-fen-btn');
let importFENIsOpen = false;
let board;



window.onload = function main() {
    board = new Board(document.getElementById('board'));
    btnSolution.addEventListener('click', () => { findSolution(board.position, board); });
    btnImportFEN.addEventListener('click', () => { importFEN(btnImportFEN); });
};


function importFEN(parent) {
    if (!importFENIsOpen) {
        const target = parent.parentElement;
        const parentElement = document.createElement('div');
        parentElement.style = 'display: flex;';
        parentElement.id = 'container-import-fen'
        const inputFEN = document.createElement('input');
        inputFEN.type = 'text';
        inputFEN.placeholder = '3(2ç2/6\'2/1è3é3/6é2/3-5/1é4_2/1&7/1(1`\'4è/6-2';
        inputFEN.style = 'height: min-content;';
        const btnLoadFEN = document.createElement('button');
        btnLoadFEN.textContent = 'load FEN';
        btnLoadFEN.style = 'width: max-content; margin-left: 10px';
        btnLoadFEN.addEventListener('click', () => { board.loadFEN(inputFEN.value) });

        document.getElementById('import-fen-btn').textContent = 'X'

        parentElement.appendChild(inputFEN);
        parentElement.appendChild(btnLoadFEN);
        target.append(parentElement);
        importFENIsOpen = true
    } else if (importFENIsOpen) {
        document.getElementById('import-fen-btn').textContent = 'Import a FEN'
        document.getElementById('container-import-fen').remove()
        importFENIsOpen = false
    }

}
