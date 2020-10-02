

const cardsSection = document.querySelector('#cards-section');
const searchInput = document.querySelector('#header-input')

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

    let post = `
    
    <div class="card">
      <header>
        <h2>${user}</h2>
      </header>
      <section>
        <img src="${display_url}" alt="Imagem" width="200">
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
  
  console.log(images);
  renderImages(images);
}

searchInput.addEventListener('keyup', e => {
  if(e.key == 'Enter'){
    searchImage();
  }
})

getImages('2960202998');