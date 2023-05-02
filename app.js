//CHAVE API NÃO DEVE ESTAR EXPOSTA NO GITHUB
const API_KEY = "sk-GdJHYpEWVo5zXekRBiPMT3BlbkFJEa5r3psghR3AlvaE";
//CAPTURA DO BOTAO SUBMIT SETA
const submitIcon = document.querySelector('#submit-icon');
//CAPTURA A PERGUNTA DIGITADA PARA API
const inputElement = document.querySelector('input');
//CAPTURA A CLASSE IMAGES-SECTION L41
const imageSection = document.querySelector('.images-section');


const getImages = async () => {
    const options = {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "prompt": inputElement.value,
            "n": 4,
            "size": "1024x1024"
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', options)
        const data = await response.json()
        //console.log(data)
        //CAPTURA CADA UMA DAS 4 IMAGENS CRIADAS PELO APP
        data?.data.forEach(imageObject => {
            //CRIAR UMA DIV PARA CADA IMAGEM CRIADA
            const imageContainer = document.createElement('div')
            //CORTAR A IMAGEM SE FOR MUITO GRANDE
            imageContainer.classList.add('image-container')
            //CRIA UM ELEMENTO IMG DENTRO DE CADA DIV
            const imageElement = document.createElement('img')
            //NOMEIA CADA UMA DAS IMG
            imageElement.setAttribute('src', imageObject.url)
            //COLOCA (APPEND) CADA IMAGEM ATRAVÉS DA URL ACIMA, NO CONTAINER
            imageContainer.append(imageElement)
            //COLOCA (APPEND) CADA CONTAINER NA IMAGES-SECTION (VAZIA NO HTML) L8
            imageSection.append(imageContainer)
        });
    } catch (error) {
        console.error(error);
    }
}

//CAPTURA EVENTO CLICK NO BOTAO SETA
submitIcon.addEventListener('click', getImages)
