import React, { Component } from "react";
import "../css/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Cookies from "universal-cookie";

//const baseUrl = "http://localhost/empleados/?consultar=";
const baseUrl = "http://localhost/empleados/";

const cookies = new Cookies();

class Login extends Component {
  state = {
    form: {
      nombre: "",
      correo: "",
    },
  };

  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  iniciarSesion = async () => {
    await axios
      .get(baseUrl, {
        params: {
          nombre: this.state.form.nombre,
          correo: this.state.form.correo,
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response.length > 0) {
          var respuesta = response[0];
          cookies.set("id", respuesta.id, { path: "/" });

          cookies.set("nombre", respuesta.nombre, { path: "/" });
          cookies.set("correo", respuesta.correo, { path: "/" });
          alert(`Bienvenido ${respuesta.nombre}`);
          window.location.href = "./menu";
        } else {
          alert("El usuario o el correo no son correctos");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    if (cookies.get("nombre")) {
      window.location.href = "./menu";
    }
  }

  render() {
    return (
      <div className="containerPrincipal">
        <div className="containerSecundario">
          <div className="form-group">
            <label>Usuario: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nombre"
              onChange={this.handleChange}
            />
            <br />
            <label>Contraseña: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="correo"
              onChange={this.handleChange}
            />
            <br />
            <button
              className="btn btn-primary"
              onClick={() => this.iniciarSesion()}
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
