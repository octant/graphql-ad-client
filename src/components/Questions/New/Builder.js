import React, { Component } from "react";
import { Container, Col, Row, Button } from "reactstrap";

import { alternatives as preSets } from "./schema";
import RootForm from "./Stem";
import SubformExample from "./Alternative";
import { characterAtIndex } from "../../../lib/utils/range";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.rootRef = React.createRef();
    this.subformRefs = {
      alternatives: []
    };

    this.state = {
      isValid: false
    };
  }

  componentDidMount() {
    this.state.alternatives.map(() =>
      this.subformRefs.alternatives.push(React.createRef())
    );
  }

  static getDerivedStateFromProps(props, state) {
    if (state.type !== props.type) {
      return {
        ...state,
        type: props.type,
        alternatives: [...preSets[props.type]]
      };
    } else {
      return null;
    }
  }

  handleSubmit = () => {
    const { isValid, ...question } = this.state;

    this.props.methods.submit(question);
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value }, this.isValid);
  };

  handleSubformChange = name => (key, value) => {
    this.setState(
      state => ({
        [name]: { ...state[name], [key]: value }
      }),
      this.isValid
    );
  };

  handleSubformListChange = (name, index) => (key, value) => {
    const list = [...this.state[name]];
    list[index][key] = value;

    this.setState(
      {
        [name]: [...list]
      },
      this.isValid
    );
  };

  isValid = () => {
    const { props, state } = this.rootRef.current;
    const subformsAreValid = this.subformRefs.alternatives.reduce((a, r) => {
      const { props, state } = r.current;
      return props.schema.isValid(state) && a;
    }, true);

    this.setState({ isValid: props.schema.isValid(state) && subformsAreValid });
  };

  handleAddAlternative = () => {
    this.subformRefs.alternatives.push(React.createRef());
    this.setState(
      state => ({
        alternatives: [
          ...state.alternatives.map((a, i) => ({
            ...a,
            value: characterAtIndex(i)
          })),
          { value: characterAtIndex(state.alternatives.length) }
        ]
      }),
      this.isValid
    );
  };

  handleRemoveAlternative = i => () => {
    this.setState(
      state => ({
        alternatives: [
          ...state.alternatives.slice(0, i),
          ...state.alternatives.slice(i + 1)
        ].map((a, i) => ({ ...a, value: characterAtIndex(i) }))
      }),
      () => {
        this.subformRefs.alternatives = this.subformRefs.alternatives.slice(
          0,
          -1
        );
        this.isValid();
      }
    );
  };

  handleInit = form =>
    this.setState(state => ({ ...state, ...form }), this.isValid);

  handleSubformInit = name => form => {
    this.setState(
      {
        [name]: { ...form }
      },
      this.isValid
    );
  };

  handleSubformListInit = name => form => {
    this.setState(
      state => ({ [name]: [...state[name], ...form] }),
      this.isValid
    );
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <RootForm
              name="stem"
              ref={this.rootRef}
              methods={{
                change: this.handleChange,
                init: this.handleInit,
                submit: this.handleSubmit
              }}
              values={this.state}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Alternatives</h2>
            {this.state.alternatives.map((a, i) => (
              <div key={`alternatives-${this.props.type}-${i}`}>
                <h3>
                  {this.state["alternatives"][i].value}){" "}
                  {this.state.type === "mc" ? (
                    <Button
                      color="danger"
                      onClick={this.handleRemoveAlternative(i)}
                    >
                      -
                    </Button>
                  ) : (
                    ""
                  )}
                </h3>
                <SubformExample
                  name={`alternative-${i}`}
                  ref={this.subformRefs["alternatives"][i]}
                  methods={{
                    init: this.handleSubformInit,
                    submit: this.handleSubmit,
                    change: this.handleSubformListChange("alternatives", i)
                  }}
                  values={this.state["alternatives"][i]}
                />
              </div>
            ))}
          </Col>
        </Row>

        {this.state.type === "mc" ? (
          <Row>
            <Col>
              <Button color="success" onClick={this.handleAddAlternative}>
                +
              </Button>
            </Col>
          </Row>
        ) : (
          ""
        )}
        <hr />
        <Row>
          <Col>
            <Button
              color="primary"
              onClick={this.handleSubmit}
              disabled={!this.state.isValid}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
