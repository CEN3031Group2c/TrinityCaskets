class Square extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: null,
      };
    }
  
    render() {
      return (
        <button
          className="square"
          onClick={() =>  this.setState({value: 'X'}) }
        >
          {this.state.value}
        </button>
      );
    }
  }
  
  // This is a class that returns a 3x3 tic tac toe board
  class Board extends React.Component {
    renderSquare(i) {
      return <Square />;
    }
  
    render() {
      const status = 'Next player: X';
      return (
      
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
       )
      
    }
  }
  
  // This is our main class being rendered by React
  class Game extends React.Component {
    
    render() {
      return (
        <div className="game">
          <div className="game-board">
            
            <Board />;
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  // This is what renders the Game class on the webpage
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );