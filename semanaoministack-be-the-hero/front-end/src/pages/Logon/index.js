import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';
import api from '../../services/api';

import './style.css';

import LogoImg from '../../assets/logo.svg'
import herosImg from '../../assets/heroes.png';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const reponse = await api.post('sessions', { id });
            
            localStorage.setItem('ongs', id);
            localStorage.setItem('ongName', reponse.data.name);
            history.push('/profile')
        } catch (err) {
            alert('Falha no login');
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={LogoImg} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça sua logon</h1>

                    <input 
                        placeholder="Sua ID" 
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={herosImg} alt="Heros"/>
        </div>

    );
}