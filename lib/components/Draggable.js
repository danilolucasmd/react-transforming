import React from 'react';
import * as Rx from 'rxjs';
import * as operators from 'rxjs/operators';

export default class Draggable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      x: this.props.default.x,
      y: this.props.default.y,
    };

    this.dragEl = React.createRef();

    this.style = {
      position: 'absolute',
      cursor: 'pointer',
      userSelect: 'none',
    };
  }

  componentDidMount() {
    const element = this.dragEl.current;
    const dragEvent = Rx.fromEvent(element, 'mousedown').pipe(
      operators.flatMap(downEvent => {
        const init = {
          x: downEvent.clientX,
          y: downEvent.clientY,
          lastX: this.state.x * this.props.scale,
          lastY: this.state.y * this.props.scale,
        };

        return Rx.fromEvent(document, 'mousemove').pipe(
          operators.map(moveEvent => {
            return {
              x: ((moveEvent.clientX - init.x) + init.lastX) / this.props.scale,
              y: ((moveEvent.clientY - init.y) + init.lastY) / this.props.scale,
            };
          }),
          operators.takeUntil(
            Rx.fromEvent(element, 'mouseup').pipe(
              operators.tap(upEvent => this.props.onDragStop(upEvent, this.state)),
            ),
          ),
        );
      }),
    );

    this.dragSubscription = dragEvent.subscribe(position => {
      this.setState({
        ...position,
      });
    });
  }

  componentWillUnmount() {
    this.dragSubscription.unsubscribe();
  }

  render() {
    const { className, ...otherProps } = this.props;
    const { x, y } = this.state;

    const dynamicStyle = {
      transform: `translate(${x}px, ${y}px)`,
    };

    return (
      <div
        {...otherProps}
        className={className}
        style={{ ...this.style, ...dynamicStyle }}
        ref={this.dragEl}
      >
        {this.props.children}
      </div>
    );
  }
}

Draggable.defaultProps = {
  default: {
    x: 0,
    y: 0,
  },
  scale: 1,
};