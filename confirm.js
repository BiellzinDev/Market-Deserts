import { resetCart } from "./dados.js"
import { removeItem } from "./cart.js"
export function confirmOrder(){
    const nome = JSON.parse(localStorage.getItem("Deserts")) || []
    const boxConfirm = document.querySelector(".box-confirm")
    boxConfirm.innerHTML = ""
    let somaTotal = 0
    let qtdTotal = 0
    nome.forEach(item => {
        somaTotal += item.valor
        qtdTotal += item.quantidade

        boxConfirm.innerHTML += `<li class="cart-item flex-items_center-content_center cart-info check-order">
                <div class="flex-items_center-content_center order-itens">
                  <picture><img src="${item.img}" alt=""></picture>
                  <div class="info-value flex-items_center-content_center ">
                    <h3 class="text-check">${item.nome}</h3>
                    <div class="qtd-value flex-items_center-content_center ">
                      <p>${item.quantidade}x</p>
                      <p>@$${item.preco}</p>
                    </div>
                  </div>
                </div>
                <p>$${item.valor}</p>
              </li>`
    });
}

const btnNewOrder = document.querySelector(".btn-NewOrder")
const nome = JSON.parse(localStorage.getItem("Deserts")) || []
btnNewOrder.addEventListener("click", () =>{
    localStorage.removeItem("Deserts")
    location.reload()
})
