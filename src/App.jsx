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
        console.log(data.posts);
        setPosts(data.posts);
      });
  };

  const fetchCreatePost = (data) => {
    fetch(`http://localhost:3000/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const fetchDeletePost = (data) => {
    fetch(`http://localhost:3000/posts/${data}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  const [posts, setPosts] = useState([]);

  const [inputValue, setInputValue] = useState("");

  const [form, setForm] = useState({
    title: "",
    content: "",
    img: "",
    tags: [""],
  });
  let newPosts = [...posts];

  // - Funzione per eliminare un post
  const deleteTitle = (element) => {
    const index = newPosts.indexOf(element);

    if (index > -1) {
      console.log(`Eliminato il titolo: "${newPosts[index].title}"`);

      newPosts.splice(index, 1);
      setPosts(newPosts);

      fetchDeletePost(element.id);
    }
  };

  // - Alla modifica del form
  const handleFormChange = (e) => {
    let newForm = {
      ...form,
      [e.target.id]: e.target.value,
    };
    if (e.target.id === "tags") {
      newForm = {
        ...form,
        [e.target.id]: [e.target.value],
      };
    }
    setForm(newForm);
  };

  // - All'invio del form
  const handleFormSubmit = (e) => {
    event.preventDefault();
    e.target.tags.value = 0;
    if (!form.title) return;
    if (!form.img) return;
    if (!form.tags) return;
    setInputValue({
      title,
      img,
      content,
      tags,
      isPublic,
    });

    console.log("Aggiunto " + form.title);
    newPosts = [...posts, form];
    setPosts(newPosts);

    fetchCreatePost(form);
    setForm({
      title: "",
      content: "",
      img: "",
      tags: [""],
    });
  };
  return (
    <div className="container">
      <Header />
      <hr />
      <h2>Aggiungi un post</h2>
      <form onSubmit={handleFormSubmit} className="row g-3 input-group mt-2">
        {/* Titolo */}
        <div className="col-6">
          <input
            onChange={handleFormChange}
            id="title"
            type="text"
            className="form-title form-control"
            value={form.title}
            placeholder="Titolo"
          />
        </div>
        {/* Immagine */}
        <div className="col-6">
          <input
            onChange={handleFormChange}
            id="img"
            type="select"
            className="form-img form-control"
            value={form.img}
            placeholder="Immagine"
          />
        </div>
        {/* Categoria */}
        <div className="col-6">
          <select
            onChange={handleFormChange}
            id="tags"
            className="form-category form-select"
            aria-label="Default select example"
          >
            <option value={0} disabled selected>
              Categoria
            </option>
            <option>Dietetico</option>
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
            id="isPublic"
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
            id="content"
            className="form-description  form-control textarea"
            value={form.content}
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
                      <div className="d-flex">
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
