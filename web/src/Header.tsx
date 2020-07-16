import React from 'react';

// Forma de definir a tipagem de um objeto, recebendo as props
interface HeaderProps {
    title: string; // Obrigatório, quando não é obrigatório colocar assim: ?title: string;
}

// FC = Function Component
const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header>
            <h1>{props.title}</h1>
        </header>
    )
}

export default Header;
