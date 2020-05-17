export const CarouselItemType = {
  FAMILY: 'family',
  SOCIAL: 'social',
  SPECIAL: 'special',
};

export const CaruoselItemContent =
  {
    [CarouselItemType.FAMILY]: {
      title: 'Family Gathering',
      description: 'We love catering for entire families. So please bring everyone along for a special meal with your loved ones. We’ll provide a memorable experience for all.',
      image_address: '/public/images/homepage/family-gathering-desktop.jpg',
    },

    [CarouselItemType.SOCIAL]: {
      title: 'Social Events',
      description: 'Are you looking to have a larger social event? No problem! We’re more than happy to cater for big parties. We’ll work with you to make your event a hit with everyone.',
      image_address: '/public/images/homepage/social-events-desktop.jpg',
    },

    [CarouselItemType.SPECIAL]: {
      title: 'Special Events',
      description: 'Whether it’s a romantic dinner or special date you’re celebrating with others we’ll look after you. We’ll be sure to mark your special date with an unforgettable meal.',
      image_address: '/public/images/homepage/special-events-desktop.jpg',
    }    
  }
;
