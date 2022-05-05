let inputCepReference = document.querySelector('#cep')
let inputLogradouroReference = document.querySelector('#logradouro')
let submitButtonReference = document.querySelector('#btn-search')
let containerImagesDogs = document.querySelector('.imagem-cachorros')
let inputSelectBreed = document.querySelector('#breeds')
let deleteButton = document.querySelectorAll('.btn-delete')


fetch('https://dog.ceo/api/breeds/list/all')
.then(
    response => {
        response.json().then(
            responseBreeds => {

                listBreeds = responseBreeds.message

                for (index in listBreeds){

                    let option = document.createElement('option')
                    let text = document.createTextNode(index)

                    option.value = index

                    option.appendChild(text)
                    inputSelectBreed.appendChild(option)

                }
                                
            }
        )
    }
)


submitButtonReference.addEventListener('click', function(ev){
     
    ev.preventDefault()

    let choosedBreed = inputSelectBreed.value
    containerImagesDogs.innerHTML= ""

    fetch(`https://dog.ceo/api/breed/${choosedBreed}/images/random/10`)
        .then(

            function (response){

                response.json().then(
                    function (responseDogs){

                    localStorage.removeItem('dogs')
                    imgDogs = responseDogs.message

                    localStorage.setItem('dogs', JSON.stringify(imgDogs))
                    jsonDogs = localStorage.getItem('dogs')
                    jsDogs = JSON.parse(jsonDogs)

                    for (index of jsDogs){

                        let divCard = document.createElement('div')
                        let imagem = document.createElement('img') 
                        let button = document.createElement('button')
                        let text = document.createTextNode('delete')

                        imagem.src = index
                        button.value = index

                        imagem.classList.add('imagem')
                        divCard.classList.add('imagem-container')
                        divCard.setAttribute('id', index)
                        button.setAttribute('id', index)
                        button.classList.add('btn-delete')

                        button.addEventListener('click', function(ev){

                            imgDeletada=button.value
                            indiceDelete = jsDogs.indexOf(imgDeletada)
                            jsDogs.splice(indiceDelete,1)

                            document.getElementById(`${imgDeletada}`).innerHTML= ""

                            localStorage.removeItem('dogs')
                            imgDogs = JSON.stringify(jsDogs)
                            localStorage.setItem('dogs', JSON.stringify(imgDogs))
                            })

                        divCard.appendChild(imagem)
                        button.appendChild(text)
                        divCard.appendChild(button)
                        containerImagesDogs.appendChild(divCard)

                    }
                        deleteButton = document.querySelectorAll('.btn-delete')

                    })
                    
                })
            })
