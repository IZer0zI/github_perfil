import { useEffect, useState } from "react";
import styles from './ReposList.module.css';

const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [deuErro, setDeuErro] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");

    useEffect(() => {
        if (!nomeUsuario) {
            setDeuErro(true);
            setMensagemErro("O nome de usuário não pode estar vazio.");
            setEstaCarregando(false);
            return;
        }

        setEstaCarregando(true);
        setDeuErro(false);
        setMensagemErro("");

        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Erro ao buscar os repositórios");
                }
                return res.json();
            })
            .then(resJson => {
                setEstaCarregando(false);
                setRepos(resJson);
            })
            .catch(e => {
                setDeuErro(true);
                setMensagemErro(e.message);
                setEstaCarregando(false);
            });
    }, [nomeUsuario]);

    return (
        <div className="container">
            {estaCarregando ? (
                <h1>Carregando...</h1>
            ) : deuErro ? (
                <h1>{mensagemErro}</h1>
            ) : (
                <ul className={styles.list}>
                    {repos.map(({ id, name, language, html_url }) => (
                        <li className={styles.listItem} key={id}>
                            <div className={styles.itemName}>
                                <b>Nome:</b> {name}
                            </div>
                            <div className={styles.itemLanguage}>
                                <b>Linguagem:</b> {language}
                            </div>
                            <a className={styles.itemLink} target="_blank" href={html_url} rel="noopener noreferrer">Visitar no Github</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ReposList;
