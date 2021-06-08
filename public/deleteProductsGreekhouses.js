function deleteProductsGreekhouses(pid, gid){
    $.ajax({
        url: '/products_greekhouses/pid/' + pid + '/gid/' + gid,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
