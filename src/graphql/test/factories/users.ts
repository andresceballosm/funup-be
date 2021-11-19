const randomEmail = `${Math.random().toString(36).substring(7)}@test.com`;
const randomUid = `${Math.random().toString(36).substring(7)}${Date.now()}`;

export const user = {
  name: 'Mr. Testing',
  email: randomEmail,
  active: true,
  firebaseUid: randomUid,
  createdAt: Date.now(),
};

export const smallUser = {
  firebaseUid: user.firebaseUid,
  name: 'Mr. Testing',
};

export const socialsMock = {
  socials: {
    youtube: {
      channelId: 'https://gdata.youtube.com/feeds/api/users/UC_x5XG1OV2P6uZZ5FSM9Ttw?v=2.1',
    },
    twitter: {
      userID:"123456",
      userName:"twitterUser"
    },
    spotify: {
      podcasts: [
        {
          name: 'Podcast Test',
          description: 'description test',
          image: {
            url: 'http://google.com',
            width: 48,
            heigth: 48,
          },
          id: 'id123123',
        },
      ],
    },
  },
};

export const onboardingMock = {
  feedPreferences: {
    tweets: false,
    podcasts: true,
    videos: true,
    articles: true,
  },
  teams: [
    {
      name: 'Chicago Bulls',
      league: 'NBA',
      sportRadarId: 'sportRadarTestid1',
      sportsManiaId: 'sportsmaniaTestId2',
      logo: 'logo',
      abbreviation: 'CHI'
    },
    {
      name: 'Miami Heat',
      league: 'NBA',
      sportRadarId: 'sportRadarTestid2',
      sportsManiaId: 'sportsmaniaTestId3',
      logo: 'logo',
      abbreviation: 'MIA'
    },
  ],
};
