
var listaMedicamentos = []

let nuevoMedicamento = () => {
    let formElement = document.forms.medicamentoNuevo
    let dataForm = new FormData(formElement) 
    
    let codigo = dataForm.get("codigo")
    let nombre = dataForm.get("nombre")
    let cantidad = dataForm.get("cantidad")
    let precio = dataForm.get("precio")

    if(listaMedicamentos.length > 0) {
        let medicamentoNombre = listaMedicamentos.filter(e => e.nombre === nombre)
        if(medicamentoNombre.length > 0) {
            alert(`Ya existe un medicamento con el nombre ${nombre}`)
            return
        }
        let medicamentoCodigo = listaMedicamentos.filter(e => e.codigo === codigo)
        if(medicamentoCodigo.length > 0) {
            alert(`Ya existe un medicamento con el codigo ${codigo}`)
            return
        }
    }

    listaMedicamentos.push({
        codigo,
        nombre,
        cantidad,
        precioUnitario: precio,
        montoInvertido: precio*cantidad

    })

    formElement.reset()

    agregarListaMedicamentos()
}

let agregarListaMedicamentos = () => {

    eliminarListaMedicamentos()

    let tablaMedicamentos = document.getElementById("listaMedicamentos")
    
    listaMedicamentos.forEach(e => {
        let row = tablaMedicamentos.insertRow()
        let cellCodigo = row.insertCell(0)
        let cellNombre = row.insertCell(1)
        let cellCantidad = row.insertCell(2)
        let cellPrecioUnitario = row.insertCell(3)
        let cellMontoInvertido = row.insertCell(4)

        cellCodigo.innerHTML = e.codigo
        cellNombre.innerHTML = e.nombre
        cellCantidad.innerHTML = e.cantidad
        cellPrecioUnitario.innerHTML = e.precioUnitario
        cellMontoInvertido.innerHTML = e.montoInvertido

    })
}

let eliminarListaMedicamentos = () => {
    let tablaMedicamentos = document.getElementById("listaMedicamentos")
    
    while(tablaMedicamentos.childNodes.length) {
        tablaMedicamentos.removeChild(tablaMedicamentos.childNodes[0])
    }
    
}

let buscarMedicamento = () => {
    let formElement = document.forms.inputBuscar
    let dataForm = new FormData(formElement) 
    
    let buscar = dataForm.get("buscar")
    if(buscar === '' || listaMedicamentos.length === 0) return

    let medicamento = listaMedicamentos.filter(e => e.nombre === buscar)
    if(medicamento.length === 0) return

    if(medicamento !== '')
        alert(`Se encontro el medicamento ${medicamento[0].nombre}`)
}

let eliminarMedicamento = () => {
    let formElement = document.forms.inputEliminar
    let dataForm = new FormData(formElement) 
    
    let eliminar = dataForm.get("eliminar")
    if(eliminar === '' || listaMedicamentos.length === 0) return

    let medicamento = listaMedicamentos.filter(e => e.codigo !== eliminar)
    if(medicamento.length === 0) return

    listaMedicamentos = medicamento
    formElement.reset()
    agregarListaMedicamentos()
}

var compare = ( a, b ) => {
    if ( a.nombre < b.nombre )
      return -1;

    if ( a.nombre > b.nombre )
      return 1;

    return 0;
  }

let ordenar = () => {
    if(listaMedicamentos <= 1) return
    
    let listaOrdenada = listaMedicamentos.sort(compare)

    listaMedicamentos = listaOrdenada
    agregarListaMedicamentos()
}
