function deleteProductsOrders(oid, pid){
    $.ajax({
        url: '/products_orders/oid/' + oid + '/pid/' + pid,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
