const startButton = document.querySelector('.start-button');
const firstScreen = document.querySelector('.first-screen');
const mainForm = document.querySelector('.main-form');
const formCalculate = document.querySelector('.form-calculate');
const endButton = document.querySelector('.end-button');
const total = document.querySelector('.total');
const fastRange = document.querySelector('.fast-range');
const totalPriceSum = document.querySelector('.total_price__sum');
const adaptCheckbox = document.querySelector('#adapt');
const mobTemplateCheck = document.querySelector('#mobileTemplates');
mobTemplateCheck.disabled = true;



const DATA = {
    whichSite: ['landing', 'multiPage', 'onlineStore'],
    price: [4000, 8000, 26000],
    desktopTemplates: [50, 40, 30],
    adapt: 20,
    mobileTemplates: 15,
    editable: 10,
    metrikaYandex: [500, 1000, 2000],
    analyticsGoogle: [850, 1350, 3000],
    sendOrder: 500,
    deadlineDay: [[2, 7],[3, 10],[7, 14]],
    deadlinePercent: [20, 17, 15]
};




function showElem (el){
    el.style.display = 'block';
}

function hideElem (el) {
    el.style.display = 'none';
}

function handleCallBachkFotrm(event){
    const target = event.target;
    if(target.classList.contains('want-faster')){
       if (target.checked){
           showElem(fastRange);
       }else{
           hideElem(fastRange);
       }

       // или так target.checked ? showElem(fastRange): hideElem(fastRange);
    }

    if(target.classList.contains('calc-handler')){
        priceCalculation(target);
    }


}

function priceCalculation(elem){
    let result = 0;
    let index = 0;
    let options = [];

    if(adaptCheckbox.checked)
        {
            mobTemplateCheck.disabled = false;
        }



    if(elem.name === 'whichSite'){
        for(const item of formCalculate.elements){
            if(item.type === 'checkbox'){
                item.checked = false;
            }
        }
        
        hideElem(fastRange);
    }

    for(const item of formCalculate.elements){
        if(item.name === 'whichSite' && item.checked){
            index = DATA.whichSite.indexOf(item.value)
        }else if(item.classList.contains('calc-handler') && item.checked){
            options.push(item.value);
        }
    }

    options.forEach((key) => {
        if(typeof(DATA[key]) === 'number'){
            if(key === 'sendOrder'){
                result += DATA[key]
            } else{
                result += DATA.price[index] * DATA[key] / 100;
            }
        } else {
            if(key === 'desktopTemplates'){
                result += DATA.price[index] * DATA[key][index] / 100;
            } else {
                result += DATA[key][index];
        } 
        }
    })

    result += DATA.price[index];

    totalPriceSum.textContent = result;
}

startButton.addEventListener('click', function() {
    showElem(mainForm);
    hideElem(firstScreen);
})

endButton.addEventListener('click', function(){
    for (const elem of formCalculate.elements){
        if(elem.tagName === 'FIELDSET'){
            hideElem(elem);
        }
    }
    showElem(total);

});

formCalculate.addEventListener('change', handleCallBachkFotrm);