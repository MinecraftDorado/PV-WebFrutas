var productos = [];

agregarProducto(0, '🍓', 'Fresa', 600, 'Se presenta en una caja de plástico transparente y tiene un peso de 250 gramos')
agregarProducto(1, '🍒', 'Cerezas', 1200, 'Vienen en un recipiente de cartón y tienen un peso de 500 gramos')
agregarProducto(2, '🍐', 'Pera', 240, 'Se encuentra en una bolsa de papel y tiene un peso de 300 gramos')
agregarProducto(3, '🍌', 'Plátano', 150, 'Se suministra en una malla de red y tiene un peso de 300 gramos')
agregarProducto(4, '🍉', 'Sandía', 1800, 'Viene en una caja de madera y tiene un peso aproximado de 5 kilogramos')
agregarProducto(5, '🍎', 'Manzana', 130, 'Se presenta en una bandeja de plástico y tiene un peso de 400 gramos')


window.addEventListener('load', init)
function init(){
    cargarProductos()
}

function cargarProductos(){
    var elementoProducto = document.getElementsByClassName('productos')
    if(elementoProducto != null && elementoProducto.length > 0) {
        productos.forEach(producto => (
            elementoProducto[0].innerHTML += obtenerProductoHTML(producto)
        ))
    }
}

// Agrega un producto en la lista
function agregarProducto(id, img, title, price, desc) {
    var producto =
    {
        "id": id,
        "img": img,
        "title": title,
        "price": price,
        "desc": desc
    };
    productos.push(producto)
}

// Arma el modelo HTML
function obtenerProductoHTML(producto){
    var productoHTML = ''
    if(producto != null) {
        productoHTML = ('<div class="item" draggable="true" id="' + producto.id + '"><input type="checkbox" onclick="checkbox(this)" id="' + producto.id + '_check"><p class="img">' + producto.img + '</p><h5 class="title">' + producto.title + '</h5><p class="price">Precio: $' + producto.price + '</p><p class="desc">Descripción: ' + producto.desc + '</p></div>')
    }
    return productoHTML
}

function obtenerProducto(id){
    return productos.find(function(producto) {return producto.id == id}) // Busca el producto por su ID
}

function actualizarCheckboxs(){
    carritoProductos.forEach(producto => {
        var check = document.getElementById(producto.id + '_check')
        if(check != null){
            check.checked = true
        }
    })
}
