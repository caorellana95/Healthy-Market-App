import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { registerUser } from "../actions/userActions";
import { useDispatch } from "react-redux";
import NavBar from "./NavBar";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    surname: "",
    birthday: "",
    nationality: "",
    adress: { zip: "", city: "", adress: "" },
    email: "",
    password: "",
  });

  useEffect(() => {
    //console.log(form);
  }, []);

  const changeHandler = (e) => {
    if (
      e.target.name === "zip" ||
      e.target.name === "city" ||
      e.target.name === "adress"
    ) {
      setForm({
        ...form,
        adress: { ...form.adress, [e.target.name]: e.target.value },
      });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
    e.preventDefault();
    //console.log(form);
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  return (
    <div>
      <NavBar />
      <div className="grid text-center h-screen content-center gap-5 items-center mt-5">
        <h2 className="text-3xl font-bold">Crear Cuenta</h2>
        <div className="flex justify-center items-center bg-blue">
          <form className="w-full max-w-lg p-2">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Nombre
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Jane"
                  name="name"
                  value={form.name}
                  onChange={changeHandler}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Apellido
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Doe"
                  name="surname"
                  value={form.surname}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="email"
                  placeholder="jane@email.com"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Contraseña
                </label>
                <input
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="password"
                  placeholder="******************"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2 py-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  Pais
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    onChange={changeHandler}
                    name="nationality"
                  >
                    <option value="">Páis</option>
                    <option value="Argentina">Argentina</option>
                    <option value="México">México</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Chile">Chile</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  Ciudad
                </label>
                <input
                  name="city"
                  value={form.adress.city}
                  onChange={changeHandler}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Córdoba"
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-zip"
                >
                  Código Postal
                </label>
                <input
                  name="zip"
                  value={form.adress.zip}
                  onChange={changeHandler}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="5501"
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-center -mx-3 mb-6 pt-2">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  Dirección
                </label>
                <input
                  name="adress"
                  value={form.adress.adress}
                  onChange={changeHandler}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Av. General Alvear 550"
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mx-auto">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  Fecha de Nacimiento
                </label>
                <div className="relative">
                  <input
                    type="date"
                    placeholder="+18"
                    name="birthday"
                    value={form.birthday}
                    onChange={changeHandler}
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    ></svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex m-auto justify-center items-center py-5 gap-4">
              <Link to="/login">Iniciar Sessión</Link>
              <button
                onClick={handleOnClick}
                className=" bg-green1 hover:bg-hoverGreen1 text-white font-bold py-2 px-4 rounded"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
