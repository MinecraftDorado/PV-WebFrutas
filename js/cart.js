var carrito;

window.addEventListener('load', init)
function init(){

    carrito = document.querySelector('.carrito')
    carrito.addEventListener('dragover', dragSobreCarrito, false)
    carrito.addEventListener('drop', manejarDrop, false)
    
    if(localStorage.getItem("carrito_lista") != null){
        document.getElementById('carrito-lista').innerHTML = localStorage.getItem("carrito_lista")
    }

    var items = document.getElementsByClassName('item')
    for(i in items){
        var item = items[i];
        if(typeof item.style != 'undefined'){
            // Eventos
            item.addEventListener('dragstart', dragIniciado, false)
            item.addEventListener('dragend', dragFinalizado, false)
        }
    }

    // Producto
    function dragIniciado(e){
        this.classList.add('elegido')

        // Guardar los datos del elemento
        var img = this.getElementsByClassName('img')[0].innerHTML;
        var title = this.getElementsByClassName('title')[0].innerHTML;

        // Genero el elemento para el carrito
        var producto = '<li class="producto"><p class="img">' + img + '</p><h5>' + title + '</h5><a onclick="removeCart(this)">x</a></li>'
        e.dataTransfer.setData('text', producto)

        // Resalto el carrito
        carrito.classList.add('over')
    }
    
    // Quito efectos cuando se suelta el producto
    function dragFinalizado(e){
        this.classList.remove('elegido')
        carrito.classList.remove('over')
    }

    // Carrito
    function dragSobreCarrito(e){
        e.preventDefault()
        return false
    }

    function manejarDrop(e){
        e.preventDefault()
        
        var datos = e.dataTransfer.getData('text')

        if(datos != ''){
            var lista = document.getElementById('carrito-lista');

            if(lista.childElementCount < 5){
                lista.innerHTML += datos
                localStorage.setItem("carrito_lista", lista.innerHTML)
            } else{
                alert('Ha alcanzado el limite de productos')
            }
        }
    }
}

// Boton para agregar productos
function addCart(item) {
    item = item.parentElement

    // Guardar los datos del elemento
    var img = item.getElementsByClassName('img')[0].innerHTML;
    var title = item.getElementsByClassName('title')[0].innerHTML;

    // Genero el elemento para el carrito
    var producto = '<li class="producto"><p class="img">' + img + '</p><h5>' + title + '</h5><a onclick="removeCart(this)">x</a></li>'
    
    var lista = document.getElementById('carrito-lista');

    if(lista.childElementCount < 5){
        lista.innerHTML += producto
        localStorage.setItem("carrito_lista", lista.innerHTML)
    } else{
        alert('Ha alcanzado el limite de productos')
    }

}

// Boton para eliminar productos
function removeCart(item) {
    var conf = confirm('¿Quieres eliminar este producto?')
    if(conf){
        item = item.parentElement
        item.remove()
        localStorage.setItem("carrito_lista", document.getElementById('carrito-lista').innerHTML)
    }
}
