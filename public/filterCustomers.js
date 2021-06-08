function filterCustomersByFirstName() {
    //get the id of the selected homeworld from the filter dropdown
    var customer_ID = document.getElementById('customer_filter').value
    //construct the URL and redirect to it
    window.location = '/customers/filter/' + parseInt(customer_ID)
}