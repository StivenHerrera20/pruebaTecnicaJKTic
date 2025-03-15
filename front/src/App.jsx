import { useState, useRef, useEffect } from "react";
import backgroundImg from "../src/assets/images/fondoLogin.jpg";

function App() {
  const [count, setCount] = useState(0);
  const inputUser = useRef("");
  const inputPassword = useRef("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(
    localStorage.length > 0 ? "welcome" : "login"
  );

  const login = (e) => {
    setIsLoading("loading");
    e.preventDefault();
    const userData = {
      username: inputUser.current.value,
      password: inputPassword.current.value,
    };
    setTimeout(() => {
      if (userData.password.length >= 6) {
        if (
          userData.username == "stiven@gmail.com" &&
          userData.password == "1234567"
        ) {
          localStorage.setItem("user", JSON.stringify(userData));
          setIsLoading("success");
          setPage("welcome");
          console.log("Usuario guardado:", userData);
        } else {
          setIsLoading("Error");
          setError("Usuario o Contraseña incorrecta");
        }
      } else {
        setIsLoading("Error");
        setError("La contraseña debe ser minimo de 6 caracteres");
      }
    }, 2000);
  };

  return (
    <>
      <div className="bg-image img-background">
        <div className="row mx-0 px-0 h-100">
          <div className="col-12 d-flex justify-content-center align-items-center">
            {page == "login" ? (
              <div className="card shadow border-info ">
                <h3 className="text-center fw-bold mb-5 text-info">
                  Iniciar sesión
                </h3>
                <form action="" className="h-100" onSubmit={login}>
                  <div className="form-floating mb-3 mt-3 mt-md-5">
                    <input
                      type="email"
                      className="form-control"
                      ref={inputUser}
                      placeholder="name@example.com"
                    />
                    <label for="floatingInputUser">Usuario</label>
                  </div>
                  <div className="form-floating  mb-3">
                    <input
                      type="password"
                      className="form-control"
                      ref={inputPassword}
                      placeholder=""
                    />
                    <label for="floatingInputPassword">Contraseña</label>
                  </div>
                  <div className="footer">
                    {isLoading == "loading" ? (
                      <button
                        type="submit"
                        className="btn btn-outline-info w-100 d-flex justify-content-center  "
                        disabled
                      >
                        <div
                          className="spinner-border text-info "
                          role="status"
                        >
                          <span className="visually-hidden"></span>
                        </div>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-outline-info w-100 "
                      >
                        Ingresar
                      </button>
                    )}
                    {isLoading == "Error" ? (
                      <div className="alert alert-danger mt-3" role="alert">
                        Error: {error}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </form>
              </div>
            ) : (
              <>
                <div className="card shadow border-info  d-flex flex-column">
                  <h1 className="text-center text-white fw-bold my-auto">
                    BIENVENIDO{" "}
                  </h1>
                  <button
                    className="btn btn-outline-danger w-100 "
                    onClick={() => {
                      localStorage.clear();
                      setPage("login");
                    }}
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="overlay"></div>
      </div>
    </>
  );
}

export default App;
