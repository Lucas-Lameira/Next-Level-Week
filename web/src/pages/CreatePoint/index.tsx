import React, {useEffect, useState, ChangeEvent} from 'react';
import {Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import {Map, TileLayer, Marker} from 'react-leaflet';
import axios from 'axios';
import {LeafletMouseEvent} from 'leaflet';

import api from '../../services/api';
import './styles.css';
import logo from '../../assets/logo.svg';

interface Item {
    id: number,
    title: string,
    image: string,
}

interface IBGEUFResponse {
    sigla: string
}

interface IBGECityResponse {
    nome: string
}

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);

    //inp = initialPosition
    const [inp , setInp] = useState<[number, number]>([0,0]);

    const [ufs, setUfs] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState('0');
    
    const [cities, setCities] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState('0');

    //spm = selectedPositionMap 
    const [spm , setSpm] = useState<[number, number]>([0,0]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;

            setInp([latitude, longitude]);
        });
    }, []);

    useEffect(() => {
        api.get('items').then(response => {
        //console.log(response);
            setItems(response.data);
        });
    } , []);


    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
//console.log(response);
            const ufInitials = response.data.map(uf => uf.sigla);
//console.log(ufInitials);
            setUfs(ufInitials);
        })
    },[]);

    useEffect(() => {
        if( selectedUf === '0') {
            return;
        }
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {            
        
        const cityNames = response.data.map(city => city.nome);
        
        setCities(cityNames);
        });
    }, [selectedUf]);


    function handleSelectedUf (event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;        
        setSelectedUf(uf);
    }

    function handleSelectedCity (event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;        
        setSelectedCity(city);
    }

    function handleClick (event: LeafletMouseEvent){
        setSpm([
            event.latlng.lat,
            event.latlng.lng
        ]);
        //console.log(event.latlng);
    }

    return(
        <div id="page-create-point">
            <header>
                <img src={logo} alt="logo Ecoleta"/>
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home    
                </Link> 
            </header>

            <form>
                <h1>Cadastro do ponto de coleta</h1>
                
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da Entidade</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input 
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                            />
                        </div>    
                    </div>

                </fieldset>

                <Map 
                    center={inp} //spm = selectedPositionMap 
                    zoom={15} 
                    onClick={handleClick}
                >
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={spm} /> 
                </Map>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf" value={selectedUf} onChange={handleSelectedUf}>
                                <option value="0">Selecione a UF</option>
                                    {ufs.map(uf =>{
                                        return(
                                        <option key={uf} value={uf}>{uf}</option>
                                        );
                                    })}
                            </select>
                        </div>
                        
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select 
                                name="city" 
                                id="city" 
                                value={selectedCity} 
                                onChange={handleSelectedCity}
                            >
                                <option value="0">Selecione uma Cidade</option>
                                {cities.map(city =>{
                                    return(
                                    <option key={city} value={city}>{city}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>                
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Itens de Coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item => (                    
                            <li key={item.id}>
                                <img src={item.image} alt={item.title}/>
                                <span>{item.title}</span>
                            </li>                        
                        ))}                        
                    </ul>
                </fieldset>
                <button type="submit">Cadastar ponto de coleta</button>
            </form>
        </div>

    );
}

export default CreatePoint;
