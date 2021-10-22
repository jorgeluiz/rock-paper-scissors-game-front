import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandRock, faHandPaper, faHandScissors, faHandLizard, faHandSpock } from '@fortawesome/free-solid-svg-icons'

export default class MatchesResult extends React.Component {
    constructor(props) {
        super(props);
    }

    readableOption = (chosenOption) => {
        switch (chosenOption) {
            case 'rock': { return <span>Pedra <FontAwesomeIcon icon={faHandRock} size={"lg"} /></span> } break;
            case 'paper': { return <span>Papel <FontAwesomeIcon icon={faHandPaper} size={"lg"} /></span> } break;
            case 'scissors': { return <span>Tesoura <FontAwesomeIcon icon={faHandScissors} size={"lg"} /></span> } break;
            case 'lizard': { return <span>Lagarto <FontAwesomeIcon icon={faHandLizard} size={"lg"} /></span> } break;
            case 'spock': { return <span>Spock <FontAwesomeIcon icon={faHandSpock} size={"lg"} /></span> } break;
        }

    }

    render() {
        const { matchInfo } = this.props;
        return (
            <Card>
                <Card.Body>
                    <h5 className="text-center">{matchInfo.player.name} ({this.readableOption(matchInfo.player.chosenOption)})</h5>
                    {matchInfo.wonMatches.map((element, index) => <p key={`win-${index}`}><span className="text-success">Venceu</span> <strong>{element.name}</strong> que escolheu {this.readableOption(element.chosenOption)}</p>)}
                    {matchInfo.losedMatches.map((element, index) => <p key={`lose-${index}`}><span className="text-danger">Perdeu</span> para <strong>{element.name}</strong> que escolheu {this.readableOption(element.chosenOption)}</p>)}
                    {matchInfo.tiedMatches.map((element, index) => <p key={`tied-${index}`}><span className="text-primary">Empatou</span> com <strong>{element.name}</strong> que escolheu {this.readableOption(element.chosenOption)}</p>)}
                </Card.Body>
            </Card>
        );
    }
}

