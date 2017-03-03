// http://stackoverflow.com/questions/2905867/how-to-scroll-to-specific-item-using-jquery

import $ from 'jquery';

function scrollToElement(containerId, elementId) {
  const container = $(containerId);
  const element = $(elementId);

  console.log(container.scrollTop());
  console.log(element.offset());

  if (element && container) {
    container.animate({
      scrollTop: element.offset().top - container.offset().top + container.scrollTop() - (container.height()/2)
    });
  }
}

export default scrollToElement;
