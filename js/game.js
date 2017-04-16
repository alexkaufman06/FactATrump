var style = {
  position: 'relative',
  left: 100,
  top: 0
};

var windowWidth = window.innerWidth - 300;
var windowHeight = window.innerHeight - 250;

var hits = 0;

var imgDirectionX = "";
var imgDirectionY = "";

var FactATrump = React.createClass({
  getInitialState: function() {
    return {gameOver: false, gameStart: false, elapsed: 0};
  },

  componentDidMount: function(){
    this.timer = setInterval(this.tick, 5);
  },

  componentWillUnmount: function(){
    clearInterval(this.timer);
  },

  tick: function(){
    this.setState({elapsed: new Date() - this.props.start});

    if (style.left == windowWidth) {
      imgDirectionX = "left";
    } else if (style.left == 100) {
      imgDirectionX = "right";
    }

    if (style.top == 0) {
      imgDirectionY = "down";
    } else if (style.top == windowHeight) {
      imgDirectionY = "up";
    }

    if (imgDirectionX == "right") {
      style.left += 1;
    } else if (imgDirectionX == "left") {
      style.left -= 1;
    }

    if (imgDirectionY == "down") {
      style.top += 1;
    } else if (imgDirectionY == "up") {
      style.top -= 1;
    }
  },

  renderCard: function(cardRank, cardSuit) {
    if (cardRank == 1) {
      return "ace-" + cardSuit;
    }
  },

  newGame: function() {
    this.setState({gameStart: true});
  },

  hit: function() {
    hits += 1;
  },

  renderStart: function() {
    return <div className="text-center">
      <h1>Fact the Trump!</h1>
      <h4>Hit trump with some facts!</h4>
      <button onClick={this.newGame} className="btn btn-default">Start</button>
    </div>
  },

  renderGame: function() {
    // var elapsed = Math.round(this.state.elapsed / 100);
    // var seconds = (elapsed / 10).toFixed(1);

    return <div>
      <p>Hits: {hits}</p>
      <img src={'images/trump.png'} style={style} onClick={this.hit} />
    </div>
  },

  render: function() {
    if (this.state.gameStart == false) {
      return this.renderStart()
    } else if (this.state.gameStart == true) {
      return this.renderGame()
    }
  }
});

React.render(<div>
              <FactATrump start={Date.now()} />
             </div>, document.getElementById('react-container')
);
