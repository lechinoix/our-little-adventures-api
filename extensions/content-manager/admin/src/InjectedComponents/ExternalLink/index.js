import React from 'react';
import styled from 'styled-components';
import { useContentManagerEditViewDataManager } from 'strapi-helper-plugin';
import EyeIcon from './view.svg';

const StyledExternalLink = styled.a`
  display: block;
  color: #333740;
  width: 100%;
  text-decoration: none;
  span,
  i,
  svg {
    color: #333740;
    width: 13px;
    height: 12px;
    margin-right: 10px;
    vertical-align: 0;
  }
  span {
    font-size: 13px;
  }
  i {
    display: inline-block;
    background-image: url(${EyeIcon});
    background-size: contain;
  }
  &:hover {
    text-decoration: none;
    span,
    i,
    svg {
      color: #007eff;
    }
  }
`;

const ExternalLink = () => {
  const data = useContentManagerEditViewDataManager();
  console.log(data)
  const CLIENT_URL = 'https://www.lesnicoisenvadrouille.fr';
  const { id: adventureId, slug } = data.modifiedData;
  const token = localStorage.getItem('jwtToken')
  if (!token) return null;

  return (
    <li>
      <StyledExternalLink
        href={`${CLIENT_URL}/adventures/${adventureId}_${slug}/preview?token=${token}`}
        target="_blank"
        rel="noopener noreferrer"
        title="page preview"
      >
        <i />
        Preview
      </StyledExternalLink>
    </li>
  );
};

export default ExternalLink;