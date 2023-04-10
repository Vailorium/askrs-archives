/* eslint-disable no-nested-ternary */
import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useFetchHeroListQuery, useFetchSkillListQuery } from '../../services/FEHDataApi';
import { useGetMyBuildsQuery } from '../../services/MyBuildsApi';
import LoadingPanel from '../common/LoadingPanel';
import MyBuildsHeroRow from './Components/MyBuildsHeroRow';
import { useGetUserProfileQuery } from '../../services/UserProfileApi';

const MyBuilds: React.FC = () => {
  const { data, isLoading } = useGetUserProfileQuery();

  if (data && !data.username && !isLoading) {
    return (
      <Redirect to="/" />
    );
  }

  const {
    data: heroList,
    error: heroListError,
    isLoading: isHeroListLoading,
  } = useFetchHeroListQuery();

  const {
    data: skillList,
    error: skillListError,
    isLoading: isSkillListLoading,
  } = useFetchSkillListQuery();

  const {
    data: myBuildsList,
    error: myBuildsListError,
    isLoading: isMyBuildsListLoading,
  } = useGetMyBuildsQuery();

  return (
    <Card>
      <Card.Header>
        <Card.Title>My Builds</Card.Title>
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive size="md">
          <thead>
            <tr>
              <th>{' '}</th>
              <th>Hero</th>
              <th>Build Name</th>
              <th>Merges</th>
              <th>Dragonflowers</th>
              <th>Skills</th>
              <th>Created</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              isHeroListLoading || isSkillListLoading || isMyBuildsListLoading ? (
                <tr>
                  <td colSpan={6}><LoadingPanel loading /></td>
                </tr>
              ) : heroListError || skillListError || myBuildsListError ? (
                <tr>
                  <td colSpan={6}>
                    Failed to load
                  </td>
                </tr>
              ) : myBuildsList && heroList && skillList && myBuildsList.length > 0 ? (
                myBuildsList.map((build, i) => (
                  <MyBuildsHeroRow
                    // eslint-disable-next-line no-underscore-dangle
                    key={build._id as string}
                    index={i}
                    hero={build}
                    heroList={heroList}
                    skillList={skillList}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={6}>No builds! Go to the Unit Builder to create some!</td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
export default MyBuilds;
