var carrito;
var carritoProductos = [];

window.addEventListener('load', init)
function init(){

    carrito = document.querySelector('.carrito')
    carrito.addEventListener('dragover', dragSobreCarrito, false)
    carrito.addEventListener('drop', manejarDrop, false)

    if(localStorage.getItem("carrito_lista_JSON") != null){
        carritoProductos = JSON.parse(localStorage.getItem("carrito_lista_JSON"))
        actualizarCarrito()
        actualizarCheckboxs()
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

        // Obtiene el ID del producto
        e.dataTransfer.setData('id', this.id)

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

        if(carritoProductos.length < 5){
            var producto = obtenerProducto(e.dataTransfer.getData('id'));
            agregarProducto(producto)
        } else{
            alert('Ha alcanzado el limite de productos')
        }
    }
}

// Checkbox
function checkbox(item) {

    // Obtiene los datos del producto
    var producto = obtenerProducto(item.parentElement.id);

    for (let i = 0; i < carritoProductos.length; i++) {
        if(producto.id == carritoProductos[i].id){
            return removeCart(item, false)
        }
    }

    addCart(item)
}

// Boton para agregar productos
function addCart(item) {
    item = item.parentElement

    // Obtiene los datos del producto
    var producto = obtenerProducto(item.id);
    
    if(carritoProductos.length < 5){
        agregarProducto(producto)
    } else{
        alert('Ha alcanzado el limite de productos')
    }

}

// Boton para eliminar productos
function removeCart(item, preguntar) {
    var conf = (preguntar ? confirm('¿Quieres eliminar este producto?') : true)
    if(conf){
        item = item.parentElement

        for (let i = 0; i < carritoProductos.length; i++) {
            if(item.id == carritoProductos[i].id){
                carritoProductos.splice(i, 1) // Elimina el producto de la lista
                localStorage.setItem("carrito_lista_JSON", JSON.stringify(carritoProductos))
                actualizarCarrito()
                break;
            }
        }
    }
}

// Genera el modelo HTML para el producto
function obtenerProductoCarritoHTML(producto) {
    return '<li class="producto" id="' + producto.id + '"><p class="img">' + producto.img + '</p><h5>' + producto.title + '</h5><p class="price">$' + producto.price + '</p><a onclick="removeCart(this, true)">x</a></li>'
}

function agregarProducto(producto){
    carritoProductos.push(
        {
            "id": producto.id,
            "price": producto.price
        }
    )
    
    actualizarCarrito()
    localStorage.setItem("carrito_lista_JSON", JSON.stringify(carritoProductos))

    actualizarTotal()
}


// Actualiza el precio total de los productos
function actualizarTotal() {
    var total = 0;

    carritoProductos.forEach(producto => {
        total += producto.price;
    });

    document.getElementById('carrito-total').innerHTML = (total != 0 ? '$' + total : '')
}

// Actualizar carrito
function actualizarCarrito(){
    var lista = document.getElementById('carrito-lista');
    var html = '';

    carritoProductos.forEach(item => {
        // Obtiene los datos del producto
        var producto = obtenerProducto(item.id);
        
        // Agrega el elemento del producto en el carrito
        if(producto != null){
            producto = obtenerProductoCarritoHTML(producto)
            html += producto
        }
    });
    lista.innerHTML = html;

    actualizarTotal()
}