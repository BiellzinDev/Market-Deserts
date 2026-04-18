import { confirmOrder } from "./confirm.js"
import { resetCart } from "./dados.js"
const toDoList = document.querySelector(".listCart")
const caixaToDoList = document.querySelector(".to-do-list")
const qtdCart = document.querySelector(".qtd-cart")
qtdCart.innerHTML = `0`
const emptyInfo = document.querySelector(".cart-empty")

export function dinamicCart(){
    const nome = JSON.parse(localStorage.getItem("Deserts")) || []
    // 🧹 LIMPA antes de recriar
    toDoList.innerHTML = ""

    // remove elementos antigos (total, botão, etc)
    const oldExtras = caixaToDoList.querySelectorAll(".value-total, .neural, .btn-confirm")
    oldExtras.forEach(el => el.remove())

    // carrinho vazio
        if (!nome.length) {
            emptyInfo.style.display = "block"
            qtdCart.innerHTML = "0"
            return
        } else {
            emptyInfo.style.display = "none"
        }

    let somaTotal = 0
    let qtdTotal = 0

    nome.forEach(item => {
        somaTotal += item.valor
        qtdTotal += item.quantidade

        toDoList.innerHTML += `
        <li data-id="${item.nome}" class="cart-item flex-items_center-content_center cart-info ">
            <div class="info-value flex-items_center-content_center">
                <h3>${item.nome}</h3>
                <div class="qtd-value flex-items_center-content_center">
                    <p>${item.quantidade}x</p>
                    <p>@$${item.preco}</p>
                    <p>$${item.valor}</p>
                </div>
            </div>
            <button class="btn-remove-cart ">
                <img src="./assets/images/icon-remove-item.svg">
            </button>
        </li>`
        })

    qtdCart.innerHTML = qtdTotal

    // criar total
    const valueCart = document.createElement("div")
    valueCart.className = "value-total flex-items_center-content_center"
    valueCart.innerHTML = `
        <p>Order Total</p>
        <h3>$${somaTotal}</h3>
        `
    caixaToDoList.appendChild(valueCart)

    // bloco carbon
    const neural = document.createElement("div")
    neural.className = "neural flex-items_center-content_center"
    neural.innerHTML = `
        <div class="tree">
            <img src="./assets/images/icon-carbon-neutral.svg">
        </div>
        <div>
            <p>This is a <strong>carbon-neutral</strong> delivery</p>
        </div>`
    caixaToDoList.appendChild(neural)

    // botão
    const btnConfirm = document.createElement("button")
    btnConfirm.className = "btn-confirm"
    btnConfirm.textContent = "Confirm Order"
    caixaToDoList.appendChild(btnConfirm)
 
    const orderConfirm = document.querySelector(".order-confirm")
    btnConfirm.addEventListener("click", () =>{
        window.scrollTo({
        top: 0,
        behavior: "smooth"
        })
        orderConfirm.style.display ="block"
        confirmOrder()
    })
}

toDoList.addEventListener("click", (e) =>{
    const btnRemove = e.target.closest(".btn-remove-cart")
    if(!btnRemove) return

    const item = btnRemove.closest(".cart-item")
    const id = item.dataset.id

    removeItem(id)
    
    const card = document.querySelector(`.card-items[data-id="${id}"]`)
    resetCart(card)
    
})

export function removeItem(id){
    let cart = JSON.parse(localStorage.getItem("Deserts") || [])

    cart = cart.filter(item => item.nome !== id)

     localStorage.setItem("Deserts",JSON.stringify(cart))

     dinamicCart()
}
