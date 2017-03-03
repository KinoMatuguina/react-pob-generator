// from rfx-stack

import matchMediaMock from 'match-media-mock';

const matchMedia = matchMediaMock.create();

let config = null;

const setMatchMediaConfig = (req = null) => {
  const isClient = (typeof window !== 'undefined' && typeof document !== 'undefined');

  if (!isClient && req) {

    config = {
      type: 'screen',
      width: req.params.width,
      height: req.params.height,
    };
  }

  if (isClient && !req) {

    config = {
      type: 'screen',
      width: document.body.clientWidth || window.innerWidth,
      height: document.body.clientHeight ||  window.innerHeight,
    };
  }

  if (config) matchMedia.setConfig(config);
};

export { matchMedia, setMatchMediaConfig, config };
