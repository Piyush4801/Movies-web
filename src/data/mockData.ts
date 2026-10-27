import type { Movie } from '../types/movie';

// Authorized demo stream video sources (Open Source Creative Commons movies)
export const DEMO_VIDEOS = {
  tearsOfSteel: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  bigBuckBunny: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  sintel: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  elephantsDream: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  weAreGoingOnBullrun: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4'
};

// Hero Slides exactly matching pikamovie.in
export const HERO_MOVIES: Movie[] = [
  {
    id: 1389172,
    title: 'Reporting Live',
    overview: 'A young reporter and her reluctant cameraman chase a story, only to get entangled in an illegal sand-mining racket run by a ruthless syndicate.',
    backdrop_path: 'https://image.tmdb.org/t/p/original/faJB8DXU0LXwq5ebMLj5drz8S4N.jpg',
    poster_path: 'https://image.tmdb.org/t/p/w780/faJB8DXU0LXwq5ebMLj5drz8S4N.jpg',
    release_date: '2026-02-14',
    vote_average: 8.2,
    vote_count: 340,
    media_type: 'movie',
    genres: [{ id: 80, name: 'Crime' }, { id: 53, name: 'Thriller' }, { id: 18, name: 'Drama' }],
    runtime: 134,
    tagline: 'The truth comes at a deadly price.',
    video_url: DEMO_VIDEOS.tearsOfSteel,
    trailer_key: 'dQw4w9WgXcQ'
  },
  {
    id: 15226,
    name: 'C.I.D.',
    overview: "A team of dedicated men and women in the Crime Investigation Department will risk everything to solve Mumbai's toughest, most complicated crimes.",
    backdrop_path: 'https://image.tmdb.org/t/p/original/1gZrOa2E9DOohEvSLLBJqus2zGu.jpg',
    poster_path: 'https://image.tmdb.org/t/p/w780/1gZrOa2E9DOohEvSLLBJqus2zGu.jpg',
    first_air_date: '1998-01-21',
    vote_average: 8.6,
    vote_count: 1420,
    media_type: 'tv',
    genres: [{ id: 80, name: 'Crime' }, { id: 9648, name: 'Mystery' }, { id: 18, name: 'Drama' }],
    video_url: DEMO_VIDEOS.bigBuckBunny,
    seasons: [
      {
        id: 1,
        season_number: 1,
        name: 'Season 1',
        episode_count: 24,
        episodes: [
          {
            id: 101,
            season_number: 1,
            episode_number: 1,
            name: 'The Case of the Midnight Shadow',
            overview: 'ACP Pradyuman and senior inspector Daya investigate a mysterious break-in at a high security vault.',
            runtime: 45,
            still_path: 'https://image.tmdb.org/t/p/w780/1gZrOa2E9DOohEvSLLBJqus2zGu.jpg'
          },
          {
            id: 102,
            season_number: 1,
            episode_number: 2,
            name: 'Vanishing Footprints',
            overview: 'A key witness goes missing minutes before testifying in court, leading the squad across Mumbai.',
            runtime: 48,
            still_path: 'https://image.tmdb.org/t/p/w780/1gZrOa2E9DOohEvSLLBJqus2zGu.jpg'
          },
          {
            id: 103,
            season_number: 1,
            episode_number: 3,
            name: 'Daya Breaks The Door',
            overview: 'Trapped inside an abandoned warehouse, Abhijeet relies on Daya to breach the reinforced entrance.',
            runtime: 43,
            still_path: 'https://image.tmdb.org/t/p/w780/1gZrOa2E9DOohEvSLLBJqus2zGu.jpg'
          }
        ]
      }
    ]
  },
  {
    id: 1453407,
    title: 'Gajab Raat',
    overview: "A corrupt, troubled cop's night spirals out of control when a reluctant act of mercy toward an injured girl pulls him into a deadly web of crime.",
    backdrop_path: 'https://image.tmdb.org/t/p/original/8I4YFWgi9IZW4VUi398A0BqLnm.jpg',
    poster_path: 'https://image.tmdb.org/t/p/w780/8I4YFWgi9IZW4VUi398A0BqLnm.jpg',
    release_date: '2026-03-20',
    vote_average: 7.9,
    vote_count: 210,
    media_type: 'movie',
    genres: [{ id: 28, name: 'Action' }, { id: 53, name: 'Thriller' }],
    runtime: 128,
    video_url: DEMO_VIDEOS.sintel
  },
  {
    id: 286298,
    name: 'Mangal Lakshmi',
    overview: 'Mangal journeys to find an ideal husband for beloved Lakshmi. Despite obstacles, Mangal persists, revealing the power of sisterhood and predestined connections.',
    backdrop_path: 'https://image.tmdb.org/t/p/original/ouKzNkVMah05Vaz1rOcUUKUwsfV.jpg',
    poster_path: 'https://image.tmdb.org/t/p/w780/ouKzNkVMah05Vaz1rOcUUKUwsfV.jpg',
    first_air_date: '2024-02-27',
    vote_average: 7.8,
    vote_count: 95,
    media_type: 'tv',
    genres: [{ id: 18, name: 'Drama' }, { id: 10766, name: 'Soap' }],
    video_url: DEMO_VIDEOS.elephantsDream
  },
  {
    id: 1269325,
    title: 'Drishyam: The Conclusion',
    overview: "Years after outsmarting the police, Vijay Salgaonkar's past resurfaces when a new evidence threatens to expose his secret. As the investigation reopens, he must outwit the system once again to save his family.",
    backdrop_path: 'https://image.tmdb.org/t/p/original/nq73eRdEooripf3k0XHLtX14zyC.jpg',
    poster_path: 'https://image.tmdb.org/t/p/w780/nq73eRdEooripf3k0XHLtX14zyC.jpg',
    release_date: '2026-10-02',
    vote_average: 8.9,
    vote_count: 850,
    media_type: 'movie',
    genres: [{ id: 80, name: 'Crime' }, { id: 53, name: 'Thriller' }, { id: 18, name: 'Drama' }],
    runtime: 152,
    video_url: DEMO_VIDEOS.tearsOfSteel
  },
  {
    id: 203769,
    name: 'Pushpa Impossible',
    overview: 'Pushpa Patel is a feisty middle-aged woman who went to school at the age of 44. Her sheer grit, courage, and hilarious everyday juggad make her an inspiration for everyone in Mumbai.',
    backdrop_path: 'https://image.tmdb.org/t/p/original/4vw2auyqSnxlXRb0NP1Z3nZ59TP.jpg',
    poster_path: 'https://image.tmdb.org/t/p/w780/4vw2auyqSnxlXRb0NP1Z3nZ59TP.jpg',
    first_air_date: '2022-06-06',
    vote_average: 8.0,
    vote_count: 140,
    media_type: 'tv',
    genres: [{ id: 35, name: 'Comedy' }, { id: 18, name: 'Drama' }],
    video_url: DEMO_VIDEOS.bigBuckBunny
  }
];

// Top 10 Hindi Movies (Rank 1-10) from pikamovie.in
export const TOP_10_HINDI_MOVIES: Movie[] = [
  {
    id: 413882,
    title: 'Ok Jaanu',
    rank: 1,
    overview: 'Adi and Tara move to Mumbai to pursue their dreams. A chance meeting leads to a live-in relationship with no strings attached, until careers begin pulling them apart.',
    poster_path: 'https://image.tmdb.org/t/p/w780/yYRlnouG1Nue6Yv3S6ftiShRNma.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/yYRlnouG1Nue6Yv3S6ftiShRNma.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/z0RxKCg9bYlF8j6ycqmr6LGUDWT.png',
    release_date: '2017-01-13',
    vote_average: 6.8,
    media_type: 'movie',
    genres: [{ id: 10749, name: 'Romance' }, { id: 18, name: 'Drama' }],
    video_url: DEMO_VIDEOS.tearsOfSteel
  },
  {
    id: 1451944,
    title: 'Lust Stories 3',
    rank: 2,
    overview: 'An anthology series exploring modern love, complex desires, and hidden relationships through four compelling perspectives.',
    poster_path: 'https://image.tmdb.org/t/p/w780/jRtR4aTq4vmxRg9ah60R5i1kkQ7.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/jRtR4aTq4vmxRg9ah60R5i1kkQ7.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/nQnZU5Zc5MaOSxq5bKRssLmjKxL.png',
    release_date: '2026-01-10',
    vote_average: 7.1,
    media_type: 'movie',
    genres: [{ id: 18, name: 'Drama' }, { id: 10749, name: 'Romance' }],
    video_url: DEMO_VIDEOS.sintel
  },
  {
    id: 1291608,
    title: 'Dhurandhar',
    rank: 3,
    overview: 'A daring undercover operative is tasked with infiltrating an international syndicate operating beneath the radar.',
    poster_path: 'https://image.tmdb.org/t/p/w780/snYOXem8pUGOffnLbbGq4aB1pg4.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/snYOXem8pUGOffnLbbGq4aB1pg4.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/xAnUDVe23cQHKufi7XqzosRZFwp.png',
    release_date: '2025-11-28',
    vote_average: 8.3,
    media_type: 'movie',
    genres: [{ id: 28, name: 'Action' }, { id: 53, name: 'Thriller' }],
    video_url: DEMO_VIDEOS.bigBuckBunny
  },
  {
    id: 20453,
    title: '3 Idiots',
    rank: 4,
    overview: 'Two friends embark on a quest for a lost college buddy who challenged their conformist education system and changed their lives.',
    poster_path: 'https://image.tmdb.org/t/p/w780/u7kuUaySqXBVAtqEl9vkTkAzHV9.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/u7kuUaySqXBVAtqEl9vkTkAzHV9.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/v6Hihdrx8TajNEbWSDD8cxi5er1.png',
    release_date: '2009-12-25',
    vote_average: 8.4,
    media_type: 'movie',
    genres: [{ id: 35, name: 'Comedy' }, { id: 18, name: 'Drama' }],
    video_url: DEMO_VIDEOS.elephantsDream
  },
  {
    id: 19404,
    title: 'Dilwale Dulhania Le Jayenge',
    rank: 5,
    overview: 'Raj and Simran meet on a train trip across Europe and fall in love. But Raj must win over her strict traditional father before she is married off.',
    poster_path: 'https://image.tmdb.org/t/p/w780/7VDLEHli74eLsYLNcq9djn1Gw76.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/7VDLEHli74eLsYLNcq9djn1Gw76.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/2y2BbO3udAS9Zfzya3ifqUn7JUh.png',
    release_date: '1995-10-20',
    vote_average: 8.6,
    media_type: 'movie',
    genres: [{ id: 10749, name: 'Romance' }, { id: 18, name: 'Drama' }],
    video_url: DEMO_VIDEOS.tearsOfSteel
  },
  {
    id: 1355228,
    title: 'Gandhari',
    rank: 6,
    overview: 'A fierce mother stops at nothing to protect her child when dark forces from her past threaten their peaceful existence.',
    poster_path: 'https://image.tmdb.org/t/p/w780/sT5WVT8LzvDwIbfy9BGXK0fvf3s.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/sT5WVT8LzvDwIbfy9BGXK0fvf3s.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/oIn6zUEIOipYu3E1kZWacu9lHWB.png',
    release_date: '2025-08-15',
    vote_average: 7.7,
    media_type: 'movie',
    genres: [{ id: 28, name: 'Action' }, { id: 18, name: 'Drama' }],
    video_url: DEMO_VIDEOS.sintel
  },
  {
    id: 1654581,
    title: 'Nayyi Navelli',
    rank: 7,
    overview: 'A newly married woman moves into an ancestral household where unspoken family traditions test her individuality.',
    poster_path: 'https://image.tmdb.org/t/p/w780/3aXMkyp0Pv2WGyvm2NUdtMXwY2P.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/3aXMkyp0Pv2WGyvm2NUdtMXwY2P.jpg',
    release_date: '2026-02-01',
    vote_average: 7.0,
    media_type: 'movie',
    genres: [{ id: 18, name: 'Drama' }],
    video_url: DEMO_VIDEOS.bigBuckBunny
  },
  {
    id: 1122030,
    title: 'Alpha',
    rank: 8,
    overview: 'Two elite spy agents from the intelligence wing join forces to neutralise a global terror syndicate plotting attacks across continents.',
    poster_path: 'https://image.tmdb.org/t/p/w780/b4WXm5ahmtubYXy3wqHUG2nUKoM.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/b4WXm5ahmtubYXy3wqHUG2nUKoM.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/9dhmYWvnRxtr8cIW20fl6mRy4z6.png',
    release_date: '2025-12-25',
    vote_average: 8.5,
    media_type: 'movie',
    genres: [{ id: 28, name: 'Action' }, { id: 53, name: 'Thriller' }],
    video_url: DEMO_VIDEOS.tearsOfSteel
  },
  {
    id: 1484913,
    title: 'Ikka',
    rank: 9,
    overview: 'In the high-stakes underworld of card gambling and political kickbacks, a charismatic fixer plays both sides.',
    poster_path: 'https://image.tmdb.org/t/p/w780/uy16Ktm9blPb1DAoN6h5MwlBJ6V.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/uy16Ktm9blPb1DAoN6h5MwlBJ6V.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/kspjrquwIqXzz42dRWiCpjvevHI.png',
    release_date: '2026-01-26',
    vote_average: 7.4,
    media_type: 'movie',
    genres: [{ id: 80, name: 'Crime' }, { id: 18, name: 'Drama' }],
    video_url: DEMO_VIDEOS.sintel
  },
  {
    id: 1582770,
    title: 'Dhurandhar: The Revenge',
    rank: 10,
    overview: 'The relentless follow-up to the blockbuster thriller where vengeance takes no prisoners.',
    poster_path: 'https://image.tmdb.org/t/p/w780/br4Ra4dRpvR0R7a1zPPkOwGkcky.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/br4Ra4dRpvR0R7a1zPPkOwGkcky.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/s7VHVLsGZgmafbsqkJ5jFsZPhyo.png',
    release_date: '2026-04-14',
    vote_average: 8.1,
    media_type: 'movie',
    genres: [{ id: 28, name: 'Action' }],
    video_url: DEMO_VIDEOS.bigBuckBunny
  }
];

// Top 10 Hindi Series (Rank 1-10) from pikamovie.in
export const TOP_10_HINDI_SERIES: Movie[] = [
  {
    id: 66465,
    name: 'The Kapil Sharma Show',
    rank: 1,
    overview: 'Comedian Kapil Sharma interacts with celebrity guests, performs comedic skits, and entertains the audience with witty banter.',
    poster_path: 'https://image.tmdb.org/t/p/w780/xV0JOheZzmemwdpq1fahTnfAUoU.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/xV0JOheZzmemwdpq1fahTnfAUoU.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/r199HMJG1VqQvk8kgCHadloXzRV.png',
    first_air_date: '2016-04-23',
    vote_average: 7.9,
    media_type: 'tv',
    genres: [{ id: 35, name: 'Comedy' }, { id: 10767, name: 'Talk' }],
    video_url: DEMO_VIDEOS.elephantsDream
  },
  {
    id: 65682,
    name: 'Bhabiji Ghar Par Hain',
    rank: 2,
    overview: 'Two neighboring couples in Kanpur engage in comical attempts to impress each other’s wives, causing endless hilarious misunderstandings.',
    poster_path: 'https://image.tmdb.org/t/p/w780/4xaxxKraFpDOEgWXHiqxwn0taEv.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/4xaxxKraFpDOEgWXHiqxwn0taEv.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/zyl5QxKQluBtb9bcJ6cjfKce7UI.png',
    first_air_date: '2015-03-02',
    vote_average: 8.2,
    media_type: 'tv',
    genres: [{ id: 35, name: 'Comedy' }],
    video_url: DEMO_VIDEOS.bigBuckBunny
  },
  {
    id: 6060,
    name: 'Kyunki Saas Bhi Kabhi Bahu Thi',
    rank: 3,
    overview: 'The sprawling saga of the Virani household and Tulsi, who navigates family drama, trials, and sacrifices across generations.',
    poster_path: 'https://image.tmdb.org/t/p/w780/gwXnESfjDqop3tDLoGxSwCUP8GD.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/gwXnESfjDqop3tDLoGxSwCUP8GD.jpg',
    first_air_date: '2000-07-03',
    vote_average: 7.6,
    media_type: 'tv',
    genres: [{ id: 18, name: 'Drama' }, { id: 10766, name: 'Soap' }],
    video_url: DEMO_VIDEOS.tearsOfSteel
  },
  {
    id: 8745,
    name: 'Balika Vadhu',
    rank: 4,
    overview: 'Anandi, married into a traditional Rajasthani family as a child, grows up challenging societal dogmas and fighting for education and justice.',
    poster_path: 'https://image.tmdb.org/t/p/w780/7Y76Tkr1DjWhTU33omROOHpUBjh.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/7Y76Tkr1DjWhTU33omROOHpUBjh.jpg',
    first_air_date: '2008-07-21',
    vote_average: 7.7,
    media_type: 'tv',
    genres: [{ id: 18, name: 'Drama' }],
    video_url: DEMO_VIDEOS.sintel
  },
  {
    id: 322846,
    name: 'Kaala Teeka',
    rank: 5,
    overview: 'Driven by superstition, a wealthy father forces an orphaned girl to act as a living amulet to deflect misfortune from his daughter.',
    poster_path: 'https://image.tmdb.org/t/p/w780/5PL6yoldPHmfqRFMvcAV3VHOynC.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/5PL6yoldPHmfqRFMvcAV3VHOynC.jpg',
    first_air_date: '2015-11-02',
    vote_average: 7.3,
    media_type: 'tv',
    genres: [{ id: 18, name: 'Drama' }],
    video_url: DEMO_VIDEOS.bigBuckBunny
  },
  {
    id: 97072,
    name: 'Charmsukh',
    rank: 6,
    overview: 'A series of short dramatic tales exploring romance, desire, and life lessons across different modern backdrops.',
    poster_path: 'https://image.tmdb.org/t/p/w780/kgltaSM2QgR5v8ZwjVuHye8peRC.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/kgltaSM2QgR5v8ZwjVuHye8peRC.jpg',
    first_air_date: '2019-09-27',
    vote_average: 7.0,
    media_type: 'tv',
    genres: [{ id: 18, name: 'Drama' }],
    video_url: DEMO_VIDEOS.tearsOfSteel
  },
  {
    id: 291369,
    name: 'Saru',
    rank: 7,
    overview: 'A brave young woman navigates hardship in rural northern India while fighting for community recognition and her dreams.',
    poster_path: 'https://image.tmdb.org/t/p/w780/HEQdMTIaAk0YrbkJ24CHwTad2I.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/HEQdMTIaAk0YrbkJ24CHwTad2I.jpg',
    first_air_date: '2024-06-15',
    vote_average: 7.5,
    media_type: 'tv',
    genres: [{ id: 18, name: 'Drama' }],
    video_url: DEMO_VIDEOS.elephantsDream
  },
  {
    id: 86310,
    name: 'RadhaKrishn',
    rank: 8,
    overview: 'The eternal and divine love story of Radha and Krishna, set amidst the mystical landscapes of Vrindavan and Mathura.',
    poster_path: 'https://image.tmdb.org/t/p/w780/mP0LywGWY77Qa9rmfWZPJDEGaY2.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/mP0LywGWY77Qa9rmfWZPJDEGaY2.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/6La02YjwjlIyakAapIfmzevV6P2.png',
    first_air_date: '2018-10-01',
    vote_average: 8.4,
    media_type: 'tv',
    genres: [{ id: 10765, name: 'Sci-Fi & Fantasy' }, { id: 18, name: 'Drama' }],
    video_url: DEMO_VIDEOS.sintel
  },
  {
    id: 1307,
    name: 'Kasauti Zindagii Kay',
    rank: 9,
    overview: 'Anurag and Prerna are star-crossed lovers whose deep bond is constantly challenged by destiny and rivalries.',
    poster_path: 'https://image.tmdb.org/t/p/w780/v3LaeZ8uB4A6zUsLpQIKg8EOPGY.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/v3LaeZ8uB4A6zUsLpQIKg8EOPGY.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/v17IKaYB2JBQJHNI6euzGHLBc3p.png',
    first_air_date: '2001-10-29',
    vote_average: 7.8,
    media_type: 'tv',
    genres: [{ id: 18, name: 'Drama' }, { id: 10766, name: 'Soap' }],
    video_url: DEMO_VIDEOS.tearsOfSteel
  },
  {
    id: 40382,
    name: 'Diya Aur Baati Hum',
    rank: 10,
    overview: 'Sandhya aspires to become an IPS officer. When she is married to sweetshop owner Sooraj, he defies conventions to support her dream.',
    poster_path: 'https://image.tmdb.org/t/p/w780/py2l9e5DMRPXm84FORLt0EEdlGB.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/py2l9e5DMRPXm84FORLt0EEdlGB.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/mLgIHmWhBysIPxOGObzjSd6L1Jk.png',
    first_air_date: '2011-08-29',
    vote_average: 7.9,
    media_type: 'tv',
    genres: [{ id: 18, name: 'Drama' }],
    video_url: DEMO_VIDEOS.bigBuckBunny
  }
];

// More Hindi Movies row from pikamovie.in
export const MORE_HINDI_MOVIES: Movie[] = [
  {
    id: 1155818,
    title: 'Satluj',
    overview: 'A gritty border drama capturing life, conflict, and brotherhood along the rushing waters of the Satluj river.',
    poster_path: 'https://image.tmdb.org/t/p/w780/h7VptulPVCJUIvWCE2HzXdHljkj.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/h7VptulPVCJUIvWCE2HzXdHljkj.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/2wAI2TTAjfkKepuBZ3SvrRsn2Eq.png',
    release_date: '2025-05-18',
    vote_average: 7.6,
    media_type: 'movie',
    genres: [{ id: 18, name: 'Drama' }, { id: 28, name: 'Action' }],
    video_url: DEMO_VIDEOS.tearsOfSteel
  },
  {
    id: 297222,
    title: 'PK',
    overview: 'An alien stranded on Earth loses his communication device and questions humankind’s dogmas, rituals, and misconceptions with innocent logic.',
    poster_path: 'https://image.tmdb.org/t/p/w780/gxfvtq5eYiClS2X7hxAAPBNrbWA.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/gxfvtq5eYiClS2X7hxAAPBNrbWA.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/BnDydsaEeMhywD5Snv6jN77ifh.png',
    release_date: '2014-12-19',
    vote_average: 8.2,
    media_type: 'movie',
    genres: [{ id: 35, name: 'Comedy' }, { id: 18, name: 'Drama' }, { id: 878, name: 'Sci-Fi' }],
    video_url: DEMO_VIDEOS.sintel
  },
  {
    id: 1375156,
    title: 'Udta Teer',
    overview: 'A hilarious comedy of errors when an honest everyday man picks a fight with a local goon over a parking space.',
    poster_path: 'https://image.tmdb.org/t/p/w780/ncVecUcDZe1EOWtHaU2f8BFvbx4.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/ncVecUcDZe1EOWtHaU2f8BFvbx4.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/9gCpdllQQVi8GVyQRKQcaTXQJuc.png',
    release_date: '2025-07-22',
    vote_average: 7.2,
    media_type: 'movie',
    genres: [{ id: 35, name: 'Comedy' }],
    video_url: DEMO_VIDEOS.bigBuckBunny
  },
  {
    id: 1239134,
    title: 'Bhooth Bangla',
    overview: 'An eccentric paranormal investigator is called into a grand old haveli where the ghosts are surprisingly witty.',
    poster_path: 'https://image.tmdb.org/t/p/w780/A2tzVTVtnTvpji96IZmleN78KKv.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/A2tzVTVtnTvpji96IZmleN78KKv.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/v6gE3UvQhM2SiNlltJYpc38cikD.png',
    release_date: '2026-04-10',
    vote_average: 8.0,
    media_type: 'movie',
    genres: [{ id: 35, name: 'Comedy' }, { id: 27, name: 'Horror' }],
    video_url: DEMO_VIDEOS.elephantsDream
  },
  {
    id: 1446616,
    title: 'Tu Yaa Main',
    overview: 'Two rival advertising executives are locked in a fierce pitch competition that gradually turns into an unexpected romance.',
    poster_path: 'https://image.tmdb.org/t/p/w780/zIOBTZAqGwdKnOb5c6SvzxP7x86.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/zIOBTZAqGwdKnOb5c6SvzxP7x86.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/jjhazOsDmlaAChvYL7MauLZjV8j.png',
    release_date: '2025-09-05',
    vote_average: 7.5,
    media_type: 'movie',
    genres: [{ id: 10749, name: 'Romance' }, { id: 35, name: 'Comedy' }],
    video_url: DEMO_VIDEOS.tearsOfSteel
  },
  {
    id: 1163258,
    title: '12th Fail',
    overview: 'Based on the true story of Manoj Kumar Sharma who overcame extreme poverty, cheating mafia, and failures to crack the UPSC IPS exam.',
    poster_path: 'https://image.tmdb.org/t/p/w780/6RV2o8PBCEyw9ylOWViV1CtULIF.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/6RV2o8PBCEyw9ylOWViV1CtULIF.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/nhnKWMtAdD31Wklbq4JR4IDWbHa.png',
    release_date: '2023-10-27',
    vote_average: 8.8,
    media_type: 'movie',
    genres: [{ id: 18, name: 'Drama' }, { id: 36, name: 'History' }],
    video_url: DEMO_VIDEOS.sintel
  },
  {
    id: 1109086,
    title: 'War 2',
    overview: 'Major Kabir Dhaliwal crosses paths with an equally deadly Indian intelligence asset as betrayal strikes the heart of national security.',
    poster_path: 'https://image.tmdb.org/t/p/w780/pKIRUTnwY3YYU9urSdsuobdcliP.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/pKIRUTnwY3YYU9urSdsuobdcliP.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/uMmMYDrrI5DTa9kZ2dJ6hx3eFtH.png',
    release_date: '2025-08-14',
    vote_average: 8.4,
    media_type: 'movie',
    genres: [{ id: 28, name: 'Action' }, { id: 53, name: 'Thriller' }],
    video_url: DEMO_VIDEOS.bigBuckBunny
  },
  {
    id: 781732,
    title: 'Animal',
    overview: 'A man undergoing severe childhood emotional neglect returns home to take ruthless revenge against those who attempted to assassinate his father.',
    poster_path: 'https://image.tmdb.org/t/p/w780/lprsAHkwMxk2iC6VZxNmV0H7g1t.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/lprsAHkwMxk2iC6VZxNmV0H7g1t.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/aM0QC0EmfPD84AtjGIv2UJ9yu6J.png',
    release_date: '2023-12-01',
    vote_average: 7.4,
    media_type: 'movie',
    genres: [{ id: 28, name: 'Action' }, { id: 80, name: 'Crime' }, { id: 18, name: 'Drama' }],
    video_url: DEMO_VIDEOS.tearsOfSteel
  }
];

// New Releases & South Blockbusters row
export const NEW_AND_SOUTH_RELEASES: Movie[] = [
  {
    id: 1378537,
    title: 'Mirzapur: The Movie',
    overview: 'The battle for the throne of Mirzapur reaches the big screen with Kaleen Bhaiya, Guddu Pandit, and Munna in an explosive showdown.',
    poster_path: 'https://image.tmdb.org/t/p/w780/nTkQBI8ldvPByIkxsemGxtKlr8E.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/nTkQBI8ldvPByIkxsemGxtKlr8E.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/8R0Q3SHsEwc5D9ptHkHJ5ScBzVD.png',
    release_date: '2026-06-20',
    vote_average: 8.7,
    media_type: 'movie',
    genres: [{ id: 80, name: 'Crime' }, { id: 28, name: 'Action' }, { id: 18, name: 'Drama' }],
    video_url: DEMO_VIDEOS.sintel
  },
  {
    id: 1234139,
    title: 'Jailer 2',
    overview: 'Tiger Muthuvel Pandian is forced out of retirement again when international weapons syndicates target his grandchildren.',
    poster_path: 'https://image.tmdb.org/t/p/w780/zpHTOdRl7GEPqFsDGqsN6Hi9Ylt.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/zpHTOdRl7GEPqFsDGqsN6Hi9Ylt.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/q1Jmo0QVwUSojit5Eq3jwtGBVdY.png',
    release_date: '2025-11-12',
    vote_average: 8.3,
    media_type: 'movie',
    genres: [{ id: 28, name: 'Action' }, { id: 80, name: 'Crime' }],
    video_url: DEMO_VIDEOS.bigBuckBunny
  },
  {
    id: 1444466,
    title: 'Awarapan 2',
    overview: 'An emotionally shattered hitman seeks redemption by saving an innocent soul from human traffickers across Thailand.',
    poster_path: 'https://image.tmdb.org/t/p/w780/qrYsuB5kPCw0y7IVIuOyEAI1GXh.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/qrYsuB5kPCw0y7IVIuOyEAI1GXh.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/6tm61upQyePN1mUeCX2V3PHnCb2.png',
    release_date: '2025-10-04',
    vote_average: 7.8,
    media_type: 'movie',
    genres: [{ id: 28, name: 'Action' }, { id: 18, name: 'Drama' }],
    video_url: DEMO_VIDEOS.tearsOfSteel
  },
  {
    id: 1512084,
    title: 'Baby Do Die Do',
    overview: 'A comedy heist gone completely off the rails when three rookie thieves steal a vault that belongs to an underworld Don.',
    poster_path: 'https://image.tmdb.org/t/p/w780/l2TgHsg445CPwSGtg30I0GmoFtG.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/l2TgHsg445CPwSGtg30I0GmoFtG.jpg',
    logo_path: 'https://image.tmdb.org/t/p/w300/kRW9SUwhdw7RyQQvlo9vWSp6pXb.png',
    release_date: '2026-03-15',
    vote_average: 7.1,
    media_type: 'movie',
    genres: [{ id: 35, name: 'Comedy' }, { id: 80, name: 'Crime' }],
    video_url: DEMO_VIDEOS.elephantsDream
  },
  {
    id: 1376856,
    title: 'The Paradise',
    overview: 'An ambitious architect stumbles into a clandestine enclave that promises utopian living at the cost of your memories.',
    poster_path: 'https://image.tmdb.org/t/p/w780/7AcH5TFppoMusNkCBLaQP6UOODp.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/7AcH5TFppoMusNkCBLaQP6UOODp.jpg',
    release_date: '2025-12-08',
    vote_average: 8.0,
    media_type: 'movie',
    genres: [{ id: 878, name: 'Sci-Fi' }, { id: 53, name: 'Thriller' }],
    video_url: DEMO_VIDEOS.sintel
  }
];

// Anime Hits (for the Anime navigation section)
export const ANIME_HITS: Movie[] = [
  {
    id: 1429,
    name: 'Attack on Titan',
    overview: 'After his hometown is destroyed and his mother is killed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.',
    poster_path: 'https://image.tmdb.org/t/p/w780/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/7c4fepEwJtN8aEw4nZgI3bYq3fS.jpg',
    first_air_date: '2013-04-07',
    vote_average: 8.7,
    vote_count: 5800,
    media_type: 'anime',
    genres: [{ id: 16, name: 'Animation' }, { id: 10759, name: 'Action & Adventure' }, { id: 10765, name: 'Sci-Fi & Fantasy' }],
    video_url: DEMO_VIDEOS.bigBuckBunny
  },
  {
    id: 85937,
    name: 'Demon Slayer: Kimetsu no Yaiba',
    overview: 'Tanjiro Kamado sets out to become a demon slayer to avenge his slaughtered family and find a cure to turn his demonized sister Nezuko back into a human.',
    poster_path: 'https://image.tmdb.org/t/p/w780/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/nTvM4mhqZlHIvUkIvdikWstmiRA.jpg',
    first_air_date: '2019-04-06',
    vote_average: 8.8,
    vote_count: 6200,
    media_type: 'anime',
    genres: [{ id: 16, name: 'Animation' }, { id: 10759, name: 'Action & Adventure' }, { id: 10765, name: 'Sci-Fi & Fantasy' }],
    video_url: DEMO_VIDEOS.tearsOfSteel
  },
  {
    id: 95479,
    name: 'Jujutsu Kaisen',
    overview: 'Yuji Itadori swallows a cursed talisman—the finger of a demon—and becomes cursed himself. He enters a shaman school to locate the demon’s other body parts and exorcise himself.',
    poster_path: 'https://image.tmdb.org/t/p/w780/hFWFD5f2uDCq9ql76j9I982Yq.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/y4aY5V97fUoMv6Q9g0KqF2qLgqM.jpg',
    first_air_date: '2020-10-03',
    vote_average: 8.6,
    vote_count: 3400,
    media_type: 'anime',
    genres: [{ id: 16, name: 'Animation' }, { id: 10759, name: 'Action & Adventure' }],
    video_url: DEMO_VIDEOS.sintel
  },
  {
    id: 30984,
    title: 'Spirited Away',
    overview: 'A ten-year-old girl wanders into a world ruled by gods, witches, and spirits where humans are changed into beasts.',
    poster_path: 'https://image.tmdb.org/t/p/w780/393mhwsRJgSPOW4Kq18F8wUq2mN.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/bXNvzjUL0EnW0UX7Z7gWq7lK0x0.jpg',
    release_date: '2001-07-20',
    vote_average: 8.5,
    media_type: 'anime',
    genres: [{ id: 16, name: 'Animation' }, { id: 14, name: 'Fantasy' }],
    video_url: DEMO_VIDEOS.elephantsDream
  },
  {
    id: 372058,
    title: 'Your Name.',
    overview: 'High schoolers Mitsuha and Taki are complete strangers living separate lives until they suddenly switch bodies.',
    poster_path: 'https://image.tmdb.org/t/p/w780/q719jXXEzOoYaps6q2P69Ri0ezb.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/dIWwZWijPjMN7xlRBIO49f99YAE.jpg',
    release_date: '2016-08-26',
    vote_average: 8.5,
    media_type: 'anime',
    genres: [{ id: 16, name: 'Animation' }, { id: 10749, name: 'Romance' }],
    video_url: DEMO_VIDEOS.tearsOfSteel
  }
];

// All movies combined for search and lookup
export const ALL_COMBINED_MOVIES: Movie[] = [
  ...HERO_MOVIES,
  ...TOP_10_HINDI_MOVIES,
  ...TOP_10_HINDI_SERIES,
  ...MORE_HINDI_MOVIES,
  ...NEW_AND_SOUTH_RELEASES,
  ...ANIME_HITS
];

// Genre list for filters
export const GENRES = [
  { id: 0, name: 'All Genres' },
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' },
  { id: 27, name: 'Horror' },
  { id: 9648, name: 'Mystery' }
];
