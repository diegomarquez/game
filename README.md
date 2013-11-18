# Game.js

![game][game]

These are some files I decided to extract from a previous javascript project. It's kind of like a framework to make simple games, things like Asteroids or Galaga.

-----------------------------------

###### Current TODO List:

- Make yeoman generator for the Readme files
    - It should create a file with all the links that the examples could possible use

- Write a README.md for each example
    * Delegates
        + Overview on all the callbacks available to game_object
        + Overview on all the callbacks available to canvas_wrapper
        + Overview on all the callbacks available to component
        + Overview on all the callbacks available to collider_component

    * Link to all the modules used in each example. Framework and example files.

- Explain main components in src/README.md

- Think about how to handle paths to images/sound

- Make yeoman generator for the different types of files
    - Have the Sublime plugin use those generators.   

- Make Sublime plugin to generate files from templates
    - Make an empty menu structure.
    - Add options to create different types of files from templates
    - Button to automatically generate setModulePath calls where needed
    - Code observer to add and remove setModulePath calls automatically
    - Scan src paths to generate all the sub paths if they exist
    - Template for an empty project, src folder and res folder

- Use Bower to install the requirejs dependency

- Use HTML to add some on screen explanation of what is going on
- Add additional debug drawing to game_object
    * global transformed position

- Rough explanation of each folder in src in respective README.md files
- Spike Performance Boost
    - Canvas caching
        * Cache static drawings (Drawing Renderer, NEW)
        * Cache Images (Bitmap renderer)
- Extensions
    * TimerFactory extension, pause and resume all timeout when pausing the game ( No Demo )
    * Keyboard extension, block keyboard keys when pausing the game ( No Demo )
    * Extension to setup basic layers
    * Move pause and resume logic into an extension
    * Move default layer setup into an extension
- Handle Adding and removing of renderer in a similar fashion to other components
- Sub state machine state. Special state which contains a state machine. Used for branching paths
- Text
- When creating the component pools, infer the amounts from the configurations on the game object pool

- Update README.md files 

-----------------------------------

#### Status: v2 of examples is complete. This is starting to look good, but there is still yet documentation to be written about the examples. 

-----------------------------------

#### [This is the game][tirador] I put together using the previous encarnation of this set of files.

[game]: http://f.cl.ly/items/3N420I093v3b03051W39/game.png
[tirador]: http://www.treintipollo.com/tirador/index.html
