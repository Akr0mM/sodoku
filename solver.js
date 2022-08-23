export function findSolution(values, board) {
    let position = {
        rows: values,
        cols: colFrom(values),
        blocks: blockFrom(values)
    };

    verify(position, board);
}

function colFrom(values) {
    let cols = ['', '', '', '', '', '', '', '', ''];
    values.forEach(row => {
        cols[0] += row[0] || '-';
        cols[1] += row[1] || '-';
        cols[2] += row[2] || '-';
        cols[3] += row[3] || '-';
        cols[4] += row[4] || '-';
        cols[5] += row[5] || '-';
        cols[6] += row[6] || '-';
        cols[7] += row[7] || '-';
        cols[8] += row[8] || '-';
    });
    return cols;
}

function blockFrom(rows) {
    let blocks = ['', '', '', '', '', '', '', '', ''];
    // block 1
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            blocks[0] += rows[i][j];
        }
    }
    // block 2
    for (let i = 0; i < 3; i++) {
        for (let j = 3; j < 6; j++) {
            blocks[1] += rows[i][j];
        }
    }
    // block 3
    for (let i = 0; i < 3; i++) {
        for (let j = 6; j < 9; j++) {
            blocks[2] += rows[i][j];
        }
    }
    // block 4
    for (let i = 3; i < 6; i++) {
        for (let j = 0; j < 3; j++) {
            blocks[3] += rows[i][j];
        }
    }
    // block 5
    for (let i = 3; i < 6; i++) {
        for (let j = 3; j < 6; j++) {
            blocks[4] += rows[i][j];
        }
    }
    // block 6
    for (let i = 3; i < 6; i++) {
        for (let j = 6; j < 9; j++) {
            blocks[5] += rows[i][j];
        }
    }
    // block 7
    for (let i = 6; i < 9; i++) {
        for (let j = 0; j < 3; j++) {
            blocks[6] += rows[i][j];
        }
    }
    // block 8
    for (let i = 6; i < 9; i++) {
        for (let j = 3; j < 6; j++) {
            blocks[7] += rows[i][j];
        }
    }
    // block 9
    for (let i = 6; i < 9; i++) {
        for (let j = 6; j < 9; j++) {
            blocks[8] += rows[i][j];
        }
    }

    return blocks;
}

function verify(position) {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // verifing blocks
    position.blocks.forEach(block => {
        let count = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < 9; i++) {
            count[block[i] - 1] += 1;
        }
        count.forEach(number => {
            if (number >= 2) {
                console.error('erreur au block ' + (position.blocks.indexOf(block) + 1));
            }
        });
    });

    // verifing rows
    position.rows.forEach(row => {
        let count = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < 9; i++) {
            count[row[i] - 1] += 1;
        }
        count.forEach(number => {
            if (number >= 2) {
                console.error('erreur a la ligne ' + (position.rows.indexOf(row) + 1));
            }
        });
    });

    // verifing cols
    position.cols.forEach(col => {
        let count = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < 9; i++) {
            count[col[i] - 1] += 1;
        }
        count.forEach(number => {
            if (number >= 2) {
                console.error('erreur a la colonne ' + (position.cols.indexOf(col) + 1));
            }
        });
    });

    // verify numbers 
    let boardTiles = Array.from(board.children);
    boardTiles.forEach(tileContainer => {
        let tile = tileContainer.firstChild
        if (parseInt(tile.value) < 1 || parseInt(tile.value) > 9) {
            console.error(`Nombre incorrect en ${tile.id[2] + 1}-${tile.id[0] + 1}`)
        }
    })
}