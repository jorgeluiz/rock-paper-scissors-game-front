import * as React from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandRock, faHandPaper, faHandScissors, faHandLizard, faHandSpock } from '@fortawesome/free-solid-svg-icons'

import MatchesResult from 'Components/MatchesResult';

import gamesService from 'Services/games';

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            loading: false,
            name: '',
            opponents: 1,
            chosenOption: '',
            gameResult: [],
        };
    }

    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({ [name]: value });
    }

    submit = async () => {
        this.setState({ error: false, message: '', loading: true });
        let { name, opponents, chosenOption } = this.state;
        let error = false, message = '';
        if (name && opponents && chosenOption) {
            //Evita mandar mais que 99 oponentes pra API
            if (opponents > 99) {
                opponents = 99
            }
            let postData = { name: name, totalOpponents: opponents, chosenOption: chosenOption };
            try {
                const response = await gamesService.add(postData);
                this.setState({ loading: false, error: error, message: message, gameResult: response, chosenOption: '' });
            } catch (err) {
                this.setState({
                    loading: false,
                    error: true,
                    message: err.message
                });
            }
        } else {
            error = true;
            message = 'Por favor, preencha todos os campos!';

            this.setState({ loading: false, error: error, message: message });
        }
    }

    clear = () => {
        this.setState({ gameResult: [] });
    }

    render() {
        const { error, message, gameResult, loading } = this.state;
        return (
            <Container>
                <Row style={{ marginTop: 50 }}>
                    <Col>
                        {loading == false && error == true && (<Alert variant="danger">{message}</Alert>)}
                        {loading == false && gameResult.length != 0 && (
                            <Card>
                                <Card.Body>
                                    <h3>Rock, Paper, Scissors, etc...</h3>
                                    <Row>
                                        <Col>
                                            <h5 className="text-center">{gameResult.hasWinner == true ? <span><strong>{gameResult.winner.player.name}</strong> <span className="text-success">venceu a partida!</span></span> : 'Rolou um empate...'}</h5>
                                            <Row className="text-center" style={{ paddingTop: 20 }}>
                                                {gameResult.hasWinner == true ?
                                                    <Col md={4}>
                                                        <MatchesResult matchInfo={gameResult.winner} />
                                                    </Col> :
                                                    gameResult.tied.map((element, index) =>
                                                        <Col key={index} md={4}>
                                                            <MatchesResult matchInfo={element} />
                                                        </Col>)}
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button className="pull-right" onClick={this.clear}>Jogar novamente!</Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        )}
                        {loading == false && gameResult.length == 0 && (
                            <Card>
                                <Card.Body>
                                    <h3>Rock, Paper, Scissors, etc...</h3>
                                    <Row style={{ paddingBottom: 20 }}>
                                        <Col>
                                            <Form.Group className="mb-6">
                                                <Form.Label>Qual é o seu nome?</Form.Label>
                                                <Form.Control value={this.state.name || ""} onChange={this.handleChange} name="name" type="text" placeholder="Digite o seu nome..." />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-6">
                                                <Form.Label>Com quantos oponentes (NPC) quer jogar?</Form.Label>
                                                <Form.Control value={this.state.opponents || ""} onChange={this.handleChange} name="opponents" type="number" maxLength={2} max={99} step={1} placeholder="Digite um número de 1 a 99..." />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label as="legend" column sm={2}>
                                                    Qual é a sua jogada?
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        label={<span>Pedra <br /><FontAwesomeIcon icon={faHandRock} size={"4x"} /></span>}
                                                        name="chosenOption"
                                                        value="rock"
                                                        id="radioRock"
                                                        onChange={this.handleChange}
                                                    />
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        label={<span>Papel <br /><FontAwesomeIcon icon={faHandPaper} size={"4x"} /></span>}
                                                        name="chosenOption"
                                                        value="paper"
                                                        id="radioPaper"
                                                        onChange={this.handleChange}
                                                    />
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        label={<span>Tesoura <br /><FontAwesomeIcon icon={faHandScissors} size={"4x"} /></span>}
                                                        name="chosenOption"
                                                        value="scissors"
                                                        id="radioScissors"
                                                        onChange={this.handleChange}
                                                    />
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        label={<span>Lagarto <br /><FontAwesomeIcon icon={faHandLizard} size={"4x"} /></span>}
                                                        name="chosenOption"
                                                        value="lizard"
                                                        id="radioLizard"
                                                        onChange={this.handleChange}
                                                    />
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        label={<span>Spock <br /><FontAwesomeIcon icon={faHandSpock} size={"4x"} /></span>}
                                                        name="chosenOption"
                                                        value="spock"
                                                        id="radioSpock"
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button className="pull-right" onClick={this.submit}>Jogar!</Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
};
