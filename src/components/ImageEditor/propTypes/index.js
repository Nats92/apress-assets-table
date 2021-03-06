import PropTypes from 'prop-types';

import {previewImageActionTypes} from '../../../constants/imageEditor';


export const previewImageViewPropType = {
  preview: PropTypes.string.isRequired,
  actionType: PropTypes.oneOf([previewImageActionTypes.remove, previewImageActionTypes.add]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onLoadError: PropTypes.func,
  onLoadSuccess: PropTypes.func
};

export const previewImagesBoxViewPropType = {
  previews: PropTypes.array.isRequired,
  className: PropTypes.string,
  actionType: PropTypes.oneOf([previewImageActionTypes.remove, previewImageActionTypes.add]),
  disabled: PropTypes.bool,
  onPreviewClick: PropTypes.func,
  onLoadError: PropTypes.func,
  onLoadSuccess: PropTypes.func
};
