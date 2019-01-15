# React Transforming

See [Demo](https://danilolucasmd.github.io/react-transforming)

See [Example](https://github.com/danilolucasmd/react-transforming)

See [API.md](https://github.com/danilolucasmd/react-transforming/blob/master/API.md) for details

## Requirements

* React >= 16.0.0

## Install

```bash
yarn add react-transforming
```

## Turning your component into a draggable component

```bash
import { Draggable } from 'react-transforming';

export default class App extends PureComponent {
  state = {  
    x: 10, 
    y: 10, 
  };

  handleDragStop = (e, pos) => {
    this.setState({
      ...pos,
    });
  }
  
  render() {
    return (
      <Draggable
        default={this.state}
        onDragStop={this.handleDragStop}
      >
        <MyComponent />
      </Draggable>
    );
  }
}
```
The "default" prop of the Draggable component is it's position value, and can be changed to actually set the final position after the dragging. 

## Turning your component into a resizable component

```bash
import { Resizable } from 'react-transforming';

export default class App extends PureComponent {
  state = {  
    width: 50, 
    height: 50, 
  };

  handleResizeStop = (e, size) => {
    this.setState({
      ...size,
    });
  }
  
  render() {
    return (
      <Resizable
        default={this.state}
        onResizeStop={this.handleResizeStop}
      >
        <MyComponent />
      </Resizable>
    );
  }
}
```
The "default" prop of the Draggable component is it's size value, and can be changed to actually set the final size after the resizing. 

## Composing the components to get a more complex behavior

```bash
import { Draggable, Resizable } from 'react-transforming';

export default class App extends PureComponent {
  state = {  
    x: 10,
    y: 10,
    width: 50, 
    height: 50, 
  };

  handleDragStop = (e, pos) => {
    this.setState({
      ...pos,
    });
  }

  handleResizeStop = (e, size) => {
    this.setState({
      ...size,
    });
  }
  
  render() {
    const { x, y, width, height } = this.state;

    return (
      <Draggable
        default={{x, y}}
        onDragStop={this.handleDragStop}
      >
        <Resizable
          default={{width, height}}
          onResizeStop={this.handleResizeStop}
        >
          <MyComponent />
        </Resizable>
      </Draggable>
    );
  }
}
```
You could pass the whole state to both default props in the Draggable and Resizable components, but we encourage to pass just the necessary to avoid unexpected side effects. 

#### If you're missing some feature, or want to suggest some improvement, you can report an issue or create a pull request, I will be happy to look.