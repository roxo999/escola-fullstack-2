
import Header from "../components/header";

const styles = `
  .home {
    min-height: calc(100vh - 80px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px 20px;
    background:
      radial-gradient(
        circle at top right,
        #4a0b0b 0%,
        #250709 35%,
        #0d0203 100%
      );
  }

  .home-card {
    width: 100%;
    max-width: 950px;
    padding: 60px 45px;
    text-align: center;
    background: linear-gradient(
      145deg,
      #2d090c,
      #160405
    );
    border: 1px solid rgba(220, 38, 38, 0.25);
    border-radius: 20px;
    box-shadow:
      0 25px 70px rgba(0, 0, 0, 0.55),
      inset 0 1px 0 rgba(255, 255, 255, 0.03);
  }

  .school-tag {
    display: inline-block;
    margin-bottom: 25px;
    padding: 8px 18px;
    border: 1px solid rgba(220, 38, 38, 0.3);
    border-radius: 30px;
    background: rgba(127, 29, 29, 0.2);
    color: #fca5a5;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.5px;
  }

  .home-title {
    margin: 0;
    color: #ffffff;
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 700;
    line-height: 1.15;
  }

  .home-title span {
    color: #dc2626;
  }

  .home-description {
    max-width: 650px;
    margin: 22px auto 35px;
    color: #a1a1aa;
    font-size: 17px;
    line-height: 1.7;
  }

  .home-buttons {
    display: flex;
    justify-content: center;
    gap: 14px;
    flex-wrap: wrap;
  }

  .home-button {
    display: inline-block;
    padding: 13px 25px;
    border-radius: 8px;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.25s ease;
  }

  .button-primary {
    background: #991b1b;
    color: #ffffff;
    box-shadow: 0 8px 20px rgba(153, 27, 27, 0.25);
  }

  .button-primary:hover {
    background: #b91c1c;
    transform: translateY(-2px);
  }

  .button-secondary {
    background: transparent;
    color: #fca5a5;
    border: 1px solid rgba(220, 38, 38, 0.4);
  }

  .button-secondary:hover {
    background: rgba(127, 29, 29, 0.2);
    color: #ffffff;
  }

  @media (max-width: 600px) {
    .home {
      padding: 30px 15px;
    }

    .home-card {
      padding: 45px 20px;
    }

    .home-description {
      font-size: 15px;
    }
  }
`;

export default function Principal() {
  return (
    <>
      <style>{styles}</style>

      <Header />

      <main className="home">
        <section className="home-card">

          <div className="school-tag">
            SESI 323 • MIRANDÓPOLIS
          </div>

          <h2 className="home-title">
            Bem-vindo ao
            <br />
            <span>Sistema Escolar</span>
          </h2>

          <p className="home-description">
            Uma plataforma para facilitar o gerenciamento
            de alunos, notas e turmas do SESI Mirandópolis.
          </p>

          <div className="home-buttons">
            <a
              href="/cadastro"
              className="home-button button-primary"
            >
              Área dos Alunos
            </a>

            <a
              href="/notas"
              className="home-button button-secondary"
            >
              Notas
            </a>
          </div>

        </section>
      </main>
    </>
  );
}

