import { dinamicCart } from "./cart.js"
const boxItens = document.querySelector(".box-items")

fetch("data.json").then((Response) =>{
    Response.json().then((cardapio) => {
        // Pega os itens do localStorage logo no início
        const savedDeserts = JSON.parse(localStorage.getItem(localStorageRegister)) || []

        cardapio.itens.map((itens) =>{
            // Verifica se o item atual já está no carrinho salvo
            const savedItem = savedDeserts.find(item => item.nome === itens.name)
            const hasItem = !!savedItem;
            const quantity = savedItem ? savedItem.quantidade : 1;

            boxItens.innerHTML += `<div class="flex-items_center-content_center limiter card-items" data-id="${itens.name}"
            data-price="${itens.price}"
            data-img="${itens.image.thumbnail}">
                <picture >
                <source media="(min-width: 1440px)" srcset="${itens.image.desktop}">
                <source media="(min-width: 375px)" srcset="${itens.image.mobile}">
                <img src="${itens.image.mobile}" alt="Imagem Waffle" class="img">
                </picture>
                    <div class="btnCart cart" >
                        <div class="btn-wid">
                            <button class="btnAdd " >
                                <div class="btn-img">
                                    <img src="./assets/images/icon-add-to-cart.svg" alt="">
                                </div>
                            </button>
                            <span class="count"><p >Add to cart</p></span>
                            <div class="more">
                                <button class="btns-icon minus">
                                    <img src="./assets/images/icon-decrement-quantity.svg" alt="">
                                </button>
                                <span class="qtd-cart">1</span>
                                <button class="btns-icon plus">
                                    <img src="./assets/images/icon-increment-quantity.svg" alt="">
                                </button>
                            </div>
                            
                        </div>
                    </div>
                <div class="box-info flex-items_center-content_center ">
                <p class="nome">${itens.category}</p>
                <p class="name-info">${itens.name}</p>
                <p class="value">$ ${itens.price}</p>
                </div>
            </div>`

            const card = boxItens.lastElementChild

            if (hasItem) {
            const qtdCart = card.querySelector(".qtd-cart")
            const more = card.querySelector(".more")
            const img = card.querySelector(".img")
            const btnAdd = card.querySelector(".btnAdd")
            const Cart = card.querySelector(".cart")
            const count = card.querySelector(".count")

            qtdCart.innerHTML = quantity

            more.classList.add("disable")
            img.classList.add("img1")
            btnAdd.classList.add("btn-img1")
            Cart.classList.add("teste")
            count.classList.add("disable1")
}
        })
        
        // Atualiza o carrinho lateral assim que a página carrega
         dinamicCart()
        const btnCart = document.querySelectorAll(".btnCart")
        
        //Verifica se tem click na caixa da sobremesa e eleva o nivel para a caixa completa
        boxItens.addEventListener("click", (e) => {
            const btn = e.target.closest(".btnCart")
            if(!btn) return

            //faz a seelção e coloca a borad ao redor da caixa
            const card = e.target.closest(".card-items")
            modfyColor(card)

            //botão de incrementar o numero de sobremesas e identifica qual box eu selecionei
            if(e.target.closest(".plus")){
                addMore(card)
                return
            }
            //botão de diminuir o numero de sobremesas e identifica qual box eu selecionei
            if(e.target.closest(".minus")){
                addLess(card)
                return
            }
        })
    })
    
})      

const localStorageRegister = "Deserts"
function modfyColor(card){

    const id = card.dataset.id
    let deserts1 = JSON.parse(localStorage.getItem(localStorageRegister)) || []

    const index = deserts1.findIndex(item => item.nome === id)

    const Cart = card.querySelector(".cart")
    const btnAdd = card.querySelector(".btnAdd")
    const count = card.querySelector(".count")
    const img = card.querySelector(".img")
    const more = card.querySelector(".more")
    const qtdCart = card.querySelector(".qtd-cart")

    if(index === -1){
        deserts1.push({
            nome: id,
            img: card.dataset.img,
            preco: Number(card.dataset.price),
            quantidade: 1,
            valor: Number(card.dataset.price)
    })
    localStorage.setItem(localStorageRegister, JSON.stringify(deserts1))
    
    //Força o estado correto
    qtdCart.innerHTML = 1

    more.classList.add("disable")
    img.classList.add("img1")
    btnAdd.classList.add('btn-img1')
    Cart.classList.add("teste")
    count.classList.add("disable1")
    
    // updateLocalStorage(card)
    dinamicCart()
    
}}

function addMore(card){
    const id = card.dataset.id
    let deserts1 = JSON.parse(localStorage.getItem(localStorageRegister)) || []
    const index = deserts1.findIndex(item => item.nome === id)

    if(index !== -1){
        deserts1[index].quantidade += 1
        deserts1[index].valor = deserts1[index].quantidade * deserts1[index].preco
    }
    localStorage.setItem(localStorageRegister, JSON.stringify(deserts1))

    const qtdCart = card.querySelector(".qtd-cart")
    let count = Number(qtdCart.innerHTML)
    count++
    qtdCart.innerHTML = count
    dinamicCart()
    return qtdCart
    }
function addLess(card){
    const id = card.dataset.id
    const qtdCart = card.querySelector(".qtd-cart")

    let deserts1 = JSON.parse(localStorage.getItem(localStorageRegister)) || []
    const index = deserts1.findIndex(item => item.nome === id)

    let count = Number(qtdCart.innerHTML)

    if (count > 1) {
        count--
        qtdCart.innerHTML = count

        if(index !== -1){
            deserts1[index].quantidade = count
            deserts1[index].valor = count * deserts1[index].preco
        }
    } else {
        // voltou para zero → reset visual
        qtdCart.innerHTML = 0

        deserts1 = deserts1.filter(item => item.nome !== id)
        resetCart(card)
    }
    localStorage.setItem(localStorageRegister, JSON.stringify(deserts1))
    dinamicCart()

}

export function resetCart(card){
        const Cart = card.querySelector(".cart")
        const btnAdd = card.querySelector(".btnAdd")
        const count = card.querySelector(".count")
        const img = card.querySelector(".img")
        const more = card.querySelector(".more")

        more.classList.remove("disable")
        img.classList.remove("img1")
        btnAdd.classList.remove('btn-img1')
        Cart.classList.remove("teste")
        count.classList.remove("disable1")

        removeFromLocalStorage(card)
        
}
function updateLocalStorage(card){
    const qtdcart = card.querySelector(".qtd-cart")
    const quantidade = Number(qtdcart.innerHTML)
    const price = Number(card.dataset.price)
    
    const total = price * quantidade

    let deserts1 = JSON.parse(localStorage.getItem(localStorageRegister) || "[]")
    const index = deserts1.findIndex(item => item.nome === card.dataset.id)

    if(quantidade === 0){
        //remove se for 0
        deserts1 = deserts1.filter(item => item.nome !== card.dataset.id)
    }
    else if(index !== -1){
        //atualiza a quantidade
        deserts1[index].quantidade = quantidade
        deserts1[index].preco = price
        deserts1[index].valor = total
        
    } else {
        //Adiciona só se não existir
        quantidade = quantidade > 0 ? quantidade : 1
        deserts1.push({
            nome: card.dataset.id,
            img:card.dataset.img,
            preco:price,
            quantidade: quantidade,
            valor:total
        })
        
    }
    localStorage.setItem(localStorageRegister, JSON.stringify(deserts1))
}
function removeFromLocalStorage(card){
    let deserts1 = JSON.parse(localStorage.getItem(localStorageRegister) || "[]")

    const updated = deserts1.filter(item => item.nome !== card.dataset.id)

    localStorage.setItem(localStorageRegister, JSON.stringify(updated))
}
