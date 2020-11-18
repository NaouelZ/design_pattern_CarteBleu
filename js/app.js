let card = 
{
    cards: [],
    addCard: function(owner, creditCard){
        this.cards.push(
            {
                'owner': owner,
                'card': creditCard,
                'cash': 1000,
            }
        )
    },
    checkCardExist: function(creditCard){
        for(var i = 0; i < this.cards.length; i++){
            if(this.cards[i].card == creditCard ){
                return true
            }
        }
        return false
    },
    cashWithdrawal: function(creditCard, amount){
        for(var i = 0; i < this.cards.length; i++){
            if(this.cards[i].card == creditCard ){
                this.cards[i].cash -= amount
            }
        }
    },  
    cashAvailable: function(creditCard){
        for(var i = 0; i < this.cards.length; i++){
            if(this.cards[i].card == creditCard){
                return this.cards[i].cash
            }
        }
    }
}

let payment = 
{
    payments: [],
    checkCreditCard: function (creditCard)
    {
        creditCard = String(creditCard);
        if (/[^0-9-\s]+/.test(creditCard)) return false;

        var nCheck = 0, nDigit = 0, bEven = false;
        creditCard = creditCard.replace(/\D/g, "");

        for (var n = creditCard.length - 1; n >= 0; n--) {
            var cDigit = creditCard.charAt(n),
                  nDigit = parseInt(cDigit, 10);

            if (bEven) {
                if ((nDigit *= 2) > 9) nDigit -= 9;
            }

            nCheck += nDigit;
            bEven = !bEven;
        }

        return (nCheck % 10) == 0;
    },
    addPayment : function (creditCard, amount, name)
    {
        if (!(card.checkCardExist(creditCard))){
            card.addCard(name, creditCard)
        }
        if(card.cashAvailable(creditCard)-amount < 0){
            alert('You don\'t have enough money in your account')
        } else { 
            this.payments.push(
            {
                'card': creditCard,
                'amount': amount,
                'name': name,
            })
            card.cashWithdrawal(creditCard, amount)
        }
    } 
}

let donation =
{
    payment: function (creditCard, value, name)
    {
        const creditCardIsValid = payment.checkCreditCard(creditCard)
        if(creditCardIsValid)
        {
            payment.addPayment(creditCard, value, name)
        }
        else
        {
            alert("Code non valide")
        }
    },
    
    showPaymentHistory: function (divContainer)
    {
        const payments = payment.payments
        divContainer.innerHTML = "" 
        payments.forEach(function(payment)
        {
            divContainer.innerHTML += 'payment : ' + payment.amount +  '$ by ' + payment.name + ' with the credit card ' + payment.card + "<br>"
        })
    }
}


document.querySelector('.send').addEventListener('click', function()
{
    let name = document.querySelector('#name').value
    let amount = document.querySelector('#amount').value
    let card = document.querySelector('#credit_card').value

    donation.payment(card, amount, name)
    console.log("payment has been succefuly done")

    let payment_history = document.querySelector('.payment_history')
    donation.showPaymentHistory(payment_history);
    console.log("payment has been succefuly displayed")
})