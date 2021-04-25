import styled from 'styled-components';
import React from 'react';
import {
  Comment as CommentsDefault,
  Heart as HeartDefault,
} from '@styled-icons/fa-regular';
import {
  EllipsisV,
  Heart as HeartSolidDefault,
  Plus as PlusDefault,
} from '@styled-icons/fa-solid';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import theme from './theme';

library.add(faCircle);

const Comments = styled(CommentsDefault)`
  color: ${(props) => props.theme.color.grey.d};
  height: ${(props) => props.theme.icon.size.med};
  width: ${(props) => props.theme.icon.size.med};
`;

const Like = styled(HeartDefault)`
  color: ${(props) => props.theme.color.grey.d};
  height: ${(props) => props.theme.icon.size.med};
  width: ${(props) => props.theme.icon.size.med};
`;

const LikeFill = styled(HeartSolidDefault)`
  color: ${(props) => props.theme.color.grey.d};
  height: ${(props) => props.theme.icon.size.med};
  width: ${(props) => props.theme.icon.size.med};
`;

const Options = styled(EllipsisV)`
  color: ${(props) => props.theme.color.grey.d};
  height: ${(props) => props.theme.icon.size.small};
  width: ${(props) => props.theme.icon.size.small};
`;

const Plus = styled(PlusDefault)`
  color: ${(props) => props.theme.color.blue.j};
  height: ${(props) => props.theme.icon.size.med};
  width: ${(props) => props.theme.icon.size.med};
`;

export { Comments, Like, LikeFill, Options, Plus };
