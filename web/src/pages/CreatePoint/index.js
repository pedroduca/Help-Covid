import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Map, TileLayer, Marker } from "react-leaflet";
import { FiCheckCircle } from "react-icons/fi";
import { mask, unMask } from "remask";

import axios from "axios";
import api from "../../services/api";

import BackTo from "../../Components/BackTo";
import Input from "../../Components/Input";
import Select from "../../Components/Select";
import AlertError from "../../Components/AlertError";
import Dropzone from "../../Components/Dropzone";

import "./style.css";

function CreatePoint() {
  const history = useHistory();

  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");

  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [ufs, setUfs] = useState([]);
  const [cities, setCities] = useState([]);
  const [initialPosition, setInitialPosition] = useState([0, 0]);
  const [selectedFile, setSelectedFile] = useState();

  const [formData, setFormData] = useState({
    title: "",
    whatsapp: "",
    address: "",
    neighborhood: "",
    numbering: "",
  });

  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [selectedPosition, setSelectedPosition] = useState([0, 0]);

  // Posiciona o mapa conforme a localização
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api.get("/items").then((res) => setItems(res.data));
  }, []);

  // Adiciona API ibge no imput UF
  useEffect(() => {
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((res) => {
        const ufInitials = res.data.map((uf) => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  // Adiciona API ibge no imput cidade conforme UF
  useEffect(() => {
    if (selectedUf === "0") return;

    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((res) => {
        const cities = res.data.map((city) => city.nome);

        setCities(cities);
      });
  }, [selectedUf]);

  // Verificação de item selecionado
  function handleSelectItem(id) {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    if (name === "whatsapp") {
      const originalValue = unMask(value);
      const maskedValue = mask(originalValue, [
        "(99) 9999-9999",
        "(99) 9 9999-9999",
      ]);
      setFormData({ ...formData, [name]: maskedValue });
      return;
    }

    setFormData({ ...formData, [name]: value });
  }

  //
  function handleMapCity(event) {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }

  // Verificação se todos os campos estão preenchidos e salva no banco
  async function handleSubmit(event) {
    event.preventDefault();

    const { title, whatsapp, address, neighborhood, numbering } = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const items = selectedItems;
    const [latitude, longitude] = selectedPosition;
    // verificação simples de preenchimento
    if (
      !selectedFile ||
      !title ||
      !whatsapp ||
      !address ||
      !neighborhood ||
      !numbering ||
      !uf ||
      !city ||
      !items ||
      !latitude ||
      !longitude
    ) {
      return setError("Informe todos os campos!");
    }

    const data = new FormData();

    data.append("title", title);
    data.append("whatsapp", whatsapp);
    data.append("address", address);
    data.append("neighborhood", neighborhood);
    data.append("numbering", String(numbering));
    data.append("uf", uf);
    data.append("city", city);
    data.append("items", items);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));

    if (selectedFile) {
      data.append("image", selectedFile);
    }

    try {
      await api.post("/user/points", data);

      setSucess("Cadastro concluído!");

      setTimeout(() => {
        history.push("/user/profile");
      }, 3000);
    } catch (e) {
      setError("Um erro aconteceu! Tente novamente");
    }
  }

  return (
    <div id="page-create-point">
      <AlertError error={error} onclick={() => setError("")} />

      {sucess ? (
        <div className="sucess">
          <FiCheckCircle className="sucess-icon" />
          {sucess}
        </div>
      ) : (
        ""
      )}

      <BackTo to="/user/profile" back="Profile" />

      <form action="/user/points" method="POST" onSubmit={handleSubmit}>
        <h1>
          Cadastro do <br /> Ponto de doação
        </h1>

        <Dropzone onFile={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <Input
            title="Nome do estabelecimento"
            type="text"
            htmlfor="title"
            value={formData.title}
            onchange={handleInputChange}
          />

          <Input
            title="Whatsapp ou Telefone"
            type="text"
            htmlfor="whatsapp"
            value={formData.whatsapp}
            onchange={handleInputChange}
          />
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
          </legend>
          <legend>
            <span>Selecione o endereço no mapa para maior precisão</span>
          </legend>

          <Map center={initialPosition} zoom={15} onClick={handleMapCity}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <Select
              title="Estado"
              htmlfor="uf"
              option="Selecione uma UF"
              value={selectedUf}
              onchange={(e) => setSelectedUf(e.target.value)}
              array={ufs}
            />

            <Select
              title="Cidade"
              htmlfor="city"
              option="Selecione uma cidade"
              value={selectedCity}
              onchange={(e) => setSelectedCity(e.target.value)}
              array={cities}
            />
          </div>

          <div className="field-group-3">
            <Input
              title="Endereço"
              type="text"
              htmlfor="address"
              value={formData.address}
              onchange={handleInputChange}
            />

            <Input
              title="Bairro"
              type="text"
              htmlfor="neighborhood"
              value={formData.neighborhood}
              onchange={handleInputChange}
            />

            <Input
              title="Número"
              type="number"
              htmlfor="numbering"
              value={formData.numbering}
              onchange={handleInputChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Itens de Doação</h2>
          </legend>

          <ul className="items-grid">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelectItem(item.id)}
                className={selectedItems.includes(item.id) ? "selected" : ""}
              >
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit" className="btn">
          Cadastrar ponto de doação
        </button>
      </form>
    </div>
  );
}

export default CreatePoint;
