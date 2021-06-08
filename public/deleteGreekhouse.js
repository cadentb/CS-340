function deleteGreekhouse(id){
    $.ajax({
        url: '/greekhouses/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
