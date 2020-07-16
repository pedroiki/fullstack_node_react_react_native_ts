import React from "react";
import {FiLogIn} from 'react-icons/fi'
import './styles.css';
import logo from '../../assets/logo.svg';
import {Link} from "react-router-dom";

const Home = () => {
    /*****************************************************************************
     HTML
     *****************************************************************************/
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="Natal Rn Food"/>
                </header>
                <main>
                    <h1>RN Take-Away</h1>
                    <p>refeicoes na sua casa!.</p>
                    <Link to="/create-point"> {/*Não recarega as informações*/}
                        <span>
                            <FiLogIn/>
                        </span>
                        <strong>Cadastre o seu indereco para Entregas</strong>
                    </Link>
                </main>
            </div>
        </div>
    )
}

export default Home;
