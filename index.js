/* eslint-disable strict */
$(() => { 
  let searchForm = $('.search-repos')
  let searchInput = $('input.username', searchForm )
  $('button.search', searchForm).click(handleSearch);
  $('input.username', searchForm ).on('keypress', e => { 
    if (e.keyCode == 13) {
      handleSearch();
    }
  });
  function handleSearch() {

    let username = searchInput.val();
    getRepos(username);
    
    
  }
  function getRepos(username) {
    $.get(`https://api.github.com/users/${username}/repos`)
      .then(res =>
        diplayResults(res))
      .catch(error =>
        console.error(error));
      
  }

  function diplayResults(items) {
    let searchResult = $('.search-result');
    searchResult.empty();
    let elements = items.map(item => `
      <li>
        <a href='${item.git_url}'>${item.name}</a>
      </li>
    `);
    searchResult.html(`<ul>${elements.join('')}<ul>`);


  }
});
