const mock = {
  tasks: [
    {
      id: 0,
      type: 'Meeting',
      title: 'Meeting with Andrew Piker',
      time: '9:00',
    },
    {
      id: 1,
      type: 'Call',
      title: 'Call with HT Company',
      time: '12:00',
    },
    {
      id: 2,
      type: 'Meeting',
      title: 'Meeting with Zoe Alison',
      time: '14:00',
    },
    {
      id: 3,
      type: 'Interview',
      title: 'Interview with HR',
      time: '15:00',
    },
  ],
  bigStat: [
    {
      product: 'Light Blue',
      total: {
        monthly: 4232,
        weekly: 1465,
        daily: 199,
        percent: { value: 3.7, profit: false },
      },
      color: 'primary',
      registrations: {
        monthly: { value: 830, profit: false },
        weekly: { value: 215, profit: true },
        daily: { value: 33, profit: true },
      },
      bounce: {
        monthly: { value: 4.5, profit: false },
        weekly: { value: 3, profit: true },
        daily: { value: 3.25, profit: true },
      },
    },
    {
      product: 'Sing App',
      total: {
        monthly: 754,
        weekly: 180,
        daily: 27,
        percent: { value: 2.5, profit: true },
      },
      color: 'warning',
      registrations: {
        monthly: { value: 32, profit: true },
        weekly: { value: 8, profit: true },
        daily: { value: 2, profit: false },
      },
      bounce: {
        monthly: { value: 2.5, profit: true },
        weekly: { value: 4, profit: false },
        daily: { value: 4.5, profit: false },
      },
    },
    {
      product: 'RNS',
      total: {
        monthly: 1025,
        weekly: 301,
        daily: 44,
        percent: { value: 3.1, profit: true },
      },
      color: 'secondary',
      registrations: {
        monthly: { value: 230, profit: true },
        weekly: { value: 58, profit: false },
        daily: { value: 15, profit: false },
      },
      bounce: {
        monthly: { value: 21.5, profit: false },
        weekly: { value: 19.35, profit: false },
        daily: { value: 10.1, profit: true },
      },
    },
  ],
  notifications: [
    {
      id: 0,
      icon: 'thumbs-up',
      color: 'primary',
      content:
        'Ken <span className="fw-semi-bold">accepts</span> your invitation',
    },
    {
      id: 1,
      icon: 'file',
      color: 'success',
      content: 'Report from LT Company',
    },
    {
      id: 2,
      icon: 'envelope',
      color: 'danger',
      content: '4 <span className="fw-semi-bold">Private</span> Mails',
    },
    {
      id: 3,
      icon: 'comment',
      color: 'success',
      content: '3 <span className="fw-semi-bold">Comments</span> to your Post',
    },
    {
      id: 4,
      icon: 'cog',
      color: 'light',
      content: 'New <span className="fw-semi-bold">Version</span> of RNS app',
    },
    {
      id: 5,
      icon: 'bell',
      color: 'info',
      content:
        '15 <span className="fw-semi-bold">Notifications</span> from Social Apps',
    },
  ],
  table: [
    {
      id: 0,
      name: 'Mark Otto',
      email: 'ottoto@wxample.com',
      product: 'ON the Road',
      price: '$25 224.2',
      date: '11 May 2017',
      city: 'Otsego',
      status: 'Sent',
    },
    {
      id: 1,
      name: 'Jacob Thornton',
      email: 'thornton@wxample.com',
      product: 'HP Core i7',
      price: '$1 254.2',
      date: '4 Jun 2017',
      city: 'Fivepointville',
      status: 'Sent',
    },
    {
      id: 2,
      name: 'Larry the Bird',
      email: 'bird@wxample.com',
      product: 'Air Pro',
      price: '$1 570.0',
      date: '27 Aug 2017',
      city: 'Leadville North',
      status: 'Pending',
    },
    {
      id: 3,
      name: 'Joseph May',
      email: 'josephmay@wxample.com',
      product: 'Version Control',
      price: '$5 224.5',
      date: '19 Feb 2018',
      city: 'Seaforth',
      status: 'Declined',
    },
    {
      id: 4,
      name: 'Peter Horadnia',
      email: 'horadnia@wxample.com',
      product: "Let's Dance",
      price: '$43 594.7',
      date: '1 Mar 2018',
      city: 'Hanoverton',
      status: 'Sent',
    },
  ],
  raceScheduleTable: [
    {
      id: 0,
      round: '1',
      name: 'Albert Park Grand Prix Circuit',
      locality: 'Melbourne',
      date: 'March 15-17, 2019',
      hour: '10:00',
      country: 'Australia',
      status: 'Upcoming',
    },
    {
      id: 1,
      round: '2',
      name: 'Bahrain International Circuit',
      locality: 'Sakhir',
      date: 'March 29-31, 2019',
      hour: '10:00',
      country: 'Bahrain',
      status: 'Upcoming',
    },
    {
      id: 2,
      round: '3',
      name: 'Shanghai International Circuit',
      locality: 'Shanghai',
      date: 'April 12-14, 2019',
      hour: '10:00',
      country: 'China',
      status: 'Upcoming',
    },
    {
      id: 3,
      round: '4',
      name: 'Circuit de Barcelona-Catalunya',
      locality: 'Montmeló',
      date: 'May 10-12, 2019',
      hour: '10:00',
      country: 'Spain',
      status: 'Upcoming',
    },
    {
      id: 4,
      round: '5',
      name: 'Circuit de Monaco',
      locality: 'Monte Carlo',
      date: 'May 24-26, 2019',
      hour: '10:00',
      country: 'Monaco',
      status: 'Upcoming',
    },
    {
      id: 5,
      round: '6',
      name: 'Circuit Gilles Villeneuve',
      locality: 'Montreal',
      date: 'June 7-9, 2019',
      hour: '10:00',
      country: 'Canada',
      status: 'Upcoming',
    },
  ],
  driverResultsTable: [
    {
      id: 0,
      circuit: 'Albert Park Grand Prix Circuit',
      grid: '1',
      position: '1',
      points: '25',
      laps: '58',
      time: '1:25:18.456',
      status: 'Finished',
    },
    {
      id: 1,
      circuit: 'Bahrain International Circuit',
      grid: '2',
      position: '2',
      points: '18',
      laps: '57',
      time: '+5.478',
      status: 'Finished',
    },
    {
      id: 2,
      circuit: 'Shanghai International Circuit',
      grid: '3',
      position: '3',
      points: '15',
      laps: '56',
      time: '+1:12.013',
      status: 'Finished',
    },
  ],

};

export default mock;
