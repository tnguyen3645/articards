[![Codeship Status for tnguyen3645/articards](https://app.codeship.com/projects/8c2ac374-59f7-49a1-bcb9-b8e07b64e9a2/status?branch=main)](https://app.codeship.com/projects/442979)

# Articards
Articards is a simple memory and matching game for creating custom learning sessions in speech therapy. The name of the application comes from "Articulation Cards" which is a tool used in speech therapy sessions. With therapy going online because of the COVID pandemic, therapists are looking for more tools to use. Articards provides customizable learning environments by allowing users to create their own cards for the matching game. Articards also has online play, allowing students and teachers to connect over a Zoom session.

Check out Articards [here](https://articards.herokuapp.com/) on Heroku. Feel free to make an account and create your own custom words and decks!

# Running Articards Locally
To run Articards on your machine:

You will need to have installed:
- Ruby (v2.7.3 or greater)
- PostgreSQL (v13.2 or greater)
- Rails

1. Clone this repo (`git clone https://github.com/tnguyen3645/articards`)
2. Run `bundle install` in your CLI to install backend dependencies
3. Run `yarn install` in your CLI to install frontend dependencies
4. To set up your PostgreSQL database, run `bundle exec rake db:create` and then `bundle exec rake db:migrate`.
5. In one terminal window, run `bundle exec rails s`. In a separate window, run `yarn start`.
6. Navigate to localhost:3000 to see the website locally.

# Guidelines on how to contribute
Please follow the "fork-and-pull" Git workflow.

1. Fork the repo on GitHub
2. Clone the project to your own machine
3. Commit changes to your own branch
4. Push your work back up to your fork
5. Submit a Pull request so that we can review your changes

NOTE: Be sure to merge the latest from "main" before making a pull request!

# Features in Progress
Articards is a fully functional tool for speech therapy online sessions, however, there are more features coming, including:

- Ability to add images to word cards
- Ability to edit and delete both word cards and word decks
- Therapist/Teacher account features, including student progress tracking and notes section
- Mobile device optimizations

## Known Issues
Fixes are in progress for these known issues:

- When joining an in progress game, a user needs to click on a card before the game board loads.
- There can be duplicate cards and decks.

## Other Notes
- Search Bar template from [Mihael Tomić](https://codepen.io/mihaeltomic)
- Thank you to the Launch Academy Staff (Nick Alberts, Kaylyn Dicaccio, Kerrin Gillis) for their support in development
