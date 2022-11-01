// I wish you good luck and happy coding 🥰🤠🥳🥳💯💯


function getFormmatedTime(){
    const now = new Date().toLocaleTimeString('en-us',{
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const date = now.split(',')[0].split(' ');
    const time = now.split(',')[1];
    return `${date[1]} ${date[0]} ${time}`;
    
}

// 25 Feb, 06:45 PM


document.querySelector('#ewallet-form').addEventListener('submit',function(e){
    e.preventDefault();

    console.log('Form Submitted');
    
    const type = document.querySelector('.add__type').value;

    const desc = document.querySelector('.add__description').value;

    const value = document.querySelector('.add__value').value;

    if(desc && value.length >0){

        addItems(type,desc,value);
        resetForm();

    }

});

showItems();

function showItems(){
    let items = getItemsFromLS();

    const collection = document.querySelector('.collection');
   

    for (let item of items){

        const newHtml = 
        
        `<div class="item">
            <div class="item-description-time">
              <div class="item-description">
                <p>${item.desc}</p>
              </div>
              <div class="item-time">
                <p>${item.time}</p>
              </div>
            </div>
            <div class="item-amount ${item.type === '+' ? 'income-amount' : 'expense-amount' } ">
              <p>${item.type}$${sep(item.value)}</p>
            </div>
        </div>`;

        collection.insertAdjacentHTML('afterbegin', newHtml);

    }
}



function addItems(type,desc,value){

    const time = getFormmatedTime();
    
    const newHtml = `
     
    <div class="item">
        <div class="item-description-time">
          <div class="item-description">
            <p>${desc}</p>
          </div>
          <div class="item-time">
            <p>${time}</p>
          </div>
        </div>
        <div class="item-amount ${type === '+' ? 'income-amount' : 'expense-amount' } ">
          <p>${type}$${sep(value)}</p>
        </div>
    </div>  ` 
    
    ;

    console.log(newHtml);

    const collection = document.querySelector('.collection');
    collection.insertAdjacentHTML('afterbegin', newHtml);

    addItemsToLS(type,desc,value,time);

    showTotalIncome();

    showTotaleExpense();

    showTotalBalance();

}


function resetForm(){

        document.querySelector('.add__type').value = '+';

        document.querySelector('.add__description').value = '';

        document.querySelector('.add__value').value = '';

};


function getItemsFromLS(){

    let item = localStorage.getItem('item');

    if (item){
        item = JSON.parse(item)
    } else{
        item = [];
    }
    
    return item;
};



function addItemsToLS(type,desc,value,time){
 
    let item =  getItemsFromLS();

    item.push({type,desc,value,time});

    localStorage.setItem('item', JSON.stringify(item));

};

showTotalIncome();

function showTotalIncome(){
    let items = getItemsFromLS();
    let totalIncome = 0;

    for(let item of items){

        if(item.type === '+'){
            totalIncome += parseInt(item.value);
        }
    }
    console.log(totalIncome);
    document.querySelector('.income__amount p').innerText= `$${sep(totalIncome)}`;
}

showTotaleExpense();

function showTotaleExpense(){
    let items = getItemsFromLS();
    let totalExpense = 0;

    for(let item of items){

        if(item.type === '-'){
            totalExpense += parseInt(item.value);
        }
    }
    console.log(totalExpense);
    document.querySelector('.expense__amount p').innerText= `$${sep(totalExpense)}`;
}

showTotalBalance();

function showTotalBalance(){
    let items = getItemsFromLS();
    let balance = 0;

    for(let item of items){
        if(item.type === '+'){
            balance += parseInt(item.value);
        }else {
            balance -= parseInt(item.value);
        }
    }

    document.querySelector('.balance__amount p').innerText= `$${sep(balance)}`;
        // if(balance >= 0){
    //     document.querySelector('header').className = 'green';
    
    // } else {
    //     document.querySelector('header').className = 'red';
    // }

    document.querySelector('header').className = (balance >= 0) ? 'green': 'red';

}

function sep(amount){
    amount = parseInt(amount);
    return amount.toLocaleString();

}





/* <div class="item">
<div class="item-description-time">
  <div class="item-description">
    <p>Buy a physics book</p>
  </div>
  <div class="item-time">
    <p>25 Feb, 06:45 PM</p>
  </div>
</div>
<div class="item-amount expense-amount">
  <p>-$78</p>
</div>
</div> */