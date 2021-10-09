// Dados iniciais
let areas = { a: null, b: null, c: null };

// Eventos
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

document.querySelectorAll('.area').forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('dragleave', dragLeave);
    item.addEventListener('drop', drop);
});

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);

// Funções
function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');
}

function dragLeave(e) {
    e.currentTarget.classList.remove('hover');
}

function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover');
}

function dragOver(e) {
    if (e.currentTarget.querySelector('.item') === null) {
        e.preventDefault(); // Para liberar o evento DROP
        e.currentTarget.classList.add('hover');
    }
}

function dragOverNeutral(e) {
    e.preventDefault(); // Para liberar o evento DROP
    e.currentTarget.classList.add('hover');
}

function dragStart(e) {
    e.currentTarget.classList.add('dragging');
}

function drop(e) {
    e.currentTarget.classList.remove('hover');

    if (e.currentTarget.querySelector('.item') === null) {
        let dragItem = document.querySelector('.item.dragging');

        e.currentTarget.appendChild(dragItem);

        updateAreas();
    }
}

function dropNeutral(e) {
    e.currentTarget.classList.remove('hover');

    let dragItem = document.querySelector('.item.dragging');
    
    e.currentTarget.appendChild(dragItem);

    updateAreas();
}

function updateAreas() {
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name');

        if (area.querySelector('.item') !== null) {
            areas[name] = area.querySelector('.item').innerHTML;
        }
        else {
            areas[name] = null;
        }
    });

    if (areas.a === '1' && areas.b === '2' && areas.c === '3') {
        document.querySelector('.areas').classList.add('correct');
    }
    else {
        document.querySelector('.areas').classList.remove('correct');
    }
}
