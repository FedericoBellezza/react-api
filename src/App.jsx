import { useEffect, useState } from "react";
import Header from "./assets/components/Header";

function App() {
  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = () => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data.posts);
      });
  };
  const [posts, setPosts] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [tags, setTags] = useState("Casual");
  const [isPublic, setIsPublic] = useState("true");
  const [content, setContent] = useState("");
  let newPosts = [...posts];

  // - Funzione per eliminare un post
  const deleteTitle = (element) => {
    const index = newPosts.indexOf(element);

    if (index > -1) {
      console.log(`Eliminato il titolo: "${newPosts[index].title}"`);

      newPosts.splice(index, 1);
      setPosts(newPosts);
    }
  };

  // - Alla modifica dell'input
  const handleFormChange = (e) => {
    if (e.target.name === "title") setTitle(e.target.value);
    if (e.target.name === "img") setImg(e.target.value);
    if (e.target.name === "content") setContent(e.target.value);
    if (e.target.name === "tags") setTags(e.target.value);
    if (e.target.name === "isPublic") setIsPublic(e.target.value);
  };

  // - All'invio del form
  const handleFormSubmit = (e) => {
    event.preventDefault();
    if (!title) return;
    if (!img) return;
    if (!tags) return;
    setInputValue({
      title,
      img,
      content,
      tags,
      isPublic,
    });

    console.log("Aggiunto il titolo: " + title);
    newPosts = [
      ...posts,
      {
        title,
        img,
        content,
        tags,
        isPublic,
      },
    ];
    setPosts(newPosts);
    console.log(newPosts);
    setTitle("");
    setImg("");
    setContent("");
  };
  return (
    <div className="container">
      <Header />

      <form
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
        className="row g-3 input-group mt-5"
      >
        {/* Titolo */}
        <div className="col-6">
          <input
            onChange={handleFormChange}
            name="title"
            type="text"
            className="form-title form-control"
            value={title}
            placeholder="Titolo"
          />
        </div>
        {/* Immagine */}
        <div className="col-6">
          <input
            onChange={handleFormChange}
            name="img"
            type="select"
            className="form-img form-control"
            value={img}
            placeholder="Immagine"
          />
        </div>
        {/* Categoria */}
        <div className="col-6">
          <select
            onChange={handleFormChange}
            name="tags"
            className="form-category form-select"
            aria-label="Default select example"
          >
            <option selected>Dietetico</option>
            <option>Vegano</option>
            <option>Vegetariano</option>
            <option>Senza glutine</option>
            <option>Energetico</option>
            <option>Ipocalorico</option>
          </select>
        </div>
        {/* Pubblico */}
        <div className="col-6">
          <select
            onChange={handleFormChange}
            name="isPublic"
            className="form-ispublic form-select"
            aria-label="Default select example"
          >
            <option value={true} selected>
              Pubblico
            </option>
            <option value={false}>Privato</option>
          </select>
        </div>
        <div className="col-12">
          <textarea
            onChange={handleFormChange}
            name="content"
            className="form-description  form-control textarea"
            value={content}
            placeholder="Descrizione"
          />
        </div>
        <button className="btn rounded btn-outline-secondary">Aggiungi</button>
      </form>
      <hr />
      <div className="row row-cols-3 g-3 mb-5 ">
        {/* Stampo una card per ogni elemento dell'array "titles" dinamicamente */}
        {posts.map((element) => {
          if (element.isPublic === "false") return;
          return (
            <>
              <div key={element} className="col">
                <div className="card">
                  <div className="img-container">
                    <img src={element.img} className="card-img-top" alt="..." />
                  </div>

                  <div className="card-body d-flex align-items-stretch justify-content-between flex-column">
                    <h5 className="card-title">{element.title}</h5>
                    <p className="card-text">{element.content}</p>
                    <div className="d-flex flex-row align-items-center  justify-content-between">
                      <div className="d-flex ">
                        {element.tags.map((tag) => {
                          return (
                            <div
                              href="#"
                              className="badge me-2 text-bg-primary"
                            >
                              {tag}
                            </div>
                          );
                        })}
                      </div>
                      <div>
                        <button className="btn btn-primary  me-3 ">
                          <i className=" fa-solid fa-pen"></i>
                        </button>
                        <button
                          className="btn btn-primary  "
                          onClick={() => deleteTitle(element)}
                        >
                          <i className=" fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default App;
