import React, { Component } from "react";
import api from "../services/api";
import moment from "moment";
import { Container, Form } from "../styles/pages/main";
import CompareList from "../components/CompareList";
import logo from "../assets/logo.png";

export default class Main extends Component {
  state = {
    repositoryError: false,
    repositoryInput: "",
    loading: false,
    repositories: []
  };

  componentDidMount() {
    this.loadStorage();
  }

  loadStorage = () => {
    this.setState({
      repositories: JSON.parse(localStorage.getItem("repositoryStorage")) || []
    });
  };

  saveToStorage = storages => {
    localStorage.setItem("repositoryStorage", JSON.stringify(storages));
  };

  handleAddRepository = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(
        `/repos/${this.state.repositoryInput}`
      );

      repository.last_commit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryInput: "",
        repositories: [...this.state.repositories, repository],
        repositoryError: false
      });

      this.saveToStorage(this.state.repositories);
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleUpdateRepository = async ({ id, full_name: fullname }) => {
    const repos = JSON.parse(await localStorage.getItem("repositoryStorage"));
    const { data: repository } = await api.get(`repos/${fullname}`);

    repository.last_commit = moment(repository.pushed_at).fromNow();

    const repositories = repos.map(
      repo => (repo.id === id ? repository : repo)
    );

    this.setState({ repositories });

    await localStorage.setItem(
      "repositoryStorage",
      JSON.stringify(repositories)
    );
  };

  handleRemoveRepository = async ({ id }) => {
    const repos = JSON.parse(await localStorage.getItem("repositoryStorage"));
    const repositories = repos.filter(repo => repo.id !== id);

    this.setState({ repositories });

    await localStorage.setItem("@Bootcamp:repos", JSON.stringify(repositories));
  };

  render() {
    return (
      <Container>
        <img src={logo} alt="Github Compare Logo" />
        <Form
          withError={this.state.repositoryError}
          onSubmit={this.handleAddRepository}
        >
          <input
            type="text"
            placeholder="user/repository"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">
            {this.state.loading ? (
              <i className="fa fa-spinner fa-pulse" />
            ) : (
              "OK"
            )}
          </button>
        </Form>
        <CompareList
          handleUpdateRepository={this.handleUpdateRepository}
          handleRemoveRepository={this.handleRemoveRepository}
          repositories={this.state.repositories}
        />
      </Container>
    );
  }
}
