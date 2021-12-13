  // Delete Item with data-id
  $(function(){
    $('.delete-movie-btn').on('click', (e) => {
        const target = $(e.target);
        const id = target.attr('data-id');
        $.ajax({
          type: 'DELETE',
          url: `/watchlist/${id}`,
          success() {
            window.location.href = '/watchlist';
          },
        });
      });

  })
  