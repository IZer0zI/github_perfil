import styles from './Perfil.module.css';

// export default () => {
// export default function() {
const Perfil = ({ nomeUsuario }) => {
    // const usuario = {
    //     nome: 'Raphael Vieira',
    //     avatar: 'https://avatars.githubusercontent.com/u/165111113?s=400&u=5023f4fde768b2ca9f336e007607d4c0c599e05a&v=4',
    // }

    return (
        <header className={styles.header}>
            <img className={styles.avatar} src={`https://github.com/${nomeUsuario}.png`} />
            <h1 className={styles.name} >
                {nomeUsuario}
            </h1>
        </header>
    )
}

export default Perfil;