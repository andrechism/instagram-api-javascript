

const cardsSection = document.querySelector('#cards-section');
const searchInput = document.querySelector('#header-input')
const btnSearch = document.querySelector('#btn-search');

async function searchImage() {
  user = searchInput.value;
  let request = await fetch(`https://www.instagram.com/${user}/?__a=1`);
  let response = await request.json();
  getImages(response.graphql.user.id);
}

function renderImages(images) {

  cardsSection.innerHTML = "";

  images.forEach(image => {

    let display_url = image.node.display_url;
    let descricao = image.node.edge_media_to_caption.edges[0].node.text;
    let user = image.node.owner.username;
    let link = image.node.shortcode;

    let post = `
    
    <div class="card">
      <header>
        <h2>
          <a href="https://www.instagram.com/${user}/" target="_blank">${user}</a>
        </h2>
      </header>
      <section>
        <a href="https://www.instagram.com/p/${link}/" target="_blank">
          <img src="${display_url}" alt="Imagem" width="200">
        </a>
      </section>
      <footer>
        <p>${descricao}</p>
      </footer>
    </div>

    `;

    cardsSection.innerHTML += post;
});

}

async function getImages(id) {
  
  let variables = `%7B%22id%22%3A%22${id}%22,%22first%22%3A50%7D`;
  let request = `https://www.instagram.com/graphql/query/?query_hash=bfa387b2992c3a52dcbe447467b4b771&variables=${variables}`;
  let response = await fetch(request);
  let jsonResponse = await response.json();
  let images = jsonResponse.data.user.edge_owner_to_timeline_media.edges;
  
  renderImages(images);
}

searchInput.addEventListener('keyup', e => {
  if(e.key == 'Enter'){
    searchImage();
  }
})

btnSearch.addEventListener('click', searchImage);

getImages('2960202998');