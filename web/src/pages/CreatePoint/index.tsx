import './styles.css';
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import logo from "../../assets/logo.svg";
import {FiArrowLeft} from 'react-icons/fi';
import {Map, Marker, TileLayer} from 'react-leaflet';
import api from "../../services/api";
import axios from 'axios';
import {LeafletMouseEvent} from 'leaflet';
import Dropzone from "../../components/Dropzone";

/*****************************************************************************
 INTERFACE
 *****************************************************************************/
interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface IbgeUfResponse {
    sigla: string;
}

interface IbgeCityResponse {
    nome: string;
}

const CreatePoint = () => {

    const history = useHistory();

    /*****************************************************************************
     STATE
     *****************************************************************************/
        // <Item[]> - Do tipo Item
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState<string>('0');
    const [selectedCity, setSelectedCity] = useState<string>('0');
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    });
    const [selectedFile, setSelectedFile] = useState<File>();

    /*****************************************************************************
     EFFECT
     *****************************************************************************/
    useEffect(() => {
        // Mostra de onde o usuário acessa o computador
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;
            setInitialPosition([latitude, longitude]);
        })
    }, []);
    // É desparada uma unica vez, mounted, Para executar ao alterar um valor, só passar o valor no lugar do []
    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        });
    }, []);
    useEffect(() => {
        axios
            .get<IbgeUfResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                const ufInitials = response.data.map(uf => uf.sigla);
                setUfs(ufInitials);
            });
    }, []);
    // Carregar quando a UF mudar
    useEffect(() => {
        if (selectedUf === '0') return;

        axios
            .get<IbgeCityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(response => {
                const cityInitials = response.data.map(city => city.nome);
                setCities(cityInitials);
            });
    }, [selectedUf]);

    /*****************************************************************************
     FUNCTION
     *****************************************************************************/
    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        setSelectedUf(uf);
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        setSelectedCity(city);
    }

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([event.latlng.lat, event.latlng.lng]);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        // [name]: value - significa - name: 'Gustavo'
        setFormData({...formData, [name]: value});
    }

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id);
        if (alreadySelected >= 0) {
            // remove
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
        } else {
            // add
            setSelectedItems([...selectedItems, id]);
        }
    }

    async function handleSubmit(event: FormEvent) {
        // Não fazer o reload
        event.preventDefault();

        const {name, email, whatsapp} = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;
        const image = selectedFile;

        // Enviar um MultiPart por causa do file
        const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('uf', uf);
        data.append('city', city);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('items', items.join(","));

        if (selectedFile)
            data.append('image', selectedFile);

        await api.post('/points', data);

        alert("É TETRA!");

        // Vai para a home
        history.push('/');
    }

    /*****************************************************************************
     HTML
     *****************************************************************************/
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Natal Rn Food"/>
                <Link to="/">
                    <FiArrowLeft/>
                    Voltar para home
                </Link>
            </header>
            <form onSubmit={handleSubmit}>
                <h1>Cadastro do<br/> ponto de Entrega</h1>
                {/*Enviando uma função para o Dropzone*/}
                <Dropzone onFileUploaded={setSelectedFile}/>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome da entidade ou cliente</label>
                        <input type="text" name="name" id="name" onChange={handleInputChange}/>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" onChange={handleInputChange}/>
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange}/>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>
                    {/*Verifiquei nessa URL - https://www.google.com.br/maps/@-22.8329375,-47.2132372,15z*/}
                    <Map
                        center={initialPosition}
                        zoom={15}
                        onClick={handleMapClick}
                    >
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {/*Marca a posição clicada no mapa*/}
                        <Marker position={selectedPosition}/>
                    </Map>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">UF</label>
                            <select
                                name="uf"
                                id="uf"
                                value={selectedUf}
                                onChange={handleSelectUf}
                            >
                                <option value="0">Selecione o Estado em que reside</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select
                                name="city"
                                id="city"
                                value={selectedCity}
                                onChange={handleSelectCity}
                            >
                                <option value="0">Selecione uma Cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Tipo de comida para Entrega</h2>
                        <span>Selecione um ou mais itens </span>
                    </legend>
                    <ul className="items-grid">
                        {
                            items.map(item => (
                                <li
                                    key={item.id}
                                    onClick={() => handleSelectItem(item.id)}
                                    className={selectedItems.includes(item.id) ? 'selected' : ''}
                                >
                                    {/* altera o tamanho de todas as imagens */}
                                    <img width="33px" height="33px" src={item.image_url} alt={item.title}/>
                                    <span>{item.title}</span>
                                </li>
                            ))
                        }
                    </ul>
                </fieldset>
                <button type="submit">Cadastrar o local para entrega.</button>
            </form>
        </div>
    )
}

export default CreatePoint;
