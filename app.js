// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
    // show loading
    document.getElementById('loading').style.display = 'block';

    //hide result
    document.getElementById('result').style.display = 'none';

    setTimeout(calculateResult, 1500);

    e.preventDefault();
});

// calculate result
function calculateResult() {
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // calculate payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = (
            monthly * calculatedPayments -
            principal
        ).toFixed(2);

        // hide loading
        document.getElementById('loading').style.display = 'none'

        //show result
        document.getElementById('result').style.display = 'block'

    } else {
        showError('Please check your number');
    }
}

// show error
function showError(error) {

    //  // hide loading
     document.getElementById('loading').style.display = 'none'

     //show result
     document.getElementById('result').style.display = 'none'

    // create div
    const errDiv = document.createElement('div');

    // get element
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // add class
    errDiv.className = 'alert alert-danger';

    // append text
    errDiv.appendChild(document.createTextNode(error));

    // insert before heading
    card.insertBefore(errDiv, heading);

    // clear alert
    setTimeout(clearError, 2000);
}

function clearError() {
    document.querySelector('.alert').remove();
}
