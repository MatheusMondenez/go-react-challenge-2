import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Repository,
  Action
} from "../styles/components/compare-list";

const CompareList = ({
  repositories,
  handleUpdateRepository,
  handleRemoveRepository
}) => (
  <Container>
    {repositories.map(repository => (
      <Repository key={repository.id}>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
        </header>
        <ul>
          <li>
            {repository.stargazers_count} <small>stars</small>
          </li>
          <li>
            {repository.forks_count} <small>forks</small>
          </li>
          <li>
            {repository.open_issues_count} <small>issues</small>
          </li>
          <li>
            {repository.last_commit} <small>last commit</small>
          </li>
        </ul>
        <Action>
          <button onClick={handleUpdateRepository.bind(this, repository)}>
            <i className="fa fa-arrow-down" /> Update
          </button>
          <button onClick={handleRemoveRepository.bind(this, repository)}>
            <i className="fa fa-times" /> Remove
          </button>
        </Action>
      </Repository>
    ))}
  </Container>
);

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      pushed_at: PropTypes.string
    })
  ).isRequired,
  handleUpdateRepository: PropTypes.func.isRequired,
  handleRemoveRepository: PropTypes.func.isRequired
};

export default CompareList;
