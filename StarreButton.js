/**
 * Component use to show Favorite state by ID and 
 * update over all screens of app when do changes at
 * particular screen.
 */

import React from 'react';
import {
  Image,
  View,
} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import * as Images from '~/assets';
import { postFavoriteStateFor } from '~/states/PostFavoriteState';
import { Subscribe } from 'unstated';
import { DebouncedTouchableOpacity } from '~/components/DebouncedOnPress';

const isDisable = itemId => itemId.toString().includes('new-');

{/** Subscribe is a redux component to fetch current state from store
 /* we can use this with multiple api's and use one store to update state by id
*/}
const StarreButton = ({ itemId: itemId }) => (
  <Subscribe to={[postFavoriteStateFor(itemId)]}>
    {postFavoriteState => (
      <DebouncedTouchableOpacity
        onPress={isDisable(itemId) ? _.noop : postFavoriteState.toggle}
        activeOpacity={isDisable(itemId) ? 1 : 0.2}
      >
        <View style={{ opacity: (isDisable(itemId) ? 0.3 : 1) }} >
          <Image source={postFavoriteState.state.favorited ? Images.favorite : Images.unfavorite} />
        </View>
      </DebouncedTouchableOpacity>
    )}
  </Subscribe>
);

StarreButton.defaultProps = {
  itemId: -1,
};

StarreButton.propTypes = {
  itemId: PropTypes.number,
};

export default StarreButton;
