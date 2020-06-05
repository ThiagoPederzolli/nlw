function populateUFs(){
   const ufSelect = document.querySelector("select[name=uf]")

        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
        .then( res => res.json() )
        .then( states => {
            for( state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</otpion>`
            }
            
        })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value 

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = ""
    citySelect.disabled = true
    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        
        for( city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</otpion>`
        }
        citySelect.disabled = false
        
    })

}


document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)//arrow function, forma de criar uma função vazia
    

//itens de coleta
//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

let selectedItems =[]

const collectedItems = document.querySelector("input[name=items]")
function handleSelectedItem(event){
    const itemLi = event.target

    //add or remove uma classe dcom javascript. Toggle adiciona ou remove. Ele olha o item, se tem a classe ele remove e se não tem ele adiciona
    itemLi.classList.toggle("selected")


    const itemId = itemLi.dataset.id
    
    // console.log('ITEM ID: ', itemId)
    //verificar se existem itens selecionados
    //se sim, pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId//isso será true or false
        return itemFound
    })

    //se já estiver selecionado, tirar da seleção
    if(alreadySelected >= 0){
        //tirar da seleção
        const filteredItems = selectedItems.filter( item =>{
            const ItemIsDifferent = item != itemId //false
            return ItemIsDifferent 
        })
        selectedItems = filteredItems
    }else{
        //se não estiver selecionado, adicionar a seleção
        selectedItems.push(itemId)
    }
    // console.log('selectedItems: ', selectedItems)
    
    //atualizar o campo escondido os itens selecionados
    collectedItems.value = selectedItems
}